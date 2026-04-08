import React from 'react';
import { Rocket } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 border-t border-white/5 bg-background-dark">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3 opacity-60">
                        <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-background-dark">
                            <Rocket size={14} />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-100">SaaSathon</span>
                    </div>
                    <div className="flex flex-wrap gap-6 md:gap-8 text-sm text-slate-500">
                        <a className="hover:text-primary transition-colors" href="https://lakshya.ssn.lat/" target="_blank" rel="noopener noreferrer">More about Lakshya Club</a>
                        <a className="hover:text-primary transition-colors" href="https://www.instagram.com/ssnlakshya/" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a className="hover:text-primary transition-colors" href="https://chat.whatsapp.com/FHySPjwzZuR84IFn3aTZTH" target="_blank" rel="noopener noreferrer">Whatsapp</a>
                    </div>
                    <p className="text-sm text-slate-600">© 2026 SaaSathon. Build the future.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
