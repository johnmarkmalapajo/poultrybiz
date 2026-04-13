import "./Topbar.css"
import magnifyingGlass from "../assets/magnifying-glass.svg"

function Topbar({ searchValue = "", onSearchChange, searchPlaceholder = "Search..." }) {
  return (
    <div className="topbar">
      <div className="search-container">
        <img src={magnifyingGlass} alt="Search" className="search-icon" />
        <input 
          type="text" 
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
    </div>
  )
}

export default Topbar