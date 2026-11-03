# MathRubi

Abra `dist/index.html` no navegador para usar o app localmente (HTML, CSS e JS puros, sem build).
Para desenvolver com recarga simples: `node tools/serve.js` e abra http://localhost:5183.

- `Conteúdos/MAC210` reúne os PDFs da disciplina.
- `Conteúdos/Livros gratuitos` reúne livros de referência para estudo.

## Arquitetura (dist/)

| Arquivo | Papel |
|---|---|
| `kit.js` | Funções de autoria (sem DOM) e o objeto `COURSE` |
| `content-limites-a.js`, `content-limites-b.js`, `content-derivadas.js` | Conteúdo: unidades → fases → itens |
| `path.js` | Monta a trilha (`buildPath`) a partir de `COURSE` |
| `board.js` | Componentes visuais: Rubi, pílulas, passos guiados, ordenação, boards interativos |
| `lab.js` | Motor: mapa, progressão por maestria, reforço de erros, revisão espaçada |
| `path.css` | Estilo da trilha e do Rubi |

`node tools/validate.js` confere a estrutura de todo o conteúdo (alternativas, pistas, pílulas, contagens).

## Hierarquia e cadência

Seção → Unidade → Fase (micro-aula, 5 a 8 itens) → Item. A última fase de cada unidade é o **chefão** (`{boss:true}`).
Dentro de cada fase: **pílula do Rubi** (intuição + regra a memorizar) → **exemplo guiado** (micro-passos) → **fixação ativa** com variação → **papel**.

## Progressão por maestria

- Erros voltam ao fim da fase até serem acertados.
- A fase só é concluída com ≥ 70% de acertos de primeira (chefão: ≥ 80%). Abaixo disso, o app pede reforço.
- ≥ 90% concede 👑. A próxima fase só abre ao dominar a anterior.
- **Revisão espaçada** no mapa mistura questões de fases dominadas, priorizando as que você mais errou.
- Progresso salvo em `localStorage` (`mathrubi-v2`).

## Tipos de item (kit.js)

`task` (digitar ou escolher), `paper` (resolver no papel), `pill` (fala do Rubi), `guided` (passo a passo),
`order` (ordenar passos), `coach` (boards interativos `near` e `factors`).
Respostas aceitam variantes separadas por `|`.

## Fontes

- [Calculus Volume 1, Gilbert Strang e Edwin Herman (OpenStax)](https://openstax.org/books/calculus-volume-1/pages/preface)
- [Cálculo 1, É. M. C. Lopes (UFU)](https://repositorio.ufu.br/handle/123456789/25213)
