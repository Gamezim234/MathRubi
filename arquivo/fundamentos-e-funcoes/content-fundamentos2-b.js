'use strict';
// Fundamentos e funções · unidades 5 e 6: transformações, composição e inversas; revisão trigonométrica.
// Linha de prática: [título, enunciado, resposta, pista, explicação, alternativas?]
{
const lesson = (name, lines, rule, model, steps, rows, opts) => phase(name, [
  pill(name + ' · com o Rubi', lines, rule),
  guided(model[0], model[1], steps),
  ...rows.map((r, i) => (i === rows.length - 1 ? paper : task)(r[0], r[1], r[2], r[3], r[4], r[5]))
], opts);
const YN = ['Sim', 'Não'];

COURSE.fundamentos.units.push(unit('Transformações, composição e inversas', 'Mover, refletir e esticar gráficos; compor funções e desfazer uma função com a sua inversa.', [
lesson('Translações, reflexões e escalas', [
  'Dado o gráfico de f, dá para desenhar muitos outros sem refazer contas. Basta saber o que cada mudança na fórmula faz.',
  'f(x) + k sobe o gráfico k unidades (desce se k < 0). f(x − h) desloca h unidades para a DIREITA: o sinal parece enganar, mas é assim.',
  '−f(x) reflete em torno do eixo x; f(−x) reflete em torno do eixo y.',
  'c·f(x) estica na vertical (c > 1) ou comprime (0 < c < 1). Já f(cx) estica ou comprime na horizontal, pelo fator 1/c.',
  'Regra de bolso: o que acontece DENTRO dos parênteses age na horizontal e "ao contrário"; o que acontece fora age na vertical.'
], 'f(x − h) + k: h unidades à direita e k para cima', ['Gráfico de g(x) = (x − 2)² + 3 a partir de f(x) = x²', 'g(x) = f(x − 2) + 3'], [
  step('Quantas unidades g desloca f para a direita?', '2', 'Olhe o número dentro dos parênteses, com o sinal trocado.', 'x − 2 desloca 2 unidades para a direita.'),
  step('Quantas unidades para cima?', '3', 'Olhe o número somado por fora.', '+3 sobe 3 unidades.'),
  step('Qual o valor mínimo de g?', '3', 'O vértice de f estava em (0; 0).', 'O vértice vai para (2; 3), e o mínimo de g é 3.')
], [
  ['Direita ou esquerda', 'g(x) = f(x + 4). Quantas unidades g desloca f para a ESQUERDA?', '4', 'x + 4 = x − (−4).', 'Desloca 4 unidades para a esquerda.'],
  ['Vértice', 'Qual o x do vértice de y = (x + 1)² − 5?', '-1', 'Zere o que está dentro dos parênteses.', 'x + 1 = 0 ⇒ x = −1.'],
  ['Reflexão no eixo x', 'O ponto (3; 2) está no gráfico de f. Qual a ordenada do ponto de abscissa 3 no gráfico de −f?', '-2', '−f troca o sinal da altura.', 'O ponto vira (3; −2).'],
  ['Reflexão no eixo y', 'O ponto (3; 2) está no gráfico de f. Em f(−x), qual a abscissa do ponto de altura 2?', '-3', 'Precisa de −x = 3.', 'Em x = −3: f(−(−3)) = f(3) = 2.'],
  ['Escala', 'f(x) = x². Em g(x) = 2f(x), calcule g(3).', '18', 'Calcule f(3) e dobre.', '2·9 = 18.'],
  ['Sem o roteiro', 'Se f(1) = 5, quanto vale h(3) em h(x) = f(x − 2) + 1?', '6', 'Qual x faz x − 2 = 1?', 'h(3) = f(1) + 1 = 6.']
]),
lesson('Composição de funções', [
  'Composição é uma função alimentando outra: (f∘g)(x) = f(g(x)). Primeiro g, depois f. Leia de dentro para fora.',
  'Exemplo: f(x) = x² e g(x) = x + 3. Então f(g(x)) = (x + 3)², mas g(f(x)) = x² + 3. A ordem muda o resultado!',
  'Para calcular um valor, vá por camadas: primeiro o de dentro, depois o de fora.',
  'No Cálculo você vai "enxergar" composições: sen(x²) é o seno aplicado a x²; √(1 + x) é a raiz aplicada a 1 + x. A regra da cadeia depende desse olhar.'
], '(f∘g)(x) = f(g(x)): de dentro para fora', ['f(x) = x² e g(x) = x + 3. Calcule f(g(2))', 'f(x) = x² · g(x) = x + 3'], [
  step('Quanto vale g(2)?', '5', 'Camada de dentro.', 'g(2) = 2 + 3 = 5.'),
  step('Quanto vale f(5)?', '25', 'Agora a camada de fora.', 'f(5) = 25.'),
  step('Agora na ordem inversa: quanto vale g(f(2))?', '7', 'Primeiro f(2) = 4.', 'g(4) = 7. A ordem importa.')
], [
  ['Calcule', 'f(x) = 2x + 1 e g(x) = x². Calcule f(g(3)).', '19', 'g(3) = 9.', 'f(9) = 19.'],
  ['Ordem', 'Com as mesmas funções, calcule g(f(3)).', '49', 'f(3) = 7.', 'g(7) = 49.'],
  ['Expressão', 'f(x) = x² + 1 e g(x) = 3x. Escreva f(g(x)).', '9x^2+1|9x²+1|1+9x^2|1+9x²', 'Troque x por 3x em f.', '(3x)² + 1 = 9x² + 1.'],
  ['Decomponha', 'h(x) = √(x² + 4) pode ser f(g(x)) com g(x) = x² + 4. Qual é f?', 'f(u) = √u', 'O que é feito DEPOIS de x² + 4?', 'Depois de calcular x² + 4, tira-se a raiz.', ['f(u) = u²', 'f(u) = √u', 'f(u) = u + 4']],
  ['Camadas', 'Em sen(√x), qual função é aplicada PRIMEIRO a x?', '√', 'Comece pelo que está mais dentro.', 'Primeiro √x; depois o seno.', ['sen', '√']],
  ['Sem o roteiro', 'f(x) = x − 1 e g(x) = x². Resolva f(g(x)) = 8 e dê a solução positiva.', '3', 'f(g(x)) = x² − 1.', 'x² − 1 = 8 ⇒ x² = 9 ⇒ x = 3.']
]),
lesson('Domínio da composição', [
  'Para f(g(x)) fazer sentido, duas coisas: x precisa estar no domínio de g, e g(x) precisa estar no domínio de f.',
  'Exemplo: f(u) = √u e g(x) = x − 4. Então f(g(x)) = √(x − 4), com domínio x ≥ 4.',
  'Cuidado: simplificar pode esconder restrições. Com f(x) = √x e g(x) = x², f(g(x)) = √(x²) = |x| vale para todo real. Mas g(f(x)) = (√x)² = x vale só para x ≥ 0.',
  'Na dúvida, siga as duas perguntas na ordem: onde g existe? E onde g(x) cai dentro do domínio de f?'
], 'Dom(f∘g) = {x ∈ Dom(g) : g(x) ∈ Dom(f)}', ['Domínio de f(g(x)) com f(u) = 1/u e g(x) = x − 2', 'f(u) = 1/u · g(x) = x − 2'], [
  step('Qual valor de u = g(x) a função f não aceita?', '0', 'Onde 1/u não existe?', 'f não aceita u = 0.'),
  step('Para qual x temos g(x) = 0?', '2', 'Resolva x − 2 = 0.', 'x = 2.'),
  step('Quantos reais ficam fora do domínio da composta?', '1', 'Só o x que leva g a zero.', 'Apenas x = 2: o domínio é R menos {2}.')
], [
  ['Valores proibidos', 'f(u) = 1/u e g(x) = x² − 9. Quantos reais x fazem g(x) = 0?', '2', 'Resolva x² − 9 = 0.', 'x = 3 e x = −3: ficam 2 valores fora.'],
  ['Domínio', 'f(u) = √u e g(x) = x + 6. Escreva o domínio de f(g(x)) como intervalo.', '[-6;+∞)|[-6;∞)|[-6;+∞[|[-6;∞[', 'Exija g(x) ≥ 0.', 'x + 6 ≥ 0 ⇒ x ≥ −6.'],
  ['Composta restrita', 'f(x) = √x e g(x) = x². Quanto vale f(g(−3))?', '3', 'g(−3) = 9.', '√9 = 3. Note que √(x²) = |x|.'],
  ['Existe?', 'f(x) = √x e g(x) = x². A expressão g(f(−4)) existe?', 'Não existe', 'Primeiro f(−4).', '√(−4) não é real, então g(f(−4)) não existe.', ['Existe', 'Não existe']],
  ['Dois filtros', 'f(u) = √u e g(x) = 4 − x². Quantos inteiros pertencem ao domínio de f(g(x))?', '5', 'Exija 4 − x² ≥ 0.', '−2 ≤ x ≤ 2: são −2, −1, 0, 1, 2.'],
  ['Sem o roteiro', 'f(u) = √u e g(x) = x² − 1. Qual o menor inteiro positivo do domínio de f(g(x))?', '1', 'Exija x² − 1 ≥ 0.', 'x² ≥ 1; o menor inteiro positivo é 1.']
]),
lesson('Injetividade e restrição de domínio', [
  'Uma função é injetiva quando valores diferentes de x dão valores diferentes de f(x). Só ela pode ser desfeita sem ambiguidade.',
  'Teste da reta horizontal: se alguma reta horizontal corta o gráfico duas vezes ou mais, f não é injetiva.',
  'f(x) = x² não é injetiva em R, pois f(2) = f(−2) = 4. Mas, restrita a [0; +∞), ela se torna injetiva.',
  'Funções estritamente crescentes (ou estritamente decrescentes) são injetivas: retas não horizontais, x³ e √x são exemplos.',
  'Restringir o domínio é "escolher um lado" para poder inverter. É por isso que a inversa de x² (com x ≥ 0) é √x, e não ±√x.'
], 'Injetiva: f(a) = f(b) ⇒ a = b', ['f(x) = x² é injetiva em R?', 'f(x) = x²'], [
  step('Quanto vale f(3)?', '9', 'Eleve 3 ao quadrado.', 'f(3) = 9.'),
  step('Quanto vale f(−3)?', '9', 'Eleve −3 ao quadrado.', 'f(−3) = 9.'),
  step('Então f é injetiva em R?', 'Não', 'Entradas diferentes deram a mesma saída?', 'Sim, 3 e −3 dão 9, então f não é injetiva em R.', YN)
], [
  ['Contraexemplo', 'f(x) = x². Qual x ≠ 3 tem f(x) = f(3)?', '-3', 'Procure o número oposto.', 'f(−3) = 9 = f(3).'],
  ['Módulo', 'f(x) = |x| é injetiva em R?', 'Não', 'Compare f(2) e f(−2).', 'Ambas valem 2.', YN],
  ['Cúbica', 'Existe algum x real diferente de 2 com x³ = 8?', 'Não', 'x³ é estritamente crescente.', 'Só x = 2. A função x³ é injetiva.', YN],
  ['Restrinja', 'Para tornar f(x) = (x − 2)² injetiva, restringimos a x ≥ ?', '2', 'Escolha um lado do vértice.', 'O vértice está em x = 2; usamos x ≥ 2 (ou x ≤ 2).'],
  ['Reta', 'f(x) = −3x + 1. Se f(a) = f(2), quanto vale a?', '2', 'Retas não horizontais são injetivas.', 'a = 2.'],
  ['Sem o roteiro', 'Quantos números reais x satisfazem x⁴ = 16?', '2', 'Pense em x = 2 e x = −2.', 'x = ±2: duas soluções, logo x⁴ não é injetiva em R.']
]),
lesson('Função inversa', [
  'A inversa f⁻¹ desfaz f: se f(a) = b, então f⁻¹(b) = a. Entradas e saídas trocam de papel.',
  'Para achar a inversa: 1) escreva y = f(x); 2) isole x em função de y; 3) troque os nomes x e y.',
  'O domínio de f⁻¹ é a imagem de f, e a imagem de f⁻¹ é o domínio de f.',
  'Os gráficos de f e f⁻¹ são simétricos em relação à reta y = x. E atenção: f⁻¹ NÃO é 1/f. O "−1" aqui indica função inversa.'
], 'f⁻¹(f(x)) = x e f(f⁻¹(y)) = y', ['Inversa de f(x) = 2x + 3', 'f(x) = 2x + 3'], [
  step('Isole x em y = 2x + 3. Então x = (y − 3)/?', '2', 'Passe o 3 e depois divida.', 'x = (y − 3)/2.'),
  step('Com a troca de nomes, f⁻¹(x) = (x − 3)/2. Quanto vale f⁻¹(7)?', '2', 'Substitua x = 7.', '(7 − 3)/2 = 2.'),
  step('Confira: quanto vale f(2)?', '7', 'Substitua x = 2 em 2x + 3.', 'f(2) = 7: f desfaz o que f⁻¹ fez.')
], [
  ['Desfazendo', 'f(x) = x + 5. Calcule f⁻¹(12).', '7', 'Que número somado a 5 dá 12?', '7.'],
  ['Inversa afim', 'f(x) = 3x − 6. Calcule f⁻¹(9).', '5', 'Resolva 3x − 6 = 9.', 'x = 5.'],
  ['Notação', 'f(x) = 4x. Quanto vale f⁻¹(8)?', '2', 'f⁻¹ é a inversa, não o inverso multiplicativo.', '4x = 8 ⇒ x = 2.'],
  ['Domínio da inversa', 'f(x) = √x tem imagem [0; +∞). Escreva o domínio de f⁻¹.', '[0;+∞)|[0;∞)|[0;+∞[|[0;∞[', 'Domínio da inversa = imagem de f.', 'Mesmo conjunto: [0; +∞).'],
  ['Inversa da raiz', 'Para f(x) = √x, escreva f⁻¹(x) (com x ≥ 0).', 'x^2|x²', 'Isole x em y = √x.', 'x = y², então f⁻¹(x) = x².'],
  ['Sem o roteiro', 'f(x) = (x + 1)/2. Calcule f⁻¹(4).', '7', 'Resolva (x + 1)/2 = 4.', 'x + 1 = 8 ⇒ x = 7.']
]),
phase('Desafio de revisão: composição e inversas', [
  pill('Desfaça o que foi feito · com o Rubi', [
    'Aqui você mistura as três ideias: mover gráficos, compor funções e desfazê-las.',
    'Para compor, vá de dentro para fora. Para inverter, isole x e troque os nomes. Para o domínio, confira g primeiro e depois f.',
    'Este desafio fecha a unidade e exige 80% de acertos de primeira.'
  ], 'f∘g: de dentro para fora · f⁻¹: isole x'),
  guided('f(x) = 3x − 1 e g(x) = x²', 'f(x) = 3x − 1 · g(x) = x²', [
    step('Quanto vale f(2)?', '5', 'Substitua x = 2.', 'f(2) = 5.'),
    step('Quanto vale g(f(2))?', '25', 'g(5).', '25.'),
    step('Quanto vale f⁻¹(5)?', '2', 'Resolva 3x − 1 = 5.', 'x = 2: a inversa devolve o valor de partida.')
  ]),
  task('Translação', 'Qual a abscissa do vértice de y = (x − 3)² + 2?', '3', 'Zere o que está dentro dos parênteses.', 'x − 3 = 0 ⇒ x = 3.'),
  task('Composta', 'f(x) = x + 2 e g(x) = x². Escreva f(g(x)).', 'x^2+2|x²+2|2+x^2|2+x²', 'Troque x por x² em f.', 'f(g(x)) = x² + 2.'),
  task('Domínio', 'f(u) = √u e g(x) = x − 5. Escreva o domínio de f(g(x)).', '[5;+∞)|[5;∞)|[5;+∞[|[5;∞[', 'Exija x − 5 ≥ 0.', 'x ≥ 5.'),
  task('Inversa', 'f(x) = 5x − 10. Calcule f⁻¹(15).', '5', 'Resolva 5x − 10 = 15.', 'x = 5.'),
  paper('Inversa e composta', 'f(x) = x², com x ≥ 0. Calcule f⁻¹(f(7)).', '7', 'f⁻¹ desfaz f.', 'f⁻¹(f(7)) = 7.'),
  paper('Sem o roteiro', 'f(x) = 2x − 4. Resolva f(f(x)) = 0.', '3', 'Escreva f(f(x)) = 2(2x − 4) − 4.', '4x − 12 = 0 ⇒ x = 3.')
], {boss: true})
]));

COURSE.fundamentos.units.push(unit('Revisão trigonométrica', 'Radianos, círculo trigonométrico, valores notáveis, identidades, gráficos e equações essenciais.', [
lesson('Radianos e o círculo', [
  'No Cálculo, ângulos são medidos em radianos. 1 radiano é o ângulo cujo arco tem o mesmo comprimento do raio.',
  'Volta completa: 2π rad = 360°. Meia volta: π rad = 180°. Para converter graus em radianos, multiplique por π/180; no sentido contrário, por 180/π.',
  'No círculo de raio 1, o ponto de ângulo θ é (cos θ; sen θ). Daí vem a identidade sen²θ + cos²θ = 1.',
  'O arco de um ângulo θ num círculo de raio r mede s = r·θ, só quando θ está em radianos.',
  'Por que radianos? Porque só neles a derivada de sen x é cos x, e vale o limite sen x / x → 1.'
], 'π rad = 180°', ['Converta 60° para radianos', '60°'], [
  step('Qual o fator de conversão de graus para radianos?', 'π/180', 'Radianos = graus · fator.', 'Multiplica-se por π/180.', ['π/180', '180/π']),
  step('60·π/180 = π/?', '3', 'Simplifique 60/180.', '60/180 = 1/3, então 60° = π/3.'),
  step('Quantos graus tem π/4?', '45', 'Multiplique por 180/π.', '180/4 = 45.')
], [
  ['Graus para radianos', 'Converta 90° para radianos (escreva como π/algo).', 'π/2', 'Multiplique por π/180.', '90/180 = 1/2, então π/2.'],
  ['Radianos para graus', 'Converta 5π/6 rad para graus.', '150', 'Multiplique por 180/π.', '5·180/6 = 150.'],
  ['Arco', 'Um arco tem raio 2 e ângulo π/3. Calcule o comprimento s = r·θ.', '2π/3', 'Multiplique 2 por π/3.', 's = 2π/3.'],
  ['Voltas', 'Quantas voltas completas são 4π rad?', '2', 'Uma volta é 2π.', '4π / 2π = 2.'],
  ['No círculo', 'Qual a ordenada do ponto do círculo unitário em θ = π (isto é, sen π)?', '0', 'O ponto é (−1; 0).', 'sen π = 0.'],
  ['Sem o roteiro', 'Converta 315° para radianos, na forma aπ/b.', '7π/4', 'Simplifique 315/180.', '315/180 = 7/4, então 7π/4.']
]),
lesson('Valores notáveis e sinais', [
  'Decore só três ângulos do primeiro quadrante e o resto vem por simetria: π/6 (30°), π/4 (45°) e π/3 (60°).',
  'Truque: sen(π/6), sen(π/4), sen(π/3) valem √1/2, √2/2 e √3/2, ou seja, 1/2, √2/2 e √3/2. O cosseno é a mesma lista ao contrário. E tg x = sen x / cos x.',
  'Sinais por quadrante: no 1º tudo é positivo; no 2º só o seno; no 3º só a tangente; no 4º só o cosseno.',
  'Para outros ângulos, use o ângulo de referência (a distância até o eixo x) e ajuste o sinal.',
  'Atenção: a tangente não existe quando cos x = 0, isto é, em π/2 + kπ.'
], 'sen: 1/2, √2/2, √3/2 · cos: √3/2, √2/2, 1/2', ['Calcule sen(5π/6)', 'sen(5π/6)'], [
  step('O ângulo de referência é π − 5π/6 = π/?', '6', 'Subtraia de π.', 'É π/6.'),
  step('Quanto vale sen(π/6)?', '1/2', 'Valor notável.', '1/2.'),
  step('O seno no 2º quadrante é...', 'Positivo', 'No 2º quadrante só o seno é positivo.', 'Positivo. Logo sen(5π/6) = 1/2.', ['Positivo', 'Negativo'])
], [
  ['Valor notável', 'Calcule cos(π/3).', '1/2', 'O cosseno é a lista do seno ao contrário.', 'cos(π/3) = 1/2.'],
  ['Raiz', 'Calcule sen(π/4).', '√2/2|√(2)/2|(√2)/2|1/√2|1/√(2)|2/√2', 'Valor notável do meio.', 'sen(π/4) = √2/2.'],
  ['2º quadrante', 'Calcule cos(2π/3).', '-1/2', 'Referência π/3; o cosseno é negativo no 2º quadrante.', '−cos(π/3) = −1/2.'],
  ['3º quadrante', 'Calcule sen(7π/6).', '-1/2', 'Referência π/6; o seno é negativo no 3º quadrante.', '−sen(π/6) = −1/2.'],
  ['Tangente', 'Calcule tg(π/4).', '1', 'tg = sen/cos.', 'Os dois valem √2/2, então tg = 1.'],
  ['Sem o roteiro', 'Calcule cos(π) + sen(3π/2).', '-2', 'cos π = −1 e sen(3π/2) = −1.', '−1 + (−1) = −2.']
]),
lesson('Identidades fundamentais', [
  'Identidade é uma igualdade verdadeira para todos os valores em que os dois lados existem. A mais importante: sen²x + cos²x = 1. Vem direto do círculo.',
  'Dela e de tg x = sen x / cos x saem as outras. Não precisa decorar tudo, mas essas você vai usar sempre.',
  'Arco duplo: sen 2x = 2 sen x cos x e cos 2x = cos²x − sen²x = 1 − 2 sen²x. Essa última, 1 − cos 2x = 2 sen²x, é a estrela dos limites trigonométricos.',
  'Soma de arcos: sen(a + b) = sen a cos b + cos a sen b. Cuidado: sen(a + b) NÃO é sen a + sen b.'
], 'sen²x + cos²x = 1 · sen 2x = 2 sen x cos x · cos 2x = 1 − 2 sen²x', ['Se sen x = 3/5 no 1º quadrante, ache cos x', 'sen x = 3/5'], [
  step('Quanto vale sen²x?', '9/25', 'Eleve 3/5 ao quadrado.', '9/25.'),
  step('Quanto vale cos²x = 1 − 9/25?', '16/25', 'Use sen² + cos² = 1.', '16/25.'),
  step('Qual o valor de cos x, positivo no 1º quadrante?', '4/5', 'Tire a raiz de 16/25.', '4/5.')
], [
  ['Pitágoras', 'Se cos x = 1/2, quanto vale sen²x?', '3/4', 'Use sen² = 1 − cos².', '1 − 1/4 = 3/4.'],
  ['Arco duplo', 'Se sen x = 3/5 e cos x = 4/5, calcule sen 2x.', '24/25', 'sen 2x = 2 sen x cos x.', '2·(3/5)·(4/5) = 24/25.'],
  ['Cosseno do dobro', 'Se sen x = 1/2, calcule cos 2x = 1 − 2 sen²x.', '1/2', 'Calcule 2·(1/2)².', '1 − 2/4 = 1/2.'],
  ['Erro clássico', 'sen(a + b) = sen a + sen b vale para todos a e b?', 'Não', 'Teste a = b = π/2.', 'sen π = 0, mas sen(π/2) + sen(π/2) = 2.', YN],
  ['Tangente', 'Se sen x = 1/2 e cos x = √3/2, calcule tg x.', '√3/3|√(3)/3|(√3)/3|1/√3|1/√(3)', 'tg = sen/cos.', '(1/2)/(√3/2) = 1/√3 = √3/3.'],
  ['Sem o roteiro', 'Simplifique (1 − cos 2x)/sen²x para sen x ≠ 0.', '2', 'Use 1 − cos 2x = 2 sen²x.', 'O quociente é 2.']
]),
lesson('Domínio, período e gráficos', [
  'sen e cos têm domínio R, imagem [−1; 1] e período 2π. A tangente exclui π/2 + kπ, tem imagem R e período π.',
  'Em y = A·sen(Bx): amplitude |A| e período 2π/|B|. Em y = A·sen(Bx + C) + D, o gráfico ainda desloca −C/B na horizontal e fica centrado na linha y = D.',
  'O seno é ímpar, sen(−x) = −sen x; o cosseno é par, cos(−x) = cos x. Isso poupa contas.',
  'Período p quer dizer f(x + p) = f(x). Conhecendo um período do gráfico, você conhece o gráfico todo.',
  'A tangente tem assíntotas verticais em π/2 + kπ.'
], 'y = A·sen(Bx): amplitude |A|, período 2π/|B|', ['Período e máximo de y = 3 sen(2x)', 'y = 3 sen(2x)'], [
  step('Qual a amplitude?', '3', 'É o |A|.', '3.'),
  step('Qual o período, 2π/2?', 'π', 'Divida 2π por 2.', 'O período é π.'),
  step('Qual o valor máximo?', '3', 'Sem deslocamento vertical, o máximo é a amplitude.', '3.')
], [
  ['Amplitude', 'Qual o maior valor de y = 5 cos x?', '5', 'O cosseno vai até 1.', '5·1 = 5.'],
  ['Período', 'Qual o período de y = sen(4x)?', 'π/2', 'Divida 2π por 4.', '2π/4 = π/2.'],
  ['Linha média', 'Qual o menor valor de y = 2 sen x + 3?', '1', 'O seno vai até −1.', '2·(−1) + 3 = 1.'],
  ['Paridade', 'Calcule cos(−π/3).', '1/2', 'O cosseno é par.', 'cos(π/3) = 1/2.'],
  ['Tangente', 'Qual o período de tg x? (escreva em função de π)', 'π', 'É menor que o do seno.', 'O período da tangente é π.'],
  ['Sem o roteiro', 'Qual o período de y = 4 sen(x/2)? (múltiplo de π)', '4π', 'Divida 2π por 1/2.', '2π ÷ (1/2) = 4π.']
]),
lesson('Equações trigonométricas essenciais', [
  'Para resolver sen x = c, ache o ângulo "famoso" e use a simetria. Em [0; 2π], em geral há duas soluções.',
  'sen x = sen α ⇒ x = α ou x = π − α (mais múltiplos de 2π). cos x = cos α ⇒ x = α ou x = −α. tg x = tg α ⇒ x = α + kπ.',
  'Exemplo: sen x = 1/2 em [0; 2π] tem x = π/6 ou x = 5π/6.',
  'Se aparecer sen² ou cos², trate como uma equação do 2º grau com sen x = u. Mas lembre: u precisa estar entre −1 e 1.'
], 'sen x = sen α ⇒ x = α ou x = π − α (+ 2kπ)', ['Resolva sen x = 1/2 em [0; 2π]', 'sen x = 1/2'], [
  step('Qual a solução no 1º quadrante?', 'π/6', 'Valor notável.', 'x = π/6.'),
  step('A outra solução é π − π/6 = ?', '5π/6', 'Subtraia de π.', '5π/6.'),
  step('Quantas soluções há em [0; 2π]?', '2', 'Conte as duas encontradas.', 'Duas soluções.')
], [
  ['Cosseno', 'Resolva cos x = 1/2 em [0; π].', 'π/3', 'Valor notável.', 'x = π/3.'],
  ['Seno máximo', 'Resolva sen x = 1 em [0; 2π].', 'π/2', 'Onde o seno chega ao máximo?', 'x = π/2.'],
  ['Sem solução', 'A equação sen x = 2 tem solução real?', 'Não', 'O seno fica entre −1 e 1.', 'Não há solução.', YN],
  ['Soma das soluções', 'Resolva sen x = √2/2 em [0; 2π]. Qual a soma das duas soluções?', 'π', 'As soluções são π/4 e π − π/4.', 'π/4 + 3π/4 = π.'],
  ['Quadrática', 'Resolva sen²x = 1/4 em [0; π/2].', 'π/6', 'Em [0; π/2] o seno é positivo: sen x = 1/2.', 'x = π/6.'],
  ['Sem o roteiro', 'Resolva tg x = 1 em [0; π].', 'π/4', 'Valor notável.', 'x = π/4.']
]),
phase('Desafio de revisão: trigonometria', [
  pill('Seno, cosseno e o que vale em cada quadrante · com o Rubi', [
    'Mistura geral: conversão de ângulos, valores notáveis, identidades, período e equações.',
    'Em dúvida, volte ao círculo unitário: ele responde sinais, valores e identidades de uma vez.',
    'Este desafio fecha a unidade e exige 80% de acertos de primeira.'
  ], 'sen²x + cos²x = 1 · 1 − cos 2x = 2 sen²x'),
  guided('Calcule sen 2x com cos x = 3/5 no 1º quadrante', 'cos x = 3/5', [
    step('Quanto vale sen²x = 1 − 9/25?', '16/25', 'Use sen² + cos² = 1.', '16/25.'),
    step('Qual é sen x, positivo no 1º quadrante?', '4/5', 'Tire a raiz.', '4/5.'),
    step('Quanto vale sen 2x = 2 sen x cos x?', '24/25', 'Multiplique 2·(4/5)·(3/5).', '24/25.')
  ]),
  task('Radianos', 'Converta 210° para radianos (aπ/b).', '7π/6', 'Simplifique 210/180.', '210/180 = 7/6.'),
  task('Valor', 'Calcule sen(4π/3).', '-√3/2|-√(3)/2|-(√3)/2|-(√3/2)', 'Referência π/3 no 3º quadrante.', 'O seno é negativo no 3º quadrante: −√3/2.'),
  task('Identidade', 'Se cos x = 0,6, quanto vale 1 − cos²x?', '0,64|16/25', '1 − cos² = sen².', '1 − 0,36 = 0,64.'),
  task('Período', 'Qual o período de y = cos(3x)?', '2π/3', 'Divida 2π por 3.', '2π/3.'),
  paper('Equação', 'Resolva cos x = −1/2 em [0; π].', '2π/3', 'Ângulo de referência π/3, no 2º quadrante.', 'x = π − π/3 = 2π/3.'),
  paper('Sem o roteiro', 'Resolva sen x = −1 em [0; 2π].', '3π/2', 'Onde o seno chega ao mínimo?', 'x = 3π/2.')
], {boss: true})
]));
}
