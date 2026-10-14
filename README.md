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

   No PowerShell, use `Copy-Item .env.example .env`. `NEXT_PUBLIC_LOCAL_AUTH_BYPASS=true` habilita um usuário de demonstração apenas durante `npm run dev`, sem exigir credenciais Clerk. Esse bypass é ignorado fora do ambiente de desenvolvimento. O usuário local tem acesso ao plano premium de demonstração; Stripe e OpenAI ficam desativados por padrão. Para testar o Clerk local, defina o bypass como `false` e configure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` e `CLERK_SECRET_KEY` com credenciais de desenvolvimento válidas. A URL de conexão padrão aponta para o PostgreSQL local.

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

   Acesse [http://localhost:3000](http://localhost:3000). Com o bypass local habilitado, não é necessário configurar Clerk. Sem integrações habilitadas, o checkout permanece indisponível e o relatório usa os dados de demonstração. Para habilitar Stripe, configure `NEXT_PUBLIC_STRIPE_ENABLED=true` e as credenciais Stripe; para análise real, configure `OPENAI_ENABLED=true` e `OPENAI_API_KEY`.

## Deploy na Vercel

O projeto usa o fluxo de build padrão do Next.js. Para esta implantação, configure na Vercel somente:

- `DATABASE_URL`: URL pooled do PostgreSQL Neon para as requisições da aplicação.
- `DIRECT_URL`: URL direta do Neon, sem `-pooler` no hostname; usada pelo Prisma para migrations.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` e `CLERK_SECRET_KEY`: credenciais de produção do Clerk.
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/` e `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/`. Não defina `NEXT_PUBLIC_CLERK_SIGN_IN_URL` nem `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: o fluxo usa o Account Portal hospedado pelo Clerk.
- `NEXT_PUBLIC_LOCAL_AUTH_BYPASS=false`, `NEXT_PUBLIC_STRIPE_ENABLED=false` e `OPENAI_ENABLED=false`.

Não configure chaves Stripe nem `OPENAI_API_KEY`; sem as flags de ativação, as integrações permanecem indisponíveis. Antes do primeiro acesso, aplique as migrations ao banco de produção com `npx prisma migrate deploy`; o Prisma usa `DIRECT_URL` para essa operação. O build padrão da Vercel executa `npm run build`.
