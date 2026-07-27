
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import { Badge } from "../../common"; 

export default function Navbar() {
    
    const navigate = useNavigate();

    return (
        <header className="h-16 border-b border-divider bg-background/60 backdrop-blur-md flex items-center justify-between px-6 z-10 shrink-0 sticky top-0">
            {/* Search Bar */}
            <div className="flex items-center gap-4 flex-1 max-w-md">
                <div className="relative w-full">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-default-400">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full pl-9 pr-4 py-1.5 text-sm bg-default-100 border border-transparent focus:border-primary rounded-medium outline-none transition-all"
                    />
                </div>
            </div>

            {/* Right Side Icons & Profile */}
            <div className="flex items-center gap-4">
                {/* Notification with Common Badge */}
                <div className="relative cursor-pointer p-2 rounded-full hover:bg-default-100 transition-colors flex items-center">
                    <FaBell className="text-default-500 text-lg" />
                    <div className="absolute top-0 right-0">
                        <Badge content="3" color="danger" />
                    </div>
                </div>

                {/* Profile Avatar */}
                <img
                    src="https://i.pravatar.cc/150?u=admin"
                    alt="Admin"
                    className="w-9 h-9 rounded-full border-2 border-primary object-cover cursor-pointer"
                    onClick={() => navigate("/settings")}
                />
            </div>
        </header>
    );
}