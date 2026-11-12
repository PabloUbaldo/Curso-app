/* Trilha: interface. Rotas por hash (#/, #/cursos, #/curso/ID, #/aula/CURSO/ETAPA, #/prova/CURSO/DISC, #/log, #/config). */
(function () {
  'use strict';
  var T = window.Trilha, C = T.core, MD = T.md, esc = MD.esc;
  C.load();
  var app = document.getElementById('app');
  var pill = document.getElementById('pill');
  var draft = { pedido: '', anotacoes: '', update: '', cursoTxt: '' };
  var ultimoLog = null, ultimoRelatorio = null, ultimoCursoMsg = null;

  /* ---------- helpers ---------- */
  function fmt(seg) {
    seg = Math.round(seg || 0);
    if (seg < 60) return seg + ' s';
    var m = Math.floor(seg / 60);
    if (m < 60) return m + ' min';
    return Math.floor(m / 60) + ' h ' + ('0' + (m % 60)).slice(-2) + ' min';
  }
  function num(n) { return n == null ? 'n/d' : String(n).replace('.', ','); }
  function ring(p, big) {
    var r = 26, circ = 2 * Math.PI * r, off = circ * (1 - Math.max(0, Math.min(100, p)) / 100);
    return `<div class="ring${big ? ' big' : ''}"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="${r}" fill="none" stroke="var(--card2)" stroke-width="7"/><circle cx="32" cy="32" r="${r}" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg><div class="t">${Math.round(p)}%</div></div>`;
  }
  function statusChip(s) {
    var m = { bloqueada: ['🔒 bloqueada', ''], andamento: ['em andamento', 'acc'], prova: ['prova liberada', 'ok'], correcao: ['aguardando correção', 'warn'], aprovada: ['✔ aprovada', 'ok'], reprovada: ['reprovada', 'bad'], producao: ['🚧 em produção', ''] }[s] || [s, ''];
    return `<span class="chip ${m[1]}">${m[0]}</span>`;
  }
  function toast(msg) {
    var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2600);
  }
  function notFound() { return '<div class="card"><b>Página não encontrada.</b><p><a href="#/">Voltar ao painel</a></p></div>'; }
  function bannerTeste() { return C.state().modoTeste ? '<div class="banner test"><b>Modo teste ligado.</b> Os bloqueios estão desativados e o log avisa o Claude disso. Desligue em Config.</div>' : ''; }
  function bannerStorage() { return C.memOnly() ? '<div class="banner"><b>Atenção:</b> o navegador não está deixando guardar dados (janela anônima ou armazenamento bloqueado). O progresso vai se perder ao fechar. Exporte um backup em Config.</div>' : ''; }

  /* ---------- views ---------- */
  function home() {
    var s = C.state(), cs = C.cursos(), h = bannerTeste() + bannerStorage();
    if (!s.apelido) {
      h += `<div class="card"><h3>Como você quer ser chamado?</h3><div class="row"><input type="text" id="nomeIn" placeholder="Seu apelido" maxlength="30"><button class="btn" data-act="nome-salvar">Salvar</button></div></div>`;
    }
    h += `<h1>Olá, ${esc(s.apelido || 'aluno')} 👋</h1>`;
    h += `<div class="stats"><div class="stat"><b>${fmt(C.hojeSeg())}</b><span>ativo hoje</span></div><div class="stat"><b>${fmt(C.semanaSeg())}</b><span>na semana (meta ${s.metaSemanaH} h)</span></div><div class="stat"><b>${C.streak()} 🔥</b><span>dias seguidos (10 min+)</span></div></div>`;
    var alvo = (s.ultimo && C.curso(s.ultimo.cid)) || cs.filter(function (c) { return c.id === 'dev'; })[0] || cs[0];
    if (alvo) {
      var ci = C.courseInfo(alvo), link = null, txt = '';
      if (ci.atual && ci.atual.liberada) { link = '#/prova/' + alvo.id + '/' + ci.atual.d.id; txt = 'Prova liberada: ' + ci.atual.d.id + ' ' + ci.atual.d.nome; }
      else if (ci.atual && ci.atual.pendente) { link = '#/prova/' + alvo.id + '/' + ci.atual.d.id; txt = 'Prova enviada: aguardando correção (gere o log)'; }
      else if (ci.etapaAtual) { link = '#/aula/' + alvo.id + '/' + ci.etapaAtual.id; txt = ci.etapaAtual.id + ' · ' + ci.etapaAtual.titulo; }
      if (link) h += `<a class="card course-card" href="${link}" style="border-color:var(--acc)"><div class="ic">▶️</div><div class="grow"><div class="small mute">Continuar de onde parou · ${esc(alvo.nome)}</div><b>${esc(txt)}</b></div></a>`;
    }
    h += '<h2>Seus cursos</h2>';
    cs.forEach(function (c) { h += cursoCard(c); });
    h += '<p class="small mute">O percentual mede o que você estudou e provou no app. Não é título de Pleno: isso depende da empresa e do tempo de experiência.</p>';
    return h;
  }
  function cursoCard(c) {
    var ci = C.courseInfo(c);
    var sub = ci.atual ? ('Agora: ' + ci.atual.d.id + ' ' + ci.atual.d.nome) : 'Todas as disciplinas aprovadas';
    return `<a class="card course-card" href="#/curso/${esc(c.id)}">${ring(ci.pct)}<div class="grow"><b>${esc(c.icone || '📘')} ${esc(c.nome)}</b><div class="small mute">${esc(sub)}</div><div class="small mute">Tempo ativo: ${fmt(ci.tempoSeg)} · nota ponderada: ${num(ci.notaPond)}</div></div></a>`;
  }
  function cursosView() {
    var h = '<h1>Cursos</h1>';
    C.cursos().forEach(function (c) { h += cursoCard(c); });
    h += '<p class="small mute">Para adicionar um curso novo (arquivo .js ou .json gerado pelo build), use Config > Importar curso.</p>';
    return h;
  }

  function cursoView(cid) {
    var c = C.curso(cid); if (!c) return notFound();
    var ci = C.courseInfo(c), cst = C.cs(cid);
    var h = bannerTeste() + '<p><a href="#/cursos">← Cursos</a></p>';
    h += `<div class="row"><div class="grow"><h1>${esc(c.icone || '')} ${esc(c.nome)}</h1><p class="mute">${esc(c.descricao || '')}</p></div>${ring(ci.pct, true)}</div>`;
    h += `<div class="stats"><div class="stat"><b>${num(ci.notaPond)}</b><span>nota ponderada</span></div><div class="stat"><b>${fmt(ci.tempoSeg)}</b><span>tempo ativo</span></div><div class="stat"><b>${ci.discs.filter(function (x) { return x.aprovada && !x.entrega; }).length}/${ci.discs.filter(function (x) { return !x.entrega; }).length}</b><span>disciplinas aprovadas</span></div></div>`;
    ci.discs.forEach(function (x) {
      var d = x.d, aberto = (ci.atual && ci.atual.d.id === d.id) ? ' open' : '';
      h += `<details class="disc"${aberto}><summary><div class="grow"><b>${esc(d.id)} · ${esc(d.nome)}</b><div class="small mute">peso ${d.peso}% · ${d.horas} h estimadas${x.entrega ? '' : ' · etapas ' + x.feitas + '/' + x.total} · nota ${num(x.nota)}</div><div class="bar" style="margin-top:6px"><i style="width:${Math.round(x.prog * 100)}%"></i></div></div>${statusChip(x.status)}</summary><div class="body">`;
      if (!x.unlocked && !x.entrega) h += '<p class="small mute">🔒 Libera quando a disciplina anterior for aprovada (nota 7 ou mais).</p>';
      d.etapas.forEach(function (e, ei) {
        var st = C.es(cid, e.id), lib = C.etapaLiberada(c, x.idx, ei);
        var ic = st.feito ? '✅' : (st.revisar ? '🔁' : (!e.md ? '🚧' : (!lib ? '🔒' : '⚪')));
        var nota = st.nota != null ? `<span class="chip">${num(st.nota)}</span>` : '';
        var t = `<span class="st">${ic}</span><span class="grow"><span class="small mute">${esc(e.id)}</span> ${esc(e.titulo)}</span>${e.md ? '<span class="small mute">' + e.min + ' min</span>' : ''}${nota}`;
        if (e.md && lib) h += `<a class="etapa" href="#/aula/${esc(cid)}/${esc(e.id)}">${t}</a>`;
        else h += `<div class="etapa ${e.md ? 'lock' : 'prod'}">${t}</div>`;
      });
      if (x.entrega) {
        h += `<p class="small"><b>Entrega:</b> ${esc(d.entrega || '')}</p><p class="small mute">O Claude confirma a entrega no chat e você importa o bloco de atualização em Log.</p>`;
      } else {
        h += '<div class="card" style="margin:10px 4px 4px;box-shadow:none">';
        h += `<b>Prova da disciplina</b><ul class="crit small"><li>${x.etapasOk ? '✅' : '⬜'} Etapas concluídas: ${x.feitas}/${x.total}</li><li>${x.tempoOk ? '✅' : '⬜'} Tempo ativo: ${fmt(x.tempoSeg)} de ${fmt(x.minSeg)} (20% de ${d.horas} h)</li>`;
        if (x.cool) h += `<li>⏳ Nova tentativa liberada em ${new Date(x.cool).toLocaleString('pt-BR')}</li>`;
        h += '</ul>';
        if (!x.temProva) h += '<p class="small mute">🚧 Prova desta disciplina em produção.</p>';
        else if (x.aprovada) h += `<p class="small">✔ Aprovada. <a href="#/prova/${esc(cid)}/${esc(d.id)}">Ver resultado</a></p>`;
        else if (x.andamento) h += `<a class="btn" href="#/prova/${esc(cid)}/${esc(d.id)}">Continuar a prova</a>`;
        else if (x.pendente) h += `<a class="btn ghost" href="#/prova/${esc(cid)}/${esc(d.id)}">Ver prova enviada (aguardando correção)</a>`;
        else if (x.liberada) h += `<a class="btn" href="#/prova/${esc(cid)}/${esc(d.id)}">Fazer a prova</a>`;
        else h += '<button class="btn" disabled>Prova bloqueada</button>';
        h += '</div>';
        if (d.entrega) h += `<p class="small"><b>Entrega:</b> ${esc(d.entrega)}</p>`;
        if (d.dominio) h += `<p class="small"><b>Domínio comprovado quando:</b> ${esc(d.dominio)}</p>`;
      }
      h += '</div></details>';
    });
    h += '<h2>Avaliação geral e aprovação</h2><div class="card small">';
    h += `<div>${ci.todasAprov ? '✅' : '⬜'} Todas as disciplinas aprovadas</div><div>${ci.notaPond != null && ci.notaPond >= 7.5 ? '✅' : '⬜'} Média ponderada de 7,5 ou mais (atual: ${num(ci.notaPond)})</div><div>${ci.entregasOk ? '✅' : '⬜'} Entregas obrigatórias concluídas</div>`;
    h += `<p class="mute">${ci.geralLiberada ? 'Avaliação geral liberada (ainda em produção nesta versão). Peça no chat: "Avaliação geral".' : 'A avaliação geral libera quando os dois primeiros itens estiverem cumpridos.'}</p></div>`;
    if (c.checklist && c.checklist.length) {
      h += '<h2>Checklist de prontidão</h2><div class="card"><p class="small mute">Marque só o que for verdade comprovada.</p>';
      c.checklist.forEach(function (txt, i) { h += `<label class="chk"><input type="checkbox" data-bind="check" data-cid="${esc(cid)}" data-i="${i}"${cst.checklist[i] ? ' checked' : ''}><span>${esc(txt)}</span></label>`; });
      h += '</div>';
    }
    if (c.nota) h += `<p class="small mute">${esc(c.nota)}</p>`;
    return h;
  }

  function quizHtml(e, st) {
    var h = '';
    e.quiz.forEach(function (q, i) {
      var resp = st.quiz ? st.quiz.respostas[i] : null, corrigido = !!st.quiz;
      h += `<div class="q"><div class="enun${q.q.indexOf('\n') >= 0 ? ' codey' : ''}">${i + 1}. ${esc(q.q)}</div>`;
      q.opcoes.forEach(function (o, k) {
        var cls = '';
        if (corrigido) { if (k === q.ok) cls = ' right'; else if (k === resp) cls = ' wrong'; }
        h += `<label class="opt${cls}"><input type="radio" name="qz${i}" value="${k}"${resp === k ? ' checked' : ''}><span>${esc(o)}</span></label>`;
      });
      if (corrigido) h += `<div class="why">${resp === q.ok ? '✅ Certo.' : '❌ Não foi essa.'} ${esc(q.porque || '')}</div>`;
      h += '</div>';
    });
    return h;
  }

  function aula(cid, eid) {
    var c = C.curso(cid); if (!c) return notFound();
    var loc = C.acharEtapa(c, eid); if (!loc) return notFound();
    var e = loc.e, d = loc.d, st = C.es(cid, eid);
    var h = bannerTeste() + `<p><a href="#/curso/${esc(cid)}">← ${esc(c.nome)}</a></p>`;
    if (!e.md) return h + `<div class="card"><h1>${esc(e.titulo)}</h1><p>🚧 Esta etapa ainda está em produção. Peça no chat: <b>Curso: ${esc(c.nome)}</b> para saber o que vem a seguir.</p></div>`;
    if (!C.etapaLiberada(c, loc.di, loc.ei)) return h + `<div class="card"><h1>${esc(e.titulo)}</h1><p>🔒 Conclua a etapa anterior para liberar esta.</p></div>`;
    C.setCtx({ cid: cid, did: d.id, eid: eid, kind: 'aula' });
    h += `<h1>${esc(e.id)} · ${esc(e.titulo)}</h1><div class="row wrap" style="margin-bottom:8px"><span class="chip">${esc(d.id)}</span><span class="chip">~${e.min} min</span><span class="chip acc">ativo nesta etapa: <span id="tmpEt">${fmt(st.tempoSeg)}</span></span>${st.feito ? '<span class="chip ok">✔ concluída</span>' : ''}${st.revisar ? '<span class="chip bad">revisar</span>' : ''}</div>`;
    if (st.comentario) h += `<div class="card" style="border-color:var(--acc2)"><b>Comentário do Claude</b> · nota ${num(st.nota)}<p>${esc(st.comentario)}</p></div>`;
    h += `<div class="lesson">${MD.render(e.md)}</div>`;
    h += `<h2>Caderno</h2><div class="card"><p class="small mute">Faça os exercícios no papel primeiro. Aqui você pode digitar as respostas para mandar ao Claude (opcional).</p><textarea data-bind="caderno" data-cid="${esc(cid)}" data-eid="${esc(eid)}" placeholder="Exercício 1: ...">${esc(st.caderno)}</textarea><label class="chk"><input type="checkbox" data-bind="enviar" data-cid="${esc(cid)}" data-eid="${esc(eid)}"${st.enviar ? ' checked' : ''}><span>Enviar este caderno para correção no próximo log</span></label></div>`;
    if (e.quiz && e.quiz.length) {
      h += `<h2>Checagem rápida</h2><p class="small mute">Acerte pelo menos 2 de ${e.quiz.length} para poder concluir a etapa. Dá para refazer.</p><div id="quiz">${quizHtml(e, st)}</div><button class="btn" data-act="quiz-check" data-cid="${esc(cid)}" data-eid="${esc(eid)}">Conferir respostas</button>`;
      if (st.quiz) h += `<p class="small mute">Última conferência: ${st.quiz.acertos}/${st.quiz.total} · tentativa ${st.quiz.tentativas}</p>`;
    }
    h += `<h2>Concluir</h2><div class="card"><label class="chk"><input type="checkbox" data-bind="li" data-cid="${esc(cid)}" data-eid="${esc(eid)}"${st.li ? ' checked' : ''}><span>Li a aula inteira</span></label><label class="chk"><input type="checkbox" data-bind="exerc" data-cid="${esc(cid)}" data-eid="${esc(eid)}"${st.exerc ? ' checked' : ''}><span>Fiz os exercícios no caderno</span></label>`;
    var pode = C.podeConcluir(cid, e);
    if (st.feito) h += '<p>✅ Etapa concluída. Mande o caderno ao Claude para a nota oficial.</p>';
    else {
      h += `<button class="btn" data-act="concluir" data-cid="${esc(cid)}" data-eid="${esc(eid)}"${pode ? '' : ' disabled'}>Concluir etapa</button>`;
      if (!pode) h += '<p class="small mute">Marque os dois itens acima e acerte o quiz para liberar.</p>';
      if (C.state().modoTeste) h += ` <button class="btn ghost small" data-act="concluir-teste" data-cid="${esc(cid)}" data-eid="${esc(eid)}">Concluir (modo teste)</button>`;
    }
    h += '</div>';
    var prev = d.etapas[loc.ei - 1], next = d.etapas[loc.ei + 1];
    h += '<div class="row" style="margin:16px 0">' + (prev ? `<a class="btn ghost grow" href="#/aula/${esc(cid)}/${esc(prev.id)}">← ${esc(prev.id)}</a>` : '<span class="grow"></span>') + (next ? `<a class="btn ghost grow" href="#/aula/${esc(cid)}/${esc(next.id)}">${esc(next.id)} →</a>` : `<a class="btn ghost grow" href="#/curso/${esc(cid)}">Voltar ao curso</a>`) + '</div>';
    return h;
  }

  function provaView(cid, did) {
    var c = C.curso(cid); if (!c) return notFound();
    var idx = -1; c.disciplinas.forEach(function (d, i) { if (d.id === did) idx = i; });
    if (idx < 0) return notFound();
    var x = C.discInfo(c, idx), d = x.d, st = C.ds(cid, did);
    var h = bannerTeste() + `<p><a href="#/curso/${esc(cid)}">← ${esc(c.nome)}</a></p><h1>Prova ${esc(d.id)}: ${esc(d.nome)}</h1>`;
    if (!d.prova) return h + '<div class="card">🚧 Prova em produção.</div>';

    if (x.andamento) {
      C.setCtx({ cid: cid, did: did, kind: 'prova' });
      var t = x.andamento;
      h += `<div class="card"><div class="row"><div class="grow">Tentativa ${t.tentativa} · responda com calma e sem consultar.</div><span class="chip acc">⏱ <span id="tmpProva">${fmt(t.tempoSeg)}</span></span></div></div>`;
      t.questoes.forEach(function (q, i) {
        h += `<div class="q"><div class="enun${q.enunciado.indexOf('\n') >= 0 ? ' codey' : ''}">${i + 1}. ${esc(q.enunciado)}</div>`;
        if (q.tipo === 'obj') {
          q.opcoes.forEach(function (o, k) { h += `<label class="opt"><input type="radio" name="pq_${esc(q.id)}" value="${k}" data-bind="pq" data-qid="${esc(q.id)}"${q.resposta === k ? ' checked' : ''}><span>${esc(o)}</span></label>`; });
        } else {
          h += `<textarea data-bind="pd" data-qid="${esc(q.id)}" placeholder="Escreva sua resposta (pseudocódigo, passos, explicação)…">${esc(q.resposta || '')}</textarea><p class="small mute">Dissertativa: o Claude corrige quando você mandar o log.</p>`;
        }
        h += '</div>';
      });
      h += `<div class="row"><button class="btn grow" data-act="prova-enviar" data-cid="${esc(cid)}" data-did="${esc(did)}">Enviar prova</button><button class="btn warn" data-act="prova-desistir" data-cid="${esc(cid)}" data-did="${esc(did)}">Desistir</button></div>`;
      return h;
    }

    /* resultados e histórico */
    var finais = st.provas.filter(function (p) { return p.status !== 'andamento'; });
    if (finais.length) {
      var u = finais[finais.length - 1];
      h += '<div class="card">';
      if (u.status === 'pendente') h += `<b>⏳ Prova enviada (tentativa ${u.tentativa}).</b><p>Nota das objetivas: ${num(u.notaObjetiva)}. As dissertativas ainda precisam ser corrigidas: vá em <a href="#/log">Log</a>, gere o log, cole no chat com a palavra <b>Retomar</b> e depois importe aqui o bloco de atualização que o Claude devolver.</p>`;
      else {
        h += `<b>Nota da prova: ${num(u.nota)}</b>`;
        h += `<div class="kv" style="margin:8px 0"><b>Média das etapas (50%)</b><span>${num(x.mediaEtapas == null ? null : Math.round(x.mediaEtapas * 10) / 10)}</span><b>Prova (50%)</b><span>${num(x.notaProva)}</span><b>Nota da disciplina</b><span><b style="color:var(--ink)">${num(x.nota)}</b></span></div>`;
        h += x.aprovada ? '<p>✅ <b>Aprovado!</b> A próxima disciplina está liberada.</p>' : `<p>❌ <b>Abaixo de 7.</b> Revise as etapas com nota baixa. ${x.cool ? 'Nova tentativa liberada em ' + new Date(x.cool).toLocaleString('pt-BR') + '.' : ''}</p>`;
      }
      h += '</div>';
      h += '<h2>Gabarito e comentários</h2>';
      u.questoes.forEach(function (q, i) {
        h += `<div class="q"><div class="enun${q.enunciado.indexOf('\n') >= 0 ? ' codey' : ''}">${i + 1}. ${esc(q.enunciado)}</div>`;
        if (q.tipo === 'obj') {
          q.opcoes.forEach(function (o, k) { var cls = k === q.ok ? ' right' : (k === q.resposta ? ' wrong' : ''); h += `<div class="opt${cls}"><span>${esc(o)}</span></div>`; });
          h += `<div class="why">${q.correta ? '✅ Certo.' : '❌ Errado.'} ${esc(q.porque || '')}</div>`;
        } else {
          h += `<div class="card" style="box-shadow:none"><div class="small mute">Sua resposta</div><div style="white-space:pre-wrap">${esc(q.resposta || '(em branco)')}</div></div>`;
          h += q.notaIA == null ? '<div class="why">⏳ Aguardando correção.</div>' : `<div class="why"><b>Nota ${num(q.notaIA)}/10.</b> ${esc(q.comentario || '')}</div>`;
        }
        h += '</div>';
      });
      if (finais.length > 1) h += `<p class="small mute">Tentativas anteriores: ${finais.slice(0, -1).map(function (p) { return '#' + p.tentativa + ' = ' + num(p.nota); }).join(' · ')}</p>`;
    }

    if (x.liberada) {
      h += `<div class="card"><b>Prova liberada ✅</b><p class="small">${d.prova.nObj} objetivas + ${d.prova.nDiss || 0} dissertativas, sorteadas de um banco maior. Para aprovar: nota da disciplina 7 ou mais (50% etapas + 50% prova).</p><button class="btn" data-act="prova-iniciar" data-cid="${esc(cid)}" data-did="${esc(did)}">${finais.length ? 'Fazer nova tentativa' : 'Começar a prova'}</button></div>`;
    } else if (!x.aprovada && !x.pendente) {
      h += `<div class="card"><b>Prova bloqueada</b><ul class="crit small"><li>${x.unlocked ? '✅' : '⬜'} Disciplina liberada (anterior aprovada)</li><li>${x.etapasOk ? '✅' : '⬜'} Etapas concluídas: ${x.feitas}/${x.total}</li><li>${x.tempoOk ? '✅' : '⬜'} Tempo ativo: ${fmt(x.tempoSeg)} de ${fmt(x.minSeg)}</li>${x.cool ? '<li>⏳ Espera de 24 h após reprovação, até ' + new Date(x.cool).toLocaleString('pt-BR') + '</li>' : ''}</ul></div>`;
    }
    return h;
  }

  function logView() {
    var s = C.state();
    var enviar = [];
    C.cursos().forEach(function (c) { c.disciplinas.forEach(function (d) { d.etapas.forEach(function (e) { if (C.es(c.id, e.id).enviar) enviar.push(e.id); }); }); });
    var h = '<h1>Log de progresso</h1><div class="card"><p>Como usar: <b>1)</b> gere o log aqui; <b>2)</b> copie e cole no chat com o Claude, começando por <b>Retomar</b>; <b>3)</b> o Claude responde com o próximo passo e, quando houver correções, com um <b>bloco de atualização</b>; <b>4)</b> cole o bloco aqui embaixo.</p></div>';
    h += `<div class="card"><label class="small mute">O que você quer do Claude (opcional)</label><textarea id="pedido" data-bind="draft" data-k="pedido" style="min-height:70px" placeholder="Ex.: corrigir as dissertativas da prova e revisar a etapa DEV1-E4">${esc(draft.pedido)}</textarea><label class="small mute">Dúvidas e anotações (opcional)</label><textarea id="anot" data-bind="draft" data-k="anotacoes" style="min-height:70px" placeholder="Ex.: não entendi a diferença entre DIV e MOD">${esc(draft.anotacoes)}</textarea>${enviar.length ? `<p class="small">Cadernos que irão para correção: <b>${esc(enviar.join(', '))}</b></p>` : '<p class="small mute">Nenhum caderno marcado para correção.</p>'}<button class="btn" data-act="log-gerar">Gerar log</button></div>`;
    if (ultimoLog) {
      h += `<div class="card"><b>Log gerado</b> <span class="chip ok">integridade ${esc(ultimoLog.dados.integridade)}</span><textarea class="mono" id="logTxt" readonly>${esc(ultimoLog.texto)}</textarea><div class="row wrap" style="margin-top:8px"><button class="btn" data-act="log-copiar">Copiar</button><button class="btn ghost" data-act="log-baixar">Baixar .txt</button></div><p class="small mute">Depois de colar, escreva <b>Retomar</b> antes ou depois do log.</p></div>`;
    }
    h += `<h2>Importar atualização do Claude</h2><div class="card"><p class="small mute">Cole aqui o bloco que o Claude devolveu (começa com {"trilha_update": 1 …}).</p><textarea class="mono" id="upd" data-bind="draft" data-k="update" style="min-height:130px">${esc(draft.update)}</textarea><button class="btn" data-act="update-aplicar" style="margin-top:8px">Aplicar atualização</button>`;
    if (ultimoRelatorio) h += `<ul class="small" style="padding-left:18px">${ultimoRelatorio.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('')}</ul>`;
    h += '</div>';
    if (s.mensagens && s.mensagens.length) {
      h += '<h2>Mensagens do Claude</h2>';
      s.mensagens.slice(-5).reverse().forEach(function (m) { h += `<div class="card small"><span class="mute">${new Date(m.em).toLocaleString('pt-BR')}</span><div style="white-space:pre-wrap">${esc(m.texto)}</div></div>`; });
    }
    if (s.logs.length) h += `<h2>Histórico</h2><div class="card small">${s.logs.slice().reverse().slice(0, 10).map(function (l) { return `${esc(l.id)} · ${new Date(l.em).toLocaleString('pt-BR')} · ${esc(l.hash)}`; }).join('<br>')}</div>`;
    return h;
  }

  function configView() {
    var s = C.state();
    var h = '<h1>Configurações</h1>';
    h += `<div class="card"><label class="small mute">Apelido</label><input type="text" data-bind="apelido" value="${esc(s.apelido)}" maxlength="30"><label class="small mute" style="display:block;margin-top:10px">Pausar o tempo ativo após (segundos sem interação)</label><input type="number" data-bind="idle" value="${s.idleSeg}" min="30" max="900"><label class="small mute" style="display:block;margin-top:10px">Meta semanal (horas)</label><input type="number" data-bind="meta" value="${s.metaSemanaH}" min="1" max="60"><label class="small mute" style="display:block;margin-top:10px">Tema</label><select data-bind="tema" style="width:100%;min-height:44px"><option value="auto"${s.tema === 'auto' || !s.tema ? ' selected' : ''}>Automático</option><option value="light"${s.tema === 'light' ? ' selected' : ''}>Claro</option><option value="dark"${s.tema === 'dark' ? ' selected' : ''}>Escuro</option></select></div>`;
    h += `<div class="card"><label class="chk"><input type="checkbox" data-bind="teste"${s.modoTeste ? ' checked' : ''}><span><b>Modo teste</b>: desativa os bloqueios (tempo mínimo, ordem, 24 h) para você explorar o app. O log avisa o Claude. Não vale como progresso real.</span></label></div>`;
    h += `<h2>Backup</h2><div class="card"><p class="small mute">PC e celular têm progresso separado. Para levar o progresso de um para o outro, exporte aqui e importe no outro aparelho.</p><div class="row wrap"><button class="btn" data-act="backup-export">Exportar backup</button><label class="btn ghost" style="cursor:pointer">Importar backup<input type="file" accept=".json,application/json" data-act="backup-import" hidden></label></div></div>`;
    h += `<h2>Importar curso</h2><div class="card"><p class="small mute">Aceita o arquivo .js gerado pelo build (cursos/nome.js) ou um .json no mesmo formato.</p><label class="btn ghost" style="cursor:pointer">Escolher arquivo<input type="file" accept=".js,.json" data-act="curso-import" hidden></label>${ultimoCursoMsg ? '<p class="small">' + esc(ultimoCursoMsg) + '</p>' : ''}`;
    var ex = s.extras || []; if (ex.length) h += `<p class="small mute">Importados: ${ex.map(function (c) { return esc(c.id) + ' v' + esc(c.versao); }).join(', ')}</p>`;
    h += '</div>';
    h += `<h2>Zona de perigo</h2><div class="card"><button class="btn warn" data-act="reset">Apagar todo o progresso</button></div>`;
    h += `<p class="small mute">Trilha v${esc(C.APP_VERSION)} · os dados ficam só neste aparelho (localStorage).</p>`;
    return h;
  }

  /* ---------- roteador ---------- */
  var ativo = 'home';
  function render(keep) {
    var p = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    var y = window.scrollY;
    C.setCtx(null);
    var v;
    try {
      switch (p[0]) {
        case 'cursos': v = cursosView(); ativo = 'cursos'; break;
        case 'curso': v = cursoView(p[1]); ativo = 'cursos'; break;
        case 'aula': v = aula(p[1], p[2]); ativo = 'cursos'; break;
        case 'prova': v = provaView(p[1], p[2]); ativo = 'cursos'; break;
        case 'log': v = logView(); ativo = 'log'; break;
        case 'config': v = configView(); ativo = 'config'; break;
        default: v = home(); ativo = 'home';
      }
    } catch (err) { v = `<div class="card"><b>Algo deu errado.</b><pre style="white-space:pre-wrap">${esc(String(err && err.stack || err))}</pre></div>`; }
    app.innerHTML = v;
    Array.prototype.forEach.call(document.querySelectorAll('#nav a'), function (a) { a.classList.toggle('on', a.getAttribute('data-n') === ativo); });
    window.scrollTo(0, keep ? y : 0);
    updatePill();
  }
  window.addEventListener('hashchange', function () { render(false); });

  /* ---------- eventos ---------- */
  function copiar(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(texto).then(function () { return true; }, function () { return false; });
    var ta = document.getElementById('logTxt'); if (ta) { ta.select(); try { return Promise.resolve(document.execCommand('copy')); } catch (e) { } }
    return Promise.resolve(false);
  }
  function baixar(nome, texto, tipo) {
    var b = new Blob([texto], { type: tipo || 'text/plain' }), a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = nome; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function lerArquivo(file) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(String(r.result)); }; r.onerror = rej; r.readAsText(file); }); }

  var ACOES = {
    'nome-salvar': function () { var v = (document.getElementById('nomeIn').value || '').trim(); if (v) { C.state().apelido = v; C.save(); render(true); } },
    'quiz-check': function (el) {
      var c = C.curso(el.dataset.cid), loc = C.acharEtapa(c, el.dataset.eid), resp = [], falta = false;
      loc.e.quiz.forEach(function (q, i) { var r = document.querySelector('input[name="qz' + i + '"]:checked'); if (!r) falta = true; resp.push(r ? +r.value : null); });
      if (falta) return toast('Responda todas as perguntas antes de conferir.');
      var r = C.quizResultado(c.id, loc.e, resp);
      toast(r.passou ? 'Boa! ' + r.acertos + '/' + r.total + ' certas.' : r.acertos + '/' + r.total + ': releia a aula e tente de novo.');
      render(true);
    },
    'concluir': function (el) { try { C.concluirEtapa(el.dataset.cid, el.dataset.eid); toast('Etapa concluída! 🎉'); render(true); } catch (e) { toast(e.message); } },
    'concluir-teste': function (el) { try { C.concluirEtapa(el.dataset.cid, el.dataset.eid, true); toast('Concluída (modo teste).'); render(true); } catch (e) { toast(e.message); } },
    'prova-iniciar': function (el) { try { C.iniciarProva(el.dataset.cid, el.dataset.did); render(false); } catch (e) { toast(e.message); } },
    'prova-enviar': function (el) {
      var c = C.curso(el.dataset.cid), st = C.ds(c.id, el.dataset.did), t = st.provas.filter(function (p) { return p.status === 'andamento'; })[0];
      var sem = t.questoes.filter(function (q) { return q.tipo === 'obj' && q.resposta == null; }).length;
      if (sem && !window.confirm('Há ' + sem + ' questão(ões) objetiva(s) sem resposta. Enviar mesmo assim?')) return;
      C.enviarProva(el.dataset.cid, el.dataset.did); toast('Prova enviada.'); render(false);
    },
    'prova-desistir': function (el) { if (window.confirm('Desistir desta tentativa? Ela não conta como tentativa.')) { C.desistirProva(el.dataset.cid, el.dataset.did); location.hash = '#/curso/' + el.dataset.cid; } },
    'log-gerar': function () {
      draft.pedido = document.getElementById('pedido').value; draft.anotacoes = document.getElementById('anot').value;
      ultimoLog = C.gerarLog({ pedido: draft.pedido, anotacoes: draft.anotacoes });
      render(true); toast('Log gerado. Copie e cole no chat.');
    },
    'log-copiar': function () { copiar(ultimoLog.texto).then(function (ok) { toast(ok ? 'Log copiado.' : 'Não consegui copiar: selecione o texto e copie à mão.'); }); },
    'log-baixar': function () { baixar('trilha-log-' + ultimoLog.id + '.txt', ultimoLog.texto); },
    'update-aplicar': function () {
      draft.update = document.getElementById('upd').value;
      try { ultimoRelatorio = C.aplicarUpdate(draft.update); draft.update = ''; toast('Atualização aplicada.'); } catch (e) { ultimoRelatorio = ['✗ ' + e.message]; }
      render(true);
    },
    'backup-export': function () { baixar('trilha-backup-' + C.dayKey() + '.json', C.exportBackup(), 'application/json'); },
    'reset': function () { if (window.prompt('Isto apaga TODO o progresso deste aparelho. Digite APAGAR para confirmar:') === 'APAGAR') { C.reset(); toast('Progresso apagado.'); location.hash = '#/'; render(false); } }
  };
  app.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-act]'); if (!el || el.tagName === 'INPUT') return;
    var f = ACOES[el.getAttribute('data-act')]; if (f) { ev.preventDefault(); f(el); }
  });
  var timerSave = null;
  function salvarLogo() { clearTimeout(timerSave); timerSave = setTimeout(C.save, 400); }
  app.addEventListener('input', function (ev) {
    var el = ev.target, b = el.getAttribute('data-bind');
    if (b === 'caderno') { C.es(el.dataset.cid, el.dataset.eid).caderno = el.value; salvarLogo(); }
    else if (b === 'pd') { var cur = location.hash.split('/'); C.responderRascunho(decodeURIComponent(cur[2]), decodeURIComponent(cur[3]), el.dataset.qid, el.value); salvarLogo(); }
    else if (b === 'draft') { draft[el.dataset.k] = el.value; }
    else if (b === 'apelido') { C.state().apelido = el.value.trim(); salvarLogo(); }
  });
  app.addEventListener('change', function (ev) {
    var el = ev.target, b = el.getAttribute('data-bind'), a = el.getAttribute('data-act'), s = C.state();
    if (a === 'backup-import' && el.files[0]) {
      lerArquivo(el.files[0]).then(function (t) { if (window.confirm('Isto substitui o progresso deste aparelho pelo do backup. Continuar?')) { C.importBackup(t); toast('Backup importado.'); applyTheme(); render(false); } }).catch(function (e) { toast(e.message || 'Falha ao importar.'); });
      return;
    }
    if (a === 'curso-import' && el.files[0]) {
      lerArquivo(el.files[0]).then(function (t) { var c = C.importarCurso(t); ultimoCursoMsg = 'Curso importado: ' + c.nome + ' (v' + c.versao + ').'; render(true); }).catch(function (e) { ultimoCursoMsg = '✗ ' + e.message; render(true); });
      return;
    }
    if (b === 'li' || b === 'exerc') { C.es(el.dataset.cid, el.dataset.eid)[b] = el.checked; C.save(); render(true); }
    else if (b === 'enviar') { C.es(el.dataset.cid, el.dataset.eid).enviar = el.checked; C.save(); }
    else if (b === 'check') { C.cs(el.dataset.cid).checklist[el.dataset.i] = el.checked; C.save(); }
    else if (b === 'pq') { var cur = location.hash.split('/'); C.responderRascunho(decodeURIComponent(cur[2]), decodeURIComponent(cur[3]), el.dataset.qid, +el.value); C.save(); }
    else if (b === 'idle') { s.idleSeg = Math.max(30, Math.min(900, +el.value || 180)); C.save(); }
    else if (b === 'meta') { s.metaSemanaH = Math.max(1, Math.min(60, +el.value || 7)); C.save(); }
    else if (b === 'teste') { s.modoTeste = el.checked; C.save(); render(true); }
    else if (b === 'tema') { s.tema = el.value; C.save(); applyTheme(); }
  });
  ['pointerdown', 'keydown', 'scroll', 'touchstart', 'mousemove', 'input'].forEach(function (n) { window.addEventListener(n, C.touch, { passive: true, capture: true }); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) C.save(); });
  window.addEventListener('pagehide', C.save);

  function applyTheme() { var t = C.state().tema; if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme'); }
  function updatePill() {
    pill.textContent = (C.pausado() ? '⏸ ' : '⏱ ') + fmt(C.hojeSeg()) + ' hoje';
    pill.className = 'pill ' + (C.pausado() ? 'pause' : 'on');
    var a = document.getElementById('tmpEt');
    if (a) { var h = location.hash.split('/'); a.textContent = fmt(C.es(decodeURIComponent(h[2]), decodeURIComponent(h[3])).tempoSeg); }
    var b = document.getElementById('tmpProva');
    if (b) { var h2 = location.hash.split('/'), t = C.ds(decodeURIComponent(h2[2]), decodeURIComponent(h2[3])).provas.filter(function (p) { return p.status === 'andamento'; })[0]; if (t) b.textContent = fmt(t.tempoSeg); }
  }
  setInterval(function () { C.tick(); updatePill(); }, 1000);

  applyTheme();
  render(false);
  T.ui = { render: render, fmt: fmt };
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) { navigator.serviceWorker.register('sw.js').catch(function () { }); }
})();
