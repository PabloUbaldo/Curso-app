---
titulo: EST - Dev Logica - DEV1-E9 Decomposicao e fluxogramas
tipo: aula
curso: Dev
disciplina: DEV1
etapa: DEV1-E9
tempo_estimado_min: 60
status: pendente
tags: [estudo, dev, logica]
---

# DEV1-E9 · Decomposição de problemas e fluxogramas

> [!abstract] Ao final desta aula você consegue
> Quebrar um problema grande em partes pequenas e resolvíveis, e **desenhar** a lógica como fluxograma para enxergar os caminhos e achar furos antes de escrever qualquer linha.

## 1. Aquecimento (3 min)
> [!question] Por onde eu começo?
> Seu chefe pede: *"Faça um relatório que diga quais computadores estão com o disco quase cheio."* Você olha o pedido e trava. Qual é a **primeira pergunta** que você faz para destravar?

> [!success]- Resposta
> *"Isso se divide em quais partes menores?"* Por exemplo: (1) de onde vem a lista de computadores, (2) como saber o espaço de **um** computador, (3) como decidir se está "quase cheio", (4) como mostrar o resultado. Cada parte é pequena e você já sabe fazer.

## 2. A ideia: decomposição
Nenhum problema difícil é difícil por inteiro. **Decompor** é quebrá-lo em pedaços que você já sabe resolver. O método:

1. **Entenda:** com suas palavras, o que entra e o que deve sair? (E1 e E2)
2. **Quebre:** liste as partes. Cada parte vira uma **função** (E7).
3. **Resolva a parte mais simples primeiro.** Teste de mesa nela (E8).
4. **Junte** as partes no programa principal.
5. **Teste** com casos pequenos e com os valores de fronteira (E4).

**Exemplo: relatório de discos.**
```
PROBLEMA: dizer quais computadores estão com disco quase cheio

 1. obter_lista()            -> lista de computadores
 2. espaco_livre_pct(pc)     -> percentual livre de UM computador
 3. classificar_disco(p)     -> "CRÍTICO" / "ATENÇÃO" / "OK"
 4. mostrar_relatorio(...)   -> imprime só os CRÍTICOS e ATENÇÃO
```
O programa principal vira um laço curto:
```
PARA cada pc EM obter_lista()
    p ← espaco_livre_pct(pc)
    estado ← classificar_disco(p)
    SE estado ≠ "OK" ENTÃO
        ESCREVA pc, estado
    FIM-SE
FIM-PARA
```

## 3. Fluxograma: a lógica desenhada
Um **fluxograma** mostra os caminhos possíveis com poucos símbolos:

| Símbolo | Forma | Significa |
|---|---|---|
| Início / Fim | oval | onde começa e termina |
| Processo | retângulo | uma ação ou conta |
| Decisão | losango | pergunta de sim/não (as setas saem rotuladas) |
| Entrada / Saída | paralelogramo | `LEIA` / `ESCREVA` |

**Fluxograma do alerta de disco**, em texto:
```
       ( INÍCIO )
           |
       /LEIA p/
           |
    < p < 10 ? >--sim--> /CRÍTICO/--+
           |não                     |
    < p < 25 ? >--sim--> /ATENÇÃO/--+
           |não                     |
        /"OK"/                      |
           |                        |
        ( FIM ) <-------------------+
```
(aqui `p` é o percentual livre; encurtei o nome só para o desenho caber na tela.)
Siga as setas com o dedo, como num mapa. Se algum caminho **não chega ao Fim**, ou se uma decisão tem **uma só saída**, você achou um furo.

> [!tip] No Obsidian
> O Obsidian desenha fluxogramas a partir de texto, com blocos `mermaid`. Quando você estiver no Obsidian, pode pedir ao Claude o bloco pronto para colar. Aqui no app, o desenho em texto acima cumpre o mesmo papel. Para a prova e para a vida, o importante é **saber desenhar à mão**.

## 4. Quando usar cada ferramenta
- **Pseudocódigo:** para escrever a solução em detalhe.
- **Fluxograma:** para **pensar nos caminhos** e explicar a alguém sem código.
- **Decomposição:** para saber **por onde começar**.

As três se complementam: decompor, desenhar o caminho difícil, escrever o pseudocódigo.

## 5. Seu mundo (TI)
**Onboarding de um novo funcionário** é um fluxograma disfarçado: criar conta → conferir licença → criar e-mail → separar o equipamento → entregar. Em cada ponto existe uma decisão ("tem licença livre?") com dois caminhos. Quem mapeia isso antes consegue **automatizar** o processo depois. Esse é o início de um pipeline.

## 6. Termos
- **Decomposição:** dividir um problema grande em partes pequenas.
- **Fluxograma:** diagrama com símbolos que mostra os caminhos de um algoritmo.
- **Módulo:** cada parte da decomposição (vira função).
- **Caminho:** uma sequência possível de passos do início ao fim.

## 7. Mão na massa (no caderno)
**Exercício 1 ⭐** Decomponha: *"Descobrir quais usuários não trocam a senha há mais de 90 dias."* Liste **4 partes** e diga o que cada uma recebe e devolve.

**Exercício 2 ⭐** Desenhe o fluxograma do **sinal, positivo, negativo ou zero** (E4, exercício 1). Quantos caminhos existem?

**Exercício 3 ⭐⭐** Desenhe o fluxograma da **regra de VPN** `(ativo E mfa) OU (admin E rede_interna)`. Marque com uma cor os caminhos que **liberam** o acesso.

**Exercício 4 ⭐⭐** Desenhe o fluxograma de **3 tentativas de senha** (E6, exercício 5). Onde está o laço no desenho?

**Exercício 5 ⭐⭐⭐** **Fluxograma com furo.** Este desenho descreve "pedir o valor até que seja positivo": `LEIA n` → `<n > 0?>` → se **sim**, `ESCREVA "ok"` → Fim. Se **não**, vai para `ESCREVA "inválido"` → Fim. Qual é o furo? Redesenhe para que o programa **peça de novo** até receber um valor válido.

**Exercício 6 ⭐⭐⭐** **Projeto:** decomponha e desenhe *"Um script que, dada uma lista de impressoras com status (online/offline) e nível de toner (%), mostra as que precisam de atenção (offline OU toner abaixo de 15%)."* Entregue: (a) as funções, (b) o fluxograma da função principal, (c) o pseudocódigo.

## 8. Perguntas de verificação
- **V1.** Qual o primeiro passo ao encarar um problema que parece grande demais?
- **V2.** O que o losango de um fluxograma representa e quantas saídas ele tem?
- **V3.** Como o fluxograma ajuda a achar furos?

## 9. Registro
- [ ] Li a aula
- [ ] Fiz os exercícios no caderno
- [ ] Mandei para correção (`Corrigir: DEV1-E9`)
- Nota: __ · Tempo: __ min
