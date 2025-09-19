# 🚀 Projeto API de Finanças

Este repositório contém o código-fonte da API para um sistema de finanças pessoais. O objetivo é criar uma aplicação robusta que permita a usuários controlar suas finanças, registrar transações, criar metas e gerar relatórios, enquanto administradores mantêm o sistema organizado e monitoram o uso da plataforma.

---

### 1. Criação de Protótipos de Lo-Fi (Figma)
- Foram elaborados **sketches e storyboards** para representar o fluxo das histórias de usuário (**mínimo de 10 telas**).  
- Protótipo Lo-Fi disponível no Figma: [🔗 Link para o Figma](#)  
- **Screencast** apresentando o protótipo (com áudio/legenda): [🎥 Link para o vídeo](#)

---

### 2. Diagrama de Atividades do Sistema
O diagrama de atividades (UML) mostra o fluxo principal do sistema.  
- Disponível em: [📄 Link para o diagrama](#)  

---

### 3. Issue / Bug Tracker Atualizado (GitHub)
Utilizamos o **GitHub Issues** para acompanhamento de tarefas, melhorias e bugs.  
- **Print da tela do GitHub Issues:**  

<div align="center">
  <img src="https://github.com/user-attachments/assets/88cc925e-7f1f-4928-acf4-96de2e54c1cb" alt="Print Issues GitHub" width="80%">
</div>

---

### 4. Quadro Atualizado Refletindo a Entrega
O andamento do projeto está sendo acompanhado no **Trello (Kanban)**.  

- **Print do quadro da sprint atual:**  
<div align="center">
  <img src="https://github.com/user-attachments/assets/0e964bc7-95b1-44df-a0ce-a4931e1eaa3b" alt="Quadro Sprint" width="80%">
</div>

- **Print do backlog:**  
<div align="center">
  <img src="https://github.com/user-attachments/assets/598ac91c-106b-43c7-bc40-888b70f13301" alt="Backlog" width="40%">
</div>

---

## 📝 Descrição do Projeto

A API serve como backend de uma aplicação de finanças pessoais. Usuários podem registrar receitas e despesas, organizar suas movimentações por categorias, acompanhar metas de economia e visualizar relatórios financeiros. Administradores gerenciam categorias, configuram limites, acompanham estatísticas e garantem a integridade dos dados. O projeto segue metodologia ágil, com histórias de usuário organizadas em um quadro Kanban.

---

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
- **Relatórios Agregados:** Visualizar relatórios consolidados de todas as movimentações registradas. (Sprint 2)
- **Validação de Dados:** Gerenciar regras para garantir consistência dos registros financeiros. (Sprint 2)
- **Estatísticas de Uso:** Acompanhar crescimento de usuários e atividades. (Sprint 3)

---

## 🛠️ Estrutura da API (Endpoints)

| Método | Rota                     | Descrição                                        | Responsável(eis)         |
| :----- | :----------------------- | :-----------------------------------------------| :----------------------- |
| `POST` | `/users`                 | Cadastra um novo usuário                        | Lucciano                 |
| `GET`  | `/users/:id/accounts`     | Lista os registros financeiros de um usuário    | Júlio                    |
| `POST` | `/transactions`          | Registra uma nova receita ou despesa            | Felipe                   |
| `GET`  | `/transactions`          | Lista todas as movimentações filtradas por critérios | Artur               |
| `POST` | `/categories`            | Cadastra categorias de receita/despesa          | Davi                     |
| `GET`  | `/reports`               | Gera relatórios financeiros agregados           | Daniel                   |
| `PATCH`| `/limits/:categoryId`    | Define o limite planejado de gastos para uma categoria | Lucciano           |
| `GET`  | `/statistics`            | Consulta estatísticas gerais do sistema         | Júlio                    |

---

## 👥 Equipe do Projeto

- Artur Lima Pinto Bacalhau – Endpoints de transações e filtros.  
- Daniel Silva Costa – Modelagem e conexão do banco de dados, relatórios.  
- Davi Magalhães Mendes – Categorias de receitas e despesas.  
- Felipe Assis Ferreira dos Santos – Registro de transações.  
- Júlio César Bizarria Lins – Visualização de saldos consolidados, relatórios e estatísticas.  
- Lucciano Henrique Pereira Cordeiro – Cadastro de usuários e configuração de limites.  

---

## 📊 Status do Projeto

O projeto encontra-se em fase de desenvolvimento. As tarefas estão sendo distribuídas e executadas conforme o planejamento inicial. O foco atual está na construção das rotas essenciais da API, registro de transações e modelagem do banco de dados.
