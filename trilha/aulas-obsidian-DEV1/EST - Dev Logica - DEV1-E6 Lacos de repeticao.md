---
titulo: EST - Dev Logica - DEV1-E6 Lacos de repeticao
tipo: aula
curso: Dev
disciplina: DEV1
etapa: DEV1-E6
tempo_estimado_min: 70
status: pendente
tags: [estudo, dev, logica]
---

# DEV1-E6 · Laços de repetição

> [!abstract] Ao final desta aula você consegue
> Fazer o computador repetir uma tarefa quantas vezes for preciso, escolher entre `ENQUANTO`, `PARA` e `REPITA`, usar **contador** e **acumulador**, e caçar os dois bugs mais famosos: o **laço infinito** e o erro de **uma volta a mais ou a menos**.

## 1. Aquecimento (3 min)
> [!question] 500 computadores
> Você precisa verificar se **500 computadores** estão ligados. Escrever uma instrução para cada um daria 500 linhas. Como você pediria isso ao robô literal em **3 ou 4 linhas**?

> [!success]- Resposta
> Descrevendo uma tarefa que **se repete** e dizendo até quando: "para cada computador da lista, teste se responde". Isso é um **laço**. O computador é ótimo nisso: repetir sem cansar e sem errar de tédio.

## 2. A ideia
Um **laço** (ou *loop*) executa um bloco de instruções várias vezes. Existem três formas. Todas terminam o bloco com um `FIM-...`.

**`ENQUANTO`**: testa a condição **antes**. Se for falsa de cara, não executa nenhuma vez.
```
i ← 1
ENQUANTO i ≤ 5
    ESCREVA i
    i ← i + 1
FIM-ENQUANTO
```
Saída: `1 2 3 4 5`.

**`PARA`**: quando você **sabe quantas voltas** quer. O contador anda sozinho.
```
PARA i DE 1 ATÉ 5
    ESCREVA i
FIM-PARA
```

**`REPITA ... ATÉ`**: testa **depois**. Roda **pelo menos uma vez**. Ótimo para "peça de novo até a pessoa acertar".
```
REPITA
    LEIA senha
ATÉ senha = "1234"
```

> [!tip] Como escolher
> Sabe o número de voltas? `PARA`. Depende de uma condição que pode falhar de cara? `ENQUANTO`. Precisa rodar ao menos uma vez (ler algo e validar)? `REPITA`.

## 3. Contador e acumulador
Dois papéis que as variáveis de laço fazem o tempo todo:
- **Contador:** conta quantas vezes algo aconteceu (`cont ← cont + 1`). Começa em 0.
- **Acumulador:** vai somando valores (`soma ← soma + valor`). Começa em 0 para somas e em 1 para multiplicações.

**Exemplo: soma de 1 a 100.**
```
soma ← 0
PARA i DE 1 ATÉ 100
    soma ← soma + i
FIM-PARA
ESCREVA soma
```
Resultado: `5050`. Sem o `soma ← 0` do começo, o resultado vem errado, porque a variável começaria com lixo. **Sempre inicialize.**

## 4. Os dois bugs clássicos
> [!warning] 1. Laço infinito
> ```
> i ← 1
> ENQUANTO i ≤ 5
>     ESCREVA i
> FIM-ENQUANTO
> ```
> Ninguém altera `i`, então a condição nunca vira falsa e o programa **não termina**. Pergunta de segurança antes de rodar qualquer laço: **"o que faz esta condição ficar falsa?"**

> [!warning] 2. Uma volta a mais ou a menos (*off-by-one*)
> `PARA i DE 1 ATÉ 10` roda **10** vezes. `i ← 0` com `ENQUANTO i < 10` também roda 10. Mas `i ← 0` com `ENQUANTO i ≤ 10` roda **11**. Troque `<` por `≤` e a contagem muda. É o `<` contra `≤` da aula de condicionais voltando para te visitar.

## 5. Seu mundo (TI)
**Bloqueio de conta por tentativas:** o AD bloqueia a conta depois de N senhas erradas. Isso é um laço com contador:
```
tentativas ← 0
REPITA
    LEIA senha
    tentativas ← tentativas + 1
ATÉ senha_correta OU tentativas = 3
```
**Verificar uma lista de máquinas:** `PARA cada maquina EM lista` faz um teste de ping em cada uma. Automação de infraestrutura é, quase sempre, um laço com uma decisão dentro.

## 6. Termos
- **Laço / loop:** bloco que se repete.
- **Iteração:** cada volta do laço.
- **Contador:** variável que conta ocorrências.
- **Acumulador:** variável que soma (ou multiplica) valores ao longo das voltas.
- **Laço infinito:** laço cuja condição de parada nunca acontece.
- **Off-by-one:** erro de ficar uma volta a mais ou a menos.

## 7. Mão na massa (no caderno)
**Exercício 1 ⭐** Mostre os números de **1 a 10**, depois de **10 a 1**.

**Exercício 2 ⭐** Leia um número **N** e mostre a **soma de 1 até N**. Teste com N = 100 (esperado: 5050) e com N = 1.

**Exercício 3 ⭐⭐** Conte **quantos números pares existem de 1 a 50**. Dica: um número é par quando `n MOD 2 = 0`. Confira com a contagem na mão.

**Exercício 4 ⭐⭐** Leia **N** e mostre a **tabuada** de N (de 1 a 10).

**Exercício 5 ⭐⭐** Peça a senha **até 3 tentativas**. Se acertar, mostre "Acesso liberado" e pare. Se errar as 3, mostre "Conta bloqueada". Pense: qual laço é o melhor aqui e por quê?

**Exercício 6 ⭐⭐⭐** Ache o(s) bug(s) e corrija. A intenção é mostrar de 1 a 5:
```
(A) i ← 1                    (B) PARA i DE 0 ATÉ 5
    ENQUANTO i < 5               ESCREVA i
        ESCREVA i            FIM-PARA
    FIM-ENQUANTO
```

**Exercício 7 ⭐⭐⭐** Leia um número inteiro e mostre a **soma dos dígitos**. Teste: `1234` deve dar `10`. Dica: `n MOD 10` pega o último dígito e `n DIV 10` o remove.

**Exercício 8 ⭐⭐⭐** Leia números **até o usuário digitar 0** e mostre a **média** dos digitados (o 0 não entra na conta). Cuidado com o caso em que o primeiro número já é 0.

## 8. Perguntas de verificação
- **V1.** Qual a diferença entre `ENQUANTO` e `REPITA...ATÉ`? Em qual deles o bloco pode não rodar nenhuma vez?
- **V2.** Por que `soma` e `cont` precisam ser inicializados antes do laço?
- **V3.** Como você descobre se um laço pode ser infinito?

## 9. Registro
- [ ] Li a aula
- [ ] Fiz os exercícios no caderno
- [ ] Mandei para correção (`Corrigir: DEV1-E6`)
- Nota: __ · Tempo: __ min
