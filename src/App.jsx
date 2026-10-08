import React, { useState } from 'react';
import { Building, BarChart3, FileText, Plus, LogOut, DollarSign, CheckCircle2, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const INITIAL_USERS = [
  { id: 'u1', name: 'Budi Santoso', email: 'budi.santoso@company.com', role: 'Inisiator' },
  { id: 'u2', name: 'Siti Aminah', email: 'siti.aminah@company.com', role: 'Finance' },
  { id: 'u3', name: 'Admin System', email: 'admin@company.com', role: 'Admin' }
];

const INITIAL_IDEAS = [
  { id: 'CS-001', title: 'Digitalisasi Dokumen Tagihan', category: 'Efisiensi Operasional', targetAmount: 150000000, actualAmount: 120000000, initiator: 'Budi Santoso', status: 'Disetujui' },
  { id: 'CS-002', title: 'Optimasi Rute Distribusi', category: 'Logistik & Transportasi', targetAmount: 300000000, actualAmount: 280000000, initiator: 'Siti Aminah', status: 'Proses Verifikasi' }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ideas, setIdeas] = useState(INITIAL_IDEAS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || { id: 'u-guest', name: email.split('@')[0] || 'User', role: 'User' };
    setCurrentUser(user);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !targetAmount) return;
    const newIdea = {
      id: `CS-00${ideas.length + 1}`,
      title,
      category: 'Efisiensi Operasional',
      targetAmount: parseFloat(targetAmount) || 0,
      actualAmount: 0,
      initiator: currentUser.name,
      status: 'Proses Verifikasi'
    };
    setIdeas([newIdea, ...ideas]);
    setTitle('');
    setTargetAmount('');
    setActiveTab('ideas');
  };

  const totalTarget = ideas.reduce((acc, curr) => acc + curr.targetAmount, 0);
  const totalActual = ideas.reduce((acc, curr) => acc + curr.actualAmount, 0);
  const chartData = ideas.map(i => ({ name: i.title, value: i.targetAmount }));
  const COLORS = ['#059669', '#0284C7', '#D97706'];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-600 text-white rounded-lg"><Building className="w-6 h-6"/></div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">PT KONIMEX</h1>
              <p className="text-xs text-slate-500">Cost Savings Management</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email Corporate</label>
              <input type="email" required placeholder="budi.santoso@company.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Password</label>
              <input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <button type="submit" className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-sm transition">Login</button>
          </form>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-2">Uji Coba Cepat:</p>
            <div className="flex gap-2">
              {INITIAL_USERS.map(u => (
                <button key={u.id} onClick={() => setCurrentUser(u)} className="px-2 py-1 bg-slate-100 text-xs rounded hover:bg-emerald-50">{u.name.split(' ')[0]}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5 text-emerald-600"/>
          <span className="font-bold text-slate-800">Cost Savings Dashboard</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="font-bold">{currentUser.name} ({currentUser.role})</span>
          <button onClick={() => setCurrentUser(null)} className="p-1.5 text-slate-500 hover:text-red-600"><LogOut className="w-4 h-4"/></button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex border-b mb-6 gap-6 text-sm font-semibold">
          <button onClick={() => setActiveTab('dashboard')} className={`pb-2 border-b-2 ${activeTab === 'dashboard' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('ideas')} className={`pb-2 border-b-2 ${activeTab === 'ideas' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`}>Daftar Inisiatif ({ideas.length})</button>
          <button onClick={() => setActiveTab('add')} className={`pb-2 border-b-2 ${activeTab === 'add' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'}`}>Tambah Baru</button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-emerald-600"/>
                <div>
                  <p className="text-xs text-slate-500">Total Target</p>
                  <p className="font-bold">Rp {totalTarget.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-blue-600"/>
                <div>
                  <p className="text-xs text-slate-500">Realisasi</p>
                  <p className="font-bold">Rp {totalActual.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border flex items-center gap-3">
                <Clock className="w-8 h-8 text-amber-600"/>
                <div>
                  <p className="text-xs text-slate-500">Inisiatif Aktif</p>
                  <p className="font-bold">{ideas.length} Proyek</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <h3 className="text-sm font-bold mb-4">Grafik Target Inisiatif</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
                      {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val) => `Rp ${val.toLocaleString('id-ID')}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ideas' && (
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b text-xs font-semibold text-slate-500">
                <tr>
                  <th className="p-3">Judul Proyek</th>
                  <th className="p-3">Inisiator</th>
                  <th className="p-3">Target</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ideas.map(item => (
                  <tr key={item.id}>
                    <td className="p-3 font-medium">{item.title}</td>
                    <td className="p-3 text-slate-500">{item.initiator}</td>
                    <td className="p-3 font-semibold">Rp {item.targetAmount.toLocaleString('id-ID')}</td>
                    <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded-full">{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'add' && (
          <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl border max-w-lg mx-auto space-y-4">
            <h3 className="font-bold text-slate-800">Ajukan Inisiatif Baru</h3>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Judul Inisiatif</label>
              <input type="text" required placeholder="Contoh: Digitalisasi Arsip" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Target Savings (Rp)</label>
              <input type="number" required placeholder="50000000" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <button type="submit" className="w-full py-2 bg-emerald-600 text-white font-bold rounded-lg text-sm">Kirim</button>
          </form>
        )}
      </main>
    </div>
  );
}
