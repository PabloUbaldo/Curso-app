---
titulo: EST - Dev Logica - DEV1-E1 O que e um algoritmo
tipo: aula
curso: Dev
disciplina: DEV1
etapa: DEV1-E1
tempo_estimado_min: 40
status: pendente
tags: [estudo, dev, logica]
---

# DEV1-E1 · O que é um algoritmo

> [!abstract] Ao final desta aula você consegue
> Explicar o que é um algoritmo, achar o furo numa sequência de passos e escrever um procedimento que um "robô literal" executa sem perguntar nada.

## 1. Aquecimento (2 min)
> [!question] Desafio
> Você precisa explicar a um robô que obedece **ao pé da letra** como fazer um café. Ele só entende o que está escrito. Se você escrever apenas "faça o café", o que acontece? Pense 30 segundos antes de abrir a resposta.

> [!success]- Resposta
> Nada, ou uma bagunça. O robô não sabe: pegar o quê? Água de onde? Quanto pó? Ligar o quê? E ele **nunca pergunta**. Quem escreve é quem precisa pensar em tudo.

## 2. A ideia
O computador é o funcionário mais obediente e mais burro do mundo: faz **exatamente** o que está escrito, nem uma vírgula a mais.

**Algoritmo** é uma sequência de passos que resolve um problema. Para valer, precisa ser:
- **Finito:** termina em algum momento.
- **Claro:** ninguém precisa adivinhar o que um passo quer dizer.
- **Ordenado:** trocar a ordem muda o resultado, ou quebra tudo.

> [!tip] Pense assim
> Uma receita de bolo. A receita é a **ideia**, e não importa se está escrita em português ou francês. Quando você a traduz para uma linguagem que o computador entende (Python, JavaScript...), ela vira um **programa**.

## 3. Exemplo trabalhado: o teste dos furos
```
Ruim:   1. Faça o café.

Quase:  1. Ponha água.  2. Ligue.  3. Sirva.
        (quanta água? onde? ligue o quê? sirva em quê?)

Bom:    1. Encha a jarra com 1 litro de água.
        2. Despeje a água no reservatório da cafeteira.
        3. Coloque um filtro de papel no suporte.
        4. Coloque 6 colheres de pó no filtro.
        5. Aperte o botão de ligar.
        6. Espere a luz apagar (o café ficou pronto).
        7. Sirva na xícara.
```
**O teste:** alguém que nunca viu uma cafeteira consegue seguir sem fazer nenhuma pergunta? Se sim, o algoritmo passou.

## 4. Seu mundo (TI)
Procedimento clássico para limpar a fila de impressão:

```
1. Pare o serviço Spooler.            (net stop spooler)
2. Apague os arquivos da pasta PRINTERS.
3. Inicie o serviço Spooler.          (net start spooler)
```
A **ordem** é o que faz funcionar. O Spooler é o serviço do Windows que guarda os trabalhos de impressão em arquivos, e enquanto está rodando ele segura esses arquivos. Apagar antes de parar dá erro ou a fila volta.

> [!tip] Por que isso paga o seu salário
> **Automação** é pegar um procedimento manual, escrito sem furos, e entregá-lo a uma máquina. DevOps é isso em escala. Quem escreve o passo a passo com precisão já fez a parte mais difícil.

## 5. Termos
- **Instrução:** um passo único e executável.
- **Sequência:** instruções em ordem, uma depois da outra.
- **Ambiguidade:** quando um passo pode ser entendido de duas formas. É o inimigo número um.
- **Programa:** um algoritmo escrito numa linguagem que o computador entende.

## 6. Mão na massa (no caderno)
**Exercício 1 ⭐** Escolha uma tarefa do seu dia (café, instalar impressora por IP, tirar um print) e escreva em **6 a 12 passos numerados**. Eu serei o robô literal: vou executar ao pé da letra e mostrar onde quebra.

**Exercício 2 ⭐** O que dá errado nesta sequência? Qual é a ordem correta?
```
Atualizar o PC de um usuário:
1. Reinicie o computador.
2. Avise o usuário.
3. Peça para ele salvar o trabalho.
```

**Exercício 3 ⭐⭐** Coloque estes passos na ordem certa e diga **quais passos dependem de quais**. (As telas do Windows variam; o que importa é a lógica das dependências.)
```
A. Clique em Concluir.
B. Abra Configurações > Impressoras e scanners.
C. Informe o endereço IP da impressora.
D. Clique em Adicionar dispositivo e depois em "Adicionar manualmente".
E. Selecione "Adicionar impressora usando endereço IP ou nome de host".
F. Escolha o driver (fabricante e modelo).
G. Imprima uma página de teste.
```

**Exercício 4 ⭐⭐** Este pedido é ambíguo: *"Instale o programa no PC do usuário e deixe tudo configurado."* Liste **pelo menos 4 ambiguidades**.

**Exercício 5 ⭐⭐⭐** Escreva o algoritmo para **descobrir o endereço IP da máquina de um usuário e anotar no chamado**. Deve passar no teste dos furos.

## 7. Perguntas de verificação (sem consultar a aula)
- **V1.** Por que "Faça o café" não é um algoritmo? Dê **dois** motivos.
- **V2.** Com suas palavras, qual a diferença entre **algoritmo** e **programa**?
- **V3.** Por que a ordem importa no procedimento do Spooler?

## 8. Registro
- [ ] Li a aula
- [ ] Fiz os exercícios no caderno
- [ ] Mandei para correção (`Corrigir: DEV1-E1`)
- Nota: __ · Tempo: __ min
