import React, { useState, useEffect, useMemo } from 'react';
import { 
  DollarSign, Upload, FileText, CheckCircle2, XCircle, Clock, 
  UserCheck, Users, Shield, Plus, Trash2, Edit3, Lock, Mail, 
  Bell, BarChart3, Search, Filter, Check, X, AlertTriangle, 
  Send, RefreshCw, Eye, FileUp, Download, Info, ChevronRight, 
  LogOut, HelpCircle, Building
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Data Pengguna Default
const INITIAL_USERS = [
  { id: 'u1', name: 'Budi Santoso', email: 'budi.santoso@konimex.com', role: 'Inisiator (User 1)' },
  { id: 'u2', name: 'Siti Aminah', email: 'siti.aminah@konimex.com', role: 'Tim Finance' },
  { id: 'u3', name: 'Rudi Hermawan', email: 'rudi.hermawan@konimex.com', role: 'Tim Produksi' },
  { id: 'u4', name: 'Admin Utama', email: 'admin@konimex.com', role: 'Admin' },
];

const INITIAL_PROJECTS = [
  {
    id: 'PRJ-2026-001',
    title: 'Efisiensi Energi Mesin Kemasan Line 4',
    category: 'Manufaktur',
    amount: 135000000,
    initiator: 'Budi Santoso',
    initiatorEmail: 'budi.santoso@konimex.com',
    createdAt: '2026-03-10',
    status: 'Final Approved',
    isLocked: true,
    mainFile: 'Tabel_Savings_Line4.xlsx',
    detailFile: 'Perhitungan_KWH_Line4.pdf',
    team: ['siti.aminah@konimex.com', 'rudi.hermawan@konimex.com'],
    confirmations: [
      { email: 'siti.aminah@konimex.com', name: 'Siti Aminah', status: 'Approved', date: '2026-03-11 09:30', note: 'Angka biaya hemat energi sudah sesuai estimasi.' },
      { email: 'rudi.hermawan@konimex.com', name: 'Rudi Hermawan', status: 'Approved', date: '2026-03-11 14:15', note: 'Sudah ditinjau bersama tim teknisi.' }
    ],
    logs: [
      { date: '2026-03-10 10:00', text: 'Proyek dibuat oleh Budi Santoso & notifikasi terkirim ke Tim.' },
      { date: '2026-03-11 09:30', text: 'Siti Aminah menyetujui konfirmasi.' },
      { date: '2026-03-11 14:15', text: 'Rudi Hermawan menyetujui konfirmasi.' },
      { date: '2026-03-11 14:15', text: 'Semua anggota tim menyetujui. Data TERKUNCI secara otomatis.' }
    ]
  },
  {
    id: 'PRJ-2026-002',
    title: 'Reduksi Penggunaan Bahan Karton Sekunder',
    category: 'Logistik',
    amount: 85000000,
    initiator: 'Budi Santoso',
    initiatorEmail: 'budi.santoso@konimex.com',
    createdAt: '2026-03-15',
    status: 'Pending Confirmation',
    isLocked: false,
    mainFile: 'Cost_Savings_Karton_2026.xlsx',
    detailFile: 'Analisis_Vendor_Karton.pdf',
    team: ['siti.aminah@konimex.com', 'rudi.hermawan@konimex.com'],
    confirmations: [
      { email: 'siti.aminah@konimex.com', name: 'Siti Aminah', status: 'Approved', date: '2026-03-16 11:00', note: 'Perhitungan kuantitas valid.' },
      { email: 'rudi.hermawan@konimex.com', name: 'Rudi Hermawan', status: 'Pending', date: '-', note: '' }
    ],
    logs: [
      { date: '2026-03-15 08:30', text: 'Proyek dibuat oleh Budi Santoso & notifikasi terkirim ke Tim.' },
      { date: '2026-03-16 11:00', text: 'Siti Aminah menyetujui konfirmasi.' },
      { date: '2026-03-22 08:30', text: 'System: Pengingat konfirmasi mingguan dikirim ke Rudi Hermawan.' }
    ]
  }
];

export default function App() {
  // State Sesi Login
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // State Utama Aplikasi
  const [users, setUsers] = useState(INITIAL_USERS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);

  // Form Input
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Manufaktur');
  const [amount, setAmount] = useState('');
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [mainFile, setMainFile] = useState(null);
  const [detailFile, setDetailFile] = useState(null);

  // Modal State
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectProject, setRejectProject] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [editProjectModal, setEditProjectModal] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('User');

  // Format Angka Indonesia
  const formatIDR = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currencyPenyebab erornya sudah terlihat sangat jelas dari pesan log Vercel di layar Anda[cite: 13]:

> **`/vercel/path0/src/App.jsx:316:0: ERROR: Unexpected end of file`**[cite: 13]
> **`file: /vercel/path0/src/App.jsx:316:0`**[cite: 13]

Artinya, kode di dalam file **`src/App.jsx`** terpotong di baris 316 (belum selesai/kurang tanda penutup kurung `}` atau `;`) saat disalin ke GitHub[cite: 13].

---

### Solusi Perbaikan (Salin Kode Lengkap)

Agar aplikasi memiliki **Halaman Login** dan seluruh fitur **Cost Savings** berjalan tanpa terpotong, ikuti langkah ini:

1. Buka file **`src/App.jsx`** di repository GitHub Anda (`github.com/fla100/Cost-Saving-App`)[cite: 13].
2. Klik ikon **pensil (Edit this file)** di kanan atas.
3. Hapus **seluruh isi file** yang ada saat ini.
4. Salin (copy) **seluruh kode utuh** di bawah ini (pastikan dari baris pertama hingga baris paling akhir tersalin semua)[cite: 13]:

```javascript
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
  { id: 'u3', name: 'Rudi Hermawan', email: 'rudi.hermawan@company.com', role: 'Tim Operations' },
  { id: 'u4', name: 'Admin Utama', email: 'admin@company.com', role: 'Administrator' },
];

const INITIAL_PROJECTS = [
  {
    id: 'PRJ-2026-001',
    title: 'Efisiensi Energi Pabrik A',
    category: 'Operasional',
    amount: 450000000,
    initiator: 'Budi Santoso',
    initiatorEmail: 'budi.santoso@company.com',
    createdAt: '2026-09-15',
    mainFile: 'Tabel_Cost_Savings_Energi.xlsx',
    detailFile: 'Detail_Perhitungan_KWH.pdf',
    team: [
      { name: 'Siti Aminah', email: 'siti.aminah@company.com', status: 'Approved', confirmedAt: '2026-09-16 10:30', note: '' },
      { name: 'Rudi Hermawan', email: 'rudi.hermawan@company.com', status: 'Approved', confirmedAt: '2026-09-17 14:15', note: '' },
    ],
    status: 'Locked',
    logs: [
      { id: 'l1', timestamp: '2026-09-15 09:00', actor: 'Budi Santoso', action: 'Submit Project', description: 'Menginput data Cost Savings dan mengunggah file utama & detail.' },
      { id: 'l2', timestamp: '2026-09-15 09:05', actor: 'System', action: 'Send Email Notification', description: 'Notifikasi konfirmasi dikirim ke Siti Aminah & Rudi Hermawan.' },
      { id: 'l3', timestamp: '2026-09-16 10:30', actor: 'Siti Aminah', action: 'Approved', description: 'Menyetujui alokasi efisiensi biaya.' },
      { id: 'l4', timestamp: '2026-09-17 14:15', actor: 'Rudi Hermawan', action: 'Approved', description: 'Menyetujui perhitungan teknis.' },
      { id: 'l5', timestamp: '2026-09-17 14:15', actor: 'System', action: 'Lock Project', description: 'Semua anggota tim menyetujui. Proyek dikunci otomatis.' }
    ]
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Operasional',
    amount: '',
    teamEmails: [],
    mainFile: null,
    detailFile: null
  });

  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [projectToReject, setProjectToReject] = useState(null);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Tim Reviewer' });

  const handleLogin = (e) => {
    e?.preventDefault();
    if (!loginEmail) {
      setLoginError('Silakan masukkan email Anda.');
      return;
    }
    const foundUser = users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
      setLoginError('');
    } else {
      setLoginError('Email tidak terdaftar dalam sistem.');
    }
  };

  const handleQuickLogin = (userObj) => {
    setCurrentUser(userObj);
    setLoginEmail(userObj.email);
    setLoginError('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginPassword('');
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!formData.mainFile) {
      alert('Wajib mengunggah File Tabel Cost Savings!');
      return;
    }
    if (formData.teamEmails.length === 0) {
      alert('Pilih minimal satu anggota tim untuk konfirmasi!');
      return;
    }

    const teamList = formData.teamEmails.map(email => {
      const u = users.find(usr => usr.email === email);
      return {
        name: u ? u.name : email,
        email: email,
        status: 'Pending',
        confirmedAt: '-',
        note: ''
      };
    });

    const newPrj = {
      id: `PRJ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      category: formData.category,
      amount: parseFloat(formData.amount) || 0,
      initiator: currentUser.name,
      initiatorEmail: currentUser.email,
      createdAt: new Date().toISOString().split('T')[0],
      mainFile: formData.mainFile.name,
      detailFile: formData.detailFile ? formData.detailFile.name : null,
      team: teamList,
      status: 'Pending Confirmation',
      logs: [
        {
          id: `l-${Date.now()}`,
          timestamp: new Date().toLocaleString('id-ID'),
          actor: currentUser.name,
          action: 'Submit Project',
          description: 'Menginput data Cost Savings dan mengirimkan permintaan konfirmasi tim.'
        },
        {
          id: `l-${Date.now()+1}`,
          timestamp: new Date().toLocaleString('id-ID'),
          actor: 'System',
          action: 'Send Email Notification',
