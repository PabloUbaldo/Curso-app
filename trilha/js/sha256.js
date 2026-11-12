/* SHA-256 em JavaScript puro (funciona em file:// e sem HTTPS). Usado no código de integridade do log. */
(function (global) {
  'use strict';
  var primes = [];
  for (var n = 2; primes.length < 64; n++) {
    var ok = true;
    for (var i = 0; i < primes.length; i++) { if (n % primes[i] === 0) { ok = false; break; } }
    if (ok) primes.push(n);
  }
  function frac(x) { return x - Math.floor(x); }
  var K = primes.map(function (p) { return (Math.floor(frac(Math.cbrt(p)) * 4294967296)) >>> 0; });
  var H0 = primes.slice(0, 8).map(function (p) { return (Math.floor(frac(Math.sqrt(p)) * 4294967296)) >>> 0; });
  function ror(x, n) { return (x >>> n) | (x << (32 - n)); }

  function sha256(str) {
    var bytes = new TextEncoder().encode(str);
    var l = bytes.length;
    var padded = new Uint8Array(((l + 9 + 63) >> 6) << 6);
    padded.set(bytes);
    padded[l] = 0x80;
    var dv = new DataView(padded.buffer);
    dv.setUint32(padded.length - 4, (l * 8) >>> 0);
    dv.setUint32(padded.length - 8, Math.floor((l * 8) / 4294967296));
    var H = H0.slice();
    var w = new Uint32Array(64);
    for (var off = 0; off < padded.length; off += 64) {
      for (var t = 0; t < 16; t++) w[t] = dv.getUint32(off + t * 4);
      for (t = 16; t < 64; t++) {
        var s0 = ror(w[t - 15], 7) ^ ror(w[t - 15], 18) ^ (w[t - 15] >>> 3);
        var s1 = ror(w[t - 2], 17) ^ ror(w[t - 2], 19) ^ (w[t - 2] >>> 10);
        w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
      }
      var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (t = 0; t < 64; t++) {
        var S1 = ror(e, 6) ^ ror(e, 11) ^ ror(e, 25);
        var ch = (e & f) ^ (~e & g);
        var t1 = (h + S1 + ch + K[t] + w[t]) >>> 0;
        var S0 = ror(a, 2) ^ ror(a, 13) ^ ror(a, 22);
        var maj = (a & b) ^ (a & c) ^ (b & c);
        var t2 = (S0 + maj) >>> 0;
        h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
      }
      H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
    }
    return H.map(function (x) { return ('00000000' + x.toString(16)).slice(-8); }).join('');
  }
  global.Trilha = global.Trilha || {};
  global.Trilha.sha256 = sha256;
})(window);
