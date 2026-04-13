import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { salesAPI } from "../services/api";
import "../components/InventoryTable.css";

const EGG_SIZES = ["Large", "Extra Large", "Medium", "Jumbo", "Small", "Peewee", "Crack"];

const COLUMNS = [
  { key: "date",         label: "Date",             type: "date" },
  { key: "buyer",        label: "Buyer" },
  { key: "quantitySold", label: "Quantity Sold",    type: "number" },
  { key: "eggSize",      label: "Egg Size" },
  { key: "unitSize",     label: "Unit Size",        type: "number" },
  { key: "totalAmount",  label: "Total Amount (₱)", type: "number" },
];

export default function SalesRecord() {
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
    const res = await salesAPI.getAll();
    if (res.success) setRows(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // Auto-calculate total when qty or unit changes
  const handleFormChange = (key, value) => {
    setForm((f) => {
      const updated = { ...f, [key]: value };
      if (key === "quantitySold" || key === "unitSize") {
        updated.totalAmount = (Number(updated.quantitySold) || 0) * (Number(updated.unitSize) || 0);
      }
      return updated;
    });
  };

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
    setSaving(true);
    if (editId) {
      const res = await salesAPI.update(editId, form);
      if (res.success) setRows((p) => p.map((r) => r._id === editId ? res.data : r));
    } else {
      const res = await salesAPI.create(form);
      if (res.success) setRows((p) => [...p, res.data]);
    }
    setSaving(false);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    const res = await salesAPI.remove(id);
    if (res.success) setRows((p) => p.filter((r) => r._id !== id));
  };

  return (
    <div className="it-page">
      <Sidebar />
      <div className="it-main">
        <Topbar 
         searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          searchPlaceholder="Search Sales..."
        />
        <div className="it-breadcrumb">
          <span className="it-bread-parent" onClick={() => navigate("/sales-transactions")}>
            SALES AND TRANSACTIONS
          </span>
          <span className="it-bread-sep">›</span>
          <span className="it-bread-current">SALES RECORD</span>
        </div>
        <div className="it-toolbar">
          <button className="it-add-btn" onClick={openAdd}>+ Add New Sale</button>
          

        </div>
        <div className="it-table-wrap">
          <table className="it-table">
            <thead>
              <tr>
                <th>#</th>
                {COLUMNS.map((c) => <th key={c.key}>{c.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={COLUMNS.length + 2} className="it-empty">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={COLUMNS.length + 2} className="it-empty">No records found.</td></tr>
              ) : filtered.map((row, i) => (
                <tr key={row._id} className="it-row" style={{ animationDelay: `${i * 60}ms` }}>
                  <td>{i + 1}</td>
                  {COLUMNS.map((c) => (
                    <td key={c.key}>
                      {c.key === "date" ? row.date?.split("T")[0] || "—"
                       : c.key === "totalAmount" ? `₱${Number(row[c.key] || 0).toLocaleString()}`
                       : row[c.key] ?? "—"}
                    </td>
                  ))}
                  <td className="it-actions">
                    <button className="it-btn-edit" onClick={() => openEdit(row)}>✏️</button>
                    <button className="it-btn-del"  onClick={() => handleDelete(row._id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <div className="it-overlay" onClick={() => setShowModal(false)}>
            <div className="it-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="it-modal-title">{editId ? "Edit Sale" : "Add New Sale"}</h3>
              <div className="it-modal-fields">
                {COLUMNS.map((col) => (
                  <div className="it-field" key={col.key}>
                    <label>{col.label}</label>
                    {col.key === "eggSize" ? (
                      <select value={form[col.key] || ""} className="it-select"
                        onChange={(e) => handleFormChange(col.key, e.target.value)}>
                        <option value="">Select size...</option>
                        {EGG_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    ) : col.key === "totalAmount" ? (
                      <input type="number" value={form.totalAmount || 0} readOnly
                        style={{ background: "#f5f5f5", cursor: "not-allowed" }} />
                    ) : (
                      <input type={col.type || "text"} value={form[col.key] || ""}
                        onChange={(e) => handleFormChange(col.key, e.target.value)} />
                    )}
                  </div>
                ))}
              </div>
              <div className="it-modal-actions">
                <button className="it-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="it-btn-save" onClick={handleSave} disabled={saving}>
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
