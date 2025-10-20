import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "./database.json";

function readDB() {
    try {
        // Tenta ler o arquivo
        return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    } catch (error) {
        // Se o arquivo não existir ou for inválido, retorna uma estrutura inicial
        console.error("Erro ao ler database.json. Iniciando com estrutura vazia.");
        return { 
            usuarios: [], 
            termos: [{ id: 1, titulo: "Termos de Uso", conteudo: "Termos iniciais." }], 
            admin: [{ id: 1, usuario: "admin", senha: "1234" }],
            categorias: []
        };
    }
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ----------------------------------------------------
// ROTAS DE LEITURA (NECESSÁRIAS PARA O LOGIN DO FRONTEND)
// ----------------------------------------------------

// Rota para ler todos os usuários (Login de Usuário)
app.get("/usuarios", (req, res) => {
    const db = readDB();
    // Em um cenário real, você filtraria senhas antes de enviar
    res.json(db.usuarios);
});

// Rota para ler os dados de admin (Login de Admin)
app.get("/admin", (req, res) => {
    const db = readDB();
    // O frontend só precisa das credenciais para checar o login
    res.json(db.admin);
});


// ----------------------------------------------------
// ROTAS DE NEGÓCIO ORIGINAIS
// ----------------------------------------------------

// Cadastro de usuário
app.post("/api/cadastrar", (req, res) => {
    const { telefone, email, senha } = req.body;
    if (!telefone || !email || !senha)
        return res.status(400).json({ error: "Campos obrigatórios faltando" });

    const db = readDB();
    db.usuarios.push({ telefone, email, senha });
    writeDB(db);
    res.json({ message: "Usuário cadastrado com sucesso!" });
});

// Visualizar termos
app.get("/api/termos", (req, res) => {
    res.json({
        termos: "Ao criar sua conta, você concorda com os Termos de Uso e a Política de Privacidade do Cash+."
    });
});

// Gerenciar categorias (admin)
app.get("/api/admin/categorias", (req, res) => {
    const db = readDB();
    res.json(db.categorias);
});

app.post("/api/admin/categorias", (req, res) => {
    const { nome, tipo } = req.body; // tipo: 'receita' ou 'despesa'
    if (!nome || !tipo) return res.status(400).json({ error: "Dados inválidos" });
    const db = readDB();
    db.categorias.push({ nome, tipo });
    writeDB(db);
    res.json({ message: "Categoria adicionada!" });
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));

