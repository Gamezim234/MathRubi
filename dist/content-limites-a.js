'use strict';
// Seção Limites · unidades 1 e 2. Cadência de cada fase: pílula do Rubi → exemplo guiado → fixação ativa → papel.
const NAO = 'Não existe|nao existe|não existe';

COURSE.limites.units.push(
unit('A ideia de limite', 'Aproxime-se do alvo pelos dois lados', [
  phase('Aproxime-se do alvo', [
    pill('Oi, eu sou o Rubi!', [
      'Eu vou te acompanhar em Cálculo. Meu trabalho é mostrar o porquê das coisas, para você não depender de decoreba.',
      'Limite responde a uma pergunta simples: quando x chega MUITO perto de um alvo, de qual valor f(x) se aproxima?',
      'Repare: o que importa é para onde f(x) VAI, e não o que acontece exatamente no alvo.',
      'Vamos testar na prática: arraste x até o alvo e observe f(x).'
    ], 'lim x→a f(x) = L'),
    coach('Aproxime-se do alvo', 'Arraste x pela esquerda até ficar bem perto da bandeira em 2.', near(2, 3, -1), 'Mova o ponto para a direita. A bandeira indica o alvo.', 'Você levou x até 1,99. O resultado chegou a 4,99, bem perto de 5.'),
    coach('Agora pelo outro lado', 'Repita a jogada vindo da direita. Veja o que acontece com f(x).', near(2, 3, 1), 'Desta vez, mova o ponto para a esquerda.', 'Agora x é 2,01 e f(x) é 5,01. Dos dois lados, f(x) se aproxima de 5.'),
    task('Leia a notação', 'lim x→2 f(x) = 5', 'f(x) chega perto de 5', 'Olhe o que fica ao lado da seta e o que fica depois do sinal de igual.', 'A seta diz para onde x vai (2). O número depois do “=” é o valor de que f(x) se aproxima (5).', ['f(2) é igual a 5', 'f(x) chega perto de 5', 'x chega perto de 5']),
    coach('Mesma jogada, novo alvo', 'Leve x para perto de 4 e observe de qual número o resultado se aproxima.', near(4, 2, -1), 'Arraste em direção à bandeira e leia o valor de f(x).', 'Em 3,99, o resultado é 5,99. Conforme x se aproxima de 4, f(x) se aproxima de 6.'),
    task('Escreva a tendência', 'x → 2:   f(x) = x + 3   |   lim x→2 f(x) = ___', '5', 'Na atividade anterior, f(x) chegou a 4,99 e 5,01.', 'Dos dois lados o resultado se aproxima de 5.'),
    task('Quase no automático', 'f(x) = x + 7   |   lim x→1 f(x) = ___', '8', 'Para onde x + 7 vai quando x chega perto de 1?', 'Perto de 1, x + 7 fica perto de 8.')
  ]),
  phase('Limites laterais', [
    pill('Dois caminhos até o alvo', [
      'Dá para chegar a um alvo por dois caminhos: pela esquerda (x → a⁻) ou pela direita (x → a⁺).',
      'O limite “de verdade” (bilateral) só existe se os dois caminhos levarem ao mesmo valor.',
      'Macete: lados iguais → o limite existe. Lados diferentes → o limite não existe.'
    ], 'lim x→a f(x) existe  ⇔  lim x→a⁻ f(x) = lim x→a⁺ f(x)'),
    task('Compare os dois lados', 'lim x→0⁻ f(x) = 2   |   lim x→0⁺ f(x) = 3', 'Não existe', 'O limite bilateral exige que os dois lados concordem.', 'Como 2 e 3 são diferentes, o limite bilateral não existe.', ['2', '3', 'Não existe']),
    task('De que lado você veio?', 'x = 1,9 → 1,99 → 1,999   |   alvo: 2', 'Esquerda', 'Compare cada valor com 2.', 'Os valores são menores que 2: isso se escreve x → 2⁻.', ['Esquerda', 'Direita']),
    guided('Duas fórmulas, um alvo', 'f(x) = x + 4 se x < 2;   f(x) = 8 − x se x ≥ 2', [
      step('Qual fórmula vale à esquerda de 2? Calcule o limite x→2⁻.', '6', 'À esquerda de 2 vale x + 4.', 'Perto de 2 pela esquerda, x + 4 se aproxima de 6.'),
      step('Qual é o limite x→2⁺ usando 8 − x?', '6', 'Troque x por 2 em 8 − x.', 'Pela direita, 8 − x se aproxima de 6.'),
      step('Os dois lados concordam?', 'Sim', 'Compare 6 com 6.', 'São iguais.', ['Sim', 'Não']),
      step('Então, quanto vale lim x→2 f(x)?', '6', 'É o valor comum dos dois lados.', 'O limite bilateral existe e vale 6.')
    ], 'Roteiro: calcule cada lado com a fórmula certa, compare e conclua.'),
    task('Sinal importa: lado direito', 'lim x→0⁺ |x| / x', '1', 'Para x > 0, quanto vale |x|?', 'Se x > 0, |x| = x, então o quociente vale 1.'),
    task('Sinal importa: lado esquerdo', 'lim x→0⁻ |x| / x', '-1', 'Para x < 0, |x| = −x.', 'Se x < 0, |x| = −x, então o quociente vale −1.'),
    task('Conclua o limite bilateral', 'lim x→0 |x| / x', NAO, 'Compare −1 (esquerda) com 1 (direita).', 'Os lados dão −1 e 1: o limite não existe.', ['−1', '1', 'Não existe'])
  ]),
  phase('O ponto alvo pode enganar', [
    pill('Limite não liga para f(a)', [
      'Detalhe importante: o limite só olha os pontos VIZINHOS do alvo. O que acontece exatamente em x = a não conta.',
      'Por isso f(a) pode ser diferente do limite, ou até nem existir (um “buraco” no gráfico).',
      'Pense assim: o limite é para onde a função “queria” ir, não onde ela de fato parou.'
    ]),
    paper('Limite no papel', 'f(x) = 2x − 1 se x ≠ 4;   f(4) = 12.   lim x→4 f(x) = ?', '7', 'Use a expressão dos pontos próximos.', '2·4 − 1 = 7. O valor isolado de f(4) não altera o limite.'),
    task('O ponto pode ter outro valor', 'f(x) = x + 2 (x ≠ 1),   f(1) = 9.   lim x→1 f(x) = ?', '3', 'Olhe os pontos vizinhos de 1.', 'Perto de 1, a expressão é x + 2 e tende a 3.'),
    task('Leia a tabela', 'f(x) = (x² − 4)/(x − 2)   |   x = 1,9 → 3,9   |   x = 1,99 → 3,99   |   x = 2,01 → 4,01   |   lim x→2 f(x) = ?', '4', 'Veja de que número os valores de f se aproximam.', 'Dos dois lados, f(x) chega perto de 4, mesmo que f(2) não exista.'),
    task('Revise a leitura', 'lim x→3⁻ f(x) = 4   |   lim x→3⁺ f(x) = 4   |   f(3) = 8', '4', 'Compare os dois limites laterais.', 'Os dois lados tendem a 4. O valor f(3) = 8 não entra no limite.', ['4', '8', 'Não existe']),
    task('f(a) nem existe', 'f(x) = 3x para x ≠ 2, e f(2) não está definida.   lim x→2 f(x) = ?', '6', 'A fórmula 3x vale perto de 2.', 'Perto de 2, 3x fica perto de 6, mesmo sem f(2).'),
    paper('Mais um no papel', 'f(x) = x² se x ≠ 3;   f(3) = −5.   lim x→3 f(x) = ?', '9', 'Ignore f(3) e use a fórmula vizinha.', 'Perto de 3, f(x) = x², que tende a 9.')
  ]),
  phase('Tabelas e gráficos', [
    pill('Quando não há fórmula', [
      'Às vezes você recebe só uma tabela ou um gráfico. Tudo bem: o método é o mesmo.',
      'Escolha x cada vez mais perto do alvo, dos dois lados, e veja para onde os valores de f caminham.',
      'Se os dois lados caminham para o mesmo número, esse número é o limite.'
    ]),
    guided('Leia a tabela por inteiro', 'x: 2,99 → 7,98   |   2,999 → 7,998   |   3,001 → 8,002   |   3,01 → 8,02   (alvo x → 3)', [
      step('Para que número f(x) caminha pela esquerda?', '8', 'Veja 7,98 e 7,998.', 'Os valores 7,98 e 7,998 se aproximam de 8.'),
      step('E pela direita?', '8', 'Veja 8,002 e 8,02.', 'Os valores 8,002 e 8,02 também se aproximam de 8.'),
      step('Os lados concordam?', 'Sim', 'Compare 8 com 8.', 'Concordam.', ['Sim', 'Não']),
      step('Estime lim x→3 f(x).', '8', 'É o valor comum.', 'O limite estimado é 8.')
    ]),
    order('Estime um limite por tabela', '', [
      'Escolha valores de x cada vez mais próximos do alvo, pela esquerda',
      'Escolha valores de x cada vez mais próximos do alvo, pela direita',
      'Calcule ou leia f(x) em cada um desses pontos',
      'Compare para onde f(x) caminha nos dois lados'
    ], 'Você precisa dos dois lados antes de comparar.'),
    task('Lados que discordam', 'x → 1⁻:  0,99 → 3,0;  0,999 → 3,0     |     x → 1⁺:  1,01 → 5,0;  1,001 → 5,0', NAO, 'Compare 3 com 5.', 'Um lado caminha para 3 e o outro para 5: o limite bilateral não existe.', ['3', '5', 'Não existe']),
    task('Buraco no gráfico', 'No gráfico, f tem um buraco aberto em (2, 4) e um ponto isolado em (2, 1).   lim x→2 f(x) = ?', '4', 'O limite acompanha a curva ao redor, não o ponto isolado.', 'A curva se aproxima de altura 4 dos dois lados. O ponto isolado (2, 1) não conta.'),
    paper('Tabela no papel', 'f(x) = 3x − 1.  Estime lim x→−1⁺ f(x).', '-4', 'Substitua valores como −0,99 ou calcule 3·(−1) − 1.', 'Como 3x − 1 não tem problema em −1, os valores caminham para −4.')
  ]),
  phase('Monte o raciocínio', [
    pill('Checklist de funções por partes', [
      'Em funções por partes, a pergunta é: qual fórmula manda de cada lado do alvo?',
      'Siga esta ordem: fórmula da esquerda → seu limite → fórmula da direita → seu limite → comparar.',
      'O erro mais comum é usar a mesma fórmula nos dois lados. Cuidado!'
    ]),
    order('Roteiro para funções por partes', '', [
      'Identifique a fórmula usada à esquerda do alvo',
      'Calcule o limite dessa fórmula quando x → a⁻',
      'Faça o mesmo com a fórmula da direita (x → a⁺)',
      'Compare os dois valores e conclua'
    ], 'Cada lado usa a sua própria fórmula.'),
    guided('Lados diferentes', 'f(x) = x² se x < 1;   f(x) = 3 − x se x ≥ 1', [
      step('Calcule lim x→1⁻ f(x) usando x².', '1', 'Troque x por 1 em x².', 'Pela esquerda vale x², que tende a 1.'),
      step('Calcule lim x→1⁺ f(x) usando 3 − x.', '2', 'Troque x por 1 em 3 − x.', 'Pela direita vale 3 − x, que tende a 2.'),
      step('O limite bilateral existe?', 'Não', 'Compare 1 com 2.', 'Os lados são diferentes.', ['Sim', 'Não'])
    ]),
    task('Lados que concordam', 'f(x) = 2x + 1 se x < 3;   f(x) = 10 − x se x ≥ 3.   lim x→3 f(x) = ?', '7', 'Calcule 2·3 + 1 e 10 − 3.', 'Esquerda: 7. Direita: 7. O limite vale 7.'),
    paper('No papel: duas fórmulas', 'f(x) = x² − 1 se x < 2;   f(x) = 5 − x se x ≥ 2.   lim x→2 f(x) = ?', '3', 'Calcule os dois lados separadamente.', 'Esquerda: 4 − 1 = 3. Direita: 5 − 2 = 3. O limite é 3.'),
    paper('No papel: o lado que importa', 'f(x) = x + 3 se x < 0;   f(x) = 3 − x se x ≥ 0.   lim x→0 f(x) = ?', '3', 'Os dois lados dão o mesmo número?', 'Esquerda: 3. Direita: 3. O limite é 3.')
  ]),
  phase('Desafio da unidade', [
    task('Lateral e conclusão', 'f(x) = 4 − x se x < 1;   f(x) = x² + 2 se x ≥ 1.   lim x→1 f(x) = ?', '3', 'Calcule 4 − 1 e 1² + 2.', 'Esquerda: 3. Direita: 3. O limite vale 3.'),
    task('Quando não existe (digitando)', 'lim x→−1⁻ f(x) = 7   |   lim x→−1⁺ f(x) = −7.   Escreva o que acontece com lim x→−1 f(x).', NAO, 'Compare os dois lados.', 'Lados diferentes: o limite bilateral não existe.'),
    guided('Duas fórmulas, um alvo', 'f(x) = x² − 3 se x < 2;   f(x) = 2x − 3 se x ≥ 2', [
      step('Limite pela esquerda (use x² − 3).', '1', '2² − 3.', 'Pela esquerda dá 4 − 3 = 1.'),
      step('Limite pela direita (use 2x − 3).', '1', '2·2 − 3.', 'Pela direita dá 4 − 3 = 1.'),
      step('Qual é lim x→2 f(x)?', '1', 'Os lados coincidem.', 'O limite vale 1.')
    ]),
    paper('Sinal do lado direito', 'lim x→2⁺ |x − 2| / (x − 2)', '1', 'Para x > 2, x − 2 é positivo.', '|x − 2| = x − 2 quando x > 2, então o quociente vale 1.'),
    paper('Sinal do lado esquerdo', 'lim x→2⁻ |x − 2| / (x − 2)', '-1', 'Para x < 2, x − 2 é negativo.', '|x − 2| = −(x − 2), então o quociente vale −1.'),
    task('Tabela misturada', 'x → 1:  0,9 → 2,7;  0,99 → 2,97;  1,01 → 3,03;  1,1 → 3,3.   lim x→1 f(x) = ?', '3', 'Veja os dois lados.', 'Dos dois lados os valores caminham para 3.'),
    task('Valor isolado', 'f(x) = 5 para todo x ≠ 3, e f(3) = 0.   lim x→3 f(x) = ?', '5', 'O valor em x = 3 não importa.', 'Perto de 3, f vale 5. O limite é 5.')
  ], {boss: true})
]),

unit('Propriedades dos limites', 'Calcule limites combinando limites que você já conhece', [
  phase('Substituição direta', [
    pill('Quando é só substituir', [
      'Polinômios são “bem comportados”: sem buracos, sem saltos. Para eles, o limite em a é simplesmente o valor em a.',
      'Regra de ouro: tente SEMPRE substituir primeiro. Se der um número, acabou.',
      'Se der 0/0, calma: aí entram as técnicas das próximas unidades.'
    ], 'lim x→a P(x) = P(a)   (P polinômio)'),
    task('Comece pelo valor de x', 'lim x→2 (3x + 1).   Qual valor você coloca no lugar de x?', '2', 'A seta indica o valor de que x se aproxima.', 'Aqui x se aproxima de 2.', ['1', '2', '3']),
    task('Faça a conta', 'lim x→2 (3x + 1)', '7', 'Multiplique 3 por 2 antes de somar.', 'O polinômio é contínuo. Substituindo, 3·2 + 1 = 7.'),
    guided('Substituição passo a passo', 'lim x→3 (2x² − 5x + 1)', [
      step('Qual valor entra no lugar de x?', '3', 'Olhe para o que está depois da seta.', 'x vai para 3.'),
      step('Calcule 2x² com x = 3.', '18', '3² = 9.', '2·9 = 18.'),
      step('Calcule 5x com x = 3.', '15', '5·3.', '5·3 = 15.'),
      step('Agora 18 − 15 + 1 = ?', '4', 'Faça a soma com cuidado nos sinais.', '18 − 15 + 1 = 4.')
    ]),
    paper('Teste no papel', 'lim x→−2 (x² − 3x + 1)', '11', 'Use parênteses ao substituir o número negativo.', '(−2)² − 3(−2) + 1 = 4 + 6 + 1 = 11.'),
    task('Cubo e sinal', 'lim x→−1 (x³ + 2x)', '-3', 'Cuidado: (−1)³ = −1.', '(−1) + 2(−1) = −3.'),
    paper('Mais uma', 'lim x→2 (x³ − 3x² + x)', '-2', 'Calcule 8 − 12 + 2.', '8 − 12 + 2 = −2.'),
    paper('Coeficientes diferentes', 'lim x→−3 (2x² + x − 4)', '11', '2·9 + (−3) − 4.', '18 − 3 − 4 = 11.')
  ]),
  phase('Constante, x e soma', [
    pill('Os tijolos básicos', [
      'Duas regras super simples: o limite de uma constante é a própria constante, e lim x→a x = a.',
      'Intuição: uma constante não se mexe, e x “chega perto” de a por definição.',
      'Soma e diferença: o limite de uma soma é a soma dos limites. Se f chega perto de 4 e g de −1, f + g chega perto de 3.'
    ], 'lim c = c     lim x→a x = a     lim (f ± g) = lim f ± lim g'),
    task('Limite de constante', 'lim x→5 7', '7', 'A constante não depende de x.', 'Uma constante é sempre ela mesma.'),
    task('Limite de x', 'lim x→−3 x', '-3', 'x chega perto do alvo.', 'lim x→a x = a, então vale −3.'),
    task('Soma de limites', 'lim f = 4,  lim g = −1.   lim (f + g) = ?', '3', 'Some os limites.', '4 + (−1) = 3.'),
    task('Diferença de limites', 'lim f = 4,  lim g = −1.   lim (f − g) = ?', '5', 'Cuidado com o sinal de menos.', '4 − (−1) = 5.'),
    guided('Três funções', 'lim f = 6,  lim g = −2,  lim h = 5.   Calcule lim (f + g − h).', [
      step('Quanto vale lim (f + g)?', '4', '6 + (−2).', 'Soma dos limites: 4.'),
      step('Agora subtraia lim h: 4 − 5 = ?', '-1', 'Faça 4 − 5.', 'lim (f + g − h) = −1.')
    ]),
    paper('Soma no papel', 'lim f = −3,  lim g = −5.   lim (f + g) = ?', '-8', 'Some os dois limites.', '−3 + (−5) = −8.')
  ]),
  phase('Constante fora e produto', [
    pill('Multiplicando limites', [
      'Constante multiplicando: ela “sai” do limite. lim k·f = k · lim f.',
      'Produto: lim f·g = lim f · lim g. Intuição: se f chega perto de 3 e g perto de 5, o produto chega perto de 15.',
      'Essas duas regras, com a soma, resolvem a maioria dos polinômios.'
    ], 'lim k·f = k · lim f     lim f·g = lim f · lim g'),
    task('Constante sai', 'lim f = 3.   lim 5f = ?', '15', 'Multiplique 5 por 3.', '5·3 = 15.'),
    task('Produto de limites', 'lim f = −2,  lim g = 6.   lim f·g = ?', '-12', 'Multiplique os limites.', '(−2)·6 = −12.'),
    task('Combinando', 'lim f = 1,  lim g = −4.   lim (2f + 3g) = ?', '-10', 'Constante sai, depois some.', '2·1 + 3·(−4) = 2 − 12 = −10.'),
    guided('Produto em ação', 'lim x→2 x²(x + 1)', [
      step('Quanto vale lim x→2 x²? (use o produto x·x)', '4', 'lim x · lim x = 2·2.', 'x² tende a 4.'),
      step('Quanto vale lim x→2 (x + 1)?', '3', '2 + 1.', 'Tende a 3.'),
      step('Multiplique os dois limites.', '12', '4·3.', 'O limite é 12.')
    ]),
    task('Produto de uma função com ela mesma', 'lim f = 5.   lim f·f = ?', '25', 'Use o produto.', '5·5 = 25.'),
    paper('Combinação no papel', 'lim f = −1,  lim g = 4,  lim h = 2.   lim (3f − g·h) = ?', '-11', 'Calcule g·h primeiro.', '3·(−1) − 4·2 = −3 − 8 = −11.'),
    paper('Produto de polinômios', 'lim x→3 [2x · (x − 1)]', '12', 'Calcule cada limite e multiplique.', '6 · 2 = 12.')
  ]),
  phase('Quociente e o cuidado com o zero', [
    pill('Dividindo limites', [
      'Quociente: lim f/g = lim f / lim g, MAS só se lim g ≠ 0.',
      'Se o denominador tende a zero, a propriedade não vale. Pode dar 0/0, ou um número sobre zero. Aí é preciso outra técnica.',
      'Macete: antes de dividir, olhe o denominador!'
    ], 'lim f/g = (lim f)/(lim g)    só se lim g ≠ 0'),
    task('Quociente de limites', 'lim f(x) = 6,  lim g(x) = 4.   lim f(x)/g(x) = ?', '3/2|1,5', 'O limite do denominador é diferente de zero.', 'Você pode dividir os limites: 6/4 = 3/2.'),
    task('Posso usar a propriedade?', 'lim f = 5,  lim g = 0.   Dá para usar lim f/g = lim f / lim g?', 'Não', 'O denominador tende a zero.', 'Com lim g = 0 a propriedade do quociente não vale.', ['Sim', 'Não']),
    task('Substitua', 'lim x→1 (x² + 2)/(x + 3)', '3/4', 'Confira antes se o denominador zera.', 'O denominador vale 4. Substituindo: 3/4.'),
    guided('Quociente em ação', 'lim x→2 (x² + 1)/(x − 1)', [
      step('Quanto vale lim x→2 (x − 1)?', '1', '2 − 1.', 'O denominador tende a 1.'),
      step('Esse limite é diferente de zero?', 'Sim', 'Compare 1 com 0.', 'Sim, a propriedade vale.', ['Sim', 'Não']),
      step('Quanto vale lim x→2 (x² + 1)?', '5', '4 + 1.', 'O numerador tende a 5.'),
      step('Quanto vale o quociente dos limites?', '5', '5 / 1.', 'O limite é 5.')
    ]),
    task('Zero em cima não incomoda', 'lim x→3 (x² − 9)/(x + 3)', '0', 'O denominador vale 6.', 'O denominador tende a 6 ≠ 0. O numerador tende a 0. Resultado: 0.'),
    task('Reconheça o problema', 'lim x→3 (x + 1)/(x − 3).   O que acontece ao substituir?', 'Dá 4/0 (denominador zero)', 'Calcule 3 + 1 e 3 − 3.', 'Dá 4/0: o denominador zera, então a propriedade do quociente não se aplica.', ['Dá 0/0', 'Dá 4/0 (denominador zero)', 'Dá 4']),
    paper('Quociente no papel', 'lim x→−1 (x³ + 3)/(x² + 1)', '1', 'Calcule numerador e denominador.', '(−1 + 3)/(1 + 1) = 2/2 = 1.'),
    paper('Mais uma divisão', 'lim x→4 (3x − 2)/(x + 1)', '2', 'Substitua x = 4.', '10/5 = 2.')
  ]),
  phase('Potências e raízes', [
    pill('Potência e raiz', [
      'Potência: lim f^n = (lim f)^n. Se f chega perto de 3, f² chega perto de 9.',
      'Raiz: lim √f = √(lim f), desde que o valor dentro da raiz não seja negativo.',
      'Intuição: potência e raiz são só multiplicações e “inversas”, e o limite respeita as multiplicações.'
    ], 'lim f^n = (lim f)^n     lim √f = √(lim f)'),
    task('Potência de limite', 'lim f = 3.   lim f² = ?', '9', 'Eleve o limite ao quadrado.', '3² = 9.'),
    task('Cubo e sinal', 'lim f = −2.   lim f³ = ?', '-8', '(−2)³.', '(−2)³ = −8.'),
    task('Raiz simples', 'lim x→4 √(x + 5)', '3', 'Calcule o que está dentro da raiz.', '√(4 + 5) = √9 = 3.'),
    task('Raiz de polinômio', 'lim x→2 √(x³ + 1)', '3', 'Dentro da raiz: 8 + 1.', '√9 = 3.'),
    guided('Raiz mais potência', 'lim x→3 (√(x + 6) + x²)', [
      step('Quanto vale lim √(x + 6)?', '3', 'x + 6 vira 9.', '√9 = 3.'),
      step('Quanto vale lim x²?', '9', '3².', 'x² tende a 9.'),
      step('Some os dois limites.', '12', '3 + 9.', 'O limite é 12.')
    ]),
    paper('Potência de polinômio', 'lim x→1 (2x + 1)³', '27', 'Calcule 2x + 1 primeiro.', '(2·1 + 1)³ = 3³ = 27.'),
    paper('Raiz de soma', 'lim x→−3 √(x² + 7)', '4', 'Dentro da raiz: 9 + 7.', '√16 = 4.'),
    paper('Potência cúbica', 'lim x→−1 (x + 3)³', '8', '(−1 + 3) = 2.', '2³ = 8.')
  ]),
  phase('Cartão de memória do Rubi', [
    pill('Cartão de memória', [
      'Hora de fixar. Estas são as propriedades que você vai usar o tempo todo (assumindo que os limites existem):',
      'Soma/diferença: lim (f ± g) = lim f ± lim g.   Constante: lim k·f = k·lim f.   Produto: lim f·g = lim f · lim g.',
      'Quociente: lim f/g = lim f / lim g (se lim g ≠ 0).   Potência: lim f^n = (lim f)^n.   Raiz: lim √f = √(lim f).',
      'Truque para lembrar: o limite “entra” nas operações. Só tem cuidado em dois lugares: divisão por zero e raiz de negativo.'
    ]),
    task('Qual propriedade?', 'lim [f(x) + g(x)] = lim f(x) + lim g(x)', 'Soma', 'Pense na operação do meio.', 'É a propriedade da soma.', ['Soma', 'Produto', 'Quociente']),
    task('Qual propriedade?', 'lim [k · f(x)] = k · lim f(x)', 'Constante sai do limite', 'O que acontece com o k?', 'A constante pode sair do limite.', ['Constante sai do limite', 'Soma', 'Raiz']),
    task('Verdadeiro ou falso?', 'lim f/g = lim f / lim g sempre que lim f e lim g existem.', 'Falso', 'Existe uma condição sobre lim g.', 'É falso: precisa de lim g ≠ 0.', ['Verdadeiro', 'Falso']),
    guided('Propriedades combinadas', 'lim f = 2,  lim g = 3,  lim h = −1.   Calcule lim (f² + g)/h.', [
      step('Quanto vale lim f²?', '4', '2².', 'Potência: 4.'),
      step('Quanto vale lim (f² + g)?', '7', '4 + 3.', 'Soma: 7.'),
      step('O denominador tende a algo diferente de zero?', 'Sim', 'lim h = −1.', 'Sim, −1 ≠ 0.', ['Sim', 'Não']),
      step('Calcule o quociente.', '-7', '7 / (−1).', 'O limite é −7.')
    ]),
    task('Raiz e constante', 'lim f = 4.   lim (√f + 3f) = ?', '14', '√4 = 2 e 3·4 = 12.', '2 + 12 = 14.'),
    paper('Potências combinadas', 'lim f = 2,  lim g = −3.   lim (f³ − g²) = ?', '-1', 'f³ = 8 e g² = 9.', '8 − 9 = −1.'),
    paper('Tudo junto', 'lim f = 9,  lim g = −2.   lim (2f − 3g)/(g + 3) = ?', '24', 'Cuide do denominador: −2 + 3.', 'Numerador: 18 + 6 = 24. Denominador: 1. Resultado: 24.')
  ]),
  phase('Propriedades com funções por partes', [
    pill('Cada lado com a sua conta', [
      'As propriedades valem também para limites laterais.',
      'Em funções por partes, calcule cada lado com a sua fórmula e só depois aplique as propriedades ao limite bilateral.',
      'Se os lados não concordam, as propriedades não têm sobre o que trabalhar: o limite não existe.'
    ]),
    guided('Por partes + potência', 'f(x) = x² + 1 se x < 1;   f(x) = 3x − 1 se x ≥ 1.   Calcule lim x→1 [f(x)]².', [
      step('Limite pela esquerda (x² + 1).', '2', '1² + 1.', 'Esquerda: 2.'),
      step('Limite pela direita (3x − 1).', '2', '3·1 − 1.', 'Direita: 2.'),
      step('Quanto vale lim x→1 f(x)?', '2', 'Os lados concordam.', 'O limite é 2.'),
      step('Agora lim [f(x)]² = ?', '4', '2².', 'Potência: 4.')
    ]),
    task('Constante fora', 'f(x) = 2x se x < 3;   f(x) = x + 3 se x ≥ 3.   lim x→3 3f(x) = ?', '18', 'Primeiro lim f.', 'Esquerda: 6. Direita: 6. Logo lim f = 6 e 3·6 = 18.'),
    task('Quando não existe', 'f(x) = x + 1 se x < 0;   f(x) = 2x + 3 se x ≥ 0.   lim x→0 f(x) = ?', NAO, 'Calcule 0 + 1 e 2·0 + 3.', 'Esquerda: 1. Direita: 3. O limite não existe.', ['1', '3', 'Não existe']),
    task('Só o lado direito', 'f(x) = x + 1 se x < 0;   f(x) = 2x + 3 se x ≥ 0.   lim x→0⁺ [f(x)]² = ?', '9', 'Pela direita, f tende a 3.', '3² = 9.'),
    paper('Por partes no papel', 'f(x) = 3x − 1 se x ≤ 2;   f(x) = x² + 1 se x > 2.   lim x→2 f(x) = ?', '5', 'Calcule os dois lados.', 'Esquerda: 5. Direita: 5. O limite é 5.'),
    paper('Soma de laterais', 'f(x) = x² se x < 1;   f(x) = 2 − x se x ≥ 1.   lim x→1⁻ f(x) + lim x→1⁺ f(x) = ?', '2', 'Calcule cada lado.', 'Esquerda: 1. Direita: 1. A soma vale 2.')
  ]),
  phase('Chefão das propriedades', [
    paper('Quociente de polinômios', 'lim x→−2 (x³ + 4x² − x)/(x² + 1)', '2', 'Substitua em cada parte.', 'Numerador: −8 + 16 + 2 = 10. Denominador: 5. Resultado: 2.'),
    paper('Raiz no quociente', 'lim x→5 √(x² − 9)/(x − 1)', '1', 'Dentro da raiz: 25 − 9.', '√16/4 = 1.'),
    task('Funções abstratas', 'lim f = −3,  lim g = 2.   lim (f² − g³)/(f·g) = ?', '-1/6', 'Calcule o numerador e o denominador separadamente.', 'Numerador: 9 − 8 = 1. Denominador: −6. Resultado: −1/6.'),
    paper('Produto e potência', 'lim x→1 (x + 2)²(x − 3)', '-18', '(1+2)² = 9 e (1−3) = −2.', '9·(−2) = −18.'),
    guided('Lateral + quociente', 'f(x) = x² se x < 1;   f(x) = 2x − 1 se x ≥ 1.   Calcule lim x→1 (f(x) + 3)/(f(x) + 1).', [
      step('Quanto vale lim x→1 f(x)?', '1', 'Esquerda: 1² e direita: 2·1 − 1.', 'Os dois lados dão 1.'),
      step('Quanto vale lim (f + 3)?', '4', '1 + 3.', 'Numerador: 4.'),
      step('Quanto vale lim (f + 1)?', '2', '1 + 1.', 'Denominador: 2 (≠ 0).'),
      step('O quociente é?', '2', '4/2.', 'O limite é 2.')
    ]),
    task('Reconheça o problema', 'lim x→2 (x² + 1)/(x² − 4).   O que acontece ao substituir?', 'Dá 5/0: a propriedade do quociente não vale', 'Calcule 4 − 4.', 'O denominador tende a 0 e o numerador a 5: a propriedade do quociente não se aplica.', ['Dá 5/0: a propriedade do quociente não vale', 'Dá 5', 'Dá 0/0']),
    paper('Cubo de um polinômio', 'lim x→−1 (2x − 1)³', '-27', '2(−1) − 1 = −3.', '(−3)³ = −27.'),
    paper('Raiz com soma', 'lim x→0 (√(x + 16) + 3x)/(x + 2)', '2', 'No limite, √16 = 4.', 'Numerador: 4. Denominador: 2. Resultado: 2.')
  ], {boss: true})
])
);
