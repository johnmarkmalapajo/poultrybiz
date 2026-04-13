import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./RecordTable.css";

function RecordTable({ recordType, columns, searchPlaceholder, addLabel, rows: initialRows }) {
  const navigate              = useNavigate();
  const [rows, setRows]       = useState(initialRows || []);
  const [search, setSearch]   = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]       = useState({});
  const [editId, setEditId]   = useState(null);

  const filtered = rows.filter((r) =>
    Object.values(r).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  const openAdd  = () => { setForm({}); setEditId(null); setShowModal(true); };
  const openEdit = (row) => { setForm({ ...row }); setEditId(row.id); setShowModal(true); };

  const handleSave = () => {
    if (editId !== null) {
      setRows((p) => p.map((r) => r.id === editId ? { ...form, id: editId } : r));
    } else {
      const newId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
      setRows((p) => [...p, { ...form, id: newId }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this record?")) setRows((p) => p.filter((r) => r.id !== id));
  };

  return (
    <div className="rt-page">
      <Sidebar />
      <div className="rt-main">
        <Topbar searchValue={search} onSearchChange={(e) => setSearch(e.target.value)} searchPlaceholder={searchPlaceholder} />

        {/* Breadcrumb */}
        <div className="rt-breadcrumb">
          <span
            className="rt-bread-parent"
            onClick={() => navigate("/records")}
          >
            RECORDS
          </span>
          <span className="rt-bread-sep">›</span>
          <span className="rt-bread-current">{recordType.toUpperCase()}</span>
        </div>

        {/* Toolbar */}
        <div className="rt-toolbar">
          <button className="rt-add-btn" onClick={openAdd}>+ {addLabel}</button>
        </div>

        {/* Table */}
        <div className="rt-table-wrap">
          <table className="rt-table">
            <thead>
              <tr>
                <th>ID</th>
                {columns.map((col) => <th key={col.key}>{col.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2} className="rt-empty">
                    No records found.
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr
                    key={row.id}
                    className="rt-row"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <td>{row.id}</td>
                    {columns.map((col) => (
                      <td key={col.key}>{row[col.key] ?? "—"}</td>
                    ))}
                    <td className="rt-actions">
                      <button className="rt-btn-edit" onClick={() => openEdit(row)}>✏️</button>
                      <button className="rt-btn-del"  onClick={() => handleDelete(row.id)}>🗑️</button>
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
            <div className="rt-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="rt-modal-title">
                {editId !== null ? `Edit ${recordType}` : `Add ${recordType}`}
              </h3>
              <div className="rt-modal-fields">
                {columns.map((col) => (
                  <div className="rt-field" key={col.key}>
                    <label>{col.label}</label>
                    {col.type === "textarea" ? (
                      <textarea
                        value={form[col.key] || ""}
                        onChange={(e) => setForm((f) => ({ ...f, [col.key]: e.target.value }))}
                        rows={3}
                      />
                    ) : (
                      <input
                        type={col.type || "text"}
                        value={form[col.key] || ""}
                        onChange={(e) => setForm((f) => ({ ...f, [col.key]: e.target.value }))}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="rt-modal-actions">
                <button className="rt-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="rt-btn-save"   onClick={handleSave}>
                  {editId !== null ? "Save Changes" : "Add Record"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordTable;
