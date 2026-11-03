// Course catalog. References retain the existing phase IDs and saved progress.
const subjectSection = (id, title, description, topics, refs = []) => ({id, title, description, topics, refs});
const SUBJECTS = {
  calculo: {title: 'Cálculo Diferencial e Integral', icon: '∫', sections: [
    subjectSection('limites', 'Introdução a limites', 'Da aproximação intuitiva às técnicas de cálculo de limites.', ['Intuição e limites laterais', 'Propriedades dos limites', 'Indeterminação e fatoração', 'Racionalização', 'Limites fundamentais', 'Limites infinitos e no infinito'], [['limites',0],['limites',1],['limites',3],['limites',4],['limites',5],['limites',6]]),
    subjectSection('continuidade', 'Continuidade', 'Entenda quando uma função não tem interrupções.', ['As três condições de continuidade', 'Funções contínuas e funções por partes', 'Tipos de descontinuidade', 'Teorema do Valor Intermediário'], [['limites',2]]),
    subjectSection('revisao-limites', 'Revisão de limites e continuidade', 'Consolide as técnicas antes de seguir para as derivadas.', ['Escolha da técnica', 'Prática mista', 'Armadilhas e desafio final'], [['limites',7]]),
    subjectSection('derivadas', 'Introdução às derivadas', 'Da taxa de variação à definição de derivada.', ['Taxa média e instantânea', 'Retas secantes e tangentes', 'Quociente de Newton', 'Derivabilidade'], [['derivadas',0],['derivadas',1]]),
    subjectSection('regras-derivacao', 'Regras de derivação', 'Construa sua caixa de ferramentas para derivar.', ['Potência, soma e constante', 'Produto e quociente', 'Regra da cadeia', 'Derivadas de funções especiais'], [['derivadas',2],['derivadas',3],['derivadas',4],['derivadas',5]]),
    subjectSection('implicitas', 'Derivação implícita e ordem superior', 'Derive relações implícitas e investigue derivadas sucessivas.', ['Segunda derivada e ordem n', 'Derivação implícita', 'Aplicações e interpretação'], [['derivadas',6]]),
    subjectSection('aplicacoes-derivadas', 'Aplicações das derivadas', 'Use derivadas para interpretar e resolver problemas.', ['Taxas relacionadas', 'Diferenciais e aproximação linear', 'Teoremas de Rolle e do Valor Médio', 'Regra de L’Hôpital']),
    subjectSection('comportamento', 'Comportamento das funções', 'Leia o comportamento de uma função a partir das derivadas.', ['Crescimento e decrescimento', 'Pontos críticos e extremos', 'Concavidade e inflexão', 'Esboço completo de gráficos', 'Problemas de otimização']),
    subjectSection('integrais', 'Introdução às integrais', 'Acumulação, áreas e a operação inversa da derivação.', ['Primitivas e integral indefinida', 'Somas de Riemann', 'Integral definida', 'Teorema Fundamental do Cálculo', 'Propriedades e valor médio']),
    subjectSection('tecnicas-integracao', 'Técnicas de integração', 'Escolha a ferramenta adequada para cada integral.', ['Substituição de variável', 'Integração por partes', 'Integrais trigonométricas', 'Substituição trigonométrica', 'Frações parciais', 'Integração numérica']),
    subjectSection('aplicacoes-integrais', 'Aplicações das integrais', 'Transforme acumulação em soluções concretas.', ['Áreas entre curvas', 'Volumes por discos e cascas', 'Comprimento de arco', 'Áreas de superfícies de revolução', 'Trabalho, massa e centro de massa']),
    subjectSection('improprias', 'Integrais impróprias', 'Investigue integrais em intervalos infinitos e com singularidades.', ['Intervalos ilimitados', 'Integrandos descontínuos', 'Convergência e divergência', 'Critérios de comparação']),
    subjectSection('sequencias-series', 'Sequências e séries', 'Estude processos infinitos e aproximações por polinômios.', ['Limites de sequências', 'Séries geométricas e telescópicas', 'Testes de convergência', 'Convergência absoluta e condicional', 'Séries de potências', 'Taylor e Maclaurin']),
    subjectSection('parametricas-polares', 'Curvas paramétricas e polares', 'Novas formas de representar e estudar curvas.', ['Equações paramétricas', 'Derivação e integração paramétricas', 'Coordenadas polares', 'Áreas e comprimento em polares']),
    subjectSection('multivariavel', 'Funções de várias variáveis', 'Leve os conceitos de cálculo a mais dimensões.', ['Domínio, gráficos e curvas de nível', 'Limites e continuidade em várias variáveis', 'Derivadas parciais', 'Regra da cadeia multivariável', 'Gradiente e derivada direcional', 'Plano tangente e aproximação linear']),
    subjectSection('otimizacao-multivariavel', 'Otimização em várias variáveis', 'Encontre extremos com e sem restrições.', ['Pontos críticos e matriz Hessiana', 'Máximos e mínimos', 'Multiplicadores de Lagrange']),
    subjectSection('integrais-multiplas', 'Integrais múltiplas', 'Acumule quantidades em regiões do plano e do espaço.', ['Integrais duplas e triplas', 'Teorema de Fubini', 'Mudança de variáveis e Jacobiano', 'Coordenadas polares, cilíndricas e esféricas', 'Aplicações a massa e volume']),
    subjectSection('calculo-vetorial', 'Cálculo vetorial', 'Integre campos e conecte resultados locais e globais.', ['Campos vetoriais e potenciais', 'Integrais de linha', 'Teorema de Green', 'Integrais de superfície', 'Divergente e rotacional', 'Teoremas de Gauss e Stokes']),
    subjectSection('conclusao', 'Conclusão do curso', 'Conecte o que aprendeu do básico ao avançado.', ['Revisão integrada', 'Problemas interdisciplinares', 'Projeto de aplicação', 'Desafio final de domínio'])
  ]},
  vetorial: {title: 'Vetorial e Geometria Analítica', icon: '↗', sections: [
    subjectSection('coordenadas', 'Coordenadas e vetores', 'Do plano cartesiano aos vetores no espaço.', ['Sistemas de coordenadas', 'Vetores e operações', 'Norma e vetor unitário', 'Combinação linear e dependência']),
    subjectSection('produtos', 'Produtos entre vetores', 'Meça ângulos, áreas e volumes com vetores.', ['Produto escalar', 'Projeção e ortogonalidade', 'Produto vetorial', 'Produto misto']),
    subjectSection('retas-planos', 'Retas e planos', 'Descreva e relacione objetos no espaço.', ['Equações da reta', 'Equações do plano', 'Posições relativas', 'Distâncias e ângulos', 'Interseções']),
    subjectSection('conicas', 'Cônicas', 'Conheça as curvas fundamentais do plano.', ['Circunferência', 'Elipse', 'Hipérbole', 'Parábola', 'Translação e rotação de eixos']),
    subjectSection('quadricas', 'Quádricas', 'Explore superfícies no espaço tridimensional.', ['Esferas e elipsoides', 'Paraboloides', 'Hiperboloides', 'Cones e cilindros']),
    subjectSection('transformacoes', 'Matrizes e transformações', 'Conecte a álgebra às transformações geométricas.', ['Matrizes e determinantes', 'Sistemas lineares', 'Transformações lineares', 'Mudança de base']),
    subjectSection('conclusao-vetorial', 'Conclusão de Vetorial e Geometria Analítica', 'Integre álgebra, vetores e geometria.', ['Revisão integrada', 'Aplicações', 'Desafio final'])
  ]},
  precalculo: {title: 'Pré-cálculo', icon: '𝑥', sections: [
    subjectSection('numeros', 'Números e operações', 'Fortaleça sua base matemática.', ['Conjuntos numéricos', 'Frações e proporções', 'Potências e radicais', 'Intervalos e módulo'], [['precalculoNumeros',0],['precalculoNumeros',1]]),
    subjectSection('algebra', 'Álgebra essencial', 'Ganhe fluência nas manipulações algébricas.', ['Produtos notáveis', 'Fatoração', 'Frações algébricas', 'Equações e inequações', 'Sistemas de equações']),
    subjectSection('funcoes', 'Funções e gráficos', 'Entenda relações e suas representações.', ['Domínio e imagem', 'Funções afins e quadráticas', 'Polinômios e funções racionais', 'Composição e inversa', 'Transformações de gráficos']),
    subjectSection('trigonometria', 'Trigonometria', 'Construa a base trigonométrica do cálculo.', ['Ângulos e radianos', 'Círculo trigonométrico', 'Seno, cosseno e tangente', 'Identidades e equações', 'Gráficos trigonométricos']),
    subjectSection('exponenciais', 'Exponenciais e logaritmos', 'Explore crescimento, decaimento e escalas.', ['Funções exponenciais', 'Logaritmos e propriedades', 'Equações exponenciais e logarítmicas', 'Modelagem']),
    subjectSection('conclusao-precalculo', 'Pronto para o cálculo', 'Revise os pré-requisitos e prepare o próximo passo.', ['Geometria e medidas', 'Sequências e progressões', 'Revisão dos pré-requisitos', 'Desafio final'])
  ]}
};


