
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaList, FaBox, FaCog, FaSignOutAlt, FaLayerGroup } from "react-icons/fa";
import { Button } from "../../../components/common/index";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/", icon: <FaHome /> },
        { name: "Categories", path: "/categories", icon: <FaList /> },
        { name: "Products", path: "/products", icon: <FaBox /> },
        { name: "Settings", path: "/settings", icon: <FaCog /> },
    ];

    return (
        <aside className="w-64 border-r border-divider bg-default-50 flex flex-col justify-between hidden md:flex shrink-0">
            <div>
                {/* LOGO AREA - Enhanced with Icon & Clear Styling */}
                <div className="h-16 flex items-center gap-3 px-6 border-b border-divider bg-default-100/50">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-md">
                        <FaLayerGroup className="text-sm" />
                    </div>
                    <span className="text-lg font-bold tracking-wide text-foreground">
                        AdminPanel
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

            {/* Sidebar Footer / Logout */}
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