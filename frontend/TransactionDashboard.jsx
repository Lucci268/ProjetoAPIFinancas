import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';
const CURRENT_USER_ID = 1;

const TransactionDashboard = () => {
    const [transacoes, setTransacoes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [filtros, setFiltros] = useState({
        tipo: '',
        categoriaId: '',
        dataInicio: '',
        dataFim: '',
        valorMin: '',
        valorMax: '',
    });
    
    const [formRegistro, setFormRegistro] = useState({
        valor: '',
        tipo: 'receita',
        data: new Date().toISOString().split('T')[0],
        categoriaId: '',
        descricao: '',
    });

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get(${API_BASE_URL}/categorias);
                setCategorias(response.data);
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            }
        };
        fetchCategorias();
    }, []);

    const fetchTransacoes = async (currentFiltros = filtros) => {
        const params = { userId: CURRENT_USER_ID, ...currentFiltros };
        Object.keys(params).forEach(key => (params[key] === '' || params[key] === null) && delete params[key]);

        try {
            const response = await axios.get(${API_BASE_URL}/transactions, { params });
            setTransacoes(response.data);
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
            setTransacoes([]);
        }
    };
    
    useEffect(() => {
        if (categorias.length > 0) fetchTransacoes(filtros);
    }, [categorias]);

    const handleRegistroChange = (e) => {
        setFormRegistro({...formRegistro, [e.target.name]: e.target.value});
    };

    const handleRegistroSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formRegistro,
                userId: CURRENT_USER_ID,
                valor: parseFloat(formRegistro.valor),
                categoriaId: parseInt(formRegistro.categoriaId),
            };
            
            await axios.post(${API_BASE_URL}/transactions, dataToSend);
            alert("Movimentação registrada com sucesso!");
            setFormRegistro({ valor: '', tipo: 'receita', data: new Date().toISOString().split('T')[0], categoriaId: '', descricao: '' });
            fetchTransacoes();
        } catch (error) {
            alert("Erro ao registrar: " + (error.response?.data?.error || 'Erro de conexão'));
        }
    };
    
    const handleFiltroChange = (e) => {
        setFiltros({...filtros, [e.target.name]: e.target.value});
    };

    const handleFiltroSubmit = (e) => {
        e.preventDefault();
        fetchTransacoes(filtros);
    };

    const handleLimparFiltros = () => {
        const newFiltros = { tipo: '', categoriaId: '', dataInicio: '', dataFim: '', valorMin: '', valorMax: '' };
        setFiltros(newFiltros);
        fetchTransacoes(newFiltros);
    };

    return (
        <div className="dashboard-container">
            <header>
                <h1>Bem-vindo(a) ao Cash+</h1>
                <button className="btn btn-secondary">Sair</button>
            </header>

            <section className="saldo-resumo">
                <h2>Seu Saldo Atual:</h2>
                <p className="saldo-valor">R$ 0,00</p>
            </section>

            <section className="registro-transacao">
                <h3>Registrar Nova Movimentação</h3>
                <form onSubmit={handleRegistroSubmit} className="form-movimentacao">
                    <div className="input-group">
                        <label>Valor</label>
                        <input type="number" name="valor" step="0.01" required value={formRegistro.valor} onChange={handleRegistroChange} />
                    </div>
                    <div className="input-group">
                        <label>Tipo</label>
                        <select name="tipo" required value={formRegistro.tipo} onChange={handleRegistroChange}>
                            <option value="receita">Receita (+)</option>
                            <option value="despesa">Despesa (-)</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Data</label>
                        <input type="date" name="data" required value={formRegistro.data} onChange={handleRegistroChange} />
                    </div>
                    <div className="input-group">
                        <label>Categoria (H05)</label>
                        <select name="categoriaId" required value={formRegistro.categoriaId} onChange={handleRegistroChange}>
                            <option value="">Selecione a Categoria</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nome} ({cat.tipo})</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group full-width">
                        <label>Descrição</label>
                        <input type="text" name="descricao" value={formRegistro.descricao} onChange={handleRegistroChange} />
                    </div>
                    <button type="submit" className="btn btn-primary full-width">Registrar Movimentação</button>
                </form>
            </section>

            <section className="filtros-transacao">
                <h3>Filtrar Movimentações (H07)</h3>
                <form onSubmit={handleFiltroSubmit} className="form-filtros">
                    <div className="input-group">
                        <label>Categoria</label>
                        <select name="categoriaId" value={filtros.categoriaId} onChange={handleFiltroChange}>
                            <option value="">Todas as Categorias</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nome} ({cat.tipo})</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Data Início</label>
                        <input type="date" name="dataInicio" value={filtros.dataInicio} onChange={handleFiltroChange} />
                    </div>
                    <div className="input-group">
                        <label>Data Fim</label>
                        <input type="date" name="dataFim" value={filtros.dataFim} onChange={handleFiltroChange} />
                    </div>
                    <div className="input-group">
                        <label>Valor Mínimo</label>
                        <input type="number" name="valorMin" step="0.01" value={filtros.valorMin} onChange={handleFiltroChange} />
                    </div>
                    <div className="input-group">
                        <label>Valor Máximo</label>
                        <input type="number" name="valorMax" step="0.01" value={filtros.valorMax} onChange={handleFiltroChange} />
                    </div>
                    <div className="input-group">
                        <label>Tipo</label>
                        <select name="tipo" value={filtros.tipo} onChange={handleFiltroChange}>
                            <option value="">Todas</option>
                            <option value="receita">Receitas</option>
                            <option value="despesa">Despesas</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-secondary">Aplicar Filtros</button>
                    <button type="button" className="btn btn-secondary" onClick={handleLimparFiltros}>Limpar Filtros</button>
                </form>
            </section>

            <section className="lista-transacoes">
                <h3>Últimas Movimentações</h3>
                <ul id="transacoesList">
                    {transacoes.length === 0 ? (
                        <li>Nenhuma movimentação encontrada.</li>
                    ) : (
                        transacoes.map(t => {
                            const sinal = t.tipo === 'receita' ? '+' : '-';
                            const classe = t.tipo === 'receita' ? 'receita' : 'despesa';
                            const valorFormatado = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(t.valor);
                            
                            return (
                                <li key={t.id} className={transacao ${classe}}>
                                    <span className="descricao">{t.descricao || 'Sem Descrição'}</span>
                                    <span className="categoria">{t.nomeCategoria}</span>
                                    <span className="data">{new Date(t.data).toLocaleDateString('pt-BR')}</span>
                                    <span className={valor ${classe}}>{sinal} R$ {valorFormatado}</span>
                                </li>
                            );
                        })
                    )}
                </ul>
            </section>
        </div>
    );
};

export default TransactionDashboard;