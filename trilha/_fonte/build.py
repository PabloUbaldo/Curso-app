#!/usr/bin/env python3
"""Gera os arquivos de curso (cursos/*.js) do app Trilha.

Uso:  python3 _fonte/build.py
- Lê as aulas em _fonte/aulas/*.md (frontmatter + Markdown do Obsidian)
- Lê quizzes e prova em _fonte/dev1_avaliacoes.json
- Escreve cursos/carreira.js, dev.js, ingles.js, obsidian.js

Para ADICIONAR uma aula: ponha o .md em _fonte/aulas/, com o nome terminando em
"<ID-DA-ETAPA> <titulo>.md" (ex.: "... DEV1-E6 Lacos de repeticao.md"), acrescente o quiz
em dev1_avaliacoes.json e rode de novo. Etapas sem .md aparecem como "em producao".
"""
import json, re, pathlib, random

RAIZ = pathlib.Path(__file__).resolve().parent.parent
AULAS = RAIZ / "_fonte" / "aulas"
AVAL = json.loads((RAIZ / "_fonte" / "dev1_avaliacoes.json").read_text(encoding="utf-8"))
SAIDA = RAIZ / "cursos"
SAIDA.mkdir(exist_ok=True)


def ler_aula(etapa_id):
    """Devolve (md_limpo, minutos) para a etapa, ou (None, None) se nao existir."""
    for f in sorted(AULAS.glob("*.md")):
        if re.search(r"\b" + re.escape(etapa_id) + r"\b", f.name):
            txt = f.read_text(encoding="utf-8")
            minutos = 45
            m = re.match(r"^---\n(.*?)\n---\n", txt, re.S)
            if m:
                mm = re.search(r"tempo_estimado_min:\s*(\d+)", m.group(1))
                if mm:
                    minutos = int(mm.group(1))
                txt = txt[m.end():]
            # tira o titulo H1 (o app mostra o titulo no cabecalho)
            txt = re.sub(r"^\s*# .*\n", "", txt, count=1)
            # corta a secao "Registro" (o app tem o seu proprio registro)
            txt = re.split(r"\n## \d+\. Registro", txt)[0]
            return txt.strip() + "\n", minutos
    return None, None


def embaralhar_quiz(questoes, semente):
    """Embaralha as opcoes de cada pergunta de forma FIXA (mesma semente = mesma ordem),
    para a resposta certa nao ficar sempre na mesma posicao. Atualiza o indice 'ok'."""
    rng = random.Random(semente)
    saida = []
    for q in questoes:
        pares = list(enumerate(q["opcoes"]))
        rng.shuffle(pares)
        novo = dict(q)
        novo["opcoes"] = [t for _, t in pares]
        novo["ok"] = [i for i, (orig, _) in enumerate(pares) if orig == q["ok"]][0]
        saida.append(novo)
    return saida


def etapa(cid, eid, titulo, min_padrao=45):
    e = {"id": eid, "titulo": titulo, "min": min_padrao}
    md, minutos = ler_aula(eid)
    if md:
        e["md"] = md
        e["min"] = minutos
        q = AVAL["quiz"].get(eid)
        if q:
            e["quiz"] = embaralhar_quiz(q, "quiz-" + eid)
    return e


def disc(cid, did, nome, horas, peso, etapas, **extra):
    d = {"id": did, "nome": nome, "horas": horas, "peso": peso, "minPct": 20,
         "etapas": [etapa(cid, eid, t) for eid, t in etapas]}
    d.update(extra)
    return d


def escrever(curso):
    arq = SAIDA / (curso["id"] + ".js")
    corpo = json.dumps(curso, ensure_ascii=False, indent=1)
    arq.write_text(
        "/* Gerado por _fonte/build.py. Nao edite a mao: edite a fonte e rode o build. */\n"
        "window.TRILHA_CURSOS = window.TRILHA_CURSOS || [];\n"
        "window.TRILHA_CURSOS.push(" + corpo + ");\n",
        encoding="utf-8")
    n_md = sum(1 for d in curso["disciplinas"] for e in d["etapas"] if e.get("md"))
    n_tot = sum(len(d["etapas"]) for d in curso["disciplinas"])
    print(f"{arq.name}: {n_md}/{n_tot} etapas com aula, {arq.stat().st_size/1024:.0f} KB")


# ---------------------------------------------------------------- DEV
dev_prova = AVAL["prova"]["DEV1"]
dev = {
    "id": "dev", "nome": "Dev: lógica e fundamentos", "icone": "💻", "cor": "#2dd4bf",
    "versao": "1.0",
    "descricao": "Do zero à lógica de programação, até virar Dev Jr completo. Lógica primeiro (papel e pseudocódigo), Python depois, JavaScript só na Web.",
    "disciplinas": [
        disc("dev", "DEV1", "Lógica e algoritmos", 30, 25, [
            ("DEV1-E1", "O que é um algoritmo"),
            ("DEV1-E2", "Entrada, processamento e saída"),
            ("DEV1-E3", "Variáveis e tipos de dados"),
            ("DEV1-E4", "Condicionais (se / senão)"),
            ("DEV1-E5", "Operadores lógicos e tabela verdade"),
            ("DEV1-E6", "Laços de repetição"),
            ("DEV1-E7", "Funções: dividir um problema grande"),
            ("DEV1-E8", "Teste de mesa"),
            ("DEV1-E9", "Decomposição de problemas e fluxogramas"),
            ("DEV1-E10", "Resolver 20 problemas em pseudocódigo"),
        ], prova={"nObj": dev_prova["nObj"], "nDiss": dev_prova["nDiss"],
                  "pool": dev_prova["pool"], "dissertativas": dev_prova["dissertativas"]},
           entrega="Caderno com 20 problemas resolvidos.",
           dominio="Você resolve um problema novo sem exemplo e explica passo a passo por que funciona."),
        disc("dev", "DEV2", "Python fundamentos", 40, 20, [
            ("DEV2-E1", "Instalar, rodar e escrever o primeiro programa"),
            ("DEV2-E2", "Variáveis, entrada e saída"),
            ("DEV2-E3", "Condicionais"),
            ("DEV2-E4", "Laços"),
            ("DEV2-E5", "Funções"),
            ("DEV2-E6", "Listas e dicionários"),
            ("DEV2-E7", "Arquivos e CSV"),
            ("DEV2-E8", "Erros e exceções"),
            ("DEV2-E9", "Módulos e bibliotecas"),
            ("DEV2-E10", "15 exercícios do seu dia a dia"),
        ], entrega="Repositório com os 15 exercícios."),
        disc("dev", "DEV3", "Estruturas de dados", 30, 15, [
            ("DEV3-E1", "Listas, tuplas, conjuntos e dicionários"),
            ("DEV3-E2", "Pilhas e filas"),
            ("DEV3-E3", "Busca"),
            ("DEV3-E4", "Ordenação"),
            ("DEV3-E5", "Recursão (noção)"),
            ("DEV3-E6", "Complexidade (Big O, noção)"),
            ("DEV3-E7", "Escolher a estrutura certa"),
        ]),
        disc("dev", "DEV4", "Depuração, testes e boas práticas", 20, 10, [
            ("DEV4-E1", "Ler mensagens de erro e stack trace"),
            ("DEV4-E2", "Depurar com prints e com o depurador"),
            ("DEV4-E3", "Testes unitários"),
            ("DEV4-E4", "Nomes claros, funções pequenas, comentários úteis"),
            ("DEV4-E5", "Revisão de código"),
        ]),
        disc("dev", "DEV5", "Git e GitHub", 12, 5, [
            ("DEV5-E1", "O que é controle de versão"),
            ("DEV5-E2", "init, add, commit, push, pull"),
            ("DEV5-E3", "Branches e merge"),
            ("DEV5-E4", "GitHub e pull request"),
            ("DEV5-E5", ".gitignore e como nunca subir segredos"),
        ]),
        disc("dev", "DEV6", "Web e APIs", 40, 10, [
            ("DEV6-E1", "Como a web funciona: cliente, servidor e HTTP"),
            ("DEV6-E2", "JSON"),
            ("DEV6-E3", "APIs REST"),
            ("DEV6-E4", "HTML e CSS básico"),
            ("DEV6-E5", "JavaScript básico"),
            ("DEV6-E6", "DOM e eventos"),
            ("DEV6-E7", "Armazenamento local no navegador"),
            ("DEV6-E8", "PWA: app instalável que funciona offline"),
        ]),
        disc("dev", "DEV7", "Banco de dados e SQL", 25, 10, [
            ("DEV7-E1", "Tabelas, linhas, chaves primárias e estrangeiras"),
            ("DEV7-E2", "SELECT, WHERE, ORDER BY"),
            ("DEV7-E3", "INSERT, UPDATE, DELETE"),
            ("DEV7-E4", "JOIN"),
            ("DEV7-E5", "GROUP BY e agregações"),
            ("DEV7-E6", "Modelagem simples"),
            ("DEV7-E7", "SQLite com Python"),
        ]),
        disc("dev", "DEV8", "Orientação a objetos e design", 25, 5, [
            ("DEV8-E1", "Classes e objetos"),
            ("DEV8-E2", "Atributos e métodos"),
            ("DEV8-E3", "Encapsulamento"),
            ("DEV8-E4", "Herança e composição"),
            ("DEV8-E5", "Princípios simples de design (noção de SOLID)"),
            ("DEV8-E6", "Organizar um projeto em módulos"),
        ]),
        {"id": "DEV9", "nome": "Projeto integrador", "horas": 40, "peso": 0, "tipo": "entrega", "etapas": [],
         "entrega": "Construir a sua versão do app de estudos, com revisão de código. Entrega obrigatória para a aprovação final do curso."},
    ],
    "checklist": [
        "Resolve um problema novo com lógica, sem copiar solução",
        "Escreve funções pequenas e claras em Python",
        "Lê uma mensagem de erro e acha a causa",
        "Escreve pelo menos 5 testes que passam",
        "Usa Git e GitHub sem expor segredos",
        "Consome uma API e trata o JSON",
        "Escreve consultas SQL com JOIN e agregação",
        "Explica o que cada linha do próprio código faz",
        "Concluiu o projeto integrador",
    ],
    "nota": "O nível \"Pleno\" depende de tempo de experiência e de resultados no trabalho. O app mede estudo, não substitui experiência.",
}

# ---------------------------------------------------------------- CARREIRA
carreira = {
    "id": "carreira", "nome": "Carreira: Infraestrutura (Jr → Pleno)", "icone": "🛠️", "cor": "#fb923c",
    "versao": "1.0",
    "descricao": "Núcleo (Fase 1) e complemento (Fase 2) para um Jr completo e independente. O título de Pleno depende da empresa e do tempo de experiência.",
    "disciplinas": [
        disc("carreira", "C1", "Redes", 30, 20, [
            ("C1-E1", "O que é uma rede: cliente/servidor, LAN/WAN, switch, roteador, AP, firewall"),
            ("C1-E2", "Modelos OSI e TCP/IP"),
            ("C1-E3", "Endereço IP, máscara, gateway, IP público x privado, /24"),
            ("C1-E4", "Sub-redes"),
            ("C1-E5", "DNS e DHCP"),
            ("C1-E6", "Portas, protocolos, TCP e UDP, NAT"),
            ("C1-E7", "VLAN, switch gerenciável, roteamento básico"),
            ("C1-E8", "Diagnóstico: ping, tracert, nslookup, ipconfig /all, netstat, Test-NetConnection"),
            ("C1-E9", "Firewall e VPN (noções)"),
        ], entrega="Nota \"Roteiro de diagnóstico de rede\".",
           dominio="Você resolve 3 casos reais de rede com o roteiro e explica a causa."),
        disc("carreira", "C2", "Windows Server e Active Directory", 45, 20, [
            ("C2-E1", "Laboratório: VM com Windows Server, AD DS, DNS e DHCP"),
            ("C2-E2", "OUs, usuários, grupos e delegação"),
            ("C2-E3", "GPO: criar, vincular, gpupdate e gpresult"),
            ("C2-E4", "DNS integrado ao AD"),
            ("C2-E5", "DHCP: escopos, reservas, exclusões"),
            ("C2-E6", "Replicação entre DCs e funções FSMO (noção)"),
            ("C2-E7", "Permissões NTFS x compartilhamento; arquivos e impressão"),
            ("C2-E8", "Visualizador de Eventos e troubleshooting de logon"),
        ], entrega="Laboratório funcionando e 5 casos do BDEC reescritos com causa explicada."),
        disc("carreira", "C3", "Identidade e nuvem Microsoft", 30, 15, [
            ("C3-E1", "Entra ID: tenant, usuários, grupos"),
            ("C3-E2", "Modelo híbrido: sincronização AD e Entra ID"),
            ("C3-E3", "MFA e acesso condicional (noção)"),
            ("C3-E4", "Microsoft 365: licenças, Exchange Online, Teams, SharePoint, OneDrive"),
            ("C3-E5", "Intune: inscrição, políticas e conformidade"),
            ("C3-E6", "BitLocker e TPM com Entra ID: chave de recuperação"),
            ("C3-E7", "Domínio CDL x domínio dos EUA na prática"),
        ], entrega="Nota \"Diferenças CDL x EUA\" feita por você."),
        disc("carreira", "C4", "Automação (PowerShell, Git, Python)", 40, 15, [
            ("C4-E1", "PowerShell básico: cmdlets, pipeline, variáveis, if, foreach"),
            ("C4-E2", "PowerShell para suporte: CSV, serviços, relatórios"),
            ("C4-E3", "PowerShell com Active Directory (com permissão)"),
            ("C4-E4", "Git e GitHub"),
            ("C4-E5", "Python básico"),
            ("C4-E6", "Python: CSV, JSON e APIs REST"),
            ("C4-E7", "API do GLPI (só se habilitada e autorizada)"),
            ("C4-E8", "Projeto final: um script que economiza tempo do time"),
        ], entrega="3 tarefas repetitivas automatizadas."),
        disc("carreira", "C5", "Backup, virtualização e monitoramento", 25, 10, [
            ("C5-E1", "Backup: regra 3-2-1, RPO e RTO"),
            ("C5-E2", "Restaurar de verdade no laboratório"),
            ("C5-E3", "Virtualização: host, VM, snapshot"),
            ("C5-E4", "Monitoramento: Zabbix e Grafana em laboratório"),
            ("C5-E5", "Olhar tendências antes de o problema acontecer"),
        ]),
        disc("carreira", "C6", "Linux básico", 15, 5, [
            ("C6-E1", "Terminal e navegação"),
            ("C6-E2", "Arquivos e permissões"),
            ("C6-E3", "Usuários e grupos"),
            ("C6-E4", "Pacotes e serviços (systemd)"),
            ("C6-E5", "cron e logs"),
            ("C6-E6", "Rede no Linux: ip, ss, ping, curl"),
        ]),
        disc("carreira", "C7", "Segurança", 20, 10, [
            ("C7-E1", "Confidencialidade, integridade, disponibilidade; menor privilégio"),
            ("C7-E2", "MFA e senhas"),
            ("C7-E3", "EDR e segurança web (nível conceitual)"),
            ("C7-E4", "Gestão de vulnerabilidades: ler um relatório e priorizar"),
            ("C7-E5", "Phishing e engenharia social"),
        ]),
        disc("carreira", "C8", "Atendimento, ITIL e documentação", 10, 5, [
            ("C8-E1", "Modelo de caso: sintoma, causa, passos, por que funciona, termos"),
            ("C8-E2", "Mensagens padrão do GLPI"),
            ("C8-E3", "ITIL: incidente, problema, mudança, base de conhecimento, SLA"),
            ("C8-E4", "Comunicação com o usuário"),
            ("C8-E5", "Meta: 2 casos documentados por semana e medir o tempo"),
        ]),
    ],
    "checklist": [
        "Resolve a maioria dos chamados sozinho e explica a causa raiz",
        "Diagnóstico de rede com método próprio (C1)",
        "Administra AD, GPO, DNS e DHCP com segurança (C2)",
        "Entende identidade nos dois domínios e na nuvem (C3)",
        "Pelo menos 3 tarefas automatizadas (C4)",
        "Já restaurou um backup de verdade (C5)",
        "Pelo menos 40 notas boas que outras pessoas usam (C8)",
        "Orienta colegas e ensina sem confundir",
        "Passa numa simulação de entrevista de Pleno",
    ],
    "nota": "Prontidão para Pleno = acima de 85% no total, checklist completo e confirmação do gestor. O título depende da empresa (vagas de Pleno costumam pedir 2 a 3 anos de experiência).",
}

# ---------------------------------------------------------------- INGLES
ingles = {
    "id": "ingles", "nome": "Inglês técnico", "icone": "🌎", "cor": "#a78bfa", "versao": "1.0",
    "descricao": "Ler documentação e mensagens de erro, escrever notas e e-mails de suporte e fazer uma entrevista técnica básica. 20 minutos por dia.",
    "disciplinas": [
        disc("ingles", "I", "Inglês técnico", 40, 100, [
            ("I-E1", "Teste de nível e meta"),
            ("I-E2", "Vocabulário de TI (glossário no Obsidian)"),
            ("I-E3", "Ler mensagens de erro em inglês"),
            ("I-E4", "Ler uma página da documentação da Microsoft por semana"),
            ("I-E5", "Escrever uma nota por semana em inglês"),
            ("I-E6", "Ouvir vídeos técnicos curtos com legenda"),
            ("I-E7", "E-mail e mensagem de suporte em inglês"),
            ("I-E8", "Falar: explicar um caso resolvido em voz alta"),
            ("I-E9", "Simulação de entrevista técnica básica em inglês"),
        ], entrega="10 notas em inglês no Obsidian e uma gravação explicando um caso."),
    ],
    "checklist": [],
    "nota": "Outros idiomas (espanhol, japonês, italiano, russo) ficam como cursos futuros.",
}

# ---------------------------------------------------------------- OBSIDIAN
obsidian = {
    "id": "obsidian", "nome": "Obsidian", "icone": "🗂️", "cor": "#60a5fa", "versao": "1.0",
    "descricao": "Dominar o Obsidian e montar a sua agenda de soluções, pronta para ser compartilhada com segurança.",
    "disciplinas": [
        disc("obsidian", "O", "Obsidian na prática", 12, 100, [
            ("O-E1", "Criar o vault e as pastas"),
            ("O-E2", "Criar notas e usar Markdown"),
            ("O-E3", "Links entre notas com [[ ]]"),
            ("O-E4", "Tags e busca"),
            ("O-E5", "Templates: modelo de caso"),
            ("O-E6", "Colar prints e organizar a pasta Anexos"),
            ("O-E7", "Plugins da comunidade, só com aprovação da empresa"),
            ("O-E8", "Backup do vault"),
            ("O-E9", "Migrar o BDEC (numa cópia)"),
            ("O-E10", "Compartilhar com segurança"),
        ], entrega="Vault com pelo menos 10 notas no padrão, template funcionando e busca testada."),
    ],
    "checklist": [],
    "nota": "Regras de ouro: nunca guardar senhas no Obsidian; padrão de título CATEGORIA - Assunto - Sintoma; trabalhe sempre numa cópia do BDEC.",
}

for c in (carreira, dev, ingles, obsidian):
    escrever(c)
