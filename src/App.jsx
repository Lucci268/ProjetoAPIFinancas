import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logoImg from './assets/logo.png'; 

import { 
  Eye, EyeOff, ArrowRight, Home, ArrowLeftRight, 
  BarChart3, User, Plus, TrendingUp, TrendingDown,
  Check, Trash2, X, LogOut, Camera, PiggyBank, UserPlus, Edit2, AlertCircle, CheckCircle, HelpCircle, FileText
} from 'lucide-react';

/* ------------------- CONSTANTES & CORES ------------------- */

const DEFAULT_CATEGORIES = [
  { nome: 'Alimentação', color: '#FFB74D' },
  { nome: 'Transporte', color: '#4FC3F7' },
  { nome: 'Moradia', color: '#EF5350' },
  { nome: 'Lazer', color: '#BA68C8' },
  { nome: 'Saúde', color: '#4DB6AC' },
  { nome: 'Outros', color: '#90A4AE' }
];

const CUSTOM_COLORS = [
  '#FF8A65', '#AED581', '#4DD0E1', '#9575CD', '#F06292', 
  '#E57373', '#FFF176', '#81C784', '#64B5F6', '#7986CB',
  '#BA68C8', '#FFB74D', '#4DB6AC'
];

const getColorByName = (name) => {
  if (!name) return '#90A4AE';
  const defaultCat = DEFAULT_CATEGORIES.find(c => c.nome === name);
  if (defaultCat) return defaultCat.color;

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CUSTOM_COLORS.length;
  return CUSTOM_COLORS[index];
};

const ALLOWED_EMAIL_DOMAINS = [
  'gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 
  'icloud.com', 'live.com', 'yahoo.com.br', 'uol.com.br',
  'bol.com.br', 'cashplus.com'
];

const parseDate = (dateStr) => {
  if (!dateStr) return new Date();
  if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      return new Date(year, month - 1, day);
  }
  const [day, month, year] = dateStr.split('/');
  return new Date(year, month - 1, day);
};

const formatDate = (dateString) => {
    if(!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
};

/* ------------------- COMPONENTES UI ------------------- */

const Logo = ({ small = false }) => (
  <div className={`flex items-center ${small ? 'justify-start pl-2 py-2' : 'justify-center mb-4'} animate-in fade-in duration-700`}>
    <img 
      src={logoImg} 
      alt="Logo Cash+" 
      className={`${small ? 'h-20 w-auto' : 'w-72 h-auto'} object-contain drop-shadow-lg transition-all duration-300`}
    />
  </div>
);

const SystemPopup = ({ isOpen, onClose, type = 'success', title, message, onConfirm }) => {
  if (!isOpen) return null;

  const config = {
    success: { icon: <CheckCircle size={32} className="text-cashGreen" />, color: 'border-cashGreen/50', bgIcon: 'bg-cashGreen/10', btn: 'bg-cashGreen text-black hover:bg-green-400' },
    error: { icon: <AlertCircle size={32} className="text-red-500" />, color: 'border-red-500/50', bgIcon: 'bg-red-500/10', btn: 'bg-red-500 text-white hover:bg-red-600' },
    confirm: { icon: <HelpCircle size={32} className="text-yellow-500" />, color: 'border-yellow-500/50', bgIcon: 'bg-yellow-500/10', btn: 'bg-yellow-500 text-black hover:bg-yellow-400' }
  };
  const currentConfig = config[type] || config.success;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className={`bg-[#1E1E1E] border ${currentConfig.color} p-6 rounded-2xl w-full max-w-xs flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300`}>
        <div className={`w-16 h-16 ${currentConfig.bgIcon} rounded-full flex items-center justify-center mb-4`}>{currentConfig.icon}</div>
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3 w-full">
          {type === 'confirm' && <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-gray-700 text-white font-bold hover:bg-gray-600">Cancelar</button>}
          <button onClick={() => { if (onConfirm) onConfirm(); onClose(); }} className={`flex-1 py-3 rounded-xl font-bold shadow-lg active:scale-95 ${currentConfig.btn}`}>{type === 'confirm' ? 'Sim, confirmar' : 'Entendido'}</button>
        </div>
      </div>
    </div>
  );
};

const UserAvatar = ({ user, size = "w-10 h-10", textSize = "text-xs", showBorder = true }) => {
  const borderClass = showBorder ? "border-2 border-cashGreen" : "";
  if (user.avatar) return <img src={user.avatar} alt="Profile" className={`${size} rounded-full object-cover ${borderClass} shadow-lg bg-gray-800`} />;
  return (
    <div className={`${size} rounded-full bg-gray-700 ${borderClass} flex items-center justify-center text-white font-bold ${textSize} shadow-lg`}>
       {user.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
    </div>
  );
};

const InputGroup = ({ label, type = 'text', placeholder, isPassword = false, darkTheme = false, value, onChange, name, required = false, maxLength }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-2 mb-3 w-full">
      {label && <label className="text-gray-300 font-bold text-xs ml-1 tracking-wide">{label}</label>}
      <div className="relative">
        <input
          type={isPassword && !showPassword ? 'password' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          maxLength={maxLength}
          className={`w-full h-12 pl-6 pr-12 rounded-2xl outline-none border-none shadow-lg text-sm font-medium transition-all focus:ring-2 focus:ring-cashGreen 
            ${darkTheme ? 'bg-[#2C2C2C] text-white placeholder-gray-500' : 'bg-white text-black placeholder-gray-400'}`}
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

const PrimaryButton = ({ label, icon, onClick, variant = 'primary', fullWidth = true, type = "button" }) => (
  <button
    onClick={onClick}
    type={type}
    className={`${fullWidth ? 'w-full' : 'px-8'} h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-95
      ${variant === 'primary' ? 'btn-liquid' : 'bg-[#2C2C2C] text-cashGreen border border-cashGreen hover:bg-opacity-80'}`}
  >
    {label}
    {icon}
  </button>
);

const ExpensePieChart = ({ transactions, period, userCategories }) => {
  const filteredTransactions = transactions.filter(t => {
    if (t.tipo !== 'expense' && t.tipo !== 'despesa') return false; 
    const tDate = parseDate(t.data);
    const now = new Date();
    if (period === 'semana') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return tDate >= oneWeekAgo && tDate <= now;
    } else if (period === 'mes') return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
    else if (period === 'ano') return tDate.getFullYear() === now.getFullYear();
    return true;
  });

  const totalsByCategory = {};
  let totalExpense = 0;
  filteredTransactions.forEach(t => {
    const cat = t.nomeCategoria || 'Outros';
    const val = parseFloat(t.valor);
    totalsByCategory[cat] = (totalsByCategory[cat] || 0) + val;
    totalExpense += val;
  });

  let gradientString = totalExpense === 0 ? '#2C2C2C 0deg 360deg' : '';
  let currentDeg = 0;
  const legendData = [];

  const allCats = [...DEFAULT_CATEGORIES, ...userCategories];

  if (totalExpense > 0) {
    Object.keys(totalsByCategory).forEach((catName) => {
      const percent = totalsByCategory[catName] / totalExpense;
      const deg = percent * 360;
      
      const foundCat = allCats.find(c => c.nome === catName);
      const color = foundCat ? (foundCat.cor || foundCat.color) : getColorByName(catName);
      
      gradientString += `${color} ${currentDeg}deg ${currentDeg + deg}deg, `;
      currentDeg += deg;
      legendData.push({ label: catName, value: totalsByCategory[catName], color: color, percent: (percent * 100).toFixed(0) });
    });
    gradientString = gradientString.slice(0, -2);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-6 md:gap-12 animate-in fade-in duration-700">
      <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full shadow-2xl flex-shrink-0 chart-sliver-ring" style={{ background: `conic-gradient(${gradientString})` }}>
         <div className="absolute inset-4 bg-[#1E1E1E] rounded-full flex items-center justify-center flex-col z-10">
            <span className="text-gray-400 text-[10px]">Total Gastos</span>
            <span className="text-white font-bold text-sm md:text-base">
              {totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
         </div>
      </div>
      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar min-w-[140px]">
        {legendData.length === 0 && <p className="text-gray-500 text-xs text-center">Sem gastos neste período.</p>}
        {legendData.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4 text-xs md:text-sm animate-in slide-in-from-right-4 fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div><span className="text-gray-300 truncate max-w-[80px]">{item.label}</span></div>
             <div className="flex gap-2"><span className="text-white font-bold">R$ {item.value}</span><span className="text-gray-500 w-7 text-right">{item.percent}%</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------- NAVEGAÇÃO ------------------- */

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Início' },
    { id: 'transacoes', icon: <ArrowLeftRight size={20} />, label: 'Transações' },
    { id: 'planejamento', icon: <BarChart3 size={20} />, label: 'Plan.' },
    { id: 'perfil', icon: <User size={20} />, label: 'Perfil' },
  ];
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#1E1E1E] border-t border-gray-800 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => (
        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === item.id ? 'text-cashGreen scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
          {item.icon}
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, onLogout, user, transactions = [] }) => {
  const income = transactions.filter(t => t.tipo === 'income').reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const expense = transactions.filter(t => t.tipo === 'expense').reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const balance = income - expense;
  const navItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Visão Geral' },
    { id: 'transacoes', icon: <ArrowLeftRight size={20} />, label: 'Transações' },
    { id: 'planejamento', icon: <BarChart3 size={20} />, label: 'Planejamento' },
    { id: 'perfil', icon: <User size={20} />, label: 'Meu Perfil' },
  ];
  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-[#0F0F0F] border-r border-gray-800 p-6 fixed left-0 top-0">
      <div className="mb-10 pl-2"><Logo small /></div>
      <div className="mb-8 flex items-center gap-3 px-2 animate-in fade-in slide-in-from-left-4 duration-700">
         <UserAvatar user={user} size="w-10 h-10" />
         <div className="overflow-hidden"><p className="text-white text-sm font-bold truncate">{user.name}</p><p className="text-gray-500 text-xs truncate">Saldo: {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></div>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${activeTab === item.id ? 'bg-cashGreen/10 text-cashGreen font-bold translate-x-2' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white hover:translate-x-1'}`}>
            {item.icon}{item.label}
          </button>
        ))}
      </nav>
      <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/10 rounded-xl text-sm font-bold mt-auto transition-colors"><LogOut size={20} />Sair</button>
    </div>
  );
};

/* ------------------- TELAS DE USUÁRIO ------------------- */

const DashboardScreen = ({ user, transactions, userCategories }) => {
  const [chartPeriod, setChartPeriod] = useState('mes');
  const income = transactions.filter(t => t.tipo === 'income').reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const expense = transactions.filter(t => t.tipo === 'expense').reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const balance = income - expense;

  return (
    <div className="pb-24 md:pb-0">
      <div className="md:hidden card-gradient-animate p-6 rounded-b-3xl shadow-lg mb-6 animate-in slide-in-from-top-10 duration-500">
         <div className="flex items-center gap-3 mb-6"><UserAvatar user={user} size="w-12 h-12" textSize="text-lg" /><div><p className="text-gray-400 text-[10px]">Olá,</p><p className="text-white text-sm font-bold">{user.name}</p></div></div>
         <div className="text-center mb-6"><p className="text-gray-400 text-xs mb-1">Saldo geral</p><h2 className="text-3xl font-bold text-white">{balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2></div>
      </div>
      <div className="hidden md:flex justify-between items-end mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div><h1 className="text-3xl font-bold text-white mb-1">Visão Geral</h1><p className="text-gray-400 text-sm">Bem-vindo de volta, {user.name}!</p></div>
        <div className="flex items-center gap-3 bg-[#1E1E1E] px-4 py-2 rounded-full border border-gray-800"><UserAvatar user={user} size="w-8 h-8" showBorder={false} /><span className="text-white text-sm font-medium pr-2">{user.email}</span></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-0">
        <div className="hidden md:flex flex-col justify-between card-gradient-animate p-6 rounded-2xl border border-gray-800 shadow-lg col-span-3 lg:col-span-1 h-64 relative overflow-hidden animate-in zoom-in-95 duration-500 delay-100">
           <div className="relative z-10"><p className="text-gray-400 text-sm mb-1">Saldo Disponível</p><h2 className="text-4xl font-bold text-white">{balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2></div>
           <div className="flex gap-3 relative z-10">
              <div className="flex items-center gap-2 text-green-400 text-xs font-bold bg-black/30 px-3 py-1 rounded-lg"><TrendingUp size={14}/> {income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-black/30 px-3 py-1 rounded-lg"><TrendingDown size={14}/> {expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
           </div>
        </div>
        <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 md:col-span-2 h-auto md:h-64 flex flex-col animate-in zoom-in-95 duration-500 delay-200">
          <div className="flex justify-between items-center mb-2"><span className="text-white font-bold">Resumo de Gastos</span><div className="flex bg-[#0a0a0a] rounded-lg p-1">{['semana', 'mes', 'ano'].map((period) => (<button key={period} onClick={() => setChartPeriod(period)} className={`px-3 py-1 text-[10px] uppercase font-bold rounded-md transition-all duration-300 ${chartPeriod === period ? 'bg-cashGreen text-black shadow-md' : 'text-gray-500 hover:text-white'}`}>{period}</button>))}</div></div>

          <div className="flex-1 w-full flex items-center justify-center"><ExpensePieChart transactions={transactions} period={chartPeriod} userCategories={userCategories} /></div>
        </div>
        <div className="col-span-1 md:col-span-3 animate-in slide-in-from-bottom-8 duration-500 delay-300">
           <h3 className="text-gray-400 text-sm mb-4 px-1">Últimas movimentações</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transactions.length === 0 ? <div className="col-span-full p-8 text-center border border-dashed border-gray-700 rounded-2xl text-gray-500">Nenhuma movimentação registrada.</div> : 
                transactions.slice(0, 6).map((t) => (
                  <div key={t.id} className="bg-[#1E1E1E] p-4 rounded-2xl flex items-center justify-between border border-gray-800 hover:border-gray-600 transition-all hover:scale-[1.02] cursor-default">
                    <div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${t.tipo === 'expense' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>{t.tipo === 'expense' ? <TrendingDown size={18}/> : <TrendingUp size={18}/>}</div><div><p className="text-white text-sm font-bold">{t.descricao}</p><p className="text-gray-500 text-[10px]">{t.nomeCategoria || 'Geral'} • {formatDate(t.data)}</p></div></div>
                    <span className={`text-sm font-bold ${t.tipo === 'expense' ? 'text-white' : 'text-cashGreen'}`}>{t.tipo === 'expense' ? '- ' : '+ '}R$ {parseFloat(t.valor).toFixed(2)}</span>
                  </div>
                ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const TransactionScreen = ({ transactions, onAddTransaction, onDeleteTransaction, userCategories, onAddCategory, onDeleteCategory }) => {
  const [showForm, setShowForm] = useState(false);
  const [showCatForm, setShowCatForm] = useState(false);
  const [newTrans, setNewTrans] = useState({ name: '', value: '', type: 'expense', category: 'Outros' });
  const [newCatName, setNewCatName] = useState('');

  const allCategories = [...DEFAULT_CATEGORIES, ...userCategories];

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newTrans.name || !newTrans.value) return;
    onAddTransaction({ 
        descricao: newTrans.name, 
        valor: newTrans.value, 
        tipo: newTrans.type, 
        nomeCategoria: newTrans.category 
    });
    setNewTrans({ name: '', value: '', type: 'expense', category: 'Outros' });
    setShowForm(false);
  };

  const handleCreateCategory = (e) => {
      e.preventDefault();
      if(newCatName) {
          onAddCategory(newCatName);
          setNewCatName('');
          setShowCatForm(false);
      }
  }

  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center justify-between mb-6 px-6 md:px-0 pt-6 md:pt-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Todas as Transações</h2>
          <button onClick={() => setShowForm(!showForm)} className="bg-cashGreen hover:bg-green-400 text-black px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm transition-all hover:scale-105 active:scale-95">
            {showForm ? <X size={18}/> : <Plus size={18}/>}<span className="hidden md:inline">{showForm ? 'Cancelar' : 'Nova Transação'}</span>
          </button>
       </div>
       {showForm && (
         <div className="px-6 md:px-0 mb-6 animate-in slide-in-from-top-10 fade-in duration-300">
           <form onSubmit={handleSubmit} className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-700 max-w-2xl">
              <h3 className="text-white font-bold mb-4">Adicionar Movimentação</h3>
              <div className="flex gap-2 mb-4">
                <button type="button" onClick={() => setNewTrans({...newTrans, type: 'expense'})} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${newTrans.type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400'}`}>Despesa</button>
                <button type="button" onClick={() => setNewTrans({...newTrans, type: 'income'})} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${newTrans.type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400'}`}>Receita</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup darkTheme placeholder="Descrição (ex: Mercado)" value={newTrans.name} onChange={e => setNewTrans({...newTrans, name: e.target.value})} />
                <InputGroup darkTheme placeholder="Valor (ex: 150.00)" type="number" value={newTrans.value} onChange={e => setNewTrans({...newTrans, value: e.target.value})} />
                
                {newTrans.type === 'expense' && (
                  <div className="md:col-span-2 flex flex-col gap-2 animate-in fade-in duration-300">
                       <div className="flex justify-between items-center">
                          <label className="text-gray-300 font-bold text-xs ml-1">Categoria</label>
                          <button type="button" onClick={() => setShowCatForm(!showCatForm)} className="text-cashGreen text-xs font-bold hover:underline flex items-center gap-1"><Plus size={12}/> Nova Categoria</button>
                       </div>
                       
                       {showCatForm && (
                           <div className="flex gap-2 mb-2 animate-in slide-in-from-top-2">
                               <input type="text" placeholder="Nome da nova categoria" className="flex-1 bg-[#2C2C2C] text-white rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-cashGreen" value={newCatName} onChange={e => setNewCatName(e.target.value)} />
                               <button type="button" onClick={handleCreateCategory} className="bg-cashGreen text-black px-3 py-2 rounded-lg text-xs font-bold hover:bg-green-400">Salvar</button>
                           </div>
                       )}

                       <div className="flex flex-wrap gap-3 p-2 max-h-32 overflow-y-auto custom-scrollbar">
                          {allCategories.map(cat => {
                             const isCustom = !!cat.id;
                             const catColor = cat.cor || cat.color || getColorByName(cat.nome);
                             
                             return (
                               <div key={cat.nome || cat.id} className="relative group">
                                  <button type="button" onClick={() => setNewTrans({...newTrans, category: cat.nome})} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${newTrans.category === cat.nome ? 'border-transparent text-black' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`} style={{ backgroundColor: newTrans.category === cat.nome ? catColor : 'transparent' }}>{cat.nome}</button>
                                  {isCustom && (
                                      <button 
                                          type="button"
                                          onClick={(e) => { e.stopPropagation(); onDeleteCategory(cat.id); }}
                                          className="absolute -top-2 -right-2 z-10 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-all shadow-md hover:scale-110"
                                          title="Excluir Categoria"
                                      >
                                          <X size={12} strokeWidth={3} />
                                      </button>
                                  )}
                               </div>
                             );
                          })}
                       </div>
                  </div>
                )}
                
                <div className="mt-4 md:col-span-2"><PrimaryButton label="Confirmar" onClick={handleSubmit} /></div>
              </div>
           </form>
         </div>
       )}
       <div className="flex-1 overflow-y-auto px-6 md:px-0 pb-24 md:pb-0">
          <div className="grid grid-cols-1 gap-3">
             {transactions.length === 0 && <div className="flex flex-col items-center justify-center mt-20 text-gray-600 animate-in fade-in duration-700"><div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 opacity-50"><ArrowLeftRight size={30} /></div><p>Nenhuma transação encontrada.</p></div>}
             {transactions.map((t, idx) => (
                <div key={t.id} className="flex justify-between items-center p-4 bg-[#1E1E1E] hover:bg-[#252525] rounded-xl border border-gray-800 transition-all hover:scale-[1.01] animate-in slide-in-from-bottom-4 fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                   <div className="flex items-center gap-4"><div className={`w-2 h-10 rounded-full ${t.tipo === 'income' ? 'bg-cashGreen' : 'bg-red-500'}`}></div><div><p className="text-white text-sm font-bold">{t.descricao}</p><p className="text-gray-500 text-xs">{formatDate(t.data)} {t.tipo === 'expense' && `• ${t.nomeCategoria || 'Outros'}`}</p></div></div>
                   <div className="flex items-center gap-4"><span className={`font-bold text-sm ${t.tipo === 'income' ? 'text-cashGreen' : 'text-white'}`}>{t.tipo === 'expense' ? '-' : '+'} R$ {parseFloat(t.valor).toFixed(2)}</span><button onClick={() => onDeleteTransaction(t.id)} className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={18}/></button></div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

const PlanningScreen = ({ goals, onAddGoal, onDeleteGoal, onDepositToGoal, onEditGoal, showAlert }) => {
   const [isCreating, setIsCreating] = useState(false);
   const [newGoal, setNewGoal] = useState({ description: '', total: '', current: '0' });
   const [depositModal, setDepositModal] = useState({ isOpen: false, goalId: null });
   const [depositValue, setDepositValue] = useState('');
   const [editModal, setEditModal] = useState({ isOpen: false, goal: null });

   const handleCreate = () => { if(!newGoal.description || !newGoal.total) return; onAddGoal(newGoal); setNewGoal({ description: '', total: '', current: '0' }); setIsCreating(false); };
   const confirmDeposit = () => { if(!depositValue || parseFloat(depositValue) <= 0) return; onDepositToGoal(depositModal.goalId, depositValue); setDepositModal({ isOpen: false, goalId: null }); setDepositValue(''); };
   const handleSaveEdit = () => { if (!editModal.goal.descricao || !editModal.goal.valorMeta) return; onEditGoal(editModal.goal); setEditModal({ isOpen: false, goal: null }); };
   const handleDeleteFromModal = () => { showAlert('Excluir Meta?', `Tem certeza que deseja excluir a meta "${editModal.goal.descricao}"?`, 'confirm', () => { onDeleteGoal(editModal.goal.id); setEditModal({ isOpen: false, goal: null }); }); };

   return (
      <div className="px-6 md:px-0 pt-8 md:pt-0 pb-24 md:pb-0 h-full overflow-y-auto relative">
         <div className="flex items-center justify-between mb-8"><h2 className="text-2xl md:text-3xl font-bold text-white">Planejamento Financeiro</h2><PrimaryButton label={isCreating ? "Cancelar" : "Nova Meta"} icon={isCreating ? <X size={18}/> : <Plus size={18}/>} onClick={() => setIsCreating(!isCreating)} fullWidth={false}/></div>
         {depositModal.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
               <div className="bg-[#1E1E1E] p-6 rounded-2xl w-full max-w-sm border border-gray-700 animate-in zoom-in-95 slide-in-from-bottom-10"><h3 className="text-white font-bold text-lg mb-4">Guardar dinheiro</h3><InputGroup placeholder="Valor (ex: 50.00)" type="number" darkTheme value={depositValue} onChange={(e) => setDepositValue(e.target.value)} /><div className="flex gap-3 mt-4"><button onClick={() => setDepositModal({ isOpen: false, goalId: null })} className="flex-1 py-3 rounded-full text-gray-400 font-bold hover:bg-gray-800">Cancelar</button><button onClick={confirmDeposit} className="flex-1 py-3 rounded-full bg-cashGreen text-black font-bold hover:bg-green-400">Confirmar</button></div></div>
            </div>
         )}
         {editModal.isOpen && editModal.goal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
               <div className="bg-[#1E1E1E] p-6 rounded-2xl w-full max-w-sm border border-gray-700 animate-in zoom-in-95 slide-in-from-bottom-10">
                  <div className="flex justify-between items-center mb-4"><h3 className="text-white font-bold text-lg">Editar Meta</h3><button onClick={() => setEditModal({ isOpen: false, goal: null })} className="text-gray-400 hover:text-white"><X size={20} /></button></div>
                  <InputGroup label="Nome da Meta" darkTheme value={editModal.goal.descricao} onChange={(e) => setEditModal({...editModal, goal: { ...editModal.goal, descricao: e.target.value }})} />
                  <InputGroup label="Valor Total (R$)" type="number" darkTheme value={editModal.goal.valorMeta} onChange={(e) => setEditModal({...editModal, goal: { ...editModal.goal, valorMeta: e.target.value }})} />
                  <div className="flex flex-col gap-3 mt-6"><PrimaryButton label="Salvar Alterações" onClick={handleSaveEdit} /><button onClick={handleDeleteFromModal} className="w-full py-3 rounded-full bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 border border-red-500/30"><Trash2 size={18} /> Excluir Meta</button></div>
               </div>
            </div>
         )}
         {isCreating && (
            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 mb-8 max-w-2xl animate-in slide-in-from-top-8 fade-in"><h3 className="text-white font-bold mb-4">Definir nova meta</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="md:col-span-2"><InputGroup label="Nome da Meta" placeholder="Ex: Computador Novo" darkTheme value={newGoal.description} onChange={e => setNewGoal({...newGoal, description: e.target.value})} /></div><InputGroup label="Valor Total (R$)" placeholder="Ex: 5000" type="number" darkTheme value={newGoal.total} onChange={e => setNewGoal({...newGoal, total: e.target.value})} /><InputGroup label="Valor Inicial (R$)" placeholder="Ex: 0" type="number" darkTheme value={newGoal.current} onChange={e => setNewGoal({...newGoal, current: e.target.value})} /></div><div className="mt-4 flex justify-end"><div className="w-full md:w-auto"><PrimaryButton label="Salvar Meta" onClick={handleCreate} fullWidth={false} /></div></div></div>
         )}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.length === 0 && !isCreating && <div className="col-span-full text-center py-20 text-gray-600 border-2 border-dashed border-gray-800 rounded-2xl animate-in fade-in">Você ainda não criou nenhuma meta.</div>}
            {goals.map((goal, idx) => {
               const current = parseFloat(goal.valorAtual || 0);
               const total = parseFloat(goal.valorMeta || 1);
               const percent = Math.min((current / total) * 100, 100);
               return (
                  <div key={goal.id} className="bg-[#1E1E1E] p-5 rounded-2xl border border-gray-800 relative group hover:border-cashGreen/50 transition-all hover:scale-[1.02] animate-in slide-in-from-bottom-4 fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                     <div className="flex justify-between mb-2 items-start"><span className="text-white font-bold text-lg">{goal.descricao}</span><div className="flex gap-2"><button onClick={() => setDepositModal({ isOpen: true, goalId: goal.id })} className="text-cashGreen bg-cashGreen/10 p-2 rounded-lg hover:bg-cashGreen hover:text-black transition-colors" title="Guardar dinheiro"><PiggyBank size={18}/></button><button onClick={() => setEditModal({ isOpen: true, goal: goal })} className="text-gray-400 bg-gray-800 p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors" title="Editar Meta"><Edit2 size={18} /></button></div></div>
                     <div className="flex justify-between mb-3 text-sm text-gray-400 font-medium"><span>{percent.toFixed(0)}%</span><span>R$ {current} / R$ {total}</span></div>
                     <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-cashGreen transition-all duration-1000 ease-out" style={{ width: `${percent}%` }}></div></div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

const ProfileScreen = ({ user, onUpdateUser, showAlert }) => {
  const [formData, setFormData] = useState(user);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (event) => { 
      const file = event.target.files[0]; 
      if (file) { 
          const reader = new FileReader(); 
          reader.onloadend = () => setFormData({ ...formData, avatar: reader.result }); 
          reader.readAsDataURL(file); 
      } 
  };
  
  const handleRemovePhoto = () => setFormData({ ...formData, avatar: null });
  
  const handleSave = async (e) => { 
      e.preventDefault(); 
      try {
          const response = await axios.put(`http://localhost:8080/api/users/${user.id}`, formData);
          onUpdateUser(response.data);
          showAlert('Sucesso!', 'Seu perfil foi atualizado e salvo!', 'success');
      } catch (error) {
          console.error("Erro ao atualizar perfil:", error);
          showAlert('Erro', 'Não foi possível salvar as alterações.', 'error');
      }
  };

  return (
    <div className="px-6 md:px-0 pt-10 md:pt-0 pb-24 md:pb-0 max-w-2xl mx-auto md:mx-0">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Configurações de Perfil</h2>
      <div className="bg-[#1E1E1E] p-8 rounded-2xl border border-gray-800 animate-in fade-in zoom-in-95 duration-500">
         <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative group"><UserAvatar user={formData} size="w-32 h-32" textSize="text-4xl" /><button onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-cashGreen text-black p-2 rounded-full border-4 border-[#1E1E1E] hover:bg-green-400 transition-colors"><Camera size={20} /></button><input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" /></div>
            <div className="text-center md:text-left flex-1"><h3 className="text-white font-bold text-xl">{formData.name || "Usuário"}</h3><p className="text-gray-500 mb-4">{formData.email}</p>{formData.avatar && <button onClick={handleRemovePhoto} className="text-red-400 text-xs font-bold hover:underline flex items-center gap-1 mx-auto md:mx-0"><Trash2 size={12} /> Remover foto</button>}</div>
         </div>
         <form className="flex flex-col gap-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Nome Completo" placeholder="Seu nome" darkTheme value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <InputGroup label="Email" placeholder="email@exemplo.com" type="email" darkTheme value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <InputGroup label="Telefone" placeholder="11999999999" type="tel" maxLength={11} darkTheme value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} />
            </div>
            <div className="mt-4 md:w-1/3"><PrimaryButton label="Salvar Alterações" icon={<Check size={18} />} type="submit" /></div>
         </form>
      </div>
    </div>
  );
};

/* ------------------- TELA DE ADMINISTRAÇÃO ------------------- */

const AdminScreen = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/admin/users')
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao buscar usuários');
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro:', error);
        setUsers([]);
        setLoading(false);
      });
  }, []);

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.role === 'USER').length; 

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/20 rounded-xl text-blue-500"><User size={32} /></div>
              <div><h1 className="text-3xl font-bold">Painel Administrativo</h1><p className="text-gray-400">Gerenciamento do Sistema</p></div>
           </div>
           <button onClick={onLogout} className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold"><LogOut size={20} /> Sair</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800"><p className="text-gray-400 mb-2">Total de Usuários</p><h2 className="text-4xl font-bold">{loading ? <span className="text-gray-600 text-2xl">Carregando...</span> : totalUsers}</h2></div>
           <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800"><p className="text-gray-400 mb-2">Usuários Ativos (Users)</p><h2 className="text-4xl font-bold text-cashGreen">{loading ? <span className="text-gray-600 text-2xl">...</span> : activeUsers}</h2></div>
           <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800"><p className="text-gray-400 mb-2">Status do Sistema</p><h2 className="text-4xl font-bold text-blue-400">Online</h2></div>
        </div>
        <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 overflow-hidden">
           <div className="p-6 border-b border-gray-800 flex justify-between items-center"><h3 className="text-xl font-bold">Usuários Cadastrados</h3><span className="text-xs text-gray-500">Atualizado em tempo real</span></div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-[#151515] text-gray-400 uppercase text-xs"><tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Nome</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Perfil</th></tr></thead>
                 <tbody className="divide-y divide-gray-800">
                    {loading ? (<tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">Carregando dados...</td></tr>) : users.length === 0 ? (<tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">Nenhum usuário encontrado na base de dados.</td></tr>) : (users.map((u) => (<tr key={u.id} className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-mono text-gray-500">#{u.id}</td><td className="px-6 py-4 font-bold">{u.name || "Sem Nome"}</td><td className="px-6 py-4 text-gray-300">{u.email}</td><td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'ADMIN' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>{u.role || "USER"}</span></td></tr>)))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------- APP PRINCIPAL ------------------- */

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRegister, setIsRegister] = useState(false);
  const [authData, setAuthData] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
  const [popupConfig, setPopupConfig] = useState({ isOpen: false, type: 'success', title: '', message: '', onConfirm: null });
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsText, setTermsText] = useState('');

  const showAlert = (title, message, type = 'success', onConfirm = null) => { setPopupConfig({ isOpen: true, title, message, type, onConfirm }); };
  const closeAlert = () => { setPopupConfig({ ...popupConfig, isOpen: false }); };

  const [user, setUser] = useState(() => { const saved = localStorage.getItem('cashplus_user'); return saved ? JSON.parse(saved) : { name: '', email: '', avatar: null }; });
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [userCategories, setUserCategories] = useState([]); 

  useEffect(() => { localStorage.setItem('cashplus_user', JSON.stringify(user)); }, [user]);

  const fetchUserData = async () => {
      if (!user.id) return;
      try {
          const resTrans = await axios.get(`http://localhost:8080/api/transactions?userId=${user.id}`);
          setTransactions(resTrans.data);
          const resGoals = await axios.get(`http://localhost:8080/api/goals?userId=${user.id}`);
          setGoals(resGoals.data);
          const resCats = await axios.get(`http://localhost:8080/api/categorias?userId=${user.id}`);
          setUserCategories(resCats.data);
      } catch (err) {
          console.error("Erro ao buscar dados do usuário:", err);
      }
  };

  useEffect(() => {
      if (user.id && currentScreen === 'app') {
          fetchUserData();
      }
  }, [user.id, currentScreen]);

  const fetchTerms = async () => {
      try {
          const res = await axios.get('http://localhost:8080/api/terms-of-use');
          setTermsText(res.data);
          setShowTermsModal(true);
      } catch (error) {
          console.error("Erro ao buscar termos", error);
          showAlert('Erro', 'Não foi possível carregar os termos de uso.', 'error');
      }
  };

  const handleAddTransaction = async (t) => {
      try {
          const res = await axios.post('http://localhost:8080/api/transactions', {
              userId: user.id,
              descricao: t.descricao,
              valor: t.valor,
              tipo: t.tipo,
              categoriaId: 1, 
              nomeCategoria: t.nomeCategoria 
          });
          setTransactions([...transactions, res.data]);
          showAlert('Sucesso', 'Transação registrada!', 'success');
      } catch (error) {
          showAlert('Erro', 'Não foi possível salvar a transação.', 'error');
      }
  };

  const handleDeleteTransaction = async (id) => {
      try {
          await axios.delete(`http://localhost:8080/api/transactions/${id}`);
          setTransactions(transactions.filter(t => t.id !== id));
      } catch (error) {
          showAlert('Erro', 'Falha ao deletar transação.', 'error');
      }
  };

  const handleAddGoal = async (g) => {
      try {
          const res = await axios.post('http://localhost:8080/api/goals', {
              userId: user.id,
              descricao: g.description,
              valorMeta: g.total,
              valorAtual: g.current,
              dataAlvo: new Date().toISOString().split('T')[0]
          });
          setGoals([...goals, res.data]);
      } catch (error) {
          showAlert('Erro', 'Falha ao criar meta.', 'error');
      }
  };

  const handleDeleteGoal = async (id) => {
      try {
          await axios.delete(`http://localhost:8080/api/goals/${id}`);
          setGoals(goals.filter(g => g.id !== id));
      } catch (error) {
          showAlert('Erro', 'Falha ao deletar meta.', 'error');
      }
  };

  const handleEditGoal = async (updatedGoal) => {
      try {
          await axios.put(`http://localhost:8080/api/goals/${updatedGoal.id}`, updatedGoal);
          setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
      } catch (error) {
          showAlert('Erro', 'Falha ao atualizar meta.', 'error');
      }
  };

  const handleDepositToGoal = async (goalId, amount) => {
     const targetGoal = goals.find(g => g.id === goalId);
     if(!targetGoal) return;

     const newVal = parseFloat(targetGoal.valorAtual || 0) + parseFloat(amount);
     
     try {
         const updated = { ...targetGoal, valorAtual: newVal };
         await axios.put(`http://localhost:8080/api/goals/${goalId}`, updated);
         setGoals(goals.map(g => g.id === goalId ? updated : g));

         await handleAddTransaction({
             descricao: `Guardado: ${targetGoal.descricao}`,
             valor: amount,
             tipo: 'expense',
             nomeCategoria: 'Metas'
         });
     } catch (err) {
         showAlert('Erro', 'Falha ao processar depósito.', 'error');
     }
  };

  const handleAddCategory = async (name) => {
      try {
          const randomColor = generateRandomColor(); 
          const res = await axios.post('http://localhost:8080/api/categorias', {
              nome: name,
              tipo: 'despesa', 
              userId: user.id,
              cor: randomColor 
          });
          const newCat = res.data;
          setUserCategories([...userCategories, newCat]);
          showAlert('Sucesso', 'Categoria criada!', 'success');
      } catch (err) {
          showAlert('Erro', 'Falha ao criar categoria.', 'error');
      }
  };

  const handleDeleteCategory = async (id) => {
      try {
          await axios.delete(`http://localhost:8080/api/categorias/${id}`);
          setUserCategories(userCategories.filter(cat => cat.id !== id));
          showAlert('Sucesso', 'Categoria removida.', 'success');
      } catch (err) {
          showAlert('Erro', 'Falha ao remover categoria.', 'error');
      }
  };

  const handleAuth = async () => {
     if(authData.email) {
        const domain = authData.email.split('@')[1];
        if(!domain || !ALLOWED_EMAIL_DOMAINS.includes(domain) && authData.email !== 'admin@cashplus.com') {
           showAlert('Email inválido', `O domínio @${domain} não é permitido.`, 'error');
           return;
        }
     }

     try {
       if (isRegister) {
         if (!acceptedTerms) {
             showAlert('Atenção', 'Você precisa ler e aceitar os Termos de Uso para criar uma conta.', 'error');
             return;
         }
         if (authData.password !== authData.confirmPassword) { 
             showAlert('Erro', 'As senhas não coincidem!', 'error'); 
             return; 
         }
         if (!authData.name) { 
             showAlert('Atenção', 'Por favor, digite seu nome.', 'error'); 
             return; 
         }
         if (!authData.phone || authData.phone.length !== 11) {
             showAlert('Atenção', 'Por favor, digite um telefone válido (11 dígitos).', 'error'); 
             return; 
         }

         const res = await axios.post('http://localhost:8080/api/users/register', {
            name: authData.name,
            email: authData.email,
            senha: authData.password,
            telefone: authData.phone, 
            role: "USER"
         });

         setUser(res.data);
         setCurrentScreen('app');
         showAlert('Bem-vindo!', 'Sua conta foi criada e salva.', 'success');

       } else {
         const res = await axios.post('http://localhost:8080/api/users/login', {
            email: authData.email,
            senha: authData.password
         });

         const userData = res.data;
         setUser(userData);
         
         if (userData.role === 'ADMIN') {
             setCurrentScreen('admin');
         } else {
             setCurrentScreen('app');
         }
       }
     } catch (error) {
         console.error("Erro auth:", error);
         const msg = error.response?.data || "Erro de conexão com o servidor.";
         showAlert('Erro de Acesso', typeof msg === 'string' ? msg : JSON.stringify(msg), 'error');
     }
  };

  const handleLogout = () => { 
      setCurrentScreen('login'); 
      setIsRegister(false); 
      setAuthData({ name: '', email: '', password: '', confirmPassword: '', phone: '' }); 
      setAcceptedTerms(false);
      setUser({name:'', email:'', avatar: null}); 
      localStorage.removeItem('cashplus_user'); 
      setTransactions([]); 
      setGoals([]); 
      setUserCategories([]);
  };

  const renderContent = () => {
    return (
      <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out">
        {(() => {
          switch(activeTab) {
             case 'dashboard': return <DashboardScreen user={user} transactions={transactions} userCategories={userCategories} />; 
             case 'perfil': return <ProfileScreen user={user} onUpdateUser={setUser} showAlert={showAlert} />;
             case 'transacoes': return <TransactionScreen transactions={transactions} onAddTransaction={handleAddTransaction} onDeleteTransaction={handleDeleteTransaction} userCategories={userCategories} onAddCategory={handleAddCategory} onDeleteCategory={handleDeleteCategory} />;
             case 'createGoal': 
             case 'planejamento': return <PlanningScreen goals={goals} onAddGoal={handleAddGoal} onDeleteGoal={handleDeleteGoal} onDepositToGoal={handleDepositToGoal} onEditGoal={handleEditGoal} showAlert={showAlert} />;
             default: return <DashboardScreen user={user} transactions={transactions} />;
          }
        })()}
      </div>
    );
  };

  if (currentScreen === 'admin') {
     return <AdminScreen onLogout={handleLogout} />;
  }

  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen w-full bg-gradient-app flex items-center justify-center p-6 overflow-hidden">
        <SystemPopup isOpen={popupConfig.isOpen} onClose={closeAlert} type={popupConfig.type} title={popupConfig.title} message={popupConfig.message} />
        
        {showTermsModal && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in">
                <div className="bg-[#1E1E1E] border border-gray-700 p-6 rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col relative animate-in zoom-in-95">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
                        <h3 className="text-white font-bold text-xl flex items-center gap-2"><FileText size={24} className="text-cashGreen"/> Termos de Uso</h3>
                        <button onClick={() => setShowTermsModal(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar text-gray-300 text-sm leading-relaxed whitespace-pre-line pr-2">
                        {termsText || "Carregando termos..."}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-700">
                        <button onClick={() => { setAcceptedTerms(true); setShowTermsModal(false); }} className="w-full py-3 bg-cashGreen text-black font-bold rounded-xl hover:bg-green-400 transition-all">Li e Concordo</button>
                    </div>
                </div>
            </div>
        )}

        <div className="w-full max-w-md transition-all duration-500">
           <Logo />
           <div key={isRegister ? 'register' : 'login'} className="animate-in fade-in slide-in-from-right-8 duration-500">
             <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }} className="flex flex-col px-4">
               <h2 className="text-white text-2xl font-bold mb-4 text-center">{isRegister ? 'Crie sua conta' : 'Acesse sua conta'}</h2>
               {isRegister && <InputGroup label="Nome Completo" placeholder="Seu nome" value={authData.name} onChange={(e) => setAuthData({...authData, name: e.target.value})} />}
               <InputGroup label="Email" placeholder="Insira seu email" type="email" value={authData.email} onChange={(e) => setAuthData({...authData, email: e.target.value})} />
               <InputGroup label="Senha" placeholder="********" isPassword value={authData.password} onChange={(e) => setAuthData({...authData, password: e.target.value})} />
               {isRegister && (
                   <>
                    <InputGroup label="Confirmar Senha" placeholder="********" isPassword value={authData.confirmPassword} onChange={(e) => setAuthData({...authData, confirmPassword: e.target.value})} />
                    <InputGroup label="Telefone" placeholder="Insira seu telefone" type="tel" maxLength={11} value={authData.phone} onChange={(e) => setAuthData({...authData, phone: e.target.value})} />
                    
                    <div className="flex items-center gap-2 mt-1 mb-3">
                        <input 
                            type="checkbox" 
                            id="terms" 
                            checked={acceptedTerms} 
                            onChange={(e) => setAcceptedTerms(e.target.checked)} 
                            className="w-4 h-4 accent-cashGreen cursor-pointer"
                        />
                        <label htmlFor="terms" className="text-xs text-gray-400 cursor-pointer select-none">
                            Li e aceito os <button type="button" onClick={fetchTerms} className="text-cashGreen font-bold hover:underline">Termos de Uso</button>
                        </label>
                    </div>
                   </>
               )}
               <div className="flex flex-col gap-4 mt-2"><PrimaryButton label={isRegister ? "Cadastrar" : "Entrar"} icon={isRegister ? <UserPlus size={20} /> : <ArrowRight size={20} />} type="submit" /><button type="button" onClick={() => setIsRegister(!isRegister)} className="text-cashGreen font-bold text-sm hover:text-green-400 transition-colors mt-2">{isRegister ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}</button></div>
             </form>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white font-sans flex">
      <SystemPopup isOpen={popupConfig.isOpen} onClose={closeAlert} type={popupConfig.type} title={popupConfig.title} message={popupConfig.message} onConfirm={popupConfig.onConfirm} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} user={user} transactions={transactions} />
      <main className="flex-1 md:ml-64 h-screen overflow-y-auto bg-gradient-app">
         <div className="max-w-7xl mx-auto md:p-10">
            {renderContent()}
         </div>
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;