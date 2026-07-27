
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Button } from "../../common";

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/", icon: <FaHome /> },
        { name: "Users", path: "/users", icon: <FaUsers /> },
        { name: "Analytics", path: "/analytics", icon: <FaChartBar /> },
        { name: "Settings", path: "/settings", icon: <FaCog /> },
    ];

    return (
        <aside className="w-64 border-r border-divider bg-default-50 flex flex-col justify-between hidden md:flex shrink-0">
            <div>
                {/* Logo / Brand Area */}
                <div className="h-16 flex items-center px-6 border-b border-divider">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ClientDash
                </span>
                </div>

                {/* Navigation Menu */}
                <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                    <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-medium text-sm font-medium transition-colors ${
                        isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-default-600 hover:bg-default-200/50 hover:text-default-900"
                        }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {item.name}
                    </button>
                    );
                })}
                </nav>
            </div>

            {/* Sidebar Footer / Logout using Common Button */}
            <div className="p-4 border-t border-divider">
                <Button
                color="danger"
                variant="flat"
                className="w-full flex items-center justify-center gap-2"
                >
                <FaSignOutAlt /> Log Out
                </Button>
            </div>
        </aside>
    );
}