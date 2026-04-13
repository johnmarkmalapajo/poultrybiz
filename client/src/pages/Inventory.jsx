import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./Inventory.css";

const cards = [
  {
    id: "feed-inventory",
    label: "Feed Inventory",
    emoji: "🌾",
    illustration: "🪣",
    path: "/inventory/feed-inventory",
    description: "Track feed stock levels",
  },
  {
    id: "feed-consumption",
    label: "Feed Consumption",
    emoji: "🐔",
    illustration: "🐓",
    path: "/inventory/feed-consumption",
    description: "Monitor daily feed usage",
  },
  {
    id: "equipment",
    label: "Equipment and Tool Record",
    emoji: "🔧",
    illustration: "⚙️",
    path: "/inventory/equipment",
    description: "Manage tools and equipment",
  },
];

export default function Inventory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = cards.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inv-page">
      <Sidebar />

      <div className="inv-main">
        <Topbar 
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          searchPlaceholder="Search..."
        />

        {/* Topbar row */}
        <div className="inv-topbar">
          <h2 className="inv-title">INVENTORY</h2>
        </div>

        {/* Cards */}
        <div className="inv-grid">
          {filtered.map((card, i) => (
            <button
              key={card.id}
              className="inv-card"
              style={{ animationDelay: `${i * 90}ms` }}
              onClick={() => navigate(card.path)}
            >
              {/* Illustration area */}
              <div className="inv-card-img">
                <InventoryIllustration id={card.id} />
              </div>
              <span className="inv-card-label">{card.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* SVG illustrations matching the design's illustrated style */
function InventoryIllustration({ id }) {
  if (id === "feed-inventory") {
    return (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="inv-svg">
        {/* Sack */}
        <ellipse cx="50" cy="78" rx="28" ry="14" fill="#c8873a" />
        <rect x="22" y="42" width="56" height="38" rx="14" fill="#d4944a" />
        <ellipse cx="50" cy="42" rx="28" ry="10" fill="#e8a95e" />
        {/* Tie */}
        <rect x="42" y="30" width="16" height="14" rx="5" fill="#b07030" />
        <ellipse cx="50" cy="30" rx="10" ry="5" fill="#c88040" />
        {/* Grain dots */}
        <circle cx="40" cy="60" r="3" fill="#f5c87a" />
        <circle cx="52" cy="65" r="3" fill="#f5c87a" />
        <circle cx="60" cy="57" r="3" fill="#f5c87a" />
        <circle cx="45" cy="72" r="2.5" fill="#f5c87a" />
        <circle cx="58" cy="70" r="2.5" fill="#f5c87a" />
        {/* Clipboard */}
        <rect x="68" y="30" width="36" height="46" rx="4" fill="#fff" stroke="#ccc" strokeWidth="1.5" />
        <rect x="72" y="26" width="28" height="8" rx="3" fill="#aaa" />
        <rect x="74" y="44" width="24" height="2.5" rx="1" fill="#ddd" />
        <rect x="74" y="52" width="24" height="2.5" rx="1" fill="#ddd" />
        <rect x="74" y="60" width="18" height="2.5" rx="1" fill="#ddd" />
        {/* Checkmark */}
        <circle cx="80" cy="38" r="5" fill="#5aab6e" />
        <polyline points="77,38 79,41 84,35" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        {/* Leaves */}
        <ellipse cx="20" cy="55" rx="10" ry="5" fill="#7bc67e" transform="rotate(-30 20 55)" />
        <ellipse cx="14" cy="48" rx="8" ry="4" fill="#5aab6e" transform="rotate(-50 14 48)" />
      </svg>
    );
  }

  if (id === "feed-consumption") {
    return (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="inv-svg">
        {/* Feed bag */}
        <ellipse cx="38" cy="78" rx="22" ry="10" fill="#c8873a" />
        <rect x="16" y="48" width="44" height="32" rx="10" fill="#d4944a" />
        <ellipse cx="38" cy="48" rx="22" ry="8" fill="#e8a95e" />
        <rect x="32" y="36" width="12" height="14" rx="4" fill="#b07030" />
        {/* Grain spill */}
        <circle cx="62" cy="78" r="4" fill="#f5c87a" />
        <circle cx="70" cy="74" r="3" fill="#f5d090" />
        <circle cx="68" cy="83" r="3.5" fill="#f5c87a" />
        <circle cx="78" cy="80" r="3" fill="#f5d090" />
        {/* Chicken */}
        <ellipse cx="90" cy="68" rx="16" ry="13" fill="#f5e0b0" />
        <circle cx="90" cy="50" r="10" fill="#f5e0b0" />
        {/* Comb */}
        <ellipse cx="86" cy="41" rx="3" ry="5" fill="#e05555" />
        <ellipse cx="90" cy="40" rx="3" ry="5" fill="#e05555" />
        <ellipse cx="94" cy="41" rx="3" ry="5" fill="#e05555" />
        {/* Beak */}
        <polygon points="98,52 104,55 98,58" fill="#f5a623" />
        {/* Eye */}
        <circle cx="94" cy="50" r="2" fill="#333" />
        <circle cx="95" cy="49" r="0.8" fill="#fff" />
        {/* Wing */}
        <ellipse cx="80" cy="70" rx="8" ry="5" fill="#e8c880" transform="rotate(20 80 70)" />
        {/* Feet */}
        <line x1="85" y1="80" x2="82" y2="90" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" />
        <line x1="95" y1="80" x2="98" y2="90" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" />
        <line x1="82" y1="90" x2="77" y2="93" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="82" y1="90" x2="82" y2="95" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="98" y1="90" x2="103" y2="93" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="98" y1="90" x2="98" y2="95" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round" />
        {/* Tail feathers */}
        <ellipse cx="76" cy="63" rx="5" ry="10" fill="#e8c060" transform="rotate(-30 76 63)" />
        <ellipse cx="72" cy="67" rx="4" ry="9" fill="#d4a840" transform="rotate(-50 72 67)" />
      </svg>
    );
  }

  // Equipment and Tool Record
  return (
    <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="inv-svg">
      {/* Large tank / silo */}
      <ellipse cx="35" cy="38" rx="18" ry="8" fill="#aac8e0" />
      <rect x="17" y="38" width="36" height="40" rx="4" fill="#c0d8f0" />
      <ellipse cx="35" cy="78" rx="18" ry="6" fill="#a0b8d8" />
      <rect x="22" y="60" width="26" height="4" rx="2" fill="#88a8c8" />
      <rect x="24" y="50" width="22" height="4" rx="2" fill="#88a8c8" />
      {/* Spout */}
      <rect x="53" y="68" width="10" height="4" rx="2" fill="#88a8c8" />
      <circle cx="65" cy="70" r="3" fill="#70a0c0" />
      {/* Middle container */}
      <ellipse cx="72" cy="50" rx="14" ry="6" fill="#e8c080" />
      <rect x="58" y="50" width="28" height="30" rx="4" fill="#f0d090" />
      <ellipse cx="72" cy="80" rx="14" ry="5" fill="#d4a860" />
      {/* Eggs in tray */}
      <ellipse cx="85" cy="38" rx="10" ry="14" fill="#f0e8d0" />
      <ellipse cx="85" cy="30" rx="7" ry="9" fill="#f5f0e0" />
      {/* Small egg */}
      <ellipse cx="100" cy="55" rx="7" ry="9" fill="#f5f0e0" />
      <ellipse cx="100" cy="50" rx="5" ry="7" fill="#fff8f0" />
      {/* Gear */}
      <circle cx="100" cy="28" r="10" fill="#888" />
      <circle cx="100" cy="28" r="6" fill="#bbb" />
      <rect x="98" y="16" width="4" height="6" rx="2" fill="#888" />
      <rect x="98" y="34" width="4" height="6" rx="2" fill="#888" />
      <rect x="88" y="26" width="6" height="4" rx="2" fill="#888" />
      <rect x="106" y="26" width="6" height="4" rx="2" fill="#888" />
      {/* Wrench hint */}
      <rect x="14" y="82" width="42" height="4" rx="2" fill="#a0b8d8" />
    </svg>
  );
}
