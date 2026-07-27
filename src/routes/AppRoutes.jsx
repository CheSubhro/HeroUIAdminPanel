
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Register from '../pages/Register'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Changepassword from '../pages/Changepassword'
import Forgotpassword from '../pages/Forgotpassword'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Services from '../pages/Services'
import Faq from '../pages/Faq'
import Privacy from '../pages/Privacy'
import Terms from '../pages/Terms'
import ComponentShowcase from '../pages/ComponentShowcase'

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/changepassword" element={<Changepassword />} />
                <Route path="/forgot-password" element={<Forgotpassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/componentshowcase" element={<ComponentShowcase />} />
                
                
                
            </Route>
        </Routes>
    );
}