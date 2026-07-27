
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components/layout/index';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
            <Footer /> 
        </div>
    );
};

export default MainLayout;