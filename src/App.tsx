import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import SideBar from "./Components/SideBar"
import Home from "./Components/Home"
import ProductPage from "./Components/ProductPage"
import TopSellers from "./Components/TopSellers"

function App() {
  return (
    <Router>
      <div className="flex">
        <div className="fixed left-0 top-0 h-screen w-56 z-10">
          <SideBar />
        </div>

        {/* Main Content (scrollable) */}
        <div className="ml-56 flex-1 h-screen overflow-y-auto">
          <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />            
          </Routes>
        </div>
 </div>
    </Router>
  )
}

export default App
