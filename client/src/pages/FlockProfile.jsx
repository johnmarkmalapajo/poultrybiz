import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { flockAPI } from "../services/api";
import "../components/RecordTable.css";

const COLUMNS = [
  { key: "breed",        label: "Breed" },
  { key: "source",       label: "Source" },
  { key: "dateAcquired", label: "Date Acquired", type: "date" },
  { key: "qtyPurchase",  label: "Quantity at Purchase", type: "number" },
  { key: "currentQty",   label: "Current Quantity",     type: "number" },
  { key: "notes",        label: "Notes",                type: "textarea" },
];

export default function FlockProfile() {
  const navigate = useNavigate();
  const [rows, setRows]           = useState([]);
  const [search, setSearch]       = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState({});
  const [editId, setEditId]       = useState(null);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = "";

  // ── Fetch all records ──
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await flockAPI.getAll();
      if (res.success) setRows(res.data);
      else setError("Failed to load records.");
    } catch {
      setError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── Search filter ──
  const filtered = rows.filter((r) =>
    Object.values(r).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  // ── Open Add (with auto batch ID) ──
  const openAdd = () => {
    setForm({
      batchId: "BATCH-" + Date.now() // 🔥 auto generate
    });
    setEditId(null);
    setShowModal(true);
  };

  // ── Open Edit ──
  const openEdit = (row) => {
    setForm({
      breed:        row.breed,
      source:       row.source,
      dateAcquired: row.dateAcquired?.split("T")[0] || "",
      qtyPurchase:  row.qtyPurchase,
      currentQty:   row.currentQty,
      notes:        row.notes,
    });
    setEditId(row._id);
    setShowModal(true);
  };

  // ── Save ──
  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) {
        const res = await flockAPI.update(editId, form);
        if (res.success) {
          setRows((p) => p.map((r) => r._id === editId ? res.data : r));
        }
      } else {
        const res = await flockAPI.create(form);
        if (res.success) {
          setRows((p) => [...p, res.data]);
        }
      }
      setShowModal(false);
    } catch {
      alert("Failed to save. Check your connection.");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      const res = await flockAPI.remove(id);
      if (res.success) setRows((p) => p.filter((r) => r._id !== id));
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
          searchPlaceholder="Search Flock..."
        />

        {/* Breadcrumb */}
        <div className="rt-breadcrumb">
          <span className="rt-bread-parent" onClick={() => navigate("/records")}>RECORDS</span>
          <span className="rt-bread-sep">›</span>
          <span className="rt-bread-current">FLOCK PROFILE</span>
        </div>

        {/* Toolbar */}
        <div className="rt-toolbar">
          <button className="rt-add-btn" onClick={openAdd}>
            + Add New Flock Record
          </button>
        </div>

        {error && <p style={{ color: "red", padding: "8px" }}>{error}</p>}

        {/* TABLE */}
        <div className="rt-table-wrap">
          <table className="rt-table">
            <thead>
              <tr>
                <th>#</th>
                {COLUMNS.map((c) => <th key={c.key}>{c.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={COLUMNS.length + 2} className="rt-empty">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length + 2} className="rt-empty">
                    No records found.
                  </td>
                </tr>
              ) : filtered.map((row, i) => (
                <tr key={row._id} className="rt-row" style={{ animationDelay: `${i * 60}ms` }}>
                  <td>{i + 1}</td>

                  {COLUMNS.map((c) => (
                    <td key={c.key}>
                      {c.key === "dateAcquired"
                        ? row.dateAcquired?.split("T")[0] || "—"
                        : row[c.key] ?? "—"}
                    </td>
                  ))}

                  <td className="rt-actions">
                    <button className="rt-btn-edit" onClick={() => openEdit(row)}>✏️</button>
                    <button className="rt-btn-del"  onClick={() => handleDelete(row._id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="rt-overlay" onClick={() => setShowModal(false)}>
            <div className="rt-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="rt-modal-title">
                {editId ? "Edit Flock Record" : "Add New Flock Record"}
              </h3>

              <div className="rt-modal-fields">
                {COLUMNS.map((col) => (
                  <div className="rt-field" key={col.key}>
                    <label>{col.label}</label>

                    {col.type === "textarea" ? (
                      <textarea
                        value={form[col.key] || ""}
                        rows={3}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [col.key]: e.target.value }))
                        }
                      />
                    ) : (
                      <input
                        type={col.type || "text"}
                        value={form[col.key] || ""}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [col.key]: e.target.value }))
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="rt-modal-actions">
                <button className="rt-btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="rt-btn-save" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : editId ? "Save Changes" : "Add Record"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}