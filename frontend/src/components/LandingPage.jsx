import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Rocket, BadgeCheck, BarChart, LogIn, Lightbulb, Code, Users, CreditCard, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [activeFaq, setActiveFaq] = useState(null);

    useEffect(() => {
        const countdownDate = new Date('2026-04-11T00:00:00');

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            setTimeLeft({
                days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
                hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
                minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
                seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0'),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const toggleFaq = (id) => {
        setActiveFaq(activeFaq === id ? null : id);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    };

    return (
        <main className="pt-16">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden hero-gradient">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.div
                        {...fadeInUp}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        36 Hours of Building
                    </motion.div>
                    <motion.h1
                        {...fadeInUp}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] pb-4 mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
                    >
                        SaaSathon  <span className="text-accent-blue">Registrations</span> Now Open.
                    </motion.h1>

                    <motion.p
                        {...fadeInUp}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        The ultimate SaaS-focused hackathon. Stop building features, start building businesses. Validate,
                        launch, and land your first customer in 36 hours.
                    </motion.p>
                    <motion.div
                        {...fadeInUp} 
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a href="https://forms.gle/e2Yy9vZfx7bTJCyT7" className="w-full sm:w-auto px-8 py-4 bg-primary text-background-dark font-bold rounded-xl text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30 flex items-center justify-center">
                            Register Now
                        </a>
                        <button className="w-full sm:w-auto px-8 py-4 glass-panel text-slate-100 font-bold rounded-xl text-lg hover:bg-white/10 transition-colors" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                            Learn More
                        </button>
                    </motion.div>
                </div>
            </section>

            
            {/* Countdown Timer */}
            <section className="py-12 bg-primary/5 border-y border-primary/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">The Ultimate Sprint Begins <span className="text-primary">April 11</span></h3>
                            <p className="text-slate-400 font-medium">Clear your schedule. SaaSathon 2026 is almost here.</p>
                        </div>
                        <div className="flex gap-4 md:gap-8 justify-center">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Mins', value: timeLeft.minutes },
                                { label: 'Secs', value: timeLeft.seconds },
                            ].map((item, i) => (
                                <div key={i} className="bg-background-dark/50 border border-white/5 p-4 rounded-xl min-w-[80px]">
                                    <div className="text-4xl md:text-5xl font-black text-primary">{item.value}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-2">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* About & Participation Section */}
            <section className="py-24 relative bg-white/[0.02] border-t border-white/5" id="about-details">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
                    <motion.div {...fadeInUp} className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                        <h3 className="text-3xl font-bold mb-6 tracking-tight text-white">What is <span className="text-primary">SaaSathon?</span></h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            SaaSathon 2026 is India's first national-level Startup Launch Hackathon, where participants don't just build products — they build, launch, market, and sell them within 36 hours. Unlike traditional hackathons that end with a prototype, SaaSathon challenges teams to turn ideas into real revenue-generating software products.
                        </p>
                    </motion.div>

                    <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.8 }} className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-3xl group-hover:bg-accent-blue/20 transition-colors"></div>
                        <h3 className="text-3xl font-bold mb-6 tracking-tight text-white">Who can <span className="text-accent-blue">Participate?</span></h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            SaaSathon is a fully open national event — there are no restrictions based on college, university, city, age, year of study, or professional background. Anyone from anywhere in India can register and compete.
                        </p>
                    </motion.div>
                </div>
            </section>
           

            {/* Eligible Domains Section */}
            <section className="py-24 relative border-t border-white/5 bg-background-dark" id="domains">
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight text-white">Eligible <span className="text-primary">Domains</span></h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Build across a wide range of software-focused categories. From Developer Tools to Sustainability Tech, choose your battlefield.</p>
                    </motion.div>

                    <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.8 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {[
                            "SaaS & Cloud", "Developer Tools", "EdTech", "FinTech",
                            "AI / ML Products", "HealthTech", "HRTech & Productivity", "LegalTech",
                            "E-Commerce Tools", "MarketingTech", "Cybersecurity Tools", "AgriTech (SW)",
                            "Data & Analytics", "No-Code / Low-Code", "Communication SaaS", "GovTech (SW)",
                            "Gaming & Entertainment", "Creator Economy Tools", "Supply Chain (SW)", "Sustainability Tech"
                        ].map((domain, i) => (
                            <div key={i} className="glass-panel bg-white/[0.03] hover:bg-white/10 border border-white/10 hover:border-primary/40 rounded-xl p-6 flex items-center justify-center text-center transition-all duration-300 group shadow-lg shadow-black/20">
                                <span className="font-bold text-slate-300 group-hover:text-white text-sm md:text-base">{domain}</span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div {...fadeInUp} transition={{ delay: 0.4, duration: 0.8 }} className="glass-panel p-6 md:p-8 rounded-2xl border border-accent-blue/20 bg-accent-blue/5 flex flex-col sm:flex-row gap-4 sm:items-start text-center sm:text-left">
                        <div className="bg-accent-blue/10 p-3 rounded-xl inline-flex shrink-0 mx-auto sm:mx-0">
                            <Lightbulb className="text-accent-blue w-6 h-6" />
                        </div>
                        <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                            <span className="font-bold text-white block mb-1">Free Domain Allowed:</span>
                            Teams may build any software product that doesn't fit neatly into the above categories. All products must be software-first — web apps, mobile apps, browser extensions, APIs, CLI tools, or platforms.
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* Team Composition and Registration Fees */}
            <section className="py-24 relative border-y border-white/5 bg-background-dark" id="fees">
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight">Team Composition and <span className="text-accent-blue">Registration Fee</span></h2>
                        <p className="text-slate-400">Choose your team size. Special fees available for students.</p>
                    </motion.div>

                    <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.8 }} className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-center border-collapse">
                                <thead>
                                    <tr className="bg-accent-blue/10 border-b border-white/10">
                                        <th className="py-6 px-6 text-sm font-bold text-slate-300 uppercase tracking-wider w-1/3">Team Size</th>
                                        <th className="py-6 px-6 border-l border-white/5 w-1/3">
                                            <div className="text-sm font-bold text-accent-blue uppercase tracking-wider">Registration Fee</div>
                                            <div className="text-xs text-slate-400 mt-1">( Students )</div>
                                        </th>
                                        <th className="py-6 px-6 border-l border-white/5 w-1/3">
                                            <div className="text-sm font-bold text-accent-blue uppercase tracking-wider">Registration Fee</div>
                                            <div className="text-xs text-slate-400 mt-1">( Professionals )</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-lg font-medium text-slate-200">
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="py-6 px-6">2 Members</td>
                                        <td className="py-6 px-6 border-l border-white/5">₹1,000</td>
                                        <td className="py-6 px-6 border-l border-white/5">₹2,000</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors bg-white/[0.02]">
                                        <td className="py-6 px-6">3 Members</td>
                                        <td className="py-6 px-6 border-l border-white/5">₹1,200</td>
                                        <td className="py-6 px-6 border-l border-white/5">₹2,500</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="py-6 px-6">4 Members</td>
                                        <td className="py-6 px-6 border-l border-white/5">₹1,500</td>
                                        <td className="py-6 px-6 border-l border-white/5">₹3,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Team Rules */}
                    <motion.div {...fadeInUp} transition={{ delay: 0.4, duration: 0.8 }} className="mt-12 glass-panel p-6 md:p-8 rounded-2xl border border-primary/20 bg-primary/5">
                        <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">gavel</span>
                            Team Rules
                        </h3>
                        <ul className="space-y-4 text-slate-300 text-lg">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 bg-white/10 rounded-full p-1 shrink-0">
                                    <span className="material-symbols-outlined text-primary text-sm">group</span>
                                </div>
                                <span>Teams must have a <strong className="text-white">minimum of 2</strong> and a <strong className="text-white">maximum of 4</strong> members.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 bg-white/10 rounded-full p-1 shrink-0">
                                    <span className="material-symbols-outlined text-primary text-sm">public</span>
                                </div>
                                <span><strong className="text-white">Cross-college, cross-company, and cross-city</strong> teams are fully allowed and encouraged.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 bg-red-500/10 rounded-full p-1 shrink-0">
                                    <span className="material-symbols-outlined text-red-400 text-sm">block</span>
                                </div>
                                <span>Solo participants (1 member) are <strong className="text-red-400">NOT eligible</strong> — you must form a team of at least 2.</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            
            

            {/* Sponsors */}
            <section className="py-16 border-y border-white/5 bg-background-dark/50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-center text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">Our Sponsors</h2>
                    <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-primary mb-10">Platinum Sponsor</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80 hover:opacity-100 transition-opacity">
                        <a href="https://typesense.org/" target="_blank" rel="noopener noreferrer" className="h-16 px-10 bg-[#0c0c0c] border border-white/10 rounded-full flex items-center justify-center text-2xl hover:border-white/20 transition-all text-white shadow-2xl">
                            <img src="/assets/typesense-logo.jpg" alt="Typesense Logo" className="h-8 w-auto mr-4 mix-blend-screen" />
                            <span className="font-medium tracking-tight font-sans">type<span className="font-black">sense</span></span>
                        </a>
                    </div>

                    <div className="mt-16 flex flex-col items-center justify-center text-center">
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Want to sponsor us ?</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="https://ssn.lat/FinalBrochure" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 rounded-lg font-bold transition-colors">
                                View Brochure
                            </a>
                            <a href="https://ssn.lat/Sponsorship" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-bold transition-colors">
                                Become a Sponsor
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 relative" id="about">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div {...fadeInUp}>
                            <h2 className="text-4xl font-bold mb-6">Redefining the Hackathon <br /><span className="text-primary">Experience.</span></h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Most hackathons end at the demo. SaaSathon ends at the sale. We focus on product-market fit,
                                sustainable architecture, and actual commercial viability.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                                    <BadgeCheck className="text-primary mb-3" />
                                    <h4 className="font-bold text-slate-100">Market Ready</h4>
                                    <p className="text-sm text-slate-500">Go beyond the MVP to a shippable product.</p>
                                </div>
                                <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                                    <BarChart className="text-primary mb-3" />
                                    <h4 className="font-bold text-slate-100">Metric Driven</h4>
                                    <p className="text-sm text-slate-500">Judged on actual user feedback and potential.</p>
                                </div>
                            </div>
                        </motion.div>
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                {...fadeInUp} transition={{ delay: 0.2 }}
                                className="aspect-square glass-panel rounded-2xl p-6 flex flex-col justify-end group hover:bg-primary/5 transition-colors"
                            >
                                <span className="text-5xl font-black text-white group-hover:text-primary mb-2">36h</span>
                                <span className="text-slate-500 font-medium">Of intense focus</span>
                            </motion.div>
                            <motion.div
                                {...fadeInUp} transition={{ delay: 0.4 }}
                                className="aspect-square glass-panel rounded-2xl p-6 flex flex-col justify-end translate-y-8 group hover:bg-primary/5 transition-colors"
                            >
                                <span className="text-5xl font-black text-white group-hover:text-primary mb-2">50+</span>
                                <span className="text-slate-500 font-medium">Startups Incubated</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-white/[0.02]" id="timeline">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">The 36-Hour Sprint</h2>
                        <p className="text-slate-400">A structured journey from zero to one.</p>
                    </div>
                    <div className="relative space-y-12">
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent"></div>
                        {[
                            { hour: '0 - 2', title: 'Grand Opening & Team Formation', desc: 'Keynote speech, team matching for solo participants, and theme reveal.', icon: LogIn },
                            { hour: '2 - 4', title: 'Product Pitching & Brainstorming', desc: 'Validate your idea with mentors. Pivot early, pivot fast. Define your core SaaS value prop.', icon: Lightbulb },
                            { hour: '4 - 12', title: 'The Build Sprint', desc: 'Heads down building. Focus on the \'SaaS\' essentials: Auth, Billing, and Core Logic.', icon: Code },
                            { hour: '12 - 18', title: 'Expert Mentorship', desc: '1-on-1 sessions with SaaS founders and CTOs to polish your architecture and pitch.', icon: Users },
                            { hour: '18 - 32', title: 'Sales Validation', desc: 'Unique phase: Reach out to potential users for feedback. Get a \'Pre-sign up\' or \'Letter of Intent\'.', icon: CreditCard },
                            { hour: '32 - 36', title: 'Final Demo & Pitching', desc: 'The grand finale. Pitch your SaaS to a panel of VCs and successful founders.', icon: Trophy },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                className="relative flex items-start gap-8 timeline-milestone"
                            >
                                <div className={`z-10 w-16 h-16 rounded-full glass-panel border ${i === 0 || i === 5 ? 'border-primary/40' : 'border-white/10'} flex items-center justify-center shrink-0`}>
                                    <step.icon className={i === 0 || i === 5 ? 'text-primary' : 'text-white'} />
                                </div>
                                <div className="pt-3">
                                    <span className={`${i === 0 || i === 5 ? 'text-primary' : 'text-slate-500'} text-xs font-bold tracking-widest uppercase mb-1 block`}>Hour {step.hour}</span>
                                    <h3 className="text-xl font-bold text-slate-100 mb-2">{step.title}</h3>
                                    <p className="text-slate-400">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prize Pool */}
            <section className="py-24 relative overflow-hidden" id="prizes">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#ffae0020_0%,transparent_50%)]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div {...fadeInUp} className="glass-panel rounded-3xl p-12 text-center border-primary/20">
                        <h2 className="text-3xl font-bold text-slate-100 mb-4">The Prize Pool</h2>
                        <div className="text-7xl md:text-9xl font-black text-primary mb-6 tracking-tighter">
                            ₹1,00,000
                        </div>
                        <p className="text-xl text-slate-400 max-w-xl mx-auto mb-10">
                            In cash prizes, plus cloud credits, mentorship opportunities, and direct entry to accelerator programs.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {[
                                { title: '1st Place', amount: '₹40,000', desc: 'Cash' },
                                { title: '2nd Place', amount: '₹25,000', desc: 'Cash' },
                                { title: 'Best UI/UX', amount: '₹10,000', desc: 'Cash' },
                                { title: 'Best MicroSaaS', amount: '₹25,000', desc: 'Cash' },
                            ].map((prize, i) => (
                                <div
                                    key={i}
                                    className={`p-6 bg-white/5 rounded-xl border border-white/5 ${
                                        i === 3 ? 'md:col-span-3 md:max-w-md md:mx-auto text-center' : 'text-left'
                                    }`}
                                >
                                    <span className="text-slate-500 text-xs font-bold uppercase mb-2 block">{prize.title}</span>
                                    <div className="text-2xl font-bold text-white mb-1">{prize.amount}</div>
                                    <p className="text-sm text-slate-500">{prize.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white/[0.02]" id="faq">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-400">Everything you need to know about the SaaSathon.</p>
                    </div>
                    <div className="space-y-4">
                        {[
                            { id: 1, q: "Who can participate?", a: "SaaSathon is open to students, developers, designers, and entrepreneurs. Whether you're a solo builder or part of a team (up to 4 members), you're welcome!" },
                            { id: 2, q: "Is there a registration fee?", a: "A registration fee per team size is required (₹1000 - ₹3000 depending on members). We jugaad food and refreshments for everyone." },
                            { id: 3, q: "What if I don't have a team?", a: "No problem! We'll have a team-matching session at the beginning of the event to help you find like-minded builders." },
                        ].map((faq) => (
                            <div
                                key={faq.id}
                                className={`glass-panel rounded-2xl border transition-all duration-500 overflow-hidden ${activeFaq === faq.id
                                        ? 'border-primary/40 bg-primary/5 shadow-2xl shadow-primary/5'
                                        : 'border-white/5 bg-white/[0.02]'
                                    }`}
                            >
                                <button
                                    className="w-full p-6 text-left flex items-center justify-between group"
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <span className={`text-lg font-bold transition-colors duration-300 ${activeFaq === faq.id ? 'text-primary' : 'text-slate-100 group-hover:text-primary'}`}>
                                        {faq.q}
                                    </span>
                                    <ChevronDown
                                        size={20}
                                        className={`transition-all duration-500 ease-out ${activeFaq === faq.id
                                                ? 'rotate-180 text-primary scale-125'
                                                : 'text-slate-500 group-hover:text-primary'
                                            }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: 'auto',
                                                opacity: 1,
                                                transition: {
                                                    height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                                                    opacity: { duration: 0.25, delay: 0.1 }
                                                }
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                                transition: {
                                                    height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                                                    opacity: { duration: 0.2 }
                                                }
                                            }}
                                        >
                                            <div className="px-6 pb-6 text-slate-400 leading-relaxed max-w-2xl border-t border-white/5 pt-4 mt-2">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 border-t border-white/5 relative overflow-hidden">
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[100px] rounded-full"></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.h2 {...fadeInUp} className="text-5xl font-black mb-6">Ready to launch?</motion.h2>
                    <motion.p {...fadeInUp} transition={{ delay: 0.2 }} className="text-xl text-slate-400 mb-10 leading-relaxed">
                        Applications are now live! Secure your spot for the 2026 cohort.
                    </motion.p>
                    <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="https://forms.gle/e2Yy9vZfx7bTJCyT7" className="w-full sm:w-auto px-10 py-5 bg-primary text-background-dark font-black rounded-xl text-xl hover:scale-105 transition-transform shadow-2xl shadow-primary/40 flex items-center justify-center">
                            Secure Your Spot
                        </a>
                    </motion.div>
                    <p className="mt-8 text-slate-500 text-sm font-medium">Registration fees vary by team size. Pay during physical registration.</p>
                </div>
            </section>
        </main>
    );
};

export default LandingPage;
