'use strict';
// Seção 2 · Derivadas. Cadência por fase: pílula do Rubi → exemplo guiado → fixação ativa → papel.
// Respostas numéricas sempre que possível; formas simbólicas curtas com variantes separadas por "|".
(() => {
const add = u => COURSE.derivadas.units.push(u);

// ───────────────────────── Unidade 1 · Taxa de variação e a ideia de derivada
add(unit('Taxa de variação e a ideia de derivada', 'Da inclinação da secante à velocidade instantânea', [
  phase('Taxa média', [
    pill('Quanto mudou, por quanto tempo?', [
      'Oi! Eu sou o Rubi. Antes de falar de derivada, vamos falar de uma coisa do dia a dia: velocidade média.',
      'Se você andou 120 km em 2 horas, sua taxa média foi 120 ÷ 2 = 60 km/h. É “quanto mudou” dividido por “quanto demorou”.',
      'Em matemática: taxa média de f entre a e b = (f(b) − f(a)) / (b − a). No gráfico, é a inclinação da reta que liga os dois pontos (a secante).'
    ], 'taxa média = (f(b) − f(a)) / (b − a)'),
    guided('Taxa média de s(t) = t² entre t = 1 e t = 3', 's(t) = t²  (metros)   |   intervalo [1, 3]', [
      step('Calcule s(1).', '1', 'Troque t por 1.', 's(1) = 1² = 1.'),
      step('Calcule s(3).', '9', 'Troque t por 3.', 's(3) = 3² = 9.'),
      step('Quanto vale a variação s(3) − s(1)?', '8', 'Subtraia: 9 − 1.', 'A posição mudou 8 metros.'),
      step('Divida pela duração (3 − 1). Qual a taxa média?', '4', 'Divida 8 por 2.', 'Taxa média = 8/2 = 4 m/s.')
    ], 'Taxa média = Δs/Δt = 8/2 = 4.'),
    task('Taxa média de uma reta', 'f(x) = 2x + 1,  entre x = 0 e x = 4', '2', 'f(0) = 1 e f(4) = 9.', '(9 − 1)/(4 − 0) = 2. Em uma reta, a taxa média é sempre a própria inclinação.'),
    task('Taxa média de uma parábola', 'f(x) = x²,  entre x = 2 e x = 5', '7', 'f(2) = 4 e f(5) = 25.', '(25 − 4)/(5 − 2) = 21/3 = 7.'),
    paper('Taxa média de uma cúbica', 'f(x) = x³,  entre x = 1 e x = 3', '13', 'f(1) = 1 e f(3) = 27.', '(27 − 1)/(3 − 1) = 26/2 = 13.')
  ]),
  phase('Da secante à tangente', [
    pill('E se o intervalo encolher?', [
      'A taxa média fala de um trecho. Mas e se eu quiser a taxa EXATAMENTE em um instante, como o velocímetro do carro?',
      'Truque: fixe o ponto x = a e puxe o outro ponto b para perto, usando b = a + h com h cada vez menor.',
      'A secante vai girando até virar a reta tangente. A inclinação limite é a derivada. Guarde esta ideia: derivada = limite das taxas médias.'
    ], 'inclinação da secante = (f(a + h) − f(a)) / h'),
    guided('Secantes de f(x) = x² partindo de x = 1', 'f(x) = x²   |   a = 1,  h = 0,1', [
      step('Calcule f(1,1).', '1.21', 'Eleve 1,1 ao quadrado.', '1,1² = 1,21.'),
      step('Calcule f(1,1) − f(1).', '0.21', 'Subtraia 1,21 − 1.', 'A variação é 0,21.'),
      step('Divida por h = 0,1. Qual a inclinação da secante?', '2.1', 'Divida 0,21 por 0,1.', 'Inclinação = 2,1. Com h menor ela chega mais perto de 2.')
    ], 'Para h = 0,1 a secante tem inclinação 2,1; vamos ver para onde ela tende.'),
    task('Secante mais estreita', 'f(x) = x²,  a = 1,  h = 0,01.   Inclinação da secante = ?', '2.01', 'f(1,01) = 1,0201.', '(1,0201 − 1)/0,01 = 2,01. Cada vez mais perto de 2.'),
    task('Para onde tendem as secantes?', 'Inclinações das secantes em x = 1,5:  3,1  →  3,01  →  3,001  →  …', '3', 'Olhe o que os números “querem” ser.', 'As inclinações tendem a 3. Esse valor é a inclinação da tangente em x = 1,5.'),
    task('Secante em x = 3', 'f(x) = x²,  a = 3,  h = 0,01.   Inclinação da secante = ?', '6.01', 'f(3,01) = 9,0601.', '(9,0601 − 9)/0,01 = 6,01. Perto de 6.'),
    paper('Estime a tangente', 'f(x) = x²,  a = 2,  h = 0,001.   Inclinação da secante = ?', '4.001', 'f(2,001) = 4,004001.', '(4,004001 − 4)/0,001 = 4,001. A tangente em x = 2 tem inclinação 4.')
  ]),
  phase('Velocidade instantânea', [
    pill('A derivada no velocímetro', [
      'Velocidade média é taxa média da posição. Já a velocidade instantânea é o que o velocímetro marca agora.',
      'Para obtê-la, calculo a velocidade média em [t, t + h] e faço h → 0. Isso é exatamente a derivada da posição.',
      'Macete: derivada de posição = velocidade. Se a posição é em metros e o tempo em segundos, a velocidade é em m/s.'
    ], 'v(t) = lim h→0 (s(t + h) − s(t)) / h'),
    guided('Velocidade em t = 2 para s(t) = t²', 's(t) = t²   |   v(2) = ?', [
      step('Velocidade média em [2; 2,1]: s(2,1) = 4,41. Qual a média?', '4.1', '(4,41 − 4) / 0,1.', 'Média = 0,41/0,1 = 4,1 m/s.'),
      step('Em [2; 2,01]: s(2,01) = 4,0401. Qual a média?', '4.01', '(4,0401 − 4) / 0,01.', 'Média = 4,01 m/s.'),
      step('Para que valor tendem 4,1; 4,01; 4,001…?', '4', 'Ignore a parte que encolhe.', 'Tendem a 4. Logo v(2) = 4 m/s.')
    ], 'Velocidade instantânea = limite das velocidades médias.'),
    task('Velocidade média de 5t²', 's(t) = 5t²,  intervalo [1, 2].   Velocidade média = ?', '15', 's(1) = 5 e s(2) = 20.', '(20 − 5)/(2 − 1) = 15.'),
    task('Média em intervalo curto', 's(t) = t²,  intervalo [2; 2,01].   Velocidade média = ?', '4.01', 's(2,01) = 4,0401.', '(4,0401 − 4)/0,01 = 4,01.'),
    task('Unidade da derivada', 'Se s(t) é dada em metros e t em segundos, a derivada s′(t) é medida em…', 'm/s', 'Pense em “metros por segundo”.', 'A derivada é (variação de s)/(variação de t), logo metros por segundo.', ['m', 's', 'm/s']),
    paper('Velocidade pelo limite', 's(t) = 3t² .  A média em [1, 1 + h] vale 6 + 3h. Quanto vale v(1)?', '6', 'Faça h → 0 em 6 + 3h.', 'Quando h → 0, 6 + 3h → 6. Logo v(1) = 6.')
  ]),
  phase('Tangente e reta', [
    pill('A reta tangente', [
      'Agora que f′(a) é a inclinação da tangente em x = a, dá para escrever a equação dessa reta.',
      'A reta passa pelo ponto (a, f(a)) e tem inclinação f′(a). Pela forma ponto-inclinação: y − f(a) = f′(a)·(x − a).',
      'Macete: “ponto, inclinação, monta a reta”. É a ferramenta que a gente usa o tempo todo em Cálculo.'
    ], 'y − f(a) = f′(a)·(x − a)'),
    guided('Tangente a f(x) = x² em x = 3', 'f(x) = x²,   f′(3) = 6', [
      step('Qual é o ponto de tangência? Calcule f(3).', '9', 'Troque x por 3.', 'O ponto é (3, 9).'),
      step('Qual a inclinação da tangente?', '6', 'É o valor de f′(3).', 'A inclinação é f′(3) = 6.'),
      step('Monte y − 9 = 6(x − 3). Qual o valor de y em x = 4?', '15', 'y = 9 + 6·(4 − 3).', 'y = 9 + 6 = 15.')
    ], 'A reta tangente é y = 6x − 9; em x = 4 vale 15.'),
    task('Use a tangente', 'f(2) = 5 e f′(2) = 3.  A tangente em x = 2 vale quanto em x = 4?', '11', 'y = 5 + 3·(4 − 2).', 'y = 5 + 3·2 = 11.'),
    task('Inclinação negativa', 'A tangente passa por (1, 2) e tem inclinação −4.  Quanto vale y em x = 3?', '-6', 'y = 2 + (−4)·(3 − 1).', 'y = 2 − 8 = −6.'),
    order('Montando a tangente', '', ['Calcule f(a): o ponto de tangência', 'Calcule f′(a): a inclinação', 'Escreva y − f(a) = f′(a)(x − a)', 'Isole y ou substitua o x desejado'], 'Primeiro o ponto, depois a inclinação; só então a reta é montada.'),
    paper('Tangente em outro ponto', 'f(1) = 3 e f′(1) = −2.  Quanto vale a tangente em x = 0?', '5', 'y = 3 + (−2)(0 − 1).', 'y = 3 + 2 = 5.')
  ]),
  phase('Chefão da unidade 1', [
    task('Conecte as ideias', 'A inclinação da reta tangente ao gráfico de f em x = a é…', 'f′(a)', 'Tangente = limite das secantes.', 'A derivada f′(a) é exatamente a inclinação da tangente em x = a.', ['f′(a)', 'a taxa média em [a, b]', 'f(a)']),
    guided('Do intervalo ao ponto', 'f(x) = x²,  a = 2', [
      step('Taxa média em [2; 2,5]: f(2,5) = 6,25. Qual a taxa média?', '4.5', '(6,25 − 4)/0,5.', '2,25/0,5 = 4,5.'),
      step('Taxa média em [2; 2,1]: f(2,1) = 4,41. Qual a taxa média?', '4.1', '(4,41 − 4)/0,1.', '0,41/0,1 = 4,1.'),
      step('Para onde tendem as taxas quando o intervalo encolhe?', '4', 'Veja a tendência 4,5 → 4,1 → …', 'Tendem a 4: f′(2) = 4.')
    ], 'Quanto menor o intervalo, mais perto da inclinação da tangente.'),
    task('Secante entre dois pontos', 'f(x) = x²,  secante entre x = 1 e x = 4.   Inclinação = ?', '5', 'f(1) = 1 e f(4) = 16.', '(16 − 1)/(4 − 1) = 5.'),
    task('Tendência', 'Secantes de f(x) = x² em x = 2,5:  5,1  →  5,01  →  5,001.  Inclinação da tangente = ?', '5', 'Qual valor as inclinações “querem” ser?', 'Tendem a 5. Em geral, a tangente de x² em x = a tem inclinação 2a.'),
    task('Velocidade instantânea', 's(t) = t².  A média em [1, 1 + h] vale 2 + h.  Quanto vale v(1)?', '2', 'Faça h → 0.', 'Quando h → 0, 2 + h → 2. Logo v(1) = 2.'),
    paper('Tangente de x² em x = 1', 'f(x) = x²,  f′(1) = 2.  Quanto vale a tangente em x = 3?', '5', 'f(1) = 1. Use y = 1 + 2(x − 1).', 'y = 1 + 2·2 = 5.')
  ], {boss: true})
]));

// ───────────────────────── Unidade 2 · Definição de derivada
add(unit('Definição de derivada', 'O quociente de Newton e o limite que o define', [
  phase('O quociente de Newton', [
    pill('A definição, sem medo', [
      'Tudo que vimos vira uma fórmula: f′(x) = lim h→0 (f(x + h) − f(x)) / h.',
      'Leia assim: “inclinação da secante entre x e x + h, quando h encolhe até zero”.',
      'O segredo para calcular: o h do denominador vai atrapalhar (0/0). Então expanda, simplifique e CANCELE o h antes de fazer o limite.'
    ], 'f′(x) = lim h→0 (f(x + h) − f(x)) / h'),
    guided('Derivando f(x) = x² pela definição', 'f(x) = x²', [
      step('Expanda f(x + h) = (x + h)².', 'x²+2xh+h²|x^2+2xh+h^2', 'Quadrado da soma: a² + 2ab + b².', '(x + h)² = x² + 2xh + h².'),
      step('Calcule f(x + h) − f(x).', '2xh+h²|h²+2xh|2xh+h^2|h^2+2xh', 'O x² some.', 'Sobra 2xh + h².'),
      step('Divida por h e simplifique.', '2x+h|h+2x', 'Coloque h em evidência: h(2x + h)/h.', 'O quociente é 2x + h.'),
      step('Faça h → 0. Quanto vale f′(x)?', '2x', 'Some o h do 2x + h.', 'f′(x) = 2x.')
    ], 'Pela definição, (x²)′ = 2x.'),
    task('Uma reta', 'f(x) = 3x.   (f(x + h) − f(x))/h = ?', '3', 'O numerador é 3x + 3h − 3x.', 'O quociente é 3h/h = 3, para qualquer h. Logo f′(x) = 3.'),
    task('Valor no ponto', 'Para f(x) = x², o quociente em x = 3 é 6 + h.  Quanto vale f′(3)?', '6', 'Faça h → 0.', 'Limite de 6 + h é 6.'),
    order('A ordem do cálculo', '', ['Escreva (f(x + h) − f(x)) / h', 'Expanda f(x + h) e simplifique o numerador', 'Cancele o fator h', 'Faça h → 0'], 'O cancelamento de h precisa vir antes do limite, senão ficamos com 0/0.'),
    paper('Derivada de uma reta', 'f(x) = 5x + 2.   f′(x) = ?', '5', 'f(x + h) − f(x) = 5h.', '(5h)/h = 5, então f′(x) = 5.')
  ]),
  phase('x³ pela definição', [
    pill('Mais um cubo de gelo', [
      'Para x³ precisamos de (x + h)³. Vale decorar: (x + h)³ = x³ + 3x²h + 3xh² + h³.',
      'Ao subtrair x³, todos os termos que sobram têm h. Dividindo por h, só o primeiro termo escapa de morrer no limite: 3x².',
      'Veja o padrão: x² → 2x, x³ → 3x². Daqui a pouco isso vira a regra da potência.'
    ], '(x + h)³ = x³ + 3x²h + 3xh² + h³'),
    guided('Derivando f(x) = x³', 'f(x) = x³', [
      step('Qual o coeficiente de x·h² em (x + h)³?', '3', 'Triângulo de Pascal: 1, 3, 3, 1.', 'O termo é 3xh².'),
      step('Após subtrair x³ e dividir por h, o que sobra?', '3x²+3xh+h²|h²+3xh+3x²', 'Divida cada termo por h.', 'Sobra 3x² + 3xh + h².'),
      step('Faça h → 0. Quanto vale f′(x)?', '3x²|3x^2', 'Os termos com h somem.', 'f′(x) = 3x².')
    ], '(x³)′ = 3x².'),
    task('Aplicando 3x²', 'Para f(x) = x³, quanto vale f′(2)?', '12', 'f′(x) = 3x².', 'f′(2) = 3·4 = 12.'),
    task('Mesmo padrão', 'Para f(x) = x³, quanto vale f′(−1)?', '3', 'f′(x) = 3x² e (−1)² = 1.', 'f′(−1) = 3·1 = 3.'),
    task('Reconhecendo o coeficiente', 'Em (x + h)³, qual o coeficiente de x²h?', '3', 'Pascal: 1, 3, 3, 1.', 'O termo é 3x²h.'),
    paper('Derivada em outro ponto', 'f(x) = x³.   f′(0) = ?', '0', 'f′(x) = 3x².', 'f′(0) = 0: a tangente na origem é horizontal.')
  ]),
  phase('1/x e √x', [
    pill('Frações e raízes', [
      'Para 1/x o truque é denominador comum: 1/(x + h) − 1/x = −h / (x(x + h)). O h do numerador cancela com o do denominador.',
      'Para √x o truque é o conjugado: (√(x + h) − √x)(√(x + h) + √x) = h. De novo, o h aparece e cancela.',
      'Resultados para memorizar: (1/x)′ = −1/x² e (√x)′ = 1/(2√x).'
    ], '(1/x)′ = −1/x²    (√x)′ = 1/(2√x)'),
    guided('Derivando 1/x pela definição', 'f(x) = 1/x', [
      step('Qual o numerador de 1/(x + h) − 1/x com denominador comum x(x + h)?', '-h', 'x − (x + h).', 'x − x − h = −h.', ['h', '-h', '2x + h']),
      step('Após dividir por h, o denominador é x(x + h). Em h → 0 ele vira…', 'x²|x^2', 'Troque h por 0.', 'x·x = x².'),
      step('Quanto vale f′(x)?', '-1/x²|-1/x^2', 'O numerador que sobrou é −1.', 'f′(x) = −1/x².')
    ], '(1/x)′ = −1/x².'),
    guided('Derivando √x pela definição', 'f(x) = √x', [
      step('Multiplicando pelo conjugado, o numerador (√(x + h) − √x)(√(x + h) + √x) vira…', 'h', 'Diferença de quadrados: (x + h) − x.', 'O numerador é h.'),
      step('Após cancelar h, o denominador é √(x + h) + √x. Para h → 0 ele vira…', '2√x|2sqrt(x)|2sqrtx', 'Os dois termos ficam iguais a √x.', 'Fica 2√x.'),
      step('Quanto vale f′(4)?', '1/4|0.25', 'f′(x) = 1/(2√x) e √4 = 2.', 'f′(4) = 1/(2·2) = 1/4.')
    ], '(√x)′ = 1/(2√x).'),
    task('Aplicando −1/x²', 'f(x) = 1/x.   f′(2) = ?', '-1/4', 'f′(x) = −1/x².', 'f′(2) = −1/4.'),
    task('Aplicando 1/(2√x)', 'f(x) = √x.   f′(9) = ?', '1/6', '√9 = 3.', 'f′(9) = 1/(2·3) = 1/6.'),
    paper('Inclinação de 1/x', 'f(x) = 1/x.   f′(1) = ?', '-1', 'f′(x) = −1/x².', 'f′(1) = −1.')
  ]),
  phase('Derivabilidade', [
    pill('Quando a derivada não existe', [
      'Nem toda função tem tangente em todo ponto. Se o gráfico tem um BICO, um SALTO ou uma tangente VERTICAL, a derivada não existe ali.',
      'Exemplo clássico: |x| em x = 0. Pela direita a secante tem inclinação 1; pela esquerda, −1. Dois lados discordando = limite não existe.',
      'Isso é o mesmo raciocínio dos limites laterais! Para existir derivada, os dois lados precisam dar o mesmo valor.'
    ], 'derivada existe ⇔ limites laterais do quociente são iguais'),
    guided('Existe a derivada de |x| em 0?', 'f(x) = |x|,   (f(h) − f(0))/h = |h|/h', [
      step('Para h > 0, quanto vale |h|/h?', '1', '|h| = h.', 'Pela direita o quociente é 1.'),
      step('Para h < 0, quanto vale |h|/h?', '-1', '|h| = −h.', 'Pela esquerda o quociente é −1.'),
      step('Os dois limites laterais são iguais?', 'Não', '1 e −1 são diferentes.', 'Como são diferentes, f′(0) não existe.', ['Sim', 'Não'])
    ], 'O gráfico de |x| tem um bico na origem; ali não há tangente única.'),
    task('Reconheça o problema', '|x| é derivável em x = 0? (responda sim ou não)', 'não|nao', 'Lembre dos limites laterais 1 e −1.', 'Não: há um bico em x = 0.'),
    task('Parábola é suave', 'f(x) = x².   f′(0) = ?', '0', 'f′(x) = 2x.', 'f′(0) = 0: a parábola é suave, com tangente horizontal na origem.'),
    task('O que quebra a derivada?', 'Qual característica do gráfico impede a existência da derivada num ponto?', 'Bico (canto)', 'Pense em onde não dá para desenhar uma única tangente.', 'Em um bico, a esquerda e a direita têm inclinações diferentes.', ['Bico (canto)', 'Curva suave', 'Reta inclinada']),
    paper('Lado direito', 'f(x) = |x − 2|.  Qual a inclinação do gráfico logo à direita de x = 2?', '1', 'Para x > 2, |x − 2| = x − 2.', 'À direita f(x) = x − 2, inclinação 1. (À esquerda é −1, por isso há um bico.)')
  ]),
  phase('Chefão da unidade 2', [
    pill('Notações e resumo', [
      'A mesma derivada tem vários nomes: f′(x), dy/dx e d/dx[f(x)]. A de Leibniz, dy/dx, lembra “variação de y por variação de x”.',
      'Resumo da definição: monte o quociente de Newton, simplifique até cancelar h, e só então faça h → 0.'
    ], 'f′(x) = dy/dx = d/dx[ f(x) ]'),
    task('Notação de Leibniz', 'Se y = f(x), dy/dx é o mesmo que…', 'f′(x)', 'É só outro nome para a derivada.', 'dy/dx = f′(x).', ['f′(x)', 'f(x)/x', 'f(x + h)']),
    guided('Definição com dois termos', 'f(x) = x² + x', [
      step('Calcule f(x + h) − f(x).', '2xh+h²+h|h²+2xh+h|h+2xh+h²', 'O x² e o x se cancelam.', 'Sobra 2xh + h² + h.'),
      step('Divida por h.', '2x+h+1|h+2x+1|1+2x+h', 'Todo termo tem h.', 'Quociente: 2x + h + 1.'),
      step('Faça h → 0.', '2x+1|1+2x', 'O h some.', 'f′(x) = 2x + 1.')
    ], '(x² + x)′ = 2x + 1.'),
    task('Valor do resultado', 'f(x) = x² + x.   f′(3) = ?', '7', 'f′(x) = 2x + 1.', 'f′(3) = 7.'),
    task('Com coeficiente', 'Pela definição, f(x) = 2x² dá f′(x) = 4x.   Quanto vale f′(5)?', '20', 'f′(5) = 4·5.', '4·5 = 20.'),
    paper('Parábola deslocada', 'f(x) = x² − 3x.  f′(4) = ?', '5', 'f′(x) = 2x − 3.', 'f′(4) = 8 − 3 = 5.')
  ], {boss: true})
]));

// ───────────────────────── Unidade 3 · Regras básicas
add(unit('Regras básicas', 'Potência, constante, soma e múltiplo constante', [
  phase('Constante e potência', [
    pill('A regra do tombo', [
      'Calcular pela definição é lindo, mas cansa. Vimos x² → 2x e x³ → 3x². Percebeu o padrão?',
      'O expoente “tomba” e vira coeficiente, e o expoente novo é um a menos: (xⁿ)′ = n·xⁿ⁻¹.',
      'E uma constante não muda, então sua derivada é 0. Macete: “desce o expoente, diminui um”.'
    ], '(xⁿ)′ = n·xⁿ⁻¹        (c)′ = 0'),
    guided('Derivando x⁵', 'f(x) = x⁵', [
      step('Qual o coeficiente que desce?', '5', 'É o expoente.', 'O expoente 5 vira coeficiente.'),
      step('Qual o novo expoente?', '4', 'Diminua 1.', '5 − 1 = 4.'),
      step('Escreva f′(x).', '5x⁴|5x^4', 'Junte coeficiente e potência.', 'f′(x) = 5x⁴.')
    ], '(x⁵)′ = 5x⁴.'),
    task('Outra potência', 'Derive f(x) = x⁷.', '7x⁶|7x^6', 'Desça o 7 e use 6.', 'f′(x) = 7x⁶.'),
    task('Derivada de constante', 'Derive f(x) = 9.', '0', 'Constante não varia.', 'A derivada de uma constante é 0.'),
    task('Derivada de x', 'Derive f(x) = x.', '1', 'x = x¹.', 'Desce o 1 e fica x⁰ = 1.'),
    paper('Valor no ponto', 'f(x) = x¹⁰.   f′(1) = ?', '10', 'f′(x) = 10x⁹.', 'f′(1) = 10·1 = 10.')
  ]),
  phase('Múltiplo constante e soma', [
    pill('Derive termo a termo', [
      'Duas regras que facilitam a vida: a constante multiplicando “fica de fora” e a derivada de uma soma é a soma das derivadas.',
      'Em símbolos: (c·f)′ = c·f′ e (f + g)′ = f′ + g′. Em português: derive cada pedaço separadamente e some.',
      'Nada de mágica: é só o limite se comportando bem com somas e constantes.'
    ], '(c·f)′ = c·f′        (f ± g)′ = f′ ± g′'),
    guided('Derivando 4x³ + 2x', 'f(x) = 4x³ + 2x', [
      step('Qual a derivada de 4x³?', '12x²|12x^2', '4·3x².', '(4x³)′ = 4·3x² = 12x².'),
      step('Qual a derivada de 2x?', '2', '(x)′ = 1.', '(2x)′ = 2.'),
      step('Junte as duas.', '12x²+2|12x^2+2|2+12x²|2+12x^2', 'Some os resultados.', 'f′(x) = 12x² + 2.')
    ], '(4x³ + 2x)′ = 12x² + 2.'),
    task('Polinômio completo', 'Derive f(x) = 3x² − 5x + 7.', '6x-5|-5+6x', 'A constante 7 some.', 'f′(x) = 6x − 5.'),
    task('Valor no ponto', 'f(x) = 5x² + 3x.   f′(2) = ?', '23', 'f′(x) = 10x + 3.', 'f′(2) = 20 + 3 = 23.'),
    order('Derivando um polinômio', '', ['Separe a soma em termos', 'Derive 4x³: 4·3x² = 12x²', 'Derive 2x: 2', 'Some os resultados: 12x² + 2'], 'Primeiro quebre em termos, depois derive cada um, e só no fim some.'),
    paper('Cúbica', 'f(x) = x³ − 6x² + 4.   f′(2) = ?', '-12', 'f′(x) = 3x² − 12x.', 'f′(2) = 12 − 24 = −12.')
  ]),
  phase('Reescreva antes de derivar', [
    pill('Raízes e frações são potências disfarçadas', [
      'A regra do tombo vale para QUALQUER expoente, até negativo ou fracionário. A dificuldade é só reconhecer a potência escondida.',
      'Dicionário: √x = x^(1/2), ∛x = x^(1/3) e 1/xⁿ = x⁻ⁿ. Reescreva primeiro, depois desça o expoente.',
      'Isso é muito melhor que decorar fórmulas separadas para raiz e fração.'
    ], '√x = x^(1/2)      1/xⁿ = x⁻ⁿ'),
    guided('Derivando 1/x³', 'f(x) = 1/x³ = x^n', [
      step('Qual é o n em x^n = 1/x³?', '-3', 'Passar para o numerador troca o sinal do expoente.', '1/x³ = x⁻³.'),
      step('Qual o novo expoente, n − 1?', '-4', '−3 − 1.', 'O novo expoente é −4.'),
      step('Qual o coeficiente que desce?', '-3', 'É o n.', 'f′(x) = −3x⁻⁴ = −3/x⁴.')
    ], '(1/x³)′ = −3/x⁴.'),
    guided('Derivando √x em x = 4', 'f(x) = √x = x^(1/2)', [
      step('Qual o expoente que desce?', '1/2|0.5', 'É o expoente de √x.', 'O coeficiente é 1/2.'),
      step('Qual o novo expoente?', '-1/2|-0.5', '1/2 − 1.', 'x^(−1/2) = 1/√x.'),
      step('Quanto vale f′(4)?', '1/4|0.25', '(1/2)·(1/√4).', 'f′(4) = (1/2)(1/2) = 1/4.')
    ], '(√x)′ = 1/(2√x), resultado que já tínhamos visto pela definição.'),
    task('Expoente de ∛x', 'Qual expoente n torna x^n = ∛x?', '1/3', 'Raiz cúbica = potência 1/3.', '∛x = x^(1/3).'),
    task('Derivada de 1/x²', 'f(x) = 1/x² = x⁻².   f′(1) = ?', '-2', 'f′(x) = −2x⁻³.', 'f′(1) = −2.'),
    paper('Soma de raiz e fração', 'f(x) = √x + 1/x.   f′(4) = ?', '3/16', 'f′(x) = 1/(2√x) − 1/x².', 'f′(4) = 1/4 − 1/16 = 3/16.')
  ]),
  phase('Mistura e tangente', [
    pill('Juntando as regras', [
      'Com potência, soma e constante já dá para resolver muita coisa: retas tangentes, pontos de tangente horizontal e velocidades.',
      'Tangente horizontal significa inclinação zero: resolva f′(x) = 0. Esses pontos serão a base de otimização mais à frente.',
      'Se s(t) é a posição, então v(t) = s′(t) é a velocidade. Derivar duas vezes dá a aceleração; falaremos disso logo.'
    ], 'tangente horizontal  ⇔  f′(x) = 0'),
    guided('Tangente a x³ − 3x + 1 em x = 2', 'f(x) = x³ − 3x + 1', [
      step('Calcule f(2).', '3', '8 − 6 + 1.', 'O ponto é (2, 3).'),
      step('Derive: f′(x) = 3x² − 3. Quanto vale f′(2)?', '9', '3·4 − 3.', 'Inclinação 9.'),
      step('Com y = 3 + 9(x − 2), quanto vale y em x = 3?', '12', '3 + 9·1.', 'y = 12.')
    ], 'A tangente é y = 9x − 15.'),
    task('Tangente horizontal', 'f(x) = x² − 4x.   Em que x a tangente é horizontal?', '2', 'Resolva 2x − 4 = 0.', 'x = 2.'),
    task('Dois candidatos', 'f(x) = 2x³ − 3x².  A derivada zera em dois valores de x. Qual o maior?', '1', 'f′(x) = 6x² − 6x = 6x(x − 1).', 'x = 0 ou x = 1. O maior é 1.'),
    task('Velocidade', 's(t) = t³ − 6t + 2.   v(2) = ?', '6', 'v(t) = 3t² − 6.', 'v(2) = 12 − 6 = 6.'),
    task('Quando para?', 's(t) = −5t² + 20t.  Em que t a velocidade é zero?', '2', 'v(t) = −10t + 20.', 'v(t) = 0 ⇒ t = 2.'),
    paper('Velocidade em t = 1', 's(t) = −5t² + 20t.  v(1) = ?', '10', 'v(t) = −10t + 20.', 'v(1) = 10.')
  ]),
  phase('Chefão da unidade 3', [
    task('Coeficiente', 'f(x) = 6x⁴.   f′(1) = ?', '24', 'f′(x) = 24x³.', 'f′(1) = 24.'),
    task('Fração', 'f(x) = 4/x².   f′(2) = ?', '-1', 'f(x) = 4x⁻².', 'f′(x) = −8x⁻³, logo f′(2) = −8/8 = −1.'),
    guided('Raiz com polinômio', 'f(x) = 2√x − x²', [
      step('Quanto vale a derivada de 2√x em x = 4?', '1/2|0.5', '(2√x)′ = 1/√x.', 'Em x = 4 dá 1/2.'),
      step('Quanto vale a derivada de x² em x = 4?', '8', '(x²)′ = 2x.', '2·4 = 8.'),
      step('Quanto vale f′(4)?', '-15/2|-7.5', '1/2 − 8.', 'f′(4) = −15/2.')
    ], 'A soma de derivadas dá −15/2.'),
    order('Reta tangente completa', '', ['Calcule f(a): o ponto', 'Calcule f′(a): a inclinação', 'Monte y − f(a) = f′(a)(x − a)', 'Substitua o x desejado'], 'Ponto, inclinação, reta, valor.'),
    task('Contando tangentes horizontais', 'f(x) = x³ − 3x + 1.  Quantos pontos têm tangente horizontal?', '2', 'f′(x) = 3x² − 3 = 0.', 'x = 1 ou x = −1: dois pontos.'),
    paper('Mistura final', 'f(x) = 3x⁵ − 1/x.   f′(1) = ?', '16', 'f′(x) = 15x⁴ + x⁻².', 'f′(1) = 15 + 1 = 16.')
  ], {boss: true})
]));

// ───────────────────────── Unidade 4 · Produto e quociente
add(unit('Produto e quociente', 'Quando duas funções se multiplicam ou se dividem', [
  phase('Regra do produto', [
    pill('Derivada de um produto não é produto de derivadas', [
      'Cuidado com a armadilha: (f·g)′ NÃO é f′·g′. Teste com x·x = x²: f′·g′ = 1·1 = 1, mas (x²)′ = 2x.',
      'Intuição: um retângulo de lados f e g. Se os dois lados crescem, a área ganha uma faixa de cada lado: f′g e fg′.',
      'Regra: (fg)′ = f′g + fg′. Macete: “derivada do primeiro vezes o segundo, mais o primeiro vezes a derivada do segundo”.'
    ], '(f·g)′ = f′·g + f·g′'),
    guided('Produto x²·(x + 3) em x = 1', 'f(x) = x²,  g(x) = x + 3', [
      step('Qual é f′(x)?', '2x', 'Regra do tombo.', 'f′(x) = 2x.'),
      step('Qual é g′(x)?', '1', 'Derive x + 3.', 'g′(x) = 1.'),
      step('Calcule f′g + fg′ em x = 1.', '9', '2·4 + 1·1.', 'f′(1)g(1) = 2·4 = 8 e f(1)g′(1) = 1·1 = 1; soma 9.')
    ], 'Confira: x²(x + 3) = x³ + 3x², derivada 3x² + 6x, que vale 9 em x = 1.'),
    task('Produto em x = 2', 'f(x) = x³(x − 1).   f′(2) = ?', '20', 'f′ = 3x²(x − 1) + x³·1.', 'f′(2) = 12 + 8 = 20.'),
    task('Reconheça a regra', 'Para derivar (x² + 1)(x³ − x), qual regra usar primeiro?', 'Regra do produto', 'Duas expressões se multiplicando.', 'É um produto de funções: use f′g + fg′.', ['Regra do produto', 'Regra da potência', 'Regra da soma']),
    task('Produto de retas', 'f(x) = (2x + 1)(3x − 2).   f′(1) = ?', '11', 'f′ = 2(3x − 2) + (2x + 1)·3.', 'f′(1) = 2 + 9 = 11.'),
    paper('Produto de polinômios', 'f(x) = (x² + 1)(x³ + 2x).   f′(1) = ?', '16', 'f′ = 2x(x³ + 2x) + (x² + 1)(3x² + 2).', 'f′(1) = 2·3 + 2·5 = 16.')
  ]),
  phase('Produto com raiz e fração', [
    pill('Produto com potências diferentes', [
      'A regra do produto brilha quando expandir seria chato: raízes, frações e potências de naturezas diferentes.',
      'Procedimento: nomeie f e g, derive cada uma separadamente (use o dicionário √x = x^(1/2)), depois monte f′g + fg′.',
      'Dica de organização: escreva os quatro ingredientes f, f′, g, g′ antes de montar.'
    ], 'ingredientes: f, f′, g, g′'),
    guided('√x·(x + 1) em x = 4', 'f(x) = √x,  g(x) = x + 1', [
      step('Quanto vale f′(4), com f′ = 1/(2√x)?', '1/4|0.25', '1/(2·2).', 'f′(4) = 1/4.'),
      step('Quanto vale g(4)?', '5', '4 + 1.', 'g(4) = 5.'),
      step('Quanto vale f(4)·g′(4)?', '2', '√4·1.', 'f(4) = 2 e g′ = 1.'),
      step('Some: f′g + fg′.', '13/4|3.25', '5/4 + 2.', '5/4 + 2 = 13/4.')
    ], 'Confira: √x(x + 1) = x^(3/2) + x^(1/2).'),
    task('Zero que ensina', 'f(x) = x²(x − 3).   f′(3) = ?', '9', 'f′ = 2x(x − 3) + x².', 'f′(3) = 0 + 9 = 9.'),
    task('Fração vezes polinômio', 'f(x) = (1/x)(x² + 1).   f′(1) = ?', '0', 'f′ = (−1/x²)(x² + 1) + (1/x)(2x).', 'f′(1) = −2 + 2 = 0. (Confira: f = x + 1/x.)'),
    order('Passos do produto', '', ['Identifique f e g', 'Calcule f′ e g′', 'Monte f′g + fg′', 'Substitua o valor e simplifique'], 'Organize os ingredientes antes de montar.'),
    paper('Produto maior', 'f(x) = (x³ − 2)(x² + x).   f′(1) = ?', '3', 'f′ = 3x²(x² + x) + (x³ − 2)(2x + 1).', 'f′(1) = 3·2 + (−1)(3) = 3.')
  ]),
  phase('Regra do quociente', [
    pill('Derivando uma divisão', [
      'Para f/g a ideia é parecida, mas com um sinal de menos e um denominador ao quadrado.',
      'Regra: (f/g)′ = (f′g − fg′) / g². Macete: “baixo d-alto menos alto d-baixo, sobre baixo ao quadrado”.',
      'Cuidado com a ordem no numerador: aqui ela importa, por causa do sinal de menos.'
    ], '(f/g)′ = (f′g − f·g′) / g²'),
    guided('x/(x + 1) em x = 1', 'f(x) = x,  g(x) = x + 1', [
      step('Calcule f′g − fg′ em x = 1.', '1', 'f′ = 1 e g′ = 1: (1)(2) − (1)(1).', 'f′g = 2 e fg′ = 1; diferença 1.'),
      step('Calcule g² em x = 1.', '4', 'g(1) = 2.', 'g² = 4.'),
      step('Quanto vale f′(1)?', '1/4|0.25', 'Divida 1 por 4.', 'f′(1) = 1/4.')
    ], 'Em geral (x/(x + 1))′ = 1/(x + 1)².'),
    task('Quociente em x = 1', 'f(x) = x²/(x + 2).   f′(1) = ?', '5/9', 'f′ = (2x(x + 2) − x²)/(x + 2)².', '(6 − 1)/9 = 5/9.'),
    task('Numerador zero', 'f(x) = 3x/(x² + 1).   f′(0) = ?', '3', 'Numerador: 3(x² + 1) − 3x·2x.', 'f′(0) = (3 − 0)/1 = 3.'),
    task('Memorize o numerador', 'Na regra do quociente (f/g)′, o numerador é…', 'f′g − fg′', 'Há um sinal de menos.', 'O numerador é f′g − fg′ e o denominador g².', ['f′g − fg′', 'f′g + fg′', 'fg′ − f′g']),
    paper('Quociente com raízes simples', 'f(x) = (x − 1)/(x + 1).   f′(0) = ?', '2', 'f′ = ((x + 1) − (x − 1))/(x + 1)².', 'f′ = 2/(x + 1)², logo f′(0) = 2.')
  ]),
  phase('Produto ou quociente?', [
    pill('Escolha a ferramenta (e simplifique antes)', [
      'Antes de aplicar uma regra pesada, pergunte: dá para simplificar? (x³ + x)/x = x² + 1, bem mais fácil de derivar.',
      'Se não dá, decida: multiplicação → produto; divisão → quociente. E 1/g às vezes é mais simples como g⁻¹.',
      'A repetição aqui é de propósito: errar o sinal da regra do quociente é o erro número 1 dos alunos.'
    ], 'simplifique primeiro, derive depois'),
    task('Simplificar ajuda', 'f(x) = (x³ + x)/x.   f′(2) = ?', '4', 'f(x) = x² + 1 para x ≠ 0.', 'f′(x) = 2x, logo f′(2) = 4.'),
    task('Recíproco', 'f(x) = 1/(x² + 1).   f′(1) = ?', '-1/2|-0.5', 'f′ = (0·(x² + 1) − 1·2x)/(x² + 1)².', 'f′(1) = −2/4 = −1/2.'),
    guided('Quociente com polinômios', 'f(x) = (x² + 1)/(x − 1),  x = 2', [
      step('Quanto vale f′g em x = 2?', '4', 'f′ = 2x e g(2) = 1.', 'f′(2)g(2) = 4·1 = 4.'),
      step('Quanto vale f·g′ em x = 2?', '5', 'f(2) = 5 e g′ = 1.', 'fg′ = 5.'),
      step('Quanto vale f′(2), com g² = 1?', '-1', '(4 − 5)/1.', 'f′(2) = −1.')
    ], 'O sinal de menos faz toda a diferença.'),
    order('Passos do quociente', '', ['Identifique f (cima) e g (baixo)', 'Calcule f′ e g′', 'Monte (f′g − fg′)/g²', 'Substitua e simplifique'], 'Mesma disciplina do produto, com sinal de menos e g² embaixo.'),
    paper('Quociente que simplifica', 'f(x) = (x² − 4)/(x + 2).   f′(3) = ?', '1', 'Use a regra ou simplifique para x − 2.', 'Pela regra: (6·5 − 5)/25 = 1. Simplificando, f = x − 2, f′ = 1.')
  ]),
  phase('Chefão da unidade 4', [
    task('Quociente em x = 3', 'f(x) = (x + 1)/(x − 1).   f′(3) = ?', '-1/2|-0.5', 'f′ = ((x − 1) − (x + 1))/(x − 1)².', 'f′ = −2/(x − 1)², logo f′(3) = −1/2.'),
    task('Produto de potências', 'f(x) = x²·x³.   f′(1) = ?', '5', 'Pelo produto: 2x·x³ + x²·3x². Ou f = x⁵.', 'f′(1) = 2 + 3 = 5.'),
    guided('Tangente horizontal', 'f(x) = x/(x² + 1),  a = 1', [
      step('Quanto vale f(1)?', '1/2|0.5', '1/(1 + 1).', 'f(1) = 1/2.'),
      step('Numerador de f′ em x = 1: (x² + 1) − x·2x.', '0', '2 − 2.', 'O numerador é zero.'),
      step('Qual a inclinação da tangente em x = 1?', '0', 'Numerador 0 sobre 4.', 'Inclinação 0: tangente horizontal.'),
      step('Quanto vale a tangente em x = 3?', '1/2|0.5', 'A reta é horizontal y = 1/2.', 'y = 1/2.')
    ], 'Tangente horizontal y = 1/2.'),
    task('Produto maior', 'f(x) = (x³ + 1)(x² − 1).   f′(1) = ?', '4', 'f′ = 3x²(x² − 1) + (x³ + 1)·2x.', 'f′(1) = 0 + 2·2 = 4.'),
    order('Quociente completo', '', ['Escreva f e g', 'Derive f e g', 'Monte numerador f′g − fg′', 'Divida por g²'], 'Ordem de segurança do quociente.'),
    paper('Quociente linear', 'f(x) = (2x + 3)/(x − 1).   f′(2) = ?', '-5', 'f′ = (2(x − 1) − (2x + 3))/(x − 1)².', 'f′ = −5/(x − 1)², logo f′(2) = −5.')
  ], {boss: true})
]));

// ───────────────────────── Unidade 5 · Regra da cadeia
add(unit('Regra da cadeia', 'Funções dentro de funções', [
  phase('Dentro e fora', [
    pill('Funções compostas', [
      'Muitas funções são “camadas”: (3x + 1)⁵ tem uma casca de fora (elevar à quinta) e um recheio de dentro (3x + 1).',
      'Para derivar, derive a casca de fora mantendo o recheio, e MULTIPLIQUE pela derivada do recheio. É a regra da cadeia.',
      'Em símbolos: [f(g(x))]′ = f′(g(x))·g′(x). Pense em engrenagens: a velocidade final é o produto das razões de cada engrenagem.'
    ], '[f(g(x))]′ = f′(g(x))·g′(x)'),
    task('Identifique o recheio', '(3x + 1)⁵:  qual é a função de dentro?', '3x+1', 'É o que está dentro dos parênteses.', 'A função de dentro é 3x + 1; a de fora é u⁵.', ['3x+1', 'x⁵', '5']),
    task('Valor do recheio', 'g(x) = 3x + 1.   g(2) = ?', '7', 'Troque x por 2.', 'g(2) = 7.'),
    guided('(3x + 1)⁵ em x = 0', 'f(x) = (3x + 1)⁵,  u = 3x + 1', [
      step('Quanto vale u em x = 0?', '1', '3·0 + 1.', 'u = 1.'),
      step('Derivada de fora, 5u⁴, em u = 1?', '5', '5·1⁴.', 'É 5.'),
      step('Derivada de dentro, u′?', '3', 'Derive 3x + 1.', 'u′ = 3.'),
      step('Multiplique: f′(0).', '15', '5·3.', 'f′(0) = 15.')
    ], 'f′(x) = 5(3x + 1)⁴·3, que vale 15 em 0.'),
    task('Cúbica de reta', 'f(x) = (2x − 1)³.   f′(1) = ?', '6', 'f′ = 3(2x − 1)²·2.', 'f′(1) = 3·1·2 = 6.'),
    paper('Potência de polinômio', 'f(x) = (x² + 1)⁴.   f′(1) = ?', '64', 'f′ = 4(x² + 1)³·2x.', 'f′(1) = 4·8·2 = 64.')
  ]),
  phase('Potência de função', [
    pill('A regra do tombo generalizada', [
      'O caso mais comum da cadeia: uⁿ, onde u é uma função de x. A regra vira (uⁿ)′ = n·uⁿ⁻¹·u′.',
      'É a regra do tombo de sempre, só que com um “bônus”: multiplicar pela derivada do recheio. Esquecer o u′ é o erro clássico.',
      'Também vale com raízes e frações: √u = u^(1/2) e 1/u = u⁻¹.'
    ], '(uⁿ)′ = n·uⁿ⁻¹·u′'),
    guided('(x² + 3x)⁴ em x = 1', 'u = x² + 3x,  n = 4', [
      step('Quanto vale u(1)?', '4', '1 + 3.', 'u(1) = 4.'),
      step('Quanto vale u′(1), com u′ = 2x + 3?', '5', '2 + 3.', 'u′(1) = 5.'),
      step('Quanto vale 4u³ em u = 4?', '256', '4·64.', '4u³ = 256.'),
      step('Multiplique por u′ = 5.', '1280', '256·5.', 'f′(1) = 1280.')
    ], 'Sempre: tombo, depois derivada do recheio.'),
    task('Raiz de polinômio', 'f(x) = √(x² + 9).   f′(4) = ?', '4/5|0.8', 'f′ = (1/2)(x² + 9)^(−1/2)·2x.', 'u = 25, então f′(4) = x/√(x² + 9) = 4/5.'),
    task('Fração por cadeia', 'f(x) = 1/(x² + 3) = (x² + 3)⁻¹.   f′(1) = ?', '-1/8|-0.125', 'f′ = −(x² + 3)⁻²·2x.', 'f′(1) = −2/16 = −1/8.'),
    task('Quadrado de polinômio', 'f(x) = (x³ − x)².   f′(2) = ?', '132', 'f′ = 2(x³ − x)(3x² − 1).', 'f′(2) = 2·6·11 = 132.'),
    paper('Potência quinta', 'f(x) = (4x − 3)⁵.   f′(1) = ?', '20', 'f′ = 5(4x − 3)⁴·4.', 'f′(1) = 5·1·4 = 20.')
  ]),
  phase('Cadeia com sen e cos', [
    pill('Funções trigonométricas por dentro', [
      'Vou te emprestar duas derivadas que vamos justificar já já: (sen u)′ = cos u·u′ e (cos u)′ = −sen u·u′.',
      'Intuição: sen(3x) oscila 3 vezes mais rápido que sen x, então sua derivada ganha o fator 3 do recheio.',
      'Macete de sinal: sen → cos (positivo), cos → −sen (negativo). A cadeia sempre multiplica por u′ no final.'
    ], '(sen u)′ = cos u·u′        (cos u)′ = −sen u·u′'),
    guided('sen(3x) em x = 0', 'f(x) = sen(3x),  u = 3x', [
      step('Quanto vale u em x = 0?', '0', '3·0.', 'u = 0.'),
      step('Quanto vale cos(u) em u = 0?', '1', 'cos 0.', 'cos 0 = 1.'),
      step('Quanto vale u′?', '3', 'Derive 3x.', 'u′ = 3.'),
      step('Multiplique: f′(0).', '3', '1·3.', 'f′(0) = 3.')
    ], 'f′(x) = 3cos(3x).'),
    task('Derive sen(5x)', 'Derive f(x) = sen(5x).', '5cos(5x)|5cos5x|5·cos(5x)', 'cos do recheio vezes 5.', 'f′(x) = 5cos(5x).'),
    task('Recheio quadrático', 'Derive f(x) = sen(x²).', '2xcos(x²)|2xcos(x^2)|2x·cos(x²)|2xcosx²|cos(x²)·2x|cos(x²)2x', 'u′ = 2x.', 'f′(x) = cos(x²)·2x.'),
    task('Cosseno', 'Derive f(x) = cos(3x).', '-3sen(3x)|-3sin(3x)|-3sen3x|-3sin3x|-3·sen(3x)', 'cos → −sen, vezes u′ = 3.', 'f′(x) = −3sen(3x).'),
    paper('Valor no ponto', 'f(x) = sen(4x).   f′(0) = ?', '4', 'f′ = 4cos(4x).', 'f′(0) = 4·1 = 4.')
  ]),
  phase('Cadeia com eˣ e ln', [
    pill('Exponencial e logaritmo por dentro', [
      'Mais duas derivadas emprestadas: (e^u)′ = e^u·u′ e (ln u)′ = u′/u.',
      'Intuição: e^u é a função que “cresce na proporção do próprio tamanho”, então se repete e só ganha o u′. Já ln u vira “derivada do recheio dividida pelo recheio”.',
      'Macete do ln: “u′ sobre u”. Ex.: (ln(5x))′ = 5/(5x) = 1/x.'
    ], '(e^u)′ = e^u·u′        (ln u)′ = u′/u'),
    guided('e^(2x) em x = 0', 'f(x) = e^(2x),  u = 2x', [
      step('Quanto vale e^u em x = 0?', '1', 'u = 0 e e⁰ = 1.', 'e⁰ = 1.'),
      step('Quanto vale u′?', '2', 'Derive 2x.', 'u′ = 2.'),
      step('Multiplique: f′(0).', '2', '1·2.', 'f′(0) = 2.')
    ], 'f′(x) = 2e^(2x).'),
    task('Derive e^(3x)', 'Derive f(x) = e^(3x).', '3e^(3x)|3e^3x|3e^{3x}|3·e^(3x)|e^(3x)·3', 'Repita e^u e multiplique por u′ = 3.', 'f′(x) = 3e^(3x).'),
    task('Derive ln(5x)', 'Derive f(x) = ln(5x).', '1/x', 'u′/u = 5/(5x).', 'f′(x) = 5/(5x) = 1/x.'),
    task('Ln de quadrática', 'f(x) = ln(x² + 1).   f′(1) = ?', '1', 'f′ = 2x/(x² + 1).', 'f′(1) = 2/2 = 1.'),
    task('Expoente quadrático', 'f(x) = e^(x²).   f′(1) = ?', '2e', 'f′ = e^(x²)·2x.', 'f′(1) = 2e.'),
    paper('Ln no ponto', 'f(x) = ln(3x − 2).   f′(2) = ?', '3/4|0.75', 'f′ = 3/(3x − 2).', 'f′(2) = 3/4.')
  ]),
  phase('Chefão da unidade 5', [
    task('Raiz de reta', 'f(x) = √(2x + 1).   f′(4) = ?', '1/3', 'f′ = (1/2)(2x + 1)^(−1/2)·2 = 1/√(2x + 1).', 'f′(4) = 1/√9 = 1/3.'),
    task('Produto com cadeia', 'f(x) = x(x² + 1)³.   f′(1) = ?', '32', 'f′ = (x² + 1)³ + x·3(x² + 1)²·2x.', 'f′(1) = 8 + 24 = 32.'),
    guided('Tangente de e^(2x)', 'f(x) = e^(2x),  x = 0', [
      step('Quanto vale f(0)?', '1', 'e⁰.', 'O ponto é (0, 1).'),
      step('Quanto vale f′(0)?', '2', '2e^(2x) em 0.', 'Inclinação 2.'),
      step('Quanto vale a tangente em x = 1?', '3', 'y = 1 + 2·1.', 'y = 3.')
    ], 'Tangente y = 1 + 2x.'),
    task('Recíproco de linear ao quadrado', 'f(x) = 1/(2x + 1)².   f′(0) = ?', '-4', 'f = (2x + 1)⁻²; f′ = −2(2x + 1)⁻³·2.', 'f′(0) = −4.'),
    order('Cadeia em ordem', '', ['Identifique a casca de fora e o recheio u', 'Derive a casca mantendo u dentro', 'Derive o recheio: u′', 'Multiplique os dois resultados'], 'A cadeia é sempre: fora (com o recheio) vezes derivada do recheio.'),
    paper('Ln com quadrática', 'f(x) = ln(x² + 4).   f′(2) = ?', '1/2|0.5', 'f′ = 2x/(x² + 4).', 'f′(2) = 4/8 = 1/2.')
  ], {boss: true})
]));

// ───────────────────────── Unidade 6 · Funções especiais
add(unit('Funções especiais', 'sen, cos, tan, eˣ, ln, aˣ e a tabela essencial', [
  phase('sen e cos', [
    pill('O ciclo das derivadas trigonométricas', [
      'Olhe o gráfico de sen x: em x = 0 ele sobe com inclinação 1, que é cos 0. No topo, a inclinação é 0, que é cos(π/2). Faz sentido: (sen x)′ = cos x!',
      'E (cos x)′ = −sen x. As derivadas formam um ciclo de quatro: sen → cos → −sen → −cos → sen.',
      'Macete: “sen vira cos, cos vira menos sen”. Sempre confira o sinal do cosseno!'
    ], '(sen x)′ = cos x        (cos x)′ = −sen x'),
    guided('Derivando 3sen x − 2cos x em x = 0', 'f(x) = 3sen x − 2cos x', [
      step('Qual é f′(x), em termos de cos e sen? Quanto vale o coeficiente de cos x?', '3', '(3sen x)′ = 3cos x.', 'O termo é 3cos x.'),
      step('E o termo em sen x: (−2cos x)′ = +2sen x. Qual o coeficiente?', '2', 'Dois sinais de menos se cancelam.', 'O termo é +2sen x.'),
      step('Quanto vale f′(0) = 3cos 0 + 2sen 0?', '3', 'cos 0 = 1 e sen 0 = 0.', 'f′(0) = 3.')
    ], 'f′(x) = 3cos x + 2sen x.'),
    task('Soma trigonométrica', 'f(x) = sen x + cos x.   f′(π) = ?', '-1', 'f′ = cos x − sen x.', 'f′(π) = −1 − 0 = −1.'),
    task('Produto com seno', 'f(x) = x·sen x.   f′(π) = ?', '-π|-pi', 'f′ = sen x + x cos x.', 'f′(π) = 0 + π·(−1) = −π.'),
    task('Derive cos x', 'Derive f(x) = cos x.', '-sen(x)|-senx|-sin(x)|-sinx', 'Não esqueça do sinal.', 'f′(x) = −sen x.'),
    paper('Valor no ponto', 'f(x) = 4cos x + sen x.   f′(0) = ?', '1', 'f′ = −4sen x + cos x.', 'f′(0) = 0 + 1 = 1.')
  ]),
  phase('tan e sec', [
    pill('Tangente pelo quociente', [
      'Não precisa decorar tan x como algo novo: tan x = sen x/cos x, e já temos a regra do quociente!',
      'Numerador: cos x·cos x − sen x·(−sen x) = cos²x + sen²x = 1. Denominador: cos²x. Logo (tan x)′ = 1/cos²x = sec²x.',
      'Macete: “tan vira sec ao quadrado”. É sempre positiva, então tan x só cresce.'
    ], '(tan x)′ = sec²x = 1/cos²x'),
    guided('Derivando tan x', 'tan x = sen x / cos x', [
      step('Simplifique cos²x + sen²x.', '1', 'Identidade fundamental.', 'Vale 1.'),
      step('Então (tan x)′ = 1/cos²x. Quanto vale em x = 0?', '1', 'cos 0 = 1.', 'Vale 1.'),
      step('Quanto vale em x = π/4, onde cos² = 1/2?', '2', '1/(1/2).', 'Vale 2.')
    ], '(tan x)′ = sec²x.'),
    task('Tangente em π/4', 'f(x) = tan x.   f′(π/4) = ?', '2', 'cos²(π/4) = 1/2.', '1/(1/2) = 2.'),
    task('Combinação', 'f(x) = 2tan x + x.   f′(0) = ?', '3', 'f′ = 2sec²x + 1.', 'f′(0) = 2 + 1 = 3.'),
    task('Qual é a derivada de tan?', '(tan x)′ = …', 'sec²x', 'Veio do quociente sen/cos.', '(tan x)′ = sec²x.', ['sec²x', '−csc²x', 'cos²x']),
    paper('Tangente menos x', 'f(x) = tan x − x.   f′(π/4) = ?', '1', 'f′ = sec²x − 1.', 'f′(π/4) = 2 − 1 = 1.')
  ]),
  phase('eˣ e ln x', [
    pill('As duas funções “naturais”', [
      'A função exponencial natural é especial: eˣ é a única (a menos de constante) cuja derivada é ela mesma. Cresce na proporção do próprio tamanho.',
      'E o logaritmo natural é a função inversa: (ln x)′ = 1/x, definida só para x > 0.',
      'Macete: “eˣ não muda e ln x vira um sobre x”. Com a regra do produto e a do quociente, dá para derivar x·eˣ, x·ln x, ln x/x…'
    ], '(eˣ)′ = eˣ        (ln x)′ = 1/x'),
    guided('Derivando x·eˣ em x = 0', 'f(x) = x·eˣ', [
      step('Derivada do primeiro fator, x?', '1', '(x)′.', 'É 1.'),
      step('Derivada do segundo fator, eˣ?', 'eˣ|e^x', 'Ela mesma.', 'É eˣ.'),
      step('Calcule f′(0) = 1·e⁰ + 0·e⁰.', '1', 'e⁰ = 1.', 'f′(0) = 1.')
    ], 'f′(x) = eˣ + x·eˣ = (1 + x)eˣ.'),
    task('Soma com eˣ', 'f(x) = 3eˣ + x².   f′(0) = ?', '3', 'f′ = 3eˣ + 2x.', 'f′(0) = 3.'),
    task('Produto com ln', 'f(x) = x·ln x.   f′(e) = ?', '2', 'f′ = ln x + 1.', 'f′(e) = 1 + 1 = 2.'),
    task('Quociente com ln', 'f(x) = ln x / x.   f′(1) = ?', '1', 'f′ = (1 − ln x)/x².', 'f′(1) = 1.'),
    task('Quociente com eˣ', 'f(x) = eˣ / x.   f′(1) = ?', '0', 'f′ = (x eˣ − eˣ)/x².', 'f′(1) = 0.'),
    paper('Soma ln e exponencial', 'f(x) = 2ln x + eˣ.   f′(1) = ?', '2+e|e+2', 'f′ = 2/x + eˣ.', 'f′(1) = 2 + e.')
  ]),
  phase('aˣ e a tabela essencial', [
    pill('Exponenciais de outras bases', [
      'Para 2ˣ ou 5ˣ usamos um truque: aˣ = e^(x ln a). Agora é cadeia! A derivada é aˣ·ln a.',
      'Atenção para não confundir: xᵃ (variável na base) usa a regra do tombo; aˣ (variável no expoente) usa aˣ ln a.',
      'Tabela essencial: (xⁿ)′ = nxⁿ⁻¹, (sen)′ = cos, (cos)′ = −sen, (tan)′ = sec², (eˣ)′ = eˣ, (ln x)′ = 1/x, (aˣ)′ = aˣ ln a.'
    ], '(aˣ)′ = aˣ·ln a'),
    guided('Derivando 2ˣ em x = 0', 'f(x) = 2ˣ', [
      step('Quanto vale 2ˣ em x = 0?', '1', 'Qualquer base⁰ = 1.', '2⁰ = 1.'),
      step('Quanto vale ln a, para a = 2?', 'ln2|ln(2)', 'Só escreva ln 2.', 'ln a = ln 2.'),
      step('Quanto vale f′(0)?', 'ln2|ln(2)', '1·ln 2.', 'f′(0) = ln 2.')
    ], '(2ˣ)′ = 2ˣ ln 2.'),
    task('Reconheça a fórmula', '(aˣ)′ = …', 'aˣ ln a', 'É a exponencial vezes um fator constante.', '(aˣ)′ = aˣ ln a.', ['aˣ', 'aˣ ln a', 'x·aˣ⁻¹']),
    task('Base 7', 'f(x) = 7ˣ.   f′(0) = ?', 'ln7|ln(7)', 'f′ = 7ˣ ln 7.', 'f′(0) = ln 7.'),
    task('Expoente constante', 'f(x) = x^π.   f′(1) = ?', 'π|pi', 'Aqui a variável está na base: regra do tombo.', 'f′(x) = πx^(π−1), logo f′(1) = π.'),
    task('Base 3', 'f(x) = 3ˣ.   f′(1) = ?', '3ln3|3ln(3)|3·ln3|3·ln(3)', 'f′ = 3ˣ ln 3.', 'f′(1) = 3 ln 3.'),
    paper('Base 2', 'f(x) = 2ˣ.   f′(3) = ?', '8ln2|8ln(2)|8·ln2|8·ln(2)', 'f′ = 2ˣ ln 2.', 'f′(3) = 8 ln 2.')
  ]),
  phase('Chefão da unidade 6', [
    task('x² eˣ', 'f(x) = x²eˣ.   f′(1) = ?', '3e|3·e', 'f′ = 2x eˣ + x² eˣ.', 'f′(1) = 2e + e = 3e.'),
    task('Quociente com seno', 'f(x) = sen x / x.   f′(π) = ?', '-1/π|-1/pi', 'f′ = (x cos x − sen x)/x².', 'f′(π) = (−π)/π² = −1/π.'),
    guided('eˣ·sen x em x = 0', 'f(x) = eˣ sen x', [
      step('Quanto vale (eˣ)′ sen x em x = 0?', '0', 'sen 0 = 0.', 'Vale 0.'),
      step('Quanto vale eˣ (sen x)′ em x = 0?', '1', 'e⁰ cos 0.', 'Vale 1.'),
      step('Quanto vale f′(0)?', '1', 'Some os dois.', 'f′(0) = 0 + 1 = 1.')
    ], 'f′(x) = eˣ(sen x + cos x).'),
    task('x^e mais e^x', 'f(x) = eˣ + xᵉ.   f′(1) = ?', '2e|2·e', '(xᵉ)′ = e xᵉ⁻¹.', 'f′(1) = e + e = 2e.'),
    task('Produto com ln', 'f(x) = (x² + 1)·ln x.   f′(1) = ?', '2', 'f′ = 2x ln x + (x² + 1)/x.', 'f′(1) = 0 + 2 = 2.'),
    paper('Tangente e secante', 'f(x) = tan x · cos x   (simplifique antes).  f′(0) = ?', '1', 'tan x·cos x = sen x.', 'f = sen x, então f′(0) = cos 0 = 1.')
  ], {boss: true})
]));

// ───────────────────────── Unidade 7 · Ordem superior e derivação implícita
add(unit('Ordem superior e derivação implícita', 'Derivar a derivada e derivar quando y está “escondido”', [
  phase('Segunda derivada', [
    pill('Derivando a derivada', [
      'Se f′ é uma função, posso derivá-la de novo: f″ = (f′)′. É a derivada segunda, a “taxa de variação da taxa de variação”.',
      'Exemplo físico: s é posição, s′ é velocidade, s″ é aceleração. Pisar no acelerador muda a velocidade.',
      'Notação: f″(x) = d²y/dx². Procedimento: derive uma vez, simplifique, derive de novo.'
    ], 'f″ = (f′)′        d²y/dx² = d/dx(dy/dx)'),
    guided('Segunda derivada de x⁴ − 3x²', 'f(x) = x⁴ − 3x²', [
      step('Derive uma vez. Qual o resultado?', '4x³−6x|4x^3-6x|-6x+4x³|-6x+4x^3', 'Regra do tombo em cada termo.', 'f′(x) = 4x³ − 6x.'),
      step('Derive de novo.', '12x²−6|12x^2-6|-6+12x²|-6+12x^2', '(4x³)′ = 12x² e (6x)′ = 6.', 'f″(x) = 12x² − 6.'),
      step('Quanto vale f″(1)?', '6', '12 − 6.', 'f″(1) = 6.')
    ], 'f″(1) = 6.'),
    task('Cúbica', 'f(x) = x³.   f″(2) = ?', '12', 'f′ = 3x², f″ = 6x.', 'f″(2) = 12.'),
    task('Segunda derivada de 1/x', 'f(x) = 1/x.   f″(1) = ?', '2', 'f′ = −x⁻², f″ = 2x⁻³.', 'f″(1) = 2.'),
    task('Seno', 'f(x) = sen x.   f″(π/2) = ?', '-1', 'f′ = cos x, f″ = −sen x.', 'f″(π/2) = −1.'),
    task('Exponencial composta', 'f(x) = e^(2x).   f″(0) = ?', '4', 'f′ = 2e^(2x), f″ = 4e^(2x).', 'f″(0) = 4.'),
    paper('Polinômio', 'f(x) = x⁵ − 2x³.   f″(1) = ?', '8', 'f″ = 20x³ − 12x.', 'f″(1) = 8.')
  ]),
  phase('Ordem n e aplicações', [
    pill('Padrões nas derivadas sucessivas', [
      'Derivar várias vezes revela padrões. Em um polinômio de grau n, cada derivada baixa o grau em 1: a n-ésima é constante e a (n + 1)-ésima é zero.',
      'Em sen x e cos x o padrão se repete a cada quatro derivadas. E eˣ nunca muda.',
      'Notação: f⁽ⁿ⁾ é a derivada de ordem n. Em movimento, v = s′ e a = s″.'
    ], 'f⁽ⁿ⁾ = n-ésima derivada'),
    guided('Velocidade e aceleração', 's(t) = t³ − 6t² + 9t', [
      step('Calcule v(2), com v = 3t² − 12t + 9.', '-3', '12 − 24 + 9.', 'v(2) = −3.'),
      step('A aceleração é a = v′ = 6t − 12. Quanto vale a(5)?', '18', '30 − 12.', 'a(5) = 18.'),
      step('Em que t a aceleração é zero?', '2', '6t − 12 = 0.', 't = 2.')
    ], 'Em t = 2 a velocidade é mínima.'),
    task('Terceira derivada', 'f(x) = x⁴.   f‴(1) = ?', '24', 'f‴ = 24x.', 'f‴(1) = 24.'),
    task('Quarta derivada', 'f(x) = x⁵.   f⁽⁴⁾(1) = ?', '120', 'f⁽⁴⁾ = 120x.', 'f⁽⁴⁾(1) = 120.'),
    task('Grau menor', 'f(x) = x³ + 2x.   f⁽⁴⁾(x) = ?', '0', 'Cada derivada baixa o grau.', 'Depois de 4 derivadas de um cúbico sobra 0.'),
    task('Ciclo do seno', 'f(x) = sen x.   f⁽⁷⁾(0) = ?', '-1', 'Ciclo: sen, cos, −sen, −cos. 7 = 4 + 3.', 'f⁽⁷⁾ = −cos x, que em 0 vale −1.'),
    paper('n-ésima derivada', 'f(x) = x⁶.   f⁽⁶⁾(x) = ?', '720', '6! = 720.', 'A sexta derivada é 6·5·4·3·2·1 = 720.')
  ]),
  phase('A ideia da derivação implícita', [
    pill('Quando y está escondido', [
      'Às vezes y não aparece isolado: x² + y² = 25 define um círculo. Mesmo assim y é uma função de x perto de cada ponto.',
      'Estratégia: derive os dois lados em relação a x, lembrando que y depende de x. Então d/dx(y²) = 2y·y′ (é a regra da cadeia!).',
      'Macete: “todo y derivado traz um y′ de brinde”. Depois, é só isolar y′.'
    ], 'd/dx(y²) = 2y·y′'),
    task('Derive y³', 'd/dx(y³) = ?', '3y²y′|3y²·y′|3y²y\'|3y^2y′|3y²dy/dx', 'Regra do tombo e o brinde y′.', 'd/dx(y³) = 3y²·y′.'),
    task('x versus y', 'd/dx(y²) é…', '2y y′', 'Lembre do brinde.', 'Derivar y² em relação a x traz y′.', ['2x', '2y y′', '2y']),
    guided('Círculo x² + y² = 25 em (3, 4)', 'x² + y² = 25', [
      step('Qual a derivada de x²?', '2x', 'Regra do tombo.', 'É 2x.'),
      step('Derivada de y²: 2y·?', 'y′|y\'|dy/dx', 'O brinde da cadeia.', 'É 2y·y′.'),
      step('Isolando, y′ = ?', '-x/y', '2x + 2y y′ = 0.', 'y′ = −x/y.'),
      step('Quanto vale y′ em (3, 4)?', '-3/4|-0.75', '−3/4.', 'Inclinação −3/4.')
    ], 'No círculo, y′ = −x/y.'),
    task('Derive xy', 'd/dx(x·y) = y + x·?', 'y′|y\'|dy/dx', 'Regra do produto: (x)′y + x(y)′.', 'Fica y + x·y′.'),
    paper('Topo do círculo', 'x² + y² = 25 em (0, 5).   y′ = ?', '0', 'y′ = −x/y.', 'y′ = 0 no topo: tangente horizontal.')
  ]),
  phase('Isolando y′', [
    pill('O roteiro da derivação implícita', [
      'Roteiro: 1) derive os dois lados em x; 2) leve para um lado os termos com y′; 3) fatore y′ e isole.',
      'Quase sempre pedem y′ em um ponto (a, b). Nesse caso substitua x = a e y = b logo, para simplificar contas.',
      'Se o coeficiente de y′ der zero, a tangente é vertical e a derivada não existe naquele ponto.'
    ], 'derive → agrupe y′ → isole'),
    guided('x³ + y³ = 9 em (1, 2)', 'x³ + y³ = 9', [
      step('Quanto vale 3x² em x = 1?', '3', '3·1.', 'É 3.'),
      step('Quanto vale 3y², o coeficiente de y′, em y = 2?', '12', '3·4.', 'É 12.'),
      step('Resolva 3 + 12y′ = 0.', '-1/4|-0.25', 'y′ = −3/12.', 'y′ = −1/4.')
    ], 'Em geral y′ = −x²/y².'),
    task('Hipérbole', 'xy = 4 em (2, 2).   y′ = ?', '-1', 'y + x y′ = 0.', 'y′ = −y/x = −1.'),
    task('Parábola deitada', 'y² = x em (4, 2).   y′ = ?', '1/4|0.25', '2y y′ = 1.', 'y′ = 1/(2y) = 1/4.'),
    task('Termos mistos', 'x² + xy + y² = 3 em (1, 1).   y′ = ?', '-1', '2x + y + x y′ + 2y y′ = 0.', '3 + 3y′ = 0 ⇒ y′ = −1.'),
    order('Roteiro implícito', '', ['Derive os dois lados em relação a x', 'Leve os termos com y′ para um lado', 'Fatore y′', 'Isole y′ e substitua o ponto'], 'Derive, agrupe, fatore, isole.'),
    paper('Elipse inclinada', 'x² − xy + y² = 3 em (1, −1).   y′ = ?', '1', '2x − y − x y′ + 2y y′ = 0.', '3 − 3y′ = 0 ⇒ y′ = 1.')
  ]),
  phase('Tangente implícita', [
    pill('Reta tangente a uma curva implícita', [
      'Com y′ em um ponto, a tangente é a mesma de sempre: y − b = y′·(x − a).',
      'Nem sempre dá para escrever y = f(x), mas a tangente existe. É a grande vantagem da derivação implícita.',
      'Exemplos úteis: círculos, parábolas deitadas e curvas com exponenciais ou logaritmos.'
    ], 'y − b = y′(a, b)·(x − a)'),
    guided('Tangente ao círculo em (3, 4)', 'x² + y² = 25', [
      step('Qual a inclinação em (3, 4)?', '-3/4|-0.75', 'y′ = −x/y.', 'Inclinação −3/4.'),
      step('Quanto vale a tangente em x = 7?', '1', 'y = 4 − (3/4)(7 − 3).', 'y = 4 − 3 = 1.')
    ], 'A reta é y = −(3/4)x + 25/4.'),
    task('Círculo menor', 'x² + y² = 13 em (2, 3).  Quanto vale a tangente em x = 5?', '1', 'Inclinação −2/3; y = 3 − (2/3)(3).', 'y = 3 − 2 = 1.'),
    task('Parábola deitada', 'y² = 4x em (1, 2).  Quanto vale a tangente em x = 3?', '4', '2y y′ = 4 ⇒ y′ = 2/y = 1.', 'y = 2 + 1·(3 − 1) = 4.'),
    task('Exponencial implícita', 'e^y = x em (e, 1).   y′ = ?', '1/e', 'e^y·y′ = 1.', 'y′ = 1/e^y = 1/x = 1/e.'),
    paper('Tangente cúbica', 'x³ + y³ = 9 em (1, 2).  Quanto vale a tangente em x = 5?', '1', 'Inclinação −1/4.', 'y = 2 − (1/4)(4) = 1.')
  ]),
  phase('Chefão da unidade 7', [
    task('Segunda derivada', 'f(x) = x⁴ − x².   f″(1) = ?', '10', 'f″ = 12x² − 2.', 'f″(1) = 10.'),
    task('Hipérbole', 'xy = 6 em (2, 3).   y′ = ?', '-3/2|-1.5', 'y + x y′ = 0.', 'y′ = −y/x = −3/2.'),
    guided('Curva y² = x³', 'y² = x³ em (4, 8)', [
      step('Quanto vale 3x² em x = 4?', '48', '3·16.', '48.'),
      step('Quanto vale 2y em y = 8?', '16', '2·8.', '16.'),
      step('Quanto vale y′ = 48/16?', '3', 'Divida.', 'y′ = 3.')
    ], 'Em geral y′ = 3x²/(2y).'),
    task('Aceleração', 's(t) = 2t³ − 9t² + 12t.   a(1) = ?', '-6', 'a = s″ = 12t − 18.', 'a(1) = −6.'),
    task('Derivada de ln y', 'd/dx(ln y) = ?', 'y′/y|y\'/y|y′÷y', '(ln u)′ = u′/u com u = y.', 'd/dx(ln y) = y′/y.'),
    paper('Seno implícito', 'sen y = x em (0, 0).   y′ = ?', '1', 'cos y·y′ = 1.', 'y′ = 1/cos 0 = 1.')
  ], {boss: true})
]));
})();
