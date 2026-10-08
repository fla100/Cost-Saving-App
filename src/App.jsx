import React, { useState, useEffect, useMemo } from 'react';
import { 
  DollarSign, Upload, FileText, CheckCircle2, XCircle, Clock, 
  UserCheck, Users, Shield, Plus, Trash2, Edit3, Lock, Mail, 
  Bell, BarChart3, Search, Filter, Check, X, AlertTriangle, 
  Send, RefreshCw, Eye, FileUp, Download, Info, ChevronRight, 
  LogOut, HelpCircle, Building
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const INITIAL_USERS = [
  { id: 'u1', name: 'Budi Santoso', email: 'budi.santoso@company.com', role: 'Inisiator (User 1)' },
  { id: 'u2', name: 'Siti Aminah', email: 'siti.aminah@company.com', role: 'Tim Finance' },
  { id: 'u3', name: 'Ahmad Dahlan', email: 'ahmad.dahlan@company.com', role: 'Tim Management' },
  { id: 'u4', name: 'Admin System', email: 'admin@company.com', role: 'Admin' }
];

const INITIAL_IDEAS = [
  {
    id: 'CS-2026-001',
    title: 'Digitalisasi Dokumen Tagihan Operasional',
    category: 'Efisiensi Operasional',
    targetAmount: 150000000,
    actualAmount: 120000000,
    initiator: 'Budi Santoso',
    status: 'Disetujui',
    date: '2026-02-15',
    description: 'Mengurangi penggunaan kertas dan mempercepat verifikasi pembayaran via sistem digital.'
  },
  {
    id: 'CS-2026-002',
    title: 'Optimasi Rute Distribusi Bahan Baku',
    category: 'Logistik & Transportasi',
    targetAmount: 300000000,
    actualAmount: 280000000,
    initiator: 'Siti Aminah',
    status: 'Proses Verifikasi',
    date: '2026-03-01',
    description: 'Penataan ulang jadwal pengiriman truk logistik untuk hemat konsumsi bahan bakar.'
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [ideas, setIdeas] = useState(INITIAL_IDEAS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Efisiensi Operasional');
  const [targetAmount, setTargetAmount] = useState('');
  const [description, setDescription] = useState('');

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail) {
      setLoginError('Masukkan email Anda');
      return;
    }
    const foundUser = INITIAL_USERS.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
      setLoginError('');
    } else {
      setCurrentUser({ id: 'u-guest', name: loginEmail.split('@')[0], email: loginEmail, role: 'User' });
      setLoginError('');
    }
  };

  const handleQuickLogin = (user) => {
    setCurrentUser(user);
    setLoginError('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
  };

  // Handle Add Idea
  const handleAddIdea = (e) => {
    e.preventDefault();
    if (!title || !targetAmount) return;

    const newIdea = {
      id: `CS-2026-00${ideas.length + 1}`,
      title,
      category,
      targetAmount: parseFloat(targetAmount) || 0,
      actualAmount: 0,
      initiator: currentUser ? currentUser.name : 'User',
      status: 'Proses Verifikasi',
      date: new Date().toISOString().split('T')[0],
      description
    };

    setIdeas([newIdea, ...ideas]);
    setTitle('');
    setTargetAmount('');
    setDescription('');
    setActiveTab('ideas');
  };

  // Metrics
  const totalTarget = useMemo(() => ideas.reduce((acc, curr) => acc + curr.targetAmount, 0), [ideas]);
  const totalActual = useMemo(() => ideas.reduce((acc, curr) => acc + curr.actualAmount, 0), [ideas]);

  const categoryData = useMemo(() => {
    const map = {};
    ideas.forEach(item => {
      map[item.category] = (map[item.category] || 0) + item.targetAmount;
    });
    return Object.keys(map).map(key => ({ name: key, value: map[key] }));
  }, [ideas]);

  const COLORS = ['#059669', '#0284C7', '#D97706', '#DC2626', '#9333EA'];

  // Layar Login (Jika belum login)
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-emerald-500/20">
          
          {/* Kolom Kiri: Form Login */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-emerald-600 text-white rounded-lg">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">PT KONIMEX</h1>
                  <p className="text-xs text-slate-500">Cost Savings Management System</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Selamat datang kembali</h2>
                <p className="text-sm text-slate-500 mt-1">Silakan masuk ke akun Anda</p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email Corporate</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@company.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200 text-sm"
                >
                  Login
                </button>
              </form>
            </div>

            {/* Quick Demo Login Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-400 mb-2">Akses Cepat Pengujian (Uji Coba):</p>
              <div className="flex flex-wrap gap-1.5">
                {INITIAL_USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleQuickLogin(user)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-xs rounded border border-slate-200 transition"
                  >
                    {user.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Visual Banner */}
          <div className="hidden md:flex bg-emerald-800 p-8 flex-col justify-between relative overflow-hidden text-white">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-700/50 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <span className="px-3 py-1 bg-emerald-700/80 rounded-full text-xs font-medium border border-emerald-500/30">
                Strategic Performance
              </span>
              <h3 className="text-2xl font-bold mt-4 leading-tight">
                Kelola & Pantau Inisiatif Efisiensi Biaya Perusahaan
              </h3>
              <p className="text-emerald-100 text-sm mt-2">
                Platform terpadu untuk pengajuan, evaluasi, hingga realisasi target cost saving secara transparan.
              </p>
            </div>
            <div className="relative z-10 text-xs text-emerald-200/80 border-t border-emerald-700/60 pt-4">
              © 2026 PT Konimex. All rights reserved.
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Layar Main Dashboard (Setelah Login)
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 text-white rounded-lg">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-base leading-none">Cost Savings App</h1>
              <span className="text-xs text-slate-500">PT Konimex System</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
              <p className="text-[10px] text-slate-500">{currentUser.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Keluar"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-6 gap-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'dashboard'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Ringkasan Dashboard
          </button>
          <button
            onClick={() => setActiveTab('ideas')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'ideas'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" /> Daftar Inisiatif ({ideas.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'add'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" /> Ajukan Inisiatif Baru
          </button>
        </div>

        {/* Tab 1: Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Total Target Savings</p>
                  <p className="text-xl font-bold text-slate-800">
                    Rp {totalTarget.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Realisasi Savings</p>
                  <p className="text-xl font-bold text-slate-800">
                    Rp {totalActual.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Total Inisiatif</p>
                  <p className="text-xl font-bold text-slate-800">{ideas.length} Proyek</p>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-xl border border
