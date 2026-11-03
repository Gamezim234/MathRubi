'use strict';
// Limites · unidades 3 a 8 (Continuidade → Revisão da seção). Autoria própria, baseada nos tópicos do MAC210.

// ───────────────────────── UNIDADE 3 · CONTINUIDADE ─────────────────────────
COURSE.limites.units.push(unit('Continuidade', 'Conecte o limite ao valor da função', [
  phase('Três condições', [
    pill('Desenhar sem tirar o lápis', [
      'Uma função é contínua em x = a quando o gráfico passa por ali sem buraco, sem salto e sem “explodir”.',
      'Para checar com rigor, são três perguntas: f(a) existe? O limite quando x → a existe? E os dois valores são iguais?',
      'Macete: continuidade em a significa lim x→a f(x) = f(a). O limite “promete” um valor; a função tem de cumprir a promessa.'
    ], 'contínua em a  ⇔  lim x→a f(x) = f(a)'),
    guided('Buraco ou promessa cumprida?', 'f(x) = x + 4 para x ≠ 2;   f(2) = 1', [
      step('Quanto vale lim x→2 f(x)? (olhe só os pontos vizinhos)', '6', 'Perto de 2, use f(x) = x + 4.', 'Os vizinhos de 2 seguem x + 4, que tende a 6.'),
      step('Quanto vale f(2)?', '1', 'O valor no ponto está escrito no enunciado.', 'O valor isolado é f(2) = 1.'),
      step('Limite e valor da função coincidem?', 'Não', 'Compare 6 com 1.', 'Como 6 ≠ 1, a função tem um buraco em x = 2: é descontínua.', ['Sim', 'Não']),
      step('Qual valor de f(2) fecharia o buraco?', '6', 'A função precisa cumprir a promessa do limite.', 'Definindo f(2) = 6, o limite e o valor coincidem.')
    ], 'Contínua em a = limite igual ao valor. Aqui 6 ≠ 1, então havia um buraco.'),
    task('Continuidade por substituição', 'f(x) = 3x − 2 é contínua em x = 4.   lim x→4 f(x) = ?', '10', 'Se é contínua, o limite é o valor da função.', 'Contínua em 4 significa lim = f(4) = 3·4 − 2 = 10.'),
    task('Feche o buraco', 'f(x) = x + 4 para x ≠ 2;   f(2) = k.   Qual k torna f contínua em 2?', '6', 'k precisa ser igual ao limite em 2.', 'O limite é 6, então k = 6.'),
    task('Qual condição falhou?', 'f(x) = (x² − 1)/(x − 1)   em   x = 1', 'f(1) não existe', 'Tente calcular f(1) diretamente.', 'No ponto x = 1 a fração fica 0/0: a função nem está definida ali.', ['f(1) não existe', 'O limite não existe', 'Limite ≠ f(1)']),
    paper('Descubra o valor que falta', 'f(x) = x² − 3x para x ≠ 5;   f(5) = k.   Contínua em 5 ⇒ k = ?', '10', 'Calcule o limite de x² − 3x quando x → 5.', 'lim = 25 − 15 = 10, então k = 10.')
  ]),
  phase('Onde há garantia', [
    pill('Funções “bem-comportadas”', [
      'Boa notícia: polinômios, raízes, seno, cosseno e exponenciais são contínuos em todo o seu domínio.',
      'Frações (racionais) também, exceto onde o denominador zera.',
      'Consequência prática: nessas funções, dentro do domínio, calcular o limite é só substituir. É a regra da substituição que você já usa!'
    ], 'f contínua em a  ⇒  lim x→a f(x) = f(a)'),
    guided('Onde a fração quebra?', 'f(x) = (x² + 1)/(x − 3)', [
      step('Para qual x o denominador vale zero?', '3', 'Resolva x − 3 = 0.', 'Em x = 3 a função não está definida.'),
      step('f é contínua em x = 2?', 'Sim', 'O denominador em x = 2 vale −1, diferente de zero.', 'Longe do ponto problemático, a função é racional bem-comportada.', ['Sim', 'Não']),
      step('Então lim x→2 f(x) = ?', '-5', 'Substitua x = 2.', '(4 + 1)/(2 − 3) = 5/(−1) = −5.')
    ], 'Racional: contínua em todo ponto onde o denominador não zera.'),
    task('Pontos de descontinuidade', 'f(x) = 1/((x − 1)(x + 2)).   Em quantos pontos f é descontínua?', '2', 'Onde o denominador vale zero?', 'Os zeros do denominador são x = 1 e x = −2.'),
    task('Substituição garantida', 'lim x→2 (x³ − x + 1)/(x + 1)', '7/3', 'O denominador em x = 2 vale 3.', 'Racional contínua em 2: (8 − 2 + 1)/3 = 7/3.'),
    task('Soma dos pontos ruins', 'f(x) = (x − 1)/(x² − 5x + 6).   Some os valores de x onde f é descontínua.', '5', 'Fatore o denominador: (x − 2)(x − 3).', 'Os pontos são 2 e 3; a soma é 5.'),
    task('Domínio importa', 'f(x) = √x   é contínua em x = −1?', 'Não', 'Pergunte primeiro se f(−1) existe nos reais.', 'Não: √(−1) não é real, então f nem está definida em −1.', ['Sim', 'Não']),
    paper('Limite de racional contínua', 'lim x→−1 (x² + 3x)/(x − 2)', '2/3', 'O denominador não zera em x = −1.', '(1 − 3)/(−1 − 2) = (−2)/(−3) = 2/3.')
  ]),
  phase('Funções por partes', [
    pill('Costurando dois pedaços', [
      'Uma função por partes é feita de dois (ou mais) pedaços colados. A emenda é o ponto suspeito.',
      'Para ser contínua na emenda, os pedaços precisam se encontrar: limite pela esquerda = limite pela direita = valor da função.',
      'Receita: calcule cada lado, iguale, e resolva a equação que aparecer. Quase sempre ela é de 1º grau em k.'
    ], 'lim x→a⁻ f = lim x→a⁺ f = f(a)'),
    guided('Descobrindo k', 'f(x) = 2x + k se x < 1;   f(x) = 5 se x ≥ 1', [
      step('Pela esquerda, lim x→1⁻ f(x) = ? (em função de k)', '2+k|k+2', 'Use 2x + k com x = 1.', 'Pela esquerda vale o pedaço 2x + k, que tende a 2 + k.'),
      step('Pela direita, lim x→1⁺ f(x) = ?', '5', 'Use o pedaço constante.', 'O pedaço da direita é constante e vale 5.'),
      step('Igualando: 2 + k = 5. Quanto vale k?', '3', 'Subtraia 2 dos dois lados.', 'k = 3 faz as duas pontas se encontrarem.')
    ], 'Iguale os dois lados e resolva para k.'),
    task('Ajuste a constante', 'f(x) = kx − 1 se x < 2;   f(x) = x² + 1 se x ≥ 2.   k = ?', '3', 'Iguale 2k − 1 a 2² + 1.', '2k − 1 = 5, então k = 3.'),
    task('Outro par de pedaços', 'f(x) = x² + 1 se x < 2;   f(x) = 3x + k se x ≥ 2.   k = ?', '-1', 'O pedaço da esquerda tende a 5.', 'Iguale 5 = 6 + k, então k = −1.'),
    task('Buraco que se fecha', 'f(x) = (x² − 4)/(x − 2) para x ≠ 2;   f(2) = k.   k = ?', '4', 'Fatore x² − 4 e simplifique.', 'Para x ≠ 2 vale x + 2, que tende a 4. Logo k = 4.'),
    order('Roteiro do parâmetro', 'Achar k para continuidade na emenda a', ['Calcule o limite lateral à esquerda de a', 'Calcule o limite lateral à direita de a', 'Iguale os dois limites (e o valor f(a))', 'Resolva a equação em k'], 'Primeiro cada lado, depois a igualdade, por último a álgebra.'),
    paper('Parâmetro com quadrado', 'f(x) = x² + kx se x < 3;   f(x) = 2x + 9 se x ≥ 3.   k = ?', '2', 'Pela esquerda: 9 + 3k. Pela direita: 15.', '9 + 3k = 15, então k = 2.')
  ]),
  phase('Valor Intermediário', [
    pill('Ninguém atravessa o chão sem tocá-lo', [
      'Imagine um gráfico contínuo que começa abaixo do eixo x e termina acima. Para ir de baixo para cima sem “pular”, ele precisa cruzar o eixo!',
      'Isso é o Teorema do Valor Intermediário: se f é contínua em [a, b] e f(a), f(b) têm sinais opostos, existe c em (a, b) com f(c) = 0.',
      'Atenção: a continuidade é a chave. Sem ela, o gráfico pode “pular” o eixo.'
    ], 'f contínua em [a,b],  f(a)·f(b) < 0  ⇒  ∃ c com f(c) = 0'),
    guided('Raiz escondida', 'f(x) = x³ + x − 1 em [0, 1]', [
      step('Quanto vale f(0)?', '-1', 'Substitua x = 0.', 'f(0) = −1, abaixo do eixo.'),
      step('Quanto vale f(1)?', '1', '1 + 1 − 1.', 'f(1) = 1, acima do eixo.'),
      step('Os sinais são opostos e f é contínua (polinômio). Existe raiz em (0,1)?', 'Sim', 'Aplique o teorema.', 'Polinômios são contínuos; o sinal muda, então há raiz.', ['Sim', 'Não'])
    ], 'Sinais opostos + continuidade = raiz garantida.'),
    task('Calcule a ponta', 'f(x) = x³ − 2x − 5.   f(2) = ?', '-1', '8 − 4 − 5.', 'f(2) = −1, negativo.'),
    task('Outra ponta', 'f(x) = x³ − 2x − 5.   f(3) = ?', '16', '27 − 6 − 5.', 'f(3) = 16, positivo: há raiz entre 2 e 3.'),
    task('O teorema vale?', 'f(x) = 1/x em [−1, 1]:  f(−1) = −1 e f(1) = 1. O TVI garante raiz?', 'Não', 'f é contínua no intervalo todo?', 'Não: f não é contínua em 0, então o teorema não se aplica (e de fato não há raiz).', ['Sim', 'Não']),
    paper('Primeiro inteiro positivo', 'f(x) = x³ + 2x − 6.   Qual o menor inteiro positivo n com f(n) > 0?', '2', 'Teste n = 1 e n = 2.', 'f(1) = −3 e f(2) = 6, então n = 2 (e há raiz entre 1 e 2).')
  ]),
  phase('Chefão da continuidade', [
    pill('Checklist do chefão', [
      'Três perguntas sempre: o valor existe? o limite existe? são iguais?',
      'Com parâmetros, calcule os limites laterais e iguale. Com racionais, ache onde o denominador zera.',
      'O que você errar volta no final até acertar. Calma e passo a passo!'
    ]),
    guided('Buraco com trinômio', 'f(x) = (x² − x − 6)/(x − 3) para x ≠ 3;   f(3) = k', [
      step('Fatore o numerador.', '(x−3)(x+2)', 'Dois números que multiplicam −6 e somam −1.', 'x² − x − 6 = (x − 3)(x + 2).', ['(x−3)(x+2)', '(x−6)(x+1)', '(x+3)(x−2)']),
      step('Para x ≠ 3, a expressão simplificada é:', 'x+2', 'Cancele x − 3.', 'Sobra x + 2.'),
      step('Quanto vale k para a função ser contínua em 3?', '5', 'k = limite de x + 2 em 3.', 'O limite é 5, então k = 5.')
    ], 'Fatorar, simplificar e igualar o valor ao limite.'),
    task('Parâmetro em duas fórmulas', 'f(x) = kx + 1 se x < 2;   f(x) = x² − k se x ≥ 2.   k = ?', '1', 'Iguale 2k + 1 a 4 − k.', '2k + 1 = 4 − k ⇒ 3k = 3 ⇒ k = 1.'),
    task('Maior ponto ruim', 'f(x) = 1/(x² − 9).   Qual o maior x em que f é descontínua?', '3', 'Resolva x² − 9 = 0.', 'Os pontos são −3 e 3; o maior é 3.'),
    task('Tipo de falha', 'lim x→2⁻ f(x) = 1,  lim x→2⁺ f(x) = 3,  f(2) = 1.   O que falha?', 'Os limites laterais diferem', 'Compare os dois limites laterais entre si.', 'Com 1 ≠ 3 o limite bilateral não existe: é um salto.', ['Os limites laterais diferem', 'f(2) não existe', 'Nada falha']),
    paper('Mais um buraco', 'f(x) = (x² − 4x + 3)/(x − 1) para x ≠ 1;   f(1) = k.   k = ?', '-2', 'x² − 4x + 3 = (x − 1)(x − 3).', 'Simplificando, x − 3 tende a −2 em x = 1. Logo k = −2.')
  ], {boss: true})
]));

// ───────────────────────── UNIDADE 4 · INDETERMINAÇÃO E FATORAÇÃO ─────────────────────────
COURSE.limites.units.push(unit('Indeterminação e fatoração', 'Transforme expressões que dão 0/0', [
  phase('Reconheça o 0/0', [
    pill('0/0 não é um número', [
      'Quando você substitui x pelo alvo e aparece 0/0, o cálculo não terminou: 0/0 é só um alerta de que há algo escondido.',
      'Intuição: numerador e denominador estão ambos “indo a zero” e o quociente depende de qual vai mais rápido. Pode dar qualquer coisa!',
      'Macete: SEMPRE comece substituindo. Se der número, acabou. Se der 0/0, mude a expressão sem alterar o limite.'
    ], '0/0  =  indeterminação: simplifique antes de concluir'),
    guided('Substituir primeiro', 'lim x→2 (x² − 4)/(x − 2)', [
      step('O numerador vale quanto em x = 2?', '0', '2² − 4.', 'x² − 4 vale 0 em x = 2.'),
      step('E o denominador?', '0', '2 − 2.', 'x − 2 também vale 0.'),
      step('Que forma apareceu?', '0/0', 'Numerador sobre denominador.', 'É a forma indeterminada 0/0.', ['0', '0/0', '4/0']),
      step('O limite é 0? Podemos concluir?', 'Não', '0/0 não vale zero.', '0/0 não diz nada. É preciso fatorar para decidir.', ['Sim', 'Não'])
    ], 'Substituiu e deu 0/0: hora de fatorar.'),
    task('Qual forma?', 'lim x→−1 (x² − 1)/(x + 1)   (substitua direto)', '0/0', 'Calcule numerador e denominador separadamente.', 'Em x = −1: numerador 0 e denominador 0.'),
    task('Nem sempre é indeterminado', 'lim x→5 (x² − 25)/(x + 5)', '0', 'O denominador em x = 5 vale 10.', 'Substituindo: 0/10 = 0. Aqui a substituição basta!'),
    task('Cuidado com o denominador', 'lim x→4 (x² + 2)/(x − 4): a forma é 0/0?', 'Não', 'O numerador vale 18 em x = 4.', 'Numerador 18 e denominador 0: não é 0/0, é do tipo “número/0” (assíntota).', ['Sim', 'Não']),
    paper('Substitua e conclua', 'lim x→2 (x³ − 8)/(x² + 4)', '0', 'Calcule o denominador em x = 2.', '(8 − 8)/(4 + 4) = 0/8 = 0.')
  ]),
  phase('Diferença de quadrados', [
    pill('A − B vezes A + B', [
      'Lembra de a² − b² = (a − b)(a + b)? É a nossa ferramenta nº 1 para destruir o 0/0.',
      'Por quê funciona? O fator (x − a) que zera o denominador também está escondido no numerador. Fatorando, ele aparece e podemos cancelá-lo.',
      'Cancelar é legítimo: no limite, x se aproxima de a mas é diferente de a, então (x − a)/(x − a) = 1.'
    ], 'a² − b² = (a − b)(a + b)'),
    coach('Cancele o fator comum', 'Já fatoramos x² − 9. Arraste o fator que aparece em cima e embaixo para a área de cancelamento.', factors(3), 'Procure x − 3 nas duas linhas.', 'Para x ≠ 3, (x − 3)/(x − 3) = 1. Sobra x + 3.'),
    coach('Repita com outro fator', 'Agora o numerador veio de x² − 16. Cancele o par de fatores iguais.', factors(4), 'Qual peça de cima tem uma cópia na linha de baixo?', 'Para x ≠ 4, o fator x − 4 cancela e sobra x + 4.'),
    guided('Resolvendo por completo', 'lim x→5 (x² − 25)/(x − 5)', [
      step('Fatore x² − 25.', '(x−5)(x+5)', 'Diferença de quadrados com a = x e b = 5.', 'x² − 25 = (x − 5)(x + 5).', ['(x−5)(x+5)', '(x−5)²', '(x+25)(x−1)']),
      step('Após cancelar x − 5, o que sobra?', 'x+5', 'Só resta o outro fator.', 'Para x ≠ 5 a expressão vale x + 5.'),
      step('Agora substitua x = 5.', '10', '5 + 5.', 'O limite é 10.')
    ], 'Fatorar, cancelar, substituir.'),
    task('Com sinal negativo', 'lim x→−2 (x² − 4)/(x + 2)', '-4', 'x² − 4 = (x − 2)(x + 2).', 'Sobra x − 2, que em −2 vale −4.'),
    task('Número maior', 'lim x→7 (x² − 49)/(x − 7)', '14', 'x² − 49 = (x − 7)(x + 7).', 'Sobra x + 7, que em 7 vale 14.'),
    task('Fator comum no denominador', 'lim x→6 (x² − 36)/(x² − 6x)', '2', 'Fatore x² − 6x = x(x − 6).', '(x − 6)(x + 6)/[x(x − 6)] = (x + 6)/x, que em 6 vale 12/6 = 2.'),
    paper('Fatorando sem pressa', 'lim x→−3 (x² − 9)/(x² + 3x)', '2', 'Denominador: x(x + 3).', '(x − 3)(x + 3)/[x(x + 3)] = (x − 3)/x → (−6)/(−3) = 2.')
  ]),
  phase('Trinômios', [
    pill('Soma e produto', [
      'Nem todo 0/0 vem de diferença de quadrados. Muitas vezes o numerador é um trinômio x² + bx + c.',
      'Para fatorá-lo, procure dois números que multiplicam c e somam b. Se esses números são p e q, então x² + bx + c = (x + p)(x + q).',
      'Pista de ouro: se o denominador é (x − a) e o numerador zera em a, então (x − a) obrigatoriamente é um dos fatores!'
    ], 'x² + bx + c = (x + p)(x + q),   p·q = c,  p + q = b'),
    guided('Fatore o trinômio', 'lim x→3 (x² − 5x + 6)/(x − 3)', [
      step('Dois números que multiplicam 6 e somam −5:', '(x−2)(x−3)', 'São −2 e −3.', 'x² − 5x + 6 = (x − 2)(x − 3).', ['(x−2)(x−3)', '(x+2)(x+3)', '(x−1)(x−6)']),
      step('Depois de cancelar x − 3, sobra:', 'x-2', 'O outro fator.', 'A expressão vira x − 2.'),
      step('Limite em x = 3:', '1', '3 − 2.', 'O limite vale 1.')
    ], 'Soma e produto → fatorar → cancelar.'),
    task('Mesma técnica', 'lim x→2 (x² + x − 6)/(x − 2)', '5', 'x² + x − 6 = (x + 3)(x − 2).', 'Sobra x + 3, que em 2 vale 5.'),
    task('Fatores com sinal diferente', 'lim x→−1 (x² + 5x + 4)/(x + 1)', '3', 'x² + 5x + 4 = (x + 1)(x + 4).', 'Sobra x + 4, que em −1 vale 3.'),
    task('Dois trinômios', 'lim x→1 (x² − 3x + 2)/(x² − 1)', '-1/2', 'Numerador (x − 1)(x − 2), denominador (x − 1)(x + 1).', 'Sobra (x − 2)/(x + 1) → (−1)/2 = −1/2.'),
    order('Roteiro do 0/0', 'lim x→a N(x)/D(x) com N(a) = D(a) = 0', ['Substitua x = a e reconheça o 0/0', 'Fatore numerador e denominador', 'Cancele o fator comum (válido porque x ≠ a)', 'Substitua x = a na expressão simplificada'], 'A ordem importa: só se cancela depois de fatorar.'),
    paper('Dois fatores a cancelar', 'lim x→−3 (x² + 2x − 3)/(x² − 9)', '2/3', 'Numerador (x + 3)(x − 1); denominador (x − 3)(x + 3).', 'Sobra (x − 1)/(x − 3) → (−4)/(−6) = 2/3.')
  ]),
  phase('Cubos e divisão', [
    pill('Quando o grau sobe', [
      'Com x³, a diferença de quadrados não serve mais. Use a diferença de cubos: a³ − b³ = (a − b)(a² + ab + b²).',
      'Se o numerador é um polinômio qualquer que zera em a, então (x − a) o divide exatamente. Divida o polinômio por (x − a) (Briot-Ruffini ou divisão longa).',
      'Macete: o “outro fator” da diferença de cubos nunca zera em x = b, é sempre positivo no ponto. É ele que vira o resultado do limite.'
    ], 'a³ − b³ = (a − b)(a² + ab + b²)   |   a³ + b³ = (a + b)(a² − ab + b²)'),
    guided('Diferença de cubos', 'lim x→2 (x³ − 8)/(x − 2)', [
      step('Fatore x³ − 8 como a³ − b³ com b = 2.', '(x−2)(x²+2x+4)', 'a = x e b = 2.', 'x³ − 2³ = (x − 2)(x² + 2x + 4).', ['(x−2)(x²+2x+4)', '(x−2)(x²−2x+4)', '(x−2)³']),
      step('Após cancelar, a expressão é:', 'x²+2x+4', 'Fica o fator quadrático.', 'O quociente é x² + 2x + 4, resto zero.'),
      step('Substitua x = 2.', '12', '4 + 4 + 4.', 'O limite é 12.')
    ], 'a³ − b³ sempre tem o fator (a − b).'),
    task('Mesma estrutura', 'lim x→1 (x³ − 1)/(x − 1)', '3', 'x³ − 1 = (x − 1)(x² + x + 1).', 'Sobra x² + x + 1 → 3.'),
    task('Soma de cubos', 'lim x→−3 (x³ + 27)/(x + 3)', '27', 'x³ + 27 = (x + 3)(x² − 3x + 9).', 'Sobra x² − 3x + 9, que em −3 vale 9 + 9 + 9 = 27.'),
    task('Reconheça o quociente', '(x³ − 8)/(x − 2) = ?  (para x ≠ 2)', 'x²+2x+4', 'Diferença de cubos.', 'O quociente é x² + 2x + 4.', ['x² − 2x + 4', 'x² + 2x + 4', 'x² + 4']),
    task('Cubo sobre quadrado', 'lim x→3 (x³ − 27)/(x² − 9)', '9/2', 'Fatore os dois: (x − 3)(x² + 3x + 9) e (x − 3)(x + 3).', 'Sobra (x² + 3x + 9)/(x + 3) → 27/6 = 9/2.'),
    paper('Divisão de polinômios', 'lim x→2 (x³ − 2x² − x + 2)/(x − 2)', '3', 'Divida por x − 2 ou agrupe: x²(x − 2) − (x − 2).', 'Numerador = (x − 2)(x² − 1). Sobra x² − 1 → 3.')
  ]),
  phase('Outras estruturas', [
    pill('Frações, fator comum e h', [
      'Às vezes o 0/0 vem escondido: frações dentro do numerador, fator comum x, ou uma variável h que tende a zero.',
      'Ideia: junte tudo num só denominador ou expanda o quadrado, até aparecer o fator que zera.',
      'Esse padrão com h é a porta de entrada da derivada! Fixe: expanda, simplifique, depois divida por h.'
    ], 'frações: denominador comum   |   (a + h)² = a² + 2ah + h²'),
    guided('Fração dentro da fração', 'lim x→2 (1/x − 1/2)/(x − 2)', [
      step('Escreva 1/x − 1/2 com denominador 2x. O numerador é:', '2-x|-x+2', 'Denominador comum 2x: (2 − x)/(2x).', '1/x − 1/2 = (2 − x)/(2x).'),
      step('Como 2 − x = −(x − 2), dividindo por x − 2 sobra:', '-1/(2x)', 'O sinal negativo sai.', 'O fator x − 2 cancela e sobra −1/(2x).', ['−1/(2x)', '1/(2x)', '−2x']),
      step('Substituindo x = 2:', '-1/4', '−1/(2·2).', 'O limite é −1/4.')
    ], 'Junte as frações, cancele, substitua.'),
    task('Fator comum x', 'lim x→0 (x² + 5x)/x', '5', 'Coloque x em evidência.', 'x(x + 5)/x = x + 5 → 5.'),
    task('Outra fração', 'lim x→3 (1/x − 1/3)/(x − 3)', '-1/9', 'O numerador é (3 − x)/(3x).', 'Resulta em −1/(3x) → −1/9.'),
    task('Expandindo o quadrado', 'lim x→0 ((x + 2)² − 4)/x', '4', '(x + 2)² = x² + 4x + 4.', 'O numerador é x² + 4x. Divide por x: x + 4 → 4.'),
    task('Com h', 'lim h→0 ((3 + h)² − 9)/h', '6', 'Expanda (3 + h)².', '(9 + 6h + h² − 9)/h = 6 + h → 6.'),
    paper('Grau quatro', 'lim x→1 (x⁴ − 1)/(x − 1)', '4', 'x⁴ − 1 = (x − 1)(x³ + x² + x + 1).', 'Sobra x³ + x² + x + 1 → 4.')
  ]),
  phase('Chefão da fatoração', [
    pill('Escolha a ferramenta', [
      'Diferença de quadrados, trinômio, cubos, fração ou h? Reconheça a estrutura antes de agir.',
      'E lembre: se a substituição dá um número, não precisa de nada disso!',
      'Os erros voltam no final para você refazer. Respire e comece substituindo.'
    ]),
    task('Aquecimento', 'lim x→4 (x² − 16)/(x − 4)', '8', 'Diferença de quadrados.', 'Para x ≠ 4, vale x + 4 → 8.'),
    task('Sem indeterminação', 'Qual a primeira jogada em lim x→1 (x² − 1)/(x² + 3)?', 'Substituir diretamente', 'O denominador zera em x = 1?', 'O denominador vale 4, não zera. Substituindo, 0/4 = 0.', ['Substituir diretamente', 'Fatorar', 'Racionalizar']),
    guided('Cubo e trinômio juntos', 'lim x→−1 (x³ + 1)/(x² + 3x + 2)', [
      step('Fatore o numerador (soma de cubos).', '(x+1)(x²-x+1)', 'a = x e b = 1.', 'x³ + 1 = (x + 1)(x² − x + 1).', ['(x+1)(x²-x+1)', '(x+1)(x²+x+1)', '(x+1)³']),
      step('Fatore o denominador.', '(x+1)(x+2)', 'Números 1 e 2.', 'x² + 3x + 2 = (x + 1)(x + 2).', ['(x+1)(x+2)', '(x−1)(x−2)', '(x+3)(x−1)']),
      step('Cancelando x + 1, o limite de (x² − x + 1)/(x + 2) em −1 é:', '3', 'Numerador 3, denominador 1.', '(1 + 1 + 1)/(−1 + 2) = 3.')
    ], 'Mesmo fator em cima e embaixo: cancela.'),
    task('Trinômio sobre diferença', 'lim x→5 (x² − 7x + 10)/(x² − 25)', '3/10', 'Numerador (x − 5)(x − 2); denominador (x − 5)(x + 5).', 'Sobra (x − 2)/(x + 5) → 3/10.'),
    task('Fator repetido', 'lim x→−2 (x³ + 3x² − 4)/(x² + x − 2)', '0', 'Numerador = (x + 2)(x² + x − 2).', 'O quociente é x + 2 → 0.'),
    paper('Potência par', 'lim x→−1 (x⁴ − 1)/(x + 1)', '-4', 'x⁴ − 1 = (x² + 1)(x − 1)(x + 1).', 'Sobra (x² + 1)(x − 1) → 2·(−2) = −4.')
  ], {boss: true})
]));

// ───────────────────────── UNIDADE 5 · RACIONALIZAÇÃO ─────────────────────────
COURSE.limites.units.push(unit('Racionalização', 'Use o conjugado para lidar com raízes', [
  phase('O conjugado', [
    pill('Eliminando a raiz', [
      'Quando o 0/0 envolve raiz, fatorar não ajuda. A saída é multiplicar por uma “forma de 1”: o conjugado dividido por ele mesmo.',
      'O conjugado de (√A − B) é (√A + B). O produto cai na diferença de quadrados: (√A − B)(√A + B) = A − B². A raiz some!',
      'Macete: troque o sinal do meio. E multiplique em cima E embaixo, para não mudar o valor da fração.'
    ], '(√A − B)(√A + B) = A − B²'),
    task('Qual o conjugado?', 'lim x→0 (√(x + 4) − 2)/x.   Por qual expressão multiplicar em cima e embaixo?', '√(x+4)+2', 'Troque o sinal do meio.', 'O conjugado é √(x + 4) + 2.', ['√(x + 4) − 2', '√(x + 4) + 2', 'x + 4']),
    guided('Racionalizando por completo', 'lim x→0 (√(x + 4) − 2)/x', [
      step('O numerador (√(x+4) − 2)(√(x+4) + 2) vira:', 'x', '(x + 4) − 4.', 'A raiz some: (x + 4) − 4 = x.'),
      step('Depois de cancelar x, sobra:', '1/(√(x+4)+2)', 'O conjugado ficou no denominador.', 'O que sobra é 1/(√(x + 4) + 2).', ['1/(√(x+4)+2)', '1/(√(x+4)−2)', 'x']),
      step('Substitua x = 0.', '1/4', '√4 + 2 = 4.', 'O limite é 1/4.')
    ], 'Conjugado → cancela x → substitui.'),
    task('Numerador após multiplicar', '(√(x + 9) − 3)(√(x + 9) + 3) = ?', 'x', 'Diferença de quadrados.', '(x + 9) − 9 = x.'),
    task('Com coeficiente', '(√(3x + 4) − 2)(√(3x + 4) + 2) = ?', '3x', '(3x + 4) − 4.', 'O resultado é 3x.'),
    task('Outro conjugado', 'Escreva o conjugado de  √x + 3', '√x−3|√x-3', 'Troque o sinal.', 'O conjugado é √x − 3.'),
    paper('Primeiro limite completo', 'lim x→0 (√(x + 1) − 1)/x', '1/2', 'Multiplique por √(x + 1) + 1.', 'Fica 1/(√(x + 1) + 1) → 1/2.')
  ]),
  phase('Raiz no numerador', [
    pill('Mesma jogada, números novos', [
      'Raiz no numerador: multiplique pelo conjugado do numerador. O numerador vira um polinômio que contém o fator problemático.',
      'Dica ouro: NÃO expanda o denominador! Deixe-o como (x − a)(√ + b). Assim o fator cancela fácil.',
      'Repetição inteligente: o padrão é sempre o mesmo. O que muda são os números.'
    ], 'N = √A − B  ⇒  multiplique por (√A + B)/(√A + B)'),
    guided('Alvo diferente de zero', 'lim x→3 (√(x + 6) − 3)/(x − 3)', [
      step('Qual o conjugado do numerador?', '√(x+6)+3', 'Troque o sinal.', 'O conjugado é √(x + 6) + 3.'),
      step('O novo numerador é:', 'x-3', '(x + 6) − 9.', 'Simplifica para x − 3.'),
      step('Após cancelar x − 3, o limite de 1/(√(x+6) + 3) é:', '1/6', '√9 + 3 = 6.', 'O resultado é 1/6.')
    ], 'O fator x − 3 apareceu no numerador e cancelou.'),
    task('Alvo zero', 'lim x→0 (√(x + 16) − 4)/x', '1/8', 'Numerador vira x.', '1/(√16 + 4) = 1/8.'),
    task('Outro número', 'lim x→0 (√(x + 25) − 5)/x', '1/10', 'Mesmo padrão.', '1/(5 + 5) = 1/10.'),
    task('Com 2x', 'lim x→4 (√(2x + 1) − 3)/(x − 4)', '1/3', 'Numerador: 2x + 1 − 9 = 2(x − 4).', '2/(√9 + 3) = 2/6 = 1/3.'),
    order('Roteiro da racionalização', 'lim x→a (√A − B)/(x − a)', ['Substitua e reconheça o 0/0', 'Multiplique por (√A + B)/(√A + B)', 'Simplifique o numerador (a raiz some)', 'Cancele o fator x − a', 'Substitua x = a'], 'Conjugado → simplificar → cancelar → substituir.'),
    paper('Para treinar', 'lim x→5 (√(x − 1) − 2)/(x − 5)', '1/4', 'Numerador: (x − 1) − 4 = x − 5.', '1/(√4 + 2) = 1/4.')
  ]),
  phase('Raiz no denominador', [
    pill('O conjugado desce', [
      'Se a raiz está no denominador, multiplique pelo conjugado do denominador. É o mesmo truque, de cabeça para baixo.',
      'O denominador vira A − B², um fator polinomial que cancela com o numerador.',
      'Antes de tudo: confira se o numerador também tem x − a. Se tiver, o cancelamento é natural.'
    ], 'D = √A − B  ⇒  multiplique por (√A + B)/(√A + B)'),
    guided('Denominador radical', 'lim x→4 (x − 4)/(√x − 2)', [
      step('Conjugado do denominador:', '√x+2', 'Troque o sinal.', 'Multiplicamos por √x + 2.'),
      step('O novo denominador é:', 'x-4', 'x − 2².', '(√x − 2)(√x + 2) = x − 4.'),
      step('Após cancelar, resta √x + 2. Em x = 4:', '4', '2 + 2.', 'O limite é 4.')
    ], 'O fator x − 4 cancelou no final.'),
    task('Mesmo padrão', 'lim x→9 (x − 9)/(√x − 3)', '6', 'Conjugado √x + 3.', 'Resta √x + 3 → 6.'),
    task('Alvo 1', 'lim x→1 (x − 1)/(√x − 1)', '2', 'Conjugado √x + 1.', 'Resta √x + 1 → 2.'),
    task('Zero no alvo', 'lim x→0 x/(√(x + 1) − 1)', '2', 'Conjugado √(x + 1) + 1.', 'Denominador vira x. Sobra √(x+1) + 1 → 2.'),
    task('Alvo 16', 'lim x→16 (x − 16)/(√x − 4)', '8', 'Conjugado √x + 4.', 'Resta √x + 4 → 8.'),
    paper('Raiz de uma soma', 'lim x→2 (x − 2)/(√(x + 2) − 2)', '4', 'Denominador após o conjugado: x + 2 − 4.', 'Resta √(x + 2) + 2 → 4.')
  ]),
  phase('Duas raízes', [
    pill('Raiz menos raiz', [
      'Se há duas raízes, o conjugado de √A − √B é √A + √B. O produto dá A − B, sem nenhuma raiz.',
      'Típico em limites como (√(x+a) − √(x−a))/x: o numerador vira um múltiplo de x.',
      'Fique atento aos sinais. Um sinal errado no conjugado bagunça tudo.'
    ], '(√A − √B)(√A + √B) = A − B'),
    guided('Raiz menos raiz', 'lim x→0 (√(x + 4) − √(4 − x))/x', [
      step('O numerador após multiplicar pelo conjugado vira (x+4) − (4−x) =', '2x', 'Cuidado com o sinal do segundo termo.', '(x + 4) − (4 − x) = 2x.'),
      step('Cancelando x, sobra 2/(√(x+4) + √(4−x)). Em x = 0:', '1/2', 'Denominador 2 + 2 = 4.', '2/4 = 1/2.')
    ], 'Duas raízes: multiplique pela soma delas.'),
    task('Simétrico', 'lim x→0 (√(1 + x) − √(1 − x))/x', '1', 'Numerador: 2x.', '2/(1 + 1) = 1.'),
    task('Com 9', 'lim x→0 (√(9 + x) − √(9 − x))/x', '1/3', 'Numerador: 2x.', '2/(3 + 3) = 1/3.'),
    task('Alvo 1', 'lim x→1 (√(x + 3) − √(5 − x))/(x − 1)', '1/2', 'Numerador: 2x − 2 = 2(x − 1).', '2/(√4 + √4) = 1/2.'),
    task('Coeficientes diferentes', 'lim x→2 (√(2x + 5) − √(x + 7))/(x − 2)', '1/6', 'Numerador: (2x + 5) − (x + 7) = x − 2.', '1/(3 + 3) = 1/6.'),
    paper('Raiz e polinômio', 'lim x→3 (√(x + 1) − 2)/(x² − 9)', '1/24', 'Numerador após conjugado: x − 3. Denominador: (x − 3)(x + 3).', 'Sobra 1/[(x + 3)(√(x + 1) + 2)] → 1/(6·4) = 1/24.')
  ]),
  phase('Raiz e fatoração', [
    pill('Duas ferramentas juntas', [
      'Algumas questões pedem conjugado E fatoração. Comece pela parte que traz a raiz; o resto vira polinômio.',
      'Outra sacada: quando a variável aparece como x², o numerador após o conjugado vira x², fácil de cancelar.',
      'Sempre pergunte: depois deste passo, que fator vai cancelar?'
    ], 'conjugado → polinômio → fatoração'),
    guided('Raiz de x² + 9', 'lim x→0 (√(x² + 9) − 3)/x²', [
      step('O numerador após o conjugado é:', 'x²|x^2', '(x² + 9) − 9.', 'Dá x².'),
      step('Cancelando x², sobra 1/(√(x²+9) + 3). Em x = 0:', '1/6', '√9 + 3 = 6.', 'O limite é 1/6.')
    ], 'O quadrado da variável cancela com o do denominador.'),
    task('Mesmo ritmo', 'lim x→0 (√(x² + 16) − 4)/x²', '1/8', 'Conjugado: √(x² + 16) + 4.', '1/(4 + 4) = 1/8.'),
    task('Fatorar e racionalizar', 'lim x→1 (x² − 1)/(√x − 1)', '4', 'Conjugado no denominador: √x + 1.', 'Resta (x + 1)(√x + 1) → 2·2 = 4.'),
    task('Cubo com raiz', 'lim x→4 (x − 4)/(x√x − 8)', '1/3', 'x√x = (√x)³. Fatore a diferença de cubos.', '(√x)³ − 8 = (√x − 2)(x + 2√x + 4); x − 4 = (√x − 2)(√x + 2). Resta (√x + 2)/(x + 2√x + 4) → 4/12 = 1/3.'),
    task('Qual ferramenta?', 'lim x→0 (√(x + 1) − 1)/x', 'Racionalizar', 'Há raiz no numerador.', 'A raiz sugere o conjugado.', ['Fatorar x² − a²', 'Racionalizar', 'Substituir direto']),
    paper('Combine tudo', 'lim x→3 (x² − 9)/(√(x + 1) − 2)', '24', 'Denominador após o conjugado: x − 3.', 'Resta (x + 3)(√(x + 1) + 2) → 6·4 = 24.')
  ]),
  phase('Chefão da racionalização', [
    pill('Chefão do conjugado', [
      'Lembre: sinal oposto no meio, multiplique em cima e embaixo, e não expanda o que não precisa.',
      'Raiz no numerador, no denominador ou duas raízes: o padrão é o mesmo.',
      'Tente acertar tudo de primeira!'
    ]),
    task('Aquecimento', 'lim x→0 (√(x + 49) − 7)/x', '1/14', 'Numerador vira x.', '1/(7 + 7) = 1/14.'),
    guided('Raiz e produto notável', 'lim x→1 (√(x + 8) − 3)/(x² − 1)', [
      step('O numerador após o conjugado é:', 'x-1', '(x + 8) − 9.', 'Dá x − 1.'),
      step('O denominador fica (x − 1)(x + 1). Após cancelar, o limite de 1/[(x+1)(√(x+8)+3)] é:', '1/12', '(1 + 1)(3 + 3).', '1/(2·6) = 1/12.')
    ], 'O fator x − 1 aparece nos dois lados.'),
    task('Raiz no denominador', 'lim x→9 (x − 9)/(√x − 3)', '6', 'Conjugado √x + 3.', 'Resta √x + 3 → 6.'),
    task('Duas raízes', 'lim x→0 (√(x + 4) − √(4 − x))/(3x)', '1/6', 'Numerador: 2x.', '2/(3·4) = 1/6.'),
    task('Qual técnica?', 'lim x→2 (x² − 4)/(x − 2)', 'Fatorar', 'Há raiz?', 'Sem raiz: diferença de quadrados.', ['Fatorar', 'Racionalizar', 'Substituir direto']),
    paper('Para fechar', 'lim x→3 (√(x + 13) − 4)/(x − 3)', '1/8', 'Numerador: (x + 13) − 16.', '1/(4 + 4) = 1/8.')
  ], {boss: true})
]));

// ───────────────────────── UNIDADE 6 · LIMITES FUNDAMENTAIS ─────────────────────────
COURSE.limites.units.push(unit('Limites fundamentais', 'Use padrões trigonométricos e exponenciais', [
  phase('Seno sobre x', [
    pill('Ângulos pequenos', [
      'Para x bem pequeno (em radianos!), o arco e a altura do seno quase coincidem: sen x ≈ x. Por isso sen x / x fica colado em 1.',
      'Esse é o primeiro limite fundamental. Ele não se prova com fatoração: vem da geometria (comparação de áreas) e vale como ferramenta pronta.',
      'Macete: o que está dentro do seno precisa ser igual ao que está no denominador. Se for diferente, multiplique e divida para igualar.'
    ], 'lim x→0 sen(x)/x = 1   (x em radianos)'),
    task('Unidade do ângulo', 'sen(x)/x → 1 apenas quando x está em:', 'radianos', 'Em graus a razão tende a outro número (π/180).', 'O limite 1 vale só com x em radianos.', ['radianos', 'graus']),
    guided('Ajustando o argumento', 'lim x→0 sen(3x)/x', [
      step('Multiplique e divida por 3 para igualar: sen(3x)/x = 3 · ( ___ ).', 'sen(3x)/(3x)', 'O denominador deve repetir o argumento do seno.', '3·sen(3x)/(3x): o argumento e o denominador agora são iguais.', ['sen(3x)/(3x)', 'sen(x)/(3x)', 'sen(3x)/x']),
      step('O fator sen(3x)/(3x) tende a:', '1', 'É o limite fundamental com u = 3x.', 'Com u = 3x → 0, sen(u)/u → 1.'),
      step('Então o limite total é:', '3', '3 · 1.', 'O resultado é 3.')
    ], 'Iguale argumento e denominador; o excesso sai como constante.'),
    task('Mesmo padrão', 'lim x→0 sen(5x)/x', '5', 'Multiplique e divida por 5.', '5 · sen(5x)/(5x) → 5.'),
    task('Constante embaixo', 'lim x→0 sen(x)/(4x)', '1/4', 'Separe o 1/4.', '(1/4) · sen(x)/x → 1/4.'),
    task('Duas constantes', 'lim x→0 sen(7x)/(2x)', '7/2', 'Faça aparecer 7x embaixo.', '(7/2) · sen(7x)/(7x) → 7/2.'),
    task('Invertido', 'lim x→0 x/sen(x)', '1', 'É o inverso de um limite que vale 1.', 'O inverso de 1 é 1.'),
    paper('Treino', 'lim x→0 sen(9x)/(3x)', '3', 'Escreva 9/3 · sen(9x)/(9x).', '(9/3)·1 = 3.')
  ]),
  phase('Adapte o padrão', [
    pill('Quociente de senos e tangente', [
      'E se houver sen(2x)/sen(3x)? Divida numerador e denominador por x: cada pedaço vira um limite fundamental, e sobra 2/3.',
      'A tangente é seno sobre cosseno; perto de 0, o cosseno vale 1, então tan x também se comporta como x.',
      'Regra de bolso: perto de 0, sen(kx) ≈ kx e tan(kx) ≈ kx. Os coeficientes decidem o resultado.'
    ], 'sen(kx)/x → k   |   tan(kx)/x → k'),
    guided('Seno sobre seno', 'lim x→0 sen(2x)/sen(3x)', [
      step('Divida cima e baixo por x. O numerador vira sen(2x)/x e tende a:', '2', 'k = 2.', 'sen(2x)/x → 2.'),
      step('O denominador sen(3x)/x tende a:', '3', 'k = 3.', 'sen(3x)/x → 3.'),
      step('O quociente dos limites é:', '2/3', 'Divida 2 por 3.', 'O limite vale 2/3.')
    ], 'Cada seno vira “coeficiente” e o resultado é a razão.'),
    task('Coeficiente 4', 'lim x→0 sen(4x)/sen(x)', '4', 'Divida por x.', '4/1 = 4.'),
    task('Cinco e dois', 'lim x→0 sen(5x)/sen(2x)', '5/2', 'Divida por x.', '5/2.'),
    task('Tangente', 'lim x→0 tan(x)/x', '1', 'tan x = sen x / cos x.', '(sen x / x)·(1/cos x) → 1·1 = 1.'),
    task('Tangente com coeficiente', 'lim x→0 tan(3x)/(2x)', '3/2', 'tan(3x)/x → 3.', '(1/2)·3 = 3/2.'),
    order('Roteiro do fundamental', 'lim x→0 sen(ax)/(bx)', ['Reconheça o 0/0 (sen 0 = 0)', 'Multiplique e divida para igualar o argumento ao denominador', 'Use sen(u)/u → 1', 'Colete as constantes que sobraram'], 'Primeiro igualar, depois aplicar o limite fundamental.'),
    paper('Treino', 'lim x→0 sen(6x)/tan(2x)', '3', 'Divida cima e baixo por x.', '6/2 = 3.')
  ]),
  phase('Um menos cosseno', [
    pill('O cosseno quase achatado', [
      'Perto de 0, cos x ≈ 1 − x²/2. Então 1 − cos x é minúsculo, da ordem de x²: ele vai a zero mais rápido que x.',
      'Por isso (1 − cos x)/x → 0, mas (1 − cos x)/x² → 1/2.',
      'Como provar? Multiplique por 1 + cos x: o numerador vira 1 − cos²x = sen²x, e voltamos ao limite fundamental.'
    ], 'lim (1 − cos x)/x = 0    lim (1 − cos x)/x² = 1/2'),
    guided('Por que dá zero?', 'lim x→0 (1 − cos x)/x', [
      step('Multiplique por (1 + cos x)/(1 + cos x). O numerador vira:', 'sen²x|sen^2x', '1 − cos²x.', 'Identidade: 1 − cos²x = sen²x.'),
      step('Reescreva como (sen x / x) · (sen x / (1 + cos x)). O 1º fator tende a:', '1', 'Limite fundamental.', 'sen x / x → 1.'),
      step('O 2º fator em x = 0 vale sen 0/(1 + 1) = ', '0', 'sen 0 = 0.', '0/2 = 0.'),
      step('Produto dos limites:', '0', '1·0.', 'O limite é 0.')
    ], 'sen²x torna-se (sen x/x)·sen x.'),
    task('Versão quadrática', 'lim x→0 (1 − cos x)/x²', '1/2', 'Use cos x ≈ 1 − x²/2.', 'O limite é 1/2.'),
    task('Dobrando o ângulo', 'lim x→0 (1 − cos(2x))/x²', '2', 'Use (2x)²/2 = 2x².', '2x²/x² = 2.'),
    task('Com coeficiente', 'lim x→0 (1 − cos x)/(3x²)', '1/6', 'Tire o 1/3.', '(1/3)(1/2) = 1/6.'),
    task('Sen ao quadrado', 'lim x→0 sen²(x)/x²', '1', 'É (sen x / x)².', '1² = 1.'),
    task('Ordem diferente', 'lim x→0 (1 − cos(3x))/x', '0', 'Mesma ideia do guiado.', 'O numerador vai a zero mais rápido que x. O limite é 0.'),
    paper('Treino', 'lim x→0 (1 − cos(4x))/x²', '8', '(4x)²/2 = 8x².', '8x²/x² = 8.')
  ]),
  phase('O número e e a exponencial', [
    pill('Juros compostos e e', [
      'Se você dividir uma taxa de 100% em n pedaços e capitalizar n vezes, termina com (1 + 1/n)ⁿ. Quando n cresce, isso se acomoda no número e ≈ 2,71828.',
      'Daí vêm dois limites que valem ouro: lim (1 + 1/n)ⁿ = e e lim x→0 (eˣ − 1)/x = 1, ou seja, eˣ ≈ 1 + x perto de 0.',
      'Macete: transforme o expoente para ficar igual ao denominador interno. Se (1 + k/n)ⁿ, o resultado é eᵏ.'
    ], 'lim n→∞ (1 + 1/n)ⁿ = e    lim x→0 (eˣ − 1)/x = 1'),
    task('Reconheça o número de Euler', 'lim n→∞ (1 + 1/n)ⁿ', 'e', 'É a definição de uma constante exponencial.', 'O limite é e ≈ 2,71828.', ['1', 'e', '∞']),
    guided('Expoente ajustado', 'lim n→∞ (1 + 2/n)ⁿ', [
      step('Seja m = n/2. Então (1 + 2/n)ⁿ = (1 + 1/m)^(2m) = [(1 + 1/m)ᵐ]². O colchete tende a:', 'e', 'Quando n → ∞, m → ∞.', '(1 + 1/m)ᵐ → e.'),
      step('Então o limite é:', 'e²|e^2', 'Eleve ao quadrado.', 'O resultado é e².')
    ], '(1 + k/n)ⁿ → eᵏ.'),
    task('Com k = 3', 'lim n→∞ (1 + 3/n)ⁿ', 'e³|e^3', 'Generalize: (1 + k/n)ⁿ → eᵏ.', 'Vale e³.'),
    task('Exponencial base', 'lim x→0 (eˣ − 1)/x', '1', 'eˣ ≈ 1 + x.', 'O limite é 1.'),
    task('Com coeficiente', 'lim x→0 (e^(3x) − 1)/x', '3', 'Multiplique e divida por 3.', '3·(e^(3x) − 1)/(3x) → 3.'),
    task('Coeficientes dos dois lados', 'lim x→0 (e^(5x) − 1)/(2x)', '5/2', 'Faça aparecer 5x embaixo.', '(5/2)·1 = 5/2.'),
    paper('Treino', 'lim n→∞ (1 + 4/n)ⁿ', 'e⁴|e^4', '(1 + k/n)ⁿ → eᵏ.', 'Com k = 4: e⁴.')
  ]),
  phase('Chefão dos fundamentais', [
    pill('Escolha o padrão', [
      'Seno, tangente, 1 − cos, exponencial: cada um tem o seu “gêmeo” para igualar.',
      'O segredo é sempre o mesmo: encaixe argumento e denominador, e sobram as constantes.',
      'Boss: tente acertar tudo de primeira.'
    ]),
    task('Aquecimento', 'lim x→0 sen(8x)/(2x)', '4', 'Divida por x.', '8/2 = 4.'),
    task('Cosseno com 6', 'lim x→0 (1 − cos(6x))/x²', '18', '(6x)²/2 = 18x².', '18x²/x² = 18.'),
    guided('Cotangente', 'lim x→0 x·cot(x)', [
      step('Reescreva cot x como cos x / sen x. O limite fica x cos x / sen x. O fator x / sen x tende a:', '1', 'Inverso do fundamental.', 'x/sen x → 1.'),
      step('O fator cos x em 0 vale:', '1', 'cos 0.', 'cos 0 = 1.'),
      step('Limite total:', '1', 'Produto dos dois.', '1·1 = 1.')
    ], 'cot = cos/sen; combine com o fundamental.'),
    task('Exponencial e seno', 'lim x→0 (e^(2x) − 1)/sen(4x)', '1/2', 'Cada um vira um coeficiente.', 'Numerador ≈ 2x e denominador ≈ 4x: 2/4 = 1/2.'),
    task('Seno de x²', 'lim x→0 sen(x²)/x', '0', 'Reescreva como x · sen(x²)/x².', 'x·1 → 0.'),
    paper('Produto', 'lim x→0 (sen(3x)·sen(5x))/x²', '15', 'Separe em dois fatores.', '(sen3x/x)(sen5x/x) → 3·5 = 15.')
  ], {boss: true})
]));

// ───────────────────────── UNIDADE 7 · LIMITES INFINITOS E NO INFINITO ─────────────────────────
COURSE.limites.units.push(unit('Limites infinitos e no infinito', 'Distinga para onde x vai e como f(x) reage', [
  phase('Quando o denominador vai a zero', [
    pill('Número sobre quase-zero', [
      'Se o denominador se aproxima de 0 e o numerador não, o quociente explode: o módulo cresce sem parar. O sinal depende do lado.',
      'Pense em 1/0,001 = 1000 e 1/(−0,001) = −1000. Quanto mais perto de 0, maior fica o valor.',
      'Isso desenha uma assíntota vertical. Macete: descubra o sinal de numerador e denominador separadamente em cada lado.'
    ], '1/0⁺ = +∞     1/0⁻ = −∞'),
    guided('Pelo lado direito', 'lim x→2⁺ 1/(x − 2)', [
      step('Para x um pouco maior que 2, x − 2 é:', 'Positivo', 'Pense em x = 2,001.', 'x − 2 = 0,001 > 0.', ['Positivo', 'Negativo']),
      step('Ele tende a zero. Então 1/(x − 2) tende a:', '+∞|∞|inf|+inf', 'Positivo muito pequeno no denominador.', 'Positivo pequeno no denominador faz o quociente crescer: +∞.')
    ], 'Sinal do denominador + tamanho: sai o sinal do infinito.'),
    task('Pela esquerda', 'lim x→0⁻ 1/x', '−∞|-∞|-inf', 'Pense em x = −0,001.', 'Quociente negativo e crescente em módulo: −∞.'),
    task('Outro alvo', 'lim x→3⁻ 1/(x − 3)', '−∞|-∞|-inf', 'x − 3 < 0 à esquerda.', 'Denominador negativo pequeno: −∞.'),
    task('Quadrado', 'lim x→0 1/x²', '∞|+∞|inf|+inf', 'x² é sempre positivo.', 'Positivo dos dois lados: +∞.'),
    task('Com numerador', 'lim x→−1⁺ 3/(x + 1)', '∞|+∞|inf|+inf', 'À direita de −1, x + 1 > 0.', 'Numerador positivo e denominador positivo pequeno: +∞.'),
    task('Quantas assíntotas?', 'f(x) = 1/((x − 1)(x + 4)).   Quantas assíntotas verticais?', '2', 'Onde o denominador zera?', 'Em x = 1 e x = −4.', ['0', '1', '2']),
    paper('Sinal do numerador', 'lim x→2⁻ (x + 1)/(x − 2)', '−∞|-∞|-inf', 'Numerador vale 3 > 0.', 'Denominador negativo e pequeno ⇒ −∞.')
  ]),
  phase('Assíntotas e sinais', [
    pill('Tabela de sinais', [
      'Em racionais, fatore o denominador. Cada fator que zera em a pode criar uma assíntota vertical em x = a.',
      'Só vira assíntota se o numerador NÃO zerar ali. Se também zerar, pode ser só um buraco (como (x² − 4)/(x − 2)).',
      'Para decidir o sinal, avalie cada fator perto do ponto, de cada lado.'
    ], 'assíntota vertical em a  ⇔  denominador → 0 e numerador não → 0'),
    guided('Duas fatores no denominador', 'lim x→3⁺ (x + 2)/(x² − 9)', [
      step('Sinal do numerador em x = 3:', 'Positivo', '3 + 2 = 5.', 'O numerador vale 5 > 0.', ['Positivo', 'Negativo']),
      step('x² − 9 = (x − 3)(x + 3). Para x > 3 (perto de 3), o sinal é:', 'Positivo', 'Ambos os fatores são positivos.', '(+)(+) = +.', ['Positivo', 'Negativo']),
      step('Logo o limite é:', '∞|+∞|inf|+inf', 'Positivo sobre positivo pequeno.', '+∞.')
    ], 'Sinal por sinal, depois conclua.'),
    task('Mesma função, outro lado', 'lim x→3⁻ (x + 2)/(x² − 9)', '−∞|-∞|-inf', 'Para x < 3: (x − 3) < 0.', 'Denominador negativo pequeno: −∞.'),
    task('Em −3', 'lim x→−3⁺ (x + 2)/(x² − 9)', '∞|+∞|inf|+inf', 'Numerador −1; fator x − 3 < 0 e x + 3 > 0.', 'Denominador negativo e numerador negativo: +∞.'),
    task('Sinal do numerador', 'lim x→0⁺ (x − 1)/x', '−∞|-∞|-inf', 'Numerador vale −1.', 'Negativo sobre positivo pequeno: −∞.'),
    task('Quando é buraco', 'lim x→2 (x² − 4)/(x − 2)', '4', 'O numerador zera também.', 'Fatorando: x + 2 → 4. Aqui é buraco, não assíntota.'),
    task('Mesmo sinal dos dois lados', 'lim x→1 (x + 3)/(x − 1)²   é:', '+∞', 'O quadrado é sempre positivo.', 'O quadrado torna o sinal positivo dos dois lados: +∞.', ['−∞', '+∞', 'Não existe']),
    paper('Racional com dois fatores', 'lim x→−2⁻ (x − 1)/(x² + 3x + 2)', '−∞|-∞|-inf', 'x² + 3x + 2 = (x + 1)(x + 2).', 'Para x < −2, os dois fatores são negativos ⇒ denominador positivo. Numerador −3 ⇒ −∞.')
  ]),
  phase('Termos dominantes', [
    pill('Quem manda no infinito?', [
      'Quando x é gigante, o termo de maior grau “engole” os outros. Em 3x² + 100x, o 100x vira trocado perto de 3x².',
      'Então, em racionais, compare os graus: grau do numerador < grau do denominador ⇒ limite 0; iguais ⇒ razão dos coeficientes líderes; maior ⇒ ±∞.',
      'Macete: divida tudo pela maior potência do denominador. Os termos 1/x, 1/x² viram zero.'
    ], 'grau N < grau D ⇒ 0    =  ⇒ razão dos líderes    >  ⇒ ±∞'),
    guided('Dividindo pela maior potência', 'lim x→∞ (4x² + 2)/(2x² − x)', [
      step('Divida tudo por x². O numerador fica 4 + ___ ', '2/x²', 'Divida 2 por x².', '(4x² + 2)/x² = 4 + 2/x².'),
      step('O denominador fica 2 − ___ ', '1/x', 'Divida −x por x².', '(2x² − x)/x² = 2 − 1/x.'),
      step('No limite, 2/x² e 1/x vão a zero. Sobra:', '2', '4/2.', 'O limite é 2.')
    ], 'Os termos de menor grau somem.'),
    task('Mesmo grau', 'lim x→∞ (3x + 1)/(x − 5)', '3', 'Razão dos coeficientes de x.', '3/1 = 3.'),
    task('Grau menor em cima', 'lim x→∞ (5x² − x)/(x³ + 2)', '0', 'Denominador de grau 3.', 'Grau do numerador menor ⇒ 0.'),
    task('Menos infinito', 'lim x→−∞ (2x² + x)/(5x² − 3)', '2/5', 'Mesmo grau.', '2/5.'),
    task('Grau maior em cima', 'lim x→∞ (x³ + 1)/(x² + 5)', '∞|+∞|inf|+inf', 'Compare os graus.', 'Cresce sem limite: +∞.'),
    task('Classifique', 'lim x→∞ (x² + 3x)/(x⁴ − 1)', '0', 'Grau 2 sobre grau 4.', 'O denominador cresce muito mais rápido: 0.', ['0', '1', '∞']),
    paper('Treino', 'lim x→∞ (3x² − x + 4)/(6x² + 2x)', '1/2', 'Divida por x².', '3/6 = 1/2.')
  ]),
  phase('Raízes no infinito', [
    pill('Cuidado: √(x²) = |x|', [
      'Raiz quadrada nunca é negativa: √(x²) = |x|, não x. Isso só importa quando x → −∞.',
      'Se x → +∞, |x| = x. Se x → −∞, |x| = −x. Um sinal que muda a resposta!',
      'Macete: para dividir por x dentro de uma raiz, escreva x = √(x²) se x > 0, ou x = −√(x²) se x < 0.'
    ], 'x → +∞: √(x²) = x      x → −∞: √(x²) = −x'),
    task('Quanto vale √(x²)?', 'Para x → −∞, √(x²) é igual a:', '−x', 'A raiz é sempre positiva.', 'Como x < 0, |x| = −x.', ['x', '−x', '0']),
    guided('Divisão por x', 'lim x→∞ (2x + 1)/√(x² + 3)', [
      step('Divida cima e baixo por x. O numerador fica:', '2+1/x', '(2x + 1)/x.', '2 + 1/x.'),
      step('Para x > 0, o denominador fica √(x² + 3)/x = √(1 + ___ )', '3/x²', 'Entre x² dentro da raiz.', '√(1 + 3/x²).'),
      step('No limite:', '2', 'Numerador 2, denominador √1 = 1.', 'O limite é 2.')
    ], 'Com x > 0, divide-se sem trocar sinal.'),
    task('Para −∞', 'lim x→−∞ (2x + 1)/√(x² + 3)', '-2', 'Agora √(x²) = −x.', 'Denominador ≈ −x. Dividindo: 2x/(−x) = −2.'),
    task('Raiz do numerador', 'lim x→∞ √(4x² + x)/x', '2', 'x > 0.', '√(4 + 1/x) → 2.'),
    task('Sinal negativo', 'lim x→−∞ √(9x² + 1)/x', '-3', 'Raiz ≈ 3|x| = −3x.', '−3x/x = −3.'),
    task('Ordem 1', 'lim x→∞ √(x² + 1)/(x + 2)', '1', 'x > 0.', '√(x²+1)/x → 1 e (x+2)/x → 1.'),
    paper('Treino', 'lim x→−∞ (5x − 1)/√(4x² + x)', '-5/2', 'Raiz ≈ |2x| = −2x.', '5x/(−2x) = −5/2.')
  ]),
  phase('∞ − ∞ e o conjugado', [
    pill('Quando a subtração é armadilha', [
      '∞ − ∞ é indeterminado: dois gigantes brigando e o resultado depende de quem vence (ou se empatam).',
      'Se há raiz, a saída é o conjugado: (√A − B)(√A + B) = A − B². A diferença vira um quociente que podemos domar.',
      'Depois divida por x (ou por |x|) como na fase anterior.'
    ], '√(x² + bx) − x = bx / (√(x² + bx) + x)'),
    task('Reconheça a forma', 'lim x→∞ (√(x² + 1) − x)  tem forma:', '∞ − ∞', 'Os dois termos crescem sem limite.', 'É ∞ − ∞: indeterminada.', ['∞/∞', '∞ − ∞', '0/0']),
    guided('Racionalizando no infinito', 'lim x→∞ (√(x² + 6x) − x)', [
      step('Multiplique pelo conjugado √(x²+6x) + x. O numerador vira:', '6x', '(x² + 6x) − x².', 'Dá 6x.'),
      step('Divida cima e baixo por x. O denominador fica √(1 + 6/x) + 1, que tende a:', '2', '√1 + 1.', 'O denominador tende a 2.'),
      step('O limite é:', '3', '6/2.', 'O limite é 3.')
    ], 'Conjugado → dividir por x → limite.'),
    task('Mesma técnica', 'lim x→∞ (√(x² + 4x) − x)', '2', 'Numerador: 4x.', '4/2 = 2.'),
    task('Com x', 'lim x→∞ (√(x² + x) − x)', '1/2', 'Numerador: x.', '1/2.'),
    task('Para −∞', 'lim x→−∞ (√(x² + 4x) + x)', '-2', 'Conjugado: √(x²+4x) − x. Para x < 0, √ ≈ −x.', '4x/(√ − x) com √ ≈ −x: denominador ≈ −2x. 4x/(−2x) = −2.'),
    task('Duas raízes', 'lim x→∞ (√(x² + 1) − √(x² − 1))', '0', 'Conjugado: soma das raízes.', 'O numerador é 2 e o denominador cresce: 0.'),
    paper('Treino', 'lim x→∞ (√(4x² + x) − 2x)', '1/4', 'Conjugado: √(4x²+x) + 2x. Numerador: x.', 'x/(√(4x²+x) + 2x) = 1/(√(4+1/x)+2) → 1/4.')
  ]),
  phase('Álgebra do infinito', [
    pill('Contas com ∞', [
      'Pense no infinito como um valor “gigante”: ∞ + ∞ = ∞, ∞ · ∞ = ∞, ∞ + k = ∞, k/∞ = 0 (com k fixo).',
      'Produto com sinal: (−∞)·(+∞) = −∞. E um expoente positivo cresce: eˣ → ∞ quando x → ∞ e eˣ → 0 quando x → −∞.',
      'Alertas indeterminados: ∞ − ∞, ∞/∞, 0·∞. Nesses, não existe regra única: é preciso transformar a expressão.'
    ], 'determinados: ∞+∞, ∞·∞, k/∞       indeterminados: ∞−∞, ∞/∞, 0·∞'),
    task('É determinado?', '∞ + ∞  vale:', '∞', 'Dois gigantes somados continuam gigantes.', '∞ + ∞ = ∞.', ['∞', 'Indeterminado', '0']),
    guided('Fatorando a maior potência', 'lim x→∞ (x³ − 5x²)', [
      step('Coloque x³ em evidência: x³(1 − ___ )', '5/x', '5x²/x³.', 'x³(1 − 5/x).'),
      step('O fator (1 − 5/x) tende a:', '1', '5/x → 0.', 'Tende a 1.'),
      step('O produto de x³ → ∞ por 1:', '∞|+∞|inf|+inf', 'Gigante vezes 1.', '+∞.')
    ], 'Em polinômios, o termo de maior grau decide.'),
    task('Polinômio a −∞', 'lim x→−∞ (x³ + x)', '−∞|-∞|-inf', 'Potência ímpar de negativo é negativa.', 'Domina x³ → −∞.'),
    task('Dois termos que brigam', 'lim x→∞ (x − x²)', '−∞|-∞|-inf', 'Coloque x² em evidência: x²(1/x − 1).', 'x²·(−1) → −∞.'),
    task('Constante sobre infinito', 'lim x→∞ 5/(x² + 1)', '0', 'Denominador gigante.', 'k/∞ = 0.'),
    task('Exponencial', 'lim x→−∞ 2ˣ', '0', '2ˣ = 1/2⁻ˣ.', 'Quando x → −∞, 2ˣ → 0.'),
    paper('Treino', 'lim x→−∞ (2x³ − x² + 1)', '−∞|-∞|-inf', 'Domina 2x³.', '2x³ → −∞.')
  ]),
  phase('Chefão do infinito', [
    pill('Primeiro pergunte: para onde vai x?', [
      'x → a⁺/a⁻ com denominador → 0 ⇒ sinais. x → ±∞ ⇒ termos dominantes. ∞ − ∞ com raiz ⇒ conjugado.',
      'Cuidado com √(x²) = |x| quando x → −∞.',
      'Chefão: tente acertar tudo de primeira.'
    ]),
    task('Racional no infinito', 'lim x→∞ (6x² − x)/(3x² + 1)', '2', 'Mesmo grau.', '6/3 = 2.'),
    task('Assíntota vertical', 'lim x→2⁻ (x + 1)/(x² − 4)', '−∞|-∞|-inf', 'x² − 4 = (x − 2)(x + 2). À esquerda de 2: (x−2)<0 e (x+2)>0.', 'Denominador negativo pequeno, numerador 3: −∞.'),
    guided('Infinito menos infinito', 'lim x→∞ (√(x² + 8x) − x)', [
      step('O numerador após o conjugado:', '8x', '(x² + 8x) − x².', 'Dá 8x.'),
      step('Dividindo por x, o denominador tende a:', '2', '√1 + 1.', 'Tende a 2.'),
      step('O limite é:', '4', '8/2.', 'O limite é 4.')
    ], 'Mesma técnica da fase anterior.'),
    task('Raiz em −∞', 'lim x→−∞ (3x − 1)/√(x² + 2)', '-3', '√(x²) = −x.', '3x/(−x) = −3.'),
    task('Quarto grau', 'lim x→∞ (x⁴ − x)/(2x⁴ + x²)', '1/2', 'Mesmo grau.', '1/2.'),
    paper('Treino final', 'lim x→−∞ (√(x² + 6x) + x)', '-3', 'Conjugado √(x²+6x) − x; √ ≈ −x.', '6x/(−2x) = −3.')
  ], {boss: true})
]));

// ───────────────────────── UNIDADE 8 · REVISÃO DA SEÇÃO ─────────────────────────
COURSE.limites.units.push(unit('Revisão da seção', 'Escolha a técnica e resolva no papel', [
  phase('Escolha a técnica', [
    pill('Árvore de decisão', [
      'Passo 1: substitua. Se der número, acabou. Se der 0/0, olhe a expressão: polinômios ⇒ fatore; raízes ⇒ conjugado; seno/cosseno/eˣ ⇒ fundamental.',
      'Se x → ±∞: divida pela maior potência; se há ∞ − ∞ com raiz, conjugado. Se o denominador → 0 com numerador ≠ 0, analise sinais.',
      'Escolher a ferramenta certa é metade da solução.'
    ]),
    guided('Qual é a jogada?', 'lim x→4 (x² − 16)/(x − 4)', [
      step('Técnica:', 'Fatorar', 'Há 0/0 com polinômios.', 'Diferença de quadrados.', ['Fatorar', 'Racionalizar', 'Limite fundamental']),
      step('Resultado:', '8', 'x + 4 em x = 4.', 'O limite é 8.')
    ]),
    guided('E esta?', 'lim x→0 (√(x + 1) − 1)/x', [
      step('Técnica:', 'Racionalizar', 'Há raiz no numerador.', 'Conjugado.', ['Fatorar', 'Racionalizar', 'Limite fundamental']),
      step('Resultado:', '1/2', '1/(√1 + 1).', 'O limite é 1/2.')
    ]),
    guided('E trigonometria?', 'lim x→0 sen(6x)/(2x)', [
      step('Técnica:', 'Limite fundamental', 'Aparece sen(kx)/x.', 'Seno sobre x.', ['Fatorar', 'Racionalizar', 'Limite fundamental']),
      step('Resultado:', '3', '6/2.', 'O limite é 3.')
    ]),
    guided('E no infinito?', 'lim x→∞ (5x² + 1)/(2x² − 3)', [
      step('Técnica:', 'Termos dominantes', 'x → ∞ em racional.', 'Compare os graus.', ['Fatorar', 'Termos dominantes', 'Limite fundamental']),
      step('Resultado:', '5/2', '5/2.', 'O limite é 5/2.')
    ]),
    task('Só substituir', 'lim x→1 (x² + 3x)/(x + 1)', '2', 'O denominador não zera.', '4/2 = 2.'),
    paper('Treino', 'lim x→−1 (x² − 1)/(x² + 3x + 2)', '-2', 'Fatore em cima e embaixo.', '(x − 1)/(x + 2) → −2.')
  ]),
  phase('Prática mista I', [
    pill('Erros comuns', [
      'Erro 1: cancelar antes de fatorar. Erro 2: esquecer o sinal em x → −∞. Erro 3: substituir direto sem checar o denominador.',
      'Erro 4: achar que 0/0 = 0 ou 1.',
      'Antes de responder, volte e confira cada passo.'
    ]),
    task('Trinômios', 'lim x→3 (x² − 9)/(x² − 5x + 6)', '6', 'Denominador (x − 2)(x − 3).', '(x + 3)/(x − 2) → 6.'),
    task('Raiz', 'lim x→0 (√(x + 25) − 5)/x', '1/10', 'Conjugado.', '1/(5 + 5) = 1/10.'),
    task('Seno', 'lim x→0 sen(5x)/(2x)', '5/2', 'Divida por x.', '5/2.'),
    task('Infinito', 'lim x→∞ (4x³ − x)/(2x³ + 7)', '2', 'Mesmo grau.', '4/2 = 2.'),
    task('Sinal', 'lim x→1⁺ 2/(1 − x)', '−∞|-∞|-inf', 'Para x > 1, 1 − x < 0.', 'Denominador negativo pequeno: −∞.'),
    guided('Cubo sobre quadrado', 'lim x→2 (x³ − 8)/(x² − 4)', [
      step('Fatore o numerador.', '(x−2)(x²+2x+4)', 'Diferença de cubos.', 'x³ − 8 = (x − 2)(x² + 2x + 4).', ['(x−2)(x²+2x+4)', '(x−2)³']),
      step('Fatore o denominador.', '(x−2)(x+2)', 'Diferença de quadrados.', 'x² − 4 = (x − 2)(x + 2).', ['(x−2)(x+2)', '(x−2)²']),
      step('O limite de (x²+2x+4)/(x+2) em 2:', '3', '12/4.', 'O limite é 3.')
    ]),
    paper('Cosseno', 'lim x→0 (1 − cos x)/(2x²)', '1/4', 'Use 1/2 · 1/2.', '(1/2)·(1/2) = 1/4.')
  ]),
  phase('Prática mista II', [
    pill('Várias ferramentas', [
      'Continuidade e limites trabalham juntos: um parâmetro k fecha o buraco quando k = limite.',
      'Raiz no infinito? Conjugado. Exponencial perto de 0? eˣ − 1 ≈ x.',
      'Nesta fase os problemas misturam tudo.'
    ]),
    task('Parâmetro', 'f(x) = (√(x + 1) − 1)/x para x ≠ 0;   f(0) = k.   k para continuidade:', '1/2', 'k = limite em 0.', 'O limite é 1/2.'),
    task('Raiz no −∞', 'lim x→−∞ (√(x² + 3x) + x)', '-3/2', 'Conjugado; √ ≈ −x.', '3x/(−2x) = −3/2.'),
    task('Exponencial', 'lim x→0 (e^(4x) − 1)/(2x)', '2', 'Divida por x.', '4/2 = 2.'),
    task('Assíntota', 'lim x→4⁻ (x + 1)/(x − 4)', '−∞|-∞|-inf', 'Numerador 5.', 'À esquerda de 4, x − 4 < 0: −∞.'),
    guided('Fatorar e racionalizar', 'lim x→5 (x² − 25)/(√(x − 1) − 2)', [
      step('Multiplique por √(x−1) + 2. O denominador vira:', 'x-5', '(x − 1) − 4.', 'Dá x − 5.'),
      step('Fatore x² − 25 e cancele. Sobra (x + 5)(√(x−1) + 2). Em x = 5:', '40', '10·4.', 'O limite é 40.')
    ]),
    paper('Potência', 'lim x→1 (x⁴ − 1)/(x² − 1)', '2', 'Fatore x⁴ − 1 = (x² − 1)(x² + 1).', 'Sobra x² + 1 → 2.')
  ]),
  phase('Armadilhas', [
    pill('Onde os alunos tropeçam', [
      'O valor da função no ponto pode ser outro: o limite olha só os vizinhos.',
      '|x|/x vale 1 à direita de 0 e −1 à esquerda: os limites laterais discordam, então o bilateral não existe.',
      'Em x → −∞, atenção ao sinal de √(x²).'
    ]),
    task('Mesmo grau', 'lim x→∞ (x² + x)/x²', '1', 'Divida por x².', '1 + 1/x → 1.'),
    task('Valor isolado', 'f(x) = x + 2 para x ≠ 1;   f(1) = 9.   lim x→1 f(x) = ?', '3', 'O valor f(1) não importa.', 'Os vizinhos seguem x + 2: 3.'),
    task('Sinal em −∞', 'lim x→−∞ √(x²)/x', '-1', 'Aqui √(x²) = −x.', '−x/x = −1.'),
    task('Limite lateral', 'lim x→0⁻ |x|/x', '-1', 'Para x < 0, |x| = −x.', '−x/x = −1.'),
    task('Os lados discordam', 'lim x→0 |x|/x', 'Não existe|nao existe|não existe', 'Compare 1 e −1.', 'Limites laterais diferentes: não existe.'),
    guided('Valor absoluto', 'lim x→1 (x² − 1)/|x − 1|', [
      step('Para x > 1, |x − 1| = x − 1. O limite pela direita é:', '2', 'x + 1 → 2.', 'x + 1 → 2.'),
      step('Para x < 1, |x − 1| = −(x − 1). O limite pela esquerda é:', '-2', '−(x + 1).', '−(x + 1) → −2.'),
      step('O limite bilateral:', 'Não existe', 'Os lados discordam.', '2 ≠ −2.', ['2', '−2', 'Não existe'])
    ]),
    paper('Treino', 'lim x→2⁻ |x − 2|/(x − 2)', '-1', 'Para x < 2, |x − 2| = −(x − 2).', 'O quociente é −1.')
  ]),
  phase('Chefão da seção', [
    pill('Chefão final de Limites', [
      'Aqui tudo se mistura: fatoração, conjugado, fundamentais, infinito e continuidade.',
      'Primeiro substitua. Depois escolha a ferramenta.',
      'O que errar volta no final. Você consegue!'
    ]),
    task('Raiz', 'lim x→0 (√(x + 36) − 6)/x', '1/12', 'Conjugado.', '1/(6 + 6) = 1/12.'),
    task('Cubos', 'lim x→3 (x³ − 27)/(x − 3)', '27', 'Diferença de cubos.', 'x² + 3x + 9 → 27.'),
    guided('Parâmetro k', 'f(x) = kx + 3 se x < 1;   f(x) = x² + 2k se x ≥ 1', [
      step('Pela esquerda, o limite é:', 'k+3|3+k', 'Substitua x = 1.', 'k + 3.'),
      step('Pela direita, o limite é:', '1+2k|2k+1', 'Substitua x = 1.', '1 + 2k.'),
      step('Iguale e resolva: k = ', '2', 'k + 3 = 1 + 2k.', 'Então k = 2.')
    ]),
    task('Raiz no infinito', 'lim x→∞ (√(x² + 2x) − x)', '1', 'Conjugado.', '2x/(2x) = 1.'),
    task('Assíntota', 'lim x→−1⁺ (x − 2)/(x + 1)', '−∞|-∞|-inf', 'Numerador −3.', 'Negativo sobre positivo pequeno: −∞.'),
    paper('Dominância', 'lim x→∞ (3x² + x)/√(x⁴ + 1)', '3', '√(x⁴ + 1) ≈ x².', '3.'),
    paper('Combinação', 'lim x→0 (√(x + 9) − 3)/sen(2x)', '1/12', 'Racionalize e use sen(2x)/x → 2.', '[x/(√+3)]/sen(2x) → (1/6)(1/2) = 1/12.')
  ], {boss: true})
]));
