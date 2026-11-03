'use strict';
// Fundamentos e funções · unidades 3 e 4: revisão algébrica; funções e gráficos.
// Cada fase: pílula do Rubi (regra em destaque) → exemplo guiado → prática com variação → última questão sem roteiro.
// Linha de prática: [título, enunciado, resposta, pista, explicação, alternativas?]
{
const lesson = (name, lines, rule, model, steps, rows, opts) => phase(name, [
  pill(name + ' · com o Rubi', lines, rule),
  guided(model[0], model[1], steps),
  ...rows.map((r, i) => (i === rows.length - 1 ? paper : task)(r[0], r[1], r[2], r[3], r[4], r[5]))
], opts);
const YN = ['Sim', 'Não'];

COURSE.fundamentos.units.push(unit('Revisão algébrica', 'Produtos notáveis, fatoração e frações algébricas: as ferramentas que desfazem indeterminações nos limites.', [
lesson('Produtos notáveis e fator comum', [
  'Vou te dar a chave de metade dos limites que você vai ver em breve: fatorar. Antes, três produtos notáveis na ponta da língua.',
  'Diferença de quadrados: a² − b² = (a − b)(a + b). Quadrado perfeito: (a ± b)² = a² ± 2ab + b². Repare no termo do meio, 2ab: é ele que todo mundo esquece.',
  'Antes de qualquer fórmula, procure o fator comum: 6x² + 9x = 3x(2x + 3). Tire para fora o que se repete.',
  'Fatorar não muda a expressão, só a reescreve. Para conferir, multiplique de volta e veja se reaparece o original.'
], 'a² − b² = (a − b)(a + b)', ['Fatore x² − 25', 'x² − 25'], [
  step('x² é o quadrado de quem?', 'x', 'Que expressão elevada ao quadrado dá x²?', 'a = x.'),
  step('25 é o quadrado de quem?', '5', 'Pense em 5 · 5.', 'b = 5.'),
  step('Escreva a fatoração (a − b)(a + b).', '(x-5)(x+5)|(x+5)(x-5)', 'Use a = x e b = 5.', 'x² − 25 = (x − 5)(x + 5). Multiplicando de volta, os termos do meio se cancelam.')
], [
  ['Diferença de quadrados', 'Fatore x² − 49', '(x-7)(x+7)|(x+7)(x-7)', 'a = x e b = 7.', 'x² − 49 = (x − 7)(x + 7).'],
  ['Fator comum', 'Qual é o maior fator comum de 6x² + 9x?', '3x', 'Maior número que divide 6 e 9, e a menor potência de x.', '6x² + 9x = 3x(2x + 3).'],
  ['Quadrado perfeito', 'Desenvolva (x + 4)²', 'x^2+8x+16|x²+8x+16', '(a + b)² = a² + 2ab + b².', 'x² + 2·x·4 + 16 = x² + 8x + 16.'],
  ['Reconheça o padrão', 'x² − 6x + 9 = (x − ?)². Qual é o ?', '3', 'O termo do meio é 2ab, com a = x.', 'b = 3: 3² = 9 e 2·x·3 = 6x.'],
  ['O termo do meio', 'Calcule (x + 3)² − (x² + 9) para x = 2', '12', 'Calcule cada parte separadamente.', 'Dá 25 − 13 = 12. A diferença é 6x: sem o 2ab, a conta fica errada.'],
  ['Sem o roteiro', 'Fatore 4x² − 9', '(2x-3)(2x+3)|(2x+3)(2x-3)', 'a = 2x e b = 3.', '(2x)² − 3² = (2x − 3)(2x + 3).']
]),
lesson('Trinômios do 2º grau e raízes', [
  'Para x² + bx + c, procure dois números p e q que SOMAM b e MULTIPLICAM c. Então x² + bx + c = (x + p)(x + q).',
  'Exemplo: x² − 5x + 6. Dois números com soma −5 e produto 6? São −2 e −3. Logo (x − 2)(x − 3).',
  'Se a é raiz de um polinômio, então (x − a) é fator dele. Testar x = 1, −1, 2… ajuda a achar o primeiro fator; depois é só dividir.',
  'É por isso que fatoramos nos limites: o fator (x − a) que zera o numerador e o denominador é justamente o que vai cancelar.'
], 'x² + bx + c = (x + p)(x + q), com p + q = b e p·q = c', ['Fatore x² − 5x − 14', 'x² − 5x − 14'], [
  step('Quais dois números têm produto −14 e soma −5? Qual é o negativo?', '-7', 'Liste pares de fatores de 14 com sinais opostos.', 'Os números são −7 e 2: (−7)·2 = −14 e −7 + 2 = −5.'),
  step('E qual é o positivo?', '2', 'O outro número do par.', 'É o 2.'),
  step('Escreva a fatoração.', '(x-7)(x+2)|(x+2)(x-7)', 'Use (x + p)(x + q) com p = −7 e q = 2.', 'x² − 5x − 14 = (x − 7)(x + 2).')
], [
  ['Soma e produto', 'Fatore x² + 7x + 12', '(x+3)(x+4)|(x+4)(x+3)', 'Soma 7 e produto 12.', 'Os números são 3 e 4.'],
  ['Raízes', 'Quais as raízes de x² − 3x + 2? Dê a maior.', '2', 'Fatore em (x − 1)(x − 2).', 'As raízes são 1 e 2; a maior é 2.'],
  ['Teste uma raiz', 'Quanto vale x³ − 3x + 2 em x = 1?', '0', 'Substitua x por 1.', '1 − 3 + 2 = 0. Logo (x − 1) é fator desse polinômio.'],
  ['Confira a divisão', 'Dividindo x³ − 3x + 2 por (x − 1) obtém-se x² + x − 2. Calcule esse quociente em x = 3.', '10', 'Substitua x = 3 em x² + x − 2.', '9 + 3 − 2 = 10, e (3 − 1)·10 = 20 = 27 − 9 + 2.'],
  ['Fatoração completa', 'Fatore x² + x − 2', '(x-1)(x+2)|(x+2)(x-1)', 'Soma 1 e produto −2.', 'Então x³ − 3x + 2 = (x − 1)²(x + 2).'],
  ['Sem o roteiro', 'Fatore x² − 2x − 15', '(x-5)(x+3)|(x+3)(x-5)', 'Soma −2 e produto −15.', 'Os números são −5 e 3.']
]),
lesson('Cubos e agrupamento', [
  'Mais duas fórmulas, para quando aparecer x³ − 1 ou x³ + 8: diferença e soma de cubos.',
  'a³ − b³ = (a − b)(a² + ab + b²). Já a³ + b³ = (a + b)(a² − ab + b²). O segundo fator tem o sinal do meio oposto ao do primeiro.',
  'O fator a² ± ab + b² não tem raízes reais, então a fatoração para aí.',
  'Agrupamento: x³ + x² + 2x + 2 = x²(x + 1) + 2(x + 1) = (x + 1)(x² + 2). Tire o fator comum de cada par.'
], 'a³ − b³ = (a − b)(a² + ab + b²)', ['Fatore x³ − 8', 'x³ − 8'], [
  step('8 é o cubo de quem?', '2', 'Que número vezes ele mesmo, três vezes, dá 8?', 'b = 2.'),
  step('Qual é o primeiro fator, (a − b)?', 'x-2', 'Use a = x e b = 2.', 'O primeiro fator é x − 2.'),
  step('Escreva o segundo fator, a² + ab + b².', 'x^2+2x+4|x²+2x+4', 'a² + a·b + b² com a = x e b = 2.', 'x² + 2x + 4. Portanto x³ − 8 = (x − 2)(x² + 2x + 4).')
], [
  ['Diferença de cubos', 'Fatore x³ − 1. Qual é o segundo fator, além de x − 1?', 'x^2+x+1|x²+x+1', 'a = x e b = 1.', 'x³ − 1 = (x − 1)(x² + x + 1).'],
  ['Soma de cubos', 'x³ + 27 = (x + 3)(x² − 3x + 9). Calcule o segundo fator em x = 1.', '7', 'Substitua x = 1.', '1 − 3 + 9 = 7, e 4·7 = 28 = 1 + 27.'],
  ['Agrupamento', 'x³ + 3x² + 2x + 6 = x²(x + 3) + 2(x + 3). Qual o segundo fator, além de (x + 3)?', 'x^2+2|x²+2', 'Coloque (x + 3) em evidência.', '(x + 3)(x² + 2).'],
  ['Valor da forma simplificada', 'Para x ≠ 1, (x³ − 1)/(x − 1) = x² + x + 1. Quanto vale x² + x + 1 em x = 1?', '3', 'Substitua x = 1 na forma simplificada.', '1 + 1 + 1 = 3. Guarde: a expressão original não existe em x = 1, a simplificada vale 3.'],
  ['Sem o roteiro', 'Fatore x³ − 64. Qual o segundo fator, além de x − 4?', 'x^2+4x+16|x²+4x+16', 'a = x e b = 4.', 'x³ − 64 = (x − 4)(x² + 4x + 16).']
]),
lesson('Frações algébricas e restrições', [
  'Fração algébrica é uma fração com x. Antes de tudo, pergunte: para quais valores de x o denominador vira zero? Esses valores ficam proibidos.',
  'Simplificar é cancelar FATORES iguais: (x² − 4)/(x − 2) = (x − 2)(x + 2)/(x − 2) = x + 2, para x ≠ 2.',
  'Não se cancelam parcelas! Em (x + 3)/3 não dá para "cortar os 3". Só corta o que multiplica a expressão inteira.',
  'A restrição x ≠ 2 vale para a expressão ORIGINAL, mesmo depois de simplificar. A forma x + 2 vale 4 em x = 2, mas a original não existe lá: é um buraco no gráfico. Os limites vão investigar esse buraco.'
], '(x − a)(x + b)/(x − a) = x + b, com x ≠ a', ['Simplifique (x² − 9)/(x − 3)', '(x² − 9)/(x − 3)'], [
  step('Que valor de x o denominador proíbe?', '3', 'Quando x − 3 = 0?', 'x ≠ 3.'),
  step('Fatore o numerador.', '(x-3)(x+3)|(x+3)(x-3)', 'Diferença de quadrados.', 'x² − 9 = (x − 3)(x + 3).'),
  step('Cancele o fator comum. O que sobra?', 'x+3|3+x', 'Corte (x − 3) em cima e embaixo.', 'Fica x + 3, para x ≠ 3.')
], [
  ['Restrição', 'Para que valor de x a fração 5/(x − 4) não existe?', '4', 'Ache onde o denominador zera.', 'Em x = 4 o denominador vale 0.'],
  ['Simplifique', 'Simplifique (x² − 4x)/(x − 4) para x ≠ 4.', 'x', 'Tire x em evidência no numerador.', 'x(x − 4)/(x − 4) = x.'],
  ['O buraco', 'Para x ≠ 1, (x² − 1)/(x − 1) = x + 1. Quanto vale x + 1 em x = 1?', '2', 'Substitua x = 1 na forma simplificada.', 'Vale 2: o gráfico tem um buraco no ponto (1; 2).'],
  ['Denominador comum', 'Em 1/x + 1/2, com denominador comum 2x, qual é o numerador?', '2+x|x+2', 'Multiplique 1/x por 2/2 e 1/2 por x/x.', '(2 + x)/(2x).'],
  ['Não corte parcelas', 'Quanto vale (x + 3)/3 quando x = 6?', '3', 'Calcule 9/3.', 'Vale 3. "Cortar o 3" daria x = 6, o que está errado.'],
  ['Sem o roteiro', 'Simplifique (x² − x − 6)/(x − 3) para x ≠ 3.', 'x+2|2+x', 'Fatore o numerador.', '(x − 3)(x + 2)/(x − 3) = x + 2.']
]),
lesson('Equações, inequações e sinal', [
  'Resolver uma equação é trocá-la por outras EQUIVALENTES, com as mesmas soluções. Somar o mesmo número dos dois lados, ou multiplicar por um número não nulo, mantém a equivalência.',
  'Cuidado: elevar ao quadrado ou multiplicar pela variável pode inventar soluções falsas. Sempre teste no original.',
  'Para inequações com x², estude o sinal: ache as raízes, marque na reta e teste um ponto de cada trecho. O sinal só muda nas raízes.',
  'Exemplo: x² − 3x + 2 > 0. Raízes 1 e 2. Teste 0: 2 > 0 ✓. Teste 1,5: −0,25 ✗. Teste 3: 2 ✓. Solução: x < 1 ou x > 2.'
], 'ab = 0 ⇒ a = 0 ou b = 0', ['Resolva x² − x − 6 ≤ 0', 'x² − x − 6 ≤ 0'], [
  step('Qual a menor raiz de x² − x − 6?', '-2', 'Fatore em (x − 3)(x + 2).', 'As raízes são −2 e 3.'),
  step('Qual a maior raiz?', '3', 'A outra raiz do mesmo fator.', 'É 3.'),
  step('A parábola abre para cima, então fica ≤ 0 entre as raízes. Escreva o intervalo.', '[-2;3]', 'As raízes entram, porque a desigualdade é ≤.', 'A solução é [−2; 3].')
], [
  ['Produto nulo', 'Resolva (x − 2)(x + 5) = 0. Qual a menor solução?', '-5', 'Cada fator pode ser zero.', 'As soluções são 2 e −5.'],
  ['Solução falsa', 'Resolva √(x + 2) = x. Qual solução é válida?', '2', 'Eleve ao quadrado e teste os candidatos no original.', 'x² − x − 2 = 0 dá 2 e −1. Mas √1 = 1 ≠ −1, então só o 2 serve.'],
  ['Estude o sinal', 'Qual o sinal de x² − 4 em x = 0?', 'Negativo', 'Substitua x = 0.', 'Vale −4, negativo.', ['Positivo', 'Negativo']],
  ['Intervalo', 'Resolva x² − 4 < 0 e escreva o intervalo.', '(-2;2)|]-2;2[', 'As raízes são ±2. Teste x = 0.', 'Fica negativo entre as raízes, sem as pontas.'],
  ['Inequação racional', '(x − 1)/(x + 2) ≥ 0. Qual valor de x nunca pode ser solução?', '-2', 'O que acontece com o denominador?', 'Em x = −2 o denominador zera. O x = 1 anula o numerador e entra na solução.'],
  ['Sem o roteiro', 'Resolva x² − 5x + 6 < 0 e escreva o intervalo.', '(2;3)|]2;3[', 'Raízes 2 e 3; a parábola abre para cima.', 'Negativa entre as raízes: (2; 3).']
]),
phase('Desafio de revisão: álgebra', [
  pill('O que mais cai nos limites · com o Rubi', [
    'Hora de juntar tudo. Para cada expressão, pergunte: tem fator comum? É diferença de quadrados ou cubos? É um trinômio? E qual valor de x fica proibido?',
    'Anote a restrição ANTES de simplificar. Depois de cancelar, ela continua valendo para a expressão original.',
    'Este desafio fecha a unidade e exige 80% de acertos de primeira.'
  ], 'Restrição → fatorar → cancelar → conferir'),
  guided('Simplifique (x³ − 8)/(x² − 4)', '(x³ − 8)/(x² − 4)', [
    step('Qual é o segundo fator de x³ − 8 = (x − 2)(?)', 'x^2+2x+4|x²+2x+4', 'Diferença de cubos.', 'x² + 2x + 4.'),
    step('Fatore o denominador.', '(x-2)(x+2)|(x+2)(x-2)', 'Diferença de quadrados.', 'x² − 4 = (x − 2)(x + 2).'),
    step('Cancele (x − 2). Qual valor positivo continua proibido na expressão ORIGINAL?', '2', 'O fator cancelado é x − 2.', 'A original não existe em x = 2 nem em x = −2. A forma simplificada (x² + 2x + 4)/(x + 2) só exclui −2, mas o 2 continua fora do domínio original.')
  ]),
  task('Restrições', 'Quais valores anulam o denominador de (x + 1)/(x² − 9)? Dê o maior.', '3', 'Resolva x² − 9 = 0.', 'Os valores são −3 e 3.'),
  task('Fatore', 'x² + 2x − 15 tem o fator (x − 3). Qual é o outro?', 'x+5|5+x', 'Soma 2 e produto −15.', 'x² + 2x − 15 = (x − 3)(x + 5).'),
  task('Simplifique', 'Simplifique (x² − 5x + 6)/(x − 2) para x ≠ 2.', 'x-3', 'Fatore em (x − 2)(x − 3).', 'Cancelando (x − 2), sobra x − 3.'),
  task('Forma simplificada', 'Para x ≠ 1, (x³ − 1)/(x² − 1) = (x² + x + 1)/(x + 1). Quanto vale a forma simplificada em x = 1?', '3/2', 'Substitua x = 1 na forma simplificada.', '(1 + 1 + 1)/(1 + 1) = 3/2.'),
  paper('Inequação', 'Resolva x² − 9 ≥ 0. Qual a menor solução positiva?', '3', 'Raízes ±3; a parábola abre para cima.', 'Vale para x ≤ −3 ou x ≥ 3. A menor positiva é 3.'),
  paper('Sem o roteiro', 'Simplifique (x² − 16)/(x² − 4x) para x ≠ 0 e x ≠ 4.', '(x+4)/x|(4+x)/x|1+4/x', 'Fatore: (x − 4)(x + 4) e x(x − 4).', 'Cancelando (x − 4), sobra (x + 4)/x.')
], {boss: true})
]));

COURSE.fundamentos.units.push(unit('Funções e gráficos', 'Domínio, imagem, zeros, sinal, funções por partes e as famílias de funções que mais aparecem no Cálculo.', [
lesson('Função, domínio e imagem', [
  'Uma função f leva cada x do domínio a exatamente UM valor f(x). Se um x pudesse dar dois resultados, não seria função.',
  'Domínio: os valores de x permitidos. Imagem: os valores de f(x) que realmente acontecem.',
  'No gráfico: uma reta vertical corta a curva no máximo uma vez (teste da reta vertical). O círculo x² + y² = 1 não passa nesse teste.',
  'Calcular f(a) é substituir x por a, COM parênteses. Se f(x) = x² − 3x, então f(−2) = (−2)² − 3(−2) = 4 + 6 = 10.'
], 'Dom(f): entradas permitidas · Im(f): saídas que acontecem', ['Calcule f(−2) para f(x) = x² − 3x', 'f(x) = x² − 3x'], [
  step('Quanto vale (−2)²?', '4', 'Elevar ao quadrado um negativo dá positivo.', '(−2)² = 4.'),
  step('Quanto vale −3·(−2)?', '6', 'Sinal negativo vezes sinal negativo.', 'É +6.'),
  step('Some os dois termos.', '10', '4 + 6.', 'f(−2) = 10.')
], [
  ['Valor da função', 'f(x) = 2x − 5. Calcule f(4).', '3', 'Substitua x por 4.', '2·4 − 5 = 3.'],
  ['Parênteses', 'f(x) = x² − x. Calcule f(−3).', '12', 'Use parênteses: (−3)² − (−3).', '9 + 3 = 12.'],
  ['Com letra', 'f(x) = 3x + 1. Simplifique f(a + 1).', '3a+4|4+3a', 'Troque x por (a + 1).', '3(a + 1) + 1 = 3a + 4.'],
  ['Teste da reta vertical', 'A relação x = y² define y como função de x?', 'Não', 'Quantos y existem para x = 4?', 'Para x = 4 há y = 2 e y = −2: dois valores.', YN],
  ['Imagem', 'A imagem de f(x) = x² + 1 é [m; +∞). Qual o valor de m?', '1', 'Qual o menor valor de x² + 1?', 'x² ≥ 0, então f ≥ 1.'],
  ['Sem o roteiro', 'f(x) = x². Simplifique f(3 + h) − f(3).', '6h+h^2|6h+h²|h^2+6h|h²+6h', 'Desenvolva (3 + h)².', '(9 + 6h + h²) − 9 = 6h + h². Esse tipo de conta vira a derivada mais adiante.']
]),
lesson('Domínio: racionais e radicais', [
  'Três perguntas rápidas para achar o domínio: Há denominador? Há raiz de índice par? Há logaritmo? (O logaritmo vem na unidade 7.)',
  'Denominador ≠ 0. Radicando de raiz par ≥ 0. Se a raiz está no denominador, radicando > 0.',
  'Exemplo: f(x) = √(x − 2)/(x − 5). Precisamos de x − 2 ≥ 0 e x ≠ 5. Domínio: [2; 5) ∪ (5; +∞).',
  'O domínio é o da expressão ORIGINAL, antes de qualquer simplificação. Raízes de índice ímpar, como ∛x, aceitam números negativos.'
], 'Denominador ≠ 0 · radicando (índice par) ≥ 0 · √ no denominador: > 0', ['Domínio de f(x) = √(x − 1)/(x − 4)', 'f(x) = √(x − 1)/(x − 4)'], [
  step('A raiz exige x ≥ ?', '1', 'Radicando maior ou igual a zero.', 'x − 1 ≥ 0, ou seja, x ≥ 1.'),
  step('Qual valor o denominador proíbe?', '4', 'Quando x − 4 = 0?', 'x ≠ 4.'),
  step('O 4 está dentro de [1; +∞)?', 'Sim', 'Compare 4 com 1.', 'Está, então precisa ser retirado: [1; 4) ∪ (4; +∞).', YN)
], [
  ['Denominador', 'Qual valor de x fica fora do domínio de 1/(2x − 6)?', '3', 'Resolva 2x − 6 = 0.', 'x = 3.'],
  ['Raiz par', 'Escreva o domínio de √(x + 5) como intervalo.', '[-5;+∞)|[-5;∞)|[-5;+∞[|[-5;∞[', 'Radicando ≥ 0.', 'x + 5 ≥ 0 ⇒ x ≥ −5.'],
  ['Raiz ímpar', 'Quanto vale ∛(−8)?', '-2', 'Que número ao cubo dá −8?', '(−2)³ = −8. Raiz cúbica aceita negativos.'],
  ['Raiz no denominador', 'Escreva o domínio de 1/√(x − 3) como intervalo.', '(3;+∞)|(3;∞)|]3;+∞[|]3;∞[', 'Agora o radicando precisa ser > 0.', 'x − 3 > 0 ⇒ x > 3.'],
  ['Dois cuidados', 'Quantos inteiros de 0 a 10 pertencem ao domínio de √(x − 2)/(x − 7)?', '8', 'Exija x ≥ 2 e x ≠ 7.', 'Valem 2, 3, 4, 5, 6, 8, 9, 10: são 8.'],
  ['Sem o roteiro', 'Escreva o domínio de √(4 − x) como intervalo.', '(-∞;4]|]-∞;4]', 'Exija 4 − x ≥ 0.', '4 − x ≥ 0 ⇒ x ≤ 4.']
]),
lesson('Zeros, sinal e leitura de gráficos', [
  'Zero de f é um valor de x com f(x) = 0: onde o gráfico toca o eixo x. Sinal: f > 0 com o gráfico acima do eixo; f < 0, abaixo.',
  'Para os zeros de uma fração, iguale o NUMERADOR a zero, e depois confira se o denominador também não zera.',
  'O sinal só pode mudar nos zeros e nos pontos fora do domínio. Marque esses pontos na reta e teste um valor em cada trecho.',
  'O ponto onde o gráfico corta o eixo y é f(0), se 0 estiver no domínio.'
], 'Zeros: f(x) = 0 · f > 0 acima do eixo · f < 0 abaixo', ['Zeros e sinal de f(x) = (x − 1)(x + 3)', 'f(x) = (x − 1)(x + 3)'], [
  step('Qual o menor zero?', '-3', 'Cada fator pode ser zero.', 'Os zeros são −3 e 1.'),
  step('Qual o maior zero?', '1', 'O outro fator.', 'É 1.'),
  step('Qual o sinal de f em x = 0?', 'Negativo', 'Calcule (0 − 1)(0 + 3).', 'f(0) = −3. Então f < 0 entre os zeros.', ['Positivo', 'Negativo'])
], [
  ['Zero de fração', 'Qual o zero positivo de (x² − 4)/(x + 1)?', '2', 'Iguale o numerador a zero.', 'x² = 4 dá ±2. O positivo é 2.'],
  ['Zero falso', 'f(x) = (x² − 1)/(x − 1). O número 1 é zero de f?', 'Não', 'Ele pertence ao domínio?', 'Em x = 1 o denominador zera, então f(1) nem existe.', YN],
  ['Corte no eixo y', 'f(x) = x² − 4x + 3. Quanto vale f(0)?', '3', 'Substitua x = 0.', 'f(0) = 3.'],
  ['Sinal', 'Em que intervalo x² − 4x + 3 é negativa?', '(1;3)|]1;3[', 'As raízes são 1 e 3.', 'A parábola abre para cima, então é negativa entre as raízes.'],
  ['Sem zeros', 'Quantos zeros reais tem x² + 1?', '0', 'x² + 1 pode ser zero?', 'x² + 1 ≥ 1: nunca zera.'],
  ['Sem o roteiro', 'Qual a soma dos zeros de f(x) = x² − 7x + 10?', '7', 'Fatore em (x − 2)(x − 5).', 'Os zeros são 2 e 5; a soma é 7.']
]),
lesson('Funções definidas por partes', [
  'Algumas funções mudam de fórmula conforme o valor de x. Cada pedaço vale só no seu trecho.',
  'Exemplo: f(x) = x + 1 se x < 2, e f(x) = x² se x ≥ 2. Para f(1) usamos o primeiro pedaço; para f(2), o segundo.',
  'O módulo é uma função por partes: |x| = x se x ≥ 0 e |x| = −x se x < 0.',
  'Pergunta que será essencial nos limites: o que acontece perto do ponto de emenda? Compare o valor que cada pedaço "quer" dar ali.'
], 'Primeiro decida o trecho; depois use a fórmula daquele trecho', ['f(x) = 2x se x < 1; f(x) = x + 3 se x ≥ 1. Calcule f(1)', 'f(x) = 2x (x < 1) · f(x) = x + 3 (x ≥ 1)'], [
  step('x = 1 está em qual trecho?', 'x ≥ 1', 'Olhe a desigualdade das duas fórmulas.', 'O 1 entra no segundo trecho, que tem ≥.', ['x < 1', 'x ≥ 1']),
  step('Qual fórmula usar?', 'x+3|3+x', 'A do trecho x ≥ 1.', 'f(x) = x + 3.'),
  step('Quanto vale f(1)?', '4', 'Substitua x = 1.', 'f(1) = 4.')
], [
  ['Escolha o trecho', 'Para a mesma f, calcule f(0).', '0', 'x = 0 < 1: use 2x.', 'f(0) = 0.'],
  ['Na emenda', 'Na mesma f, que valor o pedaço 2x dá em x = 1?', '2', 'Substitua x = 1 em 2x.', '2·1 = 2, enquanto o outro pedaço dá 4.'],
  ['Compare os pedaços', 'Na mesma f, qual a diferença (x + 3) − (2x) em x = 1?', '2', 'Calcule 4 − 2.', 'Há um salto de 2 no ponto de emenda.'],
  ['Módulo', 'g(x) = |x − 3|. Calcule g(−1).', '4', 'Calcule x − 3 antes do módulo.', '|−4| = 4.'],
  ['Três trechos', 'h(x) = −1 se x < 0; h(0) = 0; h(x) = 1 se x > 0. Calcule h(−5) + h(0) + h(7).', '0', 'Escolha o trecho de cada valor.', '−1 + 0 + 1 = 0.'],
  ['Sem o roteiro', 'f(x) = x² se x ≤ 2; f(x) = 6 − x se x > 2. Calcule f(2) + f(4).', '6', 'Para x = 2 vale o primeiro trecho.', 'f(2) = 4 e f(4) = 2; a soma é 6.']
]),
lesson('Famílias de funções do Cálculo', [
  'Quatro famílias que você vai encontrar o tempo todo: afins (retas), quadráticas (parábolas), polinomiais e racionais.',
  'Afim: f(x) = mx + b. O m é a inclinação (quanto y muda quando x sobe 1) e b é onde corta o eixo y. Com dois pontos, m = (y₂ − y₁)/(x₂ − x₁).',
  'Quadrática: f(x) = ax² + bx + c. O vértice fica em x = −b/(2a). Se a > 0 abre para cima (mínimo); se a < 0, para baixo (máximo).',
  'Racional: quociente de polinômios. Onde o denominador zera e o numerador não, há uma assíntota vertical: o gráfico sobe ou desce sem parar.',
  'Raiz: √x só existe para x ≥ 0 e cresce devagar. Guarde essas formas: no Cálculo você vai reconhecê-las e derivá-las.'
], 'f(x) = mx + b · vértice em x = −b/(2a)', ['Vértice de f(x) = x² − 6x + 5', 'f(x) = x² − 6x + 5'], [
  step('Qual o x do vértice, −b/(2a)?', '3', 'Aqui a = 1 e b = −6.', '−(−6)/2 = 3.'),
  step('Quanto vale f(3)?', '-4', '9 − 18 + 5.', 'f(3) = −4.'),
  step('O vértice é mínimo ou máximo?', 'Mínimo', 'Olhe o sinal de a.', 'a = 1 > 0: abre para cima, vértice mínimo.', ['Mínimo', 'Máximo'])
], [
  ['Inclinação', 'Qual a inclinação da reta por (1; 2) e (3; 8)?', '3', 'Calcule (8 − 2)/(3 − 1).', '6/2 = 3.'],
  ['Corte no eixo y', 'A reta y = 3x − 7 corta o eixo y em qual valor?', '-7', 'Calcule y em x = 0.', 'b = −7.'],
  ['Vértice', 'Qual o x do vértice de f(x) = −x² + 4x?', '2', 'Use −b/(2a) com a = −1 e b = 4.', '−4/(−2) = 2.'],
  ['Assíntota', 'f(x) = 1/(x − 3) tem assíntota vertical em qual x?', '3', 'Onde o denominador zera?', 'Em x = 3.'],
  ['Valor mínimo', 'Qual o valor mínimo de x² − 2x + 5?', '4', 'O vértice está em x = 1.', 'f(1) = 1 − 2 + 5 = 4.'],
  ['Sem o roteiro', 'Uma reta passa por (0; 1) com inclinação 2. Qual seu valor em x = 5?', '11', 'Escreva y = 2x + 1.', 'y = 2·5 + 1 = 11.']
]),
phase('Desafio de revisão: funções e gráficos', [
  pill('Leia a função antes de calcular · com o Rubi', [
    'Diante de uma função, faça sempre o mesmo roteiro: domínio, zeros, sinal e comportamento perto dos pontos especiais.',
    'Se a função é por partes, descubra em qual trecho cai cada valor. Se é racional, procure onde o denominador zera.',
    'Este desafio fecha a unidade e exige 80% de acertos de primeira.'
  ], 'Domínio → zeros → sinal → pontos especiais'),
  guided('Domínio e valor de f(x) = √(x + 1)/(x − 3)', 'f(x) = √(x + 1)/(x − 3)', [
    step('A raiz exige x ≥ ?', '-1', 'Radicando ≥ 0.', 'x + 1 ≥ 0 ⇒ x ≥ −1.'),
    step('Qual valor o denominador proíbe?', '3', 'Resolva x − 3 = 0.', 'x ≠ 3.'),
    step('Calcule f(8).', '3/5', 'Substitua x = 8.', '√9/5 = 3/5.')
  ]),
  task('Contagem no domínio', 'Quantos inteiros de −3 a 5 pertencem ao domínio de √(x + 1)/(x − 3)?', '6', 'Exija x ≥ −1 e x ≠ 3.', 'Valem −1, 0, 1, 2, 4, 5: são 6.'),
  task('Zeros', 'Quantos zeros tem f(x) = (x² − 9)/(x + 3)?', '1', 'x² − 9 = 0 dá ±3. Confira o domínio.', 'O −3 não está no domínio. Só x = 3 é zero.'),
  task('Por partes', 'f(x) = x + 2 se x < 1; f(x) = x² se x ≥ 1. Calcule f(0) + f(3).', '11', 'Escolha o trecho de cada valor.', 'f(0) = 2 e f(3) = 9; a soma é 11.'),
  task('Vértice', 'Qual o valor mínimo de x² − 4x + 7?', '3', 'O vértice está em x = 2.', 'f(2) = 4 − 8 + 7 = 3.'),
  paper('Quociente de diferenças', 'Para f(x) = x², simplifique (f(x + h) − f(x))/h, com h ≠ 0.', '2x+h|h+2x', 'Desenvolva (x + h)².', '(2xh + h²)/h = 2x + h.'),
  paper('Sem o roteiro', 'Quantos dos inteiros 0, 1, 2 e 3 pertencem ao domínio de √(x² − 4)?', '2', 'Exija x² ≥ 4.', 'Servem 2 e 3: são 2 inteiros.')
], {boss: true})
]));
}
