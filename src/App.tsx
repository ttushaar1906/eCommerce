import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Home from "./Components/Home";
import ProductPage from "./Components/ProductPage";
import NavBar from "./Components/NavBar";
import { useState } from "react";

function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };
  
  return (
    <div className="overflow-y-auto hide-scrollbar h-screen">

    <Router>
      <NavBar toggleSidebar={toggleMobileSidebar} />
      <div className="flex">
        <div className={`fixed top-0 left-0 h-screen w-56 z-40 bg-amber-50 transform transition-transform duration-300 ease-in-out sm:hidden ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SideBar />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden sm:block sm:fixed sm:left-0 sm:top-0 sm:h-screen sm:w-56 z-10">
          <SideBar />
        </div>

        {/* Content */}
        <div className="ml-0 sm:ml-56 flex-1 h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  
    
  );
}

export default App;
