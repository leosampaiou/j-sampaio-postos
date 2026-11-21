# Plano de implementação — J Sampaio Postos | Sistema de Gestão de Fechamentos

## Objetivo e abordagem

Construir uma aplicação web responsiva e instalável para substituir o controle físico de vendas do J Sampaio Postos. A aplicação será operacional, e não uma demonstração com dados simulados: leituras, totais, indicadores, relatórios e PDFs deverão derivar dos dados persistidos. Quando não houver dados reais, a interface mostrará estado vazio/zero, sem inventar faturamento ou usuários.

A base provisionada é o template real `web-db-user`: React 19, TypeScript, Vite, Tailwind 4, Express, tRPC, Drizzle ORM e MySQL gerenciado. O projeto já possui `client/`, `server/`, `drizzle/`, `shared/`, scripts `pnpm check`, `pnpm test`, `pnpm build` e porta 3000. Servidor e banco foram selecionados porque o escopo exige autenticação, validação no servidor e persistência entre dispositivos. O banco é compartilhado entre Preview e publicação; migrações serão aditivas e nenhuma massa financeira falsa será inserida.

O documento anexado pede contas individuais por nome de usuário e senha; portanto, a autenticação da aplicação será própria, com senha protegida por hash criptográfico, sessão opaca em cookie `httpOnly`/`Secure`, expiração/revogação e autorização nos procedimentos tRPC do servidor. Não haverá cadastro público irrestrito: administradores gerenciarão contas, e o provisionamento inicial do primeiro administrador será um fluxo de configuração controlado, sem credenciais padrão embutidas no código. A política exata para ativar esse primeiro administrador poderá ser definida na etapa de configuração.

## Escopo funcional

1. **Acesso e permissões:** perfis frentista, gerente e administrador; login/logout individual; proteção de rotas e operações no backend; associação de usuários, funcionários e unidade; contas ativas/inativas. Frentistas acessam seus próprios registros; gerentes acessam operação e relatórios gerenciais; administradores controlam usuários, preços, bicos, tolerância, dados empresariais, unidade e políticas.
2. **Fechamento diário:** fluxo em quatro etapas com data/turno/responsáveis; quatro bicos configurados (01–03 Gasolina Comum e 04 Diesel S10); leituras decimais e validação de leitura final; cálculo de litros e valores usando preço vigente copiado para o fechamento; recebimentos em dinheiro, PIX, débito e crédito; diferença e classificação CONFERIDO/SOBRA/FALTA pela tolerância configurada; observações e confirmações; revisão, rascunho e finalização. Restrição única por data/turno/unidade, exceto reabertura autorizada e auditada. Registros finalizados não serão alterados ou apagados silenciosamente.
3. **Operação e gestão:** dashboard com filtros de período, indicadores calculados do banco, acompanhamento dos turnos, gráficos de faturamento/combustível/recebimentos/volume/turnos e atalhos; histórico pesquisável e detalhe; relatórios financeiro, combustível, turno, funcionário e divergências; gestão de funcionários e usuários; configurações; trilha de auditoria de correções, reaberturas e mudanças sensíveis.
4. **Documentos e compartilhamento:** PDF individual e consolidado diário em A4, com a marca oficial e dados empresariais; impressão e exportação de relatórios para Excel. O compartilhamento usará Web Share API com arquivo quando o navegador suportar; caso contrário, baixará o PDF e abrirá o WhatsApp com a mensagem preenchida. A interface informará claramente que o envio depende da ação do usuário, sem simular confirmação de envio.
5. **PWA e conectividade:** manifest próprio, ícone baseado no arquivo de marca sem redesenho, service worker para shell/recursos compatíveis e interface responsiva. Rascunhos offline poderão ficar temporariamente no armazenamento local do dispositivo para sincronização posterior; não serão tratados como gravação definitiva até confirmação do servidor. Exibir estados offline/sincronizando/sincronizado/falha e evitar duplicação na sincronização.
6. **Expansão:** modelar registros com `unitId` e preparar entidades de unidades para futura operação multiunidade, mantendo J Sampaio Postos como unidade operacional inicial. Dados empresariais informados no documento-fonte: D ANDRADE SAMPAIO LTDA.; nome fantasia informado POSTO J. SAMPAIO; CNPJ 46.691.152/0001-89; Rua Hildenora Gusmão, 231 – Centro, Vargem Grande/MA, CEP 65430-000.

## Dados e segurança

As tabelas Drizzle/MySQL cobrirão unidades e configurações, usuários/sessões, funcionários, bicos e histórico de preços, fechamentos, leituras por bico, recebimentos, justificativas/reaberturas e eventos de auditoria. O banco aplicará chaves estrangeiras, índices e unicidade por unidade/data/turno; valores monetários serão armazenados em centavos inteiros para evitar erros de ponto flutuante, mantendo cálculos e exibição em formato brasileiro. Regras e permissões serão validadas novamente no servidor; alterações de valores finalizados criarão trilha com autor, horário, justificativa e antes/depois. Credenciais privadas não irão para o bundle frontend.

Os preços e a tolerância vigentes serão configuráveis, mas cada fechamento preservará seus valores aplicados. O estado vazio do banco não será preenchido com exemplos financeiros. O primeiro administrador não terá senha padrão conhecida nem segredo de bootstrap publicado no navegador.

## Organização prevista

- `client/src/pages/`: Dashboard, Login/Configuração inicial, Novo Fechamento, Histórico/Detalhe, Relatórios, Funcionários, Usuários, Configurações e Auditoria.
- `client/src/components/`: navegação adaptável, marca, cards, filtros, gráficos, tabelas, estados de conectividade e componentes dos passos de fechamento.
- `client/src/lib/`: cliente tRPC, formatos de moeda/data, cálculos compartilhados, geração de PDF/planilhas e fila local de rascunhos.
- `client/public/`: logotipo oficial enviado, manifest, ícones derivados e service worker.
- `server/_core/`: autenticação/sessões, middleware de papéis, contexto, servidor e endpoints HTTP de apoio.
- `server/routers/` (ou módulos de domínio ligados a `server/routers.ts`): procedimentos validados para fechamentos, dashboard/relatórios, funcionários, usuários, configurações e auditoria.
- `server/db/` (ou consultas organizadas em `server/db.ts`): operações persistentes e transacionais por domínio.
- `drizzle/schema.ts` e `drizzle/`: entidades, relações e migrações versionadas.
- `shared/`: tipos/validações Zod e regras monetárias compartilhadas entre cliente e servidor.
- `public/manus-routes.json`: manifesto das rotas de páginas mantido em sincronia com o roteador.

## Direção de design

Alternativas consideradas: “ERP financeiro editorial, limpo e operacional” — probabilidade 0,07; “Painel industrial escuro de alto contraste” — probabilidade 0,04; “Administração minimalista baseada em tabelas” — probabilidade 0,03. Escolha: **ERP financeiro editorial, limpo e operacional**, alinhado ao logotipo e às referências do solicitante.

- **Movimento:** design editorial suíço aplicado a um painel financeiro moderno, com hierarquia tipográfica clara e componentes precisos.
- **Princípios centrais:** números legíveis à primeira vista; fluxo de fechamento curto e sequencial; divergências destacadas sem ambiguidade; rastreabilidade sem aparência de planilha.
- **Filosofia de cor:** azul-marinho transmite confiança e estrutura; amarelo do logotipo orienta ações e foco; branco e cinza-claro dão espaço e legibilidade; verde, vermelho e laranja comunicam estado sem depender somente da cor.
- **Paradigma de layout:** navegação lateral persistente no desktop e barra/folha de navegação compacta no celular; conteúdo operacional por seções e resumos alinhados, com tabela em telas amplas e cartões em telas estreitas.
- **Elementos de assinatura:** filete amarelo para ação primária/contexto ativo; placas de status com rótulo e ícone; totais monetários em tipografia tabular.
- **Interação e animação:** foco visível, formulários com feedback imediato, revisão antes de finalizar e transições breves (120–180 ms); respeitar `prefers-reduced-motion`.
- **Tipografia:** Inter ou fonte sans-serif de sistema para interface, com números tabulares; títulos compactos em peso semibold e rótulos de campos curtos.
- **Essência da marca:** ferramenta de precisão para quem fecha e acompanha os turnos no J Sampaio Postos; personalidade confiável, objetiva e organizada.
- **Voz:** instruções diretas e tranquilas; CTAs orientados à ação. Exemplos: “Confira os valores antes de finalizar.” “Diferença de R$ 20,00 — registre a justificativa do turno.”
- **Logotipo:** utilizar o arquivo oficial recebido integralmente, sem redesenhar nem alterar cores, proporções ou elementos; aplicar em login, navegação, documentos e identidade instalável.
- **Cor proprietária:** azul-marinho do logotipo, acompanhado pelo amarelo original como destaque.

## Restrições e decisões importantes

- A interface não exibirá lançamentos fictícios para preencher gráficos. PDFs e relatórios refletirão registros reais do banco.
- Compatibilidade com compartilhamento de arquivo depende do navegador/dispositivo; fallback de download + WhatsApp não equivale a envio automático.
- A exigência do documento menciona Supabase/PostgreSQL como sugestão, mas aceita arquitetura equivalente; será usada a infraestrutura gerenciada provisionada para este projeto (MySQL), com backend, persistência, migrações e autorização no servidor.
- O texto do requisito de expansão termina truncado no anexo após “Usuários vincula...”; este plano preserva as instruções explícitas disponíveis e prepara `unitId` para usuários e registros.

## Fluxo de entrega

Após aprovação deste plano, converter as cláusulas do documento em `TODO.md` por resultado independente, preservando regras, valores, perfis, estados e exceções; configurar diagnósticos do TypeScript antes da primeira leva de código; implementar primeiro fundação de dados/autenticação e o fluxo de fechamento, depois gestão/dashboard/histórico/relatórios, e por fim documentos/PWA/offline; iniciar o serviço pelo runtime gerenciado; executar verificações disponíveis e revisão read-only do escopo; corrigir problemas confirmados; manter publicação separada do Preview e não publicar sem pedido explícito.


## Evolução funcional — mobile, estoque e divergências (21/11/2026)

### Abordagem e limites

Evoluir a aplicação React + Vite + TypeScript, Express/tRPC, Drizzle/MySQL e a navegação Wouter existentes; não reconstruir a aplicação, reinicializar usuários nem alterar registros financeiros existentes. O banco de desenvolvimento e o de publicação são compartilhados: qualquer alteração de esquema será aditiva, versionada e revisada antes de aplicar. Não inserir tanques, capacidades, estoque, fornecedor, consumo ou divergências fictícias. O fechamento pode continuar operando antes de o administrador configurar estoque; nesse estado a interface informa que o estoque ainda não está configurado e não cria baixas sem tanque/origem definida. Depois da ativação do estoque, cada bico que gerar volume precisa estar mapeado a exatamente um tanque compatível; não distribuir automaticamente vendas entre vários tanques.

### Arquitetura dos módulos

- Persistência: acrescentar entidades Drizzle para tanques, mapeamento bico–tanque, movimentos de estoque, recebimentos, medições físicas, ocorrências de divergência, participantes/alocações e análises de ajuste de folha. Guardar litros com precisão de três casas, moeda em centavos e chaves de idempotência únicas. A quantidade teórica deriva do estoque de abertura e dos movimentos assinados; a medição física não substitui o saldo teórico. Corrigir uma baixa existente por movimento compensatório auditado, nunca por edição silenciosa do histórico.
- Integração de fechamento: no ato de finalização/confirmação, gravar uma saída por bico e ocorrência de divergência por fechamento quando aplicável, dentro da mesma transação. Revisões/reaberturas preservam os movimentos originais e criam apenas o delta necessário, com uma chave idempotente por fechamento/revisão/bico. Sem mapeamento configurado, não inventar tanque nem distribuir litros; apresentar erro/pendência ao gerente depois que o módulo de estoque estiver ativado.
- Backend: manter autorização por `protectedProcedure`, `managerProcedure` e `adminProcedure`, separar endpoints de estoque e divergências em roteadores de domínio e incluir todas as consultas e mutações no `appRouter`. Frentista só acessa ocorrências próprias; gerente consulta e analisa; administrador administra tanques, limites e eventual aprovação administrativa. Nenhuma tela substitui validação no backend.
- Interface: preservar paleta e identidade visual existentes. Expandir a navegação mobile para Início, Fechamentos, Estoque, Relatórios e Mais; manter menu completo em desktop. Transformar a tabela de leituras dos bicos em cartões no celular, usar áreas de toque acessíveis, campos numéricos, impedir duplo envio e evitar corte/rolagem horizontal indevida nas larguras 320–430 px e em tablets.
- Estoque: cadastro de tanque armazena identificação/código, combustível, capacidades total e operacional, estoque mínimo e de abertura, data operacional de início, status, prazos de entrega e limites de alerta. Combustíveis iniciais são Gasolina Comum e Diesel S10; suportar vários tanques do mesmo produto e preparar o catálogo para produtos futuros. Entradas guardam tanque, fornecedor, documento, horário, litros, custo, responsável, observação e referência opcional a comprovante. Baixas extraordinárias requerem motivo, data, responsável e autorização. Medições guardam físico, teórico à medição, diferença e percentual.
- Indicadores: médias de consumo por 7/15/30 dias calculadas apenas com fechamentos reais após a data inicial do tanque; autonomia não é estimada se não houver média positiva e baixa confiabilidade é explicitada. Alertas por mínimo, autonomia de 3/2 dias, divergência física/teórica e atualização antiga são derivados de limites configuráveis. O planejamento calcula sugestão limitada à capacidade operacional e nunca faz pedido automático. Dashboard exibe cada tanque, litros, capacidade, ocupação, barra, média, autonomia, previsão e estado; medição física é informação complementar.
- Divergências: criar ocorrência idempotente vinculada ao fechamento, funcionário, data/turno, tipo/valor e conferente, sem ocultar eventos individuais ao calcular saldo. Quando existir mais de um responsável, a atribuição deve ser explícita e alocada; sem rateio confirmado por gerente, a ocorrência permanece sem imputação individual. Histórico individual e fechamento mensal incluem contagens, totais, saldo, detalhes e exportação. Análise mantém status, comentários, justificativas, evidências, decisão e responsável. Ajuste de folha é somente um registro de análise: nunca aplicar desconto automaticamente, presumir culpa ou compensar sobras/faltas; aprovação separada pelo administrador e validação administrativa/legal continuam necessárias.
- Relatórios: reutilizar componentes atuais de exportação quando compatíveis; acrescentar filtros por período, tanque, combustível, movimento e funcionário, além de exportação Excel/PDF para estoque e divergências mensais.

### Estrutura atual observada

- `client/src/App.tsx` mantém a sessão e renderiza a página autenticada `client/src/pages/Home.tsx`.
- `Home.tsx` usa Wouter para as páginas operacionais, abriga navegação e formulários de fechamento, e consome tRPC.
- `client/src/index.css` contém a identidade e os breakpoints atuais; novos componentes devem preferir arquivos por módulo para não aumentar o monólito.
- `server/routers.ts` registra autenticação, funcionários, usuários, configurações, fechamentos, analytics, relatórios e auditoria; novos domínios serão roteadores separados.
- `drizzle/schema.ts` e `drizzle/` mantêm o modelo MySQL e as migrações; `server/_core/trpc.ts` implementa papéis e CSRF.

### Dependências e restrições de entrega

A configuração corrente tem Server e Database ativos, Preview na porta 3000, TypeScript registrado em diagnósticos e `publishing.auto_publish=false`. A mudança será validada com os comandos existentes (`pnpm check`, `pnpm test`, `pnpm build`); não publicar o site. Ao terminar e revisar o esquema, criar um commit em `main` e empurrar ao remoto canônico para salvar checkpoint; atualizar também o espelho público GitHub já autorizado, omitindo `.manus-starter-init.json` e outros metadados internos.


## Correção de confiabilidade — login, logout, impressão e dados persistidos (21/11/2026)

### Abordagem e diagnóstico confirmado

Preservar React 19, TypeScript, Vite, Express/tRPC, Drizzle/MySQL, Wouter, identidade visual, contas e registros; corrigir apenas os caminhos existentes. A consulta read-only ao banco confirmou que há registros de fechamento persistidos, mas o procedimento real `closures.list` falha com `ER_BAD_FIELD_ERROR: Unknown column 'closures.revision' in 'field list'`. A coluna é acrescentada por `drizzle/0002_inventory_discrepancies.sql`; a conferência dos hashes do diário real confirmou `0000_initial_users` e `0001_smiling_electro` aplicadas, com `0002_inventory_discrepancies` e `0003_payroll_review_revisions` pendentes. O frontend confunde erros de consulta com listas vazias e zeros, agravando o sintoma. Nenhuma migração ou escrita de banco foi executada.

Antes de qualquer DDL, manter o banco compartilhado intacto e pedir aprovação explícita para aplicar as migrações pendentes somente após backup privado verificável. `0002` cria oito tabelas operacionais e adiciona `closures.revision`; `0003` altera o índice de unicidade de `payrollAdjustmentReviews` e acrescenta `closureRevision`. Não recriar tabelas, apagar/limpar dados, inserir amostras, trocar banco ou recriar contas. Se a migração não for autorizada, a aplicação deve mostrar falha real de serviço/esquema com tentativa de reconsulta, nunca simular ausência de dados.

### Implementação mínima

- Login: botão com o rótulo exato “Entrar”, contraste e largura estáveis em celular e desktop; durante envio, manter texto (“Entrando…”) e spinner visível, sem deixar o botão vazio.
- Logout: revogar no servidor a sessão identificada por `ctx.session` (inclusive quando autenticada por Bearer), limpar o cookie e, só após sucesso, remover CSRF e todo o cache privado do cliente; pedir confirmação antes de sair. Redirecionar por substituição do histórico para `/login`, proteger o app em cada URL direta e revalidar páginas restauradas pelo botão Voltar sem expor conteúdo protegido. Falha de logout não deve apagar a credencial local nem fingir sucesso.
- Impressão: substituir a ficha resumida atual por uma impressão A4 responsiva construída exclusivamente a partir do detalhe persistido: estabelecimento/razão social, CNPJ/endereço, data/turno, frentista e responsável; linhas dos bicos com leituras, litros, preço e valor; totais por combustível/vendas, recebimentos por modalidade, total recebido, diferença, resultado, observações, confirmações e horários. Usar quebra de página e estilos de impressão para evitar cortes, sobreposição ou interface do app; escapar texto dinâmico. O PDF/compartilhamento existente permanece separado.
- Dados: separar loading, sucesso vazio e erro em histórico, detalhe, dashboard, relatórios, divergências, estoque e listas administrativas; oferecer retry e não renderizar zeros/“nenhum registro” durante falha. Propagar falha de infraestrutura de autenticação em vez de convertê-la em sessão ausente. Revisar filtros/permissões e retirar o limite silencioso do histórico com paginação/continuação segura, preservando o escopo por unidade e por perfil.
- Privacidade de sessão: impedir cache HTTP de respostas tRPC e limpar/revalidar a página restaurada do BFCache após navegação, mantendo a validação de sessão no servidor.

### Estrutura e entrega

Reutilizar `client/src/pages/AuthPage.tsx`, `client/src/_core/hooks/useAuth.ts`, `client/src/App.tsx` e `client/src/pages/Home.tsx`; acrescentar, se útil, um gerador isolado de HTML de impressão e um componente reutilizável de erro/retry. Ajustar `server/routers.ts`, `server/_core/appAuth.ts`, `server/_core/context.ts` e `server/_core/index.ts` sem mudar a arquitetura. Testes automatizados usam fixtures/mocks e não fazem mutações ao banco real. Rodar diagnósticos TypeScript, testes e build. Não publicar; salvar commit somente no fluxo canônico já autorizado e preservar o espelho GitHub sem metadados internos.

### Evidências e pendências registradas (21/11/2026)

No Preview, login inválido exibiu “Usuário ou senha incorretos.” e o usuário entrou com uma conta existente. O logout, disparado pelo botão no DOM porque a camada do Preview interceptou o clique visual, percorreu a confirmação afirmativa, redirecionou a `/login` e foi confirmado pelo backend: `auth.me` retornou HTTP 401 / `UNAUTHORIZED`. A confirmação negativa manteve a sessão ativa; acesso direto a `/historico` e Voltar após logout permaneceram na tela de login. O login foi conferido visualmente em desktop e viewport móvel; o fluxo autenticado responsivo em Android físico ainda não foi inspecionado.

Os testes isolados da impressão validam conteúdo e escape HTML, mas não substituem imprimir um fechamento real. Essa verificação, a leitura de dados após novo login e o aceite integrado permanecem bloqueados porque `closures.revision` não existe no esquema compartilhado; as migrações `0002` e `0003` não foram aplicadas, e nenhum DDL ou escrita foi executado. `pnpm check`, `pnpm test` (27 testes), `pnpm build` e `git diff --check` passaram; o build reportou apenas avisos já observados de chunk grande e script existente no `index.html`. `publishing.auto_publish=false` e o site não foi publicado.
