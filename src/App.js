import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import ViewExpensePage from "./pages/ViewExpensePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/view/expenses' element={<ViewExpensePage />} />
      </Routes>
    </Router>
  )
}

export default App
