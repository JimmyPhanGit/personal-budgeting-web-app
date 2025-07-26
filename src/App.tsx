import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import OverviewPage from "./pages/Overview"
import GoalsPage from "./pages/Goals"
import BudgetsPage from "./pages/Budgets"
import SettingsPage from "./pages/Settings"
import CurrencyConverterPage from "./pages/CurrencyConverter"

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/Overview" replace />} />
          <Route path="Overview" element={<OverviewPage />} />
          <Route path="Goals" element={<GoalsPage />} />
          <Route path="BudgetSheets" element={<BudgetsPage />} />
          <Route path="Settings" element={<SettingsPage />} />
          <Route path="Convert" element={<CurrencyConverterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
