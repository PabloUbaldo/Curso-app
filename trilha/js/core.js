/* Trilha: motor do app (estado, tempo ativo, desbloqueios, provas, log, backup, bloco de atualização).
   Sem dependências além de sha256.js. Todo o estado fica no localStorage do aparelho. */
(function (global) {
  'use strict';
  var T = global.Trilha = global.Trilha || {};
  var KEY = 'trilha.v1';
  var APP_VERSION = '1.1.0';
  var S = null;
  var memOnly = false;

  /* ---------- utilidades ---------- */
  function now() { return Date.now(); }
  function iso(t) { return new Date(t || now()).toISOString(); }
  function dayKey(t) { var d = new Date(t || now()); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function avg(a) { return a.length ? a.reduce(function (x, y) { return x + y; }, 0) / a.length : null; }
  function r1(n) { return Math.round(n * 10) / 10; }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------- estado ---------- */
  function defaultState() {
    return { v: 1, apelido: '', modoTeste: false, idleSeg: 180, metaSemanaH: 7, criado: now(), cursos: {}, dias: {}, sessoes: [], extras: [], logs: [], ultimoLogId: null, snapshot: null, ultimo: null, tempoTotalSeg: 0, mensagens: [] };
  }
  function load() {
    try {
      var raw = global.localStorage.getItem(KEY);
      S = Object.assign(defaultState(), raw ? JSON.parse(raw) : {});
    } catch (e) { S = Object.assign(defaultState(), S || {}); memOnly = true; }
    return S;
  }
  function save() { try { global.localStorage.setItem(KEY, JSON.stringify(S)); memOnly = false; } catch (e) { memOnly = true; } }
  function state() { return S; }

  /* ---------- cursos ---------- */
  function cursos() {
    var map = {}, ordem = [];
    (global.TRILHA_CURSOS || []).concat(S.extras || []).forEach(function (c) { if (!map[c.id]) ordem.push(c.id); map[c.id] = c; });
    return ordem.map(function (id) { return map[id]; });
  }
  function curso(id) { return cursos().filter(function (c) { return c.id === id; })[0]; }
  function acharEtapa(c, eid) {
    for (var di = 0; di < c.disciplinas.length; di++) {
      var d = c.disciplinas[di];
      for (var ei = 0; ei < d.etapas.length; ei++) if (d.etapas[ei].id === eid) return { d: d, e: d.etapas[ei], di: di, ei: ei };
    }
    return null;
  }
  function cs(cid) { var x = S.cursos[cid]; if (!x) x = S.cursos[cid] = { etapas: {}, discs: {}, checklist: {}, entregaOk: {} }; return x; }
  function es(cid, eid) { var c = cs(cid); var x = c.etapas[eid]; if (!x) x = c.etapas[eid] = { feito: false, nota: null, notaFonte: null, notaQuiz: null, tempoSeg: 0, caderno: '', li: false, exerc: false, quiz: null, enviar: false, comentario: '', revisar: false }; return x; }
  function ds(cid, did) { var c = cs(cid); var x = c.discs[did]; if (!x) x = c.discs[did] = { tempoSeg: 0, provas: [] }; return x; }

  /* ---------- cálculo de progresso ---------- */
  function discInfo(c, idx) {
    var d = c.disciplinas[idx];
    var st = ds(c.id, d.id);
    var entrega = d.tipo === 'entrega';
    var total = d.etapas.length;
    var feitas = d.etapas.filter(function (e) { return es(c.id, e.id).feito; }).length;
    var notas = d.etapas.map(function (e) { return es(c.id, e.id).nota; }).filter(function (n) { return n != null; });
    var mediaEtapas = avg(notas);
    var finais = st.provas.filter(function (p) { return p.status === 'final'; });
    var ult = finais[finais.length - 1] || null;
    var pendente = st.provas.filter(function (p) { return p.status === 'pendente'; })[0] || null;
    var andamento = st.provas.filter(function (p) { return p.status === 'andamento'; })[0] || null;
    var notaProva = ult ? ult.nota : null;
    var nota = null;
    if (notaProva != null) nota = r1(mediaEtapas == null ? notaProva : 0.5 * mediaEtapas + 0.5 * notaProva);
    var aprovada = entrega ? !!cs(c.id).entregaOk[d.id] : (nota != null && nota >= 7);

    var unlocked = true;
    if (!S.modoTeste) {
      if (entrega) {
        for (var k = 0; k < idx; k++) { var dk = c.disciplinas[k]; if (dk.peso > 0 && !discInfo(c, k).aprovada) { unlocked = false; break; } }
      } else if (idx > 0) {
        var prev = idx - 1;
        while (prev >= 0 && c.disciplinas[prev].tipo === 'entrega') prev--;
        if (prev >= 0 && !discInfo(c, prev).aprovada) unlocked = false;
      }
    }
    var minSeg = Math.round(d.horas * 3600 * ((d.minPct == null ? 20 : d.minPct) / 100));
    var etapasOk = total > 0 && feitas === total;
    var tempoOk = st.tempoSeg >= minSeg;
    var cool = (ult && !aprovada && now() < ult.fim + 24 * 3600e3) ? ult.fim + 24 * 3600e3 : null;
    var temProva = !!d.prova && !entrega;
    var criterios = (etapasOk && tempoOk && !cool);
    var liberada = temProva && unlocked && !pendente && !aprovada && (criterios || S.modoTeste);
    var semConteudo = !entrega && d.etapas.every(function (e) { return !e.md; });

    var prog = entrega ? (aprovada ? 1 : 0) : (total ? 0.8 * feitas / total + 0.2 * (aprovada ? 1 : 0) : 0);
    var status;
    if (entrega) status = !unlocked ? 'bloqueada' : (aprovada ? 'aprovada' : 'andamento');
    else if (!unlocked) status = 'bloqueada';
    else if (aprovada) status = 'aprovada';
    else if (pendente) status = 'correcao';
    else if (ult) status = 'reprovada';
    else if (semConteudo && !temProva) status = 'producao';
    else if (liberada) status = 'prova';
    else status = 'andamento';
    return { d: d, idx: idx, entrega: entrega, total: total, feitas: feitas, mediaEtapas: mediaEtapas, notaProva: notaProva, nota: nota, aprovada: aprovada, prog: prog, tempoSeg: st.tempoSeg, minSeg: minSeg, etapasOk: etapasOk, tempoOk: tempoOk, cool: cool, temProva: temProva, liberada: liberada, pendente: pendente, andamento: andamento, unlocked: unlocked, semConteudo: semConteudo, status: status, ult: ult };
  }

  function etapaLiberada(c, di, ei) {
    if (S.modoTeste) return true;
    if (!discInfo(c, di).unlocked) return false;
    if (ei === 0) return true;
    return es(c.id, c.disciplinas[di].etapas[ei - 1].id).feito;
  }

  function courseInfo(c) {
    var discs = c.disciplinas.map(function (d, i) { return discInfo(c, i); });
    var pesados = discs.filter(function (x) { return x.d.peso > 0; });
    var pesoTot = pesados.reduce(function (a, x) { return a + x.d.peso; }, 0) || 1;
    var pct = pesados.reduce(function (a, x) { return a + x.d.peso * x.prog; }, 0) / pesoTot * 100;
    var comNota = pesados.filter(function (x) { return x.nota != null; });
    var pNota = comNota.reduce(function (a, x) { return a + x.d.peso; }, 0);
    var notaPond = pNota ? r1(comNota.reduce(function (a, x) { return a + x.d.peso * x.nota; }, 0) / pNota) : null;
    var todasAprov = pesados.length > 0 && pesados.every(function (x) { return x.aprovada; });
    var geralLiberada = todasAprov && notaPond != null && notaPond >= 7.5;
    var atual = null;
    for (var i = 0; i < discs.length; i++) { if (!discs[i].aprovada && !discs[i].entrega) { atual = discs[i]; break; } }
    var etapaAtual = null;
    if (atual) {
      for (var j = 0; j < atual.d.etapas.length; j++) { var e = atual.d.etapas[j]; if (!es(c.id, e.id).feito && e.md) { etapaAtual = e; break; } }
    }
    var tempoSeg = discs.reduce(function (a, x) { return a + x.tempoSeg; }, 0);
    var entregasOk = discs.filter(function (x) { return x.entrega; }).every(function (x) { return x.aprovada; });
    return { discs: discs, pct: pct, notaPond: notaPond, todasAprov: todasAprov, geralLiberada: geralLiberada, atual: atual, etapaAtual: etapaAtual, tempoSeg: tempoSeg, entregasOk: entregasOk, aprovado: todasAprov && geralLiberada && entregasOk && (notaPond >= 7) };
  }

  /* ---------- tempo ativo ---------- */
  var ctx = null, lastAct = now(), lastTick = now(), pausado = false, saveCount = 0;
  function setCtx(c) {
    ctx = c || null;
    if (c && c.cid) { S.ultimo = { cid: c.cid, did: c.did || null, eid: c.eid || null, kind: c.kind || null, quando: now() }; }
  }
  function touch() { lastAct = now(); }
  function addActive(sec, c) {
    c = c || ctx;
    if (!c || !(sec > 0)) return;
    S.tempoTotalSeg = (S.tempoTotalSeg || 0) + sec;
    var dk = dayKey(); S.dias[dk] = (S.dias[dk] || 0) + sec;
    if (c.cid && c.did) ds(c.cid, c.did).tempoSeg += sec;
    if (c.cid && c.eid) es(c.cid, c.eid).tempoSeg += sec;
    if (c.kind === 'prova' && c.cid && c.did) {
      var a = ds(c.cid, c.did).provas.filter(function (p) { return p.status === 'andamento'; })[0];
      if (a) a.tempoSeg = (a.tempoSeg || 0) + sec;
    }
    var t = now(), se = S.sessoes[S.sessoes.length - 1];
    if (!se || t - se.fimTs > 5 * 60e3) {
      se = { data: dayKey(t), ini: iso(t - sec * 1000), fim: iso(t), fimTs: t, seg: 0, curso: c.cid || null, disc: c.did || null, etapa: c.eid || null };
      S.sessoes.push(se);
      if (S.sessoes.length > 300) S.sessoes.shift();
    }
    se.seg += sec; se.fimTs = t; se.fim = iso(t);
  }
  function tick() {
    var t = now();
    var dt = Math.min((t - lastTick) / 1000, 3);
    lastTick = t;
    if (!ctx || (global.document && global.document.hidden)) { pausado = true; return; }
    if (t - lastAct > S.idleSeg * 1000) { pausado = true; return; }
    pausado = false;
    addActive(dt);
    if (++saveCount % 5 === 0) save();
  }
  function isPausado() { return pausado; }
  function hojeSeg() { return S.dias[dayKey()] || 0; }
  function semanaSeg() {
    var tot = 0, d = new Date();
    var dow = (d.getDay() + 6) % 7; // segunda = 0
    for (var i = 0; i <= dow; i++) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate() - i); tot += S.dias[dayKey(x.getTime())] || 0; }
    return tot;
  }
  function streak() {
    var n = 0, d = new Date();
    var hoje = S.dias[dayKey(d.getTime())] || 0;
    var i = hoje >= 600 ? 0 : 1;
    for (; i < 400; i++) {
      var x = new Date(d.getFullYear(), d.getMonth(), d.getDate() - i);
      if ((S.dias[dayKey(x.getTime())] || 0) >= 600) n++; else break;
    }
    return n;
  }

  /* ---------- etapas ---------- */
  function quizResultado(cid, e, respostas) {
    var q = e.quiz || [];
    var acertos = 0;
    q.forEach(function (it, i) { if (respostas[i] === it.ok) acertos++; });
    var nota = q.length ? r1(acertos / q.length * 10) : 0;
    var st = es(cid, e.id);
    st.quiz = { acertos: acertos, total: q.length, respostas: respostas.slice(), quando: now(), tentativas: (st.quiz ? st.quiz.tentativas : 0) + 1 };
    if (st.notaFonte !== 'claude') {
      st.notaQuiz = st.notaQuiz == null ? nota : Math.max(st.notaQuiz, nota);
      st.nota = st.notaQuiz; st.notaFonte = 'quiz';
    }
    save();
    return { acertos: acertos, total: q.length, nota: nota, passou: nota >= 6 };
  }
  function podeConcluir(cid, e) {
    var st = es(cid, e.id);
    return !!(st.li && st.exerc && st.quiz && (st.quiz.acertos / st.quiz.total) * 10 >= 6);
  }
  function concluirEtapa(cid, eid, forcar) {
    var c = curso(cid), loc = acharEtapa(c, eid);
    if (!loc || !loc.e.md) throw new Error('Etapa sem conteúdo.');
    if (!etapaLiberada(c, loc.di, loc.ei)) throw new Error('Etapa bloqueada.');
    if (!podeConcluir(cid, loc.e) && !(forcar && S.modoTeste)) throw new Error('Faltam itens: marque os dois checks e acerte o quiz.');
    var st = es(cid, eid);
    st.feito = true; st.feitoEm = now(); st.revisar = false;
    save();
  }

  /* ---------- provas ---------- */
  function notaTentativa(t) {
    var total = t.questoes.length, pts = 0;
    t.questoes.forEach(function (q) {
      if (q.tipo === 'obj') pts += q.pontos || 0;
      else pts += (q.notaIA == null ? 0 : q.notaIA / 10);
    });
    return r1(pts / total * 10);
  }
  function iniciarProva(cid, did) {
    var c = curso(cid), idx = c.disciplinas.map(function (d) { return d.id; }).indexOf(did);
    var info = discInfo(c, idx), d = c.disciplinas[idx];
    if (info.andamento) return info.andamento;
    if (!info.liberada) throw new Error('Prova ainda não liberada.');
    var P = d.prova, st = ds(cid, did);
    var obj = shuffle(P.pool).slice(0, P.nObj).map(function (q) {
      var ops = q.opcoes.map(function (t, i) { return { t: t, ok: i === q.ok }; });
      ops = shuffle(ops);
      return { id: q.id, tipo: 'obj', enunciado: q.enunciado, opcoes: ops.map(function (o) { return o.t; }), ok: ops.map(function (o) { return o.ok; }).indexOf(true), porque: q.porque || '', resposta: null, correta: null, pontos: null };
    });
    var dis = shuffle(P.dissertativas || []).slice(0, P.nDiss || 0).map(function (q) {
      return { id: q.id, tipo: 'dissert', enunciado: q.enunciado, resposta: '', notaIA: null, comentario: '' };
    });
    var t = { tentativa: st.provas.length + 1, ini: now(), fim: null, tempoSeg: 0, questoes: obj.concat(dis), status: 'andamento', notaObjetiva: null, nota: null };
    st.provas.push(t);
    save();
    return t;
  }
  function responderRascunho(cid, did, qid, valor) {
    var t = ds(cid, did).provas.filter(function (p) { return p.status === 'andamento'; })[0];
    if (!t) return;
    t.questoes.forEach(function (q) { if (q.id === qid) q.resposta = valor; });
  }
  function enviarProva(cid, did) {
    var st = ds(cid, did);
    var t = st.provas.filter(function (p) { return p.status === 'andamento'; })[0];
    if (!t) throw new Error('Nenhuma prova em andamento.');
    var nObj = 0, ac = 0, temDis = false;
    t.questoes.forEach(function (q) {
      if (q.tipo === 'obj') { nObj++; q.correta = (q.resposta === q.ok); q.pontos = q.correta ? 1 : 0; if (q.correta) ac++; }
      else temDis = true;
    });
    t.notaObjetiva = nObj ? r1(ac / nObj * 10) : null;
    t.fim = now();
    if (temDis) { t.status = 'pendente'; t.nota = null; }
    else { t.status = 'final'; t.nota = notaTentativa(t); }
    save();
    return t;
  }
  function desistirProva(cid, did) {
    var st = ds(cid, did);
    st.provas = st.provas.filter(function (p) { return p.status !== 'andamento'; });
    save();
  }

  /* ---------- log de progresso ---------- */
  function min(seg) { return Math.round(seg / 60 * 10) / 10; }
  function snapshotAtual() {
    var snap = { etapas: {}, provas: {} };
    cursos().forEach(function (c) {
      c.disciplinas.forEach(function (d) {
        d.etapas.forEach(function (e) { var st = es(c.id, e.id); snap.etapas[c.id + ':' + e.id] = { feito: !!st.feito, nota: st.nota }; });
        snap.provas[c.id + ':' + d.id] = ds(c.id, d.id).provas.map(function (p) { return p.status + ':' + (p.nota == null ? '' : p.nota); });
      });
    });
    return snap;
  }
  function mudancas() {
    var atual = snapshotAtual(), ant = S.snapshot, out = { desde: S.ultimoLogId, etapas_concluidas: [], notas_novas: [], provas: [] };
    Object.keys(atual.etapas).forEach(function (k) {
      var a = atual.etapas[k], b = ant && ant.etapas[k];
      if (a.feito && !(b && b.feito)) out.etapas_concluidas.push(k);
      if (a.nota != null && (!b || b.nota !== a.nota)) out.notas_novas.push({ etapa: k, nota: a.nota });
    });
    Object.keys(atual.provas).forEach(function (k) {
      var a = atual.provas[k].join('|'), b = ant ? (ant.provas[k] || []).join('|') : '';
      if (a !== b) out.provas.push(k);
    });
    return out;
  }

  function gerarLog(opts) {
    opts = opts || {};
    var t = now();
    var id = 'L' + iso(t).replace(/[-:T]/g, '').slice(0, 12) + '-' + Math.random().toString(36).slice(2, 6);
    var dados = { versao_log: 1, id_do_log: id, id_do_log_anterior: S.ultimoLogId, gerado_em: iso(t), app: APP_VERSION, apelido_do_aluno: S.apelido || null, modo_teste: !!S.modoTeste, cursos: [], sessoes: [], avaliacoes: [], desbloqueios: [], mudancas: null, anotacoes: opts.anotacoes || '', pedido: opts.pedido || '', etapas_para_correcao: [] };
    cursos().forEach(function (c) {
      var ci = courseInfo(c);
      var porDisc = {}, porEtapa = {}, concl = [];
      ci.discs.forEach(function (x) {
        porDisc[x.d.id] = min(x.tempoSeg);
        x.d.etapas.forEach(function (e) {
          var st = es(c.id, e.id);
          if (st.tempoSeg) porEtapa[e.id] = min(st.tempoSeg);
          if (st.feito) concl.push(e.id);
          if (st.enviar) { dados.etapas_para_correcao.push({ curso: c.id, etapa: e.id, titulo: e.titulo, tempo_min: min(st.tempoSeg), quiz: st.quiz ? { acertos: st.quiz.acertos, total: st.quiz.total, tentativas: st.quiz.tentativas } : null, caderno: st.caderno || '' }); }
        });
      });
      dados.cursos.push({
        id: c.id, versao_do_curso: c.versao, percentual_do_curso: r1(ci.pct), nota_ponderada: ci.notaPond,
        disciplina_atual: ci.atual ? ci.atual.d.id : null, etapa_atual: ci.etapaAtual ? ci.etapaAtual.id : null,
        etapas_concluidas: concl, tempo_ativo_min: min(ci.tempoSeg), tempo_por_disciplina_min: porDisc, tempo_por_etapa_min: porEtapa,
        disciplinas: ci.discs.map(function (x) { return { id: x.d.id, status: x.status, percentual: r1(x.prog * 100), etapas: x.feitas + '/' + x.total, nota: x.nota, nota_etapas: x.mediaEtapas == null ? null : r1(x.mediaEtapas), nota_prova: x.notaProva, aprovada: x.aprovada, tempo_min: min(x.tempoSeg), tempo_minimo_min: min(x.minSeg), prova_liberada: x.liberada }; }),
        checklist: (c.checklist || []).map(function (txt, i) { return { item: txt, ok: !!cs(c.id).checklist[i] }; })
      });
      ci.discs.forEach(function (x) {
        var st = ds(c.id, x.d.id);
        st.provas.forEach(function (p) {
          dados.avaliacoes.push({
            curso: c.id, disciplina: x.d.id, tentativa: p.tentativa, data: iso(p.ini), tempo_gasto_min: min(p.tempoSeg || 0), status: p.status, nota_objetiva: p.notaObjetiva, nota_final: p.nota,
            questoes: p.questoes.map(function (q) { return q.tipo === 'obj' ? { id: q.id, tipo: 'objetiva', enunciado: q.enunciado, resposta_do_aluno: q.resposta == null ? null : q.opcoes[q.resposta], resposta_correta: q.opcoes[q.ok], correta: q.correta, pontos: q.pontos, nota_da_ia: null } : { id: q.id, tipo: 'dissertativa', enunciado: q.enunciado, resposta_do_aluno: q.resposta, correta: null, pontos: null, nota_da_ia: q.notaIA }; })
          });
        });
        if (x.unlocked) dados.desbloqueios.push({ curso: c.id, disciplina: x.d.id, status: x.status, etapas_ok: x.etapasOk, tempo_ok: x.tempoOk, prova_liberada: x.liberada });
      });
    });
    var cut = t - 30 * 86400e3;
    dados.sessoes = S.sessoes.filter(function (s) { return s.fimTs >= cut; }).map(function (s) { return { data: s.data, inicio: s.ini, fim: s.fim, minutos_ativos: min(s.seg), curso: s.curso, etapa: s.etapa }; });
    dados.mudancas = mudancas();
    dados.integridade = T.sha256(JSON.stringify(dados)).slice(0, 16);

    var A = [];
    A.push('# LOG DE PROGRESSO (Trilha v' + APP_VERSION + ')');
    A.push('Gerado em: ' + new Date(t).toLocaleString('pt-BR') + ' · ID: ' + id + ' · Aluno: ' + (S.apelido || '(sem apelido)') + (S.modoTeste ? ' · ATENÇÃO: MODO TESTE LIGADO (bloqueios desativados)' : ''));
    A.push('Tempo ativo total: ' + min(S.tempoTotalSeg || 0) + ' min · Hoje: ' + min(hojeSeg()) + ' min · Sequência: ' + streak() + ' dia(s)');
    dados.cursos.forEach(function (c) {
      A.push('');
      A.push('## Curso ' + c.id + ' (v' + c.versao_do_curso + '): ' + c.percentual_do_curso + '% · nota ponderada: ' + (c.nota_ponderada == null ? 'n/d' : c.nota_ponderada));
      A.push('Disciplina atual: ' + (c.disciplina_atual || '-') + ' · Etapa atual: ' + (c.etapa_atual || '-') + ' · Etapas concluídas: ' + c.etapas_concluidas.length);
      c.disciplinas.forEach(function (x) { if (x.status !== 'producao' || x.etapas.split('/')[0] !== '0') A.push('- ' + x.id + ': ' + x.status + ' · ' + x.percentual + '% · etapas ' + x.etapas + ' · tempo ' + x.tempo_min + '/' + x.tempo_minimo_min + ' min · nota ' + (x.nota == null ? 'n/d' : x.nota) + (x.prova_liberada ? ' · PROVA LIBERADA' : '')); });
    });
    A.push('');
    A.push('## O que mudou desde o log anterior ' + (dados.id_do_log_anterior ? '(' + dados.id_do_log_anterior + ')' : '(primeiro log)'));
    A.push('Etapas concluídas: ' + (dados.mudancas.etapas_concluidas.length ? dados.mudancas.etapas_concluidas.join(', ') : 'nenhuma'));
    A.push('Notas novas: ' + (dados.mudancas.notas_novas.length ? dados.mudancas.notas_novas.map(function (n) { return n.etapa + '=' + n.nota; }).join(', ') : 'nenhuma'));
    A.push('Provas alteradas: ' + (dados.mudancas.provas.length ? dados.mudancas.provas.join(', ') : 'nenhuma'));
    var pend = dados.avaliacoes.filter(function (a) { return a.status === 'pendente'; });
    if (pend.length) A.push('Provas aguardando correção das dissertativas: ' + pend.map(function (a) { return a.curso + '/' + a.disciplina + ' tentativa ' + a.tentativa; }).join('; '));
    if (dados.etapas_para_correcao.length) A.push('Etapas enviadas para correção: ' + dados.etapas_para_correcao.map(function (e) { return e.etapa; }).join(', '));
    if (dados.anotacoes) { A.push(''); A.push('## Anotações / dúvidas'); A.push(dados.anotacoes); }
    A.push('');
    A.push('## Pedido');
    A.push(dados.pedido || 'Retomar: me diga onde estou, confira inconsistências e diga o próximo passo.');
    var texto = A.join('\n') + '\n\n## PARTE B (dados; não edite)\n```json\n' + JSON.stringify(dados, null, 1) + '\n```\n';
    // Parte B é indentada (legível); a verificação usa JSON.stringify compacto, então guardamos também o hash no cabeçalho
    S.snapshot = snapshotAtual();
    S.ultimoLogId = id;
    S.logs.push({ id: id, em: t, hash: dados.integridade });
    if (S.logs.length > 50) S.logs.shift();
    Object.keys(S.cursos).forEach(function (cid) { Object.keys(S.cursos[cid].etapas).forEach(function (eid) { S.cursos[cid].etapas[eid].enviar = false; }); });
    save();
    return { id: id, texto: texto, dados: dados };
  }
  function extrairJSON(texto) {
    var m = String(texto).match(/```(?:json)?\s*([\s\S]*?)```/);
    var cand = m ? m[1] : texto;
    try { return JSON.parse(cand); } catch (e) { }
    var a = String(texto).indexOf('{'), b = String(texto).lastIndexOf('}');
    if (a >= 0 && b > a) { try { return JSON.parse(String(texto).slice(a, b + 1)); } catch (e2) { } }
    return null;
  }
  function verificarLog(texto) {
    var o = extrairJSON(texto);
    if (!o || !o.integridade) return { ok: false, motivo: 'Bloco de dados não encontrado.' };
    var h = o.integridade; delete o.integridade;
    var calc = T.sha256(JSON.stringify(o)).slice(0, 16);
    return { ok: calc === h, esperado: h, calculado: calc };
  }

  /* ---------- bloco de atualização (vem do Claude) ---------- */
  function aplicarUpdate(texto) {
    var o = extrairJSON(texto);
    if (!o || o.trilha_update !== 1 || !Array.isArray(o.acoes)) throw new Error('Isto não parece um bloco de atualização do Claude (faltou "trilha_update": 1 e a lista "acoes").');
    var rel = [];
    o.acoes.forEach(function (a, n) {
      try {
        var c = a.curso ? curso(a.curso) : null;
        if (a.tipo === 'nota_etapa') {
          if (!c) throw new Error('curso "' + a.curso + '" não existe');
          var loc = acharEtapa(c, a.etapa); if (!loc) throw new Error('etapa "' + a.etapa + '" não existe');
          var nota = Number(a.nota); if (!(nota >= 0 && nota <= 10)) throw new Error('nota inválida em ' + a.etapa);
          var st = es(c.id, a.etapa);
          st.nota = r1(nota); st.notaFonte = 'claude'; st.comentario = a.comentario || '';
          if (nota >= 7) { st.feito = true; st.revisar = false; if (!st.feitoEm) st.feitoEm = now(); }
          else { st.feito = false; st.revisar = true; }
          rel.push('✓ ' + a.etapa + ': nota ' + st.nota + (nota >= 7 ? ' (concluída)' : ' (revisar)'));
        } else if (a.tipo === 'correcao_prova') {
          if (!c) throw new Error('curso "' + a.curso + '" não existe');
          var pr = ds(c.id, a.disc).provas.filter(function (p) { return p.tentativa === a.tentativa; })[0];
          if (!pr) throw new Error('prova ' + a.disc + ' tentativa ' + a.tentativa + ' não encontrada');
          Object.keys(a.questoes || {}).forEach(function (qid) {
            pr.questoes.forEach(function (q) { if (q.id === qid && q.tipo === 'dissert') { q.notaIA = Math.max(0, Math.min(10, Number(a.questoes[qid].nota))); q.comentario = a.questoes[qid].comentario || ''; } });
          });
          var faltam = pr.questoes.filter(function (q) { return q.tipo === 'dissert' && q.notaIA == null; }).length;
          if (!faltam) { pr.nota = notaTentativa(pr); pr.status = 'final'; if (a.comentario) pr.comentario = a.comentario; rel.push('✓ prova ' + a.disc + ' (tentativa ' + a.tentativa + '): nota final ' + pr.nota); }
          else rel.push('• prova ' + a.disc + ': ainda faltam ' + faltam + ' dissertativa(s)');
        } else if (a.tipo === 'entrega') {
          if (!c) throw new Error('curso "' + a.curso + '" não existe');
          cs(c.id).entregaOk[a.disc] = !!a.ok; rel.push('✓ entrega ' + a.disc + ': ' + (a.ok ? 'aprovada' : 'pendente'));
        } else if (a.tipo === 'mensagem') {
          S.mensagens.push({ em: now(), texto: String(a.texto || '') }); rel.push('✓ mensagem do Claude guardada');
        } else throw new Error('tipo de ação desconhecido: ' + a.tipo);
      } catch (e) { rel.push('✗ ação ' + (n + 1) + ': ' + e.message); }
    });
    save();
    return rel;
  }

  /* ---------- importar curso, backup, reset ---------- */
  function validarCurso(c) {
    if (!c || typeof c !== 'object') throw new Error('Arquivo de curso inválido.');
    if (!c.id || !c.nome || !Array.isArray(c.disciplinas) || !c.disciplinas.length) throw new Error('O curso precisa de id, nome e disciplinas.');
    c.disciplinas.forEach(function (d) {
      if (!d.id || !d.nome || !Array.isArray(d.etapas)) throw new Error('Disciplina inválida: ' + (d.id || '?'));
      if (typeof d.horas !== 'number' || typeof d.peso !== 'number') throw new Error('Disciplina ' + d.id + ' sem horas/peso numéricos.');
      d.etapas.forEach(function (e) { if (!e.id || !e.titulo) throw new Error('Etapa inválida em ' + d.id); });
    });
    return c;
  }
  function importarCurso(texto) {
    var s = String(texto).trim();
    var m = s.match(/TRILHA_CURSOS\.push\(([\s\S]*)\)\s*;?\s*$/);
    var c;
    try { c = JSON.parse(m ? m[1] : s); } catch (e) { throw new Error('Não consegui ler o curso (precisa ser JSON ou um .js gerado pelo build).'); }
    validarCurso(c);
    c.versao = c.versao || '1.0';
    S.extras = (S.extras || []).filter(function (x) { return x.id !== c.id; });
    S.extras.push(c);
    save();
    return c;
  }
  function exportBackup() { return JSON.stringify({ app: 'trilha', v: 1, exportado_em: iso(), estado: S }, null, 1); }
  function importBackup(texto) {
    var o; try { o = JSON.parse(texto); } catch (e) { throw new Error('Arquivo de backup inválido.'); }
    if (!o || o.app !== 'trilha' || !o.estado || o.estado.v !== 1 || typeof o.estado.cursos !== 'object') throw new Error('Esse arquivo não é um backup do Trilha.');
    S = Object.assign(defaultState(), o.estado);
    save();
  }
  function reset() { S = defaultState(); save(); }

  T.core = {
    APP_VERSION: APP_VERSION, load: load, save: save, state: state, cursos: cursos, curso: curso, acharEtapa: acharEtapa,
    cs: cs, es: es, ds: ds, discInfo: discInfo, courseInfo: courseInfo, etapaLiberada: etapaLiberada,
    setCtx: setCtx, touch: touch, addActive: addActive, tick: tick, pausado: isPausado, hojeSeg: hojeSeg, semanaSeg: semanaSeg, streak: streak,
    quizResultado: quizResultado, podeConcluir: podeConcluir, concluirEtapa: concluirEtapa,
    iniciarProva: iniciarProva, responderRascunho: responderRascunho, enviarProva: enviarProva, desistirProva: desistirProva, notaTentativa: notaTentativa,
    gerarLog: gerarLog, verificarLog: verificarLog, extrairJSON: extrairJSON, aplicarUpdate: aplicarUpdate,
    importarCurso: importarCurso, exportBackup: exportBackup, importBackup: importBackup, reset: reset,
    memOnly: function () { return memOnly; }, dayKey: dayKey
  };
})(window);
