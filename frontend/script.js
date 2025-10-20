const api = "http://localhost:3000/transacoes";
const form = document.getElementById("form");
const lista = document.getElementById("lista");

async function carregar() {
  const res = await fetch(api);
  const dados = await res.json();
  lista.innerHTML = "";
  dados.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = `${t.descricao} - R$ ${t.valor}`;
    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = async () => {
      await fetch(`${api}/${i}`, { method: "DELETE" });
      carregar();
    };
    li.appendChild(btn);
    lista.appendChild(li);
  });
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
  carregar();
};

carregar();
