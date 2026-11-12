---
titulo: EST - Dev Logica - DEV1-E3 Variaveis e tipos de dados
tipo: aula
curso: Dev
disciplina: DEV1
etapa: DEV1-E3
tempo_estimado_min: 60
status: pendente
tags: [estudo, dev, logica]
---

# DEV1-E3 · Variáveis e tipos de dados

> [!abstract] Ao final desta aula você consegue
> Explicar o que é uma variável, escolher o tipo certo para cada dado, dar nomes claros e **acompanhar o valor de uma variável ao longo do tempo**.

## 1. Aquecimento (3 min)
> [!question] O que aparece na tela?
> ```
> a ← 5
> b ← 7
> a ← b
> b ← a
> ESCREVA a, b
> ```
> A intenção era **trocar** os valores de `a` e `b`. Funcionou?

> [!success]- Resposta
> Não. Aparece `7 7`. Na terceira linha, `a` passa a valer 7 e o 5 se perde para sempre. Na quarta, `b` recebe o novo `a` (7). Quando você guarda um valor novo, o antigo **é sobrescrito**. É por isso que precisamos de uma terceira caixa.

## 2. A ideia
**Variável** é uma caixa com etiqueta. A etiqueta é o **nome** e o conteúdo é o **valor**. Você pode trocar o conteúdo quando quiser, mas cada caixa guarda **um valor por vez**.

```
contador ← 0           // cria a caixa e guarda 0
contador ← contador + 1 // lê o valor, soma 1, guarda de volta (agora é 1)
```
O símbolo `←` significa "**guarde** o que está à direita na caixa da esquerda". Não é igualdade de matemática.

## 3. Tipos de dados
Cada valor tem um **tipo**, que decide o que se pode fazer com ele.

| Tipo | O que guarda | Exemplos |
|---|---|---|
| **Inteiro** | números sem vírgula | `42`, `0`, `-7`, `443` |
| **Real** | números com vírgula | `3,14`, `12,5` |
| **Texto** | letras, palavras, qualquer coisa entre aspas | `"servidor-01"`, `"42"` |
| **Lógico** | só verdadeiro ou falso | `VERDADEIRO`, `FALSO` |

> [!warning] A pegadinha clássica
> `"10"` (texto) e `10` (número) são coisas diferentes. Somar dois números dá `10 + 5 = 15`. Juntar dois textos dá `"10" + "5" = "105"`. Muitos bugs nascem de um número que virou texto sem ninguém perceber.

> [!tip] Seu mundo (TI)
> Nome do computador é **texto**. A porta `443` é **inteiro**. O uso de CPU `73,5` é **real**. "A máquina está ligada?" é **lógico**. E o endereço IP `192.168.0.1`? É **texto**, porque não existe número com dois pontos e não dá para somar IPs.

## 4. Nomes que ajudam
Compare `x`, `t` e `a1` com `total_gb`, `livre_gb` e `tentativas`. O segundo grupo se explica sozinho. Regras práticas:
- sem espaços e sem acentos (`tamanho_disco_gb`);
- o nome diz **o que é**, e se tiver unidade, ela vai junto (`_gb`, `_seg`);
- evite `x`, `y`, `temp`, `dado`, exceto em contadores como `i`.

## 5. Trocar dois valores
Resolvendo o desafio do começo com uma **terceira caixa**:
```
aux ← a
a ← b
b ← aux
```
Imagine duas xícaras trocando de conteúdo: precisa de uma terceira para segurar enquanto isso.

## 6. Termos
- **Variável:** nome que guarda um valor.
- **Atribuição:** guardar um valor numa variável (`←`).
- **Tipo:** a natureza do dado (inteiro, real, texto, lógico).
- **Constante:** valor que não muda (ex.: `VALOR_PAGINA ← 0,10`, por convenção em maiúsculas).

## 7. Mão na massa (no caderno)
**Exercício 1 ⭐** Diga o tipo de cada valor e **por quê**: `42` · `3,14` · `"42"` · `VERDADEIRO` · `"servidor-01"` · `192.168.0.1` · `0` · `10,5` · um número de telefone com DDD · um CPF.

**Exercício 2 ⭐** O que é mostrado em cada trecho?
```
(A) x ← 3          (B) a ← "10"        (C) n ← 10
    y ← x * 2          b ← "5"             n ← n - 3
    x ← y + 1          ESCREVA a + b       n ← n * n
    ESCREVA x, y                           ESCREVA n
```
Em (B), o que mudaria se `a` e `b` fossem números?

**Exercício 3 ⭐⭐** Troque os valores de `a` e `b` **com** variável auxiliar. Depois, **desafio extra:** faça a troca **sem** auxiliar, usando só soma e subtração.

**Exercício 4 ⭐⭐** Renomeie as variáveis para nomes claros e diga o que o trecho calcula:
```
x1 ← 3
x2 ← 29,90
t ← x1 * x2
```

**Exercício 5 ⭐⭐⭐** Com `a = 1`, `b = 2`, `c = 3`, faça com que fiquem `a = 2`, `b = 3`, `c = 1` usando **uma** variável auxiliar.

## 8. Perguntas de verificação
- **V1.** O que acontece com o valor antigo de uma variável quando você guarda um novo?
- **V2.** Por que `"10" + "5"` não dá 15?
- **V3.** Qual o tipo de um endereço IP e por quê?

## 9. Registro
- [ ] Li a aula
- [ ] Fiz os exercícios no caderno
- [ ] Mandei para correção (`Corrigir: DEV1-E3`)
- Nota: __ · Tempo: __ min
