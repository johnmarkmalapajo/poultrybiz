import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { expensesAPI } from "../services/api";
import "../components/InventoryTable.css";

const CATEGORIES = ["Feed", "Medicine", "Labor", "Utilities", "Equipment", "Other"];

const COLUMNS = [
  { key: "expenseDate", label: "Expense Date", type: "date" },
  { key: "category",    label: "Category" },
  { key: "amount",      label: "Amount (₱)",   type: "number" },
  { key: "receipt",     label: "Receipt" },
  { key: "remarks",     label: "Remarks",      type: "textarea" },
];

export default function ExpensesRecord() {
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
    const res = await expensesAPI.getAll();
    if (res.success) setRows(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = rows.filter((r) =>
    Object.values(r).some((v) => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  const openAdd  = () => { setForm({}); setEditId(null); setShowModal(true); };
  const openEdit = (row) => {
    setForm({ ...row, expenseDate: row.expenseDate?.split("T")[0] || "" });
    setEditId(row._id);
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editId) {
      const res = await expensesAPI.update(editId, form);
      if (res.success) setRows((p) => p.map((r) => r._id === editId ? res.data : r));
    } else {
      const res = await expensesAPI.create(form);
      if (res.success) setRows((p) => [...p, res.data]);
    }
    setSaving(false);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    const res = await expensesAPI.remove(id);
    if (res.success) setRows((p) => p.filter((r) => r._id !== id));
  };

  return (
    <div className="it-page">
      <Sidebar />
      <div className="it-main">
        <Topbar 
         searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          searchPlaceholder="Search Expenses..."
        />
        <div className="it-breadcrumb">
          <span className="it-bread-parent" onClick={() => navigate("/sales-transactions")}>
            SALES AND TRANSACTIONS
          </span>
          <span className="it-bread-sep">›</span>
          <span className="it-bread-current">EXPENSES RECORD</span>
        </div>
        <div className="it-toolbar">
          <button className="it-add-btn" onClick={openAdd}>+ Add New Expense</button>
          
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
                      {c.key === "expenseDate" ? row.expenseDate?.split("T")[0] || "—"
                       : c.key === "amount" ? `₱${Number(row.amount || 0).toLocaleString()}`
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
              <h3 className="it-modal-title">{editId ? "Edit Expense" : "Add New Expense"}</h3>
              <div className="it-modal-fields">
                {COLUMNS.map((col) => (
                  <div className="it-field" key={col.key}>
                    <label>{col.label}</label>
                    {col.key === "category" ? (
                      <select value={form[col.key] || ""} className="it-select"
                        onChange={(e) => setForm((f) => ({ ...f, [col.key]: e.target.value }))}>
                        <option value="">Select category...</option>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    ) : col.type === "textarea" ? (
                      <textarea value={form[col.key] || ""} rows={3}
                        onChange={(e) => setForm((f) => ({ ...f, [col.key]: e.target.value }))} />
                    ) : (
                      <input type={col.type || "text"} value={form[col.key] || ""}
                        onChange={(e) => setForm((f) => ({ ...f, [col.key]: e.target.value }))} />
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
