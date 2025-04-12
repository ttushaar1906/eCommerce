import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import SideBar from "./Components/SideBar"
import Home from "./Components/Home"
import ProductPage from "./Components/ProductPage"

function App() {
  return (
    <Router>
      <div className="flex">
        <div className="fixed left-0 top-0 h-screen w-32 sm:w-56 z-10">
          <SideBar />
        </div>

        <div className="ml-32 sm:ml-56 flex-1 h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
