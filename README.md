# DD Finance

Aplicação web de gestão financeira pessoal para acompanhar receitas, despesas e investimentos em um dashboard, organizar transações e consultar insights financeiros.

## Demonstração

Preview e link de produção serão adicionados após a publicação. O logo e a identidade visual atuais foram preservados.

## Funcionalidades

- Dashboard mensal com resumo de receitas, despesas e investimentos.
- Gráficos de transações e despesas por categoria.
- Cadastro, edição e exclusão de transações.
- Autenticação e gerenciamento de usuários com Clerk.
- Assinatura premium e checkout com Stripe.
- Relatório financeiro com OpenAI; sem chave da API, a aplicação retorna um relatório de demonstração.

## Stack Tecnológica

- Next.js 14.2.35 e React 18.
- TypeScript 5 e Tailwind CSS 3.
- PostgreSQL 16, Prisma 5.21 e migrations versionadas.
- Clerk para autenticação, Stripe para assinaturas e OpenAI para relatórios.
- Node.js 20 ou superior e Docker Desktop para o banco local.

## Arquitetura e Decisões Técnicas

A interface e as rotas da aplicação usam o App Router do Next.js. Acesso a dados é feito pelo Prisma, com PostgreSQL como banco relacional e schema em `prisma/schema.prisma`. As alterações de estrutura são aplicadas pelas migrations em `prisma/migrations`. A autenticação é delegada ao Clerk; dados de transação são associados ao identificador do usuário autenticado.

O projeto não contém seed configurado. Para iniciar um banco vazio, aplique as migrations descritas abaixo; não há carga automática de dados de exemplo.

## Como Executar Localmente

1. Instale Node.js 20 ou superior, npm e Docker Desktop. Inicie o Docker Desktop.
2. Instale as dependências:

   ```bash
   npm ci
   ```

3. Crie a configuração local a partir do exemplo:

   ```bash
   cp .env.example .env
   ```

   No PowerShell, use `Copy-Item .env.example .env`. Configure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` e `CLERK_SECRET_KEY` com as credenciais de desenvolvimento do Clerk. As chaves `pk_test_replace_me` e `sk_test_replace_me` são marcadores e precisam ser substituídas para autenticar. A URL de conexão padrão já aponta para o PostgreSQL local.

4. Suba o banco dedicado do projeto:

   ```bash
   docker compose up -d database
   ```

   O serviço usa PostgreSQL 16 na porta `5432`, banco `dd_finance`, usuário `dd_finance` e volume Docker `dd-finance-postgres-data`. A senha padrão `dd-finance-local` é somente para desenvolvimento. Se alterar `POSTGRES_PASSWORD` no `.env`, atualize também a senha em `DATABASE_URL`.

5. Aplique as migrations:

   ```bash
   npx prisma migrate deploy
   ```

6. Inicie a aplicação:

   ```bash
   npm run dev
   ```

   Acesse [http://localhost:3000](http://localhost:3000). O login local usa o ambiente de desenvolvimento do Clerk; este projeto não implementa bypass de autenticação. Stripe requer credenciais próprias para checkout/assinaturas. `OPENAI_API_KEY` é opcional para o relatório de demonstração.

## Deploy na Vercel

O projeto usa o fluxo de build padrão do Next.js e pode ser publicado na Vercel. Configure no projeto as variáveis de produção listadas em `.env.example`, usando credenciais de produção do Clerk, Stripe e OpenAI conforme os recursos habilitados. Para produção, use um PostgreSQL acessível pela Vercel e configure `DATABASE_URL` para esse serviço; o container local não é um banco de produção. Execute as migrations no banco de produção antes de disponibilizar a aplicação.
