import { BrowserRouter as Router } from "react-router-dom"
import SideBar from "./Components/SideBar"
// import NavBar from "./Components/NavBar"
import TopMerchants from "./Components/TopMerchants"
import Home from "./Components/Home"

function App() {

  return (
    <Router>
      <div className="flex h-screen">
        {/* <NavBar /> */}
        <SideBar />
        <Home />
        {/* <TopMerchants /> */}
      </div>
    </Router>
  )
}

export default App
