/* Gerado por _fonte/build.py. Nao edite a mao: edite a fonte e rode o build. */
window.TRILHA_CURSOS = window.TRILHA_CURSOS || [];
window.TRILHA_CURSOS.push({
 "id": "dev",
 "nome": "Dev: lógica e fundamentos",
 "icone": "💻",
 "cor": "#2dd4bf",
 "versao": "1.0",
 "descricao": "Do zero à lógica de programação, até virar Dev Jr completo. Lógica primeiro (papel e pseudocódigo), Python depois, JavaScript só na Web.",
 "disciplinas": [
  {
   "id": "DEV1",
   "nome": "Lógica e algoritmos",
   "horas": 30,
   "peso": 25,
   "minPct": 20,
   "etapas": [
    {
     "id": "DEV1-E1",
     "titulo": "O que é um algoritmo",
     "min": 40,
     "md": "> [!abstract] Ao final desta aula você consegue\n> Explicar o que é um algoritmo, achar o furo numa sequência de passos e escrever um procedimento que um \"robô literal\" executa sem perguntar nada.\n\n## 1. Aquecimento (2 min)\n> [!question] Desafio\n> Você precisa explicar a um robô que obedece **ao pé da letra** como fazer um café. Ele só entende o que está escrito. Se você escrever apenas \"faça o café\", o que acontece? Pense 30 segundos antes de abrir a resposta.\n\n> [!success]- Resposta\n> Nada, ou uma bagunça. O robô não sabe: pegar o quê? Água de onde? Quanto pó? Ligar o quê? E ele **nunca pergunta**. Quem escreve é quem precisa pensar em tudo.\n\n## 2. A ideia\nO computador é o funcionário mais obediente e mais burro do mundo: faz **exatamente** o que está escrito, nem uma vírgula a mais.\n\n**Algoritmo** é uma sequência de passos que resolve um problema. Para valer, precisa ser:\n- **Finito:** termina em algum momento.\n- **Claro:** ninguém precisa adivinhar o que um passo quer dizer.\n- **Ordenado:** trocar a ordem muda o resultado, ou quebra tudo.\n\n> [!tip] Pense assim\n> Uma receita de bolo. A receita é a **ideia**, e não importa se está escrita em português ou francês. Quando você a traduz para uma linguagem que o computador entende (Python, JavaScript...), ela vira um **programa**.\n\n## 3. Exemplo trabalhado: o teste dos furos\n```\nRuim:   1. Faça o café.\n\nQuase:  1. Ponha água.  2. Ligue.  3. Sirva.\n        (quanta água? onde? ligue o quê? sirva em quê?)\n\nBom:    1. Encha a jarra com 1 litro de água.\n        2. Despeje a água no reservatório da cafeteira.\n        3. Coloque um filtro de papel no suporte.\n        4. Coloque 6 colheres de pó no filtro.\n        5. Aperte o botão de ligar.\n        6. Espere a luz apagar (o café ficou pronto).\n        7. Sirva na xícara.\n```\n**O teste:** alguém que nunca viu uma cafeteira consegue seguir sem fazer nenhuma pergunta? Se sim, o algoritmo passou.\n\n## 4. Seu mundo (TI)\nProcedimento clássico para limpar a fila de impressão:\n\n```\n1. Pare o serviço Spooler.            (net stop spooler)\n2. Apague os arquivos da pasta PRINTERS.\n3. Inicie o serviço Spooler.          (net start spooler)\n```\nA **ordem** é o que faz funcionar. O Spooler é o serviço do Windows que guarda os trabalhos de impressão em arquivos, e enquanto está rodando ele segura esses arquivos. Apagar antes de parar dá erro ou a fila volta.\n\n> [!tip] Por que isso paga o seu salário\n> **Automação** é pegar um procedimento manual, escrito sem furos, e entregá-lo a uma máquina. DevOps é isso em escala. Quem escreve o passo a passo com precisão já fez a parte mais difícil.\n\n## 5. Termos\n- **Instrução:** um passo único e executável.\n- **Sequência:** instruções em ordem, uma depois da outra.\n- **Ambiguidade:** quando um passo pode ser entendido de duas formas. É o inimigo número um.\n- **Programa:** um algoritmo escrito numa linguagem que o computador entende.\n\n## 6. Mão na massa (no caderno)\n**Exercício 1 ⭐** Escolha uma tarefa do seu dia (café, instalar impressora por IP, tirar um print) e escreva em **6 a 12 passos numerados**. Eu serei o robô literal: vou executar ao pé da letra e mostrar onde quebra.\n\n**Exercício 2 ⭐** O que dá errado nesta sequência? Qual é a ordem correta?\n```\nAtualizar o PC de um usuário:\n1. Reinicie o computador.\n2. Avise o usuário.\n3. Peça para ele salvar o trabalho.\n```\n\n**Exercício 3 ⭐⭐** Coloque estes passos na ordem certa e diga **quais passos dependem de quais**. (As telas do Windows variam; o que importa é a lógica das dependências.)\n```\nA. Clique em Concluir.\nB. Abra Configurações > Impressoras e scanners.\nC. Informe o endereço IP da impressora.\nD. Clique em Adicionar dispositivo e depois em \"Adicionar manualmente\".\nE. Selecione \"Adicionar impressora usando endereço IP ou nome de host\".\nF. Escolha o driver (fabricante e modelo).\nG. Imprima uma página de teste.\n```\n\n**Exercício 4 ⭐⭐** Este pedido é ambíguo: *\"Instale o programa no PC do usuário e deixe tudo configurado.\"* Liste **pelo menos 4 ambiguidades**.\n\n**Exercício 5 ⭐⭐⭐** Escreva o algoritmo para **descobrir o endereço IP da máquina de um usuário e anotar no chamado**. Deve passar no teste dos furos.\n\n## 7. Perguntas de verificação (sem consultar a aula)\n- **V1.** Por que \"Faça o café\" não é um algoritmo? Dê **dois** motivos.\n- **V2.** Com suas palavras, qual a diferença entre **algoritmo** e **programa**?\n- **V3.** Por que a ordem importa no procedimento do Spooler?\n",
     "quiz": [
      {
       "q": "Qual destas frases NÃO descreve um bom algoritmo?",
       "opcoes": [
        "Cada passo é claro, sem ninguém precisar adivinhar",
        "Alguém precisa adivinhar o que cada passo quer dizer",
        "Os passos estão na ordem certa",
        "Termina em algum momento (é finito)"
       ],
       "ok": 1,
       "porque": "O computador nunca pergunta. Se o passo é ambíguo, o algoritmo falha. Ambiguidade é o inimigo número um."
      },
      {
       "q": "Qual é a ordem correta para limpar a fila de impressão?",
       "opcoes": [
        "Apagar os arquivos da pasta PRINTERS, parar o Spooler, iniciar o Spooler",
        "Apagar os arquivos, iniciar o Spooler, parar o Spooler",
        "Parar o Spooler, apagar os arquivos da pasta PRINTERS, iniciar o Spooler",
        "Iniciar o Spooler, apagar os arquivos, parar o Spooler"
       ],
       "ok": 2,
       "porque": "Enquanto o Spooler está rodando, ele segura os arquivos da fila. Primeiro se para o serviço, depois se apaga, depois se inicia de novo."
      },
      {
       "q": "Qual a diferença entre algoritmo e programa?",
       "opcoes": [
        "Algoritmo só existe dentro de computadores",
        "São exatamente a mesma coisa",
        "Programa é sempre menor que o algoritmo",
        "Algoritmo é a sequência de passos (a ideia); programa é esse algoritmo escrito numa linguagem que o computador entende"
       ],
       "ok": 3,
       "porque": "A receita é a ideia. Quando você a traduz para Python, JavaScript etc., ela vira um programa."
      }
     ]
    },
    {
     "id": "DEV1-E2",
     "titulo": "Entrada, processamento e saída",
     "min": 50,
     "md": "> [!abstract] Ao final desta aula você consegue\n> Dividir qualquer problema em **entrada → processamento → saída**, escrever um algoritmo curto em pseudocódigo e usar `DIV` e `MOD` para converter unidades.\n\n## 1. Aquecimento (3 min)\n> [!question] Caixa-preta\n> Uma máquina recebe números e devolve outros: **3 → 9**, **4 → 16**, **5 → 25**.\n> Qual é a regra? Quanto sai se eu entregar **10**? E se entregar **0**, **-2**, ou a palavra **\"banana\"**?\n\n> [!success]- Resposta\n> A regra é multiplicar o número por ele mesmo (elevar ao quadrado). 10 → 100, 0 → 0, -2 → 4. Já \"banana\" quebra a máquina, a menos que alguém tenha pensado nisso antes. Toda máquina espera um **tipo de entrada**.\n\n## 2. A ideia\nTodo algoritmo, script e programa tem três partes:\n- **Entrada:** os dados que chegam.\n- **Processamento:** o que se faz com eles.\n- **Saída:** o resultado que sai.\n\n> [!tip] No seu trabalho\n> Um chamado é isso: o **sintoma** é a entrada, o **diagnóstico** é o processamento e a **solução** é a saída. Quem pensa assim desmonta qualquer problema em três perguntas: o que eu recebo? O que eu faço com isso? O que eu entrego?\n\n## 3. Exemplo trabalhado: espaço livre do disco\n```\nLEIA total_gb\nLEIA livre_gb\npercentual ← livre_gb / total_gb * 100\nESCREVA \"Espaço livre: \", percentual, \"%\"\n```\nCom `total_gb = 256` e `livre_gb = 32`: `32 / 256 * 100 = 12,5`. Saída: `Espaço livre: 12,5%`.\n\nRepare nos três blocos: duas entradas, um cálculo, uma saída. `percentual` é uma **variável**: um nome que guarda um valor (aprofundamos na próxima aula).\n\n## 4. DIV e MOD: dividir com resto\nAo dividir inteiros, dá para pedir só o **quociente** (`DIV`) ou só o **resto** (`MOD`).\n\n`135 minutos`: `135 DIV 60 = 2` horas e `135 MOD 60 = 15` minutos. Resultado: **2 h 15 min**.\n\n> [!info] Curiosidade que dá chamado\n> Fabricantes de disco usam 1 GB = 1.000.000.000 bytes. O Windows divide por 1024 três vezes. Por isso um disco de \"256 GB\" aparece com cerca de **238 GB** no sistema. Não é defeito, é a conta.\n\n## 5. Termos\n- **Entrada / saída:** o que entra e o que sai de um algoritmo.\n- **Processamento:** o cálculo ou a decisão feita no meio.\n- **Variável:** nome que guarda um valor.\n- **Operador:** símbolo que faz uma conta (`+`, `-`, `*`, `/`, `DIV`, `MOD`).\n\n## 6. Mão na massa (no caderno)\n**Exercício 1 ⭐** Para cada situação, diga a **entrada**, o **processamento** e a **saída**:\n- (a) calcular o troco de uma compra;\n- (b) mostrar quantas páginas ainda restam na cota de impressão de um usuário;\n- (c) converter uma temperatura de Celsius para Fahrenheit.\n\n**Exercício 2 ⭐** Escreva o algoritmo que lê **3 notas** e mostra a média.\n\n**Exercício 3 ⭐⭐** Leia uma quantidade de **segundos** e mostre em horas, minutos e segundos. Teste de conferência: `7384 s` deve virar `2 h 3 min 4 s`.\n\n**Exercício 4 ⭐⭐** Um usuário tem **cota de C páginas** e já imprimiu **P**. O valor da página é **V** reais. Mostre as páginas restantes e o custo do que ele já imprimiu.\n\n**Exercício 5 ⭐⭐⭐** Um disco tem **total** em GB e três usos: sistema, aplicativos e downloads (todos em GB). Mostre o espaço **livre** em GB e o **percentual livre**. Teste: total 512, sistema 40, aplicativos 120,5, downloads 90,25.\n\n## 7. Perguntas de verificação\n- **V1.** Qual a diferença entre `/` e `DIV`? Dê um exemplo com 17 e 5.\n- **V2.** Qual é a entrada, o processamento e a saída do algoritmo do disco?\n- **V3.** Por que um disco de 256 GB aparece com menos no Windows?\n",
     "quiz": [
      {
       "q": "Quanto valem 17 DIV 5 e 17 MOD 5, nessa ordem?",
       "opcoes": [
        "3 e 2",
        "3,4 e 0",
        "2 e 3",
        "5 e 17"
       ],
       "ok": 0,
       "porque": "17 dividido por 5 dá 3 (quociente inteiro, DIV) e sobram 2 (resto, MOD). Conferência: 3 × 5 + 2 = 17."
      },
      {
       "q": "No algoritmo do disco (LEIA total_gb, LEIA livre_gb, percentual ← livre_gb / total_gb * 100, ESCREVA percentual), qual é a ENTRADA?",
       "opcoes": [
        "total_gb e livre_gb, os dados que chegam de fora",
        "A conta livre_gb / total_gb * 100",
        "A mensagem mostrada na tela",
        "O percentual calculado"
       ],
       "ok": 0,
       "porque": "Entrada é o que chega (LEIA). A conta é o processamento e o que aparece na tela é a saída."
      },
      {
       "q": "Por que um SSD de \"256 GB\" aparece com cerca de 238 GB no Windows?",
       "opcoes": [
        "É um defeito de fábrica",
        "O Windows apaga 18 GB assim que é instalado",
        "O fabricante conta 1 GB = 1.000.000.000 bytes e o Windows divide por 1024 três vezes",
        "É sinal de vírus"
       ],
       "ok": 2,
       "porque": "256.000.000.000 bytes divididos por 1024 três vezes dão cerca de 238 GB. Não é defeito, é a conta."
      }
     ]
    },
    {
     "id": "DEV1-E3",
     "titulo": "Variáveis e tipos de dados",
     "min": 60,
     "md": "> [!abstract] Ao final desta aula você consegue\n> Explicar o que é uma variável, escolher o tipo certo para cada dado, dar nomes claros e **acompanhar o valor de uma variável ao longo do tempo**.\n\n## 1. Aquecimento (3 min)\n> [!question] O que aparece na tela?\n> ```\n> a ← 5\n> b ← 7\n> a ← b\n> b ← a\n> ESCREVA a, b\n> ```\n> A intenção era **trocar** os valores de `a` e `b`. Funcionou?\n\n> [!success]- Resposta\n> Não. Aparece `7 7`. Na terceira linha, `a` passa a valer 7 e o 5 se perde para sempre. Na quarta, `b` recebe o novo `a` (7). Quando você guarda um valor novo, o antigo **é sobrescrito**. É por isso que precisamos de uma terceira caixa.\n\n## 2. A ideia\n**Variável** é uma caixa com etiqueta. A etiqueta é o **nome** e o conteúdo é o **valor**. Você pode trocar o conteúdo quando quiser, mas cada caixa guarda **um valor por vez**.\n\n```\ncontador ← 0           // cria a caixa e guarda 0\ncontador ← contador + 1 // lê o valor, soma 1, guarda de volta (agora é 1)\n```\nO símbolo `←` significa \"**guarde** o que está à direita na caixa da esquerda\". Não é igualdade de matemática.\n\n## 3. Tipos de dados\nCada valor tem um **tipo**, que decide o que se pode fazer com ele.\n\n| Tipo | O que guarda | Exemplos |\n|---|---|---|\n| **Inteiro** | números sem vírgula | `42`, `0`, `-7`, `443` |\n| **Real** | números com vírgula | `3,14`, `12,5` |\n| **Texto** | letras, palavras, qualquer coisa entre aspas | `\"servidor-01\"`, `\"42\"` |\n| **Lógico** | só verdadeiro ou falso | `VERDADEIRO`, `FALSO` |\n\n> [!warning] A pegadinha clássica\n> `\"10\"` (texto) e `10` (número) são coisas diferentes. Somar dois números dá `10 + 5 = 15`. Juntar dois textos dá `\"10\" + \"5\" = \"105\"`. Muitos bugs nascem de um número que virou texto sem ninguém perceber.\n\n> [!tip] Seu mundo (TI)\n> Nome do computador é **texto**. A porta `443` é **inteiro**. O uso de CPU `73,5` é **real**. \"A máquina está ligada?\" é **lógico**. E o endereço IP `192.168.0.1`? É **texto**, porque não existe número com dois pontos e não dá para somar IPs.\n\n## 4. Nomes que ajudam\nCompare `x`, `t` e `a1` com `total_gb`, `livre_gb` e `tentativas`. O segundo grupo se explica sozinho. Regras práticas:\n- sem espaços e sem acentos (`tamanho_disco_gb`);\n- o nome diz **o que é**, e se tiver unidade, ela vai junto (`_gb`, `_seg`);\n- evite `x`, `y`, `temp`, `dado`, exceto em contadores como `i`.\n\n## 5. Trocar dois valores\nResolvendo o desafio do começo com uma **terceira caixa**:\n```\naux ← a\na ← b\nb ← aux\n```\nImagine duas xícaras trocando de conteúdo: precisa de uma terceira para segurar enquanto isso.\n\n## 6. Termos\n- **Variável:** nome que guarda um valor.\n- **Atribuição:** guardar um valor numa variável (`←`).\n- **Tipo:** a natureza do dado (inteiro, real, texto, lógico).\n- **Constante:** valor que não muda (ex.: `VALOR_PAGINA ← 0,10`, por convenção em maiúsculas).\n\n## 7. Mão na massa (no caderno)\n**Exercício 1 ⭐** Diga o tipo de cada valor e **por quê**: `42` · `3,14` · `\"42\"` · `VERDADEIRO` · `\"servidor-01\"` · `192.168.0.1` · `0` · `10,5` · um número de telefone com DDD · um CPF.\n\n**Exercício 2 ⭐** O que é mostrado em cada trecho?\n```\n(A) x ← 3          (B) a ← \"10\"        (C) n ← 10\n    y ← x * 2          b ← \"5\"             n ← n - 3\n    x ← y + 1          ESCREVA a + b       n ← n * n\n    ESCREVA x, y                           ESCREVA n\n```\nEm (B), o que mudaria se `a` e `b` fossem números?\n\n**Exercício 3 ⭐⭐** Troque os valores de `a` e `b` **com** variável auxiliar. Depois, **desafio extra:** faça a troca **sem** auxiliar, usando só soma e subtração.\n\n**Exercício 4 ⭐⭐** Renomeie as variáveis para nomes claros e diga o que o trecho calcula:\n```\nx1 ← 3\nx2 ← 29,90\nt ← x1 * x2\n```\n\n**Exercício 5 ⭐⭐⭐** Com `a = 1`, `b = 2`, `c = 3`, faça com que fiquem `a = 2`, `b = 3`, `c = 1` usando **uma** variável auxiliar.\n\n## 8. Perguntas de verificação\n- **V1.** O que acontece com o valor antigo de uma variável quando você guarda um novo?\n- **V2.** Por que `\"10\" + \"5\"` não dá 15?\n- **V3.** Qual o tipo de um endereço IP e por quê?\n",
     "quiz": [
      {
       "q": "O que aparece na tela?\n\na ← 5\nb ← 7\na ← b\nb ← a\nESCREVA a, b",
       "opcoes": [
        "7 7",
        "7 5",
        "5 7",
        "5 5"
       ],
       "ok": 0,
       "porque": "Na terceira linha o 5 é sobrescrito: a vale 7. Na quarta, b recebe o novo a (7). Por isso precisamos de uma variável auxiliar para trocar."
      },
      {
       "q": "Qual é o tipo mais adequado para o endereço IP 192.168.0.1?",
       "opcoes": [
        "Inteiro",
        "Real",
        "Lógico",
        "Texto"
       ],
       "ok": 3,
       "porque": "Não existe número com dois pontos e não faz sentido somar IPs. IP é texto."
      },
      {
       "q": "O que aparece na tela?\n\nx ← 3\ny ← x * 2\nx ← y + 1\nESCREVA x, y",
       "opcoes": [
        "7 7",
        "4 6",
        "3 6",
        "7 6"
       ],
       "ok": 3,
       "porque": "y vale 3 × 2 = 6. Depois x vale 6 + 1 = 7. A saída é 7 6."
      }
     ]
    },
    {
     "id": "DEV1-E4",
     "titulo": "Condicionais (se / senão)",
     "min": 60,
     "md": "> [!abstract] Ao final desta aula você consegue\n> Fazer o algoritmo **tomar decisões**, ordenar as condições do jeito certo e testar os **valores de fronteira**, onde os bugs moram.\n\n## 1. Aquecimento (3 min)\n> [!question] Alerta de disco\n> Uma regra de monitoramento diz: *espaço livre abaixo de 10% é **crítico**; abaixo de 25% é **atenção**; o resto está **ok**.*\n> Um disco está com **exatamente 10%** livres. É crítico ou atenção? E com **exatamente 25%**?\n\n> [!success]- Resposta\n> Pela regra escrita (`< 10` e `< 25`), 10% é **atenção** (não é menor que 10) e 25% é **ok**. Só que alguém que lê \"abaixo de 10%\" pode achar o contrário. Moral: **os valores de fronteira precisam ser decididos e escritos**, senão cada pessoa entende de um jeito.\n\n## 2. A ideia\nAté aqui o algoritmo seguia sempre o mesmo caminho. Com `SE`, ele **escolhe** um caminho conforme uma condição.\n\n```\nSE percentual < 10 ENTÃO\n    ESCREVA \"CRÍTICO\"\nSENÃO SE percentual < 25 ENTÃO\n    ESCREVA \"ATENÇÃO\"\nSENÃO\n    ESCREVA \"OK\"\nFIM-SE\n```\nFunciona assim: o computador testa de cima para baixo e executa o **primeiro** bloco cuja condição for verdadeira. Os demais são ignorados.\n\n| Comparação | Significa |\n|---|---|\n| `=` | é igual a |\n| `≠` | é diferente de |\n| `<` `>` | menor que, maior que |\n| `≤` `≥` | menor ou igual, maior ou igual |\n\n> [!warning] Dois erros clássicos\n> **1. A ordem importa.** Se você testar `percentual < 25` antes de `percentual < 10`, um disco com 5% cai no \"atenção\" e o \"crítico\" **nunca** aparece.\n> **2. `=` não é `←`.** `SE x = 5` pergunta se x vale 5. `x ← 5` guarda o 5 em x.\n\n## 3. Decisões dentro de decisões\nDá para colocar um `SE` dentro de outro (aninhar). Exemplo de **prioridade de chamado**:\n\n```\nSE impacto = \"alto\" ENTÃO\n    SE urgencia = \"alta\" ENTÃO\n        prioridade ← \"P1\"\n    SENÃO\n        prioridade ← \"P2\"\n    FIM-SE\nSENÃO\n    prioridade ← \"P3\"\nFIM-SE\n```\nPara cada caminho, pergunte: \"qual valor de entrada faz o algoritmo passar por aqui?\". Isso é **testar os caminhos**.\n\n## 4. Teste de fronteira\nPara cada condição, teste **um valor abaixo, o valor exato e um acima**. No alerta de disco: 9, 10 e 11; 24, 25 e 26. É assim que você pega o erro de `<` versus `≤`.\n\n## 5. Termos\n- **Condição:** pergunta com resposta verdadeiro ou falso.\n- **Ramo:** cada caminho possível (o `ENTÃO` e o `SENÃO`).\n- **Aninhar:** colocar um `SE` dentro de outro.\n- **Valor de fronteira:** o valor onde a decisão muda.\n\n## 6. Mão na massa (no caderno)\n**Exercício 1 ⭐** Leia um número e diga se é **positivo**, **negativo** ou **zero**.\n\n**Exercício 2 ⭐** Escreva o alerta de disco completo e liste **os 6 valores de fronteira** que você testaria.\n\n**Exercício 3 ⭐⭐** Este algoritmo tem um bug. Qual e o que aparece para `percentual = 5`? Como corrigir?\n```\nSE percentual < 25 ENTÃO\n    ESCREVA \"Atenção\"\nSENÃO SE percentual < 10 ENTÃO\n    ESCREVA \"Crítico\"\nSENÃO\n    ESCREVA \"OK\"\nFIM-SE\n```\n\n**Exercício 4 ⭐⭐** Desconto em compra: de **100 ou mais**, 10%; de **50 a 99,99**, 5%; abaixo disso, nada. Leia o valor e mostre o total a pagar. Teste com 120, 80 e 40.\n\n**Exercício 5 ⭐⭐** Escreva a **prioridade do chamado** da aula, agora com 3 níveis de impacto (`alto`, `medio`, `baixo`) e 2 de urgência (`alta`, `baixa`). Monte a tabela de resultado **antes** de escrever o código.\n\n**Exercício 6 ⭐⭐⭐** **Ano bissexto:** divisível por 4 é bissexto, **exceto** os divisíveis por 100, **a não ser** os divisíveis por 400. Use `MOD` e `SE` aninhados. Teste: 2000 (sim), 1900 (não), 2024 (sim), 2023 (não).\n\n## 7. Perguntas de verificação\n- **V1.** Se a condição de cima é verdadeira, o computador testa as de baixo? Por quê?\n- **V2.** Por que testamos 9, 10 e 11 e não só 10?\n- **V3.** Explique a diferença entre `SE x = 5` e `x ← 5`.\n",
     "quiz": [
      {
       "q": "O que este trecho mostra para percentual = 5?\n\nSE percentual < 25 ENTÃO ESCREVA \"Atenção\"\nSENÃO SE percentual < 10 ENTÃO ESCREVA \"Crítico\"\nSENÃO ESCREVA \"OK\"",
       "opcoes": [
        "Crítico",
        "Nada",
        "OK",
        "Atenção"
       ],
       "ok": 3,
       "porque": "O computador executa o primeiro bloco cujo teste é verdadeiro. 5 < 25 é verdadeiro, então para ali. O \"Crítico\" nunca aparece: a ordem das condições está errada."
      },
      {
       "q": "Para testar a fronteira da condição percentual < 10, quais valores faz mais sentido testar?",
       "opcoes": [
        "Só o 10",
        "0 e 100",
        "Um valor qualquer sorteado",
        "9, 10 e 11"
       ],
       "ok": 3,
       "porque": "Fronteira: um valor abaixo, o valor exato e um acima. É assim que se pega o erro de < versus ≤."
      },
      {
       "q": "Qual é a diferença entre SE x = 5 e x ← 5?",
       "opcoes": [
        "Não há diferença",
        "SE x = 5 guarda o 5; x ← 5 pergunta se x vale 5",
        "SE x = 5 pergunta se x vale 5; x ← 5 guarda o 5 em x",
        "As duas guardam o valor 5"
       ],
       "ok": 2,
       "porque": "= compara (pergunta). ← atribui (guarda). Misturar os dois é um dos erros mais comuns de iniciante."
      }
     ]
    },
    {
     "id": "DEV1-E5",
     "titulo": "Operadores lógicos e tabela verdade",
     "min": 60,
     "md": "> [!abstract] Ao final desta aula você consegue\n> Combinar condições com **E**, **OU** e **NÃO**, montar uma tabela verdade, simplificar condições com a lei de De Morgan e escrever regras de acesso sem furos.\n\n## 1. Aquecimento (3 min)\n> [!question] A senha está certa, mas...\n> Um usuário digita a senha correta e, mesmo assim, aparece: *\"Restrições de conta estão impedindo a entrada deste usuário\"*. A senha certa basta para entrar? Liste **3 coisas** que o sistema pode conferir além da senha.\n\n> [!success]- Resposta\n> Não basta. O sistema confere várias condições ao mesmo tempo, por exemplo: conta **ativa**, **horário** permitido, **estação** de trabalho permitida, conta não **bloqueada**, senha não **expirada**. Para entrar, **todas** precisam ser verdadeiras: isso é o operador `E`.\n\n## 2. A ideia\nCom `E`, `OU` e `NÃO` você junta condições simples em regras completas.\n\n| Operador | Resultado é verdadeiro quando... |\n|---|---|\n| `A E B` | **as duas** são verdadeiras |\n| `A OU B` | **pelo menos uma** é verdadeira |\n| `NÃO A` | A é falsa (inverte) |\n\n**Tabela verdade** mostra todas as combinações:\n\n| A | B | A E B | A OU B |\n|---|---|---|---|\n| V | V | V | V |\n| V | F | F | V |\n| F | V | F | V |\n| F | F | F | F |\n\n> [!tip] Pense assim\n> **E** é a catraca de um prédio com crachá **e** biometria: precisa dos dois. **OU** é a porta de saída: serve a escada **ou** o elevador.\n\n## 3. Precedência e parênteses\nOrdem de avaliação: `NÃO` primeiro, depois `E`, depois `OU`. Exemplo: `A OU B E C` significa `A OU (B E C)`. **Sempre use parênteses** para deixar claro. Quem lê depois (inclusive você) agradece.\n\n## 4. Lei de De Morgan (para inverter uma regra)\n- `NÃO (A E B)` equivale a `NÃO A OU NÃO B`\n- `NÃO (A OU B)` equivale a `NÃO A E NÃO B`\n\nEm português: \"**não** (ativo **e** válido)\" é o mesmo que \"inativo **ou** inválido\". Serve para escrever a regra de **negar** acesso a partir da regra de **permitir**.\n\n> [!info] Curto-circuito\n> Em `A E B`, se A já é falso, o resultado é falso e o computador **nem avalia B**. Em `A OU B`, se A é verdadeiro, ele nem olha B. Isso economiza tempo e evita erros (por exemplo, não dividir por zero).\n\n## 5. Termos\n- **Booleano:** valor que é só verdadeiro ou falso (o tipo lógico).\n- **Tabela verdade:** lista de todas as combinações e do resultado.\n- **Precedência:** a ordem em que os operadores são avaliados.\n\n## 6. Mão na massa (no caderno)\n**Exercício 1 ⭐** Monte a tabela verdade de:\n- (a) `A E NÃO B`\n- (b) `NÃO (A OU B)`\n- (c) `(A OU B) E NÃO (A E B)` (dica: é o \"ou exclusivo\". Em palavras, o que ele significa?)\n\n**Exercício 2 ⭐⭐** Regra de acesso à VPN: **(usuário ativo E MFA aprovado) OU (é admin E está na rede interna)**. Diga o resultado (permite ou nega) em cada caso:\n\n| # | ativo | mfa | admin | rede_interna |\n|---|---|---|---|---|\n| 1 | V | V | F | F |\n| 2 | V | F | F | F |\n| 3 | F | V | F | F |\n| 4 | F | F | V | V |\n| 5 | V | F | V | F |\n| 6 | V | F | V | V |\n\nAgora a pergunta que importa: **esta regra tem um furo de segurança?** Qual e como corrigir?\n\n**Exercício 3 ⭐⭐** Reescreva sem o `NÃO` na frente do parêntese: `NÃO (a > 5 E b < 3)`.\n\n**Exercício 4 ⭐⭐** Refaça o **ano bissexto** da aula anterior em **uma única condição**, com `E` e `OU`.\n\n**Exercício 5 ⭐⭐⭐** **Login com restrições** (como no desafio): um usuário tem `conta_ativa`, `bloqueada`, `senha_expirada`, `horario_ok` e `estacao_ok`.\n- (a) Escreva a condição `pode_logar`.\n- (b) Escreva um algoritmo que mostre o **motivo** da recusa (a primeira condição que falha).\n- (c) Teste com 5 cenários diferentes que você inventar.\n\n## 7. Perguntas de verificação\n- **V1.** Qual a diferença entre `E` e `OU` ao liberar um acesso?\n- **V2.** Aplique De Morgan: como nega \"ativo E horário_ok\"?\n- **V3.** Por que usar parênteses mesmo quando a precedência já resolve?\n",
     "quiz": [
      {
       "q": "A OU B só é FALSO quando...",
       "opcoes": [
        "B é falso",
        "A e B são falsos",
        "A e B são verdadeiros",
        "A é falso"
       ],
       "ok": 1,
       "porque": "OU é verdadeiro se pelo menos uma das partes for verdadeira. Só falha quando as duas são falsas."
      },
      {
       "q": "Pela lei de De Morgan, NÃO (ativo E horario_ok) equivale a...",
       "opcoes": [
        "ativo OU horario_ok",
        "NÃO ativo OU NÃO horario_ok",
        "ativo E NÃO horario_ok",
        "NÃO ativo E NÃO horario_ok"
       ],
       "ok": 1,
       "porque": "Negar um E vira um OU de negações: \"inativo OU fora do horário\". Negar um OU vira um E de negações."
      },
      {
       "q": "Como é avaliado A OU B E C?",
       "opcoes": [
        "Da esquerda para a direita, sempre",
        "A OU (B E C)",
        "É um erro de sintaxe",
        "(A OU B) E C"
       ],
       "ok": 1,
       "porque": "A ordem é NÃO, depois E, depois OU. Mesmo assim, use sempre parênteses para deixar claro."
      }
     ]
    },
    {
     "id": "DEV1-E6",
     "titulo": "Laços de repetição",
     "min": 70,
     "md": "> [!abstract] Ao final desta aula você consegue\n> Fazer o computador repetir uma tarefa quantas vezes for preciso, escolher entre `ENQUANTO`, `PARA` e `REPITA`, usar **contador** e **acumulador**, e caçar os dois bugs mais famosos: o **laço infinito** e o erro de **uma volta a mais ou a menos**.\n\n## 1. Aquecimento (3 min)\n> [!question] 500 computadores\n> Você precisa verificar se **500 computadores** estão ligados. Escrever uma instrução para cada um daria 500 linhas. Como você pediria isso ao robô literal em **3 ou 4 linhas**?\n\n> [!success]- Resposta\n> Descrevendo uma tarefa que **se repete** e dizendo até quando: \"para cada computador da lista, teste se responde\". Isso é um **laço**. O computador é ótimo nisso: repetir sem cansar e sem errar de tédio.\n\n## 2. A ideia\nUm **laço** (ou *loop*) executa um bloco de instruções várias vezes. Existem três formas. Todas terminam o bloco com um `FIM-...`.\n\n**`ENQUANTO`**: testa a condição **antes**. Se for falsa de cara, não executa nenhuma vez.\n```\ni ← 1\nENQUANTO i ≤ 5\n    ESCREVA i\n    i ← i + 1\nFIM-ENQUANTO\n```\nSaída: `1 2 3 4 5`.\n\n**`PARA`**: quando você **sabe quantas voltas** quer. O contador anda sozinho.\n```\nPARA i DE 1 ATÉ 5\n    ESCREVA i\nFIM-PARA\n```\n\n**`REPITA ... ATÉ`**: testa **depois**. Roda **pelo menos uma vez**. Ótimo para \"peça de novo até a pessoa acertar\".\n```\nREPITA\n    LEIA senha\nATÉ senha = \"1234\"\n```\n\n> [!tip] Como escolher\n> Sabe o número de voltas? `PARA`. Depende de uma condição que pode falhar de cara? `ENQUANTO`. Precisa rodar ao menos uma vez (ler algo e validar)? `REPITA`.\n\n## 3. Contador e acumulador\nDois papéis que as variáveis de laço fazem o tempo todo:\n- **Contador:** conta quantas vezes algo aconteceu (`cont ← cont + 1`). Começa em 0.\n- **Acumulador:** vai somando valores (`soma ← soma + valor`). Começa em 0 para somas e em 1 para multiplicações.\n\n**Exemplo: soma de 1 a 100.**\n```\nsoma ← 0\nPARA i DE 1 ATÉ 100\n    soma ← soma + i\nFIM-PARA\nESCREVA soma\n```\nResultado: `5050`. Sem o `soma ← 0` do começo, o resultado vem errado, porque a variável começaria com lixo. **Sempre inicialize.**\n\n## 4. Os dois bugs clássicos\n> [!warning] 1. Laço infinito\n> ```\n> i ← 1\n> ENQUANTO i ≤ 5\n>     ESCREVA i\n> FIM-ENQUANTO\n> ```\n> Ninguém altera `i`, então a condição nunca vira falsa e o programa **não termina**. Pergunta de segurança antes de rodar qualquer laço: **\"o que faz esta condição ficar falsa?\"**\n\n> [!warning] 2. Uma volta a mais ou a menos (*off-by-one*)\n> `PARA i DE 1 ATÉ 10` roda **10** vezes. `i ← 0` com `ENQUANTO i < 10` também roda 10. Mas `i ← 0` com `ENQUANTO i ≤ 10` roda **11**. Troque `<` por `≤` e a contagem muda. É o `<` contra `≤` da aula de condicionais voltando para te visitar.\n\n## 5. Seu mundo (TI)\n**Bloqueio de conta por tentativas:** o AD bloqueia a conta depois de N senhas erradas. Isso é um laço com contador:\n```\ntentativas ← 0\nREPITA\n    LEIA senha\n    tentativas ← tentativas + 1\nATÉ senha_correta OU tentativas = 3\n```\n**Verificar uma lista de máquinas:** `PARA cada maquina EM lista` faz um teste de ping em cada uma. Automação de infraestrutura é, quase sempre, um laço com uma decisão dentro.\n\n## 6. Termos\n- **Laço / loop:** bloco que se repete.\n- **Iteração:** cada volta do laço.\n- **Contador:** variável que conta ocorrências.\n- **Acumulador:** variável que soma (ou multiplica) valores ao longo das voltas.\n- **Laço infinito:** laço cuja condição de parada nunca acontece.\n- **Off-by-one:** erro de ficar uma volta a mais ou a menos.\n\n## 7. Mão na massa (no caderno)\n**Exercício 1 ⭐** Mostre os números de **1 a 10**, depois de **10 a 1**.\n\n**Exercício 2 ⭐** Leia um número **N** e mostre a **soma de 1 até N**. Teste com N = 100 (esperado: 5050) e com N = 1.\n\n**Exercício 3 ⭐⭐** Conte **quantos números pares existem de 1 a 50**. Dica: um número é par quando `n MOD 2 = 0`. Confira com a contagem na mão.\n\n**Exercício 4 ⭐⭐** Leia **N** e mostre a **tabuada** de N (de 1 a 10).\n\n**Exercício 5 ⭐⭐** Peça a senha **até 3 tentativas**. Se acertar, mostre \"Acesso liberado\" e pare. Se errar as 3, mostre \"Conta bloqueada\". Pense: qual laço é o melhor aqui e por quê?\n\n**Exercício 6 ⭐⭐⭐** Ache o(s) bug(s) e corrija. A intenção é mostrar de 1 a 5:\n```\n(A) i ← 1                    (B) PARA i DE 0 ATÉ 5\n    ENQUANTO i < 5               ESCREVA i\n        ESCREVA i            FIM-PARA\n    FIM-ENQUANTO\n```\n\n**Exercício 7 ⭐⭐⭐** Leia um número inteiro e mostre a **soma dos dígitos**. Teste: `1234` deve dar `10`. Dica: `n MOD 10` pega o último dígito e `n DIV 10` o remove.\n\n**Exercício 8 ⭐⭐⭐** Leia números **até o usuário digitar 0** e mostre a **média** dos digitados (o 0 não entra na conta). Cuidado com o caso em que o primeiro número já é 0.\n\n## 8. Perguntas de verificação\n- **V1.** Qual a diferença entre `ENQUANTO` e `REPITA...ATÉ`? Em qual deles o bloco pode não rodar nenhuma vez?\n- **V2.** Por que `soma` e `cont` precisam ser inicializados antes do laço?\n- **V3.** Como você descobre se um laço pode ser infinito?\n",
     "quiz": [
      {
       "q": "O que há de errado neste trecho?\n\ni ← 1\nENQUANTO i ≤ 5\n    ESCREVA i\nFIM-ENQUANTO",
       "opcoes": [
        "É um laço infinito: ninguém altera i",
        "Não executa nenhuma vez",
        "Nada, mostra de 1 a 5",
        "Mostra de 0 a 5"
       ],
       "ok": 0,
       "porque": "A condição i ≤ 5 nunca fica falsa porque i nunca muda. Pergunta de segurança: o que faz esta condição ficar falsa?"
      },
      {
       "q": "Quantas vezes executa o bloco de PARA i DE 1 ATÉ 10?",
       "opcoes": [
        "9",
        "10",
        "Depende do conteúdo",
        "11"
       ],
       "ok": 1,
       "porque": "De 1 até 10 incluindo os dois extremos são 10 voltas. Contar errado uma volta é o erro off-by-one."
      },
      {
       "q": "Qual laço garante que o bloco rode PELO MENOS uma vez?",
       "opcoes": [
        "PARA",
        "REPITA ... ATÉ",
        "ENQUANTO",
        "Nenhum"
       ],
       "ok": 1,
       "porque": "REPITA...ATÉ testa a condição depois da volta, então roda ao menos uma vez. ENQUANTO testa antes e pode não rodar nenhuma."
      }
     ]
    },
    {
     "id": "DEV1-E7",
     "titulo": "Funções: dividir um problema grande",
     "min": 70,
     "md": "> [!abstract] Ao final desta aula você consegue\n> Criar **funções** com parâmetros e retorno, entender a diferença entre **mostrar** e **devolver** um valor, e montar programas maiores juntando funções pequenas.\n\n## 1. Aquecimento (3 min)\n> [!question] O cálculo repetido\n> Você tem 3 scripts de monitoramento. Em cada um, a conta do percentual livre do disco foi escrita à mão: `livre / total * 100`. Um dia alguém descobre que a conta precisa **arredondar**. Quantos lugares você precisa corrigir? E se a conta existisse **uma vez só**?\n\n> [!success]- Resposta\n> Três lugares, e é fácil esquecer um. Se a conta existe uma vez só, corrige uma vez e **todos** os scripts passam a usar a versão certa. Esse \"escrever uma vez, usar em vários lugares\" é o motivo de existirem as funções.\n\n## 2. A ideia\n**Função** é um bloco com **nome** que recebe dados, faz uma tarefa e (normalmente) **devolve** um resultado. Pense numa máquina de café: você aperta \"cappuccino\" (o nome), ela usa o que tem dentro e te entrega a xícara.\n\n```\nFUNÇÃO percentual_livre(total, livre)\n    RETORNE livre / total * 100\nFIM-FUNÇÃO\n```\n- `percentual_livre` é o **nome**.\n- `total` e `livre` são os **parâmetros**: os dados que a função precisa receber.\n- `RETORNE` **devolve** o resultado para quem chamou.\n\n**Chamando** a função:\n```\np ← percentual_livre(256, 32)\nESCREVA p\n```\nSaída: `12,5`. Os valores `256` e `32` são os **argumentos**: o que você realmente entregou na chamada.\n\n## 3. Devolver não é o mesmo que mostrar\n> [!warning] A confusão mais comum\n> `ESCREVA` **mostra** na tela e acabou. `RETORNE` **devolve** o valor para o programa continuar usando.\n> Uma função que só faz `ESCREVA` não pode ser usada numa conta. `x ← percentual_livre(...) + 5` só funciona se ela **retornar**.\n\nRegra prática: funções que **calculam** devolvem (`RETORNE`). A parte do programa que conversa com o usuário é quem usa `LEIA` e `ESCREVA`.\n\n## 4. Funções que usam funções\nO poder aparece ao **compor**:\n```\nFUNÇÃO classificar_disco(p)\n    SE p < 10 ENTÃO\n        RETORNE \"CRÍTICO\"\n    SENÃO SE p < 25 ENTÃO\n        RETORNE \"ATENÇÃO\"\n    SENÃO\n        RETORNE \"OK\"\n    FIM-SE\nFIM-FUNÇÃO\n\n// programa principal\nLEIA total, livre\np ← percentual_livre(total, livre)\nESCREVA classificar_disco(p)\n```\nO programa principal ficou com **4 linhas legíveis**. Quem lê entende o que acontece sem precisar ver as contas.\n\n## 5. Variáveis dentro da função\nAs variáveis criadas **dentro** de uma função só existem ali (**escopo local**). Quando a função termina, elas somem. Isso é bom: duas funções podem usar o nome `soma` sem uma estragar a outra.\n\n## 6. Seu mundo (TI)\nUm script de inventário tem `listar_maquinas()`, `testar_ping(ip)`, `registrar_resultado(maquina, ok)`. Cada uma faz **uma coisa**. Quando o ping muda de método, você mexe só em `testar_ping`. É assim que scripts de DevOps crescem sem virar bagunça.\n\n## 7. Termos\n- **Função:** bloco com nome que faz uma tarefa e pode devolver um resultado.\n- **Parâmetro:** variável que a função recebe (na definição).\n- **Argumento:** o valor entregue na chamada.\n- **Retorno:** o valor que a função devolve.\n- **Chamar:** pedir para a função executar.\n- **Escopo:** onde uma variável existe e pode ser usada.\n\n## 8. Mão na massa (no caderno)\n**Exercício 1 ⭐** Escreva `dobro(n)` que retorna o dobro de `n`. Depois use-a para mostrar o dobro de 7 e o **dobro do dobro** de 7.\n\n**Exercício 2 ⭐** Escreva `eh_par(n)` que retorna `VERDADEIRO` se `n` é par. Use-a para mostrar quais dos números `10, 7, 0, 13` são pares.\n\n**Exercício 3 ⭐⭐** Escreva `celsius_para_f(c)` (`F = C * 9 / 5 + 32`). Teste: `36,5 °C` deve dar `97,7 °F`.\n\n**Exercício 4 ⭐⭐** Escreva `maior(a, b, c)` que retorna o maior dos três **sem** usar função pronta.\n\n**Exercício 5 ⭐⭐** Reescreva a **tabuada** da aula anterior como `tabuada(n)` e chame-a para 7 e para 9.\n\n**Exercício 6 ⭐⭐⭐** Escreva `soma_digitos(n)` (a soma dos dígitos de um inteiro). Depois escreva `eh_multiplo_de_3(n)` **usando** `soma_digitos` (regra: um número é múltiplo de 3 se a soma dos dígitos for). Teste com `123` (sim) e `124` (não).\n\n**Exercício 7 ⭐⭐⭐** O **alerta de disco completo** com funções: `percentual_livre`, `classificar_disco` e um programa principal que lê 3 discos (total e livre de cada) e mostra a classificação de cada um. Todo o cálculo fica em funções; o programa principal só chama.\n\n## 9. Perguntas de verificação\n- **V1.** Qual a diferença entre `ESCREVA` e `RETORNE`?\n- **V2.** O que é parâmetro e o que é argumento? Dê um exemplo.\n- **V3.** Por que é bom uma função fazer **uma coisa só**?\n",
     "quiz": [
      {
       "q": "Qual é a diferença entre ESCREVA e RETORNE dentro de uma função?",
       "opcoes": [
        "RETORNE mostra na tela; ESCREVA devolve",
        "ESCREVA mostra na tela; RETORNE devolve o valor para o programa continuar usando",
        "Os dois guardam o valor numa variável",
        "Nenhuma"
       ],
       "ok": 1,
       "porque": "Só quem RETORNA pode ser usado numa conta (x ← f(...) + 5). ESCREVA mostra e acabou."
      },
      {
       "q": "Em p ← percentual_livre(256, 32), o que são 256 e 32?",
       "opcoes": [
        "Parâmetros",
        "Retornos",
        "Variáveis locais",
        "Argumentos"
       ],
       "ok": 3,
       "porque": "Parâmetro é o nome na definição da função (total, livre). Argumento é o valor entregue na chamada (256, 32)."
      },
      {
       "q": "Por que é bom uma função fazer uma coisa só?",
       "opcoes": [
        "Porque é obrigatório",
        "Porque fica fácil de entender, testar e corrigir num lugar só",
        "Porque economiza memória",
        "Porque o computador é mais rápido"
       ],
       "ok": 1,
       "porque": "Função pequena e com um objetivo é reutilizável e se conserta uma vez, valendo para todos que a usam."
      }
     ]
    },
    {
     "id": "DEV1-E8",
     "titulo": "Teste de mesa",
     "min": 60,
     "md": "> [!abstract] Ao final desta aula você consegue\n> **Executar um algoritmo na cabeça**, linha por linha, com uma tabela que mostra o valor de cada variável a cada passo. É a ferramenta número 1 para achar bugs sem rodar nada.\n\n## 1. Aquecimento (3 min)\n> [!question] Sem calculadora\n> Qual é o resultado deste algoritmo? Tente só de cabeça, depois confira.\n> ```\n> soma ← 0\n> PARA i DE 1 ATÉ 4\n>     soma ← soma + i * i\n> FIM-PARA\n> ESCREVA soma\n> ```\n\n> [!success]- Resposta\n> `30`. Mas repare no que você fez: acompanhou `i` e `soma` a cada volta (1, 4, 9, 16 somados: 1, 5, 14, 30). Esse acompanhamento organizado tem nome: **teste de mesa**.\n\n## 2. A ideia\nO computador não adivinha: executa. Para **prever** o que um algoritmo faz, você precisa fazer o mesmo: ir linha por linha, anotando o que cada variável vale. Isso se chama **teste de mesa** (ou *trace*, em inglês).\n\nComo fazer:\n1. Desenhe uma tabela com **uma coluna por variável** (e uma para a saída).\n2. Execute **uma linha por vez**. Quando uma variável muda, escreva o novo valor na linha seguinte.\n3. Nunca pule. Nunca \"adivinhe o resto\".\n\n**Exemplo:** o aquecimento.\n\n| passo | i | soma | saída |\n|---|---|---|---|\n| início | - | 0 | |\n| volta 1 | 1 | 1 | |\n| volta 2 | 2 | 5 | |\n| volta 3 | 3 | 14 | |\n| volta 4 | 4 | 30 | |\n| fim | | 30 | 30 |\n\n## 3. Teste de mesa com decisão\n```\nx ← 4\ny ← 1\nENQUANTO y < 5\n    x ← x + y\n    y ← y + 1\nFIM-ENQUANTO\nESCREVA x, y\n```\n\n| volta | y < 5? | x | y |\n|---|---|---|---|\n| antes | - | 4 | 1 |\n| 1 | sim | 5 | 2 |\n| 2 | sim | 7 | 3 |\n| 3 | sim | 10 | 4 |\n| 4 | sim | 14 | 5 |\n| teste final | **não** (5 < 5 é falso) | 14 | 5 |\n\nSaída: `14 5`. Repare que a **última linha** mostra por que o laço parou. Esse é o ponto onde se descobre se ele para mesmo.\n\n## 4. O teste de mesa como detetive\nQuando um algoritmo dá o resultado errado, **o teste de mesa mostra a linha onde o valor desvia do que você esperava**. Exemplo: média de números lidos até o usuário digitar 0.\n\n```\nsoma ← 0\ncont ← 0\nREPITA\n    LEIA n\n    soma ← soma + n\n    cont ← cont + 1\nATÉ n = 0\nESCREVA soma / cont\n```\nCom entradas `4, 8, 0`:\n\n| leitura | n | soma | cont |\n|---|---|---|---|\n| 1ª | 4 | 4 | 1 |\n| 2ª | 8 | 12 | 2 |\n| 3ª | 0 | 12 | **3** |\n\nSaída: `12 / 3 = 4`. Esperado: `(4 + 8) / 2 = 6`. O bug apareceu: o **zero de parada foi contado** como se fosse um dado. Sem a tabela, você ficaria olhando o código sem ver o problema.\n\n## 5. Seu mundo (TI)\nQuando um script de limpeza apaga a pasta errada, ou um relatório soma o valor duplicado, o desenvolvedor experiente não sai mudando linhas ao acaso: ele **faz um teste de mesa com um caso pequeno** (3 itens) e acha onde o valor foge. É a mesma técnica, só que o depurador do editor faz a tabela para ele.\n\n## 6. Termos\n- **Teste de mesa / trace:** acompanhar as variáveis passo a passo, à mão.\n- **Estado:** o conjunto dos valores de todas as variáveis num momento.\n- **Depurar (debug):** achar e corrigir bugs.\n- **Caso pequeno:** entrada curta o bastante para testar de mesa em 2 minutos.\n\n## 7. Mão na massa (no caderno)\n**Exercício 1 ⭐** Faça o teste de mesa e diga a saída:\n```\na ← 2\nb ← 3\nPARA i DE 1 ATÉ 3\n    a ← a + b\n    b ← b + 1\nFIM-PARA\nESCREVA a, b\n```\n\n**Exercício 2 ⭐⭐** Teste de mesa: soma dos múltiplos de 3 até 10.\n```\nsoma ← 0\nPARA i DE 1 ATÉ 10\n    SE i MOD 3 = 0 ENTÃO\n        soma ← soma + i\n    FIM-SE\nFIM-PARA\nESCREVA soma\n```\n\n**Exercício 3 ⭐⭐** Quantos passos o algoritmo abaixo executa para `n = 6`? Mostre a sequência de valores de `n`.\n```\npassos ← 0\nENQUANTO n ≠ 1\n    SE n MOD 2 = 0 ENTÃO\n        n ← n DIV 2\n    SENÃO\n        n ← 3 * n + 1\n    FIM-SE\n    passos ← passos + 1\nFIM-ENQUANTO\nESCREVA passos\n```\n\n**Exercício 4 ⭐⭐** Quantos dígitos **pares** (contando o 0) tem o número `50206`?\n```\ncont ← 0\nENQUANTO n > 0\n    d ← n MOD 10\n    SE d MOD 2 = 0 ENTÃO\n        cont ← cont + 1\n    FIM-SE\n    n ← n DIV 10\nFIM-ENQUANTO\nESCREVA cont\n```\nFaça com `n = 50206`.\n\n**Exercício 5 ⭐⭐⭐** O algoritmo da **média até 0** (seção 4) tem um bug. Corrija-o de **duas formas diferentes** e mostre, por teste de mesa, que com `4, 8, 0` agora dá `6`.\n\n**Exercício 6 ⭐⭐⭐** Invente um algoritmo de **6 a 10 linhas** que tenha um laço e uma decisão. Faça o teste de mesa para uma entrada sua. Depois **esconda** o resultado, passe para outra pessoa (ou me envie) e veja se ela chega no mesmo valor.\n\n## 8. Perguntas de verificação\n- **V1.** Por que o teste de mesa mostra bugs que olhar o código não mostra?\n- **V2.** O que a **última linha** da tabela de um laço `ENQUANTO` deve mostrar?\n- **V3.** Por que usar um caso **pequeno** no teste de mesa?\n",
     "quiz": [
      {
       "q": "Qual é a saída?\n\nsoma ← 0\nPARA i DE 1 ATÉ 4\n    soma ← soma + i * i\nFIM-PARA\nESCREVA soma",
       "opcoes": [
        "30",
        "16",
        "10",
        "20"
       ],
       "ok": 0,
       "porque": "1 + 4 + 9 + 16 = 30. Acompanhando soma a cada volta: 1, 5, 14, 30."
      },
      {
       "q": "Média até digitar 0 (o 0 conta como dado no algoritmo da aula). Entradas 4, 8, 0. O que o algoritmo mostra?",
       "opcoes": [
        "8",
        "12",
        "6",
        "4"
       ],
       "ok": 3,
       "porque": "soma=12 e cont=3 porque o 0 de parada foi contado. 12 / 3 = 4. O esperado era (4+8)/2 = 6. O teste de mesa mostrou o desvio."
      },
      {
       "q": "O que a ÚLTIMA linha da tabela do teste de mesa de um ENQUANTO deve mostrar?",
       "opcoes": [
        "Só o resultado final",
        "O teste que faz o laço parar (condição falsa)",
        "A primeira volta",
        "Nada"
       ],
       "ok": 1,
       "porque": "É ali que se confirma que o laço termina de verdade. Se a condição nunca fica falsa, você achou um laço infinito."
      }
     ]
    },
    {
     "id": "DEV1-E9",
     "titulo": "Decomposição de problemas e fluxogramas",
     "min": 60,
     "md": "> [!abstract] Ao final desta aula você consegue\n> Quebrar um problema grande em partes pequenas e resolvíveis, e **desenhar** a lógica como fluxograma para enxergar os caminhos e achar furos antes de escrever qualquer linha.\n\n## 1. Aquecimento (3 min)\n> [!question] Por onde eu começo?\n> Seu chefe pede: *\"Faça um relatório que diga quais computadores estão com o disco quase cheio.\"* Você olha o pedido e trava. Qual é a **primeira pergunta** que você faz para destravar?\n\n> [!success]- Resposta\n> *\"Isso se divide em quais partes menores?\"* Por exemplo: (1) de onde vem a lista de computadores, (2) como saber o espaço de **um** computador, (3) como decidir se está \"quase cheio\", (4) como mostrar o resultado. Cada parte é pequena e você já sabe fazer.\n\n## 2. A ideia: decomposição\nNenhum problema difícil é difícil por inteiro. **Decompor** é quebrá-lo em pedaços que você já sabe resolver. O método:\n\n1. **Entenda:** com suas palavras, o que entra e o que deve sair? (E1 e E2)\n2. **Quebre:** liste as partes. Cada parte vira uma **função** (E7).\n3. **Resolva a parte mais simples primeiro.** Teste de mesa nela (E8).\n4. **Junte** as partes no programa principal.\n5. **Teste** com casos pequenos e com os valores de fronteira (E4).\n\n**Exemplo: relatório de discos.**\n```\nPROBLEMA: dizer quais computadores estão com disco quase cheio\n\n 1. obter_lista()            -> lista de computadores\n 2. espaco_livre_pct(pc)     -> percentual livre de UM computador\n 3. classificar_disco(p)     -> \"CRÍTICO\" / \"ATENÇÃO\" / \"OK\"\n 4. mostrar_relatorio(...)   -> imprime só os CRÍTICOS e ATENÇÃO\n```\nO programa principal vira um laço curto:\n```\nPARA cada pc EM obter_lista()\n    p ← espaco_livre_pct(pc)\n    estado ← classificar_disco(p)\n    SE estado ≠ \"OK\" ENTÃO\n        ESCREVA pc, estado\n    FIM-SE\nFIM-PARA\n```\n\n## 3. Fluxograma: a lógica desenhada\nUm **fluxograma** mostra os caminhos possíveis com poucos símbolos:\n\n| Símbolo | Forma | Significa |\n|---|---|---|\n| Início / Fim | oval | onde começa e termina |\n| Processo | retângulo | uma ação ou conta |\n| Decisão | losango | pergunta de sim/não (as setas saem rotuladas) |\n| Entrada / Saída | paralelogramo | `LEIA` / `ESCREVA` |\n\n**Fluxograma do alerta de disco**, em texto:\n```\n       ( INÍCIO )\n           |\n       /LEIA p/\n           |\n    < p < 10 ? >--sim--> /CRÍTICO/--+\n           |não                     |\n    < p < 25 ? >--sim--> /ATENÇÃO/--+\n           |não                     |\n        /\"OK\"/                      |\n           |                        |\n        ( FIM ) <-------------------+\n```\n(aqui `p` é o percentual livre; encurtei o nome só para o desenho caber na tela.)\nSiga as setas com o dedo, como num mapa. Se algum caminho **não chega ao Fim**, ou se uma decisão tem **uma só saída**, você achou um furo.\n\n> [!tip] No Obsidian\n> O Obsidian desenha fluxogramas a partir de texto, com blocos `mermaid`. Quando você estiver no Obsidian, pode pedir ao Claude o bloco pronto para colar. Aqui no app, o desenho em texto acima cumpre o mesmo papel. Para a prova e para a vida, o importante é **saber desenhar à mão**.\n\n## 4. Quando usar cada ferramenta\n- **Pseudocódigo:** para escrever a solução em detalhe.\n- **Fluxograma:** para **pensar nos caminhos** e explicar a alguém sem código.\n- **Decomposição:** para saber **por onde começar**.\n\nAs três se complementam: decompor, desenhar o caminho difícil, escrever o pseudocódigo.\n\n## 5. Seu mundo (TI)\n**Onboarding de um novo funcionário** é um fluxograma disfarçado: criar conta → conferir licença → criar e-mail → separar o equipamento → entregar. Em cada ponto existe uma decisão (\"tem licença livre?\") com dois caminhos. Quem mapeia isso antes consegue **automatizar** o processo depois. Esse é o início de um pipeline.\n\n## 6. Termos\n- **Decomposição:** dividir um problema grande em partes pequenas.\n- **Fluxograma:** diagrama com símbolos que mostra os caminhos de um algoritmo.\n- **Módulo:** cada parte da decomposição (vira função).\n- **Caminho:** uma sequência possível de passos do início ao fim.\n\n## 7. Mão na massa (no caderno)\n**Exercício 1 ⭐** Decomponha: *\"Descobrir quais usuários não trocam a senha há mais de 90 dias.\"* Liste **4 partes** e diga o que cada uma recebe e devolve.\n\n**Exercício 2 ⭐** Desenhe o fluxograma do **sinal, positivo, negativo ou zero** (E4, exercício 1). Quantos caminhos existem?\n\n**Exercício 3 ⭐⭐** Desenhe o fluxograma da **regra de VPN** `(ativo E mfa) OU (admin E rede_interna)`. Marque com uma cor os caminhos que **liberam** o acesso.\n\n**Exercício 4 ⭐⭐** Desenhe o fluxograma de **3 tentativas de senha** (E6, exercício 5). Onde está o laço no desenho?\n\n**Exercício 5 ⭐⭐⭐** **Fluxograma com furo.** Este desenho descreve \"pedir o valor até que seja positivo\": `LEIA n` → `<n > 0?>` → se **sim**, `ESCREVA \"ok\"` → Fim. Se **não**, vai para `ESCREVA \"inválido\"` → Fim. Qual é o furo? Redesenhe para que o programa **peça de novo** até receber um valor válido.\n\n**Exercício 6 ⭐⭐⭐** **Projeto:** decomponha e desenhe *\"Um script que, dada uma lista de impressoras com status (online/offline) e nível de toner (%), mostra as que precisam de atenção (offline OU toner abaixo de 15%).\"* Entregue: (a) as funções, (b) o fluxograma da função principal, (c) o pseudocódigo.\n\n## 8. Perguntas de verificação\n- **V1.** Qual o primeiro passo ao encarar um problema que parece grande demais?\n- **V2.** O que o losango de um fluxograma representa e quantas saídas ele tem?\n- **V3.** Como o fluxograma ajuda a achar furos?\n",
     "quiz": [
      {
       "q": "Diante de um problema que parece grande demais, qual é o primeiro passo?",
       "opcoes": [
        "Começar a escrever código",
        "Procurar uma solução pronta",
        "Dividir em partes menores que você já sabe resolver",
        "Decorar a resposta"
       ],
       "ok": 2,
       "porque": "Decomposição: entender entrada e saída, quebrar em partes e resolver a mais simples primeiro."
      },
      {
       "q": "O que o losango de um fluxograma representa?",
       "opcoes": [
        "Uma conta",
        "Uma decisão com saídas rotuladas (sim/não)",
        "Início ou fim",
        "Uma leitura de dados"
       ],
       "ok": 1,
       "porque": "Decisão: uma pergunta com resposta sim ou não, com uma seta de saída para cada resposta."
      },
      {
       "q": "Como o fluxograma ajuda a achar furos?",
       "opcoes": [
        "Mostra todos os caminhos; um que não chega ao Fim ou uma decisão com uma saída só é um furo",
        "Deixa o código mais rápido",
        "Não ajuda",
        "Substitui o teste"
       ],
       "ok": 0,
       "porque": "Seguir as setas como num mapa expõe caminhos mortos antes de escrever qualquer código."
      }
     ]
    },
    {
     "id": "DEV1-E10",
     "titulo": "Resolver 20 problemas em pseudocódigo",
     "min": 180,
     "md": "> [!abstract] Ao final desta aula você consegue\n> Pegar um problema **novo**, sem exemplo pronto, decompor, escrever o pseudocódigo, testar de mesa e explicar por que funciona. É a etapa que transforma o que você **entendeu** em algo que você **sabe fazer**.\n\n## 1. Como esta etapa funciona\nNão há texto novo. São **20 problemas**, do fácil ao difícil, usando tudo de E1 a E9. Para cada um, faça sempre estes quatro passos:\n\n1. **Entrada / processamento / saída:** escreva em uma linha cada.\n2. **Pseudocódigo:** com funções onde fizer sentido.\n3. **Teste de mesa** com **um caso pequeno** e **um valor de fronteira**.\n4. **Uma frase** explicando por que está certo.\n\n> [!warning] Regra de ouro\n> **Não vale olhar a resposta de ninguém antes de tentar por 15 minutos.** Travar faz parte. Quando travar, volte ao método de decomposição (E9). Se continuar travado, anote **onde** travou e mande para mim: a dúvida específica vale mais que a resposta certa.\n\n> [!tip] Como corrigir\n> Mande no chat: `Corrigir: DEV1-E10` + o **tempo gasto** + os problemas resolvidos (pode ser foto do caderno, digitado, ou por lotes de 5). Eu corrijo com nota e comentário, e a rubrica abaixo diz como a nota é composta.\n\n**Rubrica de cada problema (10 pontos):** correção **4** · clareza **2** · teste de mesa **2** · casos de borda **2**.\n\n## 2. Nível 1: aquecimento ⭐\n1. Leia o **preço** e a **quantidade** de um item e mostre o **total**.\n2. Leia a temperatura em Celsius e mostre em Fahrenheit (`F = C * 9 / 5 + 32`).\n3. Leia um número e diga se é **par** ou **ímpar**.\n4. Leia **100 dias** (ou outro valor) e mostre em **semanas e dias** (100 → 14 semanas e 2 dias).\n5. Leia uma nota (0 a 10) e mostre **\"Aprovado\"** (7 ou mais), **\"Recuperação\"** (de 5 a 6,9) ou **\"Reprovado\"**.\n\n## 3. Nível 2: laços e acumuladores ⭐⭐\n6. Mostre a **tabuada** de N e a **soma** dos 10 resultados.\n7. Leia **N** e calcule o **fatorial** (5! = 120).\n8. Leia números até o usuário digitar **0** e mostre **quantos** foram digitados, a **soma**, a **média** e o **maior**.\n9. Mostre os **10 primeiros termos** da sequência de Fibonacci (0, 1, 1, 2, 3, 5, 8, 13, 21, 34).\n10. Leia 4 tempos de **ping** (ms) e mostre a **média**. Se algum for maior que 100 ms, mostre também **\"instável\"**. (Teste com 20, 24, 31, 22: média 24,25.)\n\n## 4. Nível 3: funções e TI ⭐⭐⭐\n11. **Troco com notas:** dado o valor do troco (ex.: R$ 289), mostre quantas notas de 100, 50, 20, 10, 5 e 2 são necessárias (289: 2 de 100, 1 de 50, 1 de 20, 1 de 10, 1 de 5 e 2 de 2). Dica: use `DIV` e `MOD`.\n12. **Tempo de backup:** dado o tamanho em GB e a velocidade em MB/s, calcule o tempo e mostre em **horas, minutos e segundos**. Considere 1 GB = 1024 MB. Confira: 500 GB a 100 MB/s dá **1 h 25 min 20 s**.\n13. **Juros compostos:** capital, taxa mensal e meses. Mostre o montante. Confira: R$ 1.000 a 1% ao mês por 12 meses dá cerca de **R$ 1.126,83**.\n14. **Máscara de rede:** dado o prefixo (`/24`, `/26`, `/30`, `/16`), calcule os **hosts utilizáveis** (`2^(32 - prefixo) - 2`). Confira: 254, 62, 2 e 65.534.\n15. **Primo:** leia um número e diga se é **primo**. Teste: 29 (sim), 30 (não), 1 (não).\n\n## 5. Nível 4: problemas de verdade ⭐⭐⭐\n16. **Detector de força bruta:** você recebe uma lista de eventos de login (usuário e resultado \"ok\" ou \"falha\"). Mostre os usuários com **5 ou mais falhas seguidas**. Decomponha antes. Que casos de borda existem (lista vazia, uma falha seguida de sucesso)?\n17. **Monitor de CPU:** dada uma lista de medições de CPU (%), mostre a **maior sequência seguida de medições acima de 90%**. Confira com `[50, 95, 92, 40, 91, 96, 97, 30]`: o resultado é **3**.\n18. **Senha forte:** uma função `senha_forte(s)` que retorna verdadeiro se a senha tem **pelo menos 8 caracteres**, **uma letra maiúscula**, **uma minúscula** e **um número**. Liste 6 casos de teste, com o resultado esperado de cada um.\n19. **Disco por usuário:** uma lista de pastas de usuários com o tamanho em GB. Mostre o **total**, a **maior pasta** e **quais ultrapassam 10% do total**.\n20. **Seu problema:** escolha **uma tarefa repetitiva do seu trabalho** (chamados, inventário, relatórios) e escreva a solução completa: decomposição, funções, fluxograma e pseudocódigo. Este problema vale **o dobro** na avaliação. É o seu primeiro candidato a virar script de verdade quando chegarmos ao Python.\n\n## 6. Perguntas de verificação (responda sem consultar)\n- **V1.** Num problema novo, quais são seus 3 primeiros movimentos?\n- **V2.** Como você decide que um algoritmo está **certo**, e não apenas \"parece funcionar\"?\n- **V3.** Qual dos 20 problemas foi o mais difícil, **onde exatamente** você travou e como saiu?\n",
     "quiz": [
      {
       "q": "Backup de 500 GB a 100 MB/s, com 1 GB = 1024 MB. Quanto tempo leva?",
       "opcoes": [
        "1 h 25 min 20 s",
        "1 h 40 min",
        "50 min",
        "1 h 23 min 20 s"
       ],
       "ok": 0,
       "porque": "500 × 1024 = 512.000 MB; ÷ 100 = 5.120 s = 1 h (3.600 s) + 1.520 s = 1 h 25 min 20 s."
      },
      {
       "q": "Troco de R$ 289 com notas de 100, 50, 20, 10, 5 e 2. Qual é a combinação correta?",
       "opcoes": [
        "2×100, 1×50, 2×20, 1×5, 2×2",
        "3×100, 1×20, 1×10, 1×5, 2×2",
        "1×100, 3×50, 1×20, 1×10, 1×5, 2×2",
        "2×100, 1×50, 1×20, 1×10, 1×5, 2×2"
       ],
       "ok": 3,
       "porque": "289 DIV 100 = 2 (sobra 89); 89 DIV 50 = 1 (39); 39 DIV 20 = 1 (19); 19 DIV 10 = 1 (9); 9 DIV 5 = 1 (4); 4 DIV 2 = 2 (0)."
      },
      {
       "q": "Num problema novo, quando você pode dizer que o algoritmo está certo?",
       "opcoes": [
        "Quando passou no teste de mesa com um caso pequeno e com os valores de fronteira, e você sabe explicar por quê",
        "Quando é curto",
        "Quando alguém aprovou",
        "Quando rodou uma vez sem erro"
       ],
       "ok": 0,
       "porque": "'Parece funcionar' não basta: caso pequeno, fronteiras e uma explicação em palavras próprias são a prova."
      }
     ]
    }
   ],
   "prova": {
    "nObj": 8,
    "nDiss": 4,
    "pool": [
     {
      "id": "o1",
      "enunciado": "Qual alternativa descreve melhor um algoritmo?",
      "opcoes": [
       "Um programa escrito em Python",
       "Uma sequência finita, clara e ordenada de passos que resolve um problema",
       "Um fluxograma desenhado no papel",
       "Qualquer lista de tarefas"
      ],
      "ok": 1,
      "porque": "Algoritmo é a ideia: finito, claro e ordenado. A linguagem é outro assunto."
     },
     {
      "id": "o2",
      "enunciado": "Um chamado tem sintoma, diagnóstico e solução. Em termos de entrada, processamento e saída, qual é o mapeamento correto?",
      "opcoes": [
       "Sintoma = saída; diagnóstico = entrada; solução = processamento",
       "Sintoma = entrada; diagnóstico = processamento; solução = saída",
       "Sintoma = processamento; diagnóstico = saída; solução = entrada",
       "Os três são entrada"
      ],
      "ok": 1,
      "porque": "O sintoma chega (entrada), o diagnóstico é o que se faz com ele (processamento) e a solução é o que se entrega (saída)."
     },
     {
      "id": "o3",
      "enunciado": "Usando DIV e MOD, 135 minutos correspondem a:",
      "opcoes": [
       "1 h 75 min",
       "2 h 15 min",
       "13 h 5 min",
       "2 h 35 min"
      ],
      "ok": 1,
      "porque": "135 DIV 60 = 2 horas e 135 MOD 60 = 15 minutos."
     },
     {
      "id": "o4",
      "enunciado": "Qual destes nomes de variável explica melhor o que ela guarda (espaço livre do disco, em GB)?",
      "opcoes": [
       "x",
       "dado",
       "temp",
       "livre_gb"
      ],
      "ok": 3,
      "porque": "O nome diz o que é e, se tiver unidade, ela vai junto."
     },
     {
      "id": "o5",
      "enunciado": "O que faz a instrução n ← n + 1?",
      "opcoes": [
       "Compara n com n + 1",
       "Lê o valor atual de n, soma 1 e guarda o resultado de volta em n",
       "Gera um erro, porque n não pode ser igual a n + 1",
       "Cria uma nova variável chamada n + 1"
      ],
      "ok": 1,
      "porque": "← não é igualdade de matemática. É \"guarde o que está à direita na caixa da esquerda\"."
     },
     {
      "id": "o6",
      "enunciado": "O que resulta de 10 + 5 (números) e de \"10\" + \"5\" (textos), nessa ordem?",
      "opcoes": [
       "15 e 15",
       "\"105\" e 15",
       "15 e \"105\"",
       "15 e erro"
      ],
      "ok": 2,
      "porque": "Números somam. Textos se juntam (concatenam). Muitos bugs nascem de um número que virou texto."
     },
     {
      "id": "o7",
      "enunciado": "Regra: abaixo de 10% livre é CRÍTICO; abaixo de 25% é ATENÇÃO; o resto é OK. Qual é o resultado para exatamente 10% livre?",
      "opcoes": [
       "CRÍTICO",
       "ATENÇÃO",
       "OK",
       "Erro"
      ],
      "ok": 1,
      "porque": "10 não é menor que 10 (não é crítico), mas é menor que 25 (atenção). Os valores de fronteira precisam estar escritos."
     },
     {
      "id": "o8",
      "enunciado": "Quais valores você testaria para a fronteira de 25%?",
      "opcoes": [
       "25 apenas",
       "0 e 100",
       "24, 25 e 26",
       "10, 25 e 50"
      ],
      "ok": 2,
      "porque": "Um abaixo, o exato e um acima."
     },
     {
      "id": "o9",
      "enunciado": "Regra de acesso: (ativo E mfa) OU admin. Um usuário INATIVO, sem MFA, mas com admin verdadeiro. Qual o resultado?",
      "opcoes": [
       "Nega, porque está inativo",
       "Permite, porque o OU é satisfeito por admin (e isso é um furo de segurança)",
       "Depende do horário",
       "A regra gera erro"
      ],
      "ok": 1,
      "porque": "(F E F) OU V = V. Um admin inativo entra. É preciso exigir conta ativa para todos."
     },
     {
      "id": "o10",
      "enunciado": "NÃO (a > 5 E b < 3) equivale a:",
      "opcoes": [
       "a ≤ 5 E b ≥ 3",
       "a ≤ 5 OU b ≥ 3",
       "a > 5 OU b < 3",
       "a < 5 OU b > 3"
      ],
      "ok": 1,
      "porque": "De Morgan: nega-se cada parte (> vira ≤, < vira ≥) e o E vira OU."
     },
     {
      "id": "o11",
      "enunciado": "Em A E B, se A é falso, o que o computador faz (curto-circuito)?",
      "opcoes": [
       "Avalia B mesmo assim",
       "Não avalia B, porque o resultado já é falso",
       "Gera um erro",
       "Devolve verdadeiro"
      ],
      "ok": 1,
      "porque": "Em E, se o primeiro já é falso, o resultado já está decidido. Isso evita, por exemplo, uma divisão por zero."
     },
     {
      "id": "o12",
      "enunciado": "Qual é a condição correta para ano bissexto?",
      "opcoes": [
       "(a MOD 4 = 0 E a MOD 100 ≠ 0) OU a MOD 400 = 0",
       "a MOD 4 = 0 E a MOD 100 = 0",
       "a MOD 4 = 0 OU a MOD 100 ≠ 0",
       "a MOD 400 = 0 E a MOD 4 ≠ 0"
      ],
      "ok": 0,
      "porque": "Divisível por 4 e não por 100, ou divisível por 400. Teste: 2000 sim, 1900 não, 2024 sim, 2023 não."
     },
     {
      "id": "o13",
      "enunciado": "Qual é a saída?\n\nsoma ← 0\nPARA i DE 1 ATÉ 100\n    soma ← soma + i\nFIM-PARA\nESCREVA soma",
      "opcoes": [
       "100",
       "5050",
       "5000",
       "10100"
      ],
      "ok": 1,
      "porque": "Acumulador somando de 1 a 100: 5050."
     },
     {
      "id": "o14",
      "enunciado": "Quantas vezes o bloco roda?\n\ni ← 0\nENQUANTO i ≤ 10\n    ...\n    i ← i + 1\nFIM-ENQUANTO",
      "opcoes": [
       "10",
       "11",
       "9",
       "Infinitas"
      ],
      "ok": 1,
      "porque": "i vale 0, 1, 2, ..., 10: são 11 valores. Com i < 10 seriam 10. É o off-by-one."
     },
     {
      "id": "o15",
      "enunciado": "Por que este laço nunca termina?\n\nn ← 10\nENQUANTO n > 0\n    ESCREVA n\nFIM-ENQUANTO",
      "opcoes": [
       "Porque n é 10",
       "Porque nada altera n dentro do laço",
       "Porque falta o LEIA",
       "Porque o ENQUANTO é errado"
      ],
      "ok": 1,
      "porque": "A condição n > 0 permanece verdadeira para sempre. Falta algo como n ← n - 1."
     },
     {
      "id": "o16",
      "enunciado": "FUNÇÃO f(n): RETORNE n * 2 + 1. Quanto vale f(f(3))?",
      "opcoes": [
       "7",
       "15",
       "13",
       "9"
      ],
      "ok": 1,
      "porque": "f(3) = 7; f(7) = 15."
     },
     {
      "id": "o17",
      "enunciado": "Uma função só tem ESCREVA, sem RETORNE. O que acontece com x ← f(2) + 5?",
      "opcoes": [
       "Funciona normalmente",
       "Não dá para usar o resultado na conta, porque nada foi devolvido",
       "Soma 5 à tela",
       "Mostra 5"
      ],
      "ok": 1,
      "porque": "Só quem RETORNA devolve um valor que pode entrar numa expressão."
     },
     {
      "id": "o18",
      "enunciado": "Qual é a saída?\n\na ← 2\nb ← 3\nPARA i DE 1 ATÉ 3\n    a ← a + b\n    b ← b + 1\nFIM-PARA\nESCREVA a, b",
      "opcoes": [
       "9 5",
       "14 6",
       "11 6",
       "14 5"
      ],
      "ok": 1,
      "porque": "Volta 1: a=5, b=4. Volta 2: a=9, b=5. Volta 3: a=14, b=6."
     },
     {
      "id": "o19",
      "enunciado": "Com n = 4, quantas voltas faz?\n\npassos ← 0\nENQUANTO n ≠ 1\n    SE n MOD 2 = 0 ENTÃO n ← n DIV 2\n    SENÃO n ← 3 * n + 1\n    passos ← passos + 1\nFIM-ENQUANTO",
      "opcoes": [
       "1",
       "2",
       "3",
       "4"
      ],
      "ok": 1,
      "porque": "4 vira 2 (passo 1) e 2 vira 1 (passo 2): para com n = 1, passos = 2."
     },
     {
      "id": "o20",
      "enunciado": "Num fluxograma, uma decisão (losango) com apenas UMA seta de saída indica:",
      "opcoes": [
       "Um caminho rápido",
       "Um furo: falta o outro caminho",
       "Um laço correto",
       "Uma função"
      ],
      "ok": 1,
      "porque": "Toda pergunta sim/não precisa de duas saídas. Uma só deixa um caso sem destino."
     }
    ],
    "dissertativas": [
     {
      "id": "d1",
      "enunciado": "Escreva em pseudocódigo um algoritmo que leia o total e o livre de um disco (em GB) e mostre CRÍTICO (abaixo de 10% livre), ATENÇÃO (abaixo de 25%) ou OK. Depois liste 6 valores de fronteira que você testaria e o resultado esperado em cada um."
     },
     {
      "id": "d2",
      "enunciado": "Explique com suas palavras por que a ORDEM das condições importa num SE / SENÃO SE. Dê um exemplo do seu dia a dia em TI e mostre o que dá errado quando a ordem está trocada."
     },
     {
      "id": "d3",
      "enunciado": "A regra de VPN é: (ativo E mfa) OU (admin E rede_interna). Aponte um furo de segurança, diga quem consegue entrar sem deveria e reescreva a regra corrigida."
     },
     {
      "id": "d4",
      "enunciado": "Com a = 1, b = 2 e c = 3, escreva um algoritmo que deixe a = 2, b = 3 e c = 1 usando UMA variável auxiliar. Faça o acompanhamento passo a passo mostrando o valor de cada variável depois de cada linha."
     },
     {
      "id": "d5",
      "enunciado": "Escreva uma função soma_digitos(n) em pseudocódigo (use DIV e MOD) e faça o teste de mesa completo com n = 1234, mostrando o valor de n, d e soma a cada volta."
     },
     {
      "id": "d6",
      "enunciado": "Decomponha este pedido em funções e escreva o pseudocódigo: dada uma lista de impressoras, cada uma com status (online/offline) e toner (%), mostre as que precisam de atenção (offline OU toner abaixo de 15%). Diga quais casos de borda você testaria."
     }
    ]
   },
   "entrega": "Caderno com 20 problemas resolvidos.",
   "dominio": "Você resolve um problema novo sem exemplo e explica passo a passo por que funciona."
  },
  {
   "id": "DEV2",
   "nome": "Python fundamentos",
   "horas": 40,
   "peso": 20,
   "minPct": 20,
   "etapas": [
    {
     "id": "DEV2-E1",
     "titulo": "Instalar, rodar e escrever o primeiro programa",
     "min": 45
    },
    {
     "id": "DEV2-E2",
     "titulo": "Variáveis, entrada e saída",
     "min": 45
    },
    {
     "id": "DEV2-E3",
     "titulo": "Condicionais",
     "min": 45
    },
    {
     "id": "DEV2-E4",
     "titulo": "Laços",
     "min": 45
    },
    {
     "id": "DEV2-E5",
     "titulo": "Funções",
     "min": 45
    },
    {
     "id": "DEV2-E6",
     "titulo": "Listas e dicionários",
     "min": 45
    },
    {
     "id": "DEV2-E7",
     "titulo": "Arquivos e CSV",
     "min": 45
    },
    {
     "id": "DEV2-E8",
     "titulo": "Erros e exceções",
     "min": 45
    },
    {
     "id": "DEV2-E9",
     "titulo": "Módulos e bibliotecas",
     "min": 45
    },
    {
     "id": "DEV2-E10",
     "titulo": "15 exercícios do seu dia a dia",
     "min": 45
    }
   ],
   "entrega": "Repositório com os 15 exercícios."
  },
  {
   "id": "DEV3",
   "nome": "Estruturas de dados",
   "horas": 30,
   "peso": 15,
   "minPct": 20,
   "etapas": [
    {
     "id": "DEV3-E1",
     "titulo": "Listas, tuplas, conjuntos e dicionários",
     "min": 45
    },
    {
     "id": "DEV3-E2",
     "titulo": "Pilhas e filas",
     "min": 45
    },
    {
     "id": "DEV3-E3",
     "titulo": "Busca",
     "min": 45
    },
    {
     "id": "DEV3-E4",
     "titulo": "Ordenação",
     "min": 45
    },
    {
     "id": "DEV3-E5",
     "titulo": "Recursão (noção)",
     "min": 45
    },
    {
     "id": "DEV3-E6",
     "titulo": "Complexidade (Big O, noção)",
     "min": 45
    },
    {
     "id": "DEV3-E7",
     "titulo": "Escolher a estrutura certa",
     "min": 45
    }
   ]
  },
  {
   "id": "DEV4",
   "nome": "Depuração, testes e boas práticas",
   "horas": 20,
   "peso": 10,
   "minPct": 20,
   "etapas": [
    {
     "id": "DEV4-E1",
     "titulo": "Ler mensagens de erro e stack trace",
     "min": 45
    },
    {
     "id": "DEV4-E2",
     "titulo": "Depurar com prints e com o depurador",
     "min": 45
    },
    {
     "id": "DEV4-E3",
     "titulo": "Testes unitários",
     "min": 45
    },
    {
     "id": "DEV4-E4",
     "titulo": "Nomes claros, funções pequenas, comentários úteis",
     "min": 45
    },
    {
     "id": "DEV4-E5",
     "titulo": "Revisão de código",
     "min": 45
    }
   ]
  },
  {
   "id": "DEV5",
   "nome": "Git e GitHub",
   "horas": 12,
   "peso": 5,
   "minPct": 20,
   "etapas": [
    {
     "id": "DEV5-E1",
     "titulo": "O que é controle de versão",
     "min": 45
    },
    {
     "id": "DEV5-E2",
     "titulo": "init, add, commit, push, pull",
     "min": 45
    },
    {
     "id": "DEV5-E3",
     "titulo": "Branches e merge",
     "min": 45
    },
    {
     "id": "DEV5-E4",
     "titulo": "GitHub e pull request",
     "min": 45
    },
    {
     "id": "DEV5-E5",
     "titulo": ".gitignore e como nunca subir segredos",
     "min": 45
    }
   ]
  },
  {
   "id": "DEV6",
   "nome": "Web e APIs",
   "horas": 40,
   "peso": 10,
   "minPct": 20,
   "etapas": [
    {
     "id": "DEV6-E1",
     "titulo": "Como a web funciona: cliente, servidor e HTTP",
     "min": 45
    },
    {
     "id": "DEV6-E2",
     "titulo": "JSON",
     "min": 45
    },
    {
     "id": "DEV6-E3",
     "titulo": "APIs REST",
     "min": 45
    },
    {
     "id": "DEV6-E4",
     "titulo": "HTML e CSS básico",
     "min": 45
    },
    {
     "id": "DEV6-E5",
     "titulo": "JavaScript básico",
     "min": 45
    },
    {
     "id": "DEV6-E6",
     "titulo": "DOM e eventos",
     "min": 45
    },
    {
     "id": "DEV6-E7",
     "titulo": "Armazenamento local no navegador",
     "min": 45
    },
    {
     "id": "DEV6-E8",
     "titulo": "PWA: app instalável que funciona offline",
     "min": 45
    }
   ]
  },
  {
   "id": "DEV7",
   "nome": "Banco de dados e SQL",
   "horas": 25,
   "peso": 10,
   "minPct": 20,
   "etapas": [
    {
     "id": "DEV7-E1",
     "titulo": "Tabelas, linhas, chaves primárias e estrangeiras",
     "min": 45
    },
    {
     "id": "DEV7-E2",
     "titulo": "SELECT, WHERE, ORDER BY",
     "min": 45
    },
    {
     "id": "DEV7-E3",
     "titulo": "INSERT, UPDATE, DELETE",
     "min": 45
    },
    {
     "id": "DEV7-E4",
     "titulo": "JOIN",
     "min": 45
    },
    {
     "id": "DEV7-E5",
     "titulo": "GROUP BY e agregações",
     "min": 45
    },
    {
     "id": "DEV7-E6",
     "titulo": "Modelagem simples",
     "min": 45
    },
    {
     "id": "DEV7-E7",
     "titulo": "SQLite com Python",
     "min": 45
    }
   ]
  },
  {
   "id": "DEV8",
   "nome": "Orientação a objetos e design",
   "horas": 25,
   "peso": 5,
   "minPct": 20,
   "etapas": [
    {
     "id": "DEV8-E1",
     "titulo": "Classes e objetos",
     "min": 45
    },
    {
     "id": "DEV8-E2",
     "titulo": "Atributos e métodos",
     "min": 45
    },
    {
     "id": "DEV8-E3",
     "titulo": "Encapsulamento",
     "min": 45
    },
    {
     "id": "DEV8-E4",
     "titulo": "Herança e composição",
     "min": 45
    },
    {
     "id": "DEV8-E5",
     "titulo": "Princípios simples de design (noção de SOLID)",
     "min": 45
    },
    {
     "id": "DEV8-E6",
     "titulo": "Organizar um projeto em módulos",
     "min": 45
    }
   ]
  },
  {
   "id": "DEV9",
   "nome": "Projeto integrador",
   "horas": 40,
   "peso": 0,
   "tipo": "entrega",
   "etapas": [],
   "entrega": "Construir a sua versão do app de estudos, com revisão de código. Entrega obrigatória para a aprovação final do curso."
  }
 ],
 "checklist": [
  "Resolve um problema novo com lógica, sem copiar solução",
  "Escreve funções pequenas e claras em Python",
  "Lê uma mensagem de erro e acha a causa",
  "Escreve pelo menos 5 testes que passam",
  "Usa Git e GitHub sem expor segredos",
  "Consome uma API e trata o JSON",
  "Escreve consultas SQL com JOIN e agregação",
  "Explica o que cada linha do próprio código faz",
  "Concluiu o projeto integrador"
 ],
 "nota": "O nível \"Pleno\" depende de tempo de experiência e de resultados no trabalho. O app mede estudo, não substitui experiência."
});
