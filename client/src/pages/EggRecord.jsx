// src/pages/EggRecord.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { eggAPI } from "../services/api";
import "../components/RecordTable.css";

const EGG_SIZES = ["jumbo", "extraLarge", "large", "medium", "small", "peewee", "crack"];
const EGG_LABELS = {
  jumbo: "Jumbo",
  extraLarge: "Extra Large",
  large: "Large",
  medium: "Medium",
  small: "Small",
  peewee: "Peewee",
  crack: "Crack",
};

export default function EggRecord() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    date: "",
    batchId: "",
    totalEggs: 0,
    eggSizes: {},
  });

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ── Fetch all egg records ──
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await eggAPI.getAll();
      if (res.success) setRows(res.data);
      else setError("Failed to load records.");
    } catch {
      setError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ── SEARCH FILTER ──
  const filtered = rows.filter((r) =>
    [r.date, r.totalEggs, r.batchId].some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  // ── OPEN ADD ──
  const openAdd = () => {
    setForm({
      date: "",
      batchId: "",
      totalEggs: 0,
      eggSizes: {},
    });
    setEditId(null);
    setShowModal(true);
  };

  // ── OPEN EDIT ──
  const openEdit = (row) => {
    setForm({
      date: row.date?.split("T")[0] || "",
      batchId: row.batchId || "",
      totalEggs: row.totalEggs,
      eggSizes: { ...row.eggSizes },
    });
    setEditId(row._id);
    setShowModal(true);
  };

  // ── AUTO CALCULATE TOTAL ──
  const handleSizeChange = (key, value) => {
    const updatedSizes = { ...form.eggSizes, [key]: Number(value) || 0 };
    const total = Object.values(updatedSizes).reduce((sum, v) => sum + v, 0);

    setForm((f) => ({
      ...f,
      eggSizes: updatedSizes,
      totalEggs: total,
    }));
  };

  // ── SAVE (CREATE / UPDATE) ──
  const handleSave = async () => {
  console.log("FORM DATA:", form);
  console.log("BATCH ID:", form.batchId);
    if (!form.date) return alert("Please enter a date.");
    if (!form.batchId) return alert("Please enter Batch ID.");

    setSaving(true);

    try {
      if (editId) {
        const res = await eggAPI.update(editId, form);
        if (res.success) {
          setRows((p) =>
            p.map((r) => (r._id === editId ? res.data : r))
          );
        } else {
          alert(res.message || "Update failed.");
        }
      } else {
        const res = await eggAPI.create(form);
        if (res.success) {
          setRows((p) => [...p, res.data]);
        } else {
          alert(res.message || "Create failed.");
        }
      }

      setShowModal(false);
    } catch {
      alert("Cannot connect to server.");
    } finally {
      setSaving(false);
    }
  };

  // ── DELETE ──
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      const res = await eggAPI.remove(id);
      if (res.success) {
        setRows((p) => p.filter((r) => r._id !== id));
      }
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="rt-page">
      <Sidebar />

      <div className="rt-main">
        <Topbar
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          searchPlaceholder="Search Eggs..."
        />

        {/* Breadcrumb */}
        <div className="rt-breadcrumb">
          <span
            className="rt-bread-parent"
            onClick={() => navigate("/records")}
          >
            RECORDS
          </span>
          <span className="rt-bread-sep">›</span>
          <span className="rt-bread-current">EGG RECORD</span>
        </div>

        {/* Toolbar */}
        <div className="rt-toolbar">
          <button className="rt-add-btn" onClick={openAdd}>
            + Add New Egg Record
          </button>
        </div>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        {/* Table */}
        <div className="rt-table-wrap">
          <table className="rt-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Batch ID</th>
                <th>Total</th>

                {EGG_SIZES.map((s) => (
                  <th key={s}>{EGG_LABELS[s]}</th>
                ))}

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={EGG_SIZES.length + 5} className="rt-empty">
                    Loading records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={EGG_SIZES.length + 5} className="rt-empty">
                    No records found
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr
                    key={row._id}
                    className="rt-row"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <td>{i + 1}</td>
                    <td>{row.date?.split("T")[0] || "—"}</td>
                    <td><strong>{row.batchId || "—"}</strong></td>
                    <td><strong>{row.totalEggs}</strong></td>

                    {EGG_SIZES.map((s) => (
                      <td key={s}>{row.eggSizes?.[s] ?? 0}</td>
                    ))}

                    <td className="rt-actions">
                      <button
                        className="rt-btn-edit"
                        onClick={() => openEdit(row)}
                      >
                        ✏️
                      </button>
                      <button
                        className="rt-btn-del"
                        onClick={() => handleDelete(row._id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="rt-overlay" onClick={() => setShowModal(false)}>
            <div
              className="rt-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="rt-modal-title">
                {editId ? "Edit Egg Record" : "Add New Egg Record"}
              </h3>

              <div className="rt-modal-fields">
                {/* Date */}
                <div className="rt-field">
                  <label>Date</label>
                  <input
                    type="date"
                    value={form.date || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date: e.target.value }))
                    }
                  />
                </div>

                {/* Batch ID */}
                <div className="rt-field">
                  <label>Batch ID</label>
                  <input
                    type="text"
                    value={form.batchId || ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        batchId: e.target.value,
                      }))
                    }
                    placeholder="Enter batch ID"
                  />
                </div>

                {/* Egg sizes */}
                <div className="rt-field">
                  <label>🥚 Egg Sizes (auto-totals)</label>
                </div>

                {EGG_SIZES.map((s) => (
                  <div className="rt-field" key={s}>
                    <label>{EGG_LABELS[s]}</label>
                    <input
                      type="number"
                      min="0"
                      value={form.eggSizes?.[s] || 0}
                      onChange={(e) =>
                        handleSizeChange(s, e.target.value)
                      }
                    />
                  </div>
                ))}

                {/* Total */}
                <div className="rt-field">
                  <label>Total Eggs</label>
                  <input
                    type="number"
                    value={form.totalEggs || 0}
                    readOnly
                    style={{
                      background: "#f5f5f5",
                      cursor: "not-allowed",
                      fontWeight: "bold",
                    }}
                  />
                </div>
              </div>

              <div className="rt-modal-actions">
                <button
                  className="rt-btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="rt-btn-save"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editId
                    ? "Save Changes"
                    : "Add Record"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}