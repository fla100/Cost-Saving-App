import React, { useState, useMemo } from 'react';
import { 
  DollarSign, FileText, CheckCircle2, Clock, Plus, Search, LogOut, Building, BarChart3 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const INITIAL_USERS = [
  { id: 'u1', name: 'Budi Santoso', email: 'budi.santoso@company.com', role: 'Inisiator' },
  { id: 'u2', name: 'Siti Aminah', email: 'siti.aminah@company.com', role: 'Tim Finance' },
  { id: 'u3', name: 'Admin System', email: 'admin@company.com', role: 'Admin' }
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
    description: 'Mengurangi kertas & mempercepat pembayaran digital.'
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
    description: 'Penataan jadwal pengiriman untuk hemat BBM.'
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [ideas, setIdeas] = useState(INITIAL_IDEAS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Efisiensi Operasional');
  const [targetAmount, setTargetAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const found = INITIAL_USERS.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
    setCurrentUser(found || { id: 'u-guest', name: loginEmail.split('@')[0] || 'User', role: 'User' });
  };

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

  const totalTarget = useMemo(() => ideas.reduce((acc, curr) => acc + curr.targetAmount, 0), [ideas]);
  const totalActual = useMemo(() => ideas.reduce((acc, curr) => acc + curr.actualAmount, 0), [ideas]);

  const categoryData = useMemo(() => {
    const map = {};
    ideas.forEach(item => {
      map[item.category] = (map[item.category] || 0) + item.targetAmount;
    });
    return Object.keys(map).map(key => ({ name: key, value: map[key] }));
  }, [ideas]);

  const COLORS = ['#059669', '#0284C7', '#D97706', '#DC2626'];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-600 text-white rounded-xl">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">PT KONIMEX</h1>
              <p className="text-xs text-slate-500">Cost Savings Management</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-1">Selamat Datang</h2>
          <p className="text-sm text-slate-500 mb-6">Silakan login ke sistem</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Email</label>
              <input
                type="email"
                required
                placeholder="budi.santoso@company.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-sm transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-2">Uji Coba Cepat:</p>
            <div className="flex gap-2">
              {INITIAL_USERS.map(u => (
                <button
                  key={u.id}
                  onClick={() => setCurrentUser(u)}
                  className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {u.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 text-white rounded-lg">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-base">Cost Savings App</h1>
              <span className="text-xs text-slate-500">PT Konimex</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
              <p className="text-[10px] text-slate-500">{currentUser.role}</p>
            </div>
            <button onClick={() => setCurrentUser(null)} className="p-2 text-slate-500 hover:text-red-600">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex border-b border-slate-200 mb-6 gap-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 ${
              activeTab === 'dashboard' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('ideas')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 ${
              activeTab === 'ideas' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'
            }`}
          >
            <FileText className="w-4 h-4" /> Daftar Inisiatif ({ideas.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 ${
              activeTab === 'add' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500'
            }`}
          >
            <Plus className="w-4 h-4" /> Tambah Inisiatif
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500">Target Savings</p>
                  <p className="text-xl font-bold">Rp {totalTarget.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><CheckCircle2 className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500">Realisasi</p>
                  <p className="text-xl font-bold">Rp {totalActual.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-6 h-6" /></div>
                <div>
                  <p className="text-xs text-slate-500">Total Proyek</p>
                  <p className="text-xl font-bold">{ideas.length} Inisiatif</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h2 className="text-base font-bold mb-4">Distribusi Target per Kategori</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name }) => name}>
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `Rp ${v.toLocaleString('id-ID')}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ideas' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <div className="Di screenshot terbaru Anda, penyebab erornya kembali memperlihatkan masalah yang sama[cite: 14]:

> **`/vercel/path0/src/App.jsx:339:0: ERROR: Unexpected end of file`**[cite: 14]  
> **`338 | <div className="bg-white p-6 rounded-xl border border`**[cite: 14]

Kode terpotong secara tiba-tiba di baris 338/339 saat Anda menempelkannya ke editor GitHub (kurang lebih sepertiga bagian bawah kode terlewat dan tidak tersalin)[cite: 14].

Agar file tidak terpotong lagi, saya sudah memangkas struktur kodenya menjadi **sangat ringkas dan utuh**, serta dilengkapi fitur **Login & Dashboard** dalam satu berkas yang pendek.

---

### Kode Ringkas & Utuh `src/App.jsx`

```jsx
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
                <ResponsiveContainer height="100%" width="100%">
                  <PieChart>
                    <Pie cx="50%" cy="50%" data="{chartData}" dataKey="value" label="{entry" outerRadius="{60}"> entry.name}>
                      {chartData.map((_, index) => <Cell % COLORS.length]} fill="{COLORS[index" key="{index}"/>)}
                    </Pie>
                    <Tooltip formatter="{val"> `Rp ${val.toLocaleString('id-ID')}`} />
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
