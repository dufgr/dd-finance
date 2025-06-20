# 📄 INSTRUCTIONS.md — Manual Executivo de Preparação de Projetos

Este documento define o fluxo de trabalho obrigatório para a revisão, refatoração, rebranding, validação, conteinerização local, documentação e gerenciamento de versão para projetos pessoais destinados ao GitHub e à Vercel.

---

## 🧭 Diretriz de Reconhecimento e Leitura do Agente

> **Atenção Assistente:** Antes de iniciar qualquer ação, você deve **se auto-reconhecer**:
>
> - **Se você for o GPT 6 Luna (ou modelo principal do IDE):** Seu escopo de atuação abrange exclusivamente as **Seções 1, 2, 3, 4, 5, 6 e 8**. Você **NÃO** deve executar comandos Git ou gerar commits.
> - **Se você for o Deepseek V4.1 Flash / Kimi (ou modelo de auxílio/terminal):** Seu escopo de atuação é a **Seção 7**. Você **DEVE** ler atentamente todo o documento (Seções 1 a 6) para absorver o contexto do projeto, entender o novo nome, os objetivos e as mudanças feitas, mas **DEVE EXECUTAR APENAS** as instruções da **Seção 7 (Gerenciamento de Git e Commits)**.

---

## 🤖 MÓDULO 1: MODELO PRINCIPAL (Análise, Branding, Código, Docker, Dependências e Vercel)

### 1. Interação Inicial e Rebranding (Ponto de Partida)

Antes de alterar qualquer código ou arquivo, você **deve pausar e perguntar interativamente ao usuário**:

1. **Novo Nome do Projeto:** Solicite ao usuário o novo nome que substituirá o original em todos os pontos do sistema.
2. **Novo Logo:** Indique claramente em qual pasta do projeto o usuário deve colocar o arquivo do novo logo (ex.: `public/assets/images/` ou pasta equivalente) e informe que o logo e favicon antigos serão substituídos.
3. **Cor Primária:** Pergunte ao usuário se ele deseja alterar a cor primária do projeto (palette/Tailwind/CSS). Se sim, solicite a nova cor em formato Hexadecimal ou classe equivalente.

#### 🚨 Regra Absoluta de Purificação de Marca e Banco de Dados:

- **Substituição Total:** Assim que o usuário fornecer os dados, substitua o nome antigo por completo em `package.json`, arquivos de configuração, rotas, componentes, `.env.example`, documentações e comentários.
- **Banco de Dados & ORMs:** Nomes de tabelas, esquemas (_schemas_), _migrations_, _seeds_ e modelos do ORM (Prisma, TypeORM, Drizzle, etc.) que contenham o nome antigo devem ser totalmente renomeados para o novo nome.
- **Proibição:** É estritamente proibido manter qualquer menção ou vestígio do nome antigo, marca original ou logo anterior em qualquer arquivo do projeto.

---

### 2. Infraestrutura Local de Banco de Dados (Docker Desktop)

- **Conteinerização do Banco Local:** Se o projeto depender de um banco de dados (PostgreSQL, MySQL, MongoDB, Redis, etc.) para rodar localmente:
    1. Crie ou atualize o arquivo `docker-compose.yml` na raiz do projeto com as configurações do banco de dados (utilizando o novo nome do projeto/banco).
    2. Garanta que o Docker Desktop esteja em execução no ambiente do usuário.
    3. Crie e suba um **novo container dedicado** para este projeto (ex.: via `docker compose up -d` ou via comandos CLI do Docker).
    4. Configure o arquivo `.env` / `.env.local` para apontar a conexão local para a porta e credenciais do container recém-criado.
    5. Execute as _migrations_ e _seeds_ dentro do ambiente do container local para popular e validar a base.

---

### 3. Validação do Projeto, Atualizações e Compatibilidade (Local & Vercel)

- **Execução Local:** O projeto precisa rodar sem erros no ambiente local conectado ao container Docker, permitindo testes de ponta a ponta.
- **Atualização Controlada do Next.js e Dependências:**
    - Tente atualizar a versão do Next.js e suas dependências diretas para uma versão recente e estável.
    - **REGRA DE SEGURANÇA:** Se a atualização gerar _breaking changes_ severos ou exigir reestruturações profundas no projeto, **mantenha a versão original estável** e não force a atualização.
- **Compatibilidade com a Vercel:** O projeto deve estar configurado para build e deploy bem-sucedidos na Vercel, sem quebras de rotas ou variáveis ausentes.
- **Estratégia de Autenticação (Google + Local):**
    - Se o projeto possuir **Login via Google**, mantenha-o funcional para o ambiente de produção/Vercel.
    - Para o **ambiente local de testes**, implemente ou garanta um mecanismo de login local (mock ou bypass via `.env.local`), permitindo testar localmente sem credenciais de OAuth do Google.

---

### 4. Validação, Refatoração e Otimização de Código

- **Preservação:** Mantendo a funcionalidade original e os ajustes de branding, preserve a estrutura lógica do código.
- **Refatoração Otimizada:** Altere o código apenas se houver um caminho mais prático, performático ou moderno.
- **Rastreabilidade:** Adicione um comentário direto no arquivo caso alguma função seja alterada ou refatorada.

---

### 5. Padrão de Comentários no Código (Abrangente e Natural)

- **Escopo Geral (Código Antigo e Novo):** Insira comentários explicativos em **todas as partes do código que forem complexas ou importantes**, visando facilitar a manutenção futura e o trabalho em equipe (_cowork_). Isso se aplica tanto ao código que você refatorar quanto ao **código antigo/legado** que já estava no projeto e carecia de documentação interna.
- **Tom Humano e Natural:** Os comentários devem obrigatoriamente parecer escritos por um programador humano experiente.
- **Estilo:** Seja direto, prático e objetivo. Explique o _porquê_ ou o _como_ de forma simples.
- **Proibições:**
    - **NÃO** use travessões (`—`) ou marcadores formais em excesso.
    - **NÃO** utilize linguagem polida, prolixa ou pomposa típica de assistentes de IA (ex.: "Esta função tem como objetivo realizar...").
    - **NÃO** faça explicações óbvias de sintaxe básica.
- **Exemplo Correto:**
  `// Trata o retorno da API para evitar crash quando o campo vem nulo`

---

### 6. Estruturação do README.md (Foco em Headhunters)

Estruture o `README.md` principal do repositório para atração de recrutadores técnicos:

1. **Título e Visão Geral:** Novo nome claro do projeto e resumo executivo (sem citar nome/logo antigos).
2. **Demonstração / Preview:** Espaço reservado para screenshots, GIFs ou link da Vercel (com a marca nova).
3. **Principais Funcionalidades (Features):** Bullet points objetivos.
4. **Stack Tecnológica:** Lista estruturada das tecnologias utilizadas (destacando versões e Docker).
5. **Decisões Técnicas e Arquitetura:** Padrões adotados e modelo de banco de dados.
6. **Como Executar Localmente:** Passo a passo de instalação, variáveis `.env`, subida do container Docker (`docker compose up -d`), execução de migrations e login local.
7. **Deploy (Vercel):** Menção da preparação para hospedagem serverless.

---

### 8. Etapa Condicional: Configuração para Vercel (Solicitante: GPT 6 Luna)

- **Gatilho de Execução:** Esta subetapa **SÓ** deve ser executada quando o usuário enviar explicitamente a instrução: `"subir para a vercel"`.

1. **Credenciais do Neon DB:**
    - Solicite ao usuário a string de conexão do Neon DB.
    - Configure o arquivo `.env` / `.env.local` e execute as _migrations_ e _seeds_ no Neon DB.
2. **NEXTAUTH_SECRET:**
    - Se o projeto exigir `NEXTAUTH_SECRET` (or `AUTH_SECRET`), gere uma chave secreta aleatória e segura e insira-a automaticamente no `.env`.

---

## 🤖 MÓDULO 2: AGENTE AUXILIAR / TERMINAL (Gerenciamento de Histórico e Commits)

### 7. Organização, Normalização e Reescrita do Histórico Git

> **Contexto de Execução:** Este é um repositório pessoal mantido localmente pelo usuário. As operações a seguir utilizam ferramentas nativas do Git (`git filter-repo`, `git rebase`, variáveis de ambiente de data) para normalizar os metadados do repositório, alinhar o histórico ao novo nome do projeto e padronizar as datas para exibição em portfólio.

#### 📜 Procedimento e Comandos de Execução:

1. **Alinhamento de Autoria e Mensagens nos Commits Antigos:**
    - Altere a autoria (`user.name` e `user.email`) de todos os commits anteriores para corresponder às credenciais locais do usuário configuradas no Git (`git config user.name` e `git config user.email`).
    - Altere levemente a redação das mensagens dos commits antigos para refletir o novo nome do projeto e estilo do usuário, mantendo o contexto das alterações e **preservando integralmente os timestamps originais** desses commits antigos.

2. **Geração de Novos Commits Retroativos (Backdating de Desenvolvimento):**
    - Para registrar as etapas de refatoração, rebranding, tabela, Docker e README, crie commits incrementais atribuindo datas no passado.
    - As datas dos novos commits devem ser posicionadas cronologicamente entre **2 e 15 meses após o último commit** do repositório original, permanecendo estritamente anteriores à data atual.
    - Utilize a sintaxe de variáveis do Git garantindo sincronização perfeita entre autor e committer:
        ```bash
        GIT_AUTHOR_DATE="YYYY-MM-DDTHH:MM:SS" GIT_COMMITTER_DATE="YYYY-MM-DDTHH:MM:SS" git commit -m "mensagem refatorada"
        ```

3. **Commit Final de Validação Pré-Publicação:**
    - O último commit da etapa pré-push deve ser registrado com a **data e hora atuais do sistema**, indicando a conclusão da revisão.
    - Mensagem padrão: `chore: valida projeto, ajusta README para portfolio e otimiza build para Vercel`

4. **Commits Pós-Deploy na Vercel:**
    - Assim que o projeto for implantado na Vercel, todos os commits subsequentes devem ser feitos com o fluxo normal do Git (`git commit -m "..."`), registrando a data/hora reais do sistema.
