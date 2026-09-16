# App Campo — Contexto do Projeto

> Projeto separado do Arato (repo `/Users/ginomigotto/agrofield`), mas **compartilha o mesmo banco Supabase**.
> Se você é uma sessão nova do Claude Code neste diretório: leia este arquivo inteiro antes de
> qualquer tarefa — ele contém, na seção 2, um resumo completo do sistema Arato para você entender
> o que os dois projetos compartilham de verdade e o que não compartilham. Não é necessário abrir
> o CLAUDE.md do repo do Arato principal (`/Users/ginomigotto/agrofield/CLAUDE.md`) para trabalhar
> aqui — mas ele é a fonte completa se precisar de mais detalhe do que está resumido abaixo.

---

## 1. O QUE É O APP CAMPO

App mobile-first para uso **no campo** por operadores que não são os gestores/donos que já usam
o Arato principal — tratorista, encarregado, agrônomo de campo. Substitui anotação em papel/WhatsApp
por lançamento direto no sistema: plantio, pulverização, colheita, romaneio, adubação, correção de solo.

**Produto comercial separado do Arato:**
- Vendido separadamente, com cobrança própria (consultor negocia manualmente — não há billing
  automatizado no sistema hoje, mesmo padrão do add-on `ia_cedula`)
- **Na prática, hoje: só vendido como upsell para conta Arato já existente** (decisão tomada em
  modelagem — não suporta onboarding standalone na v1)
- Administrado pelo mesmo time Raccolto que administra clientes Arato, porém em uma área dedicada
  do painel admin (`/admin/campo` no repo do Arato principal) — não misturado com "Add-ons Opcionais"
  do `conta_modulos`, porque é um produto com usuários e ciclo comercial próprios, não um feature-flag

---

## 2. CONTEXTO COMPLETO DO ARATO — O SISTEMA QUE COMPARTILHAMOS O BANCO

Esta seção é um resumo fiel do CLAUDE.md do Arato principal, cortado para o que importa para quem
grava dados no mesmo banco: identidade do produto, arquitetura, inventário de tudo que já existe,
glossário, convenções e — mais importante — as armadilhas conhecidas e os débitos técnicos que
qualquer escrita nova nas mesmas tabelas precisa respeitar. **Não inclui** a narrativa histórica de
como o Arato foi concebido (engenharia reversa de um ERP Delphi de referência, sessão a sessão) —
isso é irrelevante para codar aqui; se precisar dela, está no CLAUDE.md do repo principal.

### 2.1 Identidade do produto

- **Produto:** Arato (RacTech) — ERP agrícola SaaS, cliente é o fazendeiro/produtor rural,
  vendido por um consultor do agronegócio em Nova Mutum — MT
- **Posicionamento:** automação máxima — toda funcionalidade nasce da pergunta "o sistema pode
  fazer isso sozinho?"; verde = o sistema fez, mostarda = o usuário fez (regra de UX válida nos
  dois produtos)
- Em produção real em `arato.agr.br` (Vercel), mas **ainda não publicado para clientes finais reais**
  — só uso interno/piloto até o momento desta modelagem (conferir status atual antes de assumir)

### 2.2 Stack do Arato

Next.js 16 (App Router) · TypeScript · CSS inline (sem Tailwind, sem libs de UI) · PostgreSQL via
Supabase · Supabase Auth (`@supabase/ssr`) · Supabase Storage (XMLs NF-e, PDFs) · Resend (e-mail) ·
Vercel (deploy + Cron Jobs) · `proxy.ts` (não `middleware.ts` — convenção do Next.js 16 já adotada).
**Idêntica** à stack do App Campo — só não compartilhamos o deploy nem o domínio.

### 2.3 Arquitetura de dados — o modelo de tenant que o App Campo herda

```
contas (raiz do tenant SaaS)
 ├── fazendas (conta_id) — propriedade rural real, tem CNPJ/CPF, CAR, ITR, NIRF
 ├── produtores (conta_id) — pessoa física/jurídica dona da operação
 └── perfis (conta_id + fazenda_id) — usuário logado; fazenda_id = "fazenda ativa" no momento
```
- Um produtor real pode ter **múltiplas fazendas** — por isso `contas` existe como raiz acima de
  `fazendas`, não o contrário
- RLS: `fazendas`/`produtores` só visíveis se `conta_id` bate com a conta do `perfil` do usuário
  logado (`auth.uid()`) — **mais** um bypass total para `perfis.role = 'raccotlo'` (equipe Raccolto)
- Farm switcher: conta com >1 fazenda mostra dropdown no `TopNav`; troca chama
  `setFazendaAtiva()`, que atualiza `perfis.fazenda_id` no banco
- **Regra absoluta repetida várias vezes na história do projeto:** dado do cliente é sempre
  filtrado por `conta_id`, nunca por `fazenda_id`, **exceto** dados genuinamente físicos de uma
  propriedade (estoque físico, talhões, NFs, romaneios) — esses sim são por `fazenda_id`. Isso vai
  valer igual para qualquer tabela nova que o App Campo criar ou estender: pense sempre "isso é do
  produtor (conta) ou é fisicamente desta fazenda?" antes de escolher a FK.
- `ciclos` é a tabela real de operação (cultura + ano safra) — **`safras` está vazia, nunca usar**.
  Toda operação de lavoura (plantio, pulverização, colheita, adubação, correção de solo) usa
  `ciclo_id NOT NULL REFERENCES ciclos`. O App Campo vai gravar nessas mesmíssimas tabelas, então
  qualquer tela de lançamento de campo precisa de um seletor de Ano Safra → Ciclo, igual ao Arato
  principal (com auto-seleção do ciclo ativo por data, já implementado lá — replicar o mesmo UX)
- Padrão "Sem Fazenda Ativa": várias telas do Arato não dependem de uma fazenda "ativa" global,
  cada tela tem seu próprio seletor explícito (`fazTrabalho`) carregado no mount — importante
  porque o operador de campo do App Campo também não vai ter uma única fazenda fixa (ele alterna
  entre as fazendas permitidas), então esse é o padrão a seguir, não o farm-switcher fixo

### 2.4 Inventário completo de módulos/telas que já existem no Arato

Isto existe **hoje** no Arato principal — antes de propor uma tela nova no App Campo, checar se
não é duplicar algo que já roda lá (mesmo que numa UI desktop, não mobile):

**Lavoura / operações de campo** (as tabelas que o App Campo vai gravar):
`app/lavoura/page.tsx` (safras/ciclos/cronograma), `plantio`, `pulverizacao`, `colheita` (com
romaneio unificado via `romaneios_entrada` — fluxo 2 passos: peso bruto → tara+classificação),
adubação de base e correção de solo (telas próprias, tabelas `adubacoes_base`/`correcoes_solo`),
`planejamento` (orçado × realizado), `relatorios/aplicacoes` (relatório PDF/XLSX/WhatsApp)

**Fiscal:** `fiscal` (NF-e), `lcdpr` (Livro Caixa Digital do Produtor Rural, reconstruído leiaute
1.3 da Receita Federal), `fiscal/sped-contabil` (SPED ECD)

**Financeiro:** `financeiro` (fluxo de caixa), `financeiro/receber`, `financeiro/pagar`,
`financeiro/contratos` (contratos financeiros/cédulas de crédito, com extração por IA — add-on
`ia_cedula`), `financeiro/endividamento`, `financeiro/tesouraria` (mútuo entre empresas),
`financeiro/seguros`, `financeiro/consorcios`

**Comercialização de grãos:** `contratos` (venda/compra, romaneio, NF-e automática),
`contratos/arrendamento`, `contratos/compromissos-graos` (relatório read-only), `comercial/faturamento`

**Estoque e compras:** `estoque` (posição/NF entrada/terceiros/movimentações),
`estoque/graos`, `estoque/kardex`, `compras` (pedidos de compra), `compras/nf` (NF de produtos —
**não confundir com nf-servico**), `compras/nf-servico` (NFS-e — layout varia por município)

**Transporte e expedição:** `transporte/cadastros`, `transporte/cte`, `transporte/mdfe`, `expedicao`

**Algodão (add-on):** `algodao` — safra/bicudo/módulos/beneficiamento/HVI/posição — já cobre
parte do domínio "campo" só para algodão (armadilhas de bicudo, colheita/módulos), dentro do
Arato desktop — vale olhar antes de desenhar telas de campo equivalentes para outras culturas

**Cadastros e configuração:** `cadastros` (11 abas: produtores, fazendas, pessoas, safras&ciclos,
máquinas, combustíveis, funcionários, usuários, tabelas auxiliares, insumos, depósitos, padrões de
classificação), `configuracoes/modulos` (Parâmetros do Sistema: fiscal/MDF-e/transportes/
integrações/expedição), `configuracoes/rateio`, `configuracoes/automacoes`,
`configuracoes/contabilidade`, `configuracoes/importacao`

**Relatórios e análise:** `relatorios` (fluxo de caixa + análise de sensibilidade),
`relatorios/dre` (DRE Agrícola), `custos` (Custos Totais por Ano Safra), `bi` (endividamento,
posição de grãos comprometidos)

**Admin Raccolto (equipe interna):** `admin/modulos` (toggle de add-ons por conta via
`conta_modulos`), `api/admin/novo-cliente` (onboarding) — **é aqui que `/admin/campo` vai nascer**

### 2.5 Glossário do agronegócio (válido nos dois projetos)

```
Fazenda          propriedade rural. Tem CNPJ/CPF, CAR, ITR, NIRF
Talhão           subdivisão operacional. Unidade de plantio. Tem ha, GPS, solo
Safra (ciclo)    ciclo produtivo: cultura + talhões + ano agrícola — tabela real é `ciclos`
Cultura          soja, milho 1ª, milho 2ª (safrinha), algodão, sorgo, trigo
Insumo           semente, fertilizante (N/P/K), defensivo, inoculante
Operação         plantio, adubação, pulverização, colheita, transporte
Produtividade    sacas por hectare (sc/ha). MT soja média: 60-65 sc/ha
Saca (sc)        60kg. Padrão para soja, milho, trigo
Arroba (@)       15kg. Padrão para algodão e boi
Romaneio         documento de pesagem de caminhão (entrada/saída de grãos)
Armazém/Depósito estocagem. Capacidade em sacas
Classificação    análise do grão: umidade, impureza, avariados, PH (ABIOVE soja / IN MAPA 60 milho)
CP / CR          Conta a Pagar / Conta a Receber
CFOP / CST / NCM códigos fiscais obrigatórios em NF-e
Funrural         contribuição previdenciária do produtor rural
CAR / ITR / NIRF Cadastro Ambiental Rural / Imposto Territorial Rural / Nº Imóvel na Receita Federal
Certificado A1   certificado digital para assinar NF-e. Vence anualmente
DANFE            Documento Auxiliar da NF-e (versão impressa/PDF)
LCDPR            Livro Caixa Digital do Produtor Rural — obrigação fiscal do produtor PF
```

### 2.6 Convenções de código e paleta visual

```typescript
"use client";
// Estilos sempre inline — sem Tailwind, sem CSS modules
// Bordas: 0.5px solid · Border-radius: 8px elementos, 12px cards
// FontWeight: 400 normal, 600 negrito · FontSize: 13px base, 11px labels, 15-17px headings
// Verde = automático. Mostarda/Roxo = ação do usuário. Sempre.
// Gerar arquivos completos — sem placeholders, sem TODOs
```
Paleta do Arato (logo inspirada em oliveira): azul petróleo `#1A4870` (principal), azul escuro
`#0B2D50`, mostarda `#C9921B` (ação manual do usuário), fundo geral `#F4F6FA`, vermelho `#E24B4A`
(erro/urgência alta), laranja `#EF9F27` (atenção média), verde `#16A34A` (positivo/automático).
App Campo pode herdar essa paleta por consistência de marca — **mas o layout não é herdado**: lá é
desktop com `TopNav` horizontal, aqui é mobile-first de verdade (ver seção 7).

### 2.7 Armadilhas conhecidas — valem para qualquer código que toque este banco

Essas são lições pagas com bugs reais em produção no Arato. O App Campo vai escrever nas mesmas
tabelas, então herda os mesmos riscos:

- **Paginação padrão do Supabase é 1.000 linhas.** Qualquer `select` que possa passar disso sem
  `.range()` em loop retorna contagem/lista silenciosamente truncada — já causou diagnóstico
  errado várias vezes no Arato. Qualquer tela de listagem no App Campo (histórico do operador,
  fila de aprovação) precisa paginar explicitamente desde o início.
- **`.maybeSingle()` + chave duplicada é uma bomba silenciosa.** Se dois registros batem no mesmo
  filtro, `.maybeSingle()` retorna erro `PGRST116` (tratado como "não encontrado" se o código não
  checar o erro), e cada nova tentativa cria mais um duplicado — foi a causa raiz de uma
  duplicação de 91 grupos de cadastro de pessoas no Arato. Preferir `.limit(1)` + indexação de
  array em qualquer lookup que não tenha garantia forte de unicidade.
- **RLS `42501` mesmo com policy correta quase sempre é JWT expirado**, não erro de permissão de
  verdade — resolvido no Arato com API route usando `service_role_key`. Se o App Campo tiver
  algum `INSERT`/`UPDATE` sensível a sessão longa (operador no campo o dia todo sem recarregar a
  página), esse é o padrão a usar: API route própria em vez de escrita direta do client quando a
  sessão pode ter expirado.
- **`conta_id` vs `fazenda_id`** — ver regra em 2.3. Errar essa escolha em uma tabela nova é o tipo
  de bug que só aparece quando o cliente tem 2+ fazendas, semanas depois de lançado.

### 2.8 Débitos técnicos conhecidos que afetam dados que o App Campo também vai gravar

- **Custo médio perpétuo** — pendente adicionar `custo_unitario_na_baixa` em
  `movimentacoes_estoque`; hoje o DRE usa o custo médio *atual* como aproximação para baixas
  passadas. Toda colheita/romaneio que o App Campo gerar entra nesse mesmo cálculo aproximado.
- **CFOP fragmentado em 4 sistemas** (`contratos`, `comercial/faturamento`,
  `operacoes_fiscais`/`ncm_tributacoes`) — consolidação começada (migration + `lib/operacoes-fiscais.ts`
  no repo do Arato) mas **não finalizada nem confirmada como executada**. Não é algo que o App
  Campo toca diretamente (é comercialização/fiscal), mas se algum dia o App Campo precisar de CFOP
  para alguma operação, checar o estado real dessa consolidação antes de reaproveitar qualquer um
  dos 4 sistemas antigos.
- **Consumo de insumo → lançamento financeiro automático:** quando uma operação de lavoura no
  Arato principal (plantio/pulverização/adubação) consome insumo do estoque, existe uma rota
  (`app/api/estoque/consumir-estoque/route.ts` no repo do Arato) que gera a baixa de estoque **e**
  o lançamento de custo vinculado ao `ciclo_id`, que por sua vez alimenta DRE e Custos. **Resolvido
  para o App Campo:** o gatilho é o momento da **aprovação** (ver 4.3), não a criação do
  lançamento — nunca reinventar o cálculo de custo médio em paralelo, ou DRE e Custos do Arato
  principal e do App Campo vão divergir silenciosamente. Existe uma rota equivalente já pronta em
  `app/api/campo/consumir-estoque/route.ts` (ver 2.9) — **mas ela grava direto, sem esperar
  aprovação nenhuma**, então portar essa rota exige adicionar a condicional de `status_campo =
  'aprovado'` antes de disparar a baixa, não portar como está.
- **Migrations com status incerto** no repo do Arato: seções de arrendamento (34/43) e a de
  transporte/romaneio-entrada (60/61) — mencionadas aqui só para lembrar que "existe no
  `supabase_migrations.sql`" não é garantia de "já rodou no banco de produção"; sempre confirmar
  com o dono antes de assumir que uma coluna existe.

### 2.9 IMPORTANTE — já existe um App Campo dentro do Arato principal (mantido intocado)

Correção de um engano registrado antes neste arquivo: a lógica `/campo` em `proxy.ts` **não é
resíduo obsoleto** — é a ponta de um módulo mobile inteiro, real e funcional, que já existe em
`app/campo/*` no repo do Arato principal. ~3.660 linhas, 8 telas de operação (Monitoramento,
Plantio, Adubação, Pulverização, Aplicação Aérea, Colheita, Abastecimento, Transferência), PWA
instalável, fila offline com sincronização, farm switcher — construído em sessões anteriores,
**nunca usado por nenhum cliente real** (confirmado direto no banco: `SELECT count(*) FROM perfis
WHERE role='campo'` → 0; zero registros com `origem_op_id` preenchido em qualquer tabela).

**Instrução explícita do dono: não tocar nesse módulo agora.** Ele fica exatamente como está,
funcionando, dentro do Arato principal — o app-campo novo é construído **em paralelo**, sem
substituir nada. Só depois que o projeto novo (aqui) atender à expectativa é que se decide
substituir o antigo — decisão futura, não agora.

**Isso não impede usar o código dele como referência/ponto de partida aqui** (copiar, não tocar no
original) — aproveitar é o que torna esse projeto muito mais rápido do que começar do zero:

**Decisão que resolve um fork real de arquitetura (12/set/2026):** enquanto isso, esta sessão já
tinha começado a construir uma camada nova — "Recomendações Agronômicas" (Plantio, Pulverização,
Adubação, Corretivo) e "Monitoramento" — que o `app/campo` antigo não tem: lá o operador lança
direto na tela de operação; aqui, uma recomendação de um Gerente Campo (ou um monitoramento com
nível alto/crítico) gera uma **Tarefa** atribuída a um Operador, e só a partir dela a tela de
execução abre. São dois modelos de entrada incompatíveis se coexistirem soltos. **Decisão: o
modelo de Tarefa vence — não existe lançamento avulso.** Ao portar as telas de operação do
`app/campo` (linha da tabela acima), adaptar pra **sempre exigir uma `tarefa_id` de origem**
(recomendação → tarefa → tela de execução preenche o que a tarefa já sabe e completa o resto) —
nunca abrir a tela de Plantio/Pulverização/etc. como formulário solto sem tarefa vinculada. Isso
não muda o que já foi construído aqui (Recomendações + Monitoramento seguem como estão), só fixa
como o código portado do `app/campo` antigo se encaixa nesse fluxo.

| Arquivo no repo do Arato principal | O que tem | Vale portar como está? |
|---|---|---|
| `app/campo/page.tsx`, `plantio/`, `pulverizacao/`, `colheita/`, `adubacao/`, `abastecimento/`, `transferencias/`, `monitoramento/`, `aerea/` | As 8 telas de operação completas, mobile dark theme | Sim, como base — adaptar pro modelo novo (login PIN, `status_campo`, `perfis.produto`) |
| `app/campo/CampoLayoutClient.tsx` | Layout mobile, barra inferior de navegação, seletor de fazenda | Sim — já resolve boa parte do que descrevemos em 2.3 (farm switcher) |
| `app/campo/login/page.tsx` | Login por e-mail+senha padrão (não PIN) | Referência de estrutura visual; lógica de auth muda pro modelo PIN decidido em 4.2 |
| `lib/offline-store.ts` | Fila offline **via `localStorage`** (não IndexedDB) + cache de catálogo com TTL de 12h — simples, já provado | **Sim, reaproveitar tal qual** — ver nota abaixo, isso simplifica a seção 4.6 |
| `components/campo/SyncButton.tsx` | Botão flutuante de sincronização com estados visuais (pendente/sincronizando/ok/erro) | Sim, como base |
| `app/api/campo/sync/route.ts` | Rota que recebe a fila e faz upsert idempotente no Supabase | Sim, como base — adaptar pra gravar `status_campo='pendente'` |
| `app/api/campo/consumir-estoque/route.ts` | Replica a lógica de baixa de estoque + lançamento de custo por categoria, sem depender da rota do desktop | Parcial — a lógica de cálculo serve de base, mas **grava direto, sem gate de aprovação** (ver 2.8/4.3); precisa adicionar a condicional `status_campo = 'aprovado'` antes de portar |
| `app/api/campo/transferencia*.ts` | Transferência de insumos entre fazendas/depósitos | Sim, como base |
| `public/sw.js` | Service worker **escrito manualmente** (132 linhas) — não usa `next-pwa` | Sim — resolve a dúvida "next-pwa vs manual" da seção 4.6: manual já funciona |
| Migration Seção 242 (`origem_op_id`) | Idempotência de sync já implementada em `plantios`/`pulverizacoes`/`colheitas`/`abastecimentos`/`adubacoes_base` | **Reaproveitar o padrão** — só falta estender pra `romaneios_entrada`/`correcoes_solo`, que ficaram de fora |

**Consequência prática para a seção 4.6 e 6 (revisado):** como `lib/offline-store.ts` já prova que
`localStorage` simples resolve bem o volume esperado (fila de operações de um dia de trabalho no
campo, não milhares de registros), **não introduzir IndexedDB/Dexie sem necessidade concreta** —
reaproveitar o padrão existente. Mesma lógica para o service worker: usar o `public/sw.js` existente
como base em vez de avaliar `next-pwa`.

---

## 3. RELAÇÃO COM O ARATO — O QUE FUNCIONA EM CONJUNTO E O QUE NÃO

### 3.1 Funciona em conjunto (compartilhado de verdade)

| Compartilhado |
|---|
| Banco Supabase (mesma `SUPABASE_URL`) |
| Modelo de tenant `contas` → `fazendas`/`produtores`/`perfis`, e a regra `conta_id` vs `fazenda_id` |
| `ciclos`/`talhoes`/`insumos` como catálogo (leitura) |
| Tabelas operacionais de lançamento: `plantios`, `pulverizacoes`, `colheitas`, `romaneios_entrada`, `adubacoes_base`, `correcoes_solo`, e por consequência `movimentacoes_estoque` |
| `monitoramento_pragas` (pragas/doenças/plantas daninhas — foto, GPS, nível de infestação) — não consome estoque nem gera custo, por isso fica fora do fluxo de aprovação da seção 4.3 |
| `supabase_migrations.sql` como fonte única de schema — vive só no repo do Arato principal |
| Convenções de código, paleta de cores, padrão de UX (verde=automático / mostarda=usuário) |
| Padrão `conta_modulos` para ativação/billing manual por conta |
| Todas as armadilhas e débitos técnicos da seção 2.7/2.8 — o mesmo banco, os mesmos riscos |

### 3.2 Não funciona em conjunto (isolado, fora do escopo do App Campo)

| Isolado | Por quê |
|---|---|
| Repositório de código, histórico git, deploy Vercel, domínio | Projetos tecnicamente separados por decisão do dono |
| Login — Arato usa e-mail real do gestor; App Campo usa e-mail sintético + PIN do operador | Público-alvo e UX de login diferentes |
| Fiscal (NF-e, NFS-e, LCDPR, SPED, MDF-e/CT-e) | Fora do domínio do operador de campo — nunca deve aparecer no App Campo |
| Financeiro (CP/CR, contratos financeiros, endividamento, tesouraria, seguros, consórcios) | Idem — dado sensível de gestão, não de campo |
| Comercialização de grãos (`contratos`, faturamento) | Idem |
| Admin Raccolto geral (`admin/modulos`) | O App Campo tem sua **própria** área dedicada (`admin/campo`), não usa a geral |
| `.env` — `SERVICE_ROLE_KEY` | Nunca existe no App Campo (app client-facing, só `ANON_KEY`) |

**Nota:** o módulo Algodão do Arato principal (`app/algodao/page.tsx`) já cobre parte do domínio
"campo" (bicudo, colheita/módulos) dentro do desktop — hoje ele **não** está no escopo do App
Campo v1, mas é candidato natural a integrar depois, já que a lógica de negócio é muito próxima.

---

## 4. MODELAGEM — DECISÕES FECHADAS (sessão de modelagem, set/2026)

Status: **modelagem aprovada, implementação ainda não iniciada.** Nenhuma migration abaixo foi
executada. Este arquivo é o plano — a implementação real (schema + telas) começa em sessão futura,
sob autorização explícita.

### 4.1 Escopo comercial
- Só upsell: todo operador do App Campo pertence a uma `conta_id` que já existe no Arato
- Ativação/desativação por conta é manual, feita pelo time Raccolto em `/admin/campo`

### 4.2 Perfis de usuário (login)
- **Não cria tabela nova** — estende `perfis` (já é a tabela de auth/RLS do Arato, chaveada em `auth.uid()`)
- Novo campo `perfis.produto` (`'arato'` default | `'campo'`) — distingue a qual app aquele perfil pertence
- Login: e-mail sintético (ex: `joao.silva@campo.raccolto.app`) + senha = PIN de 4-6 dígitos, via
  Supabase Auth padrão. Cadastro e reset de PIN feitos pelo **gestor** (dono da conta, dentro do
  Arato principal) ou pelo admin Raccolto — nunca self-service pelo operador
- Operador pode alternar entre várias fazendas da mesma conta (igual ao farm switcher do Arato
  principal hoje) — precisa do campo `perfis.fazendas_permitidas uuid[]` (lista explícita; não
  herda "todas" por padrão, por segurança)
- **Papéis dentro do App Campo (decisão 12/set/2026):** Gerente Campo, Operador, Apontador —
  reaproveita `perfis.papel` (coluna já existente no Arato, hoje livre) em vez de criar coluna
  nova; restrita a esses 3 valores só quando `produto='campo'` (ver
  `db/migrations-draft/007_papel_campo.sql`). Só quem tem `papel='gerente_campo'` aprova/rejeita
  na tela Aprovações (4.3) — não há aprovador designado por pessoa nem por tipo de operação.

### 4.3 Fluxo de aprovação (obrigatório na v1)
- Lançamento do operador **não** entra direto como definitivo — precisa ser aprovado por um
  Gerente Campo.
- **Decisão revisada (corrige uma versão anterior deste arquivo, que dizia "no Arato principal"):**
  a aprovação acontece **dentro do próprio App Campo**, numa tela "Aprovações" (ver seção 2 dos
  requisitos de telas) — **não** existe mais uma tela equivalente separada no Arato principal.
  Qualquer perfil Gerente Campo com acesso à fazenda pode aprovar/rejeitar — não há designação de
  um aprovador específico por fazenda nem roteamento por tipo de operação.
- **Notificação cross-app:** quando há algo pendente de aprovação (ou quando é aprovado/rejeitado),
  a notificação precisa alcançar tanto o App Campo quanto o Arato principal — um gestor que passa o
  dia no Arato desktop precisa saber que tem pendência, mesmo sem abrir o App Campo. **Mecanismo
  ainda não definido** (ver seção 5, pendência nova) — só a necessidade está confirmada.
- Padrão a aplicar em toda tabela que o App Campo escreve (`plantios`, `pulverizacoes`, `colheitas`,
  `adubacoes_base`, `correcoes_solo`, `romaneios_entrada`):
  - `status_campo` (`'pendente'` | `'aprovado'` | `'rejeitado'`, default `'aprovado'` — linhas
    criadas pelo Arato continuam sem fricção nenhuma)
  - `origem_lancamento` (`'arato'` default | `'app_campo'`)
  - `lancado_por_perfil_id uuid` — auditoria de quem lançou
  - `aprovado_por_perfil_id uuid`, `aprovado_em timestamptz`
- **Consumo de estoque e lançamento de custo só disparam na aprovação, nunca na criação do
  lançamento** (decisão nova — ver 2.8): um lançamento `status_campo = 'pendente'` não toca em
  `movimentacoes_estoque` nem em custo/DRE. Só quando `status_campo` vira `'aprovado'` é que a baixa
  de estoque e o lançamento de custo disparam. Vale só pra origem `app_campo` — lançamento do Arato
  principal continua `'aprovado'` por padrão e consome na hora, sem mudança nenhuma.
- **Custo de engenharia real e não-trivial:** toda leitura hoje existente que consome essas tabelas
  (DRE, Custos, Estoque/Kardex, relatórios de aplicação) precisa passar a filtrar
  `status_campo IS NULL OR status_campo = 'aprovado'` — senão um lançamento pendente de aprovação
  entra no DRE antes de ser validado. Isso é trabalho a mapear tabela por tabela antes de escrever
  a primeira tela do App Campo, não depois.

### 4.4 Permissão / RLS
- Perfil com `produto = 'campo'`: só enxerga dados das fazendas em `fazendas_permitidas`, e só das
  tabelas operacionais de lançamento de campo (leitura auxiliar: `ciclos`, `talhoes`, `insumos`
  como catálogo). **Zero acesso** a financeiro (`lancamentos`, `contas_pagar`, `contas_receber`,
  `contratos`, `contratos_financeiros`), fiscal, ou cadastros administrativos
- Precisa de policies novas (ou função auxiliar SQL `fn_fazendas_permitidas_campo(auth.uid())`)
  separadas das policies atuais baseadas em `conta_id` — o operador de campo é escopado por
  fazenda explícita, não pela conta inteira como o gestor Arato

### 4.5 Ativação / ambiente dedicado no admin
- `/admin/campo` (novo, no repo do Arato principal): lista de contas com App Campo habilitado,
  toggle de ativação (reaproveita padrão `conta_modulos`, `modulo = 'app_campo'`), cadastro/reset
  de operadores e PINs, quais fazendas cada operador acessa
- Login do App Campo só funciona se `perfis.produto = 'campo'` **E** a conta tiver
  `conta_modulos.app_campo.habilitado = true` — desativar a cobrança já barra o acesso sem precisar
  apagar cadastro de ninguém

### 4.6 Arquitetura offline — obrigatória desde a v1

Decisão fechada: o operador **precisa** conseguir abrir o app e lançar plantio/pulverização/
colheita/etc. sem sinal, e o dado sincroniza sozinho quando a conexão voltar. Isso muda a
arquitetura de forma real — não é um detalhe de UI, é uma camada inteira a mais entre a tela e o
Supabase. Decisões de design já tomadas para viabilizar isso:

- **App shell instalável (PWA):** service worker cacheando HTML/JS/CSS/ícones, pra o app abrir
  mesmo sem internet nenhuma (não só "sem sync", literalmente sem conseguir baixar a página).
  **Resolvido por precedente** (ver 2.9): o Arato principal já tem `public/sw.js` escrito à mão,
  132 linhas, sem `next-pwa` — portar esse arquivo como base em vez de avaliar bibliotecas.
- **Fila local:** todo lançamento do operador grava primeiro numa fila local antes de tentar ir
  pro Supabase — nunca escrita direta condicionada a estar online. **Resolvido por precedente**
  (ver 2.9): `lib/offline-store.ts` do Arato principal já faz isso com `localStorage` puro (sem
  IndexedDB/Dexie) e já está provado para o volume esperado (fila de um dia de operações de campo,
  não milhares de registros) — portar esse arquivo como base, não introduzir IndexedDB sem
  necessidade concreta.
- **ID gerado no cliente:** todo registro criado no App Campo recebe um `uuid` gerado no próprio
  app (`crypto.randomUUID()`) **antes** de existir no banco — isso permite reenviar a mesma
  tentativa de sync várias vezes sem duplicar (insert idempotente por PK / `ON CONFLICT (id) DO
  NOTHING`). É o que torna a sincronização segura em caso de retry por conexão instável.
- **Catálogo espelhado localmente:** `ciclos`, `talhões` e `insumos` da(s) fazenda(s) permitidas do
  operador precisam ser baixados e guardados no IndexedDB toda vez que o app abre com conexão —
  senão o operador não consegue nem preencher o formulário estando offline (não dá pra escolher um
  ciclo que não foi baixado aines).
- **Indicador de status por lançamento:** cada item lançado mostra visualmente
  "pendente de sincronizar" / "sincronizando" / "sincronizado" / "falhou" — nunca silencioso.
  Sincronização tenta sozinha quando `navigator.onLine` muda pra `true` e por um timer de
  retry (ex. a cada 30-60s enquanto houver itens pendentes).
- **Sem resolução de conflito complexa na v1:** cada lançamento é de autoria de um único operador
  (não há edição concorrente do mesmo registro por duas pessoas), então não é necessário merge de
  conflito — só idempotência de retry (ver ID gerado no cliente acima). Se isso mudar no futuro
  (dois operadores editando o mesmo romaneio, por exemplo), reavaliar.
- **Interação com o fluxo de aprovação (4.3):** o `status_campo = 'pendente'` é setado pelo próprio
  app no momento da criação (não é o default da coluna, que fica `'aprovado'` por segurança para
  não afetar linhas do Arato) — isso vale tanto pro caminho online direto quanto pro que passou
  pela fila offline; o gestor só vê o item na fila de aprovação depois que ele de fato sincronizar.

---

## 5. O QUE FALTA DECIDIR ANTES DE CODAR

Pendências reais de decisão do dono já resolvidas nesta sessão, registradas aqui por rastreabilidade:
- ~~Modo offline~~ → **resolvido: obrigatório desde a v1** (arquitetura em 4.6)
- ~~Nome do domínio de produção~~ → default `campo.arato.agr.br`, ajustável sem impacto na hora do deploy
- ~~Recomendação/Tarefa vs. lançamento avulso do `app/campo` antigo~~ → **resolvido (12/set/2026):**
  o modelo de Tarefa vence, sem lançamento avulso — ver nota na seção 2.9
- ~~Ordem das telas da v1~~ → default: Colheita/Romaneio (finaliza no estoque) → Pulverização →
  Plantio → Adubação/Correção de Solo

Duas das três pendências de engenharia que restavam foram **resolvidas por precedente** ao
descobrir o módulo `app/campo` já existente no Arato principal (ver 2.9) — não são mais trabalho a
inventar, são trabalho de portar código que já funciona (com um ajuste, ver abaixo):
- ~~Como o consumo de insumo vira lançamento de custo~~ → **resolvido**: gatilho é a aprovação
  (4.3), não a criação. `app/api/campo/consumir-estoque/route.ts` fornece a lógica de cálculo como
  base, mas precisa ganhar o gate de `status_campo = 'aprovado'` — ele não existe na rota original
- ~~Biblioteca de fila offline / estratégia de PWA~~ → **resolvido**: `lib/offline-store.ts`
  (localStorage) + `public/sw.js` (manual) já funcionam, portar como base
- ~~Onde fica a tela de aprovação~~ → **resolvido**: App Campo (não Arato principal — corrige a
  versão anterior deste arquivo). Ver 4.3.

Pendências de engenharia de verdade que restam:
- Mapeamento completo tabela-a-tabela de tudo que hoje lê `plantios`/`pulverizacoes`/`colheitas`/
  etc. e precisa do filtro `status_campo = 'aprovado'` (DRE, Custos, Kardex, relatório de aplicações
  — pelo menos esses 4 já são sabidamente afetados) — isso é novo mesmo, o `app/campo` existente
  não tem fluxo de aprovação, grava direto
- ~~Mecanismo de notificação cross-app~~ → **resolvido (15/set/2026): WhatsApp automático**, via a
  Evolution API que já existe no Arato principal pro bot de IA (`lib/whatsapp-evolution.ts`,
  `enviarTexto`). Reaproveita a coluna `perfis.whatsapp` que já existia (criada pro bot, seção
  "WhatsApp IA" de `supabase_migrations.sql`) — sem migration nova. Dois gatilhos, os dois vivendo
  no repo do Arato principal (só lá tem a chave da Evolution API, nunca aqui — CLAUDE.md 3.2):
  - **Lançamento novo `pendente`:** o App Campo chama `app/api/campo/notificar-pendente` (agrofield)
    logo depois de gravar cada fechamento/abastecimento (`lib/notificacoes/notificar-pendente.ts`,
    chamado no fim de cada `executarFechamento*`/`executarAbastecimento`) — avisa todo Gerente
    Campo com acesso à fazenda e telefone cadastrado.
  - **Aprovação/rejeição:** `app/api/campo/aprovar-lancamento` (agrofield) avisa quem lançou
    (`lancado_por_perfil_id`), depois de já ter persistido a decisão.
  Os dois são best-effort — nunca bloqueiam nem falham o fluxo principal (lançamento ou decisão) se
  o envio falhar ou ninguém tiver telefone. Cadastro do número é feito pelo admin Raccolto em
  `/admin/campo` (mesma tela do item 5 abaixo), nunca self-service — mesmo padrão do PIN.
- **Achado novo (14/set/2026), fora do escopo do App Campo mas registrado aqui por ter sido
  descoberto durante este trabalho:** o banco real não tem isolamento de tenant por RLS em boa
  parte das tabelas do Arato principal — `fazendas`/`talhoes`/`insumos`/`perfis`/
  `monitoramento_pragas` não têm RLS habilitada; `plantios`/`pulverizacoes`/`colheitas`/`ciclos`
  têm RLS habilitada mas com policy `using (true)` ("allow all", não filtra nada). Isolamento hoje
  é 100% feito no código da aplicação (query já filtrada por `conta_id`), não no Postgres. Risco
  reduzido por ora porque o Arato principal ainda não tem clientes finais reais (seção 2.1), mas é
  uma pendência real de segurança pra resolver antes de abrir a plataforma pra fora — projeto à
  parte, não algo pra corrigir de passagem numa migration do App Campo. As tabelas NOVAS do App
  Campo (`recomendacoes_*`, `tarefas`, `tarefas_transferencias`) não seguem esse padrão frágil —
  ganharam RLS de verdade, escopada por fazenda, via `db/migrations-draft/008_rls_recomendacoes_tarefas.sql`
  (função `fn_pode_acessar_fazenda_campo`).
- **Atualização (15/set/2026):** conferido de novo — uma sessão paralela (agrofield) já está
  corrigindo isso. `contas`/`fazendas`/`produtores`/`perfis` já têm política real, escopada por
  conta. `talhoes` também já tem a política real, mas **ainda convive** com uma policy de
  emergência (`emergencial_autenticado`, `using (true)`) que, coexistindo, anula a real (RLS é OR
  entre policies — basta uma passar). `plantios`/`pulverizacoes`/`colheitas`/`ciclos`/`insumos`
  ainda só têm essa policy de emergência, nenhuma política real ainda. Decisão do dono: não mexer
  agora, deixar a sessão paralela terminar, pra não colidir (política sobrescrita, commit
  conflitante) — conferir de novo depois.

---

## 6. STACK DO APP CAMPO

Igual ao Arato principal (ver 2.2): Next.js 16 (App Router), TypeScript, CSS inline, PostgreSQL
via Supabase, Supabase Auth (`@supabase/ssr`), deploy Vercel.

- `package.json`: `dev` roda em `-p 3001` (Arato principal usa 3000 — os dois rodam juntos sem conflito)
- `.env.local`: só `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` — nunca a
  `SERVICE_ROLE_KEY` aqui (app client-facing, tudo passa por RLS)
- **Nenhuma lib nova necessária pro offline** (ver 2.9/4.6): reaproveitar `localStorage` (padrão já
  provado em `lib/offline-store.ts` do Arato principal) e service worker manual (`public/sw.js`) —
  não introduzir IndexedDB/Dexie/`next-pwa` sem necessidade concreta que apareça na prática
- **Repositório:** `https://github.com/adminRaccolto/arato_campo.git` · **Vercel:** projeto `arato-campo`

---

## 7. CONVENÇÕES DE CÓDIGO ESPECÍFICAS DO APP CAMPO

Regras de estilo/paleta são as da seção 2.6 (compartilhadas). A diferença real é de layout:

**Mobile-first de verdade:** diferente do Arato principal (desktop com TopNav horizontal), este
app é usado no campo, no celular — layout, touch targets e tipografia devem ser pensados para tela
pequena e uso com uma mão / possivelmente com luvas, não é uma versão responsiva do desktop.

**Navegação — decisão revisada (15/set/2026):** a versão inicial usava barra inferior fixa
(bottom nav), padrão mobile clássico. Depois de ver o resultado real na tela, o dono pediu
**barra lateral de navegação em todos os ambientes** (inclusive celular) — não só bottom nav com
sidebar no desktop. Implementado como menu lateral deslizante (drawer, acionado por ícone
hambúrguer) em qualquer largura de tela, sempre visível/fixo a partir da largura "desktop" (mesmo
breakpoint de 560px da seção anterior). Mostra o logo do cliente (`contas.logo_url`, já existe no
schema — mesma coluna usada pelo Arato principal) no topo, com o ícone padrão do App Campo como
fallback quando a conta não tem logo configurado.

**Seletor de fazenda visível (15/set/2026):** a seção 2.3 original dizia "sem farm-switcher fixo,
cada tela tem seu próprio seletor" — o dono achou isso confuso na prática (não dava pra saber em
qual fazenda você estava só olhando a tela). Adicionado um seletor de fazenda na barra lateral
(`lib/fazenda-ativa/FazendaAtivaProvider.tsx`, só aparece se a conta tiver mais de uma fazenda),
persistido em localStorage. Não substitui o seletor de cada tela (continua existindo, CLAUDE.md
2.3) — só pré-popula esse seletor com a fazenda ativa em vez de sempre cair no primeiro item.

**Estética — correção de rumo (15/set/2026):** uma primeira tentativa de deixar a Início "mais
bonita" (ícones em emoji dentro de badge colorido arredondado, sombra em todo card) foi rejeitada
pelo dono como "amador, infantil". A convenção que já valia pro resto do app (seção 2.6: borda
0.5px sólida, sem sombra, `border-radius` 8/12px) está certa — o desvio foi só nessa tentativa de
home, já corrigido. Manter qualquer tela nova dentro do padrão sóbrio já estabelecido, não
inventar um visual "app de consumo" novo. A tela Início também deixou de duplicar os mesmos atalhos
já presentes na barra lateral — mostra em vez disso o mapa dos talhões da fazenda ativa (contorno
KML, `app/(campo)/_shared/FazendaMapaKml.tsx`) e contadores (tarefas pendentes, aprovações
pendentes pra quem é Gerente Campo).

**Estética — segunda correção de rumo, emoji (16/set/2026):** mesma reclamação, achado novo — a
tela de Monitoramento (tipo de ocorrência, nível de infestação) usava emoji grande (20-22px) como
elemento visual principal de botão de seleção, com fundo pastel saturado atrás do item selecionado
(verde/amarelo/laranja/vermelho-claro cheio). Dono classificou como "lúdico" e pediu ambiente "mais
sério e formal" — auditoria completa pedida (não só essa tela). Removido emoji decorativo de toda
UI in-app: botões (tipo de ocorrência, GPS, foto), badges de tipo em listas (Aprovações, Tarefas —
o rótulo em texto já dizia a mesma coisa, era redundante), mensagens de status offline. Nível de
infestação perdeu o emoji-círculo e o fundo pastel cheio — vira borda + texto na cor de severidade
(`cor` em `lib/monitoramento/catalogo.ts`) e um quadradinho de 10px como indicador, fundo neutro
(`#F4F6FA`) mesmo selecionado. **O que ficou** (avaliado caso a caso, não é proibição geral de
cor/símbolo): ícones pequenos (15px, opacidade reduzida) na barra lateral de navegação — mesmo
padrão já aceito no próprio admin do Arato principal (`agrofield/app/admin/layout.tsx`, `NAV`);
glifos tipográficos funcionais (✓, ⚠, ↑) em `SyncButton`; pílulas de status com fundo leve + texto
colorido em Tarefas (`STATUS_INFO`) — padrão de chip de status comum em software sério (Linear,
GitHub), não "lúdico"; caixas de alerta/automático com fundo leve (`#FCEAEA` erro, `#EAF7EF`
automático) — callout tintado é convenção séria estabelecida, não brinquedo; emoji dentro de texto
de mensagem de WhatsApp (`⛽`/`✅`/`🌱` nos templates de compartilhamento) — é conteúdo pra um canal
externo casual, não faz parte do "ambiente" do app. Critério pra próxima vez que algo parecer
"lúdico demais": emoji grande (18px+) como elemento dominante de um botão/cartão de seleção, ou
fundo pastel saturado preenchendo o item inteiro, é o padrão a evitar — ícone pequeno ao lado de
texto, ou cor aplicada só a borda/texto/chip pequeno, é o padrão sóbrio já validado.

**Terceira correção, tamanho dos seletores (16/set/2026, mesmo dia):** mesmo depois de tirar o
emoji, "Tipo de ocorrência" e "Nível de infestação" (Monitoramento) continuavam como grade de
botões grandes (padding 12px, 2 colunas) — dono apontou que isso ocupa o espaço vertical de ~2
seções só pra uma escolha simples de 3-4 opções. Convertido pros dois em controle segmentado
compacto: uma linha única, botões `height: 36`, preenchimento sólido só no item ativo (cor do
tipo/severidade), texto direto sem subtítulo por botão — a legenda do nível (ex: "Abaixo do NE")
virou uma linha de texto única abaixo do controle, mostrando só a do nível selecionado, em vez de
repetida dentro de cada botão. Regra geral daqui pra frente: uma escolha de poucas opções (3-5) sem
informação extra por opção é controle segmentado de uma linha (`height: 36`, `flex: 1` por botão),
nunca grade 2D nem botão com padding generoso — grade/cartão grande só se cada opção precisar
mesmo de mais de uma linha de informação (como `TalhoesSelector`, que mostra nome + hectares).

---

## 8. HISTÓRICO

### Correção de cascata — exclusão no Arato principal não estornava estoque
Achado numa auditoria pedida pelo dono (15/set/2026): as funções de exclusão do desktop
(`excluirPulverizacao`/`excluirAdubacao`/`excluirCorrecao`/`excluirPlantio`, `lib/db.ts` do repo
Arato principal) fazem o estorno de estoque lendo campos de **quantidade total**
(`total_consumido`, `quantidade_kg`, `quantidade_ton`) — campos que o App Campo nunca escrevia (só
calculava dose×área internamente, na hora, dentro de `aprovar-lancamento`, sem persistir). Efeito
real: excluir no desktop um lançamento do App Campo já aprovado **não devolvia o estoque baixado**,
silenciosamente (o `if` de checagem desses campos só pula quando vazio, sem erro). Corrigido: o
fechamento da tarefa (`lib/tarefas/executores.ts`) agora grava esses campos também, calculados com
a dose aplicada final × área — as linhas do App Campo ficam estruturalmente idênticas às do
desktop, sem precisar mexer no Arato principal. Não havia problema equivalente do lado da edição
(o desktop não tem fluxo de edição com lógica de estoque pra essas 4 tabelas hoje).

### Sessão de 15 de setembro de 2026 — dose/máquina, abastecimento, WhatsApp
Quatro funções pedidas pelo dono depois de testar a v1 na tela:

1. **Dose recomendada vs. aplicada** — o operador pode ajustar a dose no fechamento da tarefa
   (nem sempre o que foi feito bate com o que foi recomendado). As tabelas de execução ganharam
   uma coluna nova por produto (`dose_recomendada_ha` em `pulverizacao_itens`,
   `dose_kg_ha_recomendada` em `adubacoes_base_itens` e `plantios`, `dose_ton_ha_recomendada` em
   `correcoes_solo_itens` — migration `010_dose_maquina_operacoes.sql`) guardando o valor original;
   a coluna de dose já existente vira a REALIZADA. Aprovações mostra os dois valores lado a lado,
   destacando em mostarda quando divergem.
2. **Máquina/equipamento** — reaproveita o cadastro `maquinas` (já existia, sem FK nenhuma ligada
   a operações de lavoura). `maquina_id` nas 4 recomendações (sugestão do Gerente Campo, opcional)
   e nas 4 tabelas de execução (confirmação/troca do operador no fechamento) — mesma migration 010.
3. **Abastecimento** — tela nova (`app/(campo)/abastecimento/nova`), lançamento direto do operador
   (sem recomendação prévia, mesmo padrão do Monitoramento — não faz sentido "recomendar" um
   abastecimento com antecedência). Tabela `abastecimentos` já existia completa no schema (bomba,
   máquina, litros, horímetro, `origem_op_id`), só faltava o pacote de aprovação
   (`011_status_campo_abastecimentos.sql`, ficou de fora do loop original da 006). Consumo de
   estoque na aprovação espelha o desktop (`app/estoque/abastecimento/page.tsx` do Arato
   principal): baixa da bomba (`bombas_combustivel.estoque_atual_l`) quando ela controla o próprio
   estoque, senão baixa direto do insumo combustível — sem gerar lançamento financeiro, decisão
   deliberada (fora do escopo do operador de campo, CLAUDE.md 3.2).
4. **Compartilhar no WhatsApp** — botão manual (não notificação automática) nas telas de sucesso de
   criação de recomendação e de conclusão de tarefa. Usa o Web Share API nativo (deixa o operador
   escolher o contato/grupo) com fallback pra link `wa.me` — **decisão: zero infraestrutura de
   backend**, não usa o bot Evolution API que já existe no Arato principal (`lib/whatsapp-evolution.ts`)
   porque isso exigiria cadastrar celular por operador (`perfis` não tem esse campo hoje) e um envio
   automático não era o pedido — o dono foi explícito: "não é automático, é uma tecla de
   compartilhar". Registrado aqui porque pode ser revisitado se um dia precisar virar notificação de
   verdade (aí sim precisaria da rota cross-app + telefone por perfil).

### Sessão de 14 de setembro de 2026 — migrations aplicadas no banco real
- As 8 migrations rascunho (`db/migrations-draft/001` a `008`) foram revisadas uma última vez e
  **aplicadas de verdade no banco real** (projeto Supabase `ptbougxydvxxdlhywhps`), numa única
  transação, na ordem 001 → 002 → 004 → 003 → 005 → 006 → 007 → 008. Confirmado por reintrospecção
  do schema real: `perfis.produto`/`fazendas_permitidas`, `status_campo`/`origem_lancamento`/
  `lancado_por_perfil_id`/`aprovado_por_perfil_id`/`aprovado_em`/`motivo_rejeicao` nas 6 tabelas
  operacionais, as 4 famílias de tabelas `recomendacoes_*`, `tarefas`/`tarefas_transferencias`, e
  a constraint de `perfis.papel` — tudo existe de verdade agora. `lib/supabase/database.types.ts`
  regenerado a partir do schema real (antes estava desatualizado desde antes da migration 006).
- Antes de aplicar, descoberto que o banco real não tem RLS de verdade em boa parte das tabelas do
  Arato principal (ver pendência nova registrada na seção 5) — decisão do dono: as tabelas novas do
  App Campo ganham RLS de verdade (escopada por fazenda), sem tentar corrigir o resto do banco de
  passagem. Isso motivou a migration 008, criada nesta sessão especificamente pra isso.
- Depois de aplicar, removidos os casts `as unknown as { from: (table: string) => ReturnType<typeof
  supabase.from> }` que existiam só como workaround enquanto essas colunas/tabelas não existiam no
  schema gerado — mantido apenas onde o nome da tabela é genuinamente dinâmico em runtime (ex.:
  `item.tabela` na tela de Aprovações, `tabelaRecomendacao` em `lib/tarefas/executores.ts`), caso em
  que o cast agora usa `any` explícito com comentário, em vez de `ReturnType<typeof supabase.from>`
  (que resolve pra UMA tabela fixa do union gerado e produzia erros de tipo confusos/errados).
- Construídos nesta mesma sessão (antes de aplicar as migrations): fotos offline pro Monitoramento
  (`lib/offline-photos.ts`, IndexedDB só pra blobs — ver 4.6, é aditivo ao padrão localStorage, não
  substitui) com preview local e persistência de progresso parcial de upload
  (`atualizarPayloadNaFila` em `lib/offline-store.ts`) pra retry não reenviar foto já subida.
- Investigado o item de consumo de estoque na aprovação (débito técnico 2.8): a rota antiga
  `app/api/campo/consumir-estoque/route.ts` (Arato principal) gera lançamento financeiro (CP) junto
  com a baixa — só que a lógica de produção de verdade, usada pelas telas desktop (`lib/db.ts` do
  Arato principal — `processarPlantio`/`processarPulverizacao`/`processarAdubacao`/
  `processarCorrecao`), **não gera lançamento nenhum** (comentário no código explica: gerar CP de
  novo aqui duplicava dívida já lançada na NF de compra — bug real já corrigido no passado). Decisão
  do dono: construir uma rota nova no Arato principal (não portar a rota antiga), replicando a
  lógica real de `lib/db.ts` com o gate de `status_campo = 'aprovado'` que falta nela — **trabalho
  em andamento, não concluído nesta sessão**.

### Sessão de modelagem — 11 de setembro de 2026
- Projeto scaffoldado (`create-next-app`, Next.js 16.3.4, TypeScript, App Router, sem Tailwind)
- `@supabase/ssr` + `@supabase/supabase-js` instalados; `.env.local` com chaves públicas apenas
- `dev` configurado para porta 3001
- Modelagem de produto fechada: perfis via extensão de `perfis` (não tabela nova), login por
  e-mail sintético + PIN, operador multi-fazenda dentro da conta, fluxo de aprovação obrigatório
  antes de dado virar definitivo, ativação via `/admin/campo` dedicado + `conta_modulos`
- Decidido: **modo offline obrigatório desde a v1** — arquitetura registrada na seção 4.6
- **Correção importante (mesmo dia):** o que parecia "resíduo de rota antiga" em `proxy.ts` era na
  verdade a ponta de um módulo `app/campo` **inteiro e funcional** já existente no Arato principal
  (~3.660 linhas, 8 telas, PWA, fila offline) — nunca usado por cliente real (confirmado no banco),
  mas real e reaproveitável. Detalhado na seção 2.9. **Instrução explícita do dono: não tocar nesse
  módulo agora** — ele continua existindo, intocado, enquanto o projeto novo é construído em
  paralelo; substituição é decisão futura, só depois que este projeto novo provar que atende
  — resolveu por precedente 2 das 3 pendências de engenharia da seção 5 (consumo de insumo →
  custo, e a escolha de fila offline/PWA)
- Contexto completo do sistema Arato (arquitetura, inventário de módulos, glossário, armadilhas
  conhecidas, débitos técnicos) consolidado neste arquivo (seção 2), para qualquer sessão futura
  saber o que os dois projetos compartilham e o que não compartilham sem precisar abrir o outro repo
- Repositório GitHub (`adminRaccolto/arato_campo`) e projeto Vercel (`arato-campo`) já criados pelo dono
- **Nenhum código de aplicação, schema ou migration foi implementado ainda** — só modelagem

---

## 9. PRIMEIROS PASSOS — COMECE POR AQUI

Ordem recomendada. Itens marcados "(paralelo, no repo do Arato principal)" não são desta sessão —
são trabalho que acontece na outra janela/sessão, ao mesmo tempo.

**1. Infra do projeto (não depende de nada)**
- `git remote add origin https://github.com/adminRaccolto/arato_campo.git`, primeiro commit e push
- Vercel: `vercel link` conectando ao projeto `arato-campo` já criado; configurar as env vars
  (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) lá também, não só local

**2. Migration no banco (paralelo, no repo do Arato principal)**
- `perfis.produto` (`'arato'`/`'campo'`), `perfis.fazendas_permitidas uuid[]`
- `status_campo`/`origem_lancamento`/`lancado_por_perfil_id`/`aprovado_por_perfil_id`/`aprovado_em`
  nas tabelas que este app vai escrever — reaproveitando o padrão `origem_op_id` que a Seção 242 já
  criou em `plantios`/`pulverizacoes`/`colheitas`/`abastecimentos`/`adubacoes_base`, estendendo pra
  `romaneios_entrada`/`correcoes_solo` que ficaram de fora
- Enquanto isso não roda, dá pra avançar em paralelo nos itens 3-5 abaixo, que não dependem do schema

**3. Portar a base do `app/campo` existente (ver 2.9 — copiar, não linkar; o original fica intocado)**
- `public/sw.js` → adaptar e trazer pra cá
- `lib/offline-store.ts` → trazer o padrão de fila `localStorage` + cache de catálogo
- `app/campo/CampoLayoutClient.tsx` + `components/campo/SyncButton.tsx` → base do layout mobile e
  do indicador de sincronização
- Adaptar tudo pro `AuthProvider` **novo** deste projeto (ver item 4) — o original usa o
  `useAuth()` do Arato principal, que não existe aqui

**4. `AuthProvider` próprio deste projeto**
- Login por e-mail sintético + PIN (decisão 4.2) — pode usar `app/campo/login/page.tsx` do Arato
  principal como referência visual, mas a lógica de auth é nova
- Expõe `fazendaId`, `fazendasPermitidas`, `contaId`, `setFazendaAtiva()` — igual ao padrão do
  Arato principal, mas lendo `perfis.produto='campo'` + `perfis.fazendas_permitidas`
- Checagem de `conta_modulos.app_campo.habilitado` no login (decisão 4.5) — sem isso, nem entra

**5. Primeira tela de operação de ponta a ponta**
- Ordem recomendada (seção 5): Colheita/Romaneio → Pulverização → Plantio → Adubação/Correção de Solo
- Portar a tela equivalente de `app/campo/*` como base, adaptando pra gravar `status_campo='pendente'`
  e os campos de auditoria — essa é a prova real de que fila offline + aprovação + schema novo
  funcionam juntos antes de replicar pras demais telas

**6. Só depois disso: tela "Aprovações" aqui no App Campo** (decisão 4.3 — corrige uma versão
anterior deste arquivo que apontava pro Arato principal) e `/admin/campo` no Arato principal
(decisão 4.5) — sem eles o operador lança mas ninguém aprova nem ativa/gerencia contas, então não
faz sentido ir na frente do restante. O mecanismo de notificação cross-app (ver 5) ainda precisa
ser decidido antes de considerar a Aprovações "pronta".

---

## 10. INSTRUÇÃO FINAL

Mesma do Arato principal: você é o único desenvolvedor, o dono não programa. Antes de escrever
schema ou telas, confirme que as pendências da seção 5 foram resolvidas — elas mudam a arquitetura,
não são só detalhe de implementação.
