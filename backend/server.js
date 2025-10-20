import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "./database.json";

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

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

// Visualizar termos (simples)
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

