---
titulo: EST - Dev Logica - DEV1-E7 Funcoes
tipo: aula
curso: Dev
disciplina: DEV1
etapa: DEV1-E7
tempo_estimado_min: 70
status: pendente
tags: [estudo, dev, logica]
---

# DEV1-E7 · Funções: dividir um problema grande

> [!abstract] Ao final desta aula você consegue
> Criar **funções** com parâmetros e retorno, entender a diferença entre **mostrar** e **devolver** um valor, e montar programas maiores juntando funções pequenas.

## 1. Aquecimento (3 min)
> [!question] O cálculo repetido
> Você tem 3 scripts de monitoramento. Em cada um, a conta do percentual livre do disco foi escrita à mão: `livre / total * 100`. Um dia alguém descobre que a conta precisa **arredondar**. Quantos lugares você precisa corrigir? E se a conta existisse **uma vez só**?

> [!success]- Resposta
> Três lugares, e é fácil esquecer um. Se a conta existe uma vez só, corrige uma vez e **todos** os scripts passam a usar a versão certa. Esse "escrever uma vez, usar em vários lugares" é o motivo de existirem as funções.

## 2. A ideia
**Função** é um bloco com **nome** que recebe dados, faz uma tarefa e (normalmente) **devolve** um resultado. Pense numa máquina de café: você aperta "cappuccino" (o nome), ela usa o que tem dentro e te entrega a xícara.

```
FUNÇÃO percentual_livre(total, livre)
    RETORNE livre / total * 100
FIM-FUNÇÃO
```
- `percentual_livre` é o **nome**.
- `total` e `livre` são os **parâmetros**: os dados que a função precisa receber.
- `RETORNE` **devolve** o resultado para quem chamou.

**Chamando** a função:
```
p ← percentual_livre(256, 32)
ESCREVA p
```
Saída: `12,5`. Os valores `256` e `32` são os **argumentos**: o que você realmente entregou na chamada.

## 3. Devolver não é o mesmo que mostrar
> [!warning] A confusão mais comum
> `ESCREVA` **mostra** na tela e acabou. `RETORNE` **devolve** o valor para o programa continuar usando.
> Uma função que só faz `ESCREVA` não pode ser usada numa conta. `x ← percentual_livre(...) + 5` só funciona se ela **retornar**.

Regra prática: funções que **calculam** devolvem (`RETORNE`). A parte do programa que conversa com o usuário é quem usa `LEIA` e `ESCREVA`.

## 4. Funções que usam funções
O poder aparece ao **compor**:
```
FUNÇÃO classificar_disco(p)
    SE p < 10 ENTÃO
        RETORNE "CRÍTICO"
    SENÃO SE p < 25 ENTÃO
        RETORNE "ATENÇÃO"
    SENÃO
        RETORNE "OK"
    FIM-SE
FIM-FUNÇÃO

// programa principal
LEIA total, livre
p ← percentual_livre(total, livre)
ESCREVA classificar_disco(p)
```
O programa principal ficou com **4 linhas legíveis**. Quem lê entende o que acontece sem precisar ver as contas.

## 5. Variáveis dentro da função
As variáveis criadas **dentro** de uma função só existem ali (**escopo local**). Quando a função termina, elas somem. Isso é bom: duas funções podem usar o nome `soma` sem uma estragar a outra.

## 6. Seu mundo (TI)
Um script de inventário tem `listar_maquinas()`, `testar_ping(ip)`, `registrar_resultado(maquina, ok)`. Cada uma faz **uma coisa**. Quando o ping muda de método, você mexe só em `testar_ping`. É assim que scripts de DevOps crescem sem virar bagunça.

## 7. Termos
- **Função:** bloco com nome que faz uma tarefa e pode devolver um resultado.
- **Parâmetro:** variável que a função recebe (na definição).
- **Argumento:** o valor entregue na chamada.
- **Retorno:** o valor que a função devolve.
- **Chamar:** pedir para a função executar.
- **Escopo:** onde uma variável existe e pode ser usada.

## 8. Mão na massa (no caderno)
**Exercício 1 ⭐** Escreva `dobro(n)` que retorna o dobro de `n`. Depois use-a para mostrar o dobro de 7 e o **dobro do dobro** de 7.

**Exercício 2 ⭐** Escreva `eh_par(n)` que retorna `VERDADEIRO` se `n` é par. Use-a para mostrar quais dos números `10, 7, 0, 13` são pares.

**Exercício 3 ⭐⭐** Escreva `celsius_para_f(c)` (`F = C * 9 / 5 + 32`). Teste: `36,5 °C` deve dar `97,7 °F`.

**Exercício 4 ⭐⭐** Escreva `maior(a, b, c)` que retorna o maior dos três **sem** usar função pronta.

**Exercício 5 ⭐⭐** Reescreva a **tabuada** da aula anterior como `tabuada(n)` e chame-a para 7 e para 9.

**Exercício 6 ⭐⭐⭐** Escreva `soma_digitos(n)` (a soma dos dígitos de um inteiro). Depois escreva `eh_multiplo_de_3(n)` **usando** `soma_digitos` (regra: um número é múltiplo de 3 se a soma dos dígitos for). Teste com `123` (sim) e `124` (não).

**Exercício 7 ⭐⭐⭐** O **alerta de disco completo** com funções: `percentual_livre`, `classificar_disco` e um programa principal que lê 3 discos (total e livre de cada) e mostra a classificação de cada um. Todo o cálculo fica em funções; o programa principal só chama.

## 9. Perguntas de verificação
- **V1.** Qual a diferença entre `ESCREVA` e `RETORNE`?
- **V2.** O que é parâmetro e o que é argumento? Dê um exemplo.
- **V3.** Por que é bom uma função fazer **uma coisa só**?

## 10. Registro
- [ ] Li a aula
- [ ] Fiz os exercícios no caderno
- [ ] Mandei para correção (`Corrigir: DEV1-E7`)
- Nota: __ · Tempo: __ min
