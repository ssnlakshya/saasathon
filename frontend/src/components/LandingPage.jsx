import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Rocket, BadgeCheck, BarChart, LogIn, Lightbulb, Code, Users, CreditCard, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [activeFaq, setActiveFaq] = useState(null);

    useEffect(() => {
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 30);

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
                        className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
                    >
                        SaaSathon — <span className="text-accent-blue">Build.</span> Launch. Sell.
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
                        <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-primary text-background-dark font-bold rounded-xl text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30 flex items-center justify-center">
                            Apply to Participate
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-4 glass-panel text-slate-100 font-bold rounded-xl text-lg hover:bg-white/10 transition-colors">
                            View Rulebook
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Countdown Timer */}
            <section className="py-12 bg-primary/5 border-y border-primary/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">Registration Closes In</h3>
                            <p className="text-slate-400 font-medium">Secure your spot before the timer hits zero.</p>
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

            {/* Sponsors */}
            <section className="py-16 border-y border-white/5 bg-background-dark/50">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-10">Trusted & Supported by</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
                        {['LOGO 01', 'LOGO 02', 'LOGO 03', 'LOGO 04'].map((logo, i) => (
                            <div key={i} className="h-8 w-32 bg-slate-400/20 rounded-md flex items-center justify-center text-sm font-bold">
                                {logo}
                            </div>
                        ))}
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
                            { hour: '2 - 6', title: 'Product Pitching & Brainstorming', desc: 'Validate your idea with mentors. Pivot early, pivot fast. Define your core SaaS value prop.', icon: Lightbulb },
                            { hour: '6 - 24', title: 'The Build Sprint', desc: 'Heads down building. Focus on the \'SaaS\' essentials: Auth, Billing, and Core Logic.', icon: Code },
                            { hour: '24 - 28', title: 'Expert Mentorship', desc: '1-on-1 sessions with SaaS founders and CTOs to polish your architecture and pitch.', icon: Users },
                            { hour: '28 - 32', title: 'Sales Validation', desc: 'Unique phase: Reach out to potential users for feedback. Get a \'Pre-sign up\' or \'Letter of Intent\'.', icon: CreditCard },
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
                                { title: '1st Place', amount: '₹50,000', desc: 'Cash + Investor Meeting' },
                                { title: '2nd Place', amount: '₹30,000', desc: 'Cash + Cloud Credits' },
                                { title: 'Best UI/UX', amount: '₹20,000', desc: 'Cash + Design Tools' },
                            ].map((prize, i) => (
                                <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/5 text-left">
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
                            { id: 2, q: "Is there a registration fee?", a: "Nope! Registration fees is 1000RS per head We also provide food, drinks, and stickers!" },
                            { id: 3, q: "What if I don't have a team?", a: "No problem! We'll have a team-matching session at the beginning of the event to help you find like-minded builders." },
                        ].map((faq) => (
                            <div key={faq.id} className="glass-panel rounded-2xl border-white/5 overflow-hidden">
                                <button
                                    className="w-full p-6 text-left flex items-center justify-between group"
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <span className="font-bold text-slate-100 group-hover:text-primary transition-colors">{faq.q}</span>
                                    <ChevronDown className={`text-slate-500 group-hover:text-primary transition-transform duration-300 ${activeFaq === faq.id ? 'rotate-180' : ''}`} />
                                </button>
                                {activeFaq === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="px-6 pb-6 text-slate-400"
                                    >
                                        {faq.a}
                                    </motion.div>
                                )}
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
                        Applications close on October 15th. Limited slots available for the 2024 cohort.
                    </motion.p>
                    <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="w-full sm:w-auto px-10 py-5 bg-primary text-background-dark font-black rounded-xl text-xl hover:scale-105 transition-transform shadow-2xl shadow-primary/40 flex items-center justify-center">
                            Secure Your Spot
                        </Link>
                    </motion.div>
                    <p className="mt-8 text-slate-500 text-sm font-medium">₹1000 per member. Pay once you join or form a team.</p>
                </div>
            </section>
        </main>
    );
};

export default LandingPage;
