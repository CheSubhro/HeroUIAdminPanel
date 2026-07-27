
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";

export default function AdminNavbar() {

    const navigate = useNavigate();

    return (
        <nav className="w-full flex items-center justify-between px-6 py-3 border-b border-divider bg-background/60 backdrop-blur-md sticky top-0 z-50">
            {/* Brand / Logo */}
            <div className="flex items-center gap-2">
                <Link to="/" className="flex items-center gap-2 font-bold text-inherit">
                <span className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ClientDash
                </span>
                <span className="text-xs px-2 py-0.5 bg-primary/25 text-primary rounded-full">
                    Admin
                </span>
                </Link>
            </div>

            {/* Center Search Bar */}
            <div className="hidden sm:flex items-center justify-center flex-1 max-w-md mx-4">
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
                {/* Notification Badge */}
                <div className="relative cursor-pointer p-2 rounded-full hover:bg-default-100 transition-colors">
                <FaBell className="text-default-500 text-lg" />
                <span className="absolute top-1 right-1 bg-danger text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    3
                </span>
                </div>

                {/* User Profile Avatar */}
                <div className="flex items-center gap-2 cursor-pointer">
                <img
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    alt="Admin"
                    className="w-9 h-9 rounded-full border-2 border-primary object-cover"
                    onClick={() => navigate("/settings")}
                />
                </div>
            </div>
        </nav>
    );
}