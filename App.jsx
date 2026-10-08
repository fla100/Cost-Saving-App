import React, { useState, useEffect, useMemo } from 'react';
import {
  DollarSign,
  Upload,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Users,
  Shield,
  Plus,
  Trash2,
  Edit3,
  Lock,
  Mail,
  Bell,
  BarChart3,
  PieChart as PieChartIcon,
  Search,
  Filter,
  Check,
  X,
  AlertTriangle,
  Send,
  RefreshCw,
  Eye,
  FileUp,
  Download,
  Info,
  ChevronRight,
  LogOut,
  HelpCircle
} from 'lucide-react';

const INITIAL_USERS = [
  { id: 'u1', name: 'Budi Santoso', email: 'budi.santoso@company.com', role: 'Inisiator (User 1)' },
  { id: 'u2', name: 'Siti Aminah', email: 'siti.aminah@company.com', role: 'Tim Finance' },
  { id: 'u3', name: 'Rudi Hermawan', email: 'rudi.hermawan@company.com', role: 'Tim Operations' },
  { id: 'u4', name: 'Dewi Lestari', email: 'dewi.lestari@company.com', role: 'Tim IT Manager' },
  { id: 'admin', name: 'Admin Utama', email: 'admin@company.com', role: 'Administrator' }
];

const INITIAL_PROJECTS = [
  {
    id: 'PRJ-2026-001',
    title: 'Migrasi Server Cloud ke On-Premise Hybrid',
    category: 'Teknologi Informasi',
    period: 'Q1 2026',
    savingsAmount: 450000000, // IDR
    initiator: 'budi.santoso@company.com',
    initiatorName: 'Budi Santoso',
    mainDataFile: { name: 'Tabel_Cost_Savings_Cloud.xlsx', size: '245 KB', uploadDate: '2026-03-01' },
    detailFile: { name: 'Rincian_Perhitungan_ROI_Cloud.pdf', size: '1.2 MB', uploadDate: '2026-03-01' },
    team: ['siti.aminah@company.com', 'dewi.lestari@company.com'],
    status: 'PENDING', // PENDING, APPROVED, REJECTED
    confirmations: {
      'siti.aminah@company.com': { status: 'APPROVED', date: '2026-03-02 10:15', note: 'Anggaran terverifikasi sesuai target.' },
      'dewi.lestari@company.com': { status: 'PENDING', date: null, note: '' }
    },
    createdAt: '2026-03-01 09:00',
    lastReminderSent: '2026-03-01 09:00',
    reminderCount: 1,
    rejectionReason: '',
    history: [
      { date: '2026-03-01 09:00', user: 'Budi Santoso', action: 'Membuat proyek & mengunggah tabel Cost Savings' },
      { date: '2026-03-01 09:05', user: 'System', action: 'Notifikasi email dikirim ke anggota tim' },
      { date: '2026-03-02 10:15', user: 'Siti Aminah', action: 'Menyetujui konfirmasi proyek' }
    ]
  },
  {
    id: 'PRJ-2026-002',
    title: 'EFISIENSI PENGGUNAAN ENERGI FABRIKASI A',
    category: 'Operasional',
    period: 'Q2 2026',
    savingsAmount: 280000000,
    initiator: 'budi.santoso@company.com',
    initiatorName: 'Budi Santoso',
    mainDataFile: { name: 'Savings_Listrik_2026.xlsx', size: '180 KB', uploadDate: '2026-02-15' },
    detailFile: null,
    team: ['siti.aminah@company.com', 'rudi.hermawan@company.com'],
    status: 'APPROVED',
    confirmations: {
      'siti.aminah@company.com': { status: 'APPROVED', date: '2026-02-16 14:20', note: 'Validasi keuangan ok' },
      'rudi.hermawan@company.com': { status: 'APPROVED', date: '2026-02-17 09:10', note: 'Sesuai dengan efisiensi mesin manufaktur' }
    },
    createdAt: '2026-02-15 11:30',
    lastReminderSent: '2026-02-15 11:30',
    reminderCount: 0,
    rejectionReason: '',
    history: [
      { date: '2026-02-15 11:30', user: 'Budi Santoso', action: 'Membuat proyek' },
      { date: '2026-02-16 14:20', user: 'Siti Aminah', action: 'Menyetujui konfirmasi' },
      { date: '2026-02-17 09:10', user: 'Rudi Hermawan', action: 'Menyetujui konfirmasi - Status terkunci (FINAL)' }
    ]
  },
  {
    id: 'PRJ-2026-003',
    title: 'Renegosiasi Kontrak Pengadaan Bahan Baku',
    category: 'Procurement',
    period: 'Q1 2026',
    savingsAmount: 620000000,
    initiator: 'budi.santoso@company.com',
    initiatorName: 'Budi Santoso',
    mainDataFile: { name: 'Negosiasi_Vendor_RawMat.xlsx', size: '310 KB', uploadDate: '2026-02-20' },
    detailFile: { name: 'Perbandingan_Harga_Vendor.xlsx', size: '520 KB', uploadDate: '2026-02-20' },
    team: ['rudi.hermawan@company.com'],
    status: 'REJECTED',
    confirmations: {
      'rudi.hermawan@company.com': { status: 'REJECTED', date: '2026-02-22 16:45', note: 'Diskon yang dicantumkan belum mempertimbangkan pajak impor terbaru.' }
    },
    createdAt: '2026-02-20 10:00',
    lastReminderSent: '2026-02-20 10:00',
    reminderCount: 0,
    rejectionReason: 'Diskon yang dicantumkan belum mempertimbangkan pajak impor terbaru.',
    history: [
      { date: '2026-02-20 10:00', user: 'Budi Santoso', action: 'Membuat proyek' },
      { date: '2026-02-22 16:45', user: 'Rudi Hermawan', action: 'Menolak konfirmasi. Mengembalikan ke inisiator untuk revisi.' }
    ]
  }
];

const INITIAL_EMAIL_LOGS = [
  { id: 1, to: 'siti.aminah@company.com', project: 'PRJ-2026-001', subject: '[Permintaan Konfirmasi] Cost Savings PRJ-2026-001', date: '2026-03-01 09:05', status: 'Terkirim', type: 'NEW_REQUEST' },
  { id: 2, to: 'dewi.lestari@company.com', project: 'PRJ-2026-001', subject: '[Permintaan Konfirmasi] Cost Savings PRJ-2026-001', date: '2026-03-01 09:05', status: 'Terkirim', type: 'NEW_REQUEST' }
];

export default function App() {
  // State Active User Role Switching
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);
  const [userList, setUserList] = useState(INITIAL_USERS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [emailLogs, setEmailLogs] = useState(INITIAL_EMAIL_LOGS);

  // Active View Tab Navigation
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'create', 'my_confirmations', 'all_projects', 'email_logs', 'user_mgmt'

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Modal States
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedProjectForAction, setSelectedProjectForAction] = useState(null);
  const [rejectionNote, setRejectionNote] = useState('');
  
  const [projectDetailModal, setProjectDetailModal] = useState(null);
  const [editAdminModal, setEditAdminModal] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Helper formatting currency
  const formatIDR = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  // Step 1 Form (Main Data)
  const [formStep1Completed, setFormStep1Completed] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Teknologi Informasi',
    period: 'Q1 2026',
    savingsAmount: '',
    team: [],
    mainDataFile: null
  });

  // Step 2 Form (Detail Perhitungan - Optional)
  const [detailFile, setDetailFile] = useState(null);

  const handleMainFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProject(prev => ({
        ...prev,
        mainDataFile: {
          name: file.name,
          size: `${(file.size / 1024).toFixed(0)} KB`,
          uploadDate: new Date().toISOString().split('T')[0]
        }
      }));
    }
  };

  const handleDetailFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDetailFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        uploadDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  const toggleTeamMember = (email) => {
    setNewProject(prev => {
      const exists = prev.team.includes(email);
      if (exists) {
        return { ...prev, team: prev.team.filter(e => e !== email) };
      } else {
        return { ...prev, team: [...prev.team, email] };
      }
    });
  };

  const handleSaveProject = (isRevision = false, existingId = null) => {
    if (!newProject.title.trim() || !newProject.savingsAmount || !newProject.mainDataFile) {
      showToast('Harap lengkapi judul, nilai cost savings, dan upload tabel Cost Savings!', 'error');
      return;
    }

    if (newProject.team.length === 0) {
      showToast('Wajib memilih minimal 1 anggota Tim untuk melakukan konfirmasi!', 'error');
      return;
    }

    const projectId = isRevision ? existingId : `PRJ-2026-00${projects.length + 1}`;
    
    // Initializing confirmation objects for team members
    const initialConfirmations = {};
    newProject.team.forEach(email => {
      initialConfirmations[email] = { status: 'PENDING', date: null, note: '' };
    });

    const nowStr = new Date().toLocaleString('id-ID');

    const projectData = {
      id: projectId,
      title: newProject.title,
      category: newProject.category,
      period: newProject.period,
      savingsAmount: parseFloat(newProject.savingsAmount),
      initiator: currentUser.email,
      initiatorName: currentUser.name,
      mainDataFile: newProject.mainDataFile,
      detailFile: detailFile,
      team: newProject.team,
      status: 'PENDING',
      confirmations: initialConfirmations,
      createdAt: nowStr,
      lastReminderSent: nowStr,
      reminderCount: 1,
      rejectionReason: '',
      history: [
        ...(isRevision ? (projects.find(p => p.id === existingId)?.history || []) : []),
        { date: nowStr, user: currentUser.name, action: isRevision ? 'Mengajukan revisi proyek' : 'Membuat proyek baru & menyimpan data' },
        { date: nowStr, user: 'System', action: 'Notifikasi konfirmasi dikirim ke anggota tim' }
      ]
    };

    if (isRevision) {
      setProjects(projects.map(p => p.id === existingId ? projectData : p));
      showToast(`Proyek ${projectId} berhasil diperbarui dan dikirim ulang untuk konfirmasi tim!`);
    } else {
      setProjects([projectData, ...projects]);
      showToast(`Proyek ${projectId} berhasil disimpan! Notifikasi telah dikirim ke anggota tim.`);
    }

    // Trigger mock email notifications
    const newLogs = newProject.team.map((email, idx) => ({
      id: Date.now() + idx,
      to: email,
      project: projectId,
      subject: `[Permintaan Konfirmasi] Cost Savings ${projectId}: ${newProject.title}`,
      date: nowStr,
      status: 'Terkirim',
      type: 'NEW_REQUEST'
    }));
    setEmailLogs(prev => [...newLogs, ...prev]);

    // Reset Form
    setNewProject({
      title: '',
      category: 'Teknologi Informasi',
      period: 'Q1 2026',
      savingsAmount: '',
      team: [],
      mainDataFile: null
    });
    setDetailFile(null);
    setFormStep1Completed(false);
    setActiveTab('all_projects');
  };

  const handleApproveProject = (project) => {
    const userEmail = currentUser.email;
    const nowStr = new Date().toLocaleString('id-ID');

    const updatedConfirmations = {
      ...project.confirmations,
      [userEmail]: { status: 'APPROVED', date: nowStr, note: 'Disetujui via sistem' }
    };

    // Check if ALL team members have approved
    const allApproved = project.team.every(email => updatedConfirmations[email]?.status === 'APPROVED');

    const updatedProject = {
      ...project,
      confirmations: updatedConfirmations,
      status: allApproved ? 'APPROVED' : 'PENDING',
      history: [
        ...project.history,
        {
          date: nowStr,
          user: currentUser.name,
          action: allApproved ? 'Menyetujui konfirmasi — Semua tim setuju, Status berubah ke FINAL (LOCKED)' : 'Menyetujui konfirmasi'
        }
      ]
    };

    setProjects(projects.map(p => p.id === project.id ? updatedProject : p));
    showToast(allApproved ? 'Seluruh tim telah setuju! Proyek tersimpan permanen dan dikunci.' : 'Konfirmasi Anda berhasil disimpan.');
  };

  const handleOpenRejectModal = (project) => {
    setSelectedProjectForAction(project);
    setRejectionNote('');
    setRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (!rejectionNote.trim()) {
      showToast('Alasan penolakan wajib diisi!', 'error');
      return;
    }

    const project = selectedProjectForAction;
    const userEmail = currentUser.email;
    const nowStr = new Date().toLocaleString('id-ID');

    const updatedConfirmations = {
      ...project.confirmations,
      [userEmail]: { status: 'REJECTED', date: nowStr, note: rejectionNote }
    };

    const updatedProject = {
      ...project,
      confirmations: updatedConfirmations,
      status: 'REJECTED',
      rejectionReason: rejectionNote,
      history: [
        ...project.history,
        {
          date: nowStr,
          user: currentUser.name,
          action: `Menolak konfirmasi dengan alasan: "${rejectionNote}". Proyek dikembalikan ke inisiator.`
        }
      ]
    };

    setProjects(projects.map(p => p.id === project.id ? updatedProject : p));
    
    // Add Email log to initiator
    setEmailLogs(prev => [{
      id: Date.now(),
      to: project.initiator,
      project: project.id,
      subject: `[PERLU REVISI] Proyek Cost Savings ${project.id} Ditolak oleh ${currentUser.name}`,
      date: nowStr,
      status: 'Terkirim',
      type: 'REJECTION_NOTICE'
    }, ...prev]);

    setRejectModalOpen(false);
    showToast('Konfirmasi penolakan berhasil dikirim. Proyek dikembalikan ke inisiator untuk revisi.');
  };

  const handleSimulateWeeklyReminder = () => {
    const pendingProjects = projects.filter(p => p.status === 'PENDING');
    let reminderCount = 0;
    const nowStr = new Date().toLocaleString('id-ID');
    const newLogs = [];

    const updatedProjects = projects.map(p => {
      if (p.status === 'PENDING') {
        // Find unconfirmed members
        const unconfirmedMembers = p.team.filter(email => p.confirmations[email]?.status === 'PENDING');
        if (unconfirmedMembers.length > 0) {
          reminderCount += unconfirmedMembers.length;
          unconfirmedMembers.forEach(email => {
            newLogs.push({
              id: Date.now() + Math.random(),
              to: email,
              project: p.id,
              subject: `[PENGINGAT MINGGUAN] Mohon Konfirmasi Cost Savings ${p.id}`,
              date: nowStr,
              status: 'Terkirim (Otomatis +1 Minggu)',
              type: 'WEEKLY_REMINDER'
            });
          });

          return {
            ...p,
            lastReminderSent: nowStr,
            reminderCount: (p.reminderCount || 1) + 1,
            history: [
              ...p.history,
              { date: nowStr, user: 'System (Scheduler)', action: `Sistem mengirimkan email pengingat mingguan ke ${unconfirmedMembers.length} anggota tim yang belum konfirmasi.` }
            ]
          };
        }
      }
      return p;
    });

    setProjects(updatedProjects);
    setEmailLogs(prev => [...newLogs, ...prev]);
    showToast(`Simulasi berhasil! ${reminderCount} email pengingat mingguan otomatis berhasil dikirim.`);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.initiatorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || p.status === statusFilter;
      const matchCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [projects, searchQuery, statusFilter, categoryFilter]);

  // Projects pending action for currently logged in user
  const myPendingConfirmations = useMemo(() => {
    return projects.filter(p => 
      p.status === 'PENDING' && 
      p.team.includes(currentUser.email) && 
      p.confirmations[currentUser.email]?.status === 'PENDING'
    );
  }, [projects, currentUser]);

  const totalSavings = useMemo(() => {
    return projects.reduce((acc, curr) => acc + (curr.savingsAmount || 0), 0);
  }, [projects]);

  const approvedSavings = useMemo(() => {
    return projects
      .filter(p => p.status === 'APPROVED')
      .reduce((acc, curr) => acc + (curr.savingsAmount || 0), 0);
  }, [projects]);

  const countPending = projects.filter(p => p.status === 'PENDING').length;
  const countApproved = projects.filter(p => p.status === 'APPROVED').length;
  const countRejected = projects.filter(p => p.status === 'REJECTED').length;

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            Disetujui / Final (Locked)
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Ditolak / Perlu Revisi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            Menunggu Konfirmasi Tim
          </span>
        );
    }
  };

  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', role: 'Tim Member' });
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email) {
      showToast('Nama dan Email wajib diisi', 'error');
      return;
    }
    const userObj = {
      id: `u_${Date.now()}`,
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role
    };
    setUserList([...userList, userObj]);
    setNewUserForm({ name: '', email: '', role: 'Tim Member' });
    showToast(`User baru ${userObj.name} berhasil ditambahkan!`);
  };

  const handleSaveAdminEdit = (e) => {
    e.preventDefault();
    setProjects(projects.map(p => p.id === editAdminModal.id ? editAdminModal : p));
    setEditAdminModal(null);
    showToast('Data proyek berhasil diperbarui oleh Admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Toast Notification Floating Banner */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all transform animate-bounce ${
          toast.type === 'error' ? 'bg-rose-900 text-white border-rose-700' : 'bg-slate-900 text-white border-slate-700'
        }`}>
          {toast.type === 'error' ? <AlertTriangle className="w-5 h-5 text-rose-400" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* HEADER BAR WITH ROLE SWITCHER */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo and Brand Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-900 font-bold shadow-md">
                <DollarSign className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white leading-none">Cost Savings App</h1>
                <p className="text-xs text-slate-400 mt-0.5">Sistem Penghematan & Approval Tim</p>
              </div>
            </div>

            {/* ROLE SWITCHER TOOLBAR (Sangat Penting untuk Pengujian Vibe Coding) */}
            <div className="flex items-center gap-3 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 px-2 text-xs font-semibold text-slate-300">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="hidden md:inline">Simulasi User:</span>
              </div>
              <select
                value={currentUser.id}
                onChange={(e) => {
                  const targetUser = userList.find(u => u.id === e.target.value);
                  if (targetUser) {
                    setCurrentUser(targetUser);
                    showToast(`Beralih peran ke: ${targetUser.name} (${targetUser.role})`, 'info');
                  }
                }}
                className="bg-slate-900 text-xs font-medium text-white px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {userList.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>

              {/* Current Role Badge Indicator */}
              <span className={`text-[11px] px-2.5 py-1 rounded-md font-semibold ${
                currentUser.id === 'admin' ? 'bg-purple-900/80 text-purple-200 border border-purple-700' : 'bg-teal-900/80 text-teal-200 border border-teal-700'
              }`}>
                {currentUser.id === 'admin' ? 'ADMINISTRATOR' : 'USER biasa'}
              </span>
            </div>

          </div>
        </div>

        {/* NAVIGATION TABS BAR */}
        <div className="bg-slate-800 border-t border-slate-700/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none text-xs font-medium">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'dashboard' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard & Analitik
              </button>

              <button
                onClick={() => setActiveTab('create')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'create' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
                + Input Proyek Savings Baru
              </button>

              <button
                onClick={() => setActiveTab('my_confirmations')}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'my_confirmations' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Konfirmasi Perlu Tindakan Saya
                {myPendingConfirmations.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded-full">
                    {myPendingConfirmations.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('all_projects')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'all_projects' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                Daftar Proyek & Log Konfirmasi
              </button>

              <button
                onClick={() => setActiveTab('email_logs')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'email_logs' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                Log Notifikasi Email
              </button>

              {currentUser.id === 'admin' && (
                <button
                  onClick={() => setActiveTab('user_mgmt')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    activeTab === 'user_mgmt' ? 'bg-purple-600 text-white font-bold shadow' : 'text-purple-300 hover:bg-slate-700/50'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Kelola User (Admin)
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD SUMMARY & ANALYTICS                                      */}
        {/* ========================================================================= */}
        {}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Top Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Ringkasan Cost Savings Perusahaan</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Selamat datang, <span className="font-semibold text-slate-800">{currentUser.name}</span>. Pantau realisasi penghematan anggaran dan status persetujuan tim.
                </p>
              </div>

              {/* Action Button: Weekly Reminder Simulator */}
              <button
                onClick={handleSimulateWeeklyReminder}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300/80 rounded-xl text-xs font-semibold transition-all shadow-sm"
                title="Pemicu otomatis untuk pengingat mingguan"
              >
                <RefreshCw className="w-4 h-4 text-amber-600" />
                <span>Simulasi Pengingat Mingguan (1 Minggu)</span>
              </button>
            </div>

            {/* Metrics KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
                  <DollarSign className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Nilai Savings</p>
                  <p className="text-xl font-bold text-slate-900 mt-0.5">{formatIDR(totalSavings)}</p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">Dari {projects.length} proyek terdaftar</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-teal-50 border border-teal-100 rounded-xl text-teal-600">
                  <Lock className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Approved (Final)</p>
                  <p className="text-xl font-bold text-teal-700 mt-0.5">{formatIDR(approvedSavings)}</p>
                  <p className="text-[11px] text-teal-600 font-semibold mt-1">{countApproved} Proyek terkunci</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl text-amber-600">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Menunggu Konfirmasi</p>
                  <p className="text-2xl font-bold text-amber-600 mt-0.5">{countPending}</p>
                  <p className="text-[11px] text-slate-500 mt-1">Dalam proses tim</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600">
                  <XCircle className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Perlu Revisi</p>
                  <p className="text-2xl font-bold text-rose-600 mt-0.5">{countRejected}</p>
                  <p className="text-[11px] text-slate-500 mt-1">Ditolak oleh anggota tim</p>
                </div>
              </div>

            </div>

            {/* Visual Breakdown & Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Category Breakdown Progress Bars */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5 text-emerald-600" />
                    Distribusi Cost Savings per Kategori
                  </h3>
                  <span className="text-xs text-slate-400">Periode 2026</span>
                </div>

                <div className="space-y-4 pt-2">
                  {['Teknologi Informasi', 'Operasional', 'Procurement', 'Sumber Daya Manusia', 'Fasilitas & Umum'].map((cat, idx) => {
                    const catProjects = projects.filter(p => p.category === cat);
                    const catTotal = catProjects.reduce((acc, c) => acc + c.savingsAmount, 0);
                    const percentage = totalSavings > 0 ? Math.round((catTotal / totalSavings) * 100) : 0;
                    
                    const colors = ['bg-emerald-500', 'bg-teal-500', 'bg-indigo-500', 'bg-amber-500', 'bg-purple-500'];

                    return (
                      <div key={cat} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-700">{cat} ({catProjects.length} proyek)</span>
                          <span className="font-bold text-slate-900">{formatIDR(catTotal)} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div className={`h-2.5 rounded-full ${colors[idx % colors.length]}`} style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Info Box / Workflow Guide */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold flex items-center gap-2 text-emerald-400 mb-3">
                    <Info className="w-5 h-5" />
                    Alur Kerja Sistem (Workflow)
                  </h3>
                  <ul className="text-xs space-y-3 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="bg-emerald-500/20 text-emerald-400 font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                      <span><strong>Inisiator (User 1)</strong> menginput tabel Cost Savings / Upload Excel. File Detail Perhitungan Opsional terbuka setelahnya.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-emerald-500/20 text-emerald-400 font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                      <span>Notifikasi dikirim ke seluruh email <strong>Tim Konfirmasi</strong>. Pengingat mingguan jika belum setuju.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-emerald-500/20 text-emerald-400 font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                      <span>Jika <strong>SEMUA setuju</strong>: Data dikunci (Locked/Final). Jika 1 menolak: Dikembalikan ke inisiator untuk revisi.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-500/20 text-purple-400 font-bold rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                      <span><strong>Admin</strong> memiliki wewenang khusus mengedit data yang sudah dikunci dan mengelola daftar user.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Sistem Versi 2.4 - Vibe Coding</span>
                  <span className="text-emerald-400 font-semibold">Status: Aktif</span>
                </div>
              </div>

            </div>

            {/* Quick Summary Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-base font-bold text-slate-900">Proyek Terbaru</h3>
                <button 
                  onClick={() => setActiveTab('all_projects')} 
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  Lihat Semua Proyek ({projects.length}) <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">ID & Judul Proyek</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Nilai Savings</th>
                      <th className="py-3 px-4">Inisiator</th>
                      <th className="py-3 px-4">Status Approval</th>
                      <th className="py-3 px-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projects.slice(0, 5).map(prj => (
                      <tr key={prj.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{prj.title}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{prj.id} • {prj.period}</p>
                        </td>
                        <td className="py-3 px-4">{prj.category}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{formatIDR(prj.savingsAmount)}</td>
                        <td className="py-3 px-4">{prj.initiatorName}</td>
                        <td className="py-3 px-4">{renderStatusBadge(prj.status)}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => setProjectDetailModal(prj)}
                            className="p-1.5 text-slate-600 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Detail Proyek & Log Konfirmasi"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: FORM INPUT PROYEK BARU / REVISI                                    */}
        {/* ========================================================================= */}
        {}
        {activeTab === 'create' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                Input Proyek Cost Savings Baru
              </h2>
              <p className="text-xs text-slate-500">
                Lengkapi data penghematan biaya. File detail perhitungan (opsional) hanya dapat diunggah jika Anda telah mengisi/mengunggah tabel Cost Savings terlebih dahulu.
              </p>
            </div>

            {/* Workflow Progress Indicator Bar */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border transition-all ${
                formStep1Completed ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    formStep1Completed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>1</span>
                  Tabel Cost Savings (Wajib)
                </div>
                <p className="text-xs opacity-80">Input form utama atau upload Excel tabel Cost Savings</p>
              </div>

              <div className={`p-4 rounded-xl border transition-all ${
                !formStep1Completed ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed' : 'bg-teal-50/80 border-teal-300 text-teal-900'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    detailFile ? 'bg-teal-600 text-white' : 'bg-slate-300 text-slate-600'
                  }`}>2</span>
                  Detail Perhitungan (Opsional)
                </div>
                <p className="text-xs opacity-80">Unggah berkas kalkulasi pendukung (PDF/Excel)</p>
              </div>
            </div>

            {/* FORM CONTAINER */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
              
              {/* STEP 1: Main Project Details */}
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  1. Informasi Utama & Tabel Cost Savings
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Judul Inisiatif Proyek Cost Savings *</label>
                    <input
                      type="text"
                      placeholder="Contoh: Digitalisasi Dokumen Tagihan Vendor"
                      value={newProject.title}
                      onChange={(e) => {
                        setNewProject({ ...newProject, title: e.target.value });
                        if (e.target.value.trim() && newProject.savingsAmount && newProject.mainDataFile) setFormStep1Completed(true);
                      }}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Kategori / Departemen *</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="Teknologi Informasi">Teknologi Informasi</option>
                      <option value="Operasional">Operasional</option>
                      <option value="Procurement">Procurement</option>
                      <option value="Sumber Daya Manusia">Sumber Daya Manusia</option>
                      <option value="Fasilitas & Umum">Fasilitas & Umum</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Periode Target *</label>
                    <select
                      value={newProject.period}
                      onChange={(e) => setNewProject({ ...newProject, period: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="Q1 2026">Q1 2026</option>
                      <option value="Q2 2026">Q2 2026</option>
                      <option value="Q3 2026">Q3 2026</option>
                      <option value="Q4 2026">Q4 2026</option>
                      <option value="Tahun 2026">Tahun 2026</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Estimasi Nilai Savings (IDR) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-xs font-bold text-slate-400">Rp</span>
                      <input
                        type="number"
                        placeholder="100000000"
                        value={newProject.savingsAmount}
                        onChange={(e) => {
                          setNewProject({ ...newProject, savingsAmount: e.target.value });
                          if (newProject.title.trim() && e.target.value && newProject.mainDataFile) setFormStep1Completed(true);
                        }}
                        className="w-full text-xs p-3 pl-9 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Upload Main Excel Table */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Upload File Tabel Cost Savings (Format Excel/XLSX) *
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center hover:bg-slate-50 transition-colors">
                      {newProject.mainDataFile ? (
                        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs">
                          <div className="flex items-center gap-3">
                            <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                            <div className="text-left">
                              <p className="font-bold text-slate-800">{newProject.mainDataFile.name}</p>
                              <p className="text-[10px] text-slate-500">{newProject.mainDataFile.size} • Diunggah hari ini</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setNewProject({ ...newProject, mainDataFile: null });
                              setFormStep1Completed(false);
                            }}
                            className="p-1 text-rose-600 hover:bg-rose-100 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center gap-2">
                          <Upload className="w-8 h-8 text-emerald-600" />
                          <span className="text-xs font-semibold text-slate-700">Klik di sini untuk upload Excel Tabel Cost Savings</span>
                          <span className="text-[10px] text-slate-400">Format yang didukung: .xlsx, .xls, .csv (Maks 10MB)</span>
                          <input type="file" accept=".xlsx, .xls, .csv" onChange={handleMainFileChange} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Selecting Confirmation Team Members */}
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Users className="w-4 h-4 text-emerald-600" />
                      Pilih Anggota Tim yang Wajib Mengonfirmasi *
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Email anggota tim yang dipilih akan menerima notifikasi pengingat secara otomatis.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {userList.filter(u => u.id !== 'admin' && u.email !== currentUser.email).map(u => {
                        const selected = newProject.team.includes(u.email);
                        return (
                          <div
                            key={u.id}
                            onClick={() => toggleTeamMember(u.email)}
                            className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                              selected ? 'bg-emerald-50 border-emerald-300 font-semibold text-emerald-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <div>
                              <p className="font-bold">{u.name}</p>
                              <p className="text-[10px] opacity-80">{u.email}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                              selected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* STEP 2: Optional Calculation Detail Upload */}
              {}
              <div className={`space-y-4 pt-4 border-t border-slate-100 ${
                !formStep1Completed && !newProject.mainDataFile ? 'opacity-50 pointer-events-none' : ''
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    2. Upload File Detail Perhitungan (Opsional)
                  </h3>
                  {!newProject.mainDataFile && (
                    <span className="text-[11px] text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                      Upload langkah 1 terlebih dahulu untuk mengaktifkan
                    </span>
                  )}
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center bg-slate-50/50">
                  {detailFile ? (
                    <div className="flex items-center justify-between bg-teal-50 border border-teal-200 p-3 rounded-xl text-xs">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-teal-600" />
                        <div className="text-left">
                          <p className="font-bold text-slate-800">{detailFile.name}</p>
                          <p className="text-[10px] text-slate-500">{detailFile.size} • Detail Kalkulasi PDF/Excel</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDetailFile(null)}
                        className="p-1 text-rose-600 hover:bg-rose-100 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <FileUp className="w-7 h-7 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600">Unggah berkas rincian kalkulasi (PDF, XLSX, DOCX)</span>
                      <span className="text-[10px] text-slate-400">Berkas ini opsional untuk memperjelas asumsi penghematan</span>
                      <input 
                        type="file" 
                        disabled={!newProject.mainDataFile}
                        onChange={handleDetailFileChange} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveProject(false)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-emerald-600/20"
                >
                  <Send className="w-4 h-4" />
                  Simpan & Kirim Notifikasi Konfirmasi
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: USER PENDING CONFIRMATIONS (TINDAKAN SAYA)                          */}
        {/* ========================================================================= */}
        {}
        {activeTab === 'my_confirmations' && (
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-amber-500" />
                  Konfirmasi Proyek Perlu Tindakan Anda
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Proyek di bawah ini mencantumkan email Anda (<span className="font-bold text-slate-800">{currentUser.email}</span>) dalam kolom Tim dan memerlukan persetujuan.
                </p>
              </div>

              <div className="bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-semibold">
                Pending: {myPendingConfirmations.length} Proyek
              </div>
            </div>

            {myPendingConfirmations.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto opacity-80" />
                <h3 className="text-base font-bold text-slate-800">Tidak Ada Konfirmasi Tertunda</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Semua proyek Cost Savings yang membutuhkan persetujuan Anda telah selesai dikonfirmasi. Anda dapat memeriksa daftar seluruh proyek di tab utama.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {myPendingConfirmations.map(prj => (
                  <div key={prj.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-5">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {prj.id}
                          </span>
                          <span className="text-xs text-slate-400">• {prj.period}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mt-1">{prj.title}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Estimasi Savings</p>
                        <p className="text-lg font-bold text-emerald-600">{formatIDR(prj.savingsAmount)}</p>
                      </div>
                    </div>

                    {/* Files Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                          <div>
                            <p className="font-bold text-slate-800">{prj.mainDataFile.name}</p>
                            <p className="text-[10px] text-slate-400">Tabel Cost Savings Utama ({prj.mainDataFile.size})</p>
                          </div>
                        </div>
                        <button className="text-emerald-600 font-semibold hover:underline flex items-center gap-1">
                          <Download className="w-3.5 h-3.5" /> Unduh
                        </button>
                      </div>

                      {prj.detailFile ? (
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <FileText className="w-5 h-5 text-teal-600" />
                            <div>
                              <p className="font-bold text-slate-800">{prj.detailFile.name}</p>
                              <p className="text-[10px] text-slate-400">Detail Rincian Kalkulasi ({prj.detailFile.size})</p>
                            </div>
                          </div>
                          <button className="text-teal-600 font-semibold hover:underline flex items-center gap-1">
                            <Download className="w-3.5 h-3.5" /> Unduh
                          </button>
                        </div>
                      ) : (
                        <div className="bg-slate-50/50 p-3 rounded-xl border border-dashed border-slate-200 flex items-center text-slate-400 italic">
                          <span>Tidak ada file detail tambahan</span>
                        </div>
                      )}
                    </div>

                    {/* Action Confirmation Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <p className="text-xs text-slate-500">
                        Inisiator: <strong className="text-slate-800">{prj.initiatorName}</strong> ({prj.initiator})
                      </p>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => handleOpenRejectModal(prj)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all"
                        >
                          <X className="w-4 h-4" /> Tolak Konfirmasi
                        </button>

                        <button
                          onClick={() => handleApproveProject(prj)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                        >
                          <Check className="w-4 h-4" /> Setuju & Konfirmasi
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ALL PROJECTS & CONFIRMATION LOG LIST                               */}
        {/* ========================================================================= */}
        {}
        {activeTab === 'all_projects' && (
          <div className="space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Cari judul proyek, ID, atau inisiator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-600">Filter Status:</span>
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none"
                >
                  <option value="ALL">Semua Status</option>
                  <option value="PENDING">Menunggu Konfirmasi Tim</option>
                  <option value="APPROVED">Disetujui / Final (Locked)</option>
                  <option value="REJECTED">Ditolak / Perlu Revisi</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none"
                >
                  <option value="ALL">Semua Kategori</option>
                  <option value="Teknologi Informasi">Teknologi Informasi</option>
                  <option value="Operasional">Operasional</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Sumber Daya Manusia">Sumber Daya Manusia</option>
                </select>
              </div>

            </div>

            {/* PROJECTS TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">Proyek & Periode</th>
                      <th className="py-3.5 px-4">Kategori</th>
                      <th className="py-3.5 px-4">Nilai Savings</th>
                      <th className="py-3.5 px-4">Progres Konfirmasi Tim</th>
                      <th className="py-3.5 px-4">Status Akhir</th>
                      <th className="py-3.5 px-4 text-center">Aksi / Detail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProjects.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-slate-400">
                          Tidak ada proyek yang sesuai dengan kriteria pencarian.
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map(prj => {
                        // Calculate approval percentage progress
                        const totalMembers = prj.team.length;
                        const approvedCount = Object.values(prj.confirmations).filter(c => c.status === 'APPROVED').length;
                        const progressPercent = totalMembers > 0 ? Math.round((approvedCount / totalMembers) * 100) : 0;

                        return (
                          <tr key={prj.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-4">
                              <p className="font-bold text-slate-900 text-sm">{prj.title}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                <span className="font-mono text-emerald-600 font-semibold">{prj.id}</span> • {prj.period} • oleh {prj.initiatorName}
                              </p>
                            </td>

                            <td className="py-4 px-4 font-medium">{prj.category}</td>

                            <td className="py-4 px-4 font-bold text-slate-900 text-sm">
                              {formatIDR(prj.savingsAmount)}
                            </td>

                            {/* Confirmation Progress Bar & Tooltip */}
                            <td className="py-4 px-4 min-w-[180px]">
                              <div className="space-y-1">
                                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500">
                                  <span>{approvedCount} dari {totalMembers} Setuju</span>
                                  <span>{progressPercent}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                  <div
                                    className={`h-2 rounded-full ${
                                      prj.status === 'REJECTED' ? 'bg-rose-500' : prj.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-amber-500'
                                    }`}
                                    style={{ width: `${progressPercent}%` }}
                                  ></div>
                                </div>
                                <p className="text-[10px] text-slate-400 italic">
                                  Tim: {prj.team.map(e => e.split('@')[0]).join(', ')}
                                </p>
                              </div>
                            </td>

                            <td className="py-4 px-4">
                              {renderStatusBadge(prj.status)}
                            </td>

                            <td className="py-4 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setProjectDetailModal(prj)}
                                  className="p-1.5 text-slate-600 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors"
                                  title="Lihat Log Konfirmasi Lengkap"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                {/* Admin Edit Access */}
                                {currentUser.id === 'admin' && (
                                  <button
                                    onClick={() => setEditAdminModal({ ...prj })}
                                    className="p-1.5 text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                                    title="Edit Wewenang Admin"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                )}

                                {/* Revision Trigger for Initiator if Rejected */}
                                {prj.status === 'REJECTED' && prj.initiator === currentUser.email && (
                                  <button
                                    onClick={() => {
                                      setNewProject({
                                        title: prj.title,
                                        category: prj.category,
                                        period: prj.period,
                                        savingsAmount: prj.savingsAmount,
                                        team: prj.team,
                                        mainDataFile: prj.mainDataFile
                                      });
                                      setDetailFile(prj.detailFile);
                                      setFormStep1Completed(true);
                                      setActiveTab('create');
                                      showToast('Form telah terisi dengan data proyek yang perlu direvisi.');
                                    }}
                                    className="px-2 py-1 bg-rose-600 text-white text-[10px] font-bold rounded-md hover:bg-rose-700"
                                  >
                                    Revisi Data
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: EMAIL NOTIFICATION LOGS (TRANSPARENCY SYSTEM)                      */}
        {/* ========================================================================= */}
        {}
        {activeTab === 'email_logs' && (
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-emerald-600" />
                  Log Pengiriman Email & Notifikasi Otomatis
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Rekaman seluruh email notifikasi konfirmasi dan pengingat mingguan otomatis (auto-reminder) yang terkirim ke anggota tim.
                </p>
              </div>

              <button
                onClick={handleSimulateWeeklyReminder}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all"
              >
                + Jalankan Simulasi Pengingat 1 Minggu
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Tipe Email</th>
                      <th className="py-3 px-4">Penerima (To)</th>
                      <th className="py-3 px-4">Subjek Email</th>
                      <th className="py-3 px-4">Waktu Terkirim</th>
                      <th className="py-3 px-4">Status Delivery</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {emailLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4">
                          {log.type === 'WEEKLY_REMINDER' ? (
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-sans font-bold text-[10px]">
                              PENGINGAT MINGGUAN
                            </span>
                          ) : log.type === 'REJECTION_NOTICE' ? (
                            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-sans font-bold text-[10px]">
                              NOTIF REVISI
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-sans font-bold text-[10px]">
                              UNDANGAN BARU
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{log.to}</td>
                        <td className="py-3 px-4 font-sans text-slate-700">{log.subject}</td>
                        <td className="py-3 px-4 text-slate-400">{log.date}</td>
                        <td className="py-3 px-4">
                          <span className="text-emerald-600 font-sans font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: ADMIN USER MANAGEMENT                                              */}
        {/* ========================================================================= */}
        {}
        {activeTab === 'user_mgmt' && currentUser.id === 'admin' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-600" />
                Pengelolaan User & Hak Akses (Wewenang Admin)
              </h2>
              <p className="text-xs text-slate-500">
                Tambah user baru yang dapat dimasukkan ke dalam daftar Tim Konfirmasi proyek Cost Savings.
              </p>
            </div>

            {/* Add User Form */}
            <form onSubmit={handleAddUser} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Tambah User Baru ke Sistem</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Nama Lengkap User"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />

                <input
                  type="email"
                  placeholder="email.user@company.com"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />

                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow"
                >
                  + Tambahkan User
                </button>
              </div>
            </form>

            {/* User List */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Nama User</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Peran Perusahaan</th>
                    <th className="py-3.5 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {userList.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-bold text-slate-800">{u.name}</td>
                      <td className="py-3.5 px-4 font-mono">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border text-slate-700 text-[10px] font-semibold">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {u.id !== 'admin' && (
                          <button
                            onClick={() => setUserList(userList.filter(item => item.id !== u.id))}
                            className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                            title="Hapus User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: REJECTION REASON MODAL (WAJIB DIISI)                              */}
      {/* ========================================================================= */}
      {}
      {rejectModalOpen && selectedProjectForAction && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2 bg-rose-100 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Penolakan Konfirmasi Proyek</h3>
            </div>

            <p className="text-xs text-slate-600">
              Anda menolak konfirmasi untuk proyek <strong className="text-slate-800">{selectedProjectForAction.id}: {selectedProjectForAction.title}</strong>. Sesuai aturan sistem, Anda <strong>wajib mengisi alasan penolakan</strong> agar inisiator dapat melakukan revisi.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Alasan Penolakan (Wajib Diisi) *</label>
              <textarea
                rows="4"
                placeholder="Tuliskan secara spesifik apa yang perlu diperbaiki oleh inisiator..."
                value={rejectionNote}
                onChange={(e) => setRejectionNote(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/20"
              >
                Tolak & Kembalikan ke Inisiator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: PROJECT DETAIL & CONFIRMATION TIMELINE LOG                       */}
      {/* ========================================================================= */}
      {}
      {projectDetailModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {projectDetailModal.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{projectDetailModal.title}</h3>
              </div>
              <button
                onClick={() => setProjectDetailModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status & Savings Info */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
              <div>
                <p className="text-slate-400">Estimasi Cost Savings:</p>
                <p className="text-base font-bold text-emerald-600">{formatIDR(projectDetailModal.savingsAmount)}</p>
              </div>
              <div>
                <p className="text-slate-400">Status Saat Ini:</p>
                <div className="mt-1">{renderStatusBadge(projectDetailModal.status)}</div>
              </div>
            </div>

            {/* Team Status Matrix Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Status Konfirmasi Per Anggota Tim</h4>
              <div className="space-y-2">
                {projectDetailModal.team.map(email => {
                  const conf = projectDetailModal.confirmations[email] || { status: 'PENDING', note: '' };
                  return (
                    <div key={email} className="p-3 bg-white border border-slate-200 rounded-xl text-xs flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">{email}</p>
                        {conf.note && <p className="text-[11px] text-slate-500 italic mt-0.5">"{conf.note}"</p>}
                      </div>
                      <div>
                        {conf.status === 'APPROVED' ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <Check className="w-4 h-4" /> Setuju
                          </span>
                        ) : conf.status === 'REJECTED' ? (
                          <span className="text-rose-600 font-bold flex items-center gap-1">
                            <X className="w-4 h-4" /> Menolak
                          </span>
                        ) : (
                          <span className="text-amber-600 font-medium flex items-center gap-1">
                            <Clock className="w-4 h-4 animate-spin" /> Menunggu
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Timeline Audit Log */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Audit Log Proyek</h4>
              <div className="space-y-3 pl-2 border-l-2 border-slate-200">
                {projectDetailModal.history.map((h, i) => (
                  <div key={i} className="relative pl-4 text-xs space-y-0.5">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></div>
                    <p className="text-[10px] text-slate-400 font-mono">{h.date} • {h.user}</p>
                    <p className="text-slate-700 font-medium">{h.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setProjectDetailModal(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADMIN EDIT OVERRIDE MODAL                                        */}
      {/* ========================================================================= */}
      {}
      {editAdminModal && currentUser.id === 'admin' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveAdminEdit} className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-purple-600 border-b border-slate-100 pb-3">
              <Shield className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">Edit Data Proyek (Akses Khusus Admin)</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700">Judul Proyek</label>
                <input
                  type="text"
                  value={editAdminModal.title}
                  onChange={(e) => setEditAdminModal({ ...editAdminModal, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Nilai Cost Savings (IDR)</label>
                <input
                  type="number"
                  value={editAdminModal.savingsAmount}
                  onChange={(e) => setEditAdminModal({ ...editAdminModal, savingsAmount: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700">Paksa Ubah Status Proyek</label>
                <select
                  value={editAdminModal.status}
                  onChange={(e) => setEditAdminModal({ ...editAdminModal, status: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 mt-1 bg-white"
                >
                  <option value="PENDING">PENDING (Menunggu Konfirmasi Tim)</option>
                  <option value="APPROVED">APPROVED (Locked / Final)</option>
                  <option value="REJECTED">REJECTED (Dikembalikan ke Inisiator)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setEditAdminModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Simpan Perubahan Admin
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 text-center py-4 text-xs text-slate-400">
        Cost Savings Application • Dibuat dengan Vibe Coding Workflow & Persetujuan Multi-User Tim
      </footer>

    </div>
  );
}