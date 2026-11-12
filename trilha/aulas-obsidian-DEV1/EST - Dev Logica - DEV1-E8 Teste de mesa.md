---
titulo: EST - Dev Logica - DEV1-E8 Teste de mesa
tipo: aula
curso: Dev
disciplina: DEV1
etapa: DEV1-E8
tempo_estimado_min: 60
status: pendente
tags: [estudo, dev, logica]
---

# DEV1-E8 · Teste de mesa

> [!abstract] Ao final desta aula você consegue
> **Executar um algoritmo na cabeça**, linha por linha, com uma tabela que mostra o valor de cada variável a cada passo. É a ferramenta número 1 para achar bugs sem rodar nada.

## 1. Aquecimento (3 min)
> [!question] Sem calculadora
> Qual é o resultado deste algoritmo? Tente só de cabeça, depois confira.
> ```
> soma ← 0
> PARA i DE 1 ATÉ 4
>     soma ← soma + i * i
> FIM-PARA
> ESCREVA soma
> ```

> [!success]- Resposta
> `30`. Mas repare no que você fez: acompanhou `i` e `soma` a cada volta (1, 4, 9, 16 somados: 1, 5, 14, 30). Esse acompanhamento organizado tem nome: **teste de mesa**.

## 2. A ideia
O computador não adivinha: executa. Para **prever** o que um algoritmo faz, você precisa fazer o mesmo: ir linha por linha, anotando o que cada variável vale. Isso se chama **teste de mesa** (ou *trace*, em inglês).

Como fazer:
1. Desenhe uma tabela com **uma coluna por variável** (e uma para a saída).
2. Execute **uma linha por vez**. Quando uma variável muda, escreva o novo valor na linha seguinte.
3. Nunca pule. Nunca "adivinhe o resto".

**Exemplo:** o aquecimento.

| passo | i | soma | saída |
|---|---|---|---|
| início | - | 0 | |
| volta 1 | 1 | 1 | |
| volta 2 | 2 | 5 | |
| volta 3 | 3 | 14 | |
| volta 4 | 4 | 30 | |
| fim | | 30 | 30 |

## 3. Teste de mesa com decisão
```
x ← 4
y ← 1
ENQUANTO y < 5
    x ← x + y
    y ← y + 1
FIM-ENQUANTO
ESCREVA x, y
```

| volta | y < 5? | x | y |
|---|---|---|---|
| antes | - | 4 | 1 |
| 1 | sim | 5 | 2 |
| 2 | sim | 7 | 3 |
| 3 | sim | 10 | 4 |
| 4 | sim | 14 | 5 |
| teste final | **não** (5 < 5 é falso) | 14 | 5 |

Saída: `14 5`. Repare que a **última linha** mostra por que o laço parou. Esse é o ponto onde se descobre se ele para mesmo.

## 4. O teste de mesa como detetive
Quando um algoritmo dá o resultado errado, **o teste de mesa mostra a linha onde o valor desvia do que você esperava**. Exemplo: média de números lidos até o usuário digitar 0.

```
soma ← 0
cont ← 0
REPITA
    LEIA n
    soma ← soma + n
    cont ← cont + 1
ATÉ n = 0
ESCREVA soma / cont
```
Com entradas `4, 8, 0`:

| leitura | n | soma | cont |
|---|---|---|---|
| 1ª | 4 | 4 | 1 |
| 2ª | 8 | 12 | 2 |
| 3ª | 0 | 12 | **3** |

Saída: `12 / 3 = 4`. Esperado: `(4 + 8) / 2 = 6`. O bug apareceu: o **zero de parada foi contado** como se fosse um dado. Sem a tabela, você ficaria olhando o código sem ver o problema.

## 5. Seu mundo (TI)
Quando um script de limpeza apaga a pasta errada, ou um relatório soma o valor duplicado, o desenvolvedor experiente não sai mudando linhas ao acaso: ele **faz um teste de mesa com um caso pequeno** (3 itens) e acha onde o valor foge. É a mesma técnica, só que o depurador do editor faz a tabela para ele.

## 6. Termos
- **Teste de mesa / trace:** acompanhar as variáveis passo a passo, à mão.
- **Estado:** o conjunto dos valores de todas as variáveis num momento.
- **Depurar (debug):** achar e corrigir bugs.
- **Caso pequeno:** entrada curta o bastante para testar de mesa em 2 minutos.

## 7. Mão na massa (no caderno)
**Exercício 1 ⭐** Faça o teste de mesa e diga a saída:
```
a ← 2
b ← 3
PARA i DE 1 ATÉ 3
    a ← a + b
    b ← b + 1
FIM-PARA
ESCREVA a, b
```

**Exercício 2 ⭐⭐** Teste de mesa: soma dos múltiplos de 3 até 10.
```
soma ← 0
PARA i DE 1 ATÉ 10
    SE i MOD 3 = 0 ENTÃO
        soma ← soma + i
    FIM-SE
FIM-PARA
ESCREVA soma
```

**Exercício 3 ⭐⭐** Quantos passos o algoritmo abaixo executa para `n = 6`? Mostre a sequência de valores de `n`.
```
passos ← 0
ENQUANTO n ≠ 1
    SE n MOD 2 = 0 ENTÃO
        n ← n DIV 2
    SENÃO
        n ← 3 * n + 1
    FIM-SE
    passos ← passos + 1
FIM-ENQUANTO
ESCREVA passos
```

**Exercício 4 ⭐⭐** Quantos dígitos **pares** (contando o 0) tem o número `50206`?
```
cont ← 0
ENQUANTO n > 0
    d ← n MOD 10
    SE d MOD 2 = 0 ENTÃO
        cont ← cont + 1
    FIM-SE
    n ← n DIV 10
FIM-ENQUANTO
ESCREVA cont
```
Faça com `n = 50206`.

**Exercício 5 ⭐⭐⭐** O algoritmo da **média até 0** (seção 4) tem um bug. Corrija-o de **duas formas diferentes** e mostre, por teste de mesa, que com `4, 8, 0` agora dá `6`.

**Exercício 6 ⭐⭐⭐** Invente um algoritmo de **6 a 10 linhas** que tenha um laço e uma decisão. Faça o teste de mesa para uma entrada sua. Depois **esconda** o resultado, passe para outra pessoa (ou me envie) e veja se ela chega no mesmo valor.

## 8. Perguntas de verificação
- **V1.** Por que o teste de mesa mostra bugs que olhar o código não mostra?
- **V2.** O que a **última linha** da tabela de um laço `ENQUANTO` deve mostrar?
- **V3.** Por que usar um caso **pequeno** no teste de mesa?

## 9. Registro
- [ ] Li a aula
- [ ] Fiz os exercícios no caderno
- [ ] Mandei para correção (`Corrigir: DEV1-E8`)
- Nota: __ · Tempo: __ min
