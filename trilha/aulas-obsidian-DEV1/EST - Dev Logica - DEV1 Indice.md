---
titulo: EST - Dev Logica - DEV1 Indice
tipo: indice
curso: Dev
disciplina: DEV1
tags: [estudo, dev, logica]
---

# DEV1 · Lógica e algoritmos

> [!abstract] Objetivo
> Aprender a **pensar em passos** antes de escrever qualquer código. Quem domina isso aprende qualquer linguagem. Quem pula essa parte decora sintaxe e trava no primeiro problema novo.

## Como funciona
- **10 etapas**, cerca de **30 h** no total. Não corra: uma etapa por sessão (45 a 90 min).
- A **prova da disciplina** libera quando as 10 etapas estiverem concluídas e você somar **pelo menos 6 h** de estudo. Aprovação: **nota 7 ou mais**.
- Faça **no caderno primeiro**. Só depois digite.
- Tente por pelo menos **10 minutos** antes de pedir ajuda.
- **Mande também a resposta errada.** Ela mostra onde está o buraco, e é aí que eu ensino.
- Cada aula tem um **desafio de abertura** com a resposta escondida (clique na setinha para abrir). Tente antes de abrir.

## Como entregar para correção
Cole no chat, uma etapa por vez:

```
Corrigir: DEV1-E3
Tempo gasto: 50 min
Exercício 1: ...
Exercício 2: ...
Verificação V1: ...
```

Eu dou nota de 0 a 10 em cada item e digo o que revisar. A etapa conta como **concluída** quando você acerta o essencial nas perguntas de verificação (nota 7 ou mais).

## Mapa das etapas
1. [[EST - Dev Logica - DEV1-E1 O que e um algoritmo]]
2. [[EST - Dev Logica - DEV1-E2 Entrada processamento e saida]]
3. [[EST - Dev Logica - DEV1-E3 Variaveis e tipos de dados]]
4. [[EST - Dev Logica - DEV1-E4 Condicionais]]
5. [[EST - Dev Logica - DEV1-E5 Operadores logicos e tabela verdade]]
6. [[EST - Dev Logica - DEV1-E6 Lacos de repeticao]]
7. [[EST - Dev Logica - DEV1-E7 Funcoes]]
8. [[EST - Dev Logica - DEV1-E8 Teste de mesa]]
9. [[EST - Dev Logica - DEV1-E9 Decomposicao e fluxogramas]]
10. [[EST - Dev Logica - DEV1-E10 Vinte problemas]]

## Guia de pseudocódigo
**Pseudocódigo** é um algoritmo escrito em português estruturado: parece código, mas nenhuma máquina o executa. É o que usamos aqui para treinar a lógica sem se preocupar com sintaxe de linguagem.

```
// Isto é um comentário

LEIA nome                      // pega um valor de fora (teclado, arquivo...)
ESCREVA "Olá, ", nome          // mostra algo na tela
x ← 10                         // guarda 10 na variável x
x ← x + 1                      // lê o valor atual, soma 1, guarda de volta

SE x > 5 ENTÃO
    ESCREVA "grande"
SENÃO SE x = 5 ENTÃO
    ESCREVA "médio"
SENÃO
    ESCREVA "pequeno"
FIM-SE

ENQUANTO x < 10 FAÇA           // testa ANTES: pode nem entrar
    x ← x + 1
FIM-ENQUANTO

REPITA                         // testa DEPOIS: entra pelo menos uma vez
    LEIA n
ATÉ n = 0

PARA i DE 1 ATÉ 5 FAÇA         // i vale 1, 2, 3, 4 e 5
    ESCREVA i
FIM-PARA

FUNÇÃO dobro(n)
    RETORNE n * 2
FIM-FUNÇÃO
```

| Tipo | Símbolos |
|---|---|
| Atribuição (guardar) | `←` |
| Aritméticos | `+` `-` `*` `/` (divisão normal), `DIV` (quociente inteiro), `MOD` (resto) |
| Comparação | `=` `≠` `<` `>` `≤` `≥` |
| Lógicos | `E` `OU` `NÃO` |

Exemplo: `17 / 5 = 3,4` · `17 DIV 5 = 3` · `17 MOD 5 = 2`.

> [!warning] Não confunda
> `←` **guarda** um valor. `=` **pergunta** se dois valores são iguais. Misturar os dois é um dos erros mais comuns de quem está começando.

## Registro de progresso
| Etapa | Tempo gasto (min) | Nota | Data |
|---|---|---|---|
| E1 | | | |
| E2 | | | |
| E3 | | | |
| E4 | | | |
| E5 | | | |
| E6 | | | |
| E7 | | | |
| E8 | | | |
| E9 | | | |
| E10 | | | |
| **Total** | | | |
