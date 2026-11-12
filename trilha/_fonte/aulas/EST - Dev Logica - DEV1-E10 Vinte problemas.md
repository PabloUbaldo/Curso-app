---
titulo: EST - Dev Logica - DEV1-E10 Vinte problemas
tipo: aula
curso: Dev
disciplina: DEV1
etapa: DEV1-E10
tempo_estimado_min: 180
status: pendente
tags: [estudo, dev, logica]
---

# DEV1-E10 · Resolver 20 problemas em pseudocódigo

> [!abstract] Ao final desta aula você consegue
> Pegar um problema **novo**, sem exemplo pronto, decompor, escrever o pseudocódigo, testar de mesa e explicar por que funciona. É a etapa que transforma o que você **entendeu** em algo que você **sabe fazer**.

## 1. Como esta etapa funciona
Não há texto novo. São **20 problemas**, do fácil ao difícil, usando tudo de E1 a E9. Para cada um, faça sempre estes quatro passos:

1. **Entrada / processamento / saída:** escreva em uma linha cada.
2. **Pseudocódigo:** com funções onde fizer sentido.
3. **Teste de mesa** com **um caso pequeno** e **um valor de fronteira**.
4. **Uma frase** explicando por que está certo.

> [!warning] Regra de ouro
> **Não vale olhar a resposta de ninguém antes de tentar por 15 minutos.** Travar faz parte. Quando travar, volte ao método de decomposição (E9). Se continuar travado, anote **onde** travou e mande para mim: a dúvida específica vale mais que a resposta certa.

> [!tip] Como corrigir
> Mande no chat: `Corrigir: DEV1-E10` + o **tempo gasto** + os problemas resolvidos (pode ser foto do caderno, digitado, ou por lotes de 5). Eu corrijo com nota e comentário, e a rubrica abaixo diz como a nota é composta.

**Rubrica de cada problema (10 pontos):** correção **4** · clareza **2** · teste de mesa **2** · casos de borda **2**.

## 2. Nível 1: aquecimento ⭐
1. Leia o **preço** e a **quantidade** de um item e mostre o **total**.
2. Leia a temperatura em Celsius e mostre em Fahrenheit (`F = C * 9 / 5 + 32`).
3. Leia um número e diga se é **par** ou **ímpar**.
4. Leia **100 dias** (ou outro valor) e mostre em **semanas e dias** (100 → 14 semanas e 2 dias).
5. Leia uma nota (0 a 10) e mostre **"Aprovado"** (7 ou mais), **"Recuperação"** (de 5 a 6,9) ou **"Reprovado"**.

## 3. Nível 2: laços e acumuladores ⭐⭐
6. Mostre a **tabuada** de N e a **soma** dos 10 resultados.
7. Leia **N** e calcule o **fatorial** (5! = 120).
8. Leia números até o usuário digitar **0** e mostre **quantos** foram digitados, a **soma**, a **média** e o **maior**.
9. Mostre os **10 primeiros termos** da sequência de Fibonacci (0, 1, 1, 2, 3, 5, 8, 13, 21, 34).
10. Leia 4 tempos de **ping** (ms) e mostre a **média**. Se algum for maior que 100 ms, mostre também **"instável"**. (Teste com 20, 24, 31, 22: média 24,25.)

## 4. Nível 3: funções e TI ⭐⭐⭐
11. **Troco com notas:** dado o valor do troco (ex.: R$ 289), mostre quantas notas de 100, 50, 20, 10, 5 e 2 são necessárias (289: 2 de 100, 1 de 50, 1 de 20, 1 de 10, 1 de 5 e 2 de 2). Dica: use `DIV` e `MOD`.
12. **Tempo de backup:** dado o tamanho em GB e a velocidade em MB/s, calcule o tempo e mostre em **horas, minutos e segundos**. Considere 1 GB = 1024 MB. Confira: 500 GB a 100 MB/s dá **1 h 25 min 20 s**.
13. **Juros compostos:** capital, taxa mensal e meses. Mostre o montante. Confira: R$ 1.000 a 1% ao mês por 12 meses dá cerca de **R$ 1.126,83**.
14. **Máscara de rede:** dado o prefixo (`/24`, `/26`, `/30`, `/16`), calcule os **hosts utilizáveis** (`2^(32 - prefixo) - 2`). Confira: 254, 62, 2 e 65.534.
15. **Primo:** leia um número e diga se é **primo**. Teste: 29 (sim), 30 (não), 1 (não).

## 5. Nível 4: problemas de verdade ⭐⭐⭐
16. **Detector de força bruta:** você recebe uma lista de eventos de login (usuário e resultado "ok" ou "falha"). Mostre os usuários com **5 ou mais falhas seguidas**. Decomponha antes. Que casos de borda existem (lista vazia, uma falha seguida de sucesso)?
17. **Monitor de CPU:** dada uma lista de medições de CPU (%), mostre a **maior sequência seguida de medições acima de 90%**. Confira com `[50, 95, 92, 40, 91, 96, 97, 30]`: o resultado é **3**.
18. **Senha forte:** uma função `senha_forte(s)` que retorna verdadeiro se a senha tem **pelo menos 8 caracteres**, **uma letra maiúscula**, **uma minúscula** e **um número**. Liste 6 casos de teste, com o resultado esperado de cada um.
19. **Disco por usuário:** uma lista de pastas de usuários com o tamanho em GB. Mostre o **total**, a **maior pasta** e **quais ultrapassam 10% do total**.
20. **Seu problema:** escolha **uma tarefa repetitiva do seu trabalho** (chamados, inventário, relatórios) e escreva a solução completa: decomposição, funções, fluxograma e pseudocódigo. Este problema vale **o dobro** na avaliação. É o seu primeiro candidato a virar script de verdade quando chegarmos ao Python.

## 6. Perguntas de verificação (responda sem consultar)
- **V1.** Num problema novo, quais são seus 3 primeiros movimentos?
- **V2.** Como você decide que um algoritmo está **certo**, e não apenas "parece funcionar"?
- **V3.** Qual dos 20 problemas foi o mais difícil, **onde exatamente** você travou e como saiu?

## 7. Registro
- [ ] Resolvi os problemas 1 a 5
- [ ] Resolvi os problemas 6 a 10
- [ ] Resolvi os problemas 11 a 15
- [ ] Resolvi os problemas 16 a 20
- [ ] Mandei para correção (`Corrigir: DEV1-E10`)
- Nota: __ · Tempo: __ min
