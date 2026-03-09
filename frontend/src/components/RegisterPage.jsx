import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, AlertCircle, Upload, ExternalLink,
    CreditCard, Clipboard, FileCheck, Plus, Trash2, User, Mail, School, Phone, Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = '';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [leader, setLeader] = useState({
        name: '',
        email: '',
        college: '',
        phone: '',
        teamName: '',
        transactionId: ''
    });

    const [members, setMembers] = useState([]); // Array of { name: '', email: '' }
    const [screenshot, setScreenshot] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleLeaderChange = (e) => {
        const { id, value } = e.target;
        setLeader(prev => ({ ...prev, [id]: value }));
    };

    const handleMemberChange = (index, field, value) => {
        const updatedMembers = [...members];
        updatedMembers[index][field] = value;
        setMembers(updatedMembers);
    };

    const addMember = () => {
        if (members.length < 3) { // 1 Leader + 3 Members = 4 Total
            setMembers([...members, { name: '', email: '' }]);
        }
    };

    const removeMember = (index) => {
        const updatedMembers = members.filter((_, i) => i !== index);
        setMembers(updatedMembers);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size should be less than 5MB");
                return;
            }
            setScreenshot(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (members.length < 1) {
            alert('Minimum team size is 2 (Leader + at least 1 Member).');
            return;
        }

        if (!screenshot) {
            alert('Please upload your payment screenshot.');
            return;
        }

        if (!leader.transactionId) {
            alert('Please enter your Transaction ID.');
            return;
        }

        if (!agreeTerms) {
            alert('Please verify and agree to the terms.');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        const data = new FormData();
        data.append("teamName", leader.teamName);
        data.append("transactionId", leader.transactionId);
        data.append("screenshot", screenshot);
        data.append("leader", JSON.stringify({
            name: leader.name,
            email: leader.email,
            college: leader.college,
            phone: leader.phone
        }));
        data.append("members", JSON.stringify(members));

        try {
            const response = await axios.post(`${API_BASE_URL}/api/register-with-proof`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                setStatus('success');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setStatus('error');
            setErrorMessage(error.response?.data?.error || "Submission failed. Please check your data.");
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
                    <h1 className="text-4xl font-black mb-4">Team Registered!</h1>
                    <p className="text-slate-400 text-lg mb-8">
                        Wait for verification. We have received your team details and payment proof for <span className="text-white">{leader.teamName}</span>.
                    </p>
                    <button onClick={() => navigate('/')} className="bg-primary text-background-dark font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform">
                        Back to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="flex flex-col items-center py-24 px-6 mt-16 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-black mb-4">Register Your <span className="text-primary">Team</span></h1>
                <p className="text-slate-400 text-lg">Fill in your team details first, then proceed to payment.</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-12">

                {/* Section 1: Team & Leader Details */}
                <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-background-dark text-xl font-black">1</span>
                        <h2 className="text-3xl font-black">Team Details</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Leader Details */}
                        <div className="lg:col-span-2 space-y-10">
                            <section className="space-y-6">
                                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                    <User size={20} /> Team Leader (Member 0)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 ml-1">Full Name</label>
                                        <input id="name" value={leader.name} onChange={handleLeaderChange} required className="w-full rounded-xl border border-white/10 bg-white/5 p-4 focus:ring-2 focus:ring-primary/50 transition-all outline-none" placeholder="Leader Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 ml-1">Email</label>
                                        <input id="email" type="email" value={leader.email} onChange={handleLeaderChange} required className="w-full rounded-xl border border-white/10 bg-white/5 p-4 focus:ring-2 focus:ring-primary/50 transition-all outline-none" placeholder="leader@email.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 ml-1">College</label>
                                        <input id="college" value={leader.college} onChange={handleLeaderChange} required className="w-full rounded-xl border border-white/10 bg-white/5 p-4 focus:ring-2 focus:ring-primary/50 transition-all outline-none" placeholder="University Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 ml-1">Phone Number</label>
                                        <input id="phone" type="tel" value={leader.phone} onChange={handleLeaderChange} required className="w-full rounded-xl border border-white/10 bg-white/5 p-4 focus:ring-2 focus:ring-primary/50 transition-all outline-none" placeholder="+91 98765 43210" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-slate-500 ml-1">Team Name</label>
                                        <input id="teamName" value={leader.teamName} onChange={handleLeaderChange} required className="w-full rounded-xl border border-white/10 bg-white/5 p-4 focus:ring-2 focus:ring-primary/50 transition-all outline-none font-bold text-lg text-primary" placeholder="e.g. ByteBandits" />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Dynamic Members */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                    <Users size={20} /> Team Members
                                </h3>
                                <span className="text-xs font-bold text-slate-500 bg-white/5 px-2 py-1 rounded">
                                    {members.length + 1} / 4
                                </span>
                            </div>

                            <div className="space-y-6">
                                <AnimatePresence>
                                    {members.map((member, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 relative group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Member {index + 1}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeMember(index)}
                                                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                <input
                                                    placeholder="Name"
                                                    value={member.name}
                                                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                                    required
                                                    className="w-full bg-background-dark border border-white/5 rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary/50 outline-none"
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    value={member.email}
                                                    onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                                    required
                                                    className="w-full bg-background-dark border border-white/5 rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary/50 outline-none"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {members.length < 3 && (
                                    <button
                                        type="button"
                                        onClick={addMember}
                                        className="w-full py-4 rounded-2xl border-2 border-dashed border-white/10 text-slate-400 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <Plus size={20} />
                                        <span className="text-sm font-bold">Add Team Member</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Payment & Proof */}
                <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-background-dark text-xl font-black">2</span>
                        <h2 className="text-3xl font-black">Payment & Proof</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                                    <CreditCard size={20} className="text-primary" /> 1. Pay Registration Fee
                                </h3>
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    Fee: <span className="text-white font-bold">₹1000 per member</span>.
                                    Total for your team: <span className="text-primary font-black text-2xl">₹{(members.length + 1) * 1000}</span>
                                </p>
                                <a
                                    href="https://rzp.io/l/saasathon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-3 bg-primary text-background-dark font-black py-4 rounded-2xl text-lg hover:scale-[1.02] transition-all shadow-xl shadow-primary/30"
                                >
                                    Pay Now via Razorpay <ExternalLink size={18} />
                                </a>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                    <Clipboard size={20} className="text-primary" /> 2. Copy Transaction ID
                                </h3>
                                <p className="text-sm text-slate-500">
                                    After successful payment, copy the Transaction ID (Reference No.) from the Razorpay screen or your email.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                    <FileCheck size={20} className="text-primary" /> 3. Upload Proof
                                </h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 ml-1">Transaction ID</label>
                                        <input
                                            id="transactionId"
                                            value={leader.transactionId}
                                            onChange={handleLeaderChange}
                                            required
                                            className="w-full rounded-xl border border-primary/30 bg-primary/5 p-4 text-white font-mono focus:ring-1 focus:ring-primary outline-none"
                                            placeholder="pay_QX123ABC..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 ml-1">Payment Screenshot</label>
                                        <div className="relative group min-h-[140px]">
                                            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                            <div className="w-full h-full min-h-[140px] rounded-xl border-2 border-dashed border-white/10 bg-white/5 p-6 flex flex-col items-center justify-center gap-3 group-hover:border-primary/50 transition-all">
                                                {previewUrl ? (
                                                    <div className="flex items-center gap-4">
                                                        <img src={previewUrl} alt="Preview" className="h-16 w-16 rounded object-cover border border-primary/50" />
                                                        <span className="text-sm text-primary font-bold">Screenshot Uploaded</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Upload size={24} className="text-slate-500" />
                                                        <span className="text-sm text-slate-400 text-center">Drag or click to upload<br /><span className="text-xs opacity-50">PNG, JPG (Max 5MB)</span></span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final Submission */}
                    <div className="mt-16 pt-10 border-t border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <input
                                id="agreeTerms"
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="w-5 h-5 rounded border-white/10 text-primary bg-transparent focus:ring-primary"
                            />
                            <label htmlFor="agreeTerms" className="text-sm text-slate-500">
                                I verify all team details and payment information are correct.
                                <span className="text-white"> Min team size is 2.</span>
                            </label>
                        </div>

                        {errorMessage && (
                            <div className="mb-8 p-4 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center gap-3 text-red-400 font-bold">
                                <AlertCircle size={20} />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-6 rounded-3xl bg-primary text-background-dark font-black text-2xl shadow-[0_20px_50px_-10px_rgba(255,174,0,0.4)] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Submitting Registration...' : 'Complete Registration'}
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default RegisterPage;
