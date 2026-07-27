
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from '../components/layout/index';

const MainLayout = () => {
    
    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* SIDEBAR  */}
            <Sidebar />

            {/* RIGHT SIDE CONTAINER (Navbar + Main Content + Footer) */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Navbar />
                
                <main className="flex-1 overflow-y-auto p-6 bg-default-50/30">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;