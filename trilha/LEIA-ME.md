# Trilha: estudo e carreira (v1.1)

App de estudo que funciona no PC e no celular, **sem internet** depois da primeira abertura. Guarda o progresso, controla tempo ativo, trava provas por critério e gera o **log** que você cola no chat com a palavra **Retomar**.

## O que já existe de conteúdo (seja realista)
| Curso | Situação |
|---|---|
| **Dev: lógica e fundamentos** | **DEV1 completo**: 10 aulas, quizzes, prova (banco de 20 objetivas + 6 dissertativas). DEV2 a DEV9 aparecem como "em produção" |
| Carreira (infra), Inglês, Obsidian | Estrutura pronta (disciplinas, horas, pesos, etapas); aulas ainda "em produção" |

Etapas sem aula não podem ser concluídas. O app não finge: ele mostra 🚧.

## Como abrir
- **No PC, agora:** dê dois cliques em `index.html`. Funciona direto do arquivo.
- **Offline e instalável (PC e celular):** precisa estar numa página `https` (veja "Publicar" abaixo). Depois da primeira visita, abre sem internet e dá para "Adicionar à tela inicial".

## Publicar no GitHub Pages (grátis)
1. Crie um repositório no GitHub (o Pages grátis exige repositório **público**).
2. Envie **todos os arquivos desta pasta** (arraste e solte no site do GitHub).
3. Settings > Pages > "Deploy from a branch" > `main` / `(root)` > Save.
4. Em alguns minutos o endereço fica `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.
5. No celular, abra o endereço e use "Adicionar à tela inicial".

> **Cuidado:** o repositório é público. **Nunca ponha nada da empresa** (nomes de servidores, senhas, chamados, prints). Só conteúdo de estudo.

Quando mudar qualquer arquivo, aumente `VERSION` em `sw.js` (ex.: `trilha-1.1.1`) para os aparelhos pegarem a versão nova.

## Como o progresso funciona
- **Etapa concluída** = li + fiz os exercícios + acertei pelo menos 2 de 3 no quiz.
- **Prova da disciplina** libera com todas as etapas feitas **e** tempo ativo ≥ 20% das horas estimadas (DEV1: 6 h).
- **Nota da disciplina** = 50% média das etapas + 50% prova. **Aprovado: 7 ou mais.**
- Reprovou: nova tentativa só depois de **24 h**.
- Próxima disciplina só depois de aprovar a anterior.
- Avaliação geral do curso: o app mostra quando ela libera (todas as disciplinas aprovadas, média ponderada ≥ 7,5 e entregas feitas), mas **nesta versão ela é aplicada no chat** (escreva "Avaliação geral"). A tela própria fica para uma próxima versão.
- **Tempo ativo** só conta com a aba visível e atividade nos últimos 3 minutos.

## O ciclo com o Claude (sem integração, só texto)
1. Estude e, quando quiser, vá em **Log** > escreva o pedido > **Gerar log** > **Copiar**.
2. Cole no chat e escreva **Retomar**.
3. O Claude confere o log, corrige as **dissertativas** e os cadernos e devolve um bloco `{"trilha_update": 1, ...}`.
4. Em **Log** > "Importar atualização", cole o bloco > **Aplicar**. As notas entram no app.

O log tem um código de integridade: se alguém mexer nos dados à mão, o Claude percebe.

## PC e celular têm progresso separado
Cada aparelho guarda o seu. Para levar de um para o outro: **Config > Exportar backup** num, **Importar backup** no outro. Faça um backup de vez em quando.

## Modo teste
Em **Config** liga um modo que **desativa as travas** (para você ver as telas). O log avisa o Claude que estava ligado, então não vale para nota.

## Adicionar aulas e cursos novos
Pasta `_fonte/`:
- `aulas/`: um `.md` por etapa, com o nome terminando em `<ID-DA-ETAPA> titulo.md` (ex.: `... DEV2-E1 Instalar Python.md`).
- `dev1_avaliacoes.json`: quizzes por etapa e bancos de prova.
- Rode `python3 _fonte/build.py`: ele regenera `cursos/*.js`. As opções dos quizzes são embaralhadas de forma fixa.

Importar um curso de fora, sem rodar nada: **Config > Importar curso** (arquivo `.js` do build ou `.json` no mesmo formato).

## Limites honestos
- O log fica no seu aparelho: dá para editar. Isso só engana você mesmo. O que vale é o que o Claude vê na conversa.
- Tempo ativo é um freio, não uma prova (dá para deixar a tela aberta).
- Questões objetivas o app corrige sozinho. Dissertativas e práticas dependem do Claude.
- Sem contas e sem segurança, por decisão: é de uso pessoal.

## Arquivos
```
index.html  manifest.webmanifest  sw.js  icons/
css/app.css  js/{core,ui,md,sha256}.js  cursos/*.js
_fonte/{build.py, dev1_avaliacoes.json, aulas/*.md}
```
