'use strict';
// Fundamentos e funções · unidades 1 e 2: números reais; intervalos e módulo.
// Revisão dos pré-requisitos de Cálculo: pressupõe fluência nas operações básicas (aulas elementares: content-precalculo.js).
// Cada fase: pílula do Rubi (regra em destaque) → exemplo guiado → prática com variação → última questão sem roteiro.
// Linha de prática: [título, enunciado, resposta, pista, explicação, alternativas?]
{
const lesson = (name, lines, rule, model, steps, rows, opts) => phase(name, [
  pill(name + ' · com o Rubi', lines, rule),
  guided(model[0], model[1], steps),
  ...rows.map((r, i) => (i === rows.length - 1 ? paper : task)(r[0], r[1], r[2], r[3], r[4], r[5]))
], opts);

COURSE.fundamentos.units.push(unit('Números reais', 'Revisão para Cálculo: conjuntos, ordem, propriedades de potências e raízes, valores exatos e aproximações.', [
lesson('Conjuntos numéricos e restrições reais', [
  'Nesta seção você revisa o que já estudou e vai usar em Cálculo. Vamos pelas condições de validade, que é onde nascem a maioria dos erros.',
  'Os conjuntos crescem assim: N ⊂ Z ⊂ Q ⊂ R. Racionais são razões de inteiros com denominador não nulo; irracionais são reais que não podem ser escritos assim. Classifique pelo VALOR, não pela aparência: √9 = 3 é natural, mas √2 é irracional.',
  'Antes de usar uma expressão, pergunte se ela representa um real: não se divide por zero, e não se tira raiz de índice par de um número negativo.',
  'Em Cálculo essas duas condições voltam como o domínio das funções.'
], 'N ⊂ Z ⊂ Q ⊂ R · denominador ≠ 0 · raiz par: radicando ≥ 0', ['Classifique √9 e √2 e ache a restrição de 1/(a − 3)', '√9 · √2 · 1/(a − 3)'], [
  step('Qual o menor entre N, Z, Q e R que contém √9?', 'N', '√9 = 3.', '3 é natural, logo também pertence aos conjuntos maiores.', ['N', 'Z', 'Q', 'R']),
  step('Qual o menor entre N, Z, Q e R que contém √2?', 'R', '√2 é irracional.', 'Entre os quatro, só R contém √2.', ['N', 'Z', 'Q', 'R']),
  step('Que valor de a deixa 1/(a − 3) sem sentido?', '3', 'Quando o denominador vale zero?', 'a − 3 = 0 quando a = 3. Esse valor tem que ser excluído.')
], [
  ['Menor conjunto', 'Qual o menor conjunto entre N, Z, Q e R que contém −8?', 'Z', 'É inteiro, mas não natural.', '−8 está em Z, Q e R; o menor é Z.', ['N', 'Z', 'Q', 'R']],
  ['Decimal finito', 'Escreva 0,125 como fração irredutível.', '1/8', '0,125 = 125/1000.', 'Simplificando por 125 fica 1/8. Todo decimal finito é racional.'],
  ['Soma de tipos', 'Se a é racional e b é irracional, a + b é racional ou irracional?', 'Irracional', 'Se a + b fosse racional, b = (a + b) − a também seria.', 'A soma é irracional: o contrário contradiz a irracionalidade de b.', ['Racional', 'Irracional']],
  ['Raiz de negativo', 'Para quantos inteiros x de −3 a 3 a expressão √x é um número real?', '4', 'O radicando precisa ser ≥ 0.', 'Servem 0, 1, 2 e 3: são 4.'],
  ['Denominador', 'O denominador de 1/((a − 3)(a + 2)) se anula em dois valores. Qual o maior?', '3', 'Cada fator pode ser zero.', 'Anula em a = 3 e em a = −2; o maior é 3.'],
  ['Sem o roteiro', 'Quantos inteiros de −5 a 5 tornam √x/(x − 2) um número real?', '5', 'Exija x ≥ 0 e x ≠ 2.', 'Servem 0, 1, 3, 4 e 5: são 5.']
]),
lesson('Ordem e desigualdades', [
  'Na reta, a < b quer dizer que a está à esquerda de b. Somar o mesmo número aos dois lados mantém a ordem.',
  'Multiplicar ou dividir por um número POSITIVO mantém o sinal; por um NEGATIVO inverte. É a regra que mais derruba gente.',
  'Nunca multiplique uma desigualdade por uma expressão de sinal desconhecido sem separar os casos. Elevar ao quadrado também não preserva a ordem: −3 < 2, mas 9 > 4.'
], 'a < b ⇒ ka < kb se k > 0 · ka > kb se k < 0', ['Resolva −2x < 6', '−2x < 6'], [
  step('Por qual número vamos dividir os dois lados?', '-2', 'Isole x dividindo pelo coeficiente.', 'O divisor é −2, que é negativo.'),
  step('Ao dividir por −2, o sinal < vira qual?', '>', 'Dividir por negativo inverte a ordem.', 'O sinal passa a ser >.', ['<', '>', '=']),
  step('Qual o extremo numérico da solução x > ___?', '-3', 'O extremo é 6/(−2).', 'A solução é x > −3.')
], [
  ['Somar', 'Se x < 4, então x + 5 < ?', '9', 'Some 5 aos dois lados.', 'x + 5 < 9.'],
  ['Multiplicar por negativo', 'Se x < 4, então −3x > ?', '-12', 'O sinal inverte.', '−3x > −12.'],
  ['Resolva', 'Resolva −4x ≥ 12. Complete: x ≤ ?', '-3', 'Divida por −4 e inverta o sentido.', 'x ≤ −3.'],
  ['Dois passos', 'Resolva 5 − 2x > 1. Complete: x < ?', '2', 'Passe o 5 e depois divida por −2.', '−2x > −4 ⇒ x < 2.'],
  ['O quadrado não preserva', 'Para x = −3 temos x < 2. Quanto vale x²? (e compare com 4)', '9', 'Eleve −3 ao quadrado.', 'x² = 9 > 4: de x < 2 não se conclui x² < 4.'],
  ['Sem o roteiro', 'Resolva (3 − x)/2 ≤ 4. Complete: x ≥ ?', '-5', 'Multiplique por 2 e depois por −1.', '3 − x ≤ 8 ⇒ −x ≤ 5 ⇒ x ≥ −5.']
]),
lesson('Racionais, dízimas e igualdade exata', [
  'Decimais finitos e dízimas periódicas são racionais. Um irracional tem expansão infinita e sem período.',
  'Uma dízima é a expansão INTEIRA: 0,333… = 1/3, mas 0,33 = 33/100. Use = para igualdades exatas e ≈ para aproximações.',
  'Para achar a fração, multiplique por uma potência de 10 que alinhe os períodos e subtraia: o período some e sobra uma equação.',
  'Em Cálculo, mantenha frações e raízes exatas até o fim: arredondar cedo acumula erro.'
], 'Período de k dígitos: multiplique por 10ᵏ e subtraia', ['Ache a fração de t = 0,272727…', 't = 0,272727…'], [
  step('Por qual potência de 10 multiplicamos, se o período tem 2 dígitos?', '100', 'O bloco repetido tem dois algarismos.', '100t = 27,2727…'),
  step('Subtraindo t de 100t, qual o coeficiente de t?', '99', 'Os períodos se cancelam.', '99t = 27.'),
  step('Escreva t como fração irredutível.', '3/11', 'Simplifique 27/99.', 't = 27/99 = 3/11.')
], [
  ['Período de 1 dígito', 'Qual fração é igual a 0,666…?', '2/3', 'Multiplique por 10 e subtraia a original.', '9t = 6 ⇒ t = 2/3.'],
  ['Outra dízima', 'Qual fração é igual a 0,181818…?', '2/11', 'Use 100t − t = 18.', '99t = 18 ⇒ t = 2/11.'],
  ['Período de 1 dígito', 'Qual fração é igual a 0,555…?', '5/9', '10t − t = 5.', '9t = 5 ⇒ t = 5/9.'],
  ['0,999…', 'Se t = 0,999…, quanto vale 10t − t?', '9', 'Os noves se cancelam na subtração.', '10t − t = 9 ⇒ 9t = 9 ⇒ t = 1. Portanto 0,999… = 1: não existe "último 9".'],
  ['Erro da aproximação', 'Qual o erro absoluto, como fração, ao trocar 1/3 por 0,33?', '1/300', 'Calcule |1/3 − 33/100|.', '|100/300 − 99/300| = 1/300.'],
  ['Sem o roteiro', 'Qual fração é igual a 0,454545…?', '5/11', 'Use 100t − t = 45.', '99t = 45 ⇒ t = 5/11.']
]),
lesson('Potências e expoentes', [
  'Regras: aᵐ·aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ e aᵐ/aⁿ = aᵐ⁻ⁿ. Expoente negativo é INVERSO, não sinal negativo: a⁻ⁿ = 1/aⁿ, com a ≠ 0.',
  'Expoente fracionário: para a > 0, a^(p/q) é a raiz q-ésima de aᵖ. As regras acima continuam valendo.',
  'Os parênteses definem a base: (−2)² = 4, mas −2² = −(2²) = −4.',
  'Essas restrições importam quando você simplifica expressões antes de calcular limites.'
], 'aᵐ·aⁿ = aᵐ⁺ⁿ · a⁻ⁿ = 1/aⁿ · a^(p/q) = raiz q-ésima de aᵖ', ['Simplifique a³ · a⁻⁵ (a ≠ 0)', 'a³ · a⁻⁵'], [
  step('Qual o expoente final, 3 + (−5)?', '-2', 'Mesma base: some os expoentes.', 'A expressão é a⁻².'),
  step('Em 1/aⁿ, qual o valor de n?', '2', 'Passe a potência negativa para o denominador.', 'a⁻² = 1/a².'),
  step('Qual valor de a a expressão proíbe?', '0', 'O denominador é a².', 'a ≠ 0. A restrição continua valendo.')
], [
  ['Potência de potência', 'Para a > 0, simplifique (a²)³/a⁴.', 'a^2|a²', 'Multiplique os expoentes e depois subtraia.', 'a⁶/a⁴ = a².'],
  ['Expoentes fracionários', 'Para a > 0, a^(1/2) · a^(3/2) = aⁿ. Qual o n?', '2', 'Some os expoentes.', '1/2 + 3/2 = 2.'],
  ['Fracionário', 'Calcule 16^(3/4).', '8', 'A raiz quarta de 16 é 2.', '2³ = 8.'],
  ['Parênteses', 'Calcule (−2)² − (−2²).', '8', 'Calcule cada parte: 4 e −4.', '4 − (−4) = 8.'],
  ['Expoente negativo', 'Calcule 2⁻³.', '1/8', 'a⁻ⁿ = 1/aⁿ.', '1/2³ = 1/8.'],
  ['Sem o roteiro', 'Para x > 0, simplifique x^(−1/2) · x^(5/2).', 'x^2|x²', 'Some os expoentes.', '−1/2 + 5/2 = 2.']
]),
lesson('Radicais, módulo e equivalência', [
  '√u é a raiz PRINCIPAL: nunca negativa, e exige u ≥ 0. Por isso √(x²) = |x|, e não simplesmente x.',
  '|x| = x se x ≥ 0 e |x| = −x se x < 0. Então, se x é negativo, √(x²) = −x, que é positivo.',
  'Produto e quociente passam para dentro da raiz quando u e v são ≥ 0: √(uv) = √u·√v. A SOMA não: √(a + b) ≠ √a + √b.',
  'E 1/√u exige u > 0: a condição fica mais forte que a da raiz isolada.'
], '√(x²) = |x| · √(uv) = √u·√v (u, v ≥ 0) · √(a + b) ≠ √a + √b', ['Simplifique √((x − 2)²) para x < 2', '√((x − 2)²), x < 2'], [
  step('Com x < 2, x − 2 é positivo ou negativo?', 'Negativo', 'Compare x com 2.', 'x − 2 < 0.', ['Positivo', 'Negativo']),
  step('Qual expressão é igual a |x − 2| nesse caso?', '2 − x', 'Tome o oposto da expressão negativa.', '|x − 2| = −(x − 2) = 2 − x.', ['x − 2', '2 − x']),
  step('Com x = −1, quanto vale a expressão simplificada?', '3', 'Substitua em 2 − x.', '2 − (−1) = 3 e √((−3)²) = 3.')
], [
  ['Para x negativo', 'Para x = −3, quanto vale √(x²)?', '3', 'A raiz principal é não negativa.', '√9 = 3 = |−3|.'],
  ['O erro da soma', 'Calcule √(9 + 16) − (√9 + √16).', '-2', 'Calcule cada parte.', '5 − 7 = −2. Logo √(a + b) ≠ √a + √b.'],
  ['Fator quadrado', 'Complete √72 = k√2. Qual o k?', '6', 'Extraia o quadrado perfeito: 72 = 36·2.', '√72 = 6√2.'],
  ['Raiz menos x', 'Para x = −3, calcule √(x²) − x.', '6', 'Use √(x²) = |x|.', '3 − (−3) = 6.'],
  ['Raiz no denominador', 'Quantos inteiros t de −2 a 2 tornam 1/√t um número real?', '2', 'Exija t > 0.', 'Servem 1 e 2. O 0 zera o denominador.'],
  ['Sem o roteiro', 'Para x < 0, simplifique √(x²)/x.', '-1', 'Aqui √(x²) = −x.', '−x/x = −1.']
]),
lesson('Reta real, estimativas e precisão', [
  'Entre dois reais diferentes sempre há outro: a média (a + b)/2. Não existe "próximo número" na reta.',
  'Para localizar √u sem calculadora, ache quadrados vizinhos: 9 < 11 < 16 ⇒ 3 < √11 < 4.',
  'Use = só para igualdade exata e ≈ para aproximação. O erro absoluto é |valor exato − aproximado|, e arredondar cedo pode inverter uma comparação.'
], 'a < (a + b)/2 < b · erro absoluto = |exato − aproximado|', ['Localize √2 entre dois decimais', '√2'], [
  step('Quanto vale 1,4²?', '1,96', 'Compare o quadrado com 2.', '1,96 < 2, então 1,4 < √2.'),
  step('Quanto vale 1,5²?', '2,25', 'Compare o quadrado com 2.', '2,25 > 2, então √2 < 1,5.'),
  step('Qual símbolo completa 1,4 ___ √2?', '<', 'Use a comparação dos quadrados positivos.', 'Podemos afirmar exatamente 1,4 < √2 < 1,5.', ['<', '>', '='])
], [
  ['Inteiro vizinho', 'Qual o maior inteiro menor que √30?', '5', 'Compare 30 com 25 e 36.', '5² < 30 < 6², então 5 < √30 < 6.'],
  ['Quadrado vizinho', '11 está entre dois quadrados perfeitos. Qual o maior?', '16', 'Liste 1, 4, 9, 16…', '9 < 11 < 16.'],
  ['Ponto médio', 'Qual o ponto médio entre 1/3 e 1/2?', '5/12', 'Use (a + b)/2 com as frações exatas.', '(5/6)/2 = 5/12.'],
  ['Erro absoluto', 'Qual o erro absoluto exato ao aproximar 1/3 por 0,33?', '1/300', 'Use denominador comum.', '1/300.'],
  ['Comparação', 'Para comparar 7/10 e √(1/2), calcule (7/10)² − 1/2.', '-0,01|-1/100', 'Compare os quadrados: ambos são positivos.', 'Dá −0,01 < 0, então (7/10)² < 1/2 e 7/10 < √(1/2).'],
  ['Sem o roteiro', 'Qual o erro absoluto exato ao aproximar 2/3 por 0,67?', '1/300', 'Compare 200/300 e 201/300.', '1/300.']
]),
phase('Desafio de revisão: números reais', [
  pill('Ensaio geral dos números reais · com o Rubi', [
    'Aqui entram classificação, desigualdades, dízimas, potências, raízes e precisão. A meta é reconhecer qual propriedade usar e quando ela vale.',
    'Preserve as restrições e os valores exatos. Em cada simplificação, pergunte se a expressão continua válida nos mesmos números.',
    'Este desafio fecha a unidade e exige 80% de acertos de primeira.'
  ], 'Restrição primeiro · valor exato · confira o sinal'),
  guided('Não perca a restrição ao simplificar a³/a²', 'a³/a², com a real', [
    step('Qual valor de a deve ser excluído antes de simplificar?', '0', 'O denominador é a².', 'a não pode ser zero.'),
    step('Qual o expoente de a depois de subtrair os expoentes?', '1', 'Subtraia 2 de 3.', 'Fica a¹ = a, para a ≠ 0.'),
    step('Qual valor continua proibido na expressão original?', '0', 'Simplificar não muda o domínio original.', 'O 0 continua excluído.')
  ]),
  task('Valor exato', 'Escreva √(1/4) como fração.', '1/2', 'A raiz principal de 1/4.', 'É 1/2, um racional.'),
  task('Sentido da desigualdade', 'Se a = 1 e b = 3, calcule −2a − (−2b).', '4', 'Calcule −2 e −6.', '−2 − (−6) = 4 > 0, então −2a > −2b.'),
  task('Raiz principal', 'Se x = −4, quanto vale √(x²)?', '4', 'A raiz principal é não negativa.', '√16 = 4.'),
  task('Dízima', 'Qual fração é igual a 0,454545…?', '5/11', 'Use 100t − t = 45.', 't = 45/99 = 5/11.'),
  paper('Potências', 'Para x > 0, simplifique x^(−3/2) · x^(7/2).', 'x^2|x²', 'Some os expoentes.', '−3/2 + 7/2 = 2.'),
  paper('Sem o roteiro', 'Qual o erro absoluto exato ao aproximar 2/3 por 0,67?', '1/300', 'Compare com denominador 300.', '|200/300 − 201/300| = 1/300.')
], {boss: true})
]));

COURSE.fundamentos.units.push(unit('Intervalos e módulo', 'Revisão de conjuntos na reta, união e interseção, distância e desigualdades com módulo.', [
lesson('Intervalos e condições na reta', [
  'Intervalo é um trecho da reta. [a;b] inclui as pontas; (a;b) não inclui. Aqui usamos ponto e vírgula entre os extremos para não confundir com a vírgula decimal. A forma ]a;b[ também vale.',
  'Desigualdade estrita (< ou >) deixa a ponta ABERTA; com ≤ ou ≥ a ponta fica FECHADA.',
  'Infinito não é número: −∞ e +∞ ficam sempre com parêntese. R = (−∞;+∞).',
  '[a;a] é só o ponto a, e (a;a) é vazio.'
], '≤ ou ≥ → colchete · < ou > → parêntese · ∞ → sempre parêntese', ['Traduza −1 < x ≤ 3 em intervalo', '−1 < x ≤ 3'], [
  step('Qual símbolo fica na ponta −1?', '(', 'O sinal é estrito.', 'Ponta aberta: (.', ['(', '[']),
  step('Qual símbolo fica na ponta 3?', ']', 'O sinal ≤ inclui a igualdade.', 'Ponta fechada: ].', [')', ']']),
  step('Escreva o intervalo.', '(-1;3]|]-1;3]', 'Use ponto e vírgula entre os extremos.', 'O conjunto é (−1;3].')
], [
  ['Traduza', 'Escreva 2 ≤ x < 5 em notação de intervalo.', '[2;5)|[2;5[', 'Inclua o 2 e exclua o 5.', '[2;5).'],
  ['Ilimitado', 'Escreva x < −2 em notação de intervalo.', '(-∞;-2)|]-∞;-2[', 'O infinito fica com parêntese e −2 é excluído.', '(−∞;−2).'],
  ['Condição dupla', 'Escreva −3 ≤ x ≤ −1 em notação de intervalo.', '[-3;-1]', 'As duas desigualdades incluem a igualdade.', '[−3;−1].'],
  ['Inteiros no intervalo', 'Quantos inteiros pertencem a (−2;3]?', '5', 'Exclua −2 e inclua 3.', 'Servem −1, 0, 1, 2 e 3: são 5.'],
  ['Intervalo vazio', 'Quantos reais pertencem a (3;3)?', '0', 'Seria x > 3 e x < 3 ao mesmo tempo.', 'Nenhum: o conjunto é vazio.'],
  ['Sem o roteiro', 'Escreva x ≥ 4 em notação de intervalo.', '[4;+∞)|[4;∞)|[4;+∞[|[4;∞[', 'A ponta 4 entra; o infinito não.', '[4;+∞).']
]),
lesson('União, interseção e complemento', [
  'A ∩ B pede pertencer a AMBOS ("e"). A ∪ B pede pertencer a PELO MENOS UM ("ou" inclusivo).',
  'Na interseção, guarde só a sobreposição: se uma ponta é excluída por um deles, ela fica de fora. A união não preenche lacunas.',
  'O complemento em R é tudo o que está fora. Pontas excluídas do intervalo entram no complemento; pontas incluídas, não.'
], '∩ = "e" (só a sobreposição) · ∪ = "ou" (junta tudo)', ['Calcule A ∩ B para A = (−2;3] e B = [1;5)', 'A = (−2;3] · B = [1;5)'], [
  step('Qual a ponta esquerda da sobreposição?', '1', 'Compare os limites inferiores.', 'A sobreposição começa em 1.'),
  step('Qual a ponta direita da sobreposição?', '3', 'Compare os limites superiores.', 'A sobreposição termina em 3.'),
  step('Escreva a interseção, conferindo as pontas.', '[1;3]', 'O 1 e o 3 pertencem aos dois conjuntos?', 'A ∩ B = [1;3].')
], [
  ['Interseção', 'Calcule [0;4) ∩ [2;6].', '[2;4)|[2;4[', 'O 4 é excluído pelo primeiro intervalo.', '[2;4).'],
  ['União', 'Calcule (−1;2] ∪ [1;4).', '(-1;4)|]-1;4[', 'Eles se sobrepõem.', 'A união cobre (−1;4) sem lacuna.'],
  ['Lacuna', 'Quantos inteiros pertencem a [0;1] ∪ [3;4]?', '4', 'A união não cria os pontos entre os dois trechos.', 'Servem 0, 1, 3 e 4: são 4.'],
  ['Complemento', 'Quantas das pontas 1 e 3 pertencem ao complemento de (1;3) em R?', '2', 'Nenhuma ponta pertence ao intervalo aberto.', 'As duas estão fora do intervalo, então estão no complemento.'],
  ['Sobreposição vazia', 'Quantos elementos há em (0;2) ∩ [2;4]?', '0', 'O único ponto de contato é o 2.', 'O 2 é excluído pelo primeiro: a interseção é vazia.'],
  ['Sem o roteiro', 'Calcule [−3;2] ∩ [0;5).', '[0;2]', 'Guarde só os pontos comuns.', '[0;2].']
]),
lesson('Módulo como distância', [
  '|u| = u se u ≥ 0 e |u| = −u se u < 0. O módulo mede a distância até zero, e |a − b| é a distância entre a e b.',
  'Em |x − c|, o c é o centro, e a fórmula muda justamente em x = c. Exemplo: |x − 2| = x − 2 se x ≥ 2, e 2 − x se x < 2.',
  'Não distribua o módulo sobre uma soma: em geral |a + b| ≠ |a| + |b|. O que sempre vale é a desigualdade triangular, |a + b| ≤ |a| + |b|.'
], '|a − b| = distância entre a e b · |a + b| ≤ |a| + |b|', ['Reescreva |x − 3| para x < 3', '|x − 3|, x < 3'], [
  step('Nesse trecho, x − 3 é positivo ou negativo?', 'Negativo', 'Use a condição x < 3.', 'A expressão interna é negativa.', ['Positivo', 'Negativo']),
  step('Qual a expressão sem módulo?', '3 − x', 'Tome o oposto de x − 3.', '−(x − 3) = 3 − x.', ['x − 3', '3 − x']),
  step('Quanto vale em x = −2?', '5', 'Substitua em 3 − x e confira no módulo.', '3 − (−2) = 5 = |−5|.')
], [
  ['Divisão por x', 'Se x < 0, simplifique |x|/x.', '-1', 'Aqui |x| = −x.', '−x/x = −1.'],
  ['Divisão por x', 'Se x > 0, simplifique |x|/x.', '1', 'Aqui |x| = x.', 'x/x = 1.'],
  ['Triangular', 'Calcule |1 + (−1)| − (|1| + |−1|).', '-2', 'Calcule cada lado.', '0 − 2 = −2. Por isso |a + b| ≠ |a| + |b|.'],
  ['Ponto de mudança', 'Em que valor de x a fórmula de |x + 4| muda?', '-4', 'Quando o interior zera.', 'x + 4 = 0 ⇒ x = −4.'],
  ['Distância', 'Qual a distância entre −3/2 e 5/2?', '4', 'Use |a − b|.', '|−3/2 − 5/2| = 4.'],
  ['Sem o roteiro', 'Para x < 1, simplifique |x − 1|/(x − 1).', '-1', 'Aqui x − 1 é negativo.', '−(x − 1)/(x − 1) = −1.']
]),
lesson('Equações e desigualdades de distância', [
  'Leia |x − c| como "distância de x até c". A equação |x − c| = r tem soluções c − r e c + r. |x − c| < r é o trecho interno (c − r; c + r), e |x − c| > r são os dois trechos externos.',
  'Com ≤ ou ≥, as pontas entram. Um módulo nunca é negativo: |x − c| = −3 não tem solução, e |x − c| ≤ 0 só vale em x = c.',
  'Em |x + c|, o centro é −c. Antes de escrever o conjunto, identifique centro, raio, dentro ou fora, e se as pontas entram.'
], '|x − c| < r ⇔ c − r < x < c + r', ['Resolva |x + 1| ≤ 2 pela distância', '|x + 1| ≤ 2'], [
  step('Qual o centro?', '-1', 'Escreva x + 1 como x − (−1).', 'O centro é −1.'),
  step('Qual o extremo esquerdo?', '-3', 'Subtraia o raio 2 do centro −1.', '−1 − 2 = −3.'),
  step('Escreva o intervalo solução.', '[-3;1]', 'O outro extremo é −1 + 2, e ≤ inclui as pontas.', '[−3;1].')
], [
  ['Dentro', 'Escreva a solução de |x − 2| < 3 como intervalo.', '(-1;5)|]-1;5[', 'Centro 2, raio 3, pontas abertas.', '(−1;5).'],
  ['Equação', 'Qual a menor solução de |x − 4| = 2?', '2', 'As soluções são centro ± raio.', '2 e 6; a menor é 2.'],
  ['Fora', 'Quantos inteiros de −2 a 2 satisfazem |x| > 1?', '2', 'Procure distância maior que 1 até 0.', 'Servem −2 e 2.'],
  ['Sem solução', 'Quantas soluções reais tem |x − 1| = −3?', '0', 'Um módulo nunca é negativo.', 'Nenhuma.'],
  ['Um único ponto', 'Qual a única solução de |x + 3| ≤ 0?', '-3', 'O módulo precisa valer zero.', 'x + 3 = 0 ⇒ x = −3.'],
  ['Sem o roteiro', 'Escreva a solução de |x − 3| ≤ 4 como intervalo.', '[-1;7]', 'Centro 3, raio 4, pontas incluídas.', '[−1;7].']
]),
phase('Desafio de revisão: intervalos e módulo', [
  pill('Três jeitos de dizer a mesma coisa · com o Rubi', [
    'Desigualdade, intervalo e distância descrevem os mesmos conjuntos. Treine a ir de um a outro sem hesitar.',
    'Na resolução, justifique as pontas e teste um ponto do conjunto. Isso evita respostas quase certas que mudam o domínio.',
    'Este desafio fecha a unidade e exige 80% de acertos de primeira.'
  ], 'desigualdade ⇄ intervalo ⇄ distância'),
  guided('Combine x ≥ −1 e |x| < 2', 'x ≥ −1 e |x| < 2', [
    step('Qual a ponta esquerda de |x| < 2?', '-2', 'São os pontos a menos de 2 unidades de zero.', 'Isolada, a condição dá (−2;2).'),
    step('Com a condição x ≥ −1, qual passa a ser a ponta esquerda?', '-1', 'Faça a interseção.', 'O trecho comum começa em −1.'),
    step('Escreva o intervalo final.', '[-1;2)|[-1;2[', 'Inclua −1 e exclua 2.', '[−1;2).')
  ]),
  task('Interseção vazia', 'Quantos elementos há em (−2;1) ∩ [1;4]?', '0', 'O único ponto de contato é o 1.', 'O 1 é excluído pelo primeiro: não há ponto comum.'),
  task('Interseção', 'Calcule [−4;1] ∩ [−2;6).', '[-2;1]', 'Guarde só os pontos comuns.', '[−2;1].'),
  task('Por trechos', 'Para x > 2, simplifique |x − 2|/(x − 2).', '1', 'Aqui x − 2 é positivo.', '(x − 2)/(x − 2) = 1.'),
  task('Ponto de mudança', 'Em que valor de x a fórmula de |2x − 6| muda?', '3', 'O interior precisa zerar.', '2x − 6 = 0 ⇒ x = 3.'),
  paper('Distância', 'Escreva a solução de |x + 2| < 5 como intervalo.', '(-7;3)|]-7;3[', 'Centro −2, raio 5, pontas abertas.', '(−7;3).'),
  paper('Sem o roteiro', 'Quantos dos pontos −1 e 7 pertencem ao complemento de [−1;7] em R?', '0', 'As duas pontas pertencem ao conjunto original.', 'Nenhuma das duas pertence ao complemento.')
], {boss: true})
]));
}
