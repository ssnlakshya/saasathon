import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src="/assets/Lakshya Logo Transparent.png" alt="Lakshya Logo" className="h-10 w-auto brightness-0 invert" />
                    <span className="text-xl font-bold tracking-tight text-slate-100">SaaSathon</span>
                </div>
                <nav className="hidden md:flex items-center gap-10">
                    <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="/#about">About</a>
                    <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="/#timeline">Timeline</a>
                    <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="/#prizes">Prizes</a>
                    <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="/#faq">FAQ</a>
                </nav>
                <div className="flex items-center gap-4">
                    <Link to="/register" className="bg-primary hover:bg-primary/90 text-background-dark px-5 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
                        Register Now
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
