import { BrowserRouter as Router } from "react-router-dom"
import SideBar from "./Components/SideBar"
import Home from "./Components/Home"

function App() {
  return (
    <Router>
      <div className="flex">
        <div className="fixed left-0 top-0 h-screen w-56 z-10">
          <SideBar />
        </div>

        {/* Main Content (scrollable) */}
        <div className="ml-56 flex-1 h-screen overflow-y-auto">
          <Home />
        </div>
      </div>
    </Router>
  )
}

export default App
