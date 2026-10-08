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
  { id: 'u3', name: 'Rudi Hermawan', email: 'rudi.hermawan@company.com', role: 'Tim Operational' },
  { id: 'u4', name: 'Admin Utama', email: 'admin@company.com', role: 'Admin' },
];

const INITIAL_PROJECTS = [
  {
    id: 'PRJ-2026-001',
    title: 'Efisiensi Biaya Listrik Pabrik A',
    category: 'Energi & Utilitas',
    amount: 250000000,
    initiator: 'Budi Santoso',
    initiatorEmail: 'budi.santoso@company.com',
    createdAt: '2026-09-15',
    costSavingsFile: 'Tabel_Cost_Savings_Listrik_2026.xlsx',
    detailCalculationFile: 'Detail_Kalkulasi_Daya_Pabrik.pdf',
    team: [
      { name: 'Siti Aminah', email: 'siti.aminah@company.com', status: 'Approved', confirmedAt: '2026-09-16 10:30', reason: '' },
      { name: 'Rudi Hermawan', email: 'rudi.hermawan@company.com', status: 'Approved', confirmedAt: '2026-09-17 14:15', reason: '' }
    ],
    status: 'Approved',
    isLocked: true,
    logs: [
      { id: 'l1', date: '2026-09-15 09:00', actor: 'Budi Santoso', action: 'Membuat dan mengunggah dokumen Cost Savings' },
      { id: 'l2', date: '2026-09-15 09:05', actor: 'System', action: 'Notifikasi email dikirim ke tim konfirmasi' },
      { id: 'l3', date: '2026-09-16 10:30', actor: 'Siti Aminah', action: 'Menyetujui konfirmasi proyek' },
      { id: 'l4', date: '2026-09-17 14:15', actor: 'Rudi Hermawan', action: 'Menyetujui konfirmasi proyek' },
      { id: 'l5', date: '2026-09-17 14:15', actor: 'System', action: 'Semua tim menyetujui. Status proyek dikunci (Locked).' }
    ]
  },
  {
    id: 'PRJ-2026-002',
    title: 'Optimasi Bahan Baku Kemasan Kemasan Skincare',
    category: 'Material & Kemasan',
    amount: 180000000,
    initiator: 'Budi Santoso',
    initiatorEmail: 'budi.santoso@company.com',
    createdAt: '2026-10-01',
    costSavingsFile: 'Tabel_Penghematan_Plastik_2026.xlsx',
    detailCalculationFile: null,
    team: [
      { name: 'Siti Aminah', email: 'siti.aminah@company.com', status: 'Approved', confirmedAt: '2026-10-02 09:00', reason: '' },
      { name: 'Rudi Hermawan', email: 'rudi.hermawan@company.com', status: 'Pending', confirmedAt: null, reason: '' }
    ],
    status: 'Pending',
    isLocked: false,
    logs: [
      { id: 'l10', date: '2026-10-01 11:00', actor: 'Budi Santoso', action: 'Membuat dan mengunggah dokumen Cost Savings' },
      { id: 'l11', date: '2026-10-01 11:05', actor: 'System', action: 'Notifikasi email dikirim ke tim konfirmasi' },
      { id: 'l12', date: '2026-10-02 09:00', actor: 'Siti Aminah', action: 'Menyetujui konfirmasi proyek' }
    ]
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [users, setUsers] = useState(INITIAL_USERS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [projectToReject, setProjectToReject] = useState(null);

  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Tim Reviewer');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Material & Kemasan',
    amount: '',
    costSavingsFile: null,
    detailCalculationFile: null,
    teamEmails: []
  });

  const handleLogin = (e) => {
    e?.preventDefault();
    setLoginError('');

    const foundUser = users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
    } else {
      setLoginError('Email atau password tidak terdaftar.');
    }
  };

  const quickLogin = (userObj) => {
    setCurrentUser(userObj);
    setLoginEmail(userObj.email);
    setLoginPassword('password123');
    setLoginError('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
    setActiveTab('dashboard');
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTeamToggle = (email) => {
    setFormData(prev => {
      const exists = prev.teamEmails.includes(email);
      if (exists) {
        return { ...prev, teamEmails: prev.teamEmails.filter(e => e !== email) };
      } else {
        return { ...prev, teamEmails: [...prev.teamEmails, email] };
      }
    });
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!formData.costSavingsFile) {
      alert('File Tabel Cost Savings wajib diunggah!');
      return;
    }
    if (formData.teamEmails.length === 0) {
      alert('Pilih setidaknya satu anggota tim untuk konfirmasi!');
      return;
    }

    const teamList = formData.teamEmails.map(email => {
      const u = users.find(usr => usr.email === email);
      return {
        name: u ? u.name : email,
        email: email,
        status: 'Pending',
        confirmedAt: null,
        reason: ''
      };
    });

    const newPrj = {
      id: `PRJ-2026-00${projects.length + 1}`,
      title: formData.title,
      category: formData.category,
      amount: parseFloat(formData.amount) || 0,
      initiator: currentUser.name,
      initiatorEmail: currentUser.email,
      createdAt: new Date().toISOString().split('T')[0],
      costSavingsFile: formData.costSavingsFile.name,
      detailCalculationFile: formData.detailCalculationFile ? formData.detailCalculationFile.name : null,
      team: teamList,
      status: 'Pending',
      isLocked: false,
      logs: [
        {
          id: `l-${Date.now()}-1`,
          date: new Date().toLocaleString('id-ID'),
          actor: currentUser.name,
          action: 'Membuat proyek dan mengunggah dokumen Cost Savings'
        },
        {
          id: `l-${Date.now()}-2`,
          date: new Date().toLocaleString('id-ID'),
          actor: 'System',
          action: `Notifikasi email dikirim ke (${teamList.map(t => t.name).join(', ')})`
        }
      ]
    };

    setProjects([newPrj, ...projects]);
    alert('Proyek Cost Savings berhasil disimpan dan email konfirmasi dikirim ke tim!');
    setFormData({
      title: '',
      category: 'Material & Kemasan',
      amount: '',
      costSavingsFile: null,
      detailCalculationFile: null,
      teamEmails: []
    });
    setActiveTab('projects');
  };

  const handleApprove = (project) => {
    const updated = projects.map(p => {
      if (p.id === project.id) {
        const updatedTeam = p.team.map(member => {
          if (member.email === currentUser.email) {
            return {
              ...member,
              status: 'Approved',
              confirmedAt: new Date().toLocaleString('id-ID')
            };
          }
          return member;
        });

        const allApproved = updatedTeam.every(m => m.status === 'Approved');
        const newStatus = allApproved ? 'Approved' : 'Pending';
        const newIsLocked = allApproved;

        const newLogs = [
          ...p.logs,
          {
            id: `l-${Date.now()}`,
            date: new Date().toLocaleString('id-ID'),
            actor: currentUser.name,
            action: 'Menyetujui konfirmasi proyek'
          }
        ];

        if (allApproved) {
          newLogs.push({
            id: `l-${Date.now()}-locked`,
            date: new Date().toLocaleString('id-ID'),
            actor: 'System',
            action: 'Semua anggota tim telah menyetujui. Data terkunci permanen (Locked).'
          });
        }

        return {
          ...p,
          team: updatedTeam,
          status: newStatus,
          isLocked: newIsLocked,
          logs: newLogs
        };
      }
      return p;
    });

    setProjects(updated);
    if (selectedProject && selectedProject.id === project.id) {
      setSelectedProject(updated.find(x => x.id === project.id));
    }
  };

  const openRejectModal = (project) => {
    setProjectToReject(project);
    setRejectReason('');
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) {
      alert('Alasan penolakan wajib diisi!');
      return;
    }

    const updated = projects.map(p => {
      if (p.id === projectToReject.id) {
        const updatedTeam = p.team.map(member => {
          if (member.email === currentUser.email) {
            return {
              ...member,
              status: 'Rejected',
              confirmedAt: new Date().toLocaleString('id-ID'),
              reason: rejectReason
            };
          }
          return member;
        });

        const newLogs = [
          ...p.logs,
          {
            id: `l-${Date.now()}`,
            date:
