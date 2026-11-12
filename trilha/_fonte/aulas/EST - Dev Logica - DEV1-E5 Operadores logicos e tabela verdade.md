---
titulo: EST - Dev Logica - DEV1-E5 Operadores logicos e tabela verdade
tipo: aula
curso: Dev
disciplina: DEV1
etapa: DEV1-E5
tempo_estimado_min: 60
status: pendente
tags: [estudo, dev, logica]
---

# DEV1-E5 · Operadores lógicos e tabela verdade

> [!abstract] Ao final desta aula você consegue
> Combinar condições com **E**, **OU** e **NÃO**, montar uma tabela verdade, simplificar condições com a lei de De Morgan e escrever regras de acesso sem furos.

## 1. Aquecimento (3 min)
> [!question] A senha está certa, mas...
> Um usuário digita a senha correta e, mesmo assim, aparece: *"Restrições de conta estão impedindo a entrada deste usuário"*. A senha certa basta para entrar? Liste **3 coisas** que o sistema pode conferir além da senha.

> [!success]- Resposta
> Não basta. O sistema confere várias condições ao mesmo tempo, por exemplo: conta **ativa**, **horário** permitido, **estação** de trabalho permitida, conta não **bloqueada**, senha não **expirada**. Para entrar, **todas** precisam ser verdadeiras: isso é o operador `E`.

## 2. A ideia
Com `E`, `OU` e `NÃO` você junta condições simples em regras completas.

| Operador | Resultado é verdadeiro quando... |
|---|---|
| `A E B` | **as duas** são verdadeiras |
| `A OU B` | **pelo menos uma** é verdadeira |
| `NÃO A` | A é falsa (inverte) |

**Tabela verdade** mostra todas as combinações:

| A | B | A E B | A OU B |
|---|---|---|---|
| V | V | V | V |
| V | F | F | V |
| F | V | F | V |
| F | F | F | F |

> [!tip] Pense assim
> **E** é a catraca de um prédio com crachá **e** biometria: precisa dos dois. **OU** é a porta de saída: serve a escada **ou** o elevador.

## 3. Precedência e parênteses
Ordem de avaliação: `NÃO` primeiro, depois `E`, depois `OU`. Exemplo: `A OU B E C` significa `A OU (B E C)`. **Sempre use parênteses** para deixar claro. Quem lê depois (inclusive você) agradece.

## 4. Lei de De Morgan (para inverter uma regra)
- `NÃO (A E B)` equivale a `NÃO A OU NÃO B`
- `NÃO (A OU B)` equivale a `NÃO A E NÃO B`

Em português: "**não** (ativo **e** válido)" é o mesmo que "inativo **ou** inválido". Serve para escrever a regra de **negar** acesso a partir da regra de **permitir**.

> [!info] Curto-circuito
> Em `A E B`, se A já é falso, o resultado é falso e o computador **nem avalia B**. Em `A OU B`, se A é verdadeiro, ele nem olha B. Isso economiza tempo e evita erros (por exemplo, não dividir por zero).

## 5. Termos
- **Booleano:** valor que é só verdadeiro ou falso (o tipo lógico).
- **Tabela verdade:** lista de todas as combinações e do resultado.
- **Precedência:** a ordem em que os operadores são avaliados.

## 6. Mão na massa (no caderno)
**Exercício 1 ⭐** Monte a tabela verdade de:
- (a) `A E NÃO B`
- (b) `NÃO (A OU B)`
- (c) `(A OU B) E NÃO (A E B)` (dica: é o "ou exclusivo". Em palavras, o que ele significa?)

**Exercício 2 ⭐⭐** Regra de acesso à VPN: **(usuário ativo E MFA aprovado) OU (é admin E está na rede interna)**. Diga o resultado (permite ou nega) em cada caso:

| # | ativo | mfa | admin | rede_interna |
|---|---|---|---|---|
| 1 | V | V | F | F |
| 2 | V | F | F | F |
| 3 | F | V | F | F |
| 4 | F | F | V | V |
| 5 | V | F | V | F |
| 6 | V | F | V | V |

Agora a pergunta que importa: **esta regra tem um furo de segurança?** Qual e como corrigir?

**Exercício 3 ⭐⭐** Reescreva sem o `NÃO` na frente do parêntese: `NÃO (a > 5 E b < 3)`.

**Exercício 4 ⭐⭐** Refaça o **ano bissexto** da aula anterior em **uma única condição**, com `E` e `OU`.

**Exercício 5 ⭐⭐⭐** **Login com restrições** (como no desafio): um usuário tem `conta_ativa`, `bloqueada`, `senha_expirada`, `horario_ok` e `estacao_ok`.
- (a) Escreva a condição `pode_logar`.
- (b) Escreva um algoritmo que mostre o **motivo** da recusa (a primeira condição que falha).
- (c) Teste com 5 cenários diferentes que você inventar.

## 7. Perguntas de verificação
- **V1.** Qual a diferença entre `E` e `OU` ao liberar um acesso?
- **V2.** Aplique De Morgan: como nega "ativo E horário_ok"?
- **V3.** Por que usar parênteses mesmo quando a precedência já resolve?

## 8. Registro
- [ ] Li a aula
- [ ] Fiz os exercícios no caderno
- [ ] Mandei para correção (`Corrigir: DEV1-E5`)
- Nota: __ · Tempo: __ min
