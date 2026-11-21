# TODO — J Sampaio Postos | Sistema de Gestão de Fechamentos

Nome atual do aplicativo: J Sampaio Postos. Os critérios de aceite transcritos do escopo fornecido permanecem literais; itens ficam abertos até haver evidência funcional correspondente.

## [ ] Base, identidade visual e estrutura principal

J SAMPAIO POSTOS — SISTEMA DE GESTÃO DE FECHAMENTOS

1. OBJETIVO DO PROJETO

Desenvolva uma aplicação web completa, profissional, moderna e instalável (PWA) para gerenciamento dos fechamentos diários do POSTO J. SAMPAIO.

O sistema deverá substituir a ficha física de Controle Diário de Vendas fornecida como referência, digitalizando todo o processo de fechamento dos turnos e acrescentando ferramentas de gestão, acompanhamento financeiro, relatórios e controle operacional.

A aplicação será utilizada por três categorias de usuários:

- Frentistas.
- Gerentes.
- Administradores.

O objetivo é permitir que a operação de fechamento seja realizada de maneira simples, rápida e segura, enquanto a administração consegue acompanhar o desempenho financeiro e operacional do posto em tempo real.

IMPORTANTE: Não desenvolver apenas um protótipo visual. Construir uma aplicação funcional, com backend, banco de dados persistente, autenticação, controle de permissões e todas as funcionalidades descritas neste documento.

---

2. IDENTIDADE VISUAL E LOGOTIPO

Será enviado junto deste prompt o logotipo oficial do Posto J. Sampaio.

Utilizar obrigatoriamente o arquivo enviado como identidade visual oficial da aplicação.

Requisitos:

- Não redesenhar o logotipo.
- Não modificar suas cores, proporções ou elementos.
- Não substituir por logotipos genéricos.
- Utilizar o logotipo na tela de login, dashboard, menu, relatórios e documentos PDF.
- Criar um ícone de aplicativo derivado do logotipo, preservando sua identidade visual.

Paleta de cores

- Azul-marinho: cor principal.
- Amarelo: cor de destaque.
- Branco: superfícies e fundos.
- Cinza-claro: elementos secundários.
- Verde: resultados conferidos.
- Vermelho: faltas e divergências.
- Laranja: alertas e pendências.

A interface deverá transmitir confiança, organização, precisão e profissionalismo.

Estilo visual

Inspirar-se em softwares modernos de gestão empresarial e sistemas financeiros.

Utilizar:

- Dashboard com cards informativos.
- Gráficos modernos.
- Tabelas organizadas.
- Ícones intuitivos.
- Tipografia legível.
- Bordas discretas.
- Espaçamento adequado.
- Animações sutis.
- Menu lateral em computadores.
- Navegação adaptada para dispositivos móveis.

Evitar aparência de planilha ou formulário antigo.

---

3. ESTRUTURA PRINCIPAL

Criar as seguintes páginas:

1. Dashboard.
2. Novo fechamento.
3. Histórico de fechamentos.
4. Relatórios.
5. Gestão de funcionários.
6. Gestão de usuários.
7. Configurações.
8. Auditoria do sistema.

A navegação deverá respeitar o nível de permissão do usuário conectado.

---

## [ ] Dashboard e acompanhamento dos turnos

4. DASHBOARD PRINCIPAL

O dashboard será a tela inicial do sistema.

Deverá apresentar uma visão geral da operação do posto.

4.1 Indicadores principais

Criar cards com os seguintes indicadores:

- Faturamento do dia.
- Faturamento do mês.
- Litros vendidos no dia.
- Litros vendidos no mês.
- Total recebido no dia.
- Total recebido no mês.
- Quantidade de fechamentos realizados.
- Fechamentos pendentes.
- Fechamentos conferidos.
- Fechamentos com divergência.
- Total de sobras.
- Total de faltas.

Todos os indicadores deverão ser calculados automaticamente com base nos registros reais do banco de dados.

### Complemento de indicadores do dashboard — solicitação de 21/11/2026

- Remover completamente do dashboard principal os cards “Recebido hoje”, “Fechamentos realizados” e “Fechamentos pendentes”; essas informações podem continuar nas respectivas páginas e relatórios.
- Substituir os indicadores separados de sobras e faltas por um único card “Saldo de caixa”, calculado como total de sobras menos total de faltas no período selecionado. Exibir o valor líquido em reais e indicar saldo positivo, negativo ou zerado em verde, vermelho ou cor neutra, respectivamente.
- Não apagar os registros individuais de sobras e faltas; eles continuam disponíveis no módulo de divergências e nos relatórios.
- Preservar os demais indicadores financeiros e operacionais não mencionados nesta solicitação.
- A seção de estoque dos tanques deve permanecer no dashboard principal, imediatamente abaixo dos indicadores financeiros, sem inventar valores.
- O saldo respeita exatamente o período selecionado: “Hoje” limita o cálculo a hoje e “Mês atual” acumula do primeiro dia do mês até a data atual, sem considerar ocorrências fora do intervalo.

4.2 Gráficos

Criar os seguintes gráficos interativos:

Gráfico 1 — Evolução do faturamento

Mostrar a evolução das vendas nos últimos 7 ou 30 dias.

Gráfico 2 — Vendas por combustível

Comparar:

- Gasolina comum.
- Diesel S10.

Mostrar litros vendidos e faturamento.

Gráfico 3 — Formas de recebimento

Mostrar a distribuição financeira entre:

- Dinheiro.
- PIX.
- Débito.
- Crédito.

Utilizar valores monetários e percentuais.

Gráfico 4 — Volume de vendas

Mostrar a quantidade de litros vendidos ao longo do tempo.

Gráfico 5 — Desempenho por turno

Comparar:

- Manhã.
- Tarde.
- Noite.

Mostrar faturamento, litros vendidos e quantidade de fechamentos.

4.3 Situação dos turnos

Criar uma seção chamada "Acompanhamento dos Turnos".

Apresentar os três turnos do dia:

- Manhã.
- Tarde.
- Noite.

Cada turno deverá apresentar seu status:

- Não iniciado.
- Em preenchimento.
- Aguardando conferência.
- Conferido.
- Sobra.
- Falta.

Exemplo visual:

Manhã — Conferido.
Tarde — Pendente.
Noite — Não iniciado.

O dashboard deverá permitir identificar imediatamente quais turnos já foram fechados.

4.4 Filtros

Disponibilizar filtros:

- Hoje.
- Ontem.
- Últimos 7 dias.
- Últimos 30 dias.
- Este mês.
- Mês anterior.
- Período personalizado.

Todos os indicadores e gráficos deverão respeitar os filtros selecionados.

4.5 Acesso rápido

Adicionar botões de acesso rápido:

- Novo fechamento.
- Consultar histórico.
- Relatório diário.
- Gerar PDF consolidado.

---

## [ ] Fechamento: identificação, bicos e cálculo de vendas

5. NOVO FECHAMENTO

Esta é a funcionalidade central do sistema.

O fechamento deverá seguir a estrutura da ficha física fornecida como referência.

Organizar o processo em quatro etapas.

5.1 Identificação do fechamento

Campos:

- Data.
- Turno: Manhã, Tarde ou Noite.
- Frentista responsável.
- Responsável pelo fechamento.

O usuário conectado deverá ser identificado automaticamente.

Permitir que o gerente ou administrador selecione outro funcionário, quando autorizado.

Não permitir dois fechamentos independentes para o mesmo turno e data, salvo mediante reabertura autorizada e registrada em auditoria.

5.2 ETAPA 1 — LEITURA DOS BICOS E LITROS VENDIDOS

Cadastrar inicialmente quatro bicos:

Bico| Combustível
Bico 01| Gasolina Comum
Bico 02| Gasolina Comum
Bico 03| Gasolina Comum
Bico 04| Diesel S10

Para cada bico, disponibilizar:

- Leitura inicial.
- Leitura final.
- Litros vendidos.
- Preço por litro.
- Valor vendido.

Cálculos automáticos

Litros vendidos = Leitura final - Leitura inicial.

Valor vendido = Litros vendidos × Preço por litro.

Os campos de litros e valor vendido deverão ser preenchidos automaticamente.

Impedir leitura final inferior à leitura inicial.

Permitir números decimais nas leituras.

Agrupamentos automáticos

Gasolina Comum

- Somatório dos litros dos bicos 01, 02 e 03.
- Somatório do valor vendido nos três bicos.

Diesel S10

- Litros vendidos no bico 04.
- Valor vendido no bico 04.

Total Geral

- Total de litros vendidos.
- Total financeiro das vendas.

Exibir os resultados em tempo real.

Preços dos combustíveis

Os preços deverão ser configuráveis pelo administrador.

O sistema deverá utilizar o preço vigente no momento do fechamento.

Salvar uma cópia do preço aplicado em cada registro para preservar o histórico.

Quando houver reajuste, os fechamentos anteriores não deverão sofrer alterações.

---

## [ ] Fechamento: recebimentos, conferência, responsabilidades e finalização

5.3 ETAPA 2 — RECEBIMENTOS

Criar quatro campos financeiros:

1. Dinheiro.
2. PIX.
3. Débito.
4. Crédito.

Calcular automaticamente:

Total recebido = Dinheiro + PIX + Débito + Crédito.

Utilizar formatação monetária brasileira:

R$ 0,00.

Permitir valores com casas decimais.

---

5.4 ETAPA 3 — CONFERÊNCIA FINANCEIRA

Criar uma seção de conferência com:

Total das vendas: resultado da etapa 1.

Total recebido: resultado da etapa 2.

Diferença: Total recebido - Total das vendas.

Classificar automaticamente:

- CONFERIDO: diferença igual a zero, considerando a tolerância configurada.
- SOBRA: recebimentos superiores às vendas.
- FALTA: recebimentos inferiores às vendas.

Exemplos:

Vendas: R$ 5.000,00.
Recebimentos: R$ 5.000,00.
Diferença: R$ 0,00.
Resultado: CONFERIDO.

Vendas: R$ 5.000,00.
Recebimentos: R$ 5.020,00.
Diferença: +R$ 20,00.
Resultado: SOBRA.

Vendas: R$ 5.000,00.
Recebimentos: R$ 4.970,00.
Diferença: -R$ 30,00.
Resultado: FALTA.

A tolerância deverá ser configurável pelo administrador, iniciando em R$ 0,00.

Destacar visualmente o resultado.

---

5.5 ETAPA 4 — OBSERVAÇÕES E RESPONSABILIDADES

Criar um campo de texto para:

- Observações.
- Ocorrências do turno.
- Justificativas de diferenças.

Identificação do frentista

- Nome.
- Confirmação eletrônica de responsabilidade.

Identificação do responsável pelo fechamento

- Nome.
- Confirmação eletrônica de responsabilidade.

Registrar automaticamente:

- Data de criação.
- Horário de criação.
- Usuário responsável.
- Horário de finalização.

---

5.6 FINALIZAÇÃO

Antes de salvar definitivamente, apresentar uma tela de revisão contendo todas as informações.

Disponibilizar:

- Salvar rascunho.
- Voltar e editar.
- Finalizar fechamento.
- Gerar PDF.
- Enviar pelo WhatsApp.

Após a finalização, atualizar automaticamente o histórico e o dashboard.

Fechamentos finalizados deverão ser protegidos contra alterações não autorizadas.

---

## [ ] Histórico de fechamentos

6. HISTÓRICO DE FECHAMENTOS

Criar uma página para consultar todos os fechamentos.

Apresentar tabela com:

- Data.
- Turno.
- Frentista.
- Responsável pelo fechamento.
- Total de litros.
- Total de vendas.
- Total recebido.
- Diferença.
- Situação.

Filtros

- Data.
- Turno.
- Frentista.
- Combustível.
- Situação.

Permitir pesquisa por nome e data.

Ao clicar em um registro, abrir uma página detalhada contendo todas as informações do fechamento.

Disponibilizar nesta página:

- Visualizar.
- Gerar PDF.
- Enviar pelo WhatsApp.
- Solicitar reabertura, conforme permissão.
- Consultar histórico de alterações.

---

## [ ] PDF, WhatsApp e consolidado diário

7. GERAÇÃO DE PDF E COMPARTILHAMENTO PELO WHATSAPP

Esta funcionalidade é obrigatória e deverá ser simples de utilizar, principalmente em celulares.

7.1 Gerar PDF individual

Criar um botão destacado:

GERAR PDF

Ao clicar, gerar automaticamente um PDF profissional do fechamento selecionado.

O documento deverá seguir a identidade visual oficial do Posto J. Sampaio.

Conteúdo do PDF

1. Logotipo.
2. Nome da empresa.
3. CNPJ.
4. Endereço.
5. Data.
6. Turno.
7. Nome do frentista.
8. Nome do responsável pelo fechamento.
9. Tabela dos quatro bicos.
10. Leituras iniciais e finais.
11. Litros vendidos.
12. Preço por litro.
13. Valor vendido por bico.
14. Resumo por combustível.
15. Total geral de litros e vendas.
16. Recebimentos por modalidade.
17. Total recebido.
18. Diferença financeira.
19. Resultado do fechamento.
20. Observações e ocorrências.
21. Confirmação dos responsáveis.
22. Data e horário de registro.

Apresentação

- Formato A4.
- Layout profissional.
- Cores institucionais.
- Valores bem destacados.
- Tabelas legíveis.
- Logotipo corretamente dimensionado.
- Rodapé com identificação do posto.

Nome automático do arquivo:

Fechamento_JSAMPAIO_2026-11-21_MANHA.pdf

A data e o turno deverão ser dinâmicos.

7.2 Enviar pelo WhatsApp

Criar um botão verde destacado:

ENVIAR PELO WHATSAPP

O comportamento esperado:

1. Gerar o PDF do fechamento.
2. Preparar uma mensagem automática.
3. Abrir o compartilhamento nativo do dispositivo.
4. Permitir selecionar o WhatsApp.
5. Compartilhar o PDF como anexo, juntamente com a mensagem, quando suportado.

Mensagem automática:

"Olá! Segue o fechamento do Posto J. Sampaio.

Data: [DATA]
Turno: [TURNO]
Frentista: [NOME]

Total de vendas: R$ [VALOR]
Total recebido: R$ [VALOR]
Diferença: R$ [VALOR]
Resultado: [CONFERIDO/SOBRA/FALTA]

Segue em anexo o relatório completo do fechamento."

Compatibilidade

Utilizar a Web Share API com compartilhamento de arquivos, quando suportada.

Em celulares Android compatíveis, permitir selecionar diretamente o WhatsApp na tela de compartilhamento.

Caso o compartilhamento de arquivos não seja suportado:

- Gerar o PDF.
- Baixar o arquivo automaticamente.
- Abrir o WhatsApp com a mensagem preenchida.
- Orientar o usuário a anexar o PDF baixado.

Não simular o envio automático.

Não afirmar que um arquivo foi enviado sem confirmação do usuário.

7.3 Compartilhamento pelo histórico

Os mesmos botões deverão estar disponíveis nos fechamentos antigos.

7.4 PDF consolidado diário

Criar também a opção de gerar um documento com o consolidado dos três turnos.

Incluir:

- Fechamento da manhã.
- Fechamento da tarde.
- Fechamento da noite.
- Total de litros vendidos.
- Vendas de gasolina comum.
- Vendas de Diesel S10.
- Faturamento total.
- Recebimentos por modalidade.
- Total de sobras.
- Total de faltas.
- Resultado individual de cada turno.

Adicionar botões:

- Gerar PDF diário.
- Enviar resumo diário pelo WhatsApp.

Não considerar turnos pendentes como fechamentos realizados.

---

## [ ] Relatórios gerenciais e exportações

8. RELATÓRIOS GERENCIAIS

Criar uma área completa de relatórios.

8.1 Relatório financeiro

Apresentar:

- Faturamento diário.
- Faturamento semanal.
- Faturamento mensal.
- Total em dinheiro.
- Total em PIX.
- Total em débito.
- Total em crédito.
- Total de diferenças financeiras.

8.2 Relatório por combustível

Apresentar:

- Litros de gasolina comum.
- Litros de Diesel S10.
- Faturamento de gasolina comum.
- Faturamento de Diesel S10.
- Participação percentual de cada combustível.
- Evolução das vendas.

8.3 Relatório por turno

Comparar manhã, tarde e noite.

Apresentar:

- Litros vendidos.
- Faturamento.
- Recebimentos.
- Quantidade de fechamentos.
- Diferenças financeiras.

8.4 Relatório por frentista

Apresentar:

- Quantidade de turnos realizados.
- Total de litros vendidos nos turnos vinculados.
- Total financeiro movimentado.
- Fechamentos conferidos.
- Quantidade de sobras.
- Quantidade de faltas.
- Histórico de divergências.

Os relatórios devem apresentar dados objetivos, sem presumir responsabilidade por divergências.

8.5 Relatório de divergências

Apresentar:

- Data.
- Turno.
- Frentista.
- Responsável pelo fechamento.
- Valor da diferença.
- Classificação.
- Justificativa.

Permitir filtrar por período e funcionário.

8.6 Exportação

Todos os relatórios deverão permitir:

- Exportar PDF.
- Exportar Excel.
- Imprimir.

---

## [ ] Gestão de funcionários

9. GESTÃO DE FUNCIONÁRIOS

Criar cadastro de funcionários contendo:

- Nome completo.
- Status: ativo ou inativo.
- Data de cadastro.
- Usuário vinculado, quando houver.

Permitir:

- Cadastrar.
- Editar.
- Desativar.
- Consultar histórico.
- Associar funcionário a um fechamento.

---

## [ ] Usuários, autenticação e níveis de acesso

10. USUÁRIOS E NÍVEIS DE ACESSO

Implementar três níveis hierárquicos de permissão.

A autenticação deverá ser individual, com login e senha.

Cada funcionário deverá possuir sua própria conta.

10.1 FRENTISTA

O frentista terá acesso operacional.

Permissões:

- Fazer login.
- Visualizar seus próprios dados.
- Iniciar preenchimento de fechamento.
- Informar leituras iniciais e finais.
- Informar recebimentos.
- Registrar observações.
- Identificar-se como responsável pelo turno.
- Salvar rascunhos.
- Consultar seus próprios fechamentos.
- Gerar PDF dos fechamentos aos quais tem acesso.
- Compartilhar seus fechamentos pelo WhatsApp.

Restrições:

- Não acessar relatórios gerenciais.
- Não acessar configurações.
- Não cadastrar usuários.
- Não alterar preços.
- Não excluir fechamentos.
- Não visualizar dados restritos de outros funcionários.
- Não alterar fechamentos finalizados sem autorização.

10.2 GERENTE

O gerente terá acesso à gestão operacional.

Permissões:

- Todas as funcionalidades operacionais.
- Visualizar todos os fechamentos.
- Acessar o dashboard completo.
- Consultar faturamento diário e mensal.
- Consultar recebimentos.
- Consultar vendas por combustível.
- Consultar relatórios por funcionário.
- Consultar divergências.
- Acompanhar turnos pendentes.
- Cadastrar e editar frentistas.
- Aprovar justificativas.
- Autorizar correções operacionais.
- Solicitar ou executar reabertura de fechamentos conforme política definida pelo administrador.
- Gerar PDFs individuais e consolidados.
- Compartilhar relatórios pelo WhatsApp.

Restrições:

- Não criar administradores.
- Não alterar permissões de administradores.
- Não excluir permanentemente registros financeiros.
- Não modificar configurações exclusivas do administrador.

10.3 ADMINISTRADOR

O administrador terá controle completo.

Permissões:

- Todas as funcionalidades do gerente.
- Criar usuários.
- Editar usuários.
- Desativar e reativar contas.
- Criar gerentes.
- Criar outros administradores.
- Definir níveis de acesso.
- Redefinir senhas por fluxo seguro.
- Configurar preços.
- Configurar tolerância financeira.
- Cadastrar e editar bicos.
- Configurar turnos.
- Alterar informações empresariais.
- Configurar a aplicação.
- Consultar todos os relatórios.
- Consultar auditoria.
- Gerenciar backups.
- Autorizar reabertura de fechamentos.
- Gerenciar todas as operações.

10.4 Gestão de usuários

Criar uma página chamada "Usuários e Permissões".

Apresentar:

- Nome.
- Nome de usuário.
- Nível de acesso.
- Status.
- Data de criação.
- Último acesso.

Permitir criar, editar, desativar, reativar e redefinir acesso.

Não permitir contas compartilhadas.

Implementar controle de permissões tanto no frontend quanto no backend.

Não basta esconder botões na interface: as operações devem ser bloqueadas também no servidor e no banco de dados.

---

## [ ] Banco de dados, persistência, segurança e offline

11. PERSISTÊNCIA DE DADOS E BANCO DE DADOS

Este requisito é CRÍTICO.

A aplicação deverá possuir banco de dados real, persistente e hospedado em infraestrutura de backend.

Sugestão tecnológica:

- Supabase.
- PostgreSQL.
- Supabase Auth.
- Row Level Security (RLS).

Também poderá ser utilizada outra arquitetura equivalente, desde que ofereça os mesmos recursos.

Não utilizar LocalStorage ou SessionStorage como banco de dados principal.

Os dados deverão permanecer salvos mesmo quando:

- O usuário fechar o navegador.
- O usuário sair da conta.
- O dispositivo for desligado.
- A aplicação for atualizada.
- O usuário acessar de outro celular.
- O usuário acessar de outro computador.

Armazenar permanentemente:

- Usuários.
- Funcionários.
- Fechamentos.
- Leituras dos bicos.
- Preços aplicados.
- Recebimentos.
- Diferenças.
- Observações.
- Relatórios e dados históricos.
- Configurações.
- Auditoria.

Cada fechamento deverá possuir um identificador único.

Segurança

- Autenticação segura.
- Senhas protegidas.
- Controle de permissões.
- Políticas RLS.
- Proteção dos dados.
- Backups.
- Validação no backend.
- Registro de alterações.
- Proteção de credenciais administrativas.

Não expor chaves privadas no frontend.

Funcionamento offline

Implementar suporte a conexão instável.

Permitir salvar rascunhos localmente e sincronizar quando a internet retornar.

Exibir os estados:

- Online.
- Offline.
- Sincronizando.
- Sincronizado.
- Falha de sincronização.

Nunca informar que um fechamento foi concluído sem confirmação de gravação no servidor.

Implementar proteção contra registros duplicados durante sincronizações.

---

## [ ] Auditoria e rastreabilidade

12. AUDITORIA E RASTREABILIDADE

Criar módulo de auditoria.

Registrar:

- Usuário que criou o fechamento.
- Usuário que conferiu.
- Usuário que alterou.
- Informação alterada.
- Valor anterior.
- Valor novo.
- Data e horário.
- Justificativa.

Fechamentos finalizados não poderão ser excluídos silenciosamente.

Qualquer correção deverá gerar um novo registro de auditoria.

---

## [ ] Configurações administrativas

13. CONFIGURAÇÕES

Criar área administrativa para configurar:

- Nome do posto.
- Logotipo.
- CNPJ.
- Endereço.
- Preços dos combustíveis.
- Tolerância de diferença.
- Usuários.
- Permissões.
- Funcionários.
- Bicos.
- Turnos.
- Dados gerais.

Dados empresariais iniciais

Empresa: D ANDRADE SAMPAIO LTDA.

Nome fantasia: POSTO J. SAMPAIO.

CNPJ: 46.691.152/0001-89.

Endereço: Rua Hildenora Gusmão, 231 – Centro.

Cidade: Vargem Grande/MA.

CEP: 65430-000.

---

## [ ] Aplicação instalável PWA

14. APLICAÇÃO WEB INSTALÁVEL — PWA

A aplicação deverá ser uma Progressive Web App.

Requisitos:

- Instalação em Android.
- Instalação em computadores compatíveis.
- Suporte à instalação em iOS, respeitando as limitações do navegador.
- Ícone próprio.
- Tela de abertura personalizada.
- Interface responsiva.
- Navegação semelhante a aplicativo nativo.
- Boa performance.
- Service Worker.
- Manifest.
- Suporte a funcionamento offline para recursos compatíveis.
- Sincronização de dados.

O usuário deverá conseguir instalar o sistema na tela inicial do celular e utilizá-lo como um aplicativo convencional.

---

## [ ] Arquitetura preparada para expansão

15. ARQUITETURA PREPARADA PARA EXPANSÃO

Inicialmente, o sistema será utilizado pelo Posto J. Sampaio.

Entretanto, desenvolver a arquitetura pensando em uma futura expansão para outras unidades.

Preparar a estrutura para permitir:

- Cadastro de novas unidades.
- Usuários vincula


## Evolução mobile, estoque e divergências — solicitação de 21/11/2026

### [ ] Experiência mobile e navegação
- Reorganizar o dashboard para smartphones: cards adaptados, indicadores em duas colunas quando adequado, gráficos responsivos, textos e valores sem cortes, botões com áreas de toque confortáveis, espaçamentos claros e filtros fáceis de usar.
- No celular, oferecer navegação inferior para Início, Fechamentos, Estoque, Relatórios e Mais; no desktop, manter a navegação lateral.
- Revisar os formulários existentes: largura de campo adequada, teclado numérico para valores/leituras, seletores acessíveis, erros legíveis, botões claros, prevenção de envio duplicado e campos importantes não encobertos pelo teclado virtual.
- No fechamento mobile, mostrar cada bico em card individual em vez de tabela larga; organizar o preenchimento em etapas, destacar cálculos automáticos, facilitar a navegação entre campos e manter as informações essenciais visíveis.
- Revisar login, dashboard, fechamentos, histórico, relatórios, usuários, configurações e módulos novos em 320, 360, 375, 390, 412 e 430 px, além de tablets e computadores; corrigir sobreposição, rolagem horizontal indevida, botões cortados e texto ilegível.

### [ ] Cadastro de tanques, entradas, saídas, medições e histórico
- Criar área “Estoque e Tanques” para controle de combustível armazenado, entradas, saídas, quantidade disponível, consumo médio, autonomia e reposição.
- Administrar tanques com nome/identificação, código, combustível, capacidade total, capacidade operacional, estoque mínimo, estoque inicial, data do último abastecimento e status ativo/inativo. Disponibilizar inicialmente Gasolina Comum e Diesel S10, permitir mais de um tanque por combustível e preparar novos combustíveis para inclusão futura.
- Registrar entrada com tanque, combustível, fornecedor, número da nota, data/horário, litros, valor total, preço por litro, responsável, observações e comprovante opcional; atualizar o saldo automaticamente, impedir duplicidade e manter o histórico.
- Ao finalizar um fechamento, gerar saída vinculada ao tanque e aos litros por bico. Se houver mais de um tanque para o mesmo combustível, exigir configuração da origem por bico ou regra de distribuição; não inventar distribuição. Edição, reabertura ou reprocessamento não pode duplicar baixa; cada movimento tem chave única.
- Calcular estoque teórico = estoque inicial + entradas − saídas − baixas autorizadas. Manter toda movimentação. Baixa extraordinária exige quantidade, motivo, data, responsável e autorização conforme papel; não permitir alteração silenciosa.
- Registrar medição física com tanque, data/horário, volume, responsável e observações; comparar estoque teórico, físico, diferença em litros e percentual. Não substituir automaticamente o teórico; divergências ficam registradas para investigação e ajuste autorizado.
- Estimar autonomia usando histórico real de vendas e permitir médias de 7, 15 e 30 dias. Exibir litros disponíveis, média diária, autonomia, data prevista de esgotamento e projeção para os próximos dias. Sem histórico suficiente, indicar baixa confiabilidade; média zero não gera previsão artificial.
- Alertar estoque abaixo/próximo do mínimo, autonomia menor que 3 ou 2 dias, divergência físico/teórico e tanque sem atualização recente; configurar limites individualmente por tanque e destacar no dashboard.
- Criar Planejamento de Reposição considerando estoque, capacidade operacional, mínimo, consumo médio, prazo de entrega e reserva de segurança; sugerir quantidade limitada pela capacidade disponível, sem fazer pedidos automaticamente.
- Histórico de movimentos informa data, tanque, tipo, entrada/saída, quantidade, responsável, documento e saldo resultante; filtros por período, tanque, combustível e tipo. Relatórios incluem estoque atual, entradas, saídas, consumo, média diária, autonomia, diferenças físico/teórico, abastecimentos e custo de aquisição, com exportação PDF e Excel.

### [ ] Estoque dos tanques no dashboard
- Exibir obrigatoriamente “ESTOQUE DOS TANQUES” logo abaixo dos indicadores financeiros principais, com um card por tanque cadastrado e atalho para seus detalhes.
- Cada card mostra identificação, combustível, litros teóricos disponíveis, capacidade total, percentual de ocupação, barra de capacidade em relação à capacidade operacional, autonomia, média diária, previsão de esgotamento e situação. Priorizar litros, barra, autonomia e capacidade.
- Cards ficam lado a lado no computador e em coluna no celular. Cores de estoque confortável/atenção/crítico usam faixas configuráveis; card crítico recebe destaque visual.
- Atualizar após fechamento finalizado, entrada, medição, movimento ou correção autorizada. Estoque principal usa o teórico; última medição aparece separadamente como informação complementar.
- Não preencher tanques nem quantidades de exemplo: antes de cadastro real, mostrar instrução de configuração, não valores simulados.

### [ ] Controle de divergências, histórico e resumo mensal
- Criar “Controle de Divergências” integrado ao fechamento. Toda sobra/falta finalizada gera ocorrência vinculada ao fechamento, data, turno, frentista, conferente, tipo, valor, justificativa e status, sem depender de cadastro manual. Não apagar ocorrências individuais ao calcular saldo.
- Usar o funcionário já associado ao fechamento. Se houver vários responsáveis, permitir identificá-los e registrar uma regra explícita de atribuição; não imputar automaticamente a divergência inteira a uma única pessoa sem fundamento.
- Histórico individual apresenta fechamentos realizados/conferidos, contagens e valores de sobras/faltas, saldo acumulado e detalhes cronológicos; gráficos mensais mostram frequência e valores. Cada ocorrência permanece individual.
- “Fechamento mensal de divergências” permite selecionar mês/funcionário e mostra quantidades de fechamentos, conferidos, sobras e faltas, total de sobras, total de faltas e saldo líquido = sobras − faltas; lista todas as ocorrências e permite gerar PDF.
- Cada ocorrência pode ser Pendente de análise, Em investigação, Justificada, Encerrada sem desconto, Encaminhada para análise administrativa ou Resolvida. Gerente/administrador registra comentários, justificativas, evidências, resultado e responsável pela decisão. Não presumir culpa por falta financeira.
- Análise de Ajustes de Folha registra funcionário, período, ocorrência, valor original, valor eventualmente aprovado, justificativa, aprovador, data e situação (Não elegível, Aguardando análise, Aguardando autorização, Aprovado, Rejeitado, Encaminhado à folha, Processado). Nunca descontar automaticamente, presumir culpa, compensar sobras e faltas ou encaminhar sem análise individual, documentação, autorização e validação administrativa/jurídica aplicável (incluindo art. 462 da CLT).
- Relatório mensal administrativo inclui funcionário, contagens, totais, saldo, ocorrências pendentes/justificadas e eventuais ajustes aprovados; permite ordenar por quantidade/valor, sem classificar pessoas como culpadas.

### [ ] Permissões, integridade, auditoria e segurança dos módulos
- Preservar os papéis atuais e aplicar autorização no backend, banco e interface: frentista sem acesso ao estoque geral/movimentos/ocorrências de terceiros/ajustes de folha; consulta às próprias ocorrências conforme configuração. Gerente consulta estoque, registra entradas/medições/movimentos autorizados, analisa divergências e consulta relatórios, mas não aprova folha salvo autorização expressa. Administrador configura tanques/alertas, gerencia movimentos e divergências e autoriza análises administrativas.
- Usar o banco atual e migrações versionadas, preservando todos os registros; não criar base isolada. Fechamentos alimentam saídas; entradas atualizam saldo; medições permitem conciliação; histórico real alimenta autonomia; ocorrências alimentam histórico e consolidação mensal; dashboard apresenta tanques.
- Registrar alterações importantes em auditoria. Edições e reaberturas não geram movimentação de estoque ou ocorrência duplicada. Movimentos não são alterados silenciosamente; correções têm rastreabilidade.
- Validar fluxos sem introduzir dados de teste no banco compartilhado de desenvolvimento/publicação; testar por checagem de tipos, testes unitários isolados e inspeção dos caminhos integrados.

### [ ] Validação integrada de aceite
- Verificar responsividade de páginas, formulários, tabelas, gráficos, menus, barra inferior, navegação e geração PDF em celular.
- Verificar cadastro de tanque, estoque inicial, entrada, atualização de saldo, saída de fechamento, medição física, diferença, autonomia, alertas e sugestão de reposição.
- Verificar cards dos tanques no dashboard e atualização após cada movimento, com responsividade e estados sem dados.
- Verificar ocorrência de sobra e falta, vínculo ao funcionário correto, histórico individual, relatório mensal, justificativas e decisões sem desconto automático.
- Confirmar preservação de dados existentes, persistência, permissões por perfil, auditoria e ausência de duplicidade.


## Correções solicitadas — login, logout, impressão e dados persistidos (21/11/2026)

### [ ] Login claro e responsivo
- O botão de login deve mostrar claramente “Entrar”, permanecer visível em vários tamanhos de tela e funcionar normalmente.
- Durante o carregamento, deve haver indicação visual e o botão nunca pode ficar vazio.
- Preservar a identidade visual, validação existente e o fluxo seguro de criação inicial quando aplicável.

### [ ] Logout, rotas protegidas e navegação Voltar
- Encerrar a sessão no cliente e no backend, revogar a sessão/token válido e limpar tokens e dados privados autenticados do cache.
- Após logout, redirecionar para o login usando substituição segura do histórico; rotas protegidas devem exigir sessão também quando acessadas diretamente.
- O botão Voltar não pode revelar conteúdo protegido depois do logout; nova restauração de página deve revalidar a sessão.
- Exigir confirmação antes de encerrar sessão para evitar logout acidental.
- Verificar o comportamento em celular e computador. Se o logout falhar, não simular sucesso nem remover estado local antes da confirmação do servidor.

### [ ] Impressão completa de fechamentos existentes
- A impressão deve identificar estabelecimento, data, frentista e responsável.
- Incluir os registros persistidos dos quatro bicos: leituras inicial/final, litros vendidos, preço por litro e valor por bico; incluir recebimentos por modalidade, totais, diferença, resultado e observações.
- A folha deve ser A4, legível, paginada e sem cortes, sobreposição ou elementos desnecessários da interface; compatível com desktop e Android.
- Usar os valores gravados sem recalcular ou alterar os registros do fechamento.

### [ ] Exibição confiável dos dados já persistidos
- Diagnosticar conexão e versão de esquema/tabelas, queries, permissões, filtros, autenticação, mapeamento/serialização, atualização assíncrona e estados de loading/ausência/erro.
- Após correção autorizada, registros existentes devem aparecer no histórico/detalhe/dashboard e permanecer disponíveis após refresh e novo login.
- Não criar amostras, duplicar registros, trocar banco, apagar dados ou apresentar falhas como “nenhum registro”/zeros; oferecer retry e informar falhas de forma explícita.
- Verificar paginação/limites para que registros persistidos mais antigos não sejam silenciosamente omitidos.

### [ ] Preservação de dados e migração segura (pendente)
- Preservar arquitetura, usuários, senhas, histórico e registros existentes; não limpar tabelas, recriar usuários, duplicar registros nem executar migração destrutiva.
- Antes de qualquer alteração estrutural, obter backup verificável do banco compartilhado e aplicar somente migração segura/reversível após aprovação explícita; documentar o escopo do DDL.
- Diagnóstico confirmado: `closures.list` falha porque falta `closures.revision`; `0002_inventory_discrepancies` e `0003_payroll_review_revisions` ainda não constam como aplicadas. Até autorização e migração segura, mostrar erro explícito; nenhuma escrita/migração foi executada.

### [ ] Aceite integrado solicitado
- Verificar login válido e inválido; logout e revogação; tentativa de voltar; acesso direto a rota protegida sem sessão.
- Verificar impressão de um fechamento existente, completo e A4.
- Verificar persistência e exibição após refresh e novo login.
- Inspecionar responsividade em Android e computador.
- Manter cada fluxo sem evidência real marcado como pendente; não declarar os quatro problemas corrigidos apenas por build/teste unitário.

### Evidências parciais e bloqueios registrados em 21/11/2026
- Login inválido com usuário fictício exibiu “Usuário ou senha incorretos.”; o usuário entrou pelo Preview usando uma conta existente. O botão “Entrar” foi verificado visualmente em desktop e viewport móvel de 390 px.
- O botão Sair foi disparado pelo DOM porque a camada do Preview interceptava o clique visual. O ramo de cancelamento de `window.confirm` manteve a sessão; o ramo afirmativo levou a `/login`, e uma consulta posterior a `auth.me` respondeu HTTP 401 / `UNAUTHORIZED`. O acesso direto a `/historico` sem sessão e Voltar após logout permaneceram no login. Não foram encontrados tokens ou chaves de autenticação em `sessionStorage`/`localStorage`. A exibição nativa da confirmação e a responsividade autenticada em Android físico ainda não foram verificadas.
- Os testes unitários cobrem conteúdo/escape da ficha A4 e passaram; a impressão de um fechamento real não foi validada porque o detalhe persistido falha pela coluna `closures.revision` ausente. Também permanecem pendentes a exibição dos dados após migração autorizada, refresh e novo login.
- `pnpm check`, `pnpm test` (27 testes em 7 arquivos), `pnpm build` e `git diff --check` passaram. Build: avisos de chunk grande e script existente no `index.html`, sem falha.
- As migrações `0002_inventory_discrepancies` e `0003_payroll_review_revisions` continuam pendentes. Nenhuma migração, escrita, exclusão ou inserção foi executada no banco compartilhado; aguardar backup privado verificável e aprovação explícita antes de qualquer DDL.
- As correções permanecem sem aceite integrado e os itens acima continuam abertos. `publishing.auto_publish=false`; o site não foi publicado.
