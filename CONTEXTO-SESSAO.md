# Contexto da sessão (para retomar em outro computador)

> Leia este arquivo primeiro. Ele resume tudo o que foi pedido, decidido e feito até agora no projeto **MathRubi**.
> Depois leia o `LEIA-ME.md` (arquitetura) e rode `node tools/validate.js`.

## 1. O projeto

**MathRubi**: app web gamificado para estudar Cálculo Diferencial e Integral (disciplina **MAC210**). HTML, CSS e JavaScript puros, **sem frameworks e sem etapa de build**. A pasta `dist/` é o app (abra `dist/index.html`). Os PDFs da disciplina e dois livros ficam em `Conteúdos/` (MAC210 e Livros gratuitos: OpenStax Calculus Vol. 1 e UFU Cálculo 1).

O usuário escreve em português do Brasil; todo o conteúdo do app deve estar em pt-BR.

## 2. Histórico do que foi pedido

### Pedido 1: análise do Duolingo (academico, para inspirar o design)
Foi pedido um relatório sobre arquitetura da informação, microlearning, curva de dificuldade e adaptação para matemática. Foi encontrado o app Duolingo instalado no Windows, mas **não** foi feita engenharia reversa dele. O relatório foi escrito a partir de conhecimento público e inferências (e esse arquivo ficou numa pasta temporária da sessão, **não está neste projeto**). Conclusões que guiaram o MathRubi:

- Trilha linear única, com hierarquia seção → unidade → fase → exercício.
- Lições curtas que seguem **reconhecer → montar → produzir**, com o andaime saindo aos poucos.
- Feedback imediato; erros voltam para o fim da lição; revisão espaçada e prática intercalada.
- Em matemática, erros se propagam e os pré-requisitos formam uma cadeia, então a progressão deve ser por **maestria**, e não por tempo ou XP.
- Gamificação ligada ao domínio do conteúdo (não ao “farm” de XP).
- Resolução passo a passo (“worked examples” com fading), exercícios de achar erro, entrada simbólica verificada, problemas com números variados.

### Pedido 2: corrigir a progressão rápida demais
Problema: unidades com poucas aulas e o aluno avançava antes de fixar a matéria. Diretrizes dadas pelo usuário:

1. **Pedagogia:** muito mais aulas e fases por unidade; prática exaustiva com variação de problemas (baseada nos PDFs e livros); **pílulas teóricas guiadas por um robô assistente** (diálogos curtos que explicam a intuição e a “decoreba essencial”, como as propriedades dos limites e as regras de derivada).
2. **UX:** trilha em zigue-zague intercalando teoria do robô, exemplos guiados e fixação ativa, evitando múltipla escolha cega e priorizando construir o raciocínio passo a passo.
3. **Código:** atualizar o JS puro em `dist/` para aulas mais densas, o componente do robô e a **progressão por maestria real**.

Entregas pedidas: (1) reestruturar e expandir a unidade de **Limites**, com foco em fixar as propriedades dos limites; (2) planejar e implementar a base da unidade de **Derivadas** com a mesma cadência.

## 3. O que foi feito

### Motor e componentes (escritos nesta sessão)
- `dist/kit.js`: funções de autoria sem DOM (`task`, `paper`, `pill`, `step`, `guided`, `order`, `coach`, `near`, `factors`, `phase`, `unit`) e o objeto `COURSE` (seções `limites` e `derivadas`).
- `dist/board.js`: o robô **Rubi** (SVG inline), pílulas (falas reveladas uma a uma), passos guiados, ordenação e os boards interativos antigos (`near` e `factors`).
- `dist/path.js`: `buildPath()` monta a trilha a partir de `COURSE`. Ids de fase: `seção:unidade:fase`; de item: `seção:unidade:fase:item`.
- `dist/lab.js`: motor da trilha. Mapa em zigue-zague por seção; **maestria**; reforço de erros; **revisão espaçada**; XP e medalhas; salvamento em `localStorage` na chave `mathrubi-v2` (o progresso antigo, chave `limite-lab-v1`, foi descartado).
- `dist/path.css` (estilos do Rubi, pílulas e passos), `dist/index.html` (carrega os scripts nesta ordem: kit, board, content-limites-a, content-limites-b, content-derivadas, path, lab).
- `tools/validate.js` (valida o conteúdo), `tools/serve.js` (servidor local na porta 5183), `.claude/launch.json`.

### Regras de maestria (lab.js)
- Erro volta para o fim da fase e precisa ser acertado.
- A fase só conclui com **≥ 70%** de acertos de primeira (fase chefão, `boss`: **≥ 80%**). Abaixo disso aparece “hora de reforçar”.
- **≥ 90%** concede 👑. A fase seguinte só abre ao dominar a anterior.
- Erros são contados por item (`state.misses`); a **Revisão espaçada** sorteia até 8 itens simples de fases dominadas, priorizando os mais errados (precisa de pelo menos 4 candidatos).
- Respostas aceitam variantes separadas por `|`; a normalização trata `−`, vírgula decimal, `²`/`³`, `′`/`'`, `√`/`sqrt`, `π`/`pi`, `sin`/`sen`, `·` e `*`; números e frações são comparados por valor.

### Conteúdo (574 itens, 84 fases, 15 unidades; validador OK)
Cadência de cada fase: **pílula do Rubi → exemplo guiado → fixação ativa com variação → papel**. Última fase de cada unidade é chefão. Múltipla escolha só para reconhecer/classificar.

- **Limites** (`content-limites-a.js`, escrito à mão nesta sessão, e `content-limites-b.js`, escrito por um subagente): 8 unidades, 48 fases, 352 itens.
  1. A ideia de limite · 2. **Propriedades dos limites** (8 fases) · 3. Continuidade · 4. Indeterminação e fatoração · 5. Racionalização · 6. Limites fundamentais · 7. Limites infinitos e no infinito · 8. Revisão da seção.
- **Derivadas** (`content-derivadas.js`, subagente): 7 unidades, 36 fases, 222 itens.
  1. Taxa de variação e a ideia de derivada · 2. Definição de derivada · 3. Regras básicas · 4. Produto e quociente · 5. Regra da cadeia · 6. Funções especiais · 7. Ordem superior e derivação implícita.

### Verificação já feita
- `node tools/validate.js` passa.
- Teste automático no navegador: as 84 fases foram resolvidas com as respostas gravadas, sem falha de aceitação.
- Teste de maestria: erros deliberados levaram à tela de reforço (50% < 70%).
- Conferência matemática: Limites 1–2 à mão; Limites 3–8 (130 limites) e Derivadas por script numérico (diferenças finitas), feitos pelos subagentes. Pontos de maior risco que ficaram só à mão: continuidade com parâmetro k, limites laterais com ±∞ e limites de (1+k/n)ⁿ.

## 4. Pendências e riscos conhecidos

- **Os PDFs de `Conteúdos/MAC210` não foram abertos** por nenhum dos autores (faltou um leitor de PDF). Ordem e notação seguem o padrão de Cálculo I. **Conferir com os PDFs** da disciplina.
- Na unidade 5 de Derivadas, a regra da cadeia usa as derivadas de sen, cos, eˣ e ln **antes** da unidade 6, que as justifica (as pílulas avisam). Dá para inverter a ordem se preferir.
- Fora do escopo por ora (próximas seções): L’Hôpital, comportamento da função, otimização, integral indefinida e integração.
- Não foi feita revisão visual completa em celular nem teste de acessibilidade além do básico (foco, `aria-label`, `prefers-reduced-motion`).
- A ordem dos scripts em `index.html` importa; novos arquivos `content-*.js` precisam ser incluídos lá e entram em `tools/validate.js` automaticamente (`content-*.js`).
- O corretor compara texto normalizado: respostas simbólicas devem ser curtas e listar variantes com `|`.

## 5. Como retomar

```bash
node tools/validate.js      # confere o conteúdo
node tools/serve.js         # servidor local em http://localhost:5183 (ou abra dist/index.html)
```

Para adicionar uma unidade: em um `content-*.js`, `COURSE.<secao>.units.push(unit(titulo, subtitulo, [phase(nome, [itens...]), ..., phase(nome, [...], {boss: true})]))`, depois rode o validador. Referência dos tipos de item em `dist/kit.js`.


## Atualização de escopo: revisão e hierarquia (03/11/2026)

Orientação explícita do usuário: **Fundamentos e funções é a seção**; **Números reais é a unidade 1 dentro dela**. Essa seção deve ser uma revisão dos pré-requisitos de Cálculo para quem já estudou, com foco em propriedades, restrições e aplicação. O ensino de contagem e operações básicas foi transferido para a disciplina Pré-cálculo.

Estado atual: 7 fases de revisão em Números reais e 5 em Intervalos e módulo (86 itens). As 28 fases elementares (198 itens) permanecem em `content-precalculo.js`, usando os IDs antigos. A revisão tem `progressId: fundamentos-revisao-v1`, para não reutilizar domínio de questões diferentes. O app contém 858 itens. As próximas 6 unidades de revisão ainda estão em preparação. Ver `PREPARACAO-FUNDAMENTOS.md` para o escopo vigente e os comandos de validação.

A exigência de domínio entre fases, unidades e seções continua válida. A numeração das unidades é local a cada seção. O motor agora indexa as aulas de todas as disciplinas; a fase atual é calculada dentro da disciplina selecionada.

## Atualização: seção Fundamentos e funções concluída

As unidades 3 a 8 foram escritas em `dist/content-fundamentos2-a.js` (unidades 3 e 4), `-b.js` (5 e 6) e `-c.js` (7 e 8). A seção tem 8 unidades, 48 fases e 383 itens; o app tem 1155 itens. As unidades 1 e 2 (`content-fundamentos.js`) foram reescritas no mesmo padrão, mantendo as 7 + 5 fases e os IDs. O catálogo (`catalog.js`) não tem mais `plannedUnits` na seção 1 e referencia as 8 unidades.
Verificação: `validate.js`, `validate-mastery.js` (155 verificações, atualizado para a seção completa), `validate-foundations-math.js` e o novo `validate-review-math.js` (391). As 36 fases novas e a avaliação da seção foram percorridas no motor real, com a Limites liberando ao final.
Pendências: sem gráficos desenhados (a unidade de funções é só texto); revisão editorial; o PDF do OpenStax está corrompido neste computador.

## Atualização: seção 1 retirada e liberação de fases

A pedido do usuário, a seção "Fundamentos e funções" saiu do app (kit.js, catalog.js e index.html). Os arquivos foram guardados em `arquivo/fundamentos-e-funcoes/` (conteúdo, PREPARACAO-FUNDAMENTOS.md e validate-review-math.js), sem apagar. Cálculo agora tem 19 seções e começa por Limites; o app tem 772 itens.
Liberação: a regra de maestria estava correta (testada fase a fase), mas o aluno não via por que a próxima etapa não abria. A próxima seção só libera depois de dominar todas as unidades e fazer a avaliação da seção. Agora o fim de fase diz o que foi liberado ou quantos acertos faltaram, e o botão do mapa vira "Fazer a avaliação da seção →". `validate-mastery.js` testa a abertura de cada fase de cada seção.

## Atualização: progressão estilo Duolingo (sem nota de corte)

A pedido do usuário, saíram os 70%/80%. Uma fase termina quando todos os exercícios foram acertados: os errados voltam no final até acertar (já era assim), e **antes de refazê-los o Rubi reexplica** (`drawRecap` em `lab.js`: a regra da pílula da fase com a fórmula em destaque + as pistas dos exercícios errados). `mastery.js`: `phasePassed` = existe nota guardada (a nota só decide a coroa de 90%). Textos "80% de acerto" dos desafios de Limites e Pré-cálculo foram reescritos. Todos os scripts do `index.html` agora levam `?v=15` para não usar cache antigo. `validate-mastery.js` atualizado (170 verificações).
