const api = "http://localhost:3000";

async function cadastrarUsuario(event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  await fetch(`${api}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha })
  });
  alert("Usuário cadastrado com sucesso!");
}

async function carregarTermos() {
  const resposta = await fetch(`${api}/termos`);
  const termos = await resposta.json();
  document.getElementById("conteudo-termos").innerText = termos[0].conteudo;
}

async function loginAdmin(event) {
  event.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  const resposta = await fetch(`${api}/admin`);
  const admins = await resposta.json();

  const encontrado = admins.find(a => a.usuario === usuario && a.senha === senha);
  if (encontrado) {
    alert("Login de administrador bem-sucedido!");
    window.location.href = "admin.html";
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

