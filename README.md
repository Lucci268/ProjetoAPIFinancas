# Projeto API de Finanças

Este repositório contém o código-fonte da API para um sistema de finanças pessoais. O objetivo é criar uma aplicação robusta que permita a usuários controlar suas finanças, registrar transações, criar metas e gerar relatórios, enquanto administradores mantêm o sistema organizado e monitoram o uso da plataforma.

## 📌 Quadro Kanban (Trello)

O andamento do projeto está sendo acompanhado no Trello.  

<div align="center">
  <<div align="center">
  <img width="1480" height="568" alt="image" src="https://github.com/user-attachments/assets/791c3b18-0e83-4a20-83f7-1ed536fe39f8" />

</div>>

</div>

## 📝 Descrição do Projeto

A API serve como backend de uma aplicação de finanças pessoais. Usuários podem registrar receitas e despesas, organizar suas movimentações por categorias, acompanhar metas de economia e visualizar relatórios financeiros. Administradores gerenciam categorias, configuram limites, acompanham estatísticas e garantem a integridade dos dados. O projeto segue metodologia ágil, com histórias de usuário organizadas em um quadro Kanban.

## ✨ Funcionalidades (Histórias de Usuário)

### Para Usuários
- **Cadastro:** Registrar-se utilizando e-mail, senha e número de telefone. (Sprint 1)
- **Visualizar Contas:** Consultar todas as contas e saldos. (Sprint 1)
- **Registrar Transações:** Inserir receitas e despesas. (Sprint 2)
- **Categorias:** Categorizar movimentações para melhor organização. (Sprint 2)
- **Filtros:** Filtrar movimentações por data, categoria ou valor. (Sprint 3)
- **Relatórios:** Visualizar gráficos e relatórios de receitas e despesas. (Sprint 4)
- **Metas de Economia:** Criar metas financeiras e acompanhar o progresso. (Sprint 3 & 4)
- **Alertas:** Receber notificações de gastos acima do planejado. (Sprint 5)
- **Recomendações:** Receber sugestões de economia baseadas nos gastos. (Sprint 5)
- **Termos de Uso:** Visualizar termos do sistema antes do cadastro. (Sprint 1)

### Para Administradores
- **Gerenciamento de Categorias:** Criar, atualizar e excluir categorias de receitas e despesas. (Sprint 1)
- **Relatórios Agregados:** Visualizar relatórios consolidados de todas as transações. (Sprint 2)
- **Limites de Transações:** Configurar limites por categoria para prevenir abusos. (Sprint 2)
- **Validação de Dados:** Gerenciar regras para garantir consistência das transações. (Sprint 2)
- **Estatísticas de Uso:** Acompanhar crescimento de usuários e atividades. (Sprint 3)

## 🛠️ Estrutura da API (Endpoints)

| Método | Rota                     | Descrição                                        | Responsável(eis)         |
| :----- | :----------------------- | :-----------------------------------------------| :----------------------- |
| `POST` | `/users`                 | Cadastra um novo usuário.                        | Lucciano                 |
| `GET`  | `/users/:id/accounts`     | Lista contas e saldos de um usuário.            | Júlio                    |
| `POST` | `/transactions`          | Registra uma nova transação (receita ou despesa)| Felipe                   |
| `GET`  | `/transactions`          | Lista todas as transações filtradas por critérios| Artur                   |
| `POST` | `/categories`            | Cadastra categorias de receita/despesa          | Davi                     |
| `GET`  | `/reports`               | Gera relatórios financeiros agregados           | Daniel                   |
| `PATCH`| `/limits/:categoryId`    | Configura limites de transações por categoria   | Lucciano                 |
| `GET`  | `/statistics`            | Consulta estatísticas gerais do sistema         | Júlio                    |

### Banco de Dados
- **Modelo e Conexão:** Criação do modelo de dados e conexão com o banco de dados: **Daniel**.

## 👥 Equipe do Projeto

- Artur Lima Pinto Bacalhau – Endpoints de transações e filtros.  
- Daniel Silva Costa – Modelagem e conexão do banco de dados, relatórios.  
- Davi Magalhães Mendes – Categorias de receitas e despesas.  
- Felipe Assis Ferreira dos Santos – Registro de transações.  
- Júlio César Bizarria Lins – Visualização de contas, relatórios e estatísticas.  
- Lucciano Henrique Pereira Cordeiro – Cadastro de usuários e configuração de limites.  

## 📊 Status do Projeto

O projeto encontra-se em fase de desenvolvimento. As tarefas estão sendo distribuídas e executadas conforme o planejamento inicial, visualizável no quadro do Trello. O foco atual está na construção das rotas essenciais da API, registro de transações e modelagem do banco de dados.
