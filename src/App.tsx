import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import OverviewPage from "./pages/Overview"
import GoalsPage from "./pages/Goals"
import Year from "./pages/budget-pages/Year"
import SettingsPage from "./pages/Settings"
import CurrencyConverterPage from "./pages/CurrencyConverter"
import Month from "./pages/budget-pages/Month"
import MonthBudget from "./pages/budget-pages/MonthBudget"

import './App.css'

function App() {
  return (
    <BrowserRouter basename="/personal-budgeting-web-app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/Overview" replace />} />
          <Route path="Overview" element={<OverviewPage />} />
          <Route path="Goals" element={<GoalsPage />} />
          <Route path="BudgetSheets" element={<Year />} />
          <Route path="BudgetSheets/:year" element={<Month />} />
          <Route path="BudgetSheets/:year/:month" element={<MonthBudget />} />
          <Route path="Settings" element={<SettingsPage />} />
          <Route path="Convert" element={<CurrencyConverterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
