---
titulo: EST - Dev Logica - DEV1-E2 Entrada processamento e saida
tipo: aula
curso: Dev
disciplina: DEV1
etapa: DEV1-E2
tempo_estimado_min: 50
status: pendente
tags: [estudo, dev, logica]
---

# DEV1-E2 · Entrada, processamento e saída

> [!abstract] Ao final desta aula você consegue
> Dividir qualquer problema em **entrada → processamento → saída**, escrever um algoritmo curto em pseudocódigo e usar `DIV` e `MOD` para converter unidades.

## 1. Aquecimento (3 min)
> [!question] Caixa-preta
> Uma máquina recebe números e devolve outros: **3 → 9**, **4 → 16**, **5 → 25**.
> Qual é a regra? Quanto sai se eu entregar **10**? E se entregar **0**, **-2**, ou a palavra **"banana"**?

> [!success]- Resposta
> A regra é multiplicar o número por ele mesmo (elevar ao quadrado). 10 → 100, 0 → 0, -2 → 4. Já "banana" quebra a máquina, a menos que alguém tenha pensado nisso antes. Toda máquina espera um **tipo de entrada**.

## 2. A ideia
Todo algoritmo, script e programa tem três partes:
- **Entrada:** os dados que chegam.
- **Processamento:** o que se faz com eles.
- **Saída:** o resultado que sai.

> [!tip] No seu trabalho
> Um chamado é isso: o **sintoma** é a entrada, o **diagnóstico** é o processamento e a **solução** é a saída. Quem pensa assim desmonta qualquer problema em três perguntas: o que eu recebo? O que eu faço com isso? O que eu entrego?

## 3. Exemplo trabalhado: espaço livre do disco
```
LEIA total_gb
LEIA livre_gb
percentual ← livre_gb / total_gb * 100
ESCREVA "Espaço livre: ", percentual, "%"
```
Com `total_gb = 256` e `livre_gb = 32`: `32 / 256 * 100 = 12,5`. Saída: `Espaço livre: 12,5%`.

Repare nos três blocos: duas entradas, um cálculo, uma saída. `percentual` é uma **variável**: um nome que guarda um valor (aprofundamos na próxima aula).

## 4. DIV e MOD: dividir com resto
Ao dividir inteiros, dá para pedir só o **quociente** (`DIV`) ou só o **resto** (`MOD`).

`135 minutos`: `135 DIV 60 = 2` horas e `135 MOD 60 = 15` minutos. Resultado: **2 h 15 min**.

> [!info] Curiosidade que dá chamado
> Fabricantes de disco usam 1 GB = 1.000.000.000 bytes. O Windows divide por 1024 três vezes. Por isso um disco de "256 GB" aparece com cerca de **238 GB** no sistema. Não é defeito, é a conta.

## 5. Termos
- **Entrada / saída:** o que entra e o que sai de um algoritmo.
- **Processamento:** o cálculo ou a decisão feita no meio.
- **Variável:** nome que guarda um valor.
- **Operador:** símbolo que faz uma conta (`+`, `-`, `*`, `/`, `DIV`, `MOD`).

## 6. Mão na massa (no caderno)
**Exercício 1 ⭐** Para cada situação, diga a **entrada**, o **processamento** e a **saída**:
- (a) calcular o troco de uma compra;
- (b) mostrar quantas páginas ainda restam na cota de impressão de um usuário;
- (c) converter uma temperatura de Celsius para Fahrenheit.

**Exercício 2 ⭐** Escreva o algoritmo que lê **3 notas** e mostra a média.

**Exercício 3 ⭐⭐** Leia uma quantidade de **segundos** e mostre em horas, minutos e segundos. Teste de conferência: `7384 s` deve virar `2 h 3 min 4 s`.

**Exercício 4 ⭐⭐** Um usuário tem **cota de C páginas** e já imprimiu **P**. O valor da página é **V** reais. Mostre as páginas restantes e o custo do que ele já imprimiu.

**Exercício 5 ⭐⭐⭐** Um disco tem **total** em GB e três usos: sistema, aplicativos e downloads (todos em GB). Mostre o espaço **livre** em GB e o **percentual livre**. Teste: total 512, sistema 40, aplicativos 120,5, downloads 90,25.

## 7. Perguntas de verificação
- **V1.** Qual a diferença entre `/` e `DIV`? Dê um exemplo com 17 e 5.
- **V2.** Qual é a entrada, o processamento e a saída do algoritmo do disco?
- **V3.** Por que um disco de 256 GB aparece com menos no Windows?

## 8. Registro
- [ ] Li a aula
- [ ] Fiz os exercícios no caderno
- [ ] Mandei para correção (`Corrigir: DEV1-E2`)
- Nota: __ · Tempo: __ min
