
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Gift, Home, Plus, User } from "lucide-react";

const TabBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="tab-bar">
      <Link to="/" className={`tab-button ${currentPath === "/" ? "active" : ""}`}>
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link to="/calendar" className={`tab-button ${currentPath === "/calendar" ? "active" : ""}`}>
        <Calendar className="h-6 w-6" />
        <span className="text-xs mt-1">Calendar</span>
      </Link>
      
      <div className="relative -mt-6">
        <Link 
          to="/add" 
          className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-purple text-white shadow-lg"
        >
          <Plus className="h-7 w-7" />
        </Link>
      </div>
      
      <Link to="/gifts" className={`tab-button ${currentPath === "/gifts" ? "active" : ""}`}>
        <Gift className="h-6 w-6" />
        <span className="text-xs mt-1">Gifts</span>
      </Link>
      
      <Link to="/profile" className={`tab-button ${currentPath === "/profile" ? "active" : ""}`}>
        <User className="h-6 w-6" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default TabBar;
