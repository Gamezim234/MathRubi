'use strict';
// Fundamentos e funções · unidades 7 e 8: exponenciais e logaritmos; revisão integrada para limites.
// Linha de prática: [título, enunciado, resposta, pista, explicação, alternativas?]
{
const lesson = (name, lines, rule, model, steps, rows, opts) => phase(name, [
  pill(name + ' · com o Rubi', lines, rule),
  guided(model[0], model[1], steps),
  ...rows.map((r, i) => (i === rows.length - 1 ? paper : task)(r[0], r[1], r[2], r[3], r[4], r[5]))
], opts);
const YN = ['Sim', 'Não'];

COURSE.fundamentos.units.push(unit('Exponenciais e logaritmos', 'Crescimento e decaimento, logaritmos como inversos, o número e e equações essenciais.', [
lesson('Funções exponenciais', [
  'Exponencial é f(x) = aˣ, com a > 0 e a ≠ 1. Aqui a variável está no EXPOENTE; é diferente de uma potência como x².',
  'O domínio é R, a imagem é (0; +∞) e o gráfico sempre passa por (0; 1). Ele nunca toca o eixo x: esse eixo é uma assíntota horizontal.',
  'Se a > 1, a função cresce; se 0 < a < 1, ela decai. Regras: aˣ·aʸ = aˣ⁺ʸ, (aˣ)ʸ = aˣʸ e a⁻ˣ = 1/aˣ.',
  'Crescimento e decaimento aparecem como P(t) = P₀·aᵗ, onde P₀ é o valor inicial.'
], 'f(x) = aˣ: domínio R · imagem (0; +∞) · passa por (0; 1)', ['P(t) = 100·2ᵗ: a população dobra a cada hora', 'P(t) = 100 · 2ᵗ'], [
  step('Quanto vale 2³?', '8', '2 · 2 · 2.', '8.'),
  step('Quanto vale P(3)?', '800', 'Multiplique 100 por 2³.', 'P(3) = 800.'),
  step('Em que t temos P(t) = 400?', '2', 'Procure 2ᵗ = 4.', 't = 2, pois 2² = 4.')
], [
  ['Valor', 'f(x) = 2ˣ. Calcule f(5).', '32', 'Multiplique 2 cinco vezes.', '2⁵ = 32.'],
  ['Expoente negativo', 'f(x) = 3ˣ. Calcule f(−2).', '1/9', 'a⁻ˣ = 1/aˣ.', '3⁻² = 1/9.'],
  ['Imagem', 'Existe x real com 2ˣ = −4?', 'Não', 'Qual a imagem de aˣ?', 'A imagem é (0; +∞): nunca é negativa.', YN],
  ['Decaimento', 'Calcule (1/2)ˣ em x = 3.', '1/8', 'Multiplique 1/2 três vezes.', '1/8.'],
  ['Meia-vida', 'M(t) = 80·(1/2)ᵗ. Calcule M(3).', '10', 'Calcule (1/2)³ = 1/8.', '80/8 = 10.'],
  ['Sem o roteiro', 'Resolva 2^(x+1) = 16.', '3', 'Escreva 16 como potência de 2.', '16 = 2⁴, então x + 1 = 4 e x = 3.']
]),
lesson('Logaritmo: a inversa da exponencial', [
  'logₐ(b) responde: a qual expoente devo elevar a para obter b?',
  'Exemplo: log₂(8) = 3, porque 2³ = 8. E log₁₀(1000) = 3.',
  'logₐ e aˣ são inversas: logₐ(aˣ) = x e a^(logₐ x) = x.',
  'Domínio: o argumento tem que ser POSITIVO. log(0) e log(−3) não existem. A imagem é R, e o gráfico passa por (1; 0).'
], 'logₐ(b) = c ⇔ aᶜ = b (a > 0, a ≠ 1, b > 0)', ['Calcule log₃(81)', 'log₃(81)'], [
  step('3 elevado a que expoente dá 81?', '4', 'Multiplique 3 várias vezes.', '3⁴ = 81.'),
  step('Quanto vale log₃(1/3)?', '-1', '3 elevado a quê dá 1/3?', '3⁻¹ = 1/3.'),
  step('Quanto vale log₃(1)?', '0', 'Qualquer base elevada a 0 dá 1.', '0.')
], [
  ['Valor', 'Calcule log₂(32).', '5', '2 elevado a quê dá 32?', '2⁵ = 32.'],
  ['Raiz', 'Calcule log₅(√5).', '1/2', '√5 = 5^(1/2).', '1/2.'],
  ['Potência de 10', 'Calcule log₁₀(10⁷).', '7', 'logₐ(aˣ) = x.', '7.'],
  ['Domínio', 'Qual o menor inteiro no domínio de log(x − 3)?', '4', 'Exija x − 3 > 0.', 'x > 3; o menor inteiro é 4.'],
  ['Restrição', 'Em log₂(5 − x), o valor de x precisa ser menor que quanto?', '5', 'Exija 5 − x > 0.', 'x < 5.'],
  ['Sem o roteiro', 'Calcule log₄(1/16).', '-2', '4⁻² = 1/16.', '−2.']
]),
lesson('Propriedades dos logaritmos e restrições', [
  'Três propriedades para guardar: log(xy) = log x + log y, log(x/y) = log x − log y e log(xʳ) = r·log x.',
  'Elas valem para x > 0 e y > 0! Por exemplo, log((−2)(−3)) existe, mas log(−2) + log(−3) não existe.',
  'Atenção: log(x + y) NÃO é log x + log y. Para soma, não há regra.',
  'Mudança de base: logₐ(b) = log b / log a (qualquer base comum).',
  'Restrições escondidas: log(x²) = 2 log|x|, e não 2 log x, que só vale para x > 0.'
], 'log(xy) = log x + log y · log(x/y) = log x − log y · log(xʳ) = r·log x', ['Calcule log₂12 + log₂(2/3)', 'log₂12 + log₂(2/3)'], [
  step('Pela regra da soma, o resultado é log₂ de 12·(2/3). Quanto vale 12·(2/3)?', '8', 'Multiplique.', '8.'),
  step('Quanto vale log₂(8)?', '3', '2 elevado a quê dá 8?', '3.'),
  step('Essa regra valeria com −2/3 no lugar de 2/3?', 'Não', 'O logaritmo exige argumento positivo.', 'Não: log₂(−2/3) nem existe.', YN)
], [
  ['Soma', 'Calcule log₆2 + log₆3.', '1', 'Junte em log₆(2·3).', 'log₆6 = 1.'],
  ['Diferença', 'Calcule log₂40 − log₂5.', '3', 'Junte em log₂(40/5).', 'log₂8 = 3.'],
  ['Potência', 'Calcule 3·log₃9.', '6', 'log₃9 = 2.', '3·2 = 6.'],
  ['Mudança de base', 'Calcule log₄8 usando log₂8/log₂4.', '3/2', 'log₂8 = 3 e log₂4 = 2.', '3/2.'],
  ['O erro clássico', 'Com x = y = 4 e base 2, calcule log₂(x + y) − (log₂x + log₂y).', '-1', 'log₂8 = 3 e log₂4 + log₂4 = 4.', '3 − 4 = −1. Não coincidem: não existe regra para a soma.'],
  ['Sem o roteiro', 'Resolva log₂x + log₂(x − 2) = 3, com x > 2.', '4', 'Junte em log₂[x(x − 2)] = 3.', 'x(x − 2) = 8 ⇒ x² − 2x − 8 = 0, dando x = 4 ou x = −2. Só o 4 serve.']
]),
lesson('O número e e o logaritmo natural', [
  'Existe uma base especial: e ≈ 2,71828. É a base em que a exponencial cresce de modo mais "limpo": a taxa de crescimento de eˣ em cada ponto é o próprio eˣ. Vamos ver isso em Derivadas.',
  'O logaritmo natural é ln x = logₑ x. Valem ln(eˣ) = x, e^(ln x) = x, ln 1 = 0 e ln e = 1.',
  'O número e surge dos juros compostos: (1 + 1/n)ⁿ se aproxima de e quando n cresce. Será um dos limites fundamentais.',
  'Todas as propriedades dos logaritmos continuam valendo para o ln, e o argumento continua precisando ser positivo.'
], 'ln x = logₑ x · ln(eˣ) = x · e^(ln x) = x', ['Simplifique expressões com e e ln', 'ln(e⁵) · e^(ln 7) · ln(e²·e³)'], [
  step('Quanto vale ln(e⁵)?', '5', 'ln(eˣ) = x.', '5.'),
  step('Quanto vale e^(ln 7)?', '7', 'e^(ln x) = x.', '7.'),
  step('Quanto vale ln(e²·e³)?', '5', 'e²·e³ = e⁵.', '5.')
], [
  ['ln básico', 'Calcule ln(e³).', '3', 'ln(eˣ) = x.', '3.'],
  ['Exponencial e ln', 'Calcule e^(ln 4).', '4', 'São inversas.', '4.'],
  ['Valores especiais', 'Calcule ln(1) + ln(e).', '1', 'ln 1 = 0 e ln e = 1.', '0 + 1 = 1.'],
  ['Estimativa', 'O valor de e² está entre quais inteiros?', '7 e 8', 'e ≈ 2,718; eleve ao quadrado.', 'e² ≈ 7,39.', ['6 e 7', '7 e 8', '8 e 9']],
  ['Domínio', 'Qual o maior inteiro x em que ln(3 − x) existe?', '2', 'Exija 3 − x > 0.', 'x < 3; o maior inteiro é 2.'],
  ['Sem o roteiro', 'Calcule ln(e⁴) − ln(e).', '3', 'ln(e⁴) = 4 e ln e = 1.', '4 − 1 = 3.']
]),
lesson('Equações exponenciais e logarítmicas', [
  'Equação exponencial: tente igualar as bases. Se não der, aplique logaritmo nos dois lados.',
  'Se aᵘ = aᵛ com a > 0 e a ≠ 1, então u = v. Exemplo: 4ˣ = 2^(x+3) ⇒ 2^(2x) = 2^(x+3) ⇒ x = 3.',
  'Equação logarítmica: junte os logs, passe para a forma exponencial e SEMPRE teste o argumento no original, porque podem sobrar soluções falsas.',
  'Exemplo: ln x + ln(x − 1) = ln 6 ⇒ x(x − 1) = 6 ⇒ x = 3 ou x = −2. O −2 não serve: o ln de negativo não existe.'
], 'aᵘ = aᵛ ⇒ u = v · teste os argumentos dos logs', ['Resolva 3^(2x) = 81', '3^(2x) = 81'], [
  step('Escreva 81 como potência de 3. 81 = 3^?', '4', 'Multiplique 3 várias vezes.', '81 = 3⁴.'),
  step('Então 2x = 4. Quanto vale x?', '2', 'Divida por 2.', 'x = 2.'),
  step('Confira: quanto vale 3^(2·2)?', '81', 'É 3⁴.', '81. A solução está certa.')
], [
  ['Igualar bases', 'Resolva 2^(3x) = 64.', '2', '64 = 2⁶.', '3x = 6 ⇒ x = 2.'],
  ['Bases relacionadas', 'Resolva 9ˣ = 27.', '3/2', 'Escreva tudo como potência de 3.', '3^(2x) = 3³ ⇒ 2x = 3 ⇒ x = 3/2.'],
  ['Aplicar ln', 'Em e^(2x) = 7, aplicando ln obtém-se 2x = ln ?', '7', 'ln(e^(2x)) = 2x.', '2x = ln 7.'],
  ['Forma exponencial', 'Resolva log₂(x − 1) = 3.', '9', 'x − 1 = 2³.', 'x = 9.'],
  ['Solução falsa', 'log₂x + log₂(x − 3) = 2 leva a x(x − 3) = 4, isto é, x = 4 ou x = −1. Qual é válida?', '4', 'Teste os argumentos no original.', 'Com x = −1 o argumento de log₂x é negativo. Vale só x = 4.'],
  ['Sem o roteiro', 'Resolva ln(x − 2) = 1.', 'e+2|2+e', 'x − 2 = e¹.', 'x = e + 2.']
]),
phase('Desafio de revisão: exponenciais e logaritmos', [
  pill('Exponencial de um lado, logaritmo do outro · com o Rubi', [
    'Aqui entram as duas funções inversas. Uma desfaz a outra: aˣ e logₐ x, eˣ e ln x.',
    'Para equações: igualar bases ou aplicar o logaritmo. Para logaritmos: juntar, passar para a forma exponencial e testar o domínio.',
    'Este desafio fecha a unidade e exige 80% de acertos de primeira.'
  ], 'logₐ(aˣ) = x · a^(logₐ x) = x'),
  guided('Resolva log₂x + log₂(x + 2) = 3', 'log₂x + log₂(x + 2) = 3', [
    step('Junte os logs: x(x + 2) = ?', '8', '2³ = 8.', 'x(x + 2) = 8.'),
    step('x² + 2x − 8 = 0 tem qual solução positiva?', '2', 'Fatore em (x + 4)(x − 2).', 'x = 2 ou x = −4.'),
    step('O x = −4 serve?', 'Não', 'Teste o argumento de log₂x.', 'log₂(−4) não existe; só vale x = 2.', YN)
  ]),
  task('Valor', 'Calcule log₃27 + log₂(1/8).', '0', 'log₃27 = 3 e log₂(1/8) = −3.', '3 − 3 = 0.'),
  task('Propriedade', 'Calcule ln(e⁶) − 2·ln(e).', '4', 'ln(e⁶) = 6 e ln e = 1.', '6 − 2 = 4.'),
  task('Domínio', 'Em log₅(2x − 6), x precisa ser maior que quanto?', '3', 'Exija 2x − 6 > 0.', 'x > 3.'),
  task('Exponencial', 'Resolva 5^(2x−1) = 125.', '2', '125 = 5³.', '2x − 1 = 3 ⇒ x = 2.'),
  paper('Equação com ln', 'Resolva ln x + ln(x − 4) = ln 5, com x > 4.', '5', 'Junte em ln[x(x − 4)] = ln 5.', 'x² − 4x − 5 = 0 ⇒ x = 5 ou x = −1. Só o 5 serve.'),
  paper('Sem o roteiro', 'Resolva 100·(1/2)ᵗ = 12,5.', '3', '(1/2)ᵗ = 1/8.', 't = 3.')
], {boss: true})
]));

COURSE.fundamentos.units.push(unit('Revisão integrada para limites', 'Escolha a ferramenta certa, preserve o domínio e leia o comportamento das funções antes de calcular limites.', [
lesson('Qual ferramenta usar?', [
  'Diante de uma expressão com x se aproximando de a, pergunte em ordem: 1) Se eu substituir x = a, dá um número? Então acabou. 2) Deu 0/0? Fatore, racionalize ou simplifique. 3) Deu k/0, com k ≠ 0? Há uma assíntota vertical: olhe o sinal dos dois lados.',
  'Esta unidade ainda não calcula limites. Ela treina a leitura da expressão, que a seção de Limites vai exigir a todo momento.',
  'Mapa de ferramentas: polinômio → fatorar ou dividir; raiz → multiplicar pelo conjugado; trigonometria → identidades; fração composta → denominador comum.'
], 'Substitua primeiro · se 0/0, simplifique · se k/0, estude o sinal', ['Classifique (x² − 9)/(x − 3) em x = 3', '(x² − 9)/(x − 3)'], [
  step('Quanto vale o numerador em x = 3?', '0', 'Substitua x = 3 em x² − 9.', '9 − 9 = 0.'),
  step('Quanto vale o denominador em x = 3?', '0', 'Substitua x = 3 em x − 3.', '0.'),
  step('Qual é a forma?', '0/0', 'Os dois zeraram.', 'Forma 0/0: é preciso fatorar ou simplificar.', ['0/0', 'k/0', 'número'])
], [
  ['Substitua', 'Calcule (x² + 1)/(x + 1) em x = 2.', '5/3', 'Substitua x = 2.', '5/3.'],
  ['Classifique', '(x + 1)/(x − 2) em x = 2 tem qual forma?', '3/0', 'Substitua x = 2 em cima e embaixo.', 'Numerador 3, denominador 0: forma k/0, assíntota vertical.', ['0/0', '3/0', 'número']],
  ['Classifique 2', '(x² − 4)/(x − 2) em x = 2 tem qual forma?', '0/0', 'Substitua x = 2.', 'Zero em cima e embaixo.', ['0/0', '3/0', 'número']],
  ['Ferramenta', '(√x − 2)/(x − 4) em x = 4: qual ferramenta aplicar?', 'Multiplicar pelo conjugado', 'Há raiz e forma 0/0.', 'Raiz com 0/0 pede o conjugado.', ['Fatorar um polinômio', 'Multiplicar pelo conjugado', 'Só substituir']],
  ['Cálculo direto', 'Calcule (x² − x)/(x + 2) em x = 1.', '0', 'Substitua x = 1.', '0/3 = 0.'],
  ['Sem o roteiro', 'Calcule (x³ + 1)/(x + 1) em x = 2.', '3', 'Substitua x = 2.', '9/3 = 3.']
]),
lesson('Simplificar sem perder o domínio', [
  'Simplificar preserva o domínio ORIGINAL. A forma simplificada pode aceitar valores que a original não aceitava: são os buracos do gráfico.',
  'Exemplo: (x² − 1)/(x − 1) = x + 1 para x ≠ 1. O gráfico é a reta y = x + 1 com um buraco em (1; 2).',
  'Perto de x = 1, a expressão original fica tão próxima de 2 quanto quisermos, mesmo sem existir em x = 1. Esse valor, 2, é o que a seção de Limites vai chamar de limite.',
  'Dica: antes de cancelar, escreva a restrição ao lado. Cancelar sem anotar o domínio é a fonte de muitos erros.'
], 'Original: x ≠ a · simplificada pode aceitar a · o gráfico tem um buraco', ['Gráfico de f(x) = (x² − 4)/(x − 2)', 'f(x) = (x² − 4)/(x − 2)'], [
  step('Simplifique para x ≠ 2.', 'x+2|2+x', 'Fatore o numerador.', 'x + 2.'),
  step('Quanto vale x + 2 em x = 2?', '4', 'Substitua x = 2.', '4.'),
  step('O buraco fica em (2; ?)', '4', 'É a altura da reta em x = 2.', 'O buraco é o ponto (2; 4).')
], [
  ['Buraco', 'f(x) = (x² − 9)/(x − 3). Qual a ordenada do buraco em x = 3?', '6', 'Simplifique para x + 3.', '3 + 3 = 6.'],
  ['Outro buraco', 'f(x) = (x² − x − 2)/(x − 2) = x + 1 para x ≠ 2. Qual a ordenada do buraco?', '3', 'Substitua x = 2 em x + 1.', '3.'],
  ['Domínio original', 'Qual valor de x está fora do domínio de (x² − 25)/(x − 5)?', '5', 'Onde o denominador zera?', 'x = 5.'],
  ['Quantos valores?', '(x² − 1)/(x² − x) tem denominador x(x − 1). Quantos reais ficam fora do domínio?', '2', 'x = 0 e x = 1.', 'Dois valores.'],
  ['Forma simplificada', '(x² − 1)/(x² − x) = (x + 1)/x para x ≠ 0 e x ≠ 1. Qual a ordenada do buraco em x = 1?', '2', 'Substitua x = 1 na forma simplificada.', '(1 + 1)/1 = 2.'],
  ['Sem o roteiro', 'f(x) = (x³ − 1)/(x − 1). Qual a ordenada do buraco em x = 1?', '3', 'Simplifique para x² + x + 1.', '1 + 1 + 1 = 3.']
]),
lesson('Funções por partes e leitura de gráficos', [
  'Ao ler um gráfico ou uma função por partes perto de a, compare três coisas: o valor da função em a, o valor para o qual ela se aproxima pela esquerda e o valor para o qual se aproxima pela direita. Podem ser três números diferentes.',
  'Se esquerda e direita coincidem, a função "quer" esse valor. Se f(a) for diferente disso, há um buraco ou um ponto isolado.',
  'Se esquerda e direita diferem, há um salto.',
  'Exemplo: f(x) = x + 1 se x < 2 e f(x) = 5 se x ≥ 2. Pela esquerda aproxima 3; pela direita é 5; f(2) = 5. O salto é de 2.'
], 'f(a) · valor pela esquerda · valor pela direita', ['f(x) = x + 1 se x < 2; f(x) = 5 se x ≥ 2', 'f(x) = x + 1 (x < 2) · f(x) = 5 (x ≥ 2)'], [
  step('Para qual valor se aproxima pela esquerda de 2?', '3', 'Use x + 1 em x = 2.', '2 + 1 = 3.'),
  step('E pela direita (fórmula 5)?', '5', 'É constante.', '5.'),
  step('Qual o tamanho do salto (direita − esquerda)?', '2', 'Calcule 5 − 3.', '2.')
], [
  ['Pela esquerda', 'g(x) = 2x se x < 3; g(x) = 10 − x se x ≥ 3. Que valor o pedaço 2x dá em x = 3?', '6', 'Substitua x = 3.', '6.'],
  ['Pela direita', 'Na mesma g, que valor o pedaço 10 − x dá em x = 3?', '7', 'Substitua x = 3.', '7.'],
  ['Salto', 'Na mesma g, qual o salto (direita − esquerda)?', '1', 'Calcule 7 − 6.', '1.'],
  ['Sem salto', 'h(x) = x² se x < 2; h(x) = 2x se x ≥ 2. Que valor comum os dois pedaços dão em x = 2?', '4', 'Calcule 2² e 2·2.', 'Os dois dão 4: não há salto.'],
  ['Módulo', 'Para x < 0, quanto vale |x|/x?', '-1', 'Aqui |x| = −x.', '−x/x = −1.'],
  ['Sem o roteiro', 'f(x) = x + 3 se x < 1; f(x) = k se x ≥ 1. Que valor de k elimina o salto?', '4', 'O pedaço x + 3 dá quanto em x = 1?', 'Dá 4, então k = 4.']
]),
lesson('Racionalização e conjugados', [
  'Raízes no numerador ou no denominador costumam dar 0/0. A saída é multiplicar pelo CONJUGADO, que é a mesma expressão com o sinal do meio trocado.',
  'O truque é (√a − √b)(√a + √b) = a − b: as raízes desaparecem.',
  'Exemplo: (√x − 2)/(x − 4) · (√x + 2)/(√x + 2) = (x − 4)/[(x − 4)(√x + 2)] = 1/(√x + 2), para x ≠ 4.',
  'Multiplicar e dividir pela mesma expressão não muda o valor, só a forma. A restrição original continua valendo.',
  'É a técnica que a lista de revisão da MAC210 cobra nos limites com raiz quadrada.'
], '(√a − √b)(√a + √b) = a − b', ['Racionalize (√x − 3)/(x − 9)', '(√x − 3)/(x − 9)'], [
  step('Qual o conjugado de √x − 3?', '√x+3|√(x)+3|3+√x', 'Troque o sinal do meio.', '√x + 3.'),
  step('Quanto vale (√x − 3)(√x + 3)?', 'x-9', 'a − b.', 'x − 9.'),
  step('Simplificando, sobra 1 sobre o quê?', '√x+3|√(x)+3|3+√x', 'Cancele x − 9.', 'Sobra 1/(√x + 3), para x ≠ 9.')
], [
  ['Conjugado', 'Qual o conjugado de √x + 5?', '√x-5|√(x)-5|-5+√x', 'Troque o sinal.', '√x − 5.'],
  ['Produto', 'Calcule (√7 − 2)(√7 + 2).', '3', 'a − b.', '7 − 4 = 3.'],
  ['Produto 2', 'Para x ≥ 0, simplifique (√x − 1)(√x + 1).', 'x-1', 'a − b.', 'x − 1.'],
  ['Valor da simplificada', 'Calcule 1/(√x + 2) em x = 4.', '1/4', '√4 = 2.', '1/(2 + 2) = 1/4.'],
  ['Valor da simplificada 2', 'Calcule 1/(√x + 3) em x = 9.', '1/6', '√9 = 3.', '1/6.'],
  ['Sem o roteiro', 'Para x ≠ 16, (x − 16)/(√x − 4) = √x + 4. Quanto vale √x + 4 em x = 16?', '8', 'Substitua x = 16.', '4 + 4 = 8.']
]),
lesson('Trigonometria e exponenciais: valores de referência', [
  'Cinco valores para ter na ponta da língua, porque eles aparecem em quase todo limite: sen 0 = 0, cos 0 = 1, e⁰ = 1, ln 1 = 0 e tg 0 = 0.',
  'Identidade-chave: 1 − cos x = 2 sen²(x/2). Ela transforma o "1 − cos" em algo que pode ser simplificado.',
  'Essas funções são "bem-comportadas": se a expressão fizer sentido, substituir direto funciona.',
  'O primeiro limite fundamental, sen x / x, é o caso em que sen x e x zeram juntos. Em breve você o terá em mãos.'
], 'sen 0 = 0 · cos 0 = 1 · e⁰ = 1 · ln 1 = 0', ['Calcule (cos x + 2)/(eˣ + 1) em x = 0', '(cos x + 2)/(eˣ + 1)'], [
  step('Quanto vale cos 0 + 2?', '3', 'cos 0 = 1.', '3.'),
  step('Quanto vale e⁰ + 1?', '2', 'e⁰ = 1.', '2.'),
  step('Qual o valor do quociente?', '3/2', 'Divida.', '3/2.')
], [
  ['Valor', 'Calcule (sen x + 1)/(cos x + 1) em x = 0.', '1/2', 'sen 0 = 0 e cos 0 = 1.', '1/2.'],
  ['Logaritmo', 'Calcule (ln x)/(x + 1) em x = 1.', '0', 'ln 1 = 0.', '0/2 = 0.'],
  ['Identidade', 'Use 1 − cos x = 2 sen²(x/2) em x = π para calcular 1 − cos π.', '2', 'sen(π/2) = 1.', '2·1² = 2.'],
  ['Mistura', 'Calcule tg(π/4) + ln(e).', '2', 'Os dois valem 1.', '1 + 1 = 2.'],
  ['Exponencial e ln', 'Calcule e^(ln 3 + ln 2).', '6', 'Junte: ln 3 + ln 2 = ln 6.', 'e^(ln 6) = 6.'],
  ['Sem o roteiro', 'Calcule 2·sen²(π/4).', '1', 'sen(π/4) = √2/2.', '2·(1/2) = 1.']
]),
phase('Desafio de revisão: preparação para limites', [
  pill('Tudo o que você vai precisar · com o Rubi', [
    'Este é o ensaio geral. Para cada expressão, classifique a forma, escolha a ferramenta, preserve o domínio e leia o valor para o qual ela se aproxima.',
    'Fatorar, racionalizar, usar identidades e ler gráficos: tudo o que revisamos aparece na seção de Limites.',
    'Este desafio fecha a seção e exige 80% de acertos de primeira.'
  ], 'Forma → ferramenta → simplifique → valor'),
  guided('Valor de (x² − 2x − 3)/(x − 3) perto de x = 3', '(x² − 2x − 3)/(x − 3)', [
    step('Qual é a forma em x = 3?', '0/0', 'Substitua x = 3 em cima e embaixo.', '9 − 6 − 3 = 0 e 3 − 3 = 0.', ['0/0', 'k/0', 'número']),
    step('Simplifique para x ≠ 3.', 'x+1|1+x', 'x² − 2x − 3 = (x − 3)(x + 1).', 'x + 1.'),
    step('Qual valor a expressão se aproxima perto de 3?', '4', 'Substitua x = 3 em x + 1.', '4.')
  ]),
  task('Classifique', '(x² − 1)/(x − 1) em x = 1 tem qual forma?', '0/0', 'Substitua x = 1.', 'Zero em cima e embaixo.', ['0/0', '2/0', 'número']),
  task('Buraco', 'f(x) = (x² − 16)/(x − 4). Qual a ordenada do buraco em x = 4?', '8', 'Simplifique para x + 4.', '4 + 4 = 8.'),
  task('Conjugado', 'Para x ≠ 25, (√x − 5)/(x − 25) = 1/(√x + 5). Quanto vale a forma simplificada em x = 25?', '1/10', '√25 = 5.', '1/(5 + 5) = 1/10.'),
  task('Sem salto', 'f(x) = 3x − 1 se x < 2; f(x) = k + 1 se x ≥ 2. Que valor de k elimina o salto?', '4', 'O primeiro pedaço dá 5 em x = 2.', 'k + 1 = 5 ⇒ k = 4.'),
  paper('Trigonometria e exponencial', 'Calcule (eˣ + cos x)/(ln(x + 1) + 2) em x = 0.', '1', 'e⁰ = 1, cos 0 = 1 e ln 1 = 0.', '(1 + 1)/(0 + 2) = 1.'),
  paper('Sem o roteiro', 'Para x ≠ 2, (x³ − 8)/(x − 2) = x² + 2x + 4. Quanto vale a forma simplificada em x = 2?', '12', 'Substitua x = 2.', '4 + 4 + 4 = 12.')
], {boss: true})
]));
}
