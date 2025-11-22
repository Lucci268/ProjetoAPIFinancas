import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, EyeOff, ArrowRight, Home, ArrowLeftRight, 
  BarChart3, User, Plus, TrendingUp, TrendingDown,
  Check, Trash2, X, LogOut, Camera, PiggyBank, UserPlus, Edit2, AlertCircle, CheckCircle, HelpCircle
} from 'lucide-react';

/* ------------------- UTILITÁRIOS & CONSTANTES ------------------- */

const CATEGORIES = {
  'Alimentação': { color: '#FFB74D', label: 'Alimentação' },
  'Transporte': { color: '#4FC3F7', label: 'Transporte' },
  'Moradia': { color: '#EF5350', label: 'Moradia' },
  'Lazer': { color: '#BA68C8', label: 'Lazer' },
  'Metas': { color: '#69F0AE', label: 'Metas/Economia' },
  'Outros': { color: '#90A4AE', label: 'Outros' }
};

const ALLOWED_EMAIL_DOMAINS = [
  'gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 
  'icloud.com', 'live.com', 'yahoo.com.br', 'uol.com.br',
  'bol.com.br'
];

const parseDate = (dateStr) => {
  if (!dateStr) return new Date();
  const [day, month, year] = dateStr.split('/');
  return new Date(year, month - 1, day);
};

/* ------------------- COMPONENTES UI ------------------- */

const Logo = ({ small = false }) => (
  <div className={`flex items-center gap-1 ${small ? 'justify-start' : 'justify-center mb-8'} animate-in fade-in duration-700`}>
    <span className={`text-white font-bold tracking-wide drop-shadow-sm ${small ? 'text-2xl' : 'text-4xl'}`}>
      Cash<span className="text-cashGreen">+</span>
    </span>
  </div>
);

const SystemPopup = ({ isOpen, onClose, type = 'success', title, message, onConfirm }) => {
  if (!isOpen) return null;

  const config = {
    success: {
      icon: <CheckCircle size={32} className="text-cashGreen" />,
      color: 'border-cashGreen/50',
      bgIcon: 'bg-cashGreen/10',
      btn: 'bg-cashGreen text-black hover:bg-green-400'
    },
    error: {
      icon: <AlertCircle size={32} className="text-red-500" />,
      color: 'border-red-500/50',
      bgIcon: 'bg-red-500/10',
      btn: 'bg-red-500 text-white hover:bg-red-600'
    },
    confirm: {
      icon: <HelpCircle size={32} className="text-yellow-500" />,
      color: 'border-yellow-500/50',
      bgIcon: 'bg-yellow-500/10',
      btn: 'bg-yellow-500 text-black hover:bg-yellow-400'
    }
  };

  const currentConfig = config[type] || config.success;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className={`bg-[#1E1E1E] border ${currentConfig.color} p-6 rounded-2xl w-full max-w-xs flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out`}>
        <div className={`w-16 h-16 ${currentConfig.bgIcon} rounded-full flex items-center justify-center mb-4`}>
          {currentConfig.icon}
        </div>
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{message}</p>
        
        <div className="flex gap-3 w-full">
          {type === 'confirm' && (
            <button 
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gray-700 text-white font-bold hover:bg-gray-600 transition-all"
            >
              Cancelar
            </button>
          )}
          <button 
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className={`flex-1 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${currentConfig.btn}`}
          >
            {type === 'confirm' ? 'Sim, confirmar' : 'Entendido'}
          </button>
        </div>
      </div>
    </div>
  );
};

const UserAvatar = ({ user, size = "w-10 h-10", textSize = "text-xs", showBorder = true }) => {
  const borderClass = showBorder ? "border-2 border-cashGreen" : "";
  if (user.avatar) {
    return <img src={user.avatar} alt="Profile" className={`${size} rounded-full object-cover ${borderClass} shadow-lg bg-gray-800`} />;
  }
  return (
    <div className={`${size} rounded-full bg-gray-700 ${borderClass} flex items-center justify-center text-white font-bold ${textSize} shadow-lg`}>
       {user.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
    </div>
  );
};

const InputGroup = ({ label, type = 'text', placeholder, isPassword = false, darkTheme = false, value, onChange, name, required = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      {label && <label className="text-gray-300 font-bold text-xs ml-1 tracking-wide">{label}</label>}
      <div className="relative">
        <input
          type={isPassword && !showPassword ? 'password' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
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
      ${variant === 'primary' 
        ? 'btn-liquid'
        : 'bg-[#2C2C2C] text-cashGreen border border-cashGreen hover:bg-opacity-80 hover:shadow-[0_0_15px_rgba(0,200,83,0.2)]'}`}
  >
    {label}
    {icon}
  </button>
);

/* ------------------- GRÁFICO (COM ANEL GIRATÓRIO) ------------------- */

const ExpensePieChart = ({ transactions, period }) => {
  const filteredTransactions = transactions.filter(t => {
    if (t.type !== 'expense') return false; 
    const tDate = parseDate(t.date);
    const now = new Date();
    if (period === 'semana') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return tDate >= oneWeekAgo && tDate <= now;
    } else if (period === 'mes') {
      return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
    } else if (period === 'ano') {
      return tDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const totalsByCategory = {};
  let totalExpense = 0;

  filteredTransactions.forEach(t => {
    const cat = t.category || 'Outros';
    const val = parseFloat(t.value);
    totalsByCategory[cat] = (totalsByCategory[cat] || 0) + val;
    totalExpense += val;
  });

  let gradientString = '';
  let currentDeg = 0;
  const legendData = [];

  if (totalExpense === 0) {
    gradientString = '#2C2C2C 0deg 360deg';
  } else {
    Object.keys(totalsByCategory).forEach((cat) => {
      const percent = totalsByCategory[cat] / totalExpense;
      const deg = percent * 360;
      const color = CATEGORIES[cat] ? CATEGORIES[cat].color : CATEGORIES['Outros'].color;
      gradientString += `${color} ${currentDeg}deg ${currentDeg + deg}deg, `;
      currentDeg += deg;
      legendData.push({ label: cat, value: totalsByCategory[cat], color: color, percent: (percent * 100).toFixed(0) });
    });
    gradientString = gradientString.slice(0, -2);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-6 md:gap-12 animate-in fade-in duration-700">
      <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full shadow-2xl flex-shrink-0 transition-all duration-500 chart-sliver-ring"
           style={{ background: `conic-gradient(${gradientString})` }}>
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
          <div key={idx} className="flex items-center justify-between gap-4 text-xs md:text-sm animate-in slide-in-from-right-4 fade-in duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-300 truncate max-w-[80px]">{item.label}</span>
             </div>
             <div className="flex gap-2">
               <span className="text-white font-bold">R$ {item.value}</span>
               <span className="text-gray-500 w-7 text-right">{item.percent}%</span>
             </div>
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
    { id: 'createGoal', icon: <Plus size={24} />, label: '', isFloat: true },
    { id: 'planejamento', icon: <BarChart3 size={20} />, label: 'Plan.' },
    { id: 'perfil', icon: <User size={20} />, label: 'Perfil' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#1E1E1E] border-t border-gray-800 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            item.isFloat 
              ? 'bg-cashGreen text-white p-3 rounded-full -mt-8 shadow-neo-green border-4 border-[#0a0a0a] active:scale-90' 
              : activeTab === item.id ? 'text-cashGreen scale-110' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {item.icon}
          {!item.isFloat && <span className="text-[10px] font-medium">{item.label}</span>}
        </button>
      ))}
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, onLogout, user, transactions = [] }) => {
  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + parseFloat(curr.value), 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + parseFloat(curr.value), 0);
  const balance = income - expense;

  const navItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Visão Geral' },
    { id: 'transacoes', icon: <ArrowLeftRight size={20} />, label: 'Transações' },
    { id: 'planejamento', icon: <BarChart3 size={20} />, label: 'Planejamento' },
    { id: 'createGoal', icon: <Plus size={20} />, label: 'Criar Meta' },
    { id: 'perfil', icon: <User size={20} />, label: 'Meu Perfil' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-[#0F0F0F] border-r border-gray-800 p-6 fixed left-0 top-0">
      <div className="mb-10 pl-2">
        <Logo small />
      </div>
      <div className="mb-8 flex items-center gap-3 px-2 animate-in fade-in slide-in-from-left-4 duration-700">
         <UserAvatar user={user} size="w-10 h-10" />
         <div className="overflow-hidden">
            <p className="text-white text-sm font-bold truncate">{user.name}</p>
            <p className="text-gray-500 text-xs truncate">
              Saldo: {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
         </div>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
              activeTab === item.id 
                ? 'bg-cashGreen/10 text-cashGreen font-bold translate-x-2' 
                : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white hover:translate-x-1'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/10 rounded-xl text-sm font-bold mt-auto transition-colors">
        <LogOut size={20} />
        Sair
      </button>
    </div>
  );
};

/* ------------------- TELAS ------------------- */

const DashboardScreen = ({ user, transactions }) => {
  const [chartPeriod, setChartPeriod] = useState('mes');
  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + parseFloat(curr.value), 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + parseFloat(curr.value), 0);
  const balance = income - expense;

  return (
    <div className="pb-24 md:pb-0">
      {/* Header Mobile (com classe card-gradient-animate aplicada) */}
      <div className="md:hidden card-gradient-animate p-6 rounded-b-3xl shadow-lg mb-6 animate-in slide-in-from-top-10 duration-500">
         <div className="flex items-center gap-3 mb-6">
            <UserAvatar user={user} size="w-12 h-12" textSize="text-lg" />
            <div>
              <p className="text-gray-400 text-[10px]">Olá,</p>
              <p className="text-white text-sm font-bold">{user.name}</p>
            </div>
         </div>
         <div className="text-center mb-6">
            <p className="text-gray-400 text-xs mb-1">Saldo geral</p>
            <h2 className="text-3xl font-bold text-white">
              {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h2>
         </div>
      </div>

      <div className="hidden md:flex justify-between items-end mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Visão Geral</h1>
          <p className="text-gray-400 text-sm">Bem-vindo de volta, {user.name}!</p>
        </div>
        <div className="flex items-center gap-3 bg-[#1E1E1E] px-4 py-2 rounded-full border border-gray-800">
           <UserAvatar user={user} size="w-8 h-8" showBorder={false} />
           <span className="text-white text-sm font-medium pr-2">{user.email}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-0">
        
        {/* CARD SALDO DESKTOP (com classe card-gradient-animate aplicada) */}
        <div className="hidden md:flex flex-col justify-between card-gradient-animate p-6 rounded-2xl border border-gray-800 shadow-lg col-span-3 lg:col-span-1 h-64 relative overflow-hidden animate-in zoom-in-95 duration-500 delay-100">
           <div className="relative z-10">
              <p className="text-gray-400 text-sm mb-1">Saldo Disponível</p>
              <h2 className="text-4xl font-bold text-white">
                {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </h2>
           </div>
           <div className="flex gap-3 relative z-10">
              <div className="flex items-center gap-2 text-green-400 text-xs font-bold bg-black/30 px-3 py-1 rounded-lg">
                 <TrendingUp size={14}/> {income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-black/30 px-3 py-1 rounded-lg">
                 <TrendingDown size={14}/> {expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
           </div>
           <div className="absolute -right-5 -bottom-10 w-32 h-32 bg-cashGreen opacity-10 rounded-full blur-2xl"></div>
        </div>

        <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 md:col-span-2 h-auto md:h-64 flex flex-col animate-in zoom-in-95 duration-500 delay-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">Resumo de Gastos</span>
            <div className="flex bg-[#0a0a0a] rounded-lg p-1">
              {['semana', 'mes', 'ano'].map((period) => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className={`px-3 py-1 text-[10px] uppercase font-bold rounded-md transition-all duration-300 ${
                    chartPeriod === period ? 'bg-cashGreen text-black shadow-md' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full flex items-center justify-center">
             <ExpensePieChart transactions={transactions} period={chartPeriod} />
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 animate-in slide-in-from-bottom-8 duration-500 delay-300">
           <h3 className="text-gray-400 text-sm mb-4 px-1">Últimas movimentações</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transactions.length === 0 ? (
                 <div className="col-span-full p-8 text-center border border-dashed border-gray-700 rounded-2xl text-gray-500">
                    Nenhuma movimentação registrada.
                 </div>
              ) : (
                transactions.slice(0, 6).map((t) => (
                  <div key={t.id} className="bg-[#1E1E1E] p-4 rounded-2xl flex items-center justify-between border border-gray-800 hover:border-gray-600 transition-all hover:scale-[1.02] cursor-default">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                        ${t.type === 'expense' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                        {t.type === 'expense' ? <TrendingDown size={18}/> : <TrendingUp size={18}/>}
                      </div>
                      <div>
                        <p className="text-white text-sm font-bold">{t.name}</p>
                        <p className="text-gray-500 text-[10px]">{t.category || 'Geral'} • {t.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${t.type === 'expense' ? 'text-white' : 'text-cashGreen'}`}>
                      {t.type === 'expense' ? '- ' : '+ '}
                      R$ {parseFloat(t.value).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

const TransactionScreen = ({ transactions, onAddTransaction, onDeleteTransaction }) => {
  const [showForm, setShowForm] = useState(false);
  const [newTrans, setNewTrans] = useState({ name: '', value: '', type: 'expense', category: 'Outros' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newTrans.name || !newTrans.value) return;
    onAddTransaction({ ...newTrans, date: new Date().toLocaleDateString('pt-BR') });
    setNewTrans({ name: '', value: '', type: 'expense', category: 'Outros' });
    setShowForm(false);
  };

  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center justify-between mb-6 px-6 md:px-0 pt-6 md:pt-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Todas as Transações</h2>
          <button onClick={() => setShowForm(!showForm)} className="bg-cashGreen hover:bg-green-400 text-black px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm transition-all hover:scale-105 active:scale-95">
            {showForm ? <X size={18}/> : <Plus size={18}/>}
            <span className="hidden md:inline">{showForm ? 'Cancelar' : 'Nova Transação'}</span>
          </button>
       </div>

       {showForm && (
         <div className="px-6 md:px-0 mb-6 animate-in slide-in-from-top-10 fade-in duration-300">
           <form onSubmit={handleSubmit} className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-700 max-w-2xl">
              <h3 className="text-white font-bold mb-4">Adicionar Movimentação</h3>
              <div className="flex gap-2 mb-4">
                <button type="button" onClick={() => setNewTrans({...newTrans, type: 'expense'})} 
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${newTrans.type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
                  Despesa
                </button>
                <button type="button" onClick={() => setNewTrans({...newTrans, type: 'income'})} 
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${newTrans.type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
                  Receita
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup darkTheme placeholder="Descrição (ex: Mercado)" value={newTrans.name} onChange={e => setNewTrans({...newTrans, name: e.target.value})} />
                <InputGroup darkTheme placeholder="Valor (ex: 150.00)" type="number" value={newTrans.value} onChange={e => setNewTrans({...newTrans, value: e.target.value})} />
                {newTrans.type === 'expense' && (
                  <div className="md:col-span-2 flex flex-col gap-2 animate-in fade-in duration-300">
                     <label className="text-gray-300 font-bold text-xs ml-1">Categoria</label>
                     <div className="flex flex-wrap gap-2">
                        {Object.keys(CATEGORIES).map(cat => (
                           <button 
                             key={cat} type="button" onClick={() => setNewTrans({...newTrans, category: cat})}
                             className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                               newTrans.category === cat ? 'border-transparent text-black' : 'border-gray-700 text-gray-400 hover:border-gray-500'
                             }`}
                             style={{ backgroundColor: newTrans.category === cat ? CATEGORIES[cat].color : 'transparent' }}
                           >
                             {cat}
                           </button>
                        ))}
                     </div>
                  </div>
                )}
                <div className="mt-4 md:col-span-2">
                   <PrimaryButton label="Confirmar" onClick={handleSubmit} />
                </div>
              </div>
           </form>
         </div>
       )}

       <div className="flex-1 overflow-y-auto px-6 md:px-0 pb-24 md:pb-0">
          <div className="grid grid-cols-1 gap-3">
             {transactions.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-20 text-gray-600 animate-in fade-in duration-700">
                   <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 opacity-50">
                      <ArrowLeftRight size={30} />
                   </div>
                   <p>Nenhuma transação encontrada.</p>
                </div>
             )}
             {transactions.map((t, idx) => (
                <div key={t.id} className="flex justify-between items-center p-4 bg-[#1E1E1E] hover:bg-[#252525] rounded-xl border border-gray-800 transition-all hover:scale-[1.01] animate-in slide-in-from-bottom-4 fade-in duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                   <div className="flex items-center gap-4">
                      <div className={`w-2 h-10 rounded-full ${t.type === 'income' ? 'bg-cashGreen' : 'bg-red-500'}`}></div>
                      <div>
                        <p className="text-white text-sm font-bold">{t.name}</p>
                        <p className="text-gray-500 text-xs">{t.date} {t.type === 'expense' && `• ${t.category || 'Outros'}`}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className={`font-bold text-sm ${t.type === 'income' ? 'text-cashGreen' : 'text-white'}`}>
                       {t.type === 'expense' ? '-' : '+'} R$ {parseFloat(t.value).toFixed(2)}
                     </span>
                     <button onClick={() => onDeleteTransaction(t.id)} className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={18}/></button>
                   </div>
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

   const handleCreate = () => {
      if(!newGoal.description || !newGoal.total) return;
      onAddGoal(newGoal);
      setNewGoal({ description: '', total: '', current: '0' });
      setIsCreating(false);
   };

   const confirmDeposit = () => {
      if(!depositValue || parseFloat(depositValue) <= 0) return;
      onDepositToGoal(depositModal.goalId, depositValue);
      setDepositModal({ isOpen: false, goalId: null });
      setDepositValue('');
   };

   const handleSaveEdit = () => {
      if (!editModal.goal.description || !editModal.goal.total) return;
      onEditGoal(editModal.goal);
      setEditModal({ isOpen: false, goal: null });
   };

   const handleDeleteFromModal = () => {
      showAlert(
        'Excluir Meta?', 
        `Tem certeza que deseja excluir a meta "${editModal.goal.description}"? O valor guardado será perdido.`, 
        'confirm', 
        () => {
           onDeleteGoal(editModal.goal.id);
           setEditModal({ isOpen: false, goal: null });
        }
      );
   };

   return (
      <div className="px-6 md:px-0 pt-8 md:pt-0 pb-24 md:pb-0 h-full overflow-y-auto relative">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Planejamento Financeiro</h2>
            <PrimaryButton 
               label={isCreating ? "Cancelar" : "Nova Meta"} 
               icon={isCreating ? <X size={18}/> : <Plus size={18}/>} 
               onClick={() => setIsCreating(!isCreating)} 
               fullWidth={false}
            />
         </div>

         {depositModal.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
               <div className="bg-[#1E1E1E] p-6 rounded-2xl w-full max-w-sm border border-gray-700 animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
                  <h3 className="text-white font-bold text-lg mb-4">Guardar dinheiro</h3>
                  <p className="text-gray-400 text-sm mb-4">Quanto deseja adicionar a esta meta?</p>
                  <InputGroup placeholder="Valor (ex: 50.00)" type="number" darkTheme value={depositValue} onChange={(e) => setDepositValue(e.target.value)} />
                  <div className="flex gap-3 mt-4">
                     <button onClick={() => setDepositModal({ isOpen: false, goalId: null })} className="flex-1 py-3 rounded-full text-gray-400 font-bold hover:bg-gray-800">Cancelar</button>
                     <button onClick={confirmDeposit} className="flex-1 py-3 rounded-full bg-cashGreen text-black font-bold hover:bg-green-400">Confirmar</button>
                  </div>
               </div>
            </div>
         )}

         {editModal.isOpen && editModal.goal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
               <div className="bg-[#1E1E1E] p-6 rounded-2xl w-full max-w-sm border border-gray-700 animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-white font-bold text-lg">Editar Meta</h3>
                     <button onClick={() => setEditModal({ isOpen: false, goal: null })} className="text-gray-400 hover:text-white"><X size={20} /></button>
                  </div>
                  <InputGroup label="Nome da Meta" darkTheme value={editModal.goal.description} onChange={(e) => setEditModal({...editModal, goal: { ...editModal.goal, description: e.target.value }})} />
                  <InputGroup label="Valor Total (R$)" type="number" darkTheme value={editModal.goal.total} onChange={(e) => setEditModal({...editModal, goal: { ...editModal.goal, total: e.target.value }})} />
                  <div className="flex flex-col gap-3 mt-6">
                     <PrimaryButton label="Salvar Alterações" onClick={handleSaveEdit} />
                     <button onClick={handleDeleteFromModal} className="w-full py-3 rounded-full bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 border border-red-500/30">
                        <Trash2 size={18} /> Excluir Meta
                     </button>
                  </div>
               </div>
            </div>
         )}

         {isCreating && (
            <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 mb-8 max-w-2xl animate-in slide-in-from-top-8 fade-in duration-300">
               <h3 className="text-white font-bold mb-4">Definir nova meta</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                     <InputGroup label="Nome da Meta" placeholder="Ex: Computador Novo" darkTheme value={newGoal.description} onChange={e => setNewGoal({...newGoal, description: e.target.value})} />
                  </div>
                  <InputGroup label="Valor Total (R$)" placeholder="Ex: 5000" type="number" darkTheme value={newGoal.total} onChange={e => setNewGoal({...newGoal, total: e.target.value})} />
                  <InputGroup label="Valor Inicial (R$)" placeholder="Ex: 0" type="number" darkTheme value={newGoal.current} onChange={e => setNewGoal({...newGoal, current: e.target.value})} />
               </div>
               <div className="mt-4 flex justify-end">
                  <div className="w-full md:w-auto">
                     <PrimaryButton label="Salvar Meta" onClick={handleCreate} fullWidth={false} />
                  </div>
               </div>
            </div>
         )}

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.length === 0 && !isCreating && (
               <div className="col-span-full text-center py-20 text-gray-600 border-2 border-dashed border-gray-800 rounded-2xl animate-in fade-in duration-700">
                  <p>Você ainda não criou nenhuma meta.</p>
               </div>
            )}
            {goals.map((goal, idx) => {
               const current = parseFloat(goal.current || 0);
               const total = parseFloat(goal.total || 1);
               const percent = Math.min((current / total) * 100, 100);
               return (
                  <div key={goal.id} className="bg-[#1E1E1E] p-5 rounded-2xl border border-gray-800 relative group hover:border-cashGreen/50 transition-all hover:scale-[1.02] animate-in slide-in-from-bottom-4 fade-in duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                     <div className="flex justify-between mb-2 items-start">
                        <span className="text-white font-bold text-lg">{goal.description}</span>
                        <div className="flex gap-2">
                           <button onClick={() => setDepositModal({ isOpen: true, goalId: goal.id })} className="text-cashGreen bg-cashGreen/10 p-2 rounded-lg hover:bg-cashGreen hover:text-black transition-colors" title="Guardar dinheiro">
                              <PiggyBank size={18}/>
                           </button>
                           <button onClick={() => setEditModal({ isOpen: true, goal: goal })} className="text-gray-400 bg-gray-800 p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors" title="Editar Meta">
                              <Edit2 size={18} />
                           </button>
                        </div>
                     </div>
                     <div className="flex justify-between mb-3 text-sm text-gray-400 font-medium">
                        <span>{percent.toFixed(0)}%</span>
                        <span>R$ {current} / R$ {total}</span>
                     </div>
                     <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cashGreen transition-all duration-1000 ease-out" style={{ width: `${percent}%` }}></div>
                     </div>
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
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData({ ...formData, avatar: null });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateUser(formData);
    showAlert('Sucesso!', 'Seu perfil foi atualizado com sucesso.', 'success');
  };

  return (
    <div className="px-6 md:px-0 pt-10 md:pt-0 pb-24 md:pb-0 max-w-2xl mx-auto md:mx-0">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Configurações de Perfil</h2>
      <div className="bg-[#1E1E1E] p-8 rounded-2xl border border-gray-800 animate-in fade-in zoom-in-95 duration-500">
         <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative group">
               <UserAvatar user={formData} size="w-32 h-32" textSize="text-4xl" />
               <button onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-cashGreen text-black p-2 rounded-full border-4 border-[#1E1E1E] hover:bg-green-400 transition-colors">
                 <Camera size={20} />
               </button>
               <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>
            <div className="text-center md:text-left flex-1">
               <h3 className="text-white font-bold text-xl">{formData.name || "Usuário"}</h3>
               <p className="text-gray-500 mb-4">{formData.email}</p>
               {formData.avatar && (
                 <button onClick={handleRemovePhoto} className="text-red-400 text-xs font-bold hover:underline flex items-center gap-1 mx-auto md:mx-0">
                   <Trash2 size={12} /> Remover foto
                 </button>
               )}
            </div>
         </div>
         <form className="flex flex-col gap-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InputGroup label="Nome Completo" placeholder="Seu nome" darkTheme value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
               <InputGroup label="Email" placeholder="email@exemplo.com" type="email" darkTheme value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="mt-4 md:w-1/3">
               <PrimaryButton label="Salvar Alterações" icon={<Check size={18} />} type="submit" />
            </div>
         </form>
      </div>
    </div>
  );
};

/* ------------------- APP PRINCIPAL ------------------- */

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRegister, setIsRegister] = useState(false);
  const [authData, setAuthData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  // ESTADO GLOBAL DO POPUP
  const [popupConfig, setPopupConfig] = useState({ 
    isOpen: false, 
    type: 'success', 
    title: '', 
    message: '', 
    onConfirm: null 
  });

  const showAlert = (title, message, type = 'success', onConfirm = null) => {
    setPopupConfig({ isOpen: true, title, message, type, onConfirm });
  };

  const closeAlert = () => {
    setPopupConfig({ ...popupConfig, isOpen: false });
  };

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cashplus_user');
    return saved ? JSON.parse(saved) : { name: '', email: '', avatar: null };
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('cashplus_transactions');
    return saved ? JSON.parse(saved) : []; 
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('cashplus_goals');
    return saved ? JSON.parse(saved) : []; 
  });

  useEffect(() => { localStorage.setItem('cashplus_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('cashplus_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('cashplus_goals', JSON.stringify(goals)); }, [goals]);

  const handleAddTransaction = (t) => setTransactions([{ ...t, id: Date.now() }, ...transactions]);
  const handleDeleteTransaction = (id) => setTransactions(transactions.filter(t => t.id !== id));
  const handleAddGoal = (g) => setGoals([...goals, { ...g, id: Date.now() }]);
  const handleDeleteGoal = (id) => setGoals(goals.filter(g => g.id !== id));

  const handleEditGoal = (updatedGoal) => {
     const newGoals = goals.map(g => g.id === updatedGoal.id ? updatedGoal : g);
     setGoals(newGoals);
  };

  const handleDepositToGoal = (goalId, amount) => {
     const val = parseFloat(amount);
     const updatedGoals = goals.map(g => {
        if(g.id === goalId) {
           return { ...g, current: (parseFloat(g.current) + val).toString() };
        }
        return g;
     });
     setGoals(updatedGoals);
     const targetGoal = goals.find(g => g.id === goalId);
     const newTransaction = {
        id: Date.now(),
        name: `Guardado: ${targetGoal.description}`,
        value: val,
        type: 'expense',
        category: 'Metas',
        date: new Date().toLocaleDateString('pt-BR')
     };
     setTransactions([newTransaction, ...transactions]);
  };

  const handleAuth = () => {
     if(authData.email) {
        const domain = authData.email.split('@')[1];
        if(!domain || !ALLOWED_EMAIL_DOMAINS.includes(domain)) {
           showAlert('Email inválido', `O domínio @${domain} não é permitido.`, 'error');
           return;
        }
     }

     if (isRegister) {
       if (authData.password !== authData.confirmPassword) {
         showAlert('Erro', 'As senhas não coincidem!', 'error');
         return;
       }
       if (!authData.name) {
         showAlert('Atenção', 'Por favor, digite seu nome.', 'error');
         return;
       }
       setUser({ ...user, name: authData.name, email: authData.email });
     } else {
       if(!user.name) setUser({ ...user, name: 'Usuário', email: authData.email || 'usuario@email.com' });
     }
     setCurrentScreen('app');
  };

  const handleLogout = () => {
     setCurrentScreen('login');
     setIsRegister(false);
     setAuthData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const renderContent = () => {
    return (
      <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out">
        {(() => {
          switch(activeTab) {
             case 'dashboard': return <DashboardScreen user={user} transactions={transactions} />;
             case 'perfil': return <ProfileScreen user={user} onUpdateUser={setUser} showAlert={showAlert} />;
             case 'transacoes': return <TransactionScreen transactions={transactions} onAddTransaction={handleAddTransaction} onDeleteTransaction={handleDeleteTransaction} />;
             case 'createGoal': 
             case 'planejamento': 
                return <PlanningScreen goals={goals} onAddGoal={handleAddGoal} onDeleteGoal={handleDeleteGoal} onDepositToGoal={handleDepositToGoal} onEditGoal={handleEditGoal} showAlert={showAlert} />;
             default: return <DashboardScreen user={user} transactions={transactions} />;
          }
        })()}
      </div>
    );
  };

  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen w-full bg-gradient-app flex items-center justify-center p-6">
        <SystemPopup isOpen={popupConfig.isOpen} onClose={closeAlert} type={popupConfig.type} title={popupConfig.title} message={popupConfig.message} />

        <div className="w-full max-w-md transition-all duration-500">
           <Logo />
           <div key={isRegister ? 'register' : 'login'} className="animate-in fade-in slide-in-from-right-8 duration-500">
             <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }} className="flex flex-col px-4">
               <h2 className="text-white text-2xl font-bold mb-6 text-center">
                 {isRegister ? 'Crie sua conta' : 'Acesse sua conta'}
               </h2>
               {isRegister && (
                  <InputGroup label="Nome Completo" placeholder="Seu nome" value={authData.name} onChange={(e) => setAuthData({...authData, name: e.target.value})} />
               )}
               <InputGroup label="Email" placeholder="seu@email.com" type="email" value={authData.email} onChange={(e) => setAuthData({...authData, email: e.target.value})} />
               <InputGroup label="Senha" placeholder="********" isPassword value={authData.password} onChange={(e) => setAuthData({...authData, password: e.target.value})} />
               {isRegister && (
                  <InputGroup label="Confirmar Senha" placeholder="********" isPassword value={authData.confirmPassword} onChange={(e) => setAuthData({...authData, confirmPassword: e.target.value})} />
               )}
               <div className="flex flex-col gap-4 mt-6">
                 <PrimaryButton label={isRegister ? "Cadastrar" : "Entrar"} icon={isRegister ? <UserPlus size={20} /> : <ArrowRight size={20} />} type="submit" />
                 <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-cashGreen font-bold text-sm hover:text-green-400 transition-colors mt-2">
                   {isRegister ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}
                 </button>
               </div>
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