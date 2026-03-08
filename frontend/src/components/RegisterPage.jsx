import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// API Configuration - in a real app, this would be in a config file
const API_BASE_URL = 'http://localhost:5000'; // Assuming backend runs on 5000

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        collegeName: '',
        teamName: '',
        teamSize: '1',
        members: '',
        projectTitle: '',
        problemStatement: '',
        description: '',
        github: '',
        portfolio: '',
        builtSaaS: false,
        joinLater: false,
        agreeTerms: false
    });

    const [status, setStatus] = useState('idle'); // idle, loading, processing, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const [totalFee, setTotalFee] = useState(1000);

    useEffect(() => {
        let fee = 1000;
        if (formData.joinLater) {
            fee = 1000;
        } else {
            fee = parseInt(formData.teamSize) * 1000;
        }
        setTotalFee(fee);
    }, [formData.teamSize, formData.joinLater]);

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!formData.agreeTerms) {
            alert('Please agree to the terms and conditions.');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            // Step 1: Create Order on Backend
            // We use axios for better error handling and interceptors if needed later
            const response = await axios.post(`${API_BASE_URL}/api/create-order`, {
                amount: totalFee,
                currency: 'INR'
            });

            const order = response.data;

            // Step 2: Open Razorpay Checkout Modal
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY || 'YOUR_KEY_ID',
                amount: order.amount,
                currency: order.currency,
                name: "SaaSathon '24",
                description: "Registration Fee",
                order_id: order.id,
                handler: async function (razorpayResponse) {
                    setStatus('processing');
                    try {
                        // Step 3: Verify Payment on Backend
                        const verifyResponse = await axios.post(`${API_BASE_URL}/api/verify-payment`, {
                            razorpay_order_id: razorpayResponse.razorpay_order_id,
                            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                            razorpay_signature: razorpayResponse.razorpay_signature
                        });

                        if (verifyResponse.data.status === 'success') {
                            setStatus('success');
                        } else {
                            throw new Error("Payment verification failed");
                        }
                    } catch (error) {
                        setStatus('error');
                        setErrorMessage("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: formData.fullName,
                    email: formData.email
                },
                theme: {
                    color: "#ffae00"
                },
                modal: {
                    ondismiss: function () {
                        setStatus('idle');
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Error:", error);
            setStatus('error');
            setErrorMessage(error.response?.data?.error || "Could not initialize payment. Ensure backend is running.");
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-panel p-12 rounded-3xl max-w-lg w-full text-center border-primary/20"
                >
                    <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
                    <h1 className="text-4xl font-black mb-4">Registration Successful!</h1>
                    <p className="text-slate-400 text-lg mb-8">
                        Welcome to SaaSathon '24. We've sent a confirmation email to <span className="text-white">{formData.email}</span>.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary text-background-dark font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="flex flex-1 justify-center py-24 px-6 mt-16">
            <div className="layout-content-container flex flex-col max-w-3xl flex-1">
                <div className="flex flex-col gap-4 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest w-fit">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Registrations Open
                    </div>
                    <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tight">
                        SaaSathon <span className="text-primary">2024</span></h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">Build the next generation of Software-as-a-Service in 48 hours. Register your team below to secure your spot in the arena.</p>
                </div>

                <form onSubmit={handlePayment} className="space-y-16 pb-20">
                    {/* Section 1: Participant Information */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-background-dark font-bold text-sm">01</span>
                            <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Participant Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Full Name</label>
                                <input id="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all outline-none" placeholder="Alex Rivera" type="text" />
                            </div>
                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Email Address</label>
                                <input id="email" value={formData.email} onChange={handleInputChange} required className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all outline-none" placeholder="alex@university.edu" type="email" />
                            </div>
                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">College Name</label>
                                <input id="collegeName" value={formData.collegeName} onChange={handleInputChange} required className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all outline-none" placeholder="Tech Institute" type="text" />
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Team Details */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Team Details (Optional)</h2>
                        </div>
                        <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-slate-300 text-sm">
                            <p>You can register individually now and join or form a team later. Each member pays ₹1000.</p>
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <input type="checkbox" id="joinLater" checked={formData.joinLater} onChange={handleInputChange} className="rounded border-slate-700 text-primary focus:ring-primary bg-transparent" />
                            <label htmlFor="joinLater" className="text-slate-300 font-medium">I'll join/form a team later</label>
                        </div>

                        <AnimatePresence>
                            {!formData.joinLater && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-6 overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Team Name</label>
                                            <input id="teamName" value={formData.teamName} onChange={handleInputChange} className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all outline-none" placeholder="The SaaS Ninjas" type="text" />
                                        </div>
                                        <div>
                                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Team Size</label>
                                            <select id="teamSize" value={formData.teamSize} onChange={handleInputChange} className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all outline-none appearance-none">
                                                <option value="1">1 (Solo) - ₹1000</option>
                                                <option value="2">2 Members - ₹2000</option>
                                                <option value="3">3 Members - ₹3000</option>
                                                <option value="4">4 Members - ₹4000</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Member Names (comma separated)</label>
                                        <textarea id="members" value={formData.members} onChange={handleInputChange} className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all outline-none resize-none" placeholder="Member 1, Member 2..." rows="2"></textarea>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* Section 3: Startup Idea */}
                    <section className="p-8 rounded-xl bg-slate-100 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-background-dark font-bold text-sm">03</span>
                            <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Startup Idea</h2>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Project Title</label>
                                <input id="projectTitle" value={formData.projectTitle} onChange={handleInputChange} className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all outline-none" placeholder="EcoTrack AI" type="text" />
                            </div>
                            <div>
                                <label className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2">Idea Description</label>
                                <textarea id="description" value={formData.description} onChange={handleInputChange} className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all outline-none resize-none" placeholder="Briefly describe your solution..." rows="4"></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Submit Area */}
                    <div className="flex flex-col gap-6 pt-10 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-start gap-3">
                            <input id="agreeTerms" checked={formData.agreeTerms} onChange={handleInputChange} className="mt-1 rounded border-slate-700 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                            <label className="text-sm text-slate-500" htmlFor="agreeTerms">I agree to the SaaSathon terms of service, code of conduct, and privacy policy.</label>
                        </div>

                        <div className="p-6 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-between">
                            <span className="text-xl font-bold text-slate-100">Total Registration Fee</span>
                            <span className="text-3xl font-black text-primary">₹{totalFee}</span>
                        </div>

                        {errorMessage && (
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-500">
                                <AlertCircle size={20} />
                                <p className="text-sm">{errorMessage}</p>
                            </div>
                        )}

                        <button
                            disabled={status === 'loading' || status === 'processing'}
                            className="w-full py-5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-background-dark font-black text-xl shadow-[0_10px_30px_-10px_rgba(255,174,0,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                        >
                            {status === 'loading' ? 'Initializing...' : status === 'processing' ? 'Verifying...' : 'Proceed to Payment'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default RegisterPage;
