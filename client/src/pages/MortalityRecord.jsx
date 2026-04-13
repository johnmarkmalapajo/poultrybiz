import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { mortalityAPI } from "../services/api";
import "../components/RecordTable.css";

const COLUMNS = [
  { key: "date",             label: "Date",                 type: "date" },
  { key: "batchId",          label: "Batch ID" },
  { key: "numberOfDeadHens", label: "Number of Dead Hens",  type: "number" },
  { key: "reasonCause",      label: "Reason/Cause" },
  { key: "notes",            label: "Notes",                type: "textarea" },
];

export default function MortalityRecord() {
  const navigate = useNavigate();
  const [rows, setRows]           = useState([]);
  const [search, setSearch]       = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState({});
  const [editId, setEditId]       = useState(null);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await mortalityAPI.getAll();
    if (res.success) setRows(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = rows.filter((r) =>
    Object.values(r).some((v) => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd  = () => { setForm({}); setEditId(null); setShowModal(true); };
  const openEdit = (row) => {
    setForm({ ...row, date: row.date?.split("T")[0] || "" });
    setEditId(row._id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.batchId) return alert("Please enter Batch ID.");
    setSaving(true);
    if (editId) {
      const res = await mortalityAPI.update(editId, form);
      if (res.success) setRows((p) => p.map((r) => r._id === editId ? res.data : r));
    } else {
      const res = await mortalityAPI.create(form);
      if (res.success) setRows((p) => [...p, res.data]);
    }
    setSaving(false);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    const res = await mortalityAPI.remove(id);
    if (res.success) setRows((p) => p.filter((r) => r._id !== id));
  };

  return (
    <div className="rt-page">
      <Sidebar />
      <div className="rt-main">
        <Topbar
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          searchPlaceholder="Search Mortality..."
        />
        <div className="rt-breadcrumb">
          <span className="rt-bread-parent" onClick={() => navigate("/records")}>RECORDS</span>
          <span className="rt-bread-sep">›</span>
          <span className="rt-bread-current">MORTALITY RECORD</span>
        </div>
        <div className="rt-toolbar">
          <button className="rt-add-btn" onClick={openAdd}>+ Add New Mortality Record</button>
        </div>
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
                <tr><td colSpan={COLUMNS.length + 2} className="rt-empty">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={COLUMNS.length + 2} className="rt-empty">No records found.</td></tr>
              ) : filtered.map((row, i) => (
                <tr key={row._id} className="rt-row" style={{ animationDelay: `${i * 60}ms` }}>
                  <td>{i + 1}</td>
                  {COLUMNS.map((c) => (
                    <td key={c.key}>
                      {c.key === "date"
                        ? row.date?.split("T")[0] || "—"
                        : c.key === "batchId"
                        ? <strong>{row.batchId || "—"}</strong>
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

        {showModal && (
          <div className="rt-overlay" onClick={() => setShowModal(false)}>
            <div className="rt-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="rt-modal-title">{editId ? "Edit Mortality Record" : "Add New Mortality Record"}</h3>
              <div className="rt-modal-fields">
                {COLUMNS.map((col) => (
                  <div className="rt-field" key={col.key}>
                    <label>{col.label}</label>
                    {col.type === "textarea" ? (
                      <textarea
                        value={form[col.key] || ""}
                        rows={3}
                        onChange={(e) => setForm((f) => ({ ...f, [col.key]: e.target.value }))}
                      />
                    ) : (
                      <input
                        type={col.type || "text"}
                        value={form[col.key] || ""}
                        placeholder={col.key === "batchId" ? "Enter batch ID" : ""}
                        onChange={(e) => setForm((f) => ({ ...f, [col.key]: e.target.value }))}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="rt-modal-actions">
                <button className="rt-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
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