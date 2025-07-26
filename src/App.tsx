import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import OverviewPage from "./pages/Overview"

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/Overview" replace />} />
          <Route path="Overview" element={<OverviewPage />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
