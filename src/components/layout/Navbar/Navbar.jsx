
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserShield } from "react-icons/fa";
import { Badge } from "../../common"; 

export default function Navbar() {
    
    const navigate = useNavigate();

    return (
        <header className="h-16 border-b border-gray-800 bg-[#0f1117]/80 backdrop-blur-md flex items-center justify-between px-6 z-10 shrink-0 sticky top-0">
            {/* Left Side (Empty space) */}
            <div></div>

            {/* Right Side Icons & Profile */}
            <div className="flex items-center gap-4">
                {/* Notification with Common Badge */}
                <button 
                    type="button"
                    className="relative p-2 rounded-full hover:bg-gray-800/60 transition-colors flex items-center text-gray-300 focus:outline-none cursor-pointer"
                    aria-label="View notifications"
                >
                    <FaBell className="text-gray-400 text-lg hover:text-white transition-colors" />
                    <span className="absolute top-1 right-1">
                        <Badge content="3" color="danger" />
                    </span>
                </button>

                {/* Admin Icon Profile */}
                <div className="flex items-center gap-3 pl-2 border-l border-gray-800">
                    <div 
                        className="w-9 h-9 rounded-full border-2 border-blue-500 bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
                        onClick={() => navigate("/profile")}
                        title="Admin Profile"
                    >
                        <FaUserShield className="text-blue-400 text-base" />
                    </div>
                </div>
            </div>
        </header>
    );
}