# Cantinho do Sabor — Projeto final

Projeto web acadêmico desenvolvido em um semestre anterior, nas disciplinas identificadas no projeto como **PTAC** (frontend) e **PTAS** (backend). A aplicação reúne a apresentação de um restaurante, telas de cadastro e login e uma área de gerenciamento de produtos.

Este repositório é utilizado na **Atividade 2**, que solicita um projeto web de uma disciplina anterior, documentação em README e configuração do `.gitignore`.

## Recursos presentes no código

- Página de apresentação do restaurante Cantinho do Sabor.
- Telas de cadastro e login com integração ao Better Auth.
- Área de dashboard e tela de produtos.
- API com operações de listagem, consulta, criação, edição e exclusão de produtos.
- Modelagem de usuários, sessões e produtos com Prisma e PostgreSQL.

Os botões de reserva da página inicial são elementos de interface; não há um fluxo completo de reservas implementado nessa página.

## Tecnologias

| Parte | Tecnologias |
| --- | --- |
| Frontend | Next.js 16, React 19, JavaScript, Tailwind CSS 4, componentes shadcn/ui e Recharts |
| Backend | Node.js, Express 4, Better Auth, Prisma 6 e dotenv |
| Banco de dados | PostgreSQL |
| Versionamento | Git e GitHub |

## Estrutura

```text
projeto-final/
├── BACKEND-PTAS/
│   ├── prisma/          # Modelo do banco de dados
│   └── src/
│       ├── controllers/
│       ├── lib/         # Autenticação e conexão com o banco
│       ├── middleware/
│       ├── models/
│       └── routes/
├── FRONTEND-PTAC/
│   ├── public/          # Imagens e outros recursos
│   └── src/
│       ├── app/         # Páginas públicas e área privada
│       ├── components/
│       ├── hooks/
│       └── lib/
├── .gitignore
└── README.md
```

## Preparação do ambiente

É necessário ter Git, Node.js compatível com Next.js 16, npm e uma instância de PostgreSQL para desenvolvimento.

```bash
git clone https://github.com/marianesflores/projeto-final.git
cd projeto-final
```

### Backend

```bash
cd BACKEND-PTAS
npm ci
```

Crie um arquivo `.env` nessa pasta com os valores do seu ambiente:

```dotenv
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/cantinho_do_sabor?schema=public"
BETTER_AUTH_SECRET="SUBSTITUA_POR_UM_SEGREDO_ALEATORIO"
```

Os valores acima são exemplos, não credenciais. Para gerar um segredo local:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

**Pendência do projeto original:** `src/lib/prisma.js` importa `@prisma/adapter-pg`, mas essa dependência não está declarada no `package.json` do backend. É necessário revisar essa configuração e sua compatibilidade com a versão do Prisma antes de iniciar a API. Esta atualização de documentação não altera as dependências nem confirma a execução completa da aplicação.

Após resolver essa configuração, prepare um banco de desenvolvimento vazio e inicie a API:

```bash
npx prisma generate
npx prisma db push
npm run dev
```

`prisma db push` sincroniza o esquema com o banco indicado por `DATABASE_URL`; utilize um banco destinado a desenvolvimento. A API está configurada para `http://localhost:5500`, com verificação de disponibilidade em `/health`.

### Frontend

Em outro terminal, a partir da raiz do repositório:

```bash
cd FRONTEND-PTAC
npm ci
npm run dev
```

Acesse `http://localhost:3000`. O cliente de autenticação utiliza a API em `http://localhost:5500`. Para gerar a versão de produção do frontend, execute `npm run build` nessa mesma pasta.

## Gitignore

O `.gitignore` da raiz está em UTF-8 e exclui dependências, arquivos locais de ambiente, resultados de compilação, cobertura, logs e arquivos temporários. As regras específicas já existentes nas pastas do frontend e backend continuam aplicáveis.

Arquivos já versionados não deixam de ser acompanhados apenas por aparecerem no `.gitignore`.

## Contexto acadêmico e autoria

Projeto de **Mariane Silva Flores**, mantido no repositório original [marianesflores/projeto-final](https://github.com/marianesflores/projeto-final). O histórico original foi preservado. A documentação e a configuração de versionamento foram revisadas em português para a Atividade 2.
