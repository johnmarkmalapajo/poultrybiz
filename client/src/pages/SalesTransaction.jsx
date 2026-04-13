import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./SalesTransaction.css";

const cards = [
  {
    id: "sales",
    label: "Sales Record",
    path: "/sales-transactions/sales",
  },
  {
    id: "expenses",
    label: "Expenses Record",
    path: "/sales-transactions/expenses",
  },
];

export default function SalesTransactions() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = cards.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="st-page">
      <Sidebar />
      <div className="st-main">
        <Topbar 
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          searchPlaceholder="Search..."
        />

        <div className="st-topbar">
          <h2 className="st-title">SALES AND TRANSACTIONS</h2>
        </div>

        <div className="st-grid">
          {filtered.map((card, i) => (
            <button
              key={card.id}
              className="st-card"
              style={{ animationDelay: `${i * 100}ms` }}
              onClick={() => navigate(card.path)}
            >
              <div className="st-card-img">
                <SalesIllustration id={card.id} />
              </div>
              <span className="st-card-label">{card.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalesIllustration({ id }) {
  if (id === "sales") {
    return (
      <svg viewBox="0 0 130 110" xmlns="http://www.w3.org/2000/svg" className="st-svg">
        {/* Clipboard */}
        <rect x="20" y="18" width="58" height="74" rx="6" fill="#fff" stroke="#ddd" strokeWidth="1.5"/>
        <rect x="34" y="12" width="30" height="12" rx="5" fill="#bbb"/>
        {/* Lines */}
        <rect x="28" y="38" width="42" height="3" rx="1.5" fill="#e8e8e8"/>
        <rect x="28" y="48" width="36" height="3" rx="1.5" fill="#e8e8e8"/>
        <rect x="28" y="58" width="40" height="3" rx="1.5" fill="#e8e8e8"/>
        <rect x="28" y="68" width="32" height="3" rx="1.5" fill="#e8e8e8"/>
        {/* Bar chart on clipboard */}
        <rect x="30" y="74" width="8" height="10" rx="2" fill="#e8a020"/>
        <rect x="41" y="68" width="8" height="16" rx="2" fill="#5aab6e"/>
        <rect x="52" y="71" width="8" height="13" rx="2" fill="#4a90d9"/>
        {/* Coins stack */}
        <ellipse cx="95" cy="80" rx="18" ry="6" fill="#f5c842"/>
        <rect x="77" y="68" width="36" height="12" rx="3" fill="#f5d060"/>
        <ellipse cx="95" cy="68" rx="18" ry="6" fill="#f5c842"/>
        <rect x="77" y="57" width="36" height="12" rx="3" fill="#f5d060"/>
        <ellipse cx="95" cy="57" rx="18" ry="6" fill="#f5c842"/>
        {/* Dollar sign */}
        <text x="91" y="62" fontSize="10" fontWeight="bold" fill="#c8960a">$</text>
        {/* Chicken */}
        <ellipse cx="105" cy="38" rx="13" ry="11" fill="#f5e0b0"/>
        <circle cx="105" cy="24" r="9" fill="#f5e0b0"/>
        <ellipse cx="101" cy="16" rx="3" ry="4" fill="#e05555"/>
        <ellipse cx="105" cy="15" rx="3" ry="4" fill="#e05555"/>
        <ellipse cx="109" cy="16" rx="3" ry="4" fill="#e05555"/>
        <polygon points="112,26 118,28 112,31" fill="#f5a623"/>
        <circle cx="109" cy="23" r="2" fill="#333"/>
        <circle cx="110" cy="22" r="0.8" fill="#fff"/>
        {/* Eggs near coins */}
        <ellipse cx="80" cy="50" rx="7" ry="9" fill="#faf0e0"/>
        <ellipse cx="80" cy="46" rx="5" ry="7" fill="#fff8f0"/>
      </svg>
    );
  }

  // Expenses Record
  return (
    <svg viewBox="0 0 130 110" xmlns="http://www.w3.org/2000/svg" className="st-svg">
      {/* Calculator */}
      <rect x="16" y="22" width="46" height="66" rx="6" fill="#4a4a4a"/>
      <rect x="21" y="27" width="36" height="18" rx="3" fill="#a0d8a0"/>
      <text x="42" y="40" fontSize="11" fontWeight="bold" fill="#1a1a1a" textAnchor="middle">245</text>
      {/* Calc buttons */}
      {[0,1,2,3].map(col => [0,1,2,3].map(row => (
        <rect key={`${col}-${row}`}
          x={22 + col * 10} y={52 + row * 10}
          width="7" height="7" rx="1.5"
          fill={col === 3 ? "#e8a020" : "#666"}
        />
      )))}
      {/* Receipt / paper */}
      <rect x="68" y="14" width="46" height="78" rx="4" fill="#fff" stroke="#eee" strokeWidth="1.5"/>
      {/* Zigzag bottom */}
      <polyline points="68,92 74,98 80,92 86,98 92,92 98,98 104,92 110,98 114,92" fill="none" stroke="#eee" strokeWidth="2"/>
      {/* Receipt lines */}
      <rect x="74" y="24" width="34" height="3" rx="1.5" fill="#f0f0f0"/>
      <rect x="74" y="32" width="28" height="3" rx="1.5" fill="#f0f0f0"/>
      <rect x="74" y="40" width="30" height="3" rx="1.5" fill="#f0f0f0"/>
      <line x1="74" y1="50" x2="108" y2="50" stroke="#eee" strokeWidth="1.5"/>
      <rect x="74" y="56" width="20" height="3" rx="1.5" fill="#f0f0f0"/>
      <rect x="94" y="56" width="14" height="3" rx="1.5" fill="#e8a020"/>
      <rect x="74" y="64" width="20" height="3" rx="1.5" fill="#f0f0f0"/>
      <rect x="94" y="64" width="14" height="3" rx="1.5" fill="#e05555"/>
      <rect x="74" y="72" width="34" height="4" rx="2" fill="#2b2200"/>
      {/* Chicken beside */}
      <ellipse cx="112" cy="8" rx="11" ry="9" fill="#f5e0b0"/>
      <circle cx="112" cy="0" r="7" fill="#f5e0b0"/>
      <ellipse cx="109" cy="-6" rx="2.5" ry="3.5" fill="#e05555"/>
      <ellipse cx="112" cy="-7" rx="2.5" ry="3.5" fill="#e05555"/>
      <ellipse cx="115" cy="-6" rx="2.5" ry="3.5" fill="#e05555"/>
      <polygon points="118,2 123,4 118,6" fill="#f5a623"/>
      <circle cx="116" cy="0" r="1.8" fill="#333"/>
      {/* Coins */}
      <ellipse cx="30" cy="98" rx="14" ry="5" fill="#f5c842"/>
      <rect x="16" y="90" width="28" height="8" rx="2" fill="#f5d060"/>
      <ellipse cx="30" cy="90" rx="14" ry="5" fill="#f5c842"/>
    </svg>
  );
}
