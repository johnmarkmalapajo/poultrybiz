import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup"
import Records from "./pages/Records.jsx"
import Inventory from "./pages/Inventory.jsx"
import SalesTransaction from "./pages/SalesTransaction.jsx"
import SalesRecord from "./pages/SalesRecord.jsx"
import FlockProfile from './pages/FlockProfile'
import EggRecord from './pages/EggRecord'
import HealthRecord from './pages/HealthRecord'
import MortalityRecord from './pages/MortalityRecord'
import FeedInventory from "./pages/FeedInventory"
import FeedConsumption from "./pages/FeedConsumption"
import EquipmentRecord from "./pages/EquipmentRecord"
import ExpensesRecord from "./pages/ExpensesRecord"
import Profile from "./pages/Profile"
import { BrowserRouter, Routes, Route } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/records" element={<Records />} />
        <Route path="/records/flock" element={<FlockProfile />} />
        <Route path="/records/egg" element={<EggRecord />} />
        <Route path="/records/health" element={<HealthRecord />} />
        <Route path="/records/mortality" element={<MortalityRecord />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/feed-inventory" element={<FeedInventory />} />
        <Route path="/inventory/feed-consumption" element={<FeedConsumption />} />
        <Route path="/inventory/equipment" element={<EquipmentRecord />} />
        <Route path="/sales-transactions" element={<SalesTransaction />} />
        <Route path="/sales-transactions/sales" element={<SalesRecord />} />
        <Route path="/sales-transactions/expenses" element={<ExpensesRecord />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)