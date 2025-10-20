const api = "http://localhost:3000";

// --- FUNÇÕES DE LÓGICA DE NEGÓCIO ---

// 1. Lógica de Cadastro
async function cadastrarUsuario(event) {
    event.preventDefault();
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const res = await fetch(`${api}/api/cadastrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefone, email, senha })
    });
    
    if (res.ok) {
        alert("Usuário cadastrado com sucesso! Faça login para continuar.");
        document.getElementById("cadastroForm").reset();
        // Alternar para a tela de Login
        showForm('loginForm'); 
    } else {
        const erro = await res.json();
        alert("Erro no cadastro: " + erro.error);
    }
}

// 2. Lógica de Login de Usuário
async function loginUsuario(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    // Busca todos os usuários no database.json (se estiver usando JSON Server, use /usuarios)
    // Se estiver usando o Express, esta rota precisaria ser implementada no server.js
    const resposta = await fetch(`${api}/usuarios`); 
    const usuarios = await resposta.json();

    const encontrado = usuarios.find(u => u.email === email && u.senha === senha);

    if (encontrado) {
        alert("Login de usuário bem-sucedido! Bem-vindo(a)!");
        // Redireciona para a página principal do usuário (ex: dashboard.html)
        window.location.href = "dashboard.html"; 
    } else {
        alert("Email ou senha de usuário incorretos.");
    }
}

// 3. Lógica de Login de Administrador
async function loginAdmin(event) {
    event.preventDefault();
    const usuario = document.getElementById("usuarioAdmin").value;
    const senha = document.getElementById("senhaAdmin").value;

    // Busca dados do Admin no database.json (http://localhost:3000/admin)
    const resposta = await fetch(`${api}/admin`); 
    const admins = await resposta.json();

    const encontrado = admins.find(a => a.usuario === usuario && a.senha === senha);
    if (encontrado) {
        alert("Login de administrador bem-sucedido!");
        window.location.href = "admin.html";
    } else {
        alert("Usuário ou senha de administrador incorretos.");
    }
}

// 4. Lógica de Termos (chamada por termos.html)
async function carregarTermos() {
    const resposta = await fetch(`${api}/api/termos`);
    const dados = await resposta.json();
    
    const termosElement = document.getElementById("conteudo-termos");
    
    if (termosElement && dados.termos) {
        termosElement.innerText = dados.termos;
    }
}


// --- FUNÇÕES DE INTERFACE (SWITCH DE FORMS) ---

function showForm(formId) {
    // Esconde todos os formulários e desativa todos os botões
    document.querySelectorAll('#forms-container form').forEach(form => {
        form.classList.add('hidden');
    });
    document.querySelectorAll('#switch-buttons button').forEach(button => {
        button.classList.remove('active');
    });

    // Mostra o formulário desejado
    document.getElementById(formId).classList.remove('hidden');

    // Ativa o botão correspondente
    let buttonId;
    if (formId === 'cadastroForm') {
        buttonId = 'showCadastro';
    } else if (formId === 'loginForm') {
        buttonId = 'showLogin';
    } else if (formId === 'adminForm') {
        buttonId = 'showAdmin';
    }
    document.getElementById(buttonId).classList.add('active');
}


// --- INICIALIZAÇÃO E EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {
    // Associa as funções de submissão aos formulários
    document.getElementById("cadastroForm")?.addEventListener("submit", cadastrarUsuario);
    document.getElementById("loginForm")?.addEventListener("submit", loginUsuario);
    document.getElementById("adminForm")?.addEventListener("submit", loginAdmin);
    
    // Associa as funções de alternância aos botões de switch
    document.getElementById("showCadastro")?.addEventListener("click", () => showForm('cadastroForm'));
    document.getElementById("showLogin")?.addEventListener("click", () => showForm('loginForm'));
    document.getElementById("showAdmin")?.addEventListener("click", () => showForm('adminForm'));
    
    // Carrega termos, caso esteja na página termos.html
    const termosContainer = document.getElementById("conteudo-termos");
    if (termosContainer) {
        carregarTermos();
    }
});

