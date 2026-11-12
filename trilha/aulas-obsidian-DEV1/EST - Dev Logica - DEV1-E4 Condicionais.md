---
titulo: EST - Dev Logica - DEV1-E4 Condicionais
tipo: aula
curso: Dev
disciplina: DEV1
etapa: DEV1-E4
tempo_estimado_min: 60
status: pendente
tags: [estudo, dev, logica]
---

# DEV1-E4 · Condicionais (se / senão)

> [!abstract] Ao final desta aula você consegue
> Fazer o algoritmo **tomar decisões**, ordenar as condições do jeito certo e testar os **valores de fronteira**, onde os bugs moram.

## 1. Aquecimento (3 min)
> [!question] Alerta de disco
> Uma regra de monitoramento diz: *espaço livre abaixo de 10% é **crítico**; abaixo de 25% é **atenção**; o resto está **ok**.*
> Um disco está com **exatamente 10%** livres. É crítico ou atenção? E com **exatamente 25%**?

> [!success]- Resposta
> Pela regra escrita (`< 10` e `< 25`), 10% é **atenção** (não é menor que 10) e 25% é **ok**. Só que alguém que lê "abaixo de 10%" pode achar o contrário. Moral: **os valores de fronteira precisam ser decididos e escritos**, senão cada pessoa entende de um jeito.

## 2. A ideia
Até aqui o algoritmo seguia sempre o mesmo caminho. Com `SE`, ele **escolhe** um caminho conforme uma condição.

```
SE percentual < 10 ENTÃO
    ESCREVA "CRÍTICO"
SENÃO SE percentual < 25 ENTÃO
    ESCREVA "ATENÇÃO"
SENÃO
    ESCREVA "OK"
FIM-SE
```
Funciona assim: o computador testa de cima para baixo e executa o **primeiro** bloco cuja condição for verdadeira. Os demais são ignorados.

| Comparação | Significa |
|---|---|
| `=` | é igual a |
| `≠` | é diferente de |
| `<` `>` | menor que, maior que |
| `≤` `≥` | menor ou igual, maior ou igual |

> [!warning] Dois erros clássicos
> **1. A ordem importa.** Se você testar `percentual < 25` antes de `percentual < 10`, um disco com 5% cai no "atenção" e o "crítico" **nunca** aparece.
> **2. `=` não é `←`.** `SE x = 5` pergunta se x vale 5. `x ← 5` guarda o 5 em x.

## 3. Decisões dentro de decisões
Dá para colocar um `SE` dentro de outro (aninhar). Exemplo de **prioridade de chamado**:

```
SE impacto = "alto" ENTÃO
    SE urgencia = "alta" ENTÃO
        prioridade ← "P1"
    SENÃO
        prioridade ← "P2"
    FIM-SE
SENÃO
    prioridade ← "P3"
FIM-SE
```
Para cada caminho, pergunte: "qual valor de entrada faz o algoritmo passar por aqui?". Isso é **testar os caminhos**.

## 4. Teste de fronteira
Para cada condição, teste **um valor abaixo, o valor exato e um acima**. No alerta de disco: 9, 10 e 11; 24, 25 e 26. É assim que você pega o erro de `<` versus `≤`.

## 5. Termos
- **Condição:** pergunta com resposta verdadeiro ou falso.
- **Ramo:** cada caminho possível (o `ENTÃO` e o `SENÃO`).
- **Aninhar:** colocar um `SE` dentro de outro.
- **Valor de fronteira:** o valor onde a decisão muda.

## 6. Mão na massa (no caderno)
**Exercício 1 ⭐** Leia um número e diga se é **positivo**, **negativo** ou **zero**.

**Exercício 2 ⭐** Escreva o alerta de disco completo e liste **os 6 valores de fronteira** que você testaria.

**Exercício 3 ⭐⭐** Este algoritmo tem um bug. Qual e o que aparece para `percentual = 5`? Como corrigir?
```
SE percentual < 25 ENTÃO
    ESCREVA "Atenção"
SENÃO SE percentual < 10 ENTÃO
    ESCREVA "Crítico"
SENÃO
    ESCREVA "OK"
FIM-SE
```

**Exercício 4 ⭐⭐** Desconto em compra: de **100 ou mais**, 10%; de **50 a 99,99**, 5%; abaixo disso, nada. Leia o valor e mostre o total a pagar. Teste com 120, 80 e 40.

**Exercício 5 ⭐⭐** Escreva a **prioridade do chamado** da aula, agora com 3 níveis de impacto (`alto`, `medio`, `baixo`) e 2 de urgência (`alta`, `baixa`). Monte a tabela de resultado **antes** de escrever o código.

**Exercício 6 ⭐⭐⭐** **Ano bissexto:** divisível por 4 é bissexto, **exceto** os divisíveis por 100, **a não ser** os divisíveis por 400. Use `MOD` e `SE` aninhados. Teste: 2000 (sim), 1900 (não), 2024 (sim), 2023 (não).

## 7. Perguntas de verificação
- **V1.** Se a condição de cima é verdadeira, o computador testa as de baixo? Por quê?
- **V2.** Por que testamos 9, 10 e 11 e não só 10?
- **V3.** Explique a diferença entre `SE x = 5` e `x ← 5`.

## 8. Registro
- [ ] Li a aula
- [ ] Fiz os exercícios no caderno
- [ ] Mandei para correção (`Corrigir: DEV1-E4`)
- Nota: __ · Tempo: __ min
