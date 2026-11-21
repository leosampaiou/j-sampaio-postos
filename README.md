# J Sampaio Postos

Sistema web instalável para registrar fechamentos por turno, conferir leituras e recebimentos, consultar relatórios e manter auditoria operacional.

## Stack

React 19, TypeScript, Vite, Express, tRPC, Drizzle ORM e MySQL. A interface oferece fluxo de fechamento em quatro etapas, perfis de frentista/gerente/administrador, relatórios XLSX, comprovantes PDF e manifesto/service worker PWA.

## Requisitos

- Node.js compatível com o projeto e pnpm (versão definida no campo `packageManager`).
- MySQL compatível com o Drizzle.
- `DATABASE_URL` de servidor, nunca embutida no bundle do navegador.
- `INITIAL_ADMIN_SETUP_KEY` forte, definida fora do repositório e somente no ambiente do servidor.

Crie `.env` localmente com os valores apropriados; esse arquivo é ignorado pelo Git. Não use credenciais padrão nem envie segredos ao GitHub.

## Desenvolvimento

```bash
pnpm install
pnpm db:migrate
pnpm dev
```

O serviço escuta `PORT` (padrão `3000`). Acesse a tela de primeiro administrador e use a chave de ativação configurada no ambiente; a chave é validada exclusivamente no servidor. Depois, crie usuários individuais e vincule frentistas a funcionários.

## Validação e produção

```bash
pnpm check
pnpm test
pnpm build
pnpm start
```

As migrações em `drizzle/` são versionadas. Revise qualquer DDL novo antes de aplicá-lo: os ambientes de desenvolvimento e publicação podem usar o mesmo banco gerenciado. `pnpm db:push` gera e aplica migrações e não deve ser executado sem revisar o SQL.

## Offline e privacidade

O service worker mantém o shell/ativos estáticos disponíveis para recursos compatíveis. Um rascunho criado durante uma perda de conexão pode ser mantido temporariamente na `sessionStorage` da aba e sincronizado quando a conectividade voltar; isso não equivale a uma gravação confirmada. A finalização exige conexão e confirmação do servidor. A autenticação e dados do servidor não são armazenados no cache offline.

## Marca e identificação jurídica

O nome do produto é **J Sampaio Postos**. O logotipo recebido foi mantido sem redesenho ou alteração; a razão social/CNPJ e demais dados legais permanecem separados do nome do aplicativo.
