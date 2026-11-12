/* Renderizador de Markdown (subconjunto do Obsidian usado nas aulas):
   títulos, parágrafos, **negrito**, *itálico*, `código`, listas (aninhadas), checkboxes, tabelas,
   blocos de código, citações e callouts (> [!tipo] / > [!tipo]- dobrável), [[wikilinks]]. */
(function (global) {
  'use strict';
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function inline(s) {
    var codes = [];
    s = s.replace(/`([^`]+)`/g, function (m, c) { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = esc(s);
    s = s.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function (m, a, b) { return '<span class="wl">' + (b || a) + '</span>'; });
    s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*\w])\*([^*\s][^*\n]*?)\*(?![*\w])/g, '$1<em>$2</em>');
    s = s.replace(/\u0000(\d+)\u0000/g, function (m, i) { return '<code>' + esc(codes[+i]) + '</code>'; });
    return s;
  }

  var TITULOS = { abstract: 'Resumo', question: 'Pergunta', success: 'Resposta', tip: 'Dica', warning: 'Atenção', info: 'Info', note: 'Nota', danger: 'Cuidado', example: 'Exemplo' };

  function blank(l) { return /^\s*$/.test(l); }
  function isFence(l) { return /^\s*```/.test(l); }
  function isHeading(l) { return /^(#{1,6})\s+/.test(l); }
  function isHr(l) { return /^\s*(-{3,}|\*{3,})\s*$/.test(l); }
  function isQuote(l) { return /^\s*>/.test(l); }
  function isItem(l) { return /^\s*([-*]|\d+\.)\s+/.test(l); }
  function isSep(l) { return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(l) && l.indexOf('-') >= 0; }
  function isTableStart(lines, i) { return /^\s*\|/.test(lines[i]) && i + 1 < lines.length && isSep(lines[i + 1]); }
  function indentOf(l) { return l.match(/^\s*/)[0].length; }
  function cells(l) { var t = l.trim().replace(/^\|/, '').replace(/\|$/, ''); return t.split('|').map(function (c) { return c.trim(); }); }

  function blocks(lines) {
    var out = [], i = 0, m;
    while (i < lines.length) {
      var l = lines[i];
      if (blank(l)) { i++; continue; }
      if (isFence(l)) {
        var buf = []; i++;
        while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        out.push('<pre><code>' + esc(buf.join('\n')) + '</code></pre>');
        continue;
      }
      if ((m = l.match(/^(#{1,6})\s+(.*)$/))) { out.push('<h' + m[1].length + '>' + inline(m[2]) + '</h' + m[1].length + '>'); i++; continue; }
      if (isHr(l)) { out.push('<hr>'); i++; continue; }
      if (isQuote(l)) {
        var q = [];
        while (i < lines.length && isQuote(lines[i])) { q.push(lines[i].replace(/^\s*> ?/, '')); i++; }
        var cm = q[0].match(/^\[!(\w+)\]([+-])?\s*(.*)$/);
        if (cm) {
          var tipo = cm[1].toLowerCase(), dobra = cm[2], titulo = cm[3] || TITULOS[tipo] || tipo;
          var inner = blocks(q.slice(1));
          if (dobra) {
            out.push('<details class="callout c-' + tipo + '"' + (dobra === '+' ? ' open' : '') + '><summary>' + inline(titulo) + '</summary><div class="cb">' + inner + '</div></details>');
          } else {
            out.push('<div class="callout c-' + tipo + '"><div class="ct">' + inline(titulo) + '</div><div class="cb">' + inner + '</div></div>');
          }
        } else {
          out.push('<blockquote>' + blocks(q) + '</blockquote>');
        }
        continue;
      }
      if (isTableStart(lines, i)) {
        var head = cells(lines[i]); i += 2;
        var rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(cells(lines[i])); i++; }
        var t = '<div class="tw"><table><thead><tr>' + head.map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead><tbody>';
        rows.forEach(function (r) { t += '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>'; });
        out.push(t + '</tbody></table></div>');
        continue;
      }
      if (isItem(l)) {
        var base = indentOf(l), ordenada = /^\s*\d+\./.test(l), items = [];
        while (i < lines.length) {
          var x = lines[i];
          if (blank(x)) {
            var j = i; while (j < lines.length && blank(lines[j])) j++;
            if (j < lines.length && (indentOf(lines[j]) > base || (isItem(lines[j]) && indentOf(lines[j]) === base))) { i = j; continue; }
            break;
          }
          var mi = x.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
          if (mi && indentOf(x) === base) { items.push({ t: mi[3], c: [] }); i++; continue; }
          if (items.length && indentOf(x) > base) { items[items.length - 1].c.push(x); i++; continue; }
          break;
        }
        var tag = ordenada ? 'ol' : 'ul';
        var h = '<' + tag + '>';
        items.forEach(function (it) {
          var cb = it.t.match(/^\[( |x|X)\]\s+(.*)$/);
          var txt = cb ? '<input type="checkbox" disabled' + (cb[1] !== ' ' ? ' checked' : '') + '> ' + inline(cb[2]) : inline(it.t);
          var ch = '';
          if (it.c.length) {
            var mn = Math.min.apply(null, it.c.map(indentOf));
            ch = blocks(it.c.map(function (z) { return z.slice(mn); }));
          }
          h += '<li>' + txt + ch + '</li>';
        });
        out.push(h + '</' + tag + '>');
        continue;
      }
      var p = [];
      while (i < lines.length && !blank(lines[i]) && !isFence(lines[i]) && !isHeading(lines[i]) && !isHr(lines[i]) && !isQuote(lines[i]) && !isItem(lines[i]) && !isTableStart(lines, i)) { p.push(inline(lines[i].trim())); i++; }
      if (!p.length) { p.push(inline(lines[i])); i++; }
      out.push('<p>' + p.join('<br>') + '</p>');
    }
    return out.join('\n');
  }

  function render(src) { return blocks(String(src || '').replace(/\r\n/g, '\n').split('\n')); }
  global.Trilha = global.Trilha || {};
  global.Trilha.md = { render: render, esc: esc, inline: inline };
})(window);
