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

## Progressão (como no Duolingo)

- **Não há nota de corte.** Uma fase termina quando você acerta todos os exercícios.
- O que você erra **volta no final da fase**, e isso se repete até acertar.
- **Antes de refazer os erros, o Rubi explica de novo:** reaparece a regra da fase (com a fórmula em destaque) e as pistas dos exercícios errados.
- Acertar de primeira pelo menos 90% dos exercícios concede 👑 (só enfeite; não bloqueia nada).
- Concluir uma fase libera a próxima. A **Revisão espaçada** no mapa mistura questões de fases concluídas, priorizando as que você mais errou.
- Progresso salvo em `localStorage` (`mathrubi-v2:<usuário>`).

## Tipos de item (kit.js)

`task` (digitar ou escolher), `paper` (resolver no papel), `pill` (fala do Rubi), `guided` (passo a passo),
`order` (ordenar passos), `coach` (boards interativos `near` e `factors`).
Respostas aceitam variantes separadas por `|`.

## Fontes

- [Calculus Volume 1, Gilbert Strang e Edwin Herman (OpenStax)](https://openstax.org/books/calculus-volume-1/pages/preface)
- [Cálculo 1, É. M. C. Lopes (UFU)](https://repositorio.ufu.br/handle/123456789/25213)


## Disciplinas e seções

O seletor no cabeçalho troca entre Cálculo Diferencial e Integral (19 seções), Vetorial e Geometria Analítica (7) e Pré-cálculo (6). O botão **Seções**, abaixo de Aprender, abre o catálogo da disciplina; escolher uma seção mostra somente sua trilha e seus tópicos.

- `dist/catalog.js`: disciplinas, seções, ementas e referências às unidades existentes.
- `dist/duo.css`: tema claro e layouts responsivos.
- As referências do catálogo preservam os IDs das 84 fases e o progresso salvo. A ordem da progressão acompanha o catálogo de Cálculo.
- As seções sem exercícios estão explicitamente marcadas **Em preparação**. A estrutura completa não significa que todas as aulas já foram escritas.


## Liberação entre fases, unidades e seções

`dist/mastery.js` concentra as regras. Não existe porcentagem mínima: vale terminar (acertando tudo, com os erros refeitos).

- **A próxima fase:** concluir a anterior. Ao terminar, a tela diz qual fase foi liberada.
- **A próxima unidade:** concluir todas as fases da unidade, incluindo o desafio.
- **A próxima seção:** concluir todas as unidades **e** a avaliação da seção. Quando todas as fases estão concluídas, o botão do mapa vira "Fazer a avaliação da seção".

Seções sem aulas continuam "Em preparação" e bloqueiam as seguintes. Fases concluídas seguem disponíveis para revisão.

O reforço elementar (28 fases e 198 itens) está na disciplina **Pré-cálculo**, em `dist/content-precalculo.js`.

A antiga seção "Fundamentos e funções" (8 unidades) foi retirada do app e guardada em `arquivo/fundamentos-e-funcoes/`, fora de `dist/`.

Validadores: `node tools/validate.js`, `node tools/validate-mastery.js` (170 verificações, incluindo a abertura de cada fase de cada seção) e `node tools/validate-foundations-math.js` (Pré-cálculo).

## Login (usuário + autenticador)

`dist/auth.js` pede só o nome de usuário e o código de 6 dígitos (TOTP) de um app autenticador; não há senha.

- **Criar conta:** usuário → e-mail → **QR code** (gerado por `dist/qr.js`, sem bibliotecas externas) com a chave manual como alternativa → código de confirmação → **8 códigos de recuperação**, mostrados uma única vez.
- **Recuperar:** em "Perdi o autenticador", digite o e-mail cadastrado e um código de recuperação. O código usado deixa de valer; em seguida liga-se um autenticador novo e são gerados 8 códigos novos (os antigos são invalidados).
- **Limites:** o e-mail só identifica a conta e confirma a recuperação; nenhuma mensagem é enviada, porque o app não tem servidor. Contas, hashes dos códigos e sessão ficam no `localStorage` do navegador, então isto separa o progresso de cada pessoa, mas não é segurança de servidor. Contas criadas antes do e-mail e dos códigos existirem não têm recuperação.
- `node tools/validate-qr.js` confere o gerador de QR com um decodificador independente.

## Praticar com NVIDIA

Abra o app com `node tools/serve.js` em http://localhost:5183. Em **Configurações**, cole a chave NVIDIA e escolha o tema. A chave fica só na memória da aba. O tema fica salvo por usuário no navegador.

Em **Praticar**, escolha o curso. O app usa os nomes de seção, unidade e fase para limitar a geração às fases já concluídas. A NVIDIA recebe esses tópicos e o nome do curso, além da chave usada para autenticar a chamada. As questões geradas são extras e não alteram a progressão da trilha. A revisão espaçada continua disponível.

A rota `POST /api/practice` é implementada em `tools/practice-api.js` e encaminha a chamada à NVIDIA com o modelo `meta/llama-3.3-70b-instruct`. A geração exige Node.js 20+ e um servidor que execute `tools/serve.js`. Para hospedar o servidor, defina `HOST=0.0.0.0`, configure `PORT` conforme a plataforma e exponha o app por HTTPS. O pacote estático atual da Discloud não inclui essa rota. Sem ela, a prática gerada não funciona.
