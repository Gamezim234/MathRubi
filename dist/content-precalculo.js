'use strict';
// Reforço de matemática básica disponível na disciplina Pré-cálculo.
// Cada fase introduz uma ideia, constrói um exemplo e retira o apoio gradualmente.
{
const exercise = (row, i, last) => (last ? paper : task)(
  last ? 'Sua vez: resolva no papel' : ['Primeiro, reconheça','Aplique a ideia','Mude o exemplo','Confira o raciocínio'][i % 4],
  row[0], row[1], row[2], row[3], row[4]);
const foundationLesson = (name, lines, model, steps, practice) => phase(name, [
  pill(name + ' · conversa com o Rubi', lines),
  guided('Vamos construir um exemplo', model, steps),
  ...practice.map((row, i) => exercise(row,i,i === practice.length-1))
]);
COURSE.precalculoNumeros.units.push(unit('Números reais', 'Da ideia de quantidade às operações e à leitura da reta real. Comece do zero e construa cada regra.', [
foundationLesson('Contar: os números naturais', [
  'Vamos começar sem pressa. Um número pode indicar quantos objetos há: 0 objetos, 1 objeto, 2 objetos… Esses são os números naturais.',
  'Neste curso usamos N = {0, 1, 2, 3, …}. Alguns livros começam N em 1; por isso sempre vale verificar a convenção. Zero representa ausência de quantidade.',
  'Somar naturais junta quantidades. O sucessor é o número que vem logo depois: basta somar 1. Não existe um maior natural: sempre podemos somar mais 1.',
  'A contagem não resolve toda situação. Se você tem 2 e precisa retirar 5, os naturais já não bastam. Isso vai nos levar aos inteiros na próxima fase.'
], 'Há 3 livros; chegam mais 2.', [
  step('Qual é a quantidade inicial?', '3','Leia quantos livros havia antes.','A quantidade inicial é 3.'),
  step('Quantos livros chegam?', '2','Leia a nova quantidade acrescentada.','Vamos juntar 2 aos 3 que já tínhamos.'),
  step('Qual é a quantidade total?', '5','Calcule 3 + 2.','Somar representa juntar: 3 + 2 = 5.')
], [
  ['Qual número representa uma caixa vazia?', '0','Vazia significa nenhum objeto.','Zero representa a ausência de objetos.'],
  ['Qual é o sucessor de 8?', '9','Some 1 ao número 8.','O sucessor de 8 é 8 + 1 = 9.'],
  ['5 objetos + 4 objetos = ?', '9','Junte as duas quantidades.','5 + 4 = 9.'],
  ['Existe um maior número natural?', 'Não','Ao candidato a maior número podemos somar 1.','Todo natural tem sucessor, então não há um maior natural.',['Sim','Não']],
  ['Uma turma tinha 12 estudantes e recebeu mais 7. Quantos há agora?', '19','Some a quantidade inicial à que chegou.','12 + 7 = 19 estudantes.']
]),
foundationLesson('Inteiros: negativos, zero e positivos', [
  'Na temperatura, no saldo de uma conta e em posições abaixo de uma referência aparecem números negativos. O sinal − indica o lado oposto ao positivo.',
  'Os inteiros são Z = {…, −3, −2, −1, 0, 1, 2, 3, …}. Eles incluem todos os naturais e seus negativos.',
  'O oposto de um número tem o mesmo afastamento do zero e sinal contrário. O oposto de 4 é −4; o oposto de −4 é 4. O oposto de zero é zero.',
  'Zero não é positivo nem negativo. Ser inteiro não significa ser positivo: −7 também é um inteiro.'
], 'Um elevador está no térreo (0) e desce 3 andares.', [
  step('Qual número representa o térreo?', '0','A referência foi definida no enunciado.','O térreo é o nível zero.'),
  step('A posição abaixo do térreo usa sinal positivo ou negativo?', 'Negativo','Descer fica abaixo da referência.','Usamos negativos para os andares abaixo do zero.',['Positivo','Negativo']),
  step('Qual número indica a posição final?', '-3','São 3 andares abaixo de zero.','A posição é −3.')
], [
  ['Escreva o oposto de 7.', '-7','Troque o sinal.','7 e −7 estão em lados opostos do zero.'],
  ['Escreva o oposto de −9.', '9','O oposto troca negativo por positivo.','O oposto de −9 é 9.'],
  ['Zero é positivo, negativo ou nenhum dos dois?', 'Nenhum dos dois','Zero é a referência entre positivos e negativos.','Zero não tem sinal positivo nem negativo.',['Positivo','Negativo','Nenhum dos dois']],
  ['Qual é o oposto de 0?', '0','O zero permanece no mesmo lugar ao refletir a reta.','O oposto de zero é zero.'],
  ['Uma temperatura está 6 graus abaixo de zero. Escreva esse número.', '-6','Abaixo de zero usa o sinal −.','A temperatura é −6 graus.']
]),
foundationLesson('Frações: partes iguais e números racionais', [
  'Quando uma unidade é dividida em partes iguais, uma fração descreve quantas partes foram tomadas. Em 3/4, cada parte tem tamanho 1/4 e tomamos três.',
  'O denominador fica embaixo e diz em quantas partes iguais a unidade foi dividida. O numerador fica em cima e conta quantas dessas partes usamos.',
  'Um racional é qualquer número que pode ser escrito como a/b, com a e b inteiros e b diferente de zero. A fração também representa a divisão a ÷ b.',
  'Inteiros também são racionais: 5 = 5/1. Frações podem ser negativas ou maiores que 1. Divisão por zero não define um número real.'
], 'Uma barra foi dividida em 5 partes iguais; você pegou 2.', [
  step('Quantas partes iguais formam a barra inteira?', '5','Leia a divisão da unidade.','O denominador é 5.'),
  step('Quantas partes você pegou?', '2','Essa quantidade será o numerador.','O numerador é 2.'),
  step('Qual fração da barra você pegou?', '2/5','Escreva numerador/denominador.','A fração é 2/5.')
], [
  ['Qual é o denominador de 7/9?', '9','É o número abaixo da barra.','O denominador é 9.'],
  ['Uma unidade tem 8 partes iguais. Tomamos 3. Escreva a fração.', '3/8','As partes tomadas ficam em cima.','Tomamos 3 das 8 partes: 3/8.'],
  ['Escreva 6 como fração com denominador 1.', '6/1','Dividir por 1 não altera o número.','6 = 6/1, então 6 é racional.'],
  ['Qual é maior que 1?', '5/3','Uma unidade inteira seria 3/3.','5/3 tem mais de três terços e supera 1.',['1/3','2/3','5/3']],
  ['Três barras são repartidas igualmente entre 4 pessoas. Quanto cada uma recebe?', '3/4','Divida a quantidade de barras pela de pessoas.','Cada pessoa recebe 3 ÷ 4 = 3/4 de barra.']
]),
foundationLesson('Irracionais e a família dos reais', [
  'Nem todo número pode ser escrito como uma fração de inteiros. √2 e π são exemplos de números irracionais.',
  'A representação decimal de um irracional é infinita e não tem um bloco que se repete para sempre. Um decimal infinito periódico, como 0,333…, é racional.',
  'Os reais R reúnem racionais e irracionais. Dentro deles temos N contido em Z, Z contido em Q e Q contido em R. Irracionais são os reais que não estão em Q.',
  'Atenção: um símbolo de raiz não garante que o número seja irracional. √9 = 3 é natural. E o número 3,14 é racional; ele é uma aproximação de π, não o próprio π.'
], 'Classifique √16 pelo menor conjunto entre N, Z, Q e R.', [
  step('Qual número não negativo ao quadrado dá 16?', '4','4 · 4 = 16.','A raiz quadrada principal de 16 é 4.'),
  step('Esse resultado pertence aos naturais?', 'Sim','4 aparece na contagem.','4 está em N e também nos conjuntos maiores.',['Sim','Não']),
  step('Qual é o menor dos conjuntos citados que contém esse número?', 'N','Naturais estão contidos nos outros três.','Entre N, Z, Q e R, o menor que contém 4 é N.',['N','Z','Q','R'])
], [
  ['√2 é racional ou irracional?', 'Irracional','Ele não é razão de dois inteiros.','√2 é irracional.',['Racional','Irracional']],
  ['√25 é racional ou irracional?', 'Racional','Primeiro calcule a raiz.','√25 = 5 = 5/1, um racional.',['Racional','Irracional']],
  ['Qual é o menor conjunto entre N, Z, Q e R que contém −3?', 'Z','−3 é inteiro, mas não natural na nossa convenção.','−3 pertence a Z, Q e R; entre eles, Z é o menor.',['N','Z','Q','R']],
  ['3,14 é igual a π ou é apenas uma aproximação?', 'Aproximação','π tem infinitas casas não periódicas.','3,14 = 314/100 é racional e apenas aproxima π.',['Igual','Aproximação']],
  ['Escreva o valor de √49 e diga-o como número.', '7','Procure o número não negativo cujo quadrado é 49.','√49 = 7: a raiz aqui é um número natural.']
]),
foundationLesson('A reta real e a comparação', [
  'Na reta real, escolhemos zero, uma unidade de distância e uma direção positiva, geralmente para a direita. Cada número real corresponde a um ponto.',
  'Quanto mais à direita, maior o número. Por isso −2 é maior que −5: −2 está mais perto de zero, mas ainda à esquerda dele.',
  'Os símbolos < e > significam menor que e maior que. Em 2 < 7, a abertura fica voltada para o maior número.',
  'Para comparar decimais, alinhe as casas e complete com zeros se precisar: 0,5 = 0,50 > 0,45. Entre dois reais distintos sempre há outro real; a reta não tem lacunas.'
], 'Compare −4 e −1.', [
  step('Qual dos dois fica mais à esquerda?', '-4','Na parte negativa, maior distância de zero significa menor valor.','−4 fica mais à esquerda.'),
  step('Qual é o maior dos dois?', '-1','Maior significa mais à direita.','−1 está à direita de −4.'),
  step('Complete: −4 ___ −1.', '<','A abertura fica voltada para −1.','Temos −4 < −1.',['<','>','='])
], [
  ['Qual é o maior: −8 ou −3?', '-3','Pense na posição na reta.','−3 está à direita de −8.'],
  ['Qual é o menor: 0,42 ou 0,5?', '0,42','Compare 0,42 com 0,50.','42 centésimos são menos que 50 centésimos.'],
  ['Complete: −2 ___ 0.', '<','Números negativos ficam à esquerda de zero.','−2 < 0.',['<','>','=']],
  ['Escreva um número exatamente no meio entre 2 e 4.', '3','Calcule a média: (2 + 4)/2.','O ponto médio é 3.'],
  ['Escreva o maior número entre −0,7; −0,2; −1.', '-0,2','Entre negativos, o mais à direita é o maior.','−0,2 está mais à direita do que −0,7 e −1.']
]),
foundationLesson('Somar números com sinais', [
  'Somar um positivo move para a direita na reta. Somar um negativo move para a esquerda. O sinal faz parte do número que está sendo somado.',
  'Se os dois números têm o mesmo sinal, somamos suas quantidades e conservamos o sinal: −3 + (−2) = −5.',
  'Se têm sinais diferentes, comparamos as quantidades sem os sinais, subtraímos a menor da maior e ficamos com o sinal da maior quantidade: −7 + 4 = −3.',
  'Números opostos se anulam: 6 + (−6) = 0. Não use a regra de sinais da multiplicação para fazer somas.'
], 'Calcule −5 + 8 usando a reta.', [
  step('Em que número começamos?', '-5','É a primeira parcela.','Começamos em −5.'),
  step('De −5 até 0, usamos quantos dos 8 passos para a direita?', '5','Conte a distância de −5 a 0.','Usamos 5 passos e ainda sobram 3.'),
  step('Qual é o resultado após os 3 passos restantes?', '3','Saindo de zero, avance 3.','−5 + 8 = 3.')
], [
  ['−4 + (−6) = ?', '-10','Os sinais são iguais: some 4 e 6 e conserve −.','−4 + (−6) = −10.'],
  ['−9 + 5 = ?', '-4','Compare 9 e 5.','A diferença é 4, e a maior quantidade era negativa.'],
  ['7 + (−7) = ?', '0','São números opostos.','Uma quantidade e seu oposto somam zero.'],
  ['3 + (−8) = ?', '-5','Mova 8 passos para a esquerda a partir de 3.','3 − 8 = −5.'],
  ['Um saldo é −12 reais e entra um depósito de 20 reais. Qual é o novo saldo?', '8','O depósito soma +20 ao saldo −12.','−12 + 20 = 8 reais.']
]),
foundationLesson('Subtrair e retirar parênteses', [
  'Subtrair um número é somar o oposto dele: a − b = a + (−b). Essa regra também vale quando b já é negativo.',
  'Assim, 4 − (−3) = 4 + 3 = 7. Retirar uma dívida pode aumentar um saldo: esse é um jeito de interpretar subtrair um negativo.',
  'Um sinal de menos antes de parênteses troca o sinal de cada termo: −(2 − 5) = −2 + 5. Um sinal de mais preserva os sinais.',
  'Não decore apenas “menos com menos dá mais”: primeiro identifique se você está subtraindo, somando ou multiplicando.'
], 'Calcule −2 − (−6).', [
  step('Qual é o oposto de −6?', '6','Troque o sinal de −6.','O oposto de −6 é +6.'),
  step('Ao trocar a subtração por soma do oposto, fica −2 + qual número?', '6','Use o oposto que acabou de encontrar.','−2 − (−6) = −2 + 6.'),
  step('Qual é o resultado?', '4','Compare as quantidades 6 e 2.','−2 + 6 = 4.')
], [
  ['5 − 9 = ?', '-4','Subtraia 9 de 5.','5 + (−9) = −4.'],
  ['3 − (−4) = ?', '7','Subtraia somando o oposto de −4.','3 − (−4) = 3 + 4 = 7.'],
  ['−7 − 2 = ?', '-9','Subtrair um positivo move para a esquerda.','−7 + (−2) = −9.'],
  ['−(4 − 9) = ?', '5','Resolva o parêntese e depois tome o oposto.','4 − 9 = −5; o oposto de −5 é 5.'],
  ['2 − (−3 + 8) = ?', '-3','Calcule o parêntese antes.','−3 + 8 = 5; depois 2 − 5 = −3.']
]),
foundationLesson('Multiplicar, dividir e lidar com zero', [
  'Multiplicar por um inteiro positivo pode ser visto como repetir uma soma. Por exemplo, 3 · (−2) = −2 − 2 − 2 = −6.',
  'Na multiplicação e na divisão de números não nulos, sinais iguais dão positivo e sinais diferentes dão negativo. Isso é diferente das regras de adição.',
  'Multiplicar qualquer real por zero dá zero. Dividir zero por um número não nulo também dá zero.',
  'Não dividimos por zero: 5/0 não tem resultado real, e 0/0 não define um valor único. Não escreva infinito como resultado dessas divisões.'
], 'Calcule (−18) ÷ (−3).', [
  step('Dividindo as quantidades sem os sinais, quanto é 18 ÷ 3?', '6','Qual número multiplicado por 3 dá 18?','18 ÷ 3 = 6.'),
  step('Os sinais da divisão são iguais ou diferentes?', 'Iguais','Os dois números são negativos.','Sinais iguais dão resultado positivo.',['Iguais','Diferentes']),
  step('Qual é o resultado final?', '6','A quantidade é 6 e o sinal é positivo.','(−18) ÷ (−3) = 6.')
], [
  ['(−4) · 3 = ?', '-12','Sinais diferentes dão negativo.','4 · 3 = 12, com sinal negativo.'],
  ['(−5) · (−2) = ?', '10','Sinais iguais dão positivo.','O produto é +10.'],
  ['0 ÷ 7 = ?', '0','O divisor não é zero.','0 dividido por 7 é 0.'],
  ['5 ÷ 0 tem resultado real?', 'Não','Não existe real que multiplicado por 0 dê 5.','Divisão por zero não é definida nos reais.',['Sim','Não']],
  ['(−24) ÷ 6 + 2 · (−3) = ?', '-10','Calcule a divisão e o produto antes de somar.','−24/6 = −4 e 2 · (−3) = −6; a soma é −10.']
]),
foundationLesson('Frações equivalentes e simplificação', [
  'Duas frações podem representar o mesmo número. Metade de uma barra é a mesma quantidade que duas partes de uma barra dividida em quatro: 1/2 = 2/4.',
  'Multiplicar ou dividir numerador e denominador pelo mesmo número não nulo preserva o valor da fração.',
  'Simplificar é dividir os dois por fatores comuns. A forma irredutível não tem mais fator inteiro comum maior que 1.',
  'O sinal negativo pode ficar na frente ou no numerador ou no denominador: −2/3 = 2/(−3). Se ambos forem negativos, a fração é positiva.'
], 'Simplifique 12/18.', [
  step('Qual é o maior divisor positivo comum de 12 e 18?', '6','Os dois são múltiplos de 6.','O máximo divisor comum é 6.'),
  step('Quanto fica o numerador 12 ÷ 6?', '2','Divida em cima pelo mesmo fator.','O numerador simplificado é 2.'),
  step('Escreva a fração após também dividir 18 por 6.', '2/3','18 ÷ 6 = 3.','12/18 = 2/3, agora sem fatores comuns maiores que 1.')
], [
  ['3/5 = ___/20. Digite o numerador que falta.', '12','O denominador foi multiplicado por 4.','Multiplicamos também o numerador por 4: 3 · 4 = 12.'],
  ['Simplifique 8/12.', '2/3','Divida os dois termos por 4.','8/12 = 2/3.'],
  ['Simplifique 15/25.', '3/5','Divida numerador e denominador por 5.','15/25 = 3/5.'],
  ['(−6)/(−9) = ? Escreva com denominador positivo.', '2/3','Os sinais se anulam; depois simplifique.','6/9 = 2/3.'],
  ['Uma receita usa 18/24 de litro. Escreva a mesma quantidade em forma irredutível.', '3/4','O maior divisor comum é 6.','18 ÷ 6 = 3 e 24 ÷ 6 = 4: são 3/4 de litro.']
]),
foundationLesson('Somar e subtrair frações', [
  'Só podemos contar partes diretamente quando elas têm o mesmo tamanho. Por isso, com denominadores iguais, somamos os numeradores e conservamos o denominador.',
  'Com denominadores diferentes, primeiro escrevemos frações equivalentes com um denominador comum. Usar o mínimo múltiplo comum costuma simplificar as contas.',
  'Por exemplo, 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Não somamos denominadores: isso mudaria o tamanho das partes.',
  'A subtração segue a mesma preparação. Depois de juntar ou retirar as partes, simplifique o resultado se houver fator comum.'
], 'Calcule 3/4 − 1/6.', [
  step('Qual é o mínimo múltiplo comum de 4 e 6?', '12','Liste os primeiros múltiplos de cada um.','O menor múltiplo positivo comum é 12.'),
  step('3/4 = ___/12. Qual é o numerador?', '9','Multiplique numerador e denominador por 3.','3/4 = 9/12.'),
  step('1/6 = ___/12. Qual é o numerador?', '2','Multiplique numerador e denominador por 2.','1/6 = 2/12.'),
  step('Qual é o resultado da subtração?', '7/12','Agora faça 9/12 − 2/12.','O resultado é (9 − 2)/12 = 7/12.')
], [
  ['2/7 + 3/7 = ?', '5/7','Os denominadores já são iguais.','(2 + 3)/7 = 5/7.'],
  ['1/2 + 1/4 = ?', '3/4','Escreva 1/2 como 2/4.','2/4 + 1/4 = 3/4.'],
  ['2/3 − 1/4 = ?', '5/12','Use denominador 12.','8/12 − 3/12 = 5/12.'],
  ['−1/2 + 1/6 = ?', '-1/3','Escreva −1/2 como −3/6.','−3/6 + 1/6 = −2/6 = −1/3.'],
  ['Um recipiente tem 5/6 de litro. São retirados 1/3 de litro. Quanto sobra?', '1/2','Escreva 1/3 como 2/6.','5/6 − 2/6 = 3/6 = 1/2 de litro.']
]),
foundationLesson('Multiplicar e dividir frações', [
  'Multiplicar por uma fração significa tomar uma parte de uma quantidade. Metade de 2/3 é 1/2 · 2/3 = 2/6 = 1/3.',
  'Multiplicamos numerador por numerador e denominador por denominador. Podemos simplificar fatores antes ou depois do produto.',
  'Dividir por uma fração não nula equivale a multiplicar por sua inversa: 2/3 ÷ 4/5 = 2/3 · 5/4. Invertemos apenas a fração pela qual dividimos.',
  'O inverso de a/b é b/a quando a e b são não nulos. Zero não tem inverso multiplicativo. Cancelamento só é válido para fatores, nunca para parcelas de uma soma.'
], 'Calcule 3/5 ÷ 2/7.', [
  step('Qual é o inverso da fração divisora 2/7?', '7/2','Troque numerador e denominador do divisor.','O inverso de 2/7 é 7/2.'),
  step('Ao multiplicar 3/5 por 7/2, qual é o numerador do produto antes de simplificar?', '21','Multiplique 3 por 7.','O numerador é 21.'),
  step('Qual é a fração resultante?', '21/10','O denominador é 5 · 2.','3/5 ÷ 2/7 = 21/10.')
], [
  ['2/3 · 3/5 = ?', '2/5','Multiplique e simplifique o fator 3.','6/15 = 2/5.'],
  ['3/4 ÷ 1/2 = ?', '3/2','Multiplique 3/4 por 2/1.','6/4 = 3/2.'],
  ['Qual é o inverso de −2/5?', '-5/2','O sinal negativo permanece.','(−2/5) · (−5/2) = 1.'],
  ['−1/3 · 6/5 = ?', '-2/5','Sinais diferentes; simplifique 6 por 3.','−6/15 = −2/5.'],
  ['Quantas porções de 1/4 de litro cabem em 3/2 de litro?', '6','Divida a quantidade total pelo tamanho de uma porção.','3/2 ÷ 1/4 = 3/2 · 4 = 6 porções.']
]),
foundationLesson('Decimais finitos e dízimas periódicas', [
  'Nos decimais, cada casa à direita da vírgula vale um décimo da anterior: décimos, centésimos, milésimos. Assim, 0,25 = 25/100 = 1/4.',
  'Um decimal finito é racional. Para escrevê-lo como fração, retire a vírgula do numerador e use 10, 100, 1000… conforme a quantidade de casas.',
  'Um decimal infinito periódico também é racional: 0,333… = 1/3. As reticências aqui significam que o algarismo 3 se repete para sempre.',
  'Cuidado com aproximações: 0,33 não é exatamente 1/3; é um decimal finito próximo. Nem toda sequência infinita de casas decimais é periódica.'
], 'Converta 0,125 em fração.', [
  step('Quantas casas há depois da vírgula?', '3','Conte 1, 2 e 5.','São três casas: milésimos.'),
  step('Qual potência de 10 será o denominador?', '1000','Uma, duas e três casas correspondem a 10, 100 e 1000.','0,125 = 125/1000.'),
  step('Simplifique 125/1000.', '1/8','Divida os dois por 125.','0,125 = 1/8.')
], [
  ['Escreva 0,75 como fração irredutível.', '3/4','75/100 pode ser simplificado por 25.','0,75 = 75/100 = 3/4.'],
  ['Escreva 3/5 em decimal.', '0,6','Divida 3 por 5 ou use décimos.','3/5 = 6/10 = 0,6.'],
  ['Escreva a fração de 0,777… (o 7 se repete para sempre).', '7/9','0,111… = 1/9; multiplique por 7.','Se x = 0,777…, então 10x − x = 7, logo x = 7/9.'],
  ['0,33 é exatamente igual a 1/3?', 'Não','0,33 termina; 1/3 possui infinitos algarismos 3.','0,33 = 33/100, diferente de 1/3.',['Sim','Não']],
  ['Uma medida é 1,25 metro. Escreva-a como fração irredutível.', '5/4','Comece por 125/100.','125/100 = 5/4 de metro.']
]),
foundationLesson('Potências: significado e parênteses', [
  'Uma potência com expoente inteiro positivo é um produto de fatores iguais: 2³ = 2 · 2 · 2 = 8. O 2 é a base; o 3 conta os fatores.',
  'Parênteses determinam a base. Em (−3)², a base é −3 e o produto é positivo. Em −3², a potência é calculada antes do sinal de menos: −(3²) = −9.',
  'Uma base negativa elevada a um expoente inteiro par dá positivo; com expoente inteiro ímpar dá negativo.',
  'Potência não é multiplicar a base pelo expoente. 4³ significa três fatores iguais a 4, não 4 · 3.'
], 'Compare (−2)⁴ com −2⁴.', [
  step('Quanto vale 2⁴?', '16','Multiplique 2 quatro vezes.','2 · 2 · 2 · 2 = 16.'),
  step('Quanto vale (−2)⁴?', '16','São quatro fatores negativos, uma quantidade par.','O resultado é positivo: 16.'),
  step('Quanto vale −2⁴, sem parênteses?', '-16','A potência vem antes do sinal de menos.','−2⁴ = −(2⁴) = −16.')
], [
  ['3³ = ?', '27','Multiplique 3 · 3 · 3.','3³ = 27.'],
  ['(−3)³ = ?', '-27','Três fatores negativos dão negativo.','(−3)³ = −27.'],
  ['−4² = ?', '-16','A base da potência é 4, sem o sinal externo.','−4² = −(4²) = −16.'],
  ['(2/3)² = ?', '4/9','Eleve o numerador e o denominador.','(2/3) · (2/3) = 4/9.'],
  ['Calcule (−2)³ + (−2)².', '-4','Calcule cada potência separadamente.','−8 + 4 = −4.']
]),
foundationLesson('Regras de potência e expoentes especiais', [
  'Ao multiplicar potências de mesma base, juntamos os fatores: a^m · a^n = a^(m+n). Ao dividir, subtraímos os expoentes quando a base é não nula.',
  'Uma potência elevada a outra potência multiplica os expoentes: (a^m)^n = a^(m·n). Não some os expoentes nesse caso.',
  'Para a diferente de zero, a⁰ = 1 e a^(−n) = 1/a^n. O expoente negativo indica inverso, não resultado necessariamente negativo.',
  'Estas regras valem onde as expressões estão definidas. Aqui não atribuímos valor a 0⁰ nem usamos base zero com expoente negativo. A potência de uma soma não se distribui: (2 + 3)² não é 2² + 3².'
], 'Calcule 2³ · 2² ÷ 2⁴.', [
  step('Ao multiplicar as duas potências, qual expoente vem de 3 + 2?', '5','Mesma base em um produto: some os expoentes.','2³ · 2² = 2⁵.'),
  step('Depois de dividir por 2⁴, qual é o expoente final?', '1','Subtraia 4 de 5.','2⁵/2⁴ = 2¹.'),
  step('Qual é o valor numérico?', '2','2¹ é uma cópia da base.','O resultado é 2.')
], [
  ['7⁰ = ?', '1','A base é diferente de zero.','Toda base não nula elevada a zero dá 1.'],
  ['2^(−3) = ?', '1/8','Calcule o inverso de 2³.','2^(−3) = 1/2³ = 1/8.'],
  ['(3²)² = ?', '81','Multiplique os expoentes: 2 · 2.','(3²)² = 3⁴ = 81.'],
  ['5³ ÷ 5² = ?', '5','Subtraia os expoentes.','5^(3−2) = 5.'],
  ['Calcule 4⁰ + 2^(−2).', '5/4','Calcule 1 + 1/4.','4⁰ = 1 e 2^(−2) = 1/4; a soma é 5/4.']
]),
foundationLesson('Raiz quadrada e raízes de ordem ímpar', [
  'A raiz quadrada principal √a é o número não negativo cujo quadrado é a. Nos reais, ela só está definida para a maior ou igual a zero.',
  'Por isso √9 = 3, e não ±3. Já a equação x² = 9 tem duas soluções: 3 e −3. A raiz principal e o conjunto de soluções são perguntas diferentes.',
  'Raízes de ordem ímpar admitem números negativos: a raiz cúbica de −8 é −2 porque (−2)³ = −8.',
  'A raiz quadrada de um quadrado é o valor sem sinal do número: √((−5)²) = 5. Na próxima unidade chamaremos isso de módulo.'
], 'Entenda √((−6)²).', [
  step('Quanto vale (−6)²?', '36','Multiplique −6 por −6.','O quadrado de −6 é 36.'),
  step('Qual número não negativo ao quadrado dá 36?', '6','A raiz principal deve ser não negativa.','Esse número é 6.'),
  step('Então qual é o valor de √((−6)²)?', '6','A expressão pede a raiz principal, não as soluções de uma equação.','O valor é 6, e não −6.')
], [
  ['√81 = ?', '9','Procure o número não negativo cujo quadrado é 81.','9² = 81, então √81 = 9.'],
  ['Qual é a raiz cúbica de −27?', '-3','Qual número ao cubo dá −27?','(−3)³ = −27.'],
  ['√(−4) é um número real?', 'Não','O quadrado de um real nunca é negativo.','Não existe raiz quadrada real de −4.',['Sim','Não']],
  ['√(9/16) = ?', '3/4','Tire as raízes do numerador e do denominador.','√9/√16 = 3/4.'],
  ['Qual é a solução NEGATIVA de x² = 49?', '-7','A equação tem duas soluções; foi pedida a negativa.','(−7)² = 49. A solução negativa é −7.']
]),
foundationLesson('Simplificar raízes e estimar irracionais', [
  'Para simplificar uma raiz quadrada, procure um fator que seja um quadrado perfeito: √12 = √(4 · 3) = 2√3.',
  'Para a e b não negativos, √(a·b) = √a·√b. Essa propriedade não vale para somas: √(9 + 16) = 5, enquanto √9 + √16 = 7.',
  'Para localizar uma raiz que não é exata, compare quadrados: 4 < 7 < 9 implica 2 < √7 < 3.',
  'Um resultado exato como √7 preserva todo o valor. Uma aproximação decimal ajuda a medir ou localizar, mas deve ser identificada como aproximação.'
], 'Simplifique √20 e localize seu valor.', [
  step('20 = 4 · 5. Quanto vale √4?', '2','2² = 4.','A raiz do fator quadrado perfeito sai como 2.'),
  step('Complete √20 = ___√5. Digite só o coeficiente.', '2','√(4·5) = √4 · √5.','A forma simplificada é 2√5.'),
  step('Entre quais inteiros consecutivos está √20?', '4 e 5','Compare 20 com 4² e 5².','16 < 20 < 25, então 4 < √20 < 5.',['3 e 4','4 e 5','5 e 6'])
], [
  ['Complete √18 = ___√2. Digite só o coeficiente.', '3','18 = 9 · 2.','√18 = √9 · √2 = 3√2.'],
  ['Qual é o inteiro imediatamente abaixo de √10?', '3','9 < 10 < 16.','3 < √10 < 4.'],
  ['√(9 + 16) = ?', '5','Some dentro da raiz antes de extrair.','√25 = 5. Não é √9 + √16.'],
  ['√2 · √8 = ?', '4','Os radicandos são não negativos: multiplique-os.','√2 · √8 = √16 = 4.'],
  ['Uma área quadrada mede 50 m². O lado mede √50 metros. Complete: lado = ___√2 metros.', '5','50 = 25 · 2.','√50 = 5√2 metros, em forma exata.']
]),
foundationLesson('A ordem das operações e a distributiva', [
  'Para uma expressão ter uma leitura única, seguimos uma ordem: agrupamentos primeiro; depois potências e raízes; depois multiplicações e divisões; por fim somas e subtrações.',
  'Operações do mesmo nível são feitas da esquerda para a direita. Assim, 12 ÷ 3 · 2 = 4 · 2 = 8.',
  'A distributiva conecta multiplicação e soma: a(b + c) = ab + ac. Por exemplo, 3(10 + 2) = 30 + 6 = 36.',
  'Na soma e na multiplicação podemos trocar a ordem e reagrupar sem mudar o resultado. Na subtração e na divisão isso não vale em geral. Divisão não se distribui sobre uma soma no denominador.'
], 'Calcule 2 + 3 · (5 − 1)².', [
  step('Quanto vale 5 − 1?', '4','O parêntese vem primeiro.','O agrupamento vale 4.'),
  step('Quanto vale 4²?', '16','Agora faça a potência.','4² = 16.'),
  step('Quanto vale 3 · 16?', '48','A multiplicação vem antes da soma externa.','3 · 16 = 48.'),
  step('Qual é o resultado final?', '50','Some 2 ao produto.','2 + 48 = 50.')
], [
  ['4 + 2 · 3 = ?', '10','Multiplique antes de somar.','4 + 6 = 10.'],
  ['(4 + 2) · 3 = ?', '18','Aqui o parêntese vem primeiro.','6 · 3 = 18.'],
  ['12 ÷ 3 · 2 = ?', '8','Divisão e multiplicação têm a mesma prioridade; siga da esquerda para a direita.','12 ÷ 3 = 4; depois 4 · 2 = 8.'],
  ['−2 · (3 − 7) = ?', '8','Primeiro resolva o parêntese, ou distribua −2 aos dois termos.','−2 · (−4) = 8.'],
  ['Calcule 3² − 2 · (1 − 4) + 1/2.', '31/2','Parêntese: −3; potência: 9; produto: −6.','9 − (−6) + 1/2 = 15 + 1/2 = 31/2.']
]),
foundationLesson('Comparação exata e aproximações', [
  'Para comparar frações com denominadores positivos, podemos usar um denominador comum. Isso compara números exatos sem perder casas decimais.',
  'Para arredondar, observe a primeira casa que será descartada. Se for 5 ou maior, acrescente 1 à última casa mantida; se for menor que 5, mantenha-a.',
  'Arredondar não é a mesma coisa que truncar. Em 2,718, truncar em duas casas dá 2,71, mas arredondar em duas casas dá 2,72.',
  'Usamos = para igualdade exata e ≈ para aproximação. Entre dois reais a < b, a média (a+b)/2 sempre fica entre eles: não há dois reais consecutivos.'
], 'Compare 2/3 e 3/4 sem arredondar.', [
  step('Escreva 2/3 com denominador 12: qual é o numerador?', '8','Multiplique os dois termos por 4.','2/3 = 8/12.'),
  step('Escreva 3/4 com denominador 12: qual é o numerador?', '9','Multiplique os dois termos por 3.','3/4 = 9/12.'),
  step('Qual das duas frações originais é maior?', '3/4','Com o mesmo denominador, compare 8 e 9.','9/12 > 8/12, então 3/4 é maior.')
], [
  ['Arredonde 1,236 para duas casas decimais.', '1,24','A terceira casa decimal é 6.','A casa dos centésimos sobe de 3 para 4: 1,24.'],
  ['Trunque 1,236 em duas casas decimais.', '1,23','No truncamento, apenas descarte as casas seguintes.','Truncar não arredonda: fica 1,23.'],
  ['Qual é maior: 5/8 ou 2/3?', '2/3','Use denominador comum 24.','5/8 = 15/24 e 2/3 = 16/24.'],
  ['Qual é o ponto médio entre −2 e −1?', '-3/2','Some os dois números e divida por 2.','(−2 + (−1))/2 = −3/2 = −1,5.'],
  ['Uma medida aproximada é 3,146. Arredonde para duas casas decimais.', '3,15','Observe a terceira casa decimal.','Como a terceira casa é 6, 3,146 arredondado dá 3,15.']
]),
phase('Desafio final: números reais', [
  pill('Antes de seguir, junte as peças', [
    'Você começou contando e chegou a frações, negativos, potências e raízes. Agora a tarefa é escolher as ferramentas sem receber uma regra nova a cada questão.',
    'Em cada conta, identifique primeiro os agrupamentos e as operações. Só depois calcule e confira o sinal e o tamanho do resultado.',
    'Os exercícios que você errar voltam no final, e antes eu explico de novo. Errar faz parte do caminho.'
  ]),
  guided('Monte uma resolução completa', '(−3)² − 1/2 ÷ 1/4', [
    step('Qual é o valor da potência?', '9','A base −3 está entre parênteses.','(−3)² = 9.'),
    step('Quanto é 1/2 ÷ 1/4?', '2','Multiplique 1/2 por 4/1.','(1/2) · 4 = 2.'),
    step('Qual é o resultado da expressão?', '7','Subtraia a divisão da potência.','9 − 2 = 7.')
  ]),
  task('Escolha o conjunto com cuidado', 'Qual é o menor conjunto entre N, Z, Q e R que contém √2?', 'R','√2 é irracional.','Entre esses quatro conjuntos, somente R contém √2.',['N','Z','Q','R']),
  task('Revise os sinais', '−5 − (−8) + (−2) = ?', '1','Troque subtrair −8 por somar 8.','−5 + 8 − 2 = 1.'),
  task('Produza uma fração', '3/4 − 2/3 = ?', '1/12','Use denominador 12.','9/12 − 8/12 = 1/12.'),
  task('Potência e raiz', '√36 + 2^(−1) = ?', '13/2','A raiz principal é 6 e a potência é 1/2.','6 + 1/2 = 13/2.'),
  paper('Resolva sem pular etapas', '(2/3 + 1/6) ÷ (−5/2) = ?', '-1/3','Primeiro some as frações; depois multiplique pelo inverso do divisor.','2/3 + 1/6 = 5/6; (5/6) · (−2/5) = −1/3.'),
  paper('Feche a unidade', 'Uma conta começa com −10 reais. Entram 3 depósitos de 4 reais. Depois sai metade de 6 reais. Qual é o saldo final?', '-1','Escreva −10 + 3·4 − 6/2.','−10 + 12 − 3 = −1 real. Você usou sinais, prioridade e divisão em uma situação concreta.')
], {boss:true})
]));
COURSE.precalculoNumeros.units.push(unit('Intervalos e módulo', 'Descreva conjuntos na reta, combine condições e interprete distâncias. Pré-requisito: domínio de números reais.', [
foundationLesson('Desigualdades e pertencimento', [
  'Agora vamos descrever vários números de uma vez. A letra x representa um real qualquer; uma condição, como x > 2, seleciona os que satisfazem essa condição.',
  'x > 2 quer dizer todos os reais à direita de 2, sem o próprio 2. x ≥ 2 inclui o ponto 2. Do mesmo modo, < exclui a igualdade e ≤ inclui.',
  'O símbolo ∈ significa pertence. Dizer 3 ∈ A significa que 3 está no conjunto A. Para decidir se um número pertence, substitua x por ele e confira a condição.',
  'Duas condições ligadas por “e” precisam ser verdadeiras ao mesmo tempo. Por exemplo, −1 < x ≤ 3 pede números maiores que −1 e menores ou iguais a 3.'
], 'A é o conjunto dos reais x tais que −2 < x ≤ 4.', [
  step('−2 satisfaz a condição −2 < x?', 'Não','A desigualdade é estrita.','−2 não é maior que −2, então a ponta esquerda é excluída.',['Sim','Não']),
  step('4 satisfaz ao mesmo tempo −2 < x e x ≤ 4?', 'Sim','O símbolo ≤ permite igualdade.','4 passa nas duas condições e pertence ao conjunto.',['Sim','Não']),
  step('0 pertence a A?', 'Sim','Teste −2 < 0 e 0 ≤ 4.','As duas condições são verdadeiras.',['Sim','Não'])
], [
  ['5 pertence ao conjunto x > 5?', 'Não','O sinal > não inclui a igualdade.','5 não é maior que ele mesmo.',['Sim','Não']],
  ['−1 pertence ao conjunto x ≥ −1?', 'Sim','O sinal ≥ aceita a igualdade.','−1 satisfaz a condição.',['Sim','Não']],
  ['Escreva um inteiro exatamente no meio de −2 e 2.', '0','Calcule a média dos extremos.','(−2 + 2)/2 = 0.'],
  ['4 satisfaz −1 < x < 3?', 'Não','As duas desigualdades precisam valer.','4 é maior que −1, mas não é menor que 3.',['Sim','Não']],
  ['Qual é o maior inteiro que satisfaz x < 4?', '3','A igualdade com 4 é proibida.','3 é o último inteiro antes de 4.']
]),
foundationLesson('Intervalos abertos e fechados', [
  'Um intervalo reúne todos os reais entre dois extremos. Colchete fechado [ ou ] junto à ponta inclui o extremo; parêntese exclui.',
  'Assim, [1; 4] significa 1 ≤ x ≤ 4, e (1; 4) significa 1 < x < 4. Também é comum escrever ]1; 4[ para o intervalo aberto.',
  'Podemos incluir uma ponta e excluir a outra: [1; 4) significa 1 ≤ x < 4. Vamos separar os extremos com ponto e vírgula, para não confundir com vírgula decimal.',
  'No desenho da reta, ponta incluída vira bolinha preenchida; ponta excluída vira bolinha vazia. [2; 2] é o conjunto com apenas 2, enquanto (2; 2) é vazio.'
], 'Escreva o intervalo dos reais −3 ≤ x < 2.', [
  step('O extremo −3 está incluído?', 'Sim','A condição tem ≤.','A ponta esquerda será fechada.',['Sim','Não']),
  step('O extremo 2 está incluído?', 'Não','A condição é x < 2, sem igualdade.','A ponta direita será aberta.',['Sim','Não']),
  step('Escolha a notação correta.', '[-3;2)','Esquerda fechada e direita aberta.','[−3;2) inclui −3 e exclui 2.',['(-3;2)','[-3;2)','[-3;2]'])
], [
  ['Quantos dos extremos 1 e 5 pertencem a (1;5)?', '0','As duas pontas são abertas.','Nenhum dos extremos pertence ao intervalo.'],
  ['Quantos dos extremos 1 e 5 pertencem a [1;5]?', '2','As duas pontas são fechadas.','Os dois extremos estão incluídos.'],
  ['Escreva o intervalo de 0 ≤ x ≤ 3. Use ponto e vírgula.', '[0;3]','Inclua as duas pontas com colchetes.','0 ≤ x ≤ 3 equivale a [0;3].'],
  ['O intervalo [2;2] tem quantos elementos?', '1','Só o número que é ao mesmo tempo ≥2 e ≤2.','[2;2] contém apenas 2.'],
  ['Escreva o intervalo de −1 < x < 4. Use parênteses ou a notação aberta com colchetes.', '(-1;4)|]-1;4[','Exclua os dois extremos.','O intervalo é (−1;4), também escrito ]−1;4[.']
]),
foundationLesson('Intervalos ilimitados e conjunto vazio', [
  'Uma condição como x ≥ 3 não tem uma última ponta à direita: os valores seguem sem limite. Escrevemos [3; +∞).',
  'Infinito indica uma direção sem fim, não um número real que possa ser incluído. Por isso a ponta de +∞ ou −∞ é sempre aberta.',
  'O conjunto de todos os reais é R = (−∞; +∞). Um conjunto sem nenhum elemento é o conjunto vazio, representado por ∅.',
  'Antes de escrever o intervalo, confira se as condições podem ser satisfeitas juntas. Pedir x > 4 e x < 1 ao mesmo tempo não deixa nenhum número.'
], 'Descreva o conjunto x < −2.', [
  step('O número −2 pertence ao conjunto?', 'Não','A condição é estrita.','A ponta em −2 é aberta.',['Sim','Não']),
  step('Os valores seguem sem limite para a esquerda ou para a direita?', 'Esquerda','São todos menores que −2.','A direção ilimitada é a do −∞.',['Esquerda','Direita']),
  step('Qual é o intervalo?', '(-∞;-2)','As duas pontas ficam abertas.','x < −2 corresponde a (−∞;−2).',['(-∞;-2)','(-∞;-2]','[-2;+∞)'])
], [
  ['+∞ é um número real?', 'Não','Ele descreve crescimento sem limite.','Infinito não é elemento da reta real.',['Sim','Não']],
  ['Escreva a menor ponta do intervalo x ≥ 5.', '5','É o primeiro valor permitido.','A ponta finita é 5, incluída.'],
  ['O conjunto x > 4 e x < 1 é vazio?', 'Sim','Nenhum real é simultaneamente maior que 4 e menor que 1.','As condições são incompatíveis.',['Sim','Não']],
  ['0 pertence ao conjunto x < −2?', 'Não','Compare zero com −2.','0 é maior que −2 e não satisfaz a condição.',['Sim','Não']],
  ['Qual é o maior inteiro que satisfaz x ≤ −2?', '-2','A igualdade é permitida.','−2 pertence ao conjunto e é seu maior inteiro.']
]),
foundationLesson('Interseção: satisfazer as duas condições', [
  'A interseção A ∩ B reúne os números que pertencem a A e a B ao mesmo tempo. Pense na parte em comum de dois trechos da reta.',
  'Primeiro localize cada intervalo. Depois guarde apenas a sobreposição. Uma ponta só fica incluída se ela pertencer aos dois conjuntos.',
  'Se os intervalos não têm nenhum ponto em comum, a interseção é vazia. Até intervalos que se encostam podem não compartilhar o ponto de contato.',
  'A palavra “e” nas condições costuma indicar interseção. Por exemplo, x ≥ 1 e x < 4 produz [1;4).'
], 'A = [−2;3] e B = [1;5). Encontre A ∩ B.', [
  step('Em que número começa a sobreposição?', '1','Guarde a maior das pontas esquerdas.','A parte comum começa em 1.'),
  step('Em que número termina a sobreposição?', '3','Guarde a menor das pontas direitas.','A parte comum termina em 3.'),
  step('Escreva o intervalo da interseção.', '[1;3]','As pontas 1 e 3 pertencem aos dois conjuntos.','A ∩ B = [1;3].')
], [
  ['[0;4] ∩ [2;6] = ? Use ponto e vírgula.', '[2;4]','Guarde só a parte comum.','Os valores comuns vão de 2 até 4, incluindo ambos.'],
  ['(0;3) ∩ [1;5] = ?', '[1;3)|[1;3[','1 pertence aos dois; 3 é excluído pelo primeiro.','A interseção é [1;3).'],
  ['[0;1] e [2;3] têm interseção vazia?', 'Sim','Há uma separação entre os dois trechos.','Não existe ponto comum.',['Sim','Não']],
  ['Quantos elementos há em [0;2] ∩ [2;5]?', '1','Os intervalos compartilham apenas a ponta 2.','A interseção é o conjunto {2}.'],
  ['Escreva o intervalo de x ≥ −1 e x < 2.', '[-1;2)|[-1;2[','Inclua a primeira ponta e exclua a segunda.','A interseção das condições é [−1;2).']
]),
foundationLesson('União e complemento', [
  'A união A ∪ B reúne os números que estão em A ou em B, incluindo quem está nos dois. Não é preciso satisfazer as duas condições ao mesmo tempo.',
  'Se os trechos se sobrepõem ou se juntam sem deixar um ponto faltando, a união pode formar um único intervalo. Caso contrário, mantenha os trechos separados.',
  'O complemento de A em R contém todos os reais que não pertencem a A. Ao retirar uma ponta incluída, ela fica fora do complemento; uma ponta excluída pode entrar nele.',
  'Por exemplo, o complemento de [1;3] é (−∞;1) ∪ (3;+∞). O complemento de (1;3) inclui os extremos 1 e 3.'
], 'A = [0;2] e B = (1;4]. Encontre A ∪ B.', [
  step('Qual é a ponta mais à esquerda coberta pelos conjuntos?', '0','A união guarda qualquer ponto que esteja em pelo menos um deles.','A ponta esquerda é 0.'),
  step('Qual é a ponta mais à direita coberta?', '4','O segundo conjunto chega a 4.','A ponta direita é 4.'),
  step('Escreva a união como um intervalo.', '[0;4]','Há sobreposição e nenhuma lacuna entre as pontas.','A ∪ B = [0;4].')
], [
  ['[1;3] ∪ [2;5] = ?', '[1;5]','Guarde tudo que está em pelo menos um dos intervalos.','A união cobre de 1 até 5 sem lacunas.'],
  ['0 pertence à união [0;1] ∪ [3;4]?', 'Sim','Basta pertencer a um dos conjuntos.','0 está no primeiro intervalo.',['Sim','Não']],
  ['2 pertence à união [0;1] ∪ [3;4]?', 'Não','2 não está em nenhum dos dois trechos.','A união não preenche a lacuna entre 1 e 3.',['Sim','Não']],
  ['1 pertence ao complemento de (1;3) em R?', 'Sim','O intervalo original exclui 1.','Tudo que não pertence ao intervalo está no complemento.',['Sim','Não']],
  ['Quantos dos pontos 1 e 3 pertencem ao complemento de [1;3] em R?', '0','Os dois já pertencem ao conjunto original.','Nenhuma das pontas entra no complemento.']
]),
foundationLesson('Módulo é distância até zero', [
  'O módulo |a| mede a distância de a até zero na reta. Distância não é negativa: |5| = 5, |−5| = 5 e |0| = 0.',
  'A definição é: |a| = a se a ≥ 0; |a| = −a se a < 0. No segundo caso, −a é positivo porque a já é negativo.',
  'A distância entre a e b é |a − b|. A ordem dos pontos não altera a distância: |a − b| = |b − a|.',
  'Não retire barras de módulo sem olhar o que há dentro. Primeiro calcule a expressão interna e depois tome a distância até zero.'
], 'Qual é a distância entre −3 e 2?', [
  step('Quanto vale −3 − 2?', '-5','Calcule a diferença dos pontos.','A diferença é −5.'),
  step('Qual é o módulo de −5?', '5','A distância até zero é não negativa.','|−5| = 5.'),
  step('Qual é a distância entre os pontos?', '5','Use |a − b|.','A distância é 5 unidades.')
], [
  ['|−7| = ?', '7','Pense na distância de −7 até zero.','São 7 unidades.'],
  ['|0| = ?', '0','Zero está a que distância de si mesmo?','A distância é zero.'],
  ['|3 − 8| = ?', '5','Primeiro calcule 3 − 8.','|−5| = 5.'],
  ['−|−4| = ?', '-4','O sinal externo continua depois de calcular o módulo.','|−4| = 4; com o sinal externo, fica −4.'],
  ['Qual é a distância entre −6 e −2?', '4','Calcule |−6 − (−2)|.','|−4| = 4 unidades.']
]),
foundationLesson('Equações com módulo: pontos à mesma distância', [
  'A equação |x| = 3 pede os pontos que estão a 3 unidades de zero. Existem dois: −3 e 3.',
  'Se a distância pedida for zero, |x| = 0 só tem a solução x = 0. Se a distância pedida for negativa, não há solução real.',
  'A expressão |x − c| mede a distância entre x e o centro c. Para |x − c| = r com r positivo, os dois pontos são c − r e c + r.',
  'Desenhe o centro, ande a distância pedida para cada lado e confira os valores na expressão. Assim o procedimento tem significado geométrico.'
], 'Encontre os pontos que satisfazem |x − 2| = 3.', [
  step('Qual é o centro da distância?', '2','|x − c| mede a distância ao ponto c.','O centro é 2.'),
  step('Qual é o ponto à esquerda, 2 − 3?', '-1','Ande 3 unidades para a esquerda.','Um ponto é −1.'),
  step('Qual é o ponto à direita, 2 + 3?', '5','Ande 3 unidades para a direita.','O outro ponto é 5; ambos ficam a distância 3 de 2.')
], [
  ['Qual é a solução negativa de |x| = 6?', '-6','Há dois pontos a distância 6 do zero.','A solução negativa é −6.'],
  ['Quantas soluções reais tem |x| = 0?', '1','Só zero está a distância zero de zero.','A única solução é x = 0.'],
  ['Quantas soluções reais tem |x| = −2?', '0','Um módulo não pode ser negativo.','Não há solução real.'],
  ['Qual é a maior solução de |x − 1| = 4?', '5','Some a distância ao centro.','1 + 4 = 5 é a maior solução; a outra é −3.'],
  ['Qual é a menor solução de |x + 2| = 5?', '-7','O centro é −2, pois x + 2 = x − (−2).','Os pontos são −2 − 5 = −7 e −2 + 5 = 3.']
]),
foundationLesson('Desigualdades com módulo', [
  'Para r positivo, |x − c| < r seleciona os pontos a menos de r unidades de c. É o intervalo aberto (c − r; c + r). Com ≤, incluímos as duas pontas.',
  'Já |x − c| > r seleciona os pontos mais distantes: x < c − r ou x > c + r. São dois trechos externos, não o intervalo do meio.',
  'A igualdade também decide as pontas no caso ≥. Com r = 0, confira separadamente: |x − c| ≤ 0 só permite x = c.',
  'Antes de escrever uma resposta, confira centro, raio, dentro ou fora e inclusão das pontas. Testar um ponto do meio ajuda a detectar um intervalo invertido.'
], 'Descreva |x − 1| ≤ 3.', [
  step('Qual é a ponta esquerda 1 − 3?', '-2','Subtraia a distância do centro.','A ponta esquerda é −2.'),
  step('Qual é a ponta direita 1 + 3?', '4','Some a distância ao centro.','A ponta direita é 4.'),
  step('Escreva o intervalo solução.', '[-2;4]','≤ inclui as duas pontas e seleciona o trecho interno.','As soluções formam [−2;4].')
], [
  ['Escreva a solução de |x| < 2 como intervalo.', '(-2;2)|]-2;2[','Pontos a menos de 2 unidades de zero.','O intervalo é (−2;2).'],
  ['Escreva a solução de |x − 3| ≤ 1 como intervalo.', '[2;4]','O centro é 3 e o raio é 1.','As pontas são 2 e 4, ambas incluídas.'],
  ['0 satisfaz |x| > 3?', 'Não','A distância de zero até ele mesmo é 0.','0 não é maior que 3.',['Sim','Não']],
  ['−4 satisfaz |x| ≥ 3?', 'Sim','Calcule |−4| e compare com 3.','4 ≥ 3 é verdadeiro.',['Sim','Não']],
  ['Qual é a única solução de |x + 2| ≤ 0?', '-2','A distância precisa ser exatamente zero; o centro é −2.','Só x = −2 faz |x + 2| = 0.']
]),
phase('Desafio final: intervalos e módulo', [
  pill('Descreva, combine, confira', [
    'Você aprendeu três formas de enxergar um conjunto: condições, intervalos e distâncias. No desafio, escolha a representação que torna o problema mais simples.',
    'Confira sempre as pontas: uma resposta pode estar quase certa e ainda incluir um valor que deveria ficar de fora. Na interseção precisam valer as duas condições.',
    'Para dominar a unidade, resolva o desafio. Os erros voltam no final até você acertar.'
  ]),
  guided('De uma distância ao intervalo', '|x − 4| < 2', [
    step('Qual é o centro?', '4','Compare com |x − c|.','O centro é 4.'),
    step('Qual é a ponta esquerda?', '2','Calcule 4 − 2.','A ponta esquerda é 2.'),
    step('Escreva o intervalo completo.', '(2;6)|]2;6[','A ponta direita é 4 + 2 e a condição é estrita.','As soluções são (2;6).')
  ]),
  task('Decida a inclusão', '3 pertence a (−1;3]?', 'Sim','Observe o colchete na ponta direita.','A ponta 3 está incluída.',['Sim','Não']),
  task('Construa uma interseção', '[−3;2] ∩ [0;5) = ?', '[0;2]','Guarde a região comum.','Os pontos comuns formam [0;2].'),
  task('Calcule uma distância', 'Qual é a distância entre −4 e 3?', '7','Use |−4 − 3|.','|−7| = 7.'),
  task('Resolva uma condição', 'Qual é a menor solução de |x − 3| = 5?', '-2','Vá 5 unidades à esquerda do centro 3.','3 − 5 = −2.'),
  paper('Combine distância e intervalo', 'Escreva a solução de |x + 1| ≤ 2 como intervalo.', '[-3;1]','O centro é −1 e o raio é 2.','−1 − 2 = −3 e −1 + 2 = 1; as pontas estão incluídas.'),
  paper('Confira o conjunto vazio', 'Quantos números pertencem a (0;2) ∩ [2;4]?', '0','O primeiro intervalo não contém 2 e nenhum valor maior que 2.','Os intervalos não têm ponto em comum; a interseção é vazia.')
], {boss:true})
]));
}
