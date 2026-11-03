# Fundamentos e funções: revisão para Cálculo

## Hierarquia e público

Disciplina: Cálculo Diferencial e Integral. Seção 1: Fundamentos e funções. Unidade 1 da seção: Números reais. Unidade 2 da seção: Intervalos e módulo. Cada unidade contém fases, e cada fase contém itens de estudo e prática.

Esta seção revisa pré-requisitos para quem já estudou esses assuntos. O foco é recuperar propriedades, condições de validade, interpretação e conexões úteis em Cálculo. Contagem, soma, subtração e aprendizagem inicial de frações pertencem ao reforço na disciplina Pré-cálculo.

A numeração das unidades recomeça em 1 em cada seção. As próximas seções do curso aprofundam o conteúdo de Cálculo; o ritmo de revisão de Fundamentos não deve ser aplicado automaticamente a conteúdo novo.

## Padrão de cada unidade de revisão

1. Recuperação concisa de definições, notação e propriedades.
2. Exemplo guiado que exige interpretar condições, e não decompor contas elementares.
3. Prática variada sobre equivalência, restrições, representação e erros frequentes.
4. Produção independente da resposta, com expressão exata quando apropriado.
5. Desafio de domínio integrado.

Cobrir do começo ao fim significa revisar os pontos essenciais do tópico e suas condições de aplicação, respeitando o conhecimento prévio do aluno.

## Conteúdo disponível

### Unidade 1: Números reais

7 fases, 50 itens: conjuntos e restrições reais; ordem e desigualdades; racionais, dízimas e igualdade exata; potências e condições de uso; radicais, módulo e equivalência; reta, estimativas e precisão; desafio de revisão.

Aplicações preparatórias: exclusão de denominador nulo, preservação da restrição após simplificar, inversão da desigualdade ao multiplicar por negativo, raiz principal e valor absoluto, expoentes fracionários e precisão.

### Unidade 2: Intervalos e módulo

5 fases, 36 itens: intervalos e condições; união, interseção e complemento; módulo como distância e definição por partes; equações e desigualdades de distância; desafio de revisão.

Aplicações preparatórias: descrição de domínios, extremos incluídos e excluídos, tradução entre desigualdade e intervalo, expressões por partes e quocientes com módulo.

## Unidades 3 a 8 (concluídas)

Cada unidade tem 6 fases (5 de aula e o desafio). Cada fase segue: pílula do Rubi com a regra em destaque, exemplo guiado, prática com variação e uma última questão sem roteiro.

3. Revisão algébrica (47 itens): produtos notáveis e fator comum; trinômios e raízes; cubos e agrupamento; frações algébricas e restrições; equações, inequações e sinal.
4. Funções e gráficos (48): função, domínio e imagem; domínio de racionais e radicais; zeros e sinal; funções por partes; famílias (afim, quadrática, racional, raiz).
5. Transformações, composição e inversas (48): translações, reflexões e escalas; composição; domínio da composta; injetividade e restrição; inversa.
6. Revisão trigonométrica (48): radianos e círculo; valores notáveis e sinais; identidades (incluindo 1 − cos 2x = 2 sen²x); período e gráficos; equações essenciais.
7. Exponenciais e logaritmos (48): exponencial; logaritmo como inversa; propriedades e restrições; e e ln; equações com teste de solução falsa.
8. Revisão integrada para limites (48): qual ferramenta usar (0/0, k/0); simplificar sem perder o domínio (buracos); funções por partes (salto); conjugados; valores de referência de sen, cos, eˣ e ln.

Fontes: a ementa da MAC210 (semana 2, "exercícios de revisão sobre funções"), a lista "Resolva você mesmo" (fatoração, racionalização, limites trigonométricos) e o roteiro de Cálculo I. O PDF do OpenStax Calculus Vol. 1 está corrompido neste computador (e também no commit do git), e o livro da UFU começa direto em limites; por isso a redação é original e precisa de revisão editorial.

## Domínio e preservação do progresso

Fases regulares exigem 70% de acertos de primeira. A unidade exige todas as fases dominadas, incluindo seu desafio com 80%. A seção exige todas as unidades prontas e dominadas, seguidas de avaliação própria com 80%. Erros voltam como reforço e não apagam a tentativa inicial. A consulta à ementa é livre.

As 28 fases elementares anteriores (198 itens) estão agora em Pré-cálculo. Seus IDs antigos, com prefixo fundamentos, acompanham o conteúdo, preservando pontuações já salvas. A revisão usa o prefixo fundamentos-revisao-v1: pontuações de contas básicas não concedem domínio das novas questões de revisão. Nenhum progresso é apagado.

Cada disciplina tem sua trilha e seus pré-requisitos. Dominar as contas básicas em Pré-cálculo não é um bloqueio prévio para iniciar a revisão em Cálculo.

## Validação

- `node tools/validate.js`: estrutura dos 1155 itens, incluindo 383 de revisão e 198 de reforço.
- `node tools/validate-mastery.js`: 68 verificações de domínio, pré-requisitos, migração de IDs e hierarquia.
- `node tools/validate-foundations-math.js`: 57 verificações numéricas independentes, incluindo identidades simbólicas em valores amostrados.
- `node tools/validate-review-math.js`: 391 verificações numéricas das unidades 1 a 8 (identidades de fatoração em vários pontos, trigonometria, logaritmos, equações e valores de aproximação).
- As 40 fases de revisão e reforço foram percorridas no motor real com DOM e armazenamento isolados. A numeração local e as trilhas por disciplina também foram verificadas.

O conteúdo é original; questões conceituais e de conjuntos requerem revisão editorial além dos testes automáticos.
