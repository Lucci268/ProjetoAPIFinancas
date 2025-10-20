const api = "http://localhost:3000/transacoes";
const lista = document.getElementById("lista");
const form = document.getElementById("form");
const modal = document.getElementById("modal");
const abrirModal = document.getElementById("abrirModal");
const fecharModal = document.getElementById("fecharModal");
const saldoEl = document.getElementById("saldo");
const entradasEl = document.getElementById("entradas");
const saidasEl = document.getElementById("saidas");

abrirModal.onclick = () => modal.style.display = "flex";
fecharModal.onclick = () => modal.style.display = "none";

async function carregar() {
  const res = await fetch(api);
  const dados = await res.json();
  lista.innerHTML = "";
  
  let saldo = 0, entradas = 0, saidas = 0;
  
  dados.forEach((t, i) => {
    const li = document.createElement("li");
    li.classList.add(t.valor >= 0 ? "positivo" : "negativo");
    li.innerHTML = `${t.descricao} <strong>R$ ${t.valor.toFixed(2)}</strong>`;
    const btn = document.createElement("button");
    btn.textContent = "🗑";
    btn.onclick = async () => {
      await fetch(`${api}/${i}`, { method: "DELETE" });
      carregar();
    };
    li.appendChild(btn);
    lista.appendChild(li);

    if (t.valor >= 0) entradas += t.valor;
    else saidas += t.valor;
  });

  saldo = entradas + saidas;
  saldoEl.textContent = `R$ ${saldo.toFixed(2)}`;
  entradasEl.textContent = `R$ ${entradas.toFixed(2)}`;
  saidasEl.textContent = `R$ ${Math.abs(saidas).toFixed(2)}`;
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao, valor })
  });
  form.reset();
  modal.style.display = "none";
  carregar();
};

carregar();

