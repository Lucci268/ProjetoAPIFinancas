# Projeto API de Filmes

Este repositório contém o código-fonte da API para o projeto de software de uma biblioteca de filmes. O objetivo é criar um sistema robusto que permita a usuários e administradores gerenciar e interagir com um catálogo de filmes de forma eficiente.

## 📌 Quadro Kanban (Trello)

O andamento do projeto está sendo acompanhado no Trello.  

<div align="center">
  <img src="https://github.com/user-attachments/assets/b3f05c74-befa-4f1c-b504-9fb8af384216" width="1398" height="598" alt="Quadro Kanban" />
</div>


## 📝 Descrição do Projeto

A API foi projetada para ser o backend de uma aplicação onde os usuários podem descobrir, avaliar e organizar filmes. Administradores, por sua vez, terão ferramentas para manter o catálogo atualizado e gerenciar a base de usuários. O projeto segue uma metodologia ágil, com tarefas e histórias de usuário organizadas em um quadro Kanban.

## ✨ Funcionalidades (Histórias de Usuário)

As funcionalidades do sistema foram divididas com base nos perfis de usuário:

### Para Usuários
-   **Cadastro:** Poder se cadastrar utilizando e-mail, senha e número de telefone.
-   **Descoberta:** Saber onde os filmes disponíveis podem ser assistidos.
-   **Trailers:** Ter a opção de ver o trailer dos filmes.
-   **Filtros:** Filtrar o catálogo por gênero, ano de lançamento e classificação indicativa.
-   **Busca por Nota:** Encontrar filmes com as melhores notas da crítica.
-   **Avaliação:** Avaliar filmes e deixar comentários.
-   **Listas Pessoais:** Criar uma lista de "pretendo assistir depois".
-   **Favoritos:** Salvar filmes favoritos para acessá-los mais facilmente.
-   **Histórico:** Marcar filmes como "já assistidos".
-   **Recomendações:** Receber sugestões de filmes parecidos com os que foram favoritados ou assistidos.
-   **Termos de Uso:** Ter acesso aos termos do sistema antes de realizar o login.

### Para Administradores
-   **Gerenciamento de Catálogo:** Cadastrar novos filmes, atualizar suas informações e deletar títulos pouco acessados para otimizar o armazenamento.
-   **Gerenciamento de Usuários:** Remover usuários para liberar espaço e manter a base de dados organizada.

## 🛠️ Estrutura da API (Endpoints)

A divisão inicial das tarefas de desenvolvimento da API está organizada da seguinte forma:

| Método | Rota                  | Descrição                           | Responsável(eis)   |
| :----- | :-------------------- | :---------------------------------- | :----------------- |
| `POST` | `/items`              | Cadastra um novo filme no catálogo. | Lucciano           |
| `GET`  | `/items`              | Lista todos os filmes.              | Júlio              |
| `GET`  | `/items?genre={genero}` | Filtra filmes por gênero.           | Felipe           |
| `GET`  | `/items/:id`          | Busca um filme por seu ID.          | Artur              |
| `DELETE`| `/items/:id`          | Deleta um filme do catálogo.        | Davi               |

### Banco de Dados
-   **Modelo e Conexão:** A criação do modelo de dados e a conexão com o banco de dados estão sob a responsabilidade de **Daniel**.

## 👥 Equipe do Projeto

-   Artur Lima Pinto Bacalhau
-   Daniel Silva Costa
-   Davi Magalhães Mendes
-   Felipe Assis Ferreira dos Santos
-   Júlio César Bizarria Lins
-   Lucciano Henrique Pereira Cordeiro

## 📊 Status do Projeto

O projeto encontra-se em fase de desenvolvimento. As tarefas estão sendo distribuídas e executadas conforme o planejamento inicial, que pode ser visualizado no quadro do Trello. O foco atual está na construção das rotas essenciais da API e na modelagem do banco de dados.
