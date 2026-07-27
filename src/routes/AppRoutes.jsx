
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Register from '../pages/Register'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Changepassword from '../pages/Changepassword'
import Forgotpassword from '../pages/Forgotpassword'
import Dashboard from '../pages/Dashboard'
import Categories from '../pages/Categories'

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/changepassword" element={<Changepassword />} />
                <Route path="/forgot-password" element={<Forgotpassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/categories" element={<Categories />} />
                
            </Route>
        </Routes>
    );
}