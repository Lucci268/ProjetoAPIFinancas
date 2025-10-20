import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let transacoes = [];

// Rota GET - lista transações
app.get("/transacoes", (req, res) => {
  res.json(transacoes);
});

// Rota POST - adiciona nova transação
app.post("/transacoes", (req, res) => {
  const nova = req.body;
  transacoes.push(nova);
  res.status(201).json(nova);
});

// Rota DELETE - remove uma transação pelo índice
app.delete("/transacoes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  transacoes.splice(id, 1);
  res.json({ mensagem: "Transação removida com sucesso" });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
