
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Dropdown, 
    DropdownTrigger, 
    DropdownMenu, 
    DropdownItem, 
    Avatar 
} from "@heroui/react";
import Button from '../../common/Button/Button'; 

export default function Navbar() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const navigate = useNavigate();

    // Ref for the entire navbar component
    const navbarRef = useRef(null);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact Us' },
        { to: '/componentshowcase', label: 'Componentshowcase' },
    ];

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsDropdownOpen(false);
        navigate('/');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                setIsDropdownOpen(false); 
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header ref={navbarRef} className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-slate-950/20 transition-colors">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                
                {/* Logo with Modern Glow Effect */}
                <Link to="/" className="group flex items-center gap-2.5 font-extrabold text-2xl tracking-wide">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-900/30 group-hover:scale-105 transition-transform duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                        MyApp
                    </span>
                </Link>

                {/* Desktop Menu with pill hover indicator */}
                <nav className="hidden sm:flex items-center gap-2 bg-slate-800/40 p-1.5 rounded-full border border-slate-800 backdrop-blur-md">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.to} 
                            to={link.to} 
                            className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-full transition-all duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions / Profile */}
                <div className="flex items-center gap-4">
                    {!isLoggedIn ? (
                        <div className="flex items-center gap-3">
                            {/* Demo toggle button for testing login state preview */}
                            <button 
                                onClick={() => setIsLoggedIn(true)}
                                className="hidden md:inline-flex text-xs text-slate-400 hover:text-emerald-400 underline transition-colors"
                            >
                                (Simulate Login)
                            </button>
                            <Button 
                                as={Link} 
                                to="/login" 
                                size="md" 
                                className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl shadow-lg shadow-emerald-900/20 transition-all duration-200" 
                            >
                                Login
                            </Button>
                        </div>
                    ) : (
                        <Dropdown 
                            placement="bottom-end" 
                            isOpen={isDropdownOpen} 
                            onOpenChange={(open) => setIsDropdownOpen(open)}
                        >
                            <DropdownTrigger>
                                <div className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-800/60 transition-colors cursor-pointer group">
                                    <Avatar
                                        as="button"
                                        className="transition-transform group-hover:scale-105 ring-2 ring-emerald-500/60 shadow-md"
                                        name="User"
                                        size="sm"
                                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                    />
                                    <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Profile Actions" 
                                variant="flat"
                                className="p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl text-slate-200 w-64"
                            >
                                <DropdownItem key="profile" className="h-16 gap-2 opacity-100 cursor-default bg-slate-800/50 rounded-xl mb-1">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Signed in as</p>
                                    <p className="text-sm font-bold text-emerald-400 truncate">user@example.com</p>
                                </DropdownItem>
                                
                                <DropdownItem 
                                    key="my_profile" 
                                    onPress={() => { setIsDropdownOpen(false); navigate('/profile'); }}
                                    className="rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors py-2.5 font-medium"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        My Profile
                                    </div>
                                </DropdownItem>

                                <DropdownItem 
                                    key="change_password" 
                                    onPress={() => { setIsDropdownOpen(false); navigate('/changepassword'); }}
                                    className="rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors py-2.5 font-medium"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                                        Password Change
                                    </div>
                                </DropdownItem>

                                <DropdownItem 
                                    key="logout" 
                                    className="text-red-400 hover:bg-red-500/10 rounded-lg transition-colors py-2.5 font-medium mt-1" 
                                    color="danger" 
                                    onPress={handleLogout}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                        Log Out
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}

                    {/* Mobile Menu Button with smooth icon transition */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        aria-label="Navbar Toggle Menu"
                        className="sm:hidden p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none transition-colors border border-slate-700/50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu with Animation */}
            {isMenuOpen && (
                <div className="sm:hidden border-t border-slate-800/80 bg-slate-900/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.to} 
                            to={link.to} 
                            onClick={() => setIsMenuOpen(false)} 
                            className="text-base font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 px-4 py-2.5 rounded-xl transition-all"
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isLoggedIn && (
                        <div className="pt-3 mt-2 border-t border-slate-800 flex flex-col gap-2">
                            <button 
                                onClick={() => { setIsLoggedIn(false); setIsMenuOpen(false); }}
                                className="w-full py-2.5 text-center text-sm font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}