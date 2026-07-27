
import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterForm from '../../../features/newsletter/NewsletterForm';

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-200 border-t border-slate-800 mt-auto transition-colors">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">
                    
                    {/* Column 1: Brand & Bio (Span 4) */}
                    <div className="space-y-4 md:col-span-4">
                        <Link to="/" className="inline-block font-extrabold text-2xl text-teal-400">
                            MyApp
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Building scalable, modern, and high-performance web applications with cutting-edge technologies and sleek user interfaces.
                        </p>
                        <div className="flex space-x-3 pt-2">
                            <a 
                                href="https://github.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-teal-500 hover:text-white transition-all duration-200"
                            >
                                <span className="sr-only">GitHub</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-teal-500 hover:text-white transition-all duration-200"
                            >
                                <span className="sr-only">Twitter</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links (Span 2) */}
                    <div className="space-y-3 md:col-span-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100">Navigation</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-teal-400 transition-colors">Services</Link></li>
                            <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Support & Legal (Span 2) */}
                    <div className="space-y-3 md:col-span-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100">Support</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link to="/faq" className="hover:text-teal-400 transition-colors">FAQ</Link></li>
                            <li><Link to="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter Subscription (Span 4) */}
                    <NewsletterForm />

                </div>

                {/* Bottom Bar: Copyright & Credit */}
                <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>&copy; {currentYear} MyApp. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Crafted with <span className="text-rose-500">❤️</span> using <span className="text-teal-400 font-medium">HeroUI</span> & <span className="text-teal-400 font-medium">Tailwind CSS</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}