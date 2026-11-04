/* Deutsch lernen B1/B2 – App-Logik
   Inhalte kommen aus content/*.json (werden bei jedem Start frisch geladen).
   Fortschritt und Statistik liegen im Speicher des Geräts (localStorage). */
(function () {
"use strict";

/* ================= Hilfen ================= */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rnd = a => a[Math.floor(Math.random() * a.length)];
const pad = n => String(n).padStart(2, "0");
function dayKey(d = new Date()) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
function dayNum(d = new Date()) { return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }
function fmtDay(k) { const [y, m, d] = k.split("-"); return d + "." + m + "."; }
const WD = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
function wdOf(k) { const [y, m, d] = k.split("-").map(Number); return WD[new Date(y, m - 1, d).getDay()]; }
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
};
function toast(t, ms = 2600) { const el = $("#toast"); el.textContent = t; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => el.hidden = true, ms); }
function pct(r, n) { return n ? Math.round(100 * r / n) : 0; }

/* ================= Zustand ================= */
const INTERVALS = [0, 1, 3, 7, 14, 30, 60, 120];
let W = [], S = [], T = [], MAN = {};
let WBYID = {}, SBYID = {};
let P = Object.assign({ w: {}, s: {}, newDay: 0, newCount: 0, fehler: {}, seenVersion: 0, drafts: {}, schreibenDone: {} }, LS.get("dl-prog", {}));
let ST = Object.assign({ days: {} }, LS.get("dl-stats", {}));
let SET = Object.assign({ name: "", niveau: "alle", perDay: 30, goal: 60, leicht: false, rate: 0.9, onboarded: false, auto: true, tapSay: true }, LS.get("dl-set", {}));
/* einmalig: neue Wörter pro Tag verdoppeln (Wunsch vom 04.11.2026) */
if (!SET.mig2) { const old = LS.get("dl-set", {}); if (old.perDay) SET.perDay = Math.min(80, +old.perDay * 2); SET.mig2 = true; try { localStorage.setItem("dl-set", JSON.stringify(SET)); } catch (e) {} }
function saveP() { LS.set("dl-prog", P); }
function saveST() { LS.set("dl-stats", ST); }
function saveSET() { LS.set("dl-set", SET); }

function today() { const k = dayKey(); return ST.days[k] || (ST.days[k] = { n: 0, r: 0, sec: 0, t: {} }); }
/* Antwortprotokoll für die Auswertung (letzte 6000 Antworten) */
let LOG = LS.get("dl-log", []);
function log(type, ok, ref, extra) {
  const e = { t: Math.floor(Date.now() / 1000), y: type, o: ok ? 1 : 0 };
  if (ref) e.i = ref;
  if (extra) Object.assign(e, extra);
  if (ref && SBYID[ref]) e.k = SBYID[ref].k;
  LOG.push(e); if (LOG.length > 6000) LOG = LOG.slice(-6000);
  LS.set("dl-log", LOG);
  const d = today(); d.n++; if (ok) d.r++;
  const t = d.t[type] || (d.t[type] = { n: 0, r: 0 }); t.n++; if (ok) t.r++;
  if (ref) {
    if (!ok) P.fehler[ref] = (P.fehler[ref] || 0) + 1;
    else if (P.fehler[ref]) { P.fehler[ref]--; if (P.fehler[ref] <= 0) delete P.fehler[ref]; }
  }
  saveST(); saveP();
}
/* Lernzeit: zählt nur, wenn die App sichtbar ist und in der letzten Minute benutzt wurde */
let lastAct = Date.now();
["pointerdown", "keydown"].forEach(e => document.addEventListener(e, () => lastAct = Date.now(), { passive: true }));
setInterval(() => { if (document.visibilityState === "visible" && Date.now() - lastAct < 60000) { today().sec += 5; saveST(); } }, 5000);

function srsGet(kind, id) { return P[kind][id]; }
function srsGrade(kind, id, ok) {
  const cur = P[kind][id]; const b = cur ? cur.b : -1;
  const nb = ok ? Math.min(b + 1, INTERVALS.length - 1) : 0;
  P[kind][id] = { b: nb, d: dayNum() + (ok ? INTERVALS[nb] : 0) };
  saveP();
}
function newLeft() { if (P.newDay !== dayNum()) { P.newDay = dayNum(); P.newCount = 0; } return Math.max(0, SET.perDay - P.newCount); }
function lvOk(x) { return SET.niveau === "alle" || x.lv === SET.niveau || (SET.niveau === "B1" && x.lv === "A2"); }

/* ================= Vorlesen ================= */
const BR = window.AndroidBridge || null;
const HAS_TTS = !!(BR && BR.speak) || ("speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined");
let deVoice = null;
function pickVoice() { try { const v = speechSynthesis.getVoices(); deVoice = v.find(x => /^de(-|_)DE/i.test(x.lang)) || v.find(x => /^de/i.test(x.lang)) || null; } catch (e) { } }
if (!BR && "speechSynthesis" in window) { pickVoice(); try { speechSynthesis.onvoiceschanged = pickVoice; } catch (e) { } }
function say(text) {
  if (!text) return; text = text.replace(/\*/g, "");
  try {
    if (BR && BR.speak) { BR.speak(text, SET.rate); return; }
    speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = "de-DE"; if (deVoice) u.voice = deVoice; u.rate = SET.rate; speechSynthesis.speak(u);
  } catch (e) { }
}
function sayBtn(text, label) { return HAS_TTS ? `<button class="say" data-say="${esc(text)}" aria-label="${esc(label || "Vorlesen")}">🔊</button>` : ""; }
document.addEventListener("click", e => { const b = e.target.closest("[data-say]"); if (b) { e.stopPropagation(); say(b.dataset.say); } }, true);

/* ================= Wort nachschlagen: deutsches Wort markieren → Erklärung, auf Wunsch Übersetzung ================= */
/* Offline aus woerter.json. Zuerst deutsche Erklärung (Didaktik: Russisch nur als Hilfe), Übersetzung erst nach Tipp. */
let LOOK = new Map();
const AUX = /^(hat|ist|sind|haben|sein|sich|wird|wurde|hatte|war)$/;
function normW(x) { return String(x || "").toLowerCase().replace(/[„“"'.,!?;:()]/g, "").replace(/\s+/g, " ").trim(); }
function buildLookup() {
  LOOK = new Map();
  const add = (k, w) => { k = normW(k); if (k && k.length > 1 && !LOOK.has(k)) LOOK.set(k, w); };
  const base = w => w.w.replace(/\s*\(.*?\)\s*/g, " ").trim();
  W.forEach(w => { add(base(w), w); add(base(w).replace(/^sich /, ""), w); });
  W.forEach(w => {
    if (!w.f || w.f === "-" || /^\(/.test(w.f)) return;
    w.f.split(/[,;]/).forEach(p => {
      p = p.replace(/\(.*?\)/g, "").trim(); if (!p) return; add(p, w);
      const t = p.split(/\s+/); if (t.length > 1) { add(t[t.length - 1], w); if (!AUX.test(t[0].toLowerCase())) add(t[0], w); }
    });
  });
}
function lookupFind(sel) {
  let k = normW(sel).replace(/^(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines) /, "");
  if (LOOK.has(k)) return LOOK.get(k);
  for (const end of ["en", "em", "er", "es", "e", "n", "s", "st", "t", "te", "ten"]) {
    if (k.length > end.length + 2 && k.endsWith(end)) { const b = k.slice(0, -end.length); if (LOOK.has(b)) return LOOK.get(b); if (LOOK.has(b + "en")) return LOOK.get(b + "en"); if (LOOK.has(b + "n")) return LOOK.get(b + "n"); }
  }
  return null;
}
function lookupShow(w) {
  let el = $("#lookup");
  if (!el) { el = document.createElement("div"); el.id = "lookup"; el.className = "lookup card"; el.setAttribute("role", "dialog"); document.body.appendChild(el); }
  el.innerHTML = `<div class="row between" style="flex-wrap:nowrap"><b class="lk-word ${w.t === "Nomen" ? artClass(w.a) : ""}">${esc(deLabel(w))}</b><button class="btn lk-close" data-lk-close aria-label="Schließen">✕</button></div>
    ${w.f && w.f !== "-" ? `<div class="hint small">${esc(w.f)}</div>` : ""}
    ${w.b ? `<div>${esc(w.b)}</div>` : ""}${w.x ? `<div class="small"><i>${esc(w.x)}</i></div>` : ""}
    <div class="row">${sayBtn(deLabel(w) + (w.x ? ". " + w.x : ""))}<button class="btn" data-lk-ru>Übersetzung · <span class="ru">перевод</span></button></div>
    <div class="ru lk-ru" data-lk-out hidden>${esc(w.ru)}</div>`;
  el.hidden = false;
  try { const d = dayKey(); ST.lookups = ST.lookups || {}; ST.lookups[d] = (ST.lookups[d] || 0) + 1; LS.set("dl-stats", ST); } catch (e) { }
}
let lkT = 0;
document.addEventListener("selectionchange", () => {
  clearTimeout(lkT);
  lkT = setTimeout(() => {
    const sl = window.getSelection(); const sel = String(sl || "").trim();
    if (!sel || sel.length > 40 || sel.split(/\s+/).length > 3 || !/[a-zäöüß]/i.test(sel)) return;
    const a = document.activeElement; if (a && /^(INPUT|TEXTAREA)$/.test(a.tagName)) return;
    const n = sl.anchorNode && (sl.anchorNode.nodeType === 1 ? sl.anchorNode : sl.anchorNode.parentElement);
    if (n && n.closest && n.closest("#lookup, .ru, [data-nolookup]")) return;
    const w = lookupFind(sel);
    if (w) lookupShow(w); else toast("„" + sel + "“ steht noch nicht im Wörterbuch.");
  }, 450);
});
document.addEventListener("click", e => {
  if (e.target.closest("[data-lk-close]")) { const l = $("#lookup"); if (l) l.hidden = true; }
  else if (e.target.closest("[data-lk-ru]")) { const o = $("#lookup [data-lk-out]"); if (o) o.hidden = false; }
});

/* ================= Inhalte laden ================= */
async function getJSON(path) {
  const r = await fetch(path, { cache: "no-cache" });
  if (!r.ok) throw new Error(path + " " + r.status);
  return r.json();
}
async function loadContent() {
  const [m, w, s, t, pr] = await Promise.all([getJSON("content/manifest.json"), getJSON("content/woerter.json"), getJSON("content/saetze.json"), getJSON("content/schreiben.json").catch(() => []), getJSON("content/pruefung.json").catch(() => ({}))]);
  BERUF = mixOpts(pr || {});
  MAN = m; W = w; T = t;
  // Beispielsätze der Wörter werden zusätzliche Satzbau-Übungen
  const ex = w.filter(x => x.x && x.x.split(/\s+/).length >= 4 && x.x.split(/\s+/).length <= 16)
    .map(x => ({ id: "x" + x.id, de: x.x, ru: "", hint: (x.a ? x.a + " " : "") + x.w + " — " + x.ru, lv: x.lv, r: "", ex: true }));
  S = s.concat(ex);
  S.forEach(x => x.k = categorize(x));
  WBYID = {}; W.forEach(x => WBYID[x.id] = x);
  SBYID = {}; S.forEach(x => SBYID[x.id] = x);
  buildLookup();
  const oldW = LS.get("dl-count", null);
  LS.set("dl-count", { w: m.woerter, s: m.saetze });
  if (oldW && (m.woerter > oldW.w || m.saetze > oldW.s)) {
    setTimeout(() => toast(`Neue Inhalte: +${Math.max(0, m.woerter - oldW.w)} Wörter, +${Math.max(0, m.saetze - oldW.s)} Sätze`, 4000), 600);
  }
}

/* ================= Grammatik-Kategorien ================= */
const CATS = {
  PASSIV: { l: "Passiv", ru: "Пассив (werden + Partizip II)", tip: "werden auf Position 2, Partizip II ans Ende." },
  KONJ2: { l: "Konjunktiv II (würde, hätte, wäre)", ru: "Сослагательное наклонение", tip: "würde/hätte/wäre auf Position 2 (oder im Nebensatz am Ende)." },
  RELATIV: { l: "Relativsatz (der, die, das …)", ru: "Придаточное с «который»", tip: "Im Relativsatz steht das Verb ganz am Ende." },
  NS_ZUERST: { l: "Nebensatz am Anfang", ru: "Придаточное в начале", tip: "Nach dem Nebensatz kommt sofort das Verb: Weil ich krank bin, BLEIBE ich …" },
  IND_FRAGE: { l: "Indirekte Frage (ob, wann, wie …)", ru: "Косвенный вопрос", tip: "Nach ob, wann, wie, wo … steht das Verb am Ende." },
  NS: { l: "Nebensatz: Verb am Ende (weil, dass, wenn …)", ru: "Придаточное: глагол в конце", tip: "weil, dass, wenn, obwohl …: konjugiertes Verb ganz ans Ende." },
  ZU_INF: { l: "Infinitiv mit zu / um … zu", ru: "Инфинитив с zu", tip: "zu + Infinitiv steht am Ende, bei trennbaren Verben in der Mitte: anzurufen." },
  KONNEKTOR: { l: "deshalb, trotzdem, denn, aber …", ru: "Союзы и наречия-связки", tip: "denn/aber/und: Verb auf Position 2. deshalb/trotzdem: Verb sofort danach." },
  FRAGE: { l: "Fragen und Aufforderungen", ru: "Вопросы и просьбы", tip: "Ja/Nein-Frage und Imperativ: Verb auf Position 1. W-Frage: Verb auf Position 2." },
  KLAMMER: { l: "Satzklammer (Modalverb, Perfekt, trennbar)", ru: "Рамочная конструкция", tip: "Teil 1 auf Position 2, Teil 2 (Infinitiv, Partizip, Vorsilbe) ganz ans Ende." },
  INVERSION: { l: "Anfang ist nicht das Subjekt", ru: "Обратный порядок слов", tip: "Steht Zeit oder Ort vorne, kommt das Verb vor das Subjekt: Heute GEHE ich …" },
  HAUPTSATZ: { l: "Einfacher Hauptsatz", ru: "Простое предложение", tip: "Subjekt – Verb – Rest. Das Verb steht auf Position 2." }
};
const SUBS = "weil dass wenn ob obwohl als bevor nachdem sobald damit falls seit seitdem während bis sodass indem solange".split(" ");
function categorize(x) {
  const raw = plainSent(x.de); const s = raw.toLowerCase(); const r = (x.r || "").toLowerCase();
  const first = s.split(/\s+/)[0].replace(/[,.!?]/g, "");
  if (r.includes("passiv")) return "PASSIV";
  if (r.includes("konjunktiv")) return "KONJ2";
  if (r.includes("relativ") || /, (in |mit |bei |zu |von |für |an |auf )?(der|den|dem|denen|deren|dessen) [a-zäöü]/.test(s)) return "RELATIV";
  if (SUBS.includes(first) && s.includes(",")) return "NS_ZUERST";
  if (/, (ob|wann|wie|wo|was|warum|welche\w*|wohin|woher) /.test(s)) return "IND_FRAGE";
  if (new RegExp(", (" + SUBS.join("|") + "|ohne dass|als ob) ").test(s)) return "NS";
  if (/\b(würde|würden|hätte|hätten|wäre|wären)\b/.test(s)) return "KONJ2";
  if (/\bzu [a-zäöü]+(en|ern|eln)\b/.test(s) || /\b(an|ab|auf|aus|ein|mit|vor|zurück|weg|fest|teil|statt|nach|wieder)zu[a-zäöü]+en\b/.test(s)) return "ZU_INF";
  if (/\b(deshalb|trotzdem|deswegen|außerdem|sonst|denn|sondern|allerdings|einerseits|andererseits|entweder|weder|sowohl|zwar|je)\b/.test(s)) return "KONNEKTOR";
  if (/\?$/.test(raw.trim()) || r.includes("imperativ") || r.includes("frage")) return "FRAGE";
  if (/modalverb|perfekt|trennbar|futur|klammer|partizip|infinitiv am ende|am ende/.test(r)) return "KLAMMER";
  const tk = s.replace(/[.!?,]/g, "").split(/\s+/);
  if (!r && tk.length > 3 && /^(kann|kannst|können|könnt|muss|musst|müssen|möchte|möchtest|möchten|will|willst|wollen|soll|sollst|sollen|darf|darfst|dürfen|habe|hast|hat|haben|habt|bin|bist|ist|sind|seid|werde|wirst|wird|werden)$/.test(tk[1]) && /(en|ern|eln|t)$/.test(tk[tk.length - 1])) return "KLAMMER";
  if (/position 1|zuerst/.test(r) || /^(heute|morgen|gestern|dann|danach|am|im|um|in|seit|nach|vor|bei|mit|für|zum|zur|leider|vielleicht|natürlich|jeden|letzte|letzten|nächste|nächstes|normalerweise|dort|hier|ab|wegen|trotz|während|ohne|abends|morgens|mittags|zuerst|bei|von|auf|diese|dieses|diesen)\b/.test(s)) return "INVERSION";
  return "HAUPTSATZ";
}

/* ================= Satz-Werkzeuge ================= */
function tokens(de) {
  let s = de.trim(); const m = s.match(/[.!?]$/); const end = m ? m[0] : ""; if (end) s = s.slice(0, -1);
  const raw = s.split(/\s+/); const verbs = [];
  const toks = raw.map((t, i) => { if (t.includes("*")) { verbs.push(i); return t.replace(/\*/g, ""); } return t; });
  return { toks, end, verbs };
}
function plainSent(de) { return de.replace(/\*/g, ""); }
function solutionHtml(de) {
  const { toks, end, verbs } = tokens(de);
  return toks.map((t, i) => verbs.includes(i) ? `<span class="v">${esc(t)}</span>` : esc(t)).join(" ") + esc(end);
}
function kursOn() { return !!(session && session.kurs != null && view === "session"); }
const LV_ORDER = { A2: 0, B1: 1, B2: 2 };
function sentPool(needVerb, cats) {
  const k = kursOn();
  return S.filter(x => (k || lvOk(x)) && (!needVerb || x.de.includes("*")) && (!cats || cats.includes(x.k)));
}
/* Auswahl: zuerst fällige Wiederholungen, dann neue echte Sätze, dann Beispielsätze, dann zufällig */
let recentS = [];
function pickSentence(needVerb, cats) { if (!Array.isArray(cats)) cats = null; let s = cats ? pickSentence0(needVerb, cats) : null; if (!s) s = pickSentence0(needVerb); if (s) { recentS.push(s.id); if (recentS.length > 40) recentS.shift(); } return s; }
function pickSentence0(needVerb, cats) {
  let pool = sentPool(needVerb, cats); const p2 = pool.filter(x => !recentS.includes(x.id)); if (p2.length) pool = p2;
  if (!pool.length) return null;
  const now = dayNum();
  const due = pool.filter(x => P.s[x.id] && P.s[x.id].d <= now);
  if (due.length && Math.random() < .7) { due.sort((a, b) => P.s[a.id].b - P.s[b.id].b); const lo = P.s[due[0].id].b; return rnd(due.filter(x => P.s[x.id].b === lo)); }
  const fresh = pool.filter(x => !P.s[x.id] && !x.ex);
  if (fresh.length && kursOn()) { const lo = Math.min(...fresh.map(x => LV_ORDER[x.lv] ?? 1)); return rnd(fresh.filter(x => (LV_ORDER[x.lv] ?? 1) === lo)); }
  if (fresh.length && Math.random() < .8) return rnd(fresh.slice(0, 40));
  const freshEx = pool.filter(x => !P.s[x.id]);
  if (freshEx.length && Math.random() < .6) return rnd(freshEx);
  return rnd(pool);
}

/* ================= Wort-Auswahl ================= */
function deLabel(w) { return (w.t === "Nomen" && w.a ? w.a + " " : "") + w.w; }
function artClass(a) { return a ? "art-" + a : ""; }
function wordPool() { return kursOn() ? W.slice() : W.filter(lvOk); }
function seenWords(list) { return list.filter(w => P.w[w.id]); }
function prefSeen(list, min = 8) { const s = seenWords(list); return s.length >= min ? s : list; }
let recentW = [];
function pickCard(exclude) { const w = pickCard0(); if (w) { recentW.push(w.id); if (recentW.length > 20) recentW.shift(); } return w; }
function pickCard0() {
  let p = wordPool(); const p2 = p.filter(w => !recentW.includes(w.id)); if (p2.length > 3) p = p2; const now = dayNum();
  const due = p.filter(w => P.w[w.id] && P.w[w.id].d <= now);
  if (due.length) { due.sort((a, b) => P.w[a.id].b - P.w[b.id].b || P.w[a.id].d - P.w[b.id].d); const lo = P.w[due[0].id].b; return rnd(due.filter(w => P.w[w.id].b === lo)); }
  if (newLeft() > 0) { const fresh = p.filter(w => !P.w[w.id]); if (fresh.length) { const lvl = { A2: 0, B1: 1, B2: 2 }; fresh.sort((a, b) => (lvl[a.lv] || 1) - (lvl[b.lv] || 1)); return fresh[0]; } }
  return null;
}

/* ================= Übungen =================
   Jede Übung: build(host, done) – ruft done(ok) genau einmal auf, wenn die Lernerin "Weiter" drückt. */
const EX = {};
const TYPE_NAMES = { mailfragen: "Prüfung: E-Mail verstehen", notiz: "Prüfung: Telefonnotiz", sb: "Prüfung: Sprachbausteine", sprechen: "Prüfung: Sprechen", loesung_wahl: "Prüfung: Lösung finden", diskussion_wahl: "Prüfung: Diskussion", hoeren_beruf: "Prüfung: Hören", lesen_pr: "Prüfung: Lesen", hoeren: "Hörtraining", karte: "Karteikarten", bauen: "Satz bauen", verb: "Wo steht das Verb?", rf: "Richtig oder falsch?", diktat: "Diktat", bedeutung: "Bedeutung", artikel: "der/die/das", luecke: "Lückentext", wortart: "Wortart", schreiben: "Schreiben" };

function nextBtn(host, done, ok) {
  const b = document.createElement("button"); b.className = "btn primary"; b.textContent = "Weiter →";
  b.onclick = () => done(ok); host.appendChild(b); setTimeout(() => b.focus({ preventScroll: true }), 50);
}

/* --- Karteikarte --- */
EX.karte = function (host, done, opt = {}) {
  const w = opt.word || pickCard();
  if (!w) return false;
  const dir = opt.dir || (P.w[w.id] && P.w[w.id].b >= 2 && Math.random() < .4 ? "ru" : "de");
  const noun = w.t === "Nomen"; const isNew = !P.w[w.id]; let open = false;
  function draw() {
    const front = dir === "de"
      ? `<div class="big">${open && noun && w.a ? `<span class="${artClass(w.a)}">${esc(w.a)}</span> ` : ""}${esc(w.w)}</div>`
      : `<div class="big ru" style="font-family:var(--body)">${esc(w.ru)}</div>${open ? `<div class="big" style="font-size:30px">${noun && w.a ? `<span class="${artClass(w.a)}">${esc(w.a)}</span> ` : ""}${esc(w.w)}</div>` : ""}`;
    host.innerHTML = `
      <div class="card flash ${open && noun && w.a ? "bg-" + w.a : ""}" id="fc" tabindex="0" role="button">
        ${(dir === "de" || open) ? sayBtn(deLabel(w)) : ""}
        <div class="row" style="justify-content:center">${isNew ? `<span class="pill" style="color:var(--ru);border-color:var(--ru)">neu</span>` : ""}<span class="pill">${esc(w.t)}</span><span class="pill">${esc(w.lv)}</span></div>
        ${front}
        ${!open ? `<p class="hint">${dir === "de" ? "Was bedeutet das? <span class='ru'>Что это значит?</span>" : "Wie heißt das auf Deutsch? <span class='ru'>Как это по-немецки?</span>"}<br>Antippen zum Umdrehen</p>` : `
        <dl>
          ${dir === "de" ? `<div><dt>Russisch</dt><dd class="ru" style="font-size:22px;font-weight:700">${esc(w.ru)}</dd></div>` : ""}
          ${w.f ? `<div><dt>${noun ? "Plural" : "Formen"}</dt><dd>${esc(w.f)}</dd></div>` : ""}
          ${w.b ? `<div><dt>Bedeutung</dt><dd>${esc(w.b)}</dd></div>` : ""}
          ${w.x ? `<div><dt>Beispiel</dt><dd class="row" style="flex-wrap:nowrap;align-items:flex-start"><i style="flex:1">${esc(w.x)}</i>${sayBtn(w.x)}</dd></div>` : ""}
        </dl>`}
      </div>
      ${open ? `<div class="row"><button class="btn bad" id="no">Wusste ich nicht</button><button class="btn ok" id="yes">Wusste ich</button></div>` : ""}`;
    const c = $("#fc", host);
    const flip = () => { if (!open) { open = true; draw(); if (dir === "ru") say(deLabel(w)); } };
    c.onclick = flip; c.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } };
    if (open) {
      const g = ok => { if (isNew) { newLeft(); P.newCount++; } srsGrade("w", w.id, ok); log("karte", ok, w.id); done(ok); };
      $("#yes", host).onclick = () => g(true); $("#no", host).onclick = () => g(false);
    }
  }
  draw(); if (SET.auto && dir === "de") setTimeout(() => say(deLabel(w)), 250); return true;
};

/* --- Satz bauen (auch Diktat) --- */
function buildSentence(host, done, sent, mode) {
  const { toks, end, verbs } = tokens(sent.de);
  const correct = toks.join(" ");
  const alts = (sent.alt || []).map(a => tokens(a).toks.join(" "));
  let pool = toks.map((t, i) => ({ t, i }));
  let sh = shuffle(pool); let tries = 0;
  while (sh.length > 2 && sh.every((x, k) => x.i === k) && tries++ < 20) sh = shuffle(pool);
  let placed = [];
  if (SET.leicht && mode === "bauen") { const first = sh.find(x => x.i === 0); sh = sh.filter(x => x !== first); placed.push(Object.assign({ fixed: true }, first)); }
  pool = sh; let checked = false;
  const dikt = mode === "diktat";
  host.innerHTML = `
    <div class="card">
      <div class="row between"><span class="pill">${dikt ? "Diktat · hören und bauen" : "Satz bauen"} · ${esc(sent.lv)}</span>${HAS_TTS ? `<button class="say" id="sp" aria-label="Vorlesen">🔊</button>` : ""}</div>
      ${dikt ? `<p class="hint">Hör zu und bau den Satz. <span class="ru">Послушай и собери предложение.</span></p><button class="btn small ghost" id="helpRu" style="align-self:flex-start">Hilfe: auf Russisch zeigen</button>` : task("Bau den Satz. Tippe die Wörter in der richtigen Reihenfolge an.", "Собери предложение.")}
      <div class="rubox" id="ruHint" ${dikt ? "hidden" : ""}>${sent.ru ? "<b>По-русски:</b> " + esc(sent.ru) : "<b>Слово:</b> " + esc(sent.hint || "")}</div>
      <div class="zone" id="zone" aria-label="Dein Satz"></div>
      <div class="pool" id="pool" aria-label="Wörter"></div>
      <div id="res" class="panel" hidden></div>
      <div class="row" id="act"><button class="btn" id="reset">Zurücksetzen</button><button class="btn primary" id="chk">Prüfen</button></div>
    </div>`;
  const zone = $("#zone", host), pl = $("#pool", host);
  function render() {
    zone.innerHTML = ""; pl.innerHTML = "";
    if (!placed.length) zone.innerHTML = `<span class="hint">Tippe die Wörter in der richtigen Reihenfolge an.</span>`;
    placed.forEach((x, k) => {
      const b = document.createElement("button"); b.className = "tile" + (x.fixed ? " fixed" : "") + (x.bad ? " wrongpos" : ""); b.textContent = x.t;
      b.onclick = () => { if (checked || x.fixed) return; placed.splice(k, 1); pool.push(x); render(); };
      zone.appendChild(b);
    });
    if (checked && end) { const s = document.createElement("span"); s.textContent = end; s.style.fontSize = "22px"; zone.appendChild(s); }
    pool.forEach((x, k) => {
      const b = document.createElement("button"); b.className = "tile"; b.textContent = x.t;
      b.onclick = () => { if (checked) return; if (SET.tapSay) say(x.t); pool.splice(k, 1); placed.push(x); render(); };
      pl.appendChild(b);
    });
  }
  render();
  if ($("#sp", host)) $("#sp", host).onclick = () => {
    if (dikt || checked) say(plainSent(sent.de));
    else say("Bau den Satz. Die Wörter sind: " + pool.concat(placed).map(x => x.t.replace(/,$/, "")).join(", "));
  };
  if (dikt) { setTimeout(() => say(plainSent(sent.de)), 300); $("#helpRu", host).onclick = e => { $("#ruHint", host).hidden = false; e.target.hidden = true; }; }
  $("#reset", host).onclick = () => { if (checked) return; pool = shuffle(pool.concat(placed.filter(x => !x.fixed))); placed = placed.filter(x => x.fixed); render(); };
  $("#chk", host).onclick = () => {
    if (checked) return;
    if (pool.length) { toast("Erst alle Wörter einsetzen."); return; }
    const mine = placed.map(x => x.t).join(" ");
    const ok = mine === correct || alts.includes(mine);
    checked = true;
    if (!ok) placed.forEach((x, k) => { if (toks[k] !== x.t) x.bad = true; });
    zone.className = "zone " + (ok ? "ok" : "bad"); render();
    let fehler = null;
    if (!ok) { fehler = verbs.length ? (verbs.some(v => placed[v] && placed[v].t !== toks[v]) ? "verb" : "rest") : "reihe"; }
    srsGrade("s", sent.id, ok); log(mode, ok, sent.id, ok ? null : { a: mine, f: fehler });
    const r = $("#res", host); r.hidden = false;
    r.innerHTML = `<div class="feedback ${ok ? "ok" : "bad"}" style="text-align:left">${ok ? "Richtig! <span class='ru'>Верно!</span>" : "Noch nicht ganz. So ist es richtig: <span class='ru'>Правильно так:</span>"}</div>
      ${ok ? "" : `<div class="solution">${solutionHtml(sent.de)}</div>`}
      ${dikt && sent.ru ? `<div class="rubox">${esc(sent.ru)}</div>` : ""}
      ${sent.r ? `<div class="rule"><b>Regel:</b> ${esc(sent.r)}</div>` : ""}`;
    $("#act", host).hidden = true; say(plainSent(sent.de));
    nextBtn(host.firstElementChild, done, ok);
  };
  return true;
}
EX.bauen = (host, done, opt = {}) => { const s = opt.sent || pickSentence(false, opt.cats); return s ? buildSentence(host, done, s, "bauen") : false; };
EX.diktat = (host, done, opt = {}) => { if (!HAS_TTS) return EX.bauen(host, done, opt); const s = opt.sent || pickSentence(false, opt.cats); return s ? buildSentence(host, done, s, "diktat") : false; };

/* --- Wo steht das Verb? --- */
EX.verb = function (host, done, opt = {}) {
  const sent = opt.sent && opt.sent.de.includes("*") ? opt.sent : pickSentence(true, opt.cats);
  if (!sent) return false;
  const { toks, end, verbs } = tokens(sent.de);
  const k = rnd(verbs); const verb = toks[k];
  const rest = toks.filter((_, i) => i !== k);
  host.innerHTML = `
    <div class="card">
      <span class="pill" style="align-self:flex-start">Wo steht das Verb? · ${esc(sent.lv)}</span>
      <div class="row between"><p class="hint" style="flex:1">Tippe auf die Lücke, in die das Verb gehört. <span class="ru">Куда ставится глагол?</span></p>${HAS_TTS ? `<button class="say" id="sayV" aria-label="Aufgabe vorlesen">🔊</button>` : ""}</div>
      <div style="text-align:center"><span class="vchip">${esc(verb)}</span></div>
      <div class="vline" id="vl"></div>
      ${sent.ru ? `<div class="rubox">${esc(sent.ru)}</div>` : ""}
      <div id="res" class="panel" hidden></div>
    </div>`;
  const vl = $("#vl", host); let answered = false;
  if ($("#sayV", host)) $("#sayV", host).onclick = () => say(answered ? plainSent(sent.de) : "Wo steht das Verb? Das Verb ist: " + verb.replace(/,$/, "") + ". Die anderen Wörter: " + rest.join(" "));
  if (SET.auto) setTimeout(() => say("Das Verb ist: " + verb.replace(/,$/, "")), 250);
  for (let i = 0; i <= rest.length; i++) {
    const g = document.createElement("button"); g.className = "vgap"; g.textContent = "+"; g.setAttribute("aria-label", "Lücke " + (i + 1)); g.dataset.i = i;
    vl.appendChild(g);
    if (i < rest.length) { const s = document.createElement("span"); s.className = "vword"; s.textContent = rest[i] + (i === rest.length - 1 ? end : ""); s.onclick = () => SET.tapSay && say(rest[i]); vl.appendChild(s); }
  }
  vl.onclick = e => {
    const g = e.target.closest(".vgap"); if (!g || answered) return; answered = true;
    const i = +g.dataset.i; const ok = i === k;
    g.classList.add(ok ? "right" : "wrong"); g.textContent = verb; if (!ok) { g.style.textDecoration = "line-through"; g.style.width = "auto"; g.style.padding = "0 8px"; }
    if (!ok) { const c = vl.querySelector(`.vgap[data-i="${k}"]`); c.classList.add("right"); c.textContent = verb; }
    vl.querySelectorAll(".vgap:not(.right):not(.wrong)").forEach(x => x.hidden = true);
    srsGrade("s", sent.id, ok); log("verb", ok, sent.id, ok ? null : { a: i, c: k });
    const r = $("#res", host); r.hidden = false;
    r.innerHTML = `<div class="feedback ${ok ? "ok" : "bad"}">${ok ? "Richtig! <span class='ru'>Верно!</span>" : "Leider falsch. <span class='ru'>Неверно.</span>"}</div>
      <div class="solution" style="text-align:center">${solutionHtml(sent.de)}</div>
      ${sent.r ? `<div class="rule"><b>Regel:</b> ${esc(sent.r)}</div>` : ""}`;
    say(plainSent(sent.de)); nextBtn(host.firstElementChild, done, ok);
  };
  return true;
};

/* --- Richtig oder falsch? --- */
const LOWER = new Set("ich du er es wir ihr man heute morgen gestern dann deshalb trotzdem leider vielleicht natürlich jeden jede am im in mit seit für bei nach von vom zum zur um ab dort hier jetzt diese dieser dieses meine mein meinen meiner das der die den dem des ein eine einen wegen trotz ohne normalerweise danach damals zuerst bitte letzte letzten nächste nächsten auf aus zu sonst außerdem".split(" "));
function wrongVersion(de) {
  const { toks, end, verbs } = tokens(de);
  const k = rnd(verbs); const v = toks[k]; const rest = toks.filter((_, i) => i !== k);
  const options = []; for (let j = 0; j <= rest.length; j++) if (j !== k && Math.abs(j - k) >= 1) options.push(j);
  // bevorzugt: typische Fehler – Verb an Position 2 im Nebensatz oder ans Ende im Hauptsatz
  const j = rnd(options.length ? options : [0]);
  const out = rest.slice(); out.splice(j, 0, v);
  if (j === 0 && k !== 0 && LOWER.has(out[1].toLowerCase())) out[1] = out[1].toLowerCase();
  if (out[0] === v && k !== 0) out[0] = v.charAt(0).toUpperCase() + v.slice(1);
  const s = out.join(" ");
  return s === toks.join(" ") ? null : s.charAt(0).toUpperCase() + s.slice(1) + end;
}
EX.rf = function (host, done, opt = {}) {
  let sent = opt.sent && opt.sent.de.includes("*") ? opt.sent : pickSentence(true, opt.cats);
  for (let i = 0; i < 5 && sent && /\?\s*$/.test(sent.de); i++) sent = pickSentence(true, opt.cats);
  if (!sent || /\?\s*$/.test(sent.de)) return false;
  let shown = plainSent(sent.de), isRight = true;
  if (Math.random() < .55) { const w = wrongVersion(sent.de); if (w) { shown = w; isRight = false; } }
  host.innerHTML = `
    <div class="card">
      <span class="pill" style="align-self:flex-start">Richtig oder falsch? · ${esc(sent.lv)}</span>
      <div class="row between"><p class="hint" style="flex:1">Ist die Wortstellung richtig? <span class="ru">Порядок слов правильный?</span></p>${sayBtn(shown, "Satz vorlesen")}</div>
      <p class="sent">${esc(shown)}</p>
      ${sent.ru ? `<div class="rubox">${esc(sent.ru)}</div>` : ""}
      <div class="choices two"><button class="choice" data-a="1">✓ Richtig</button><button class="choice" data-a="0">✗ Falsch</button></div>
      <div id="res" class="panel" hidden></div>
    </div>`;
  let answered = false;
  if (SET.auto) setTimeout(() => say(shown), 250);
  host.querySelectorAll(".choice").forEach(b => b.onclick = () => {
    if (answered) return; answered = true;
    const ok = (b.dataset.a === "1") === isRight;
    b.classList.add(ok ? "right" : "wrong");
    srsGrade("s", sent.id, ok); log("rf", ok, sent.id, ok ? null : { f: isRight ? "richtig-als-falsch" : "fehler-uebersehen", a: shown });
    const r = $("#res", host); r.hidden = false;
    r.innerHTML = `<div class="feedback ${ok ? "ok" : "bad"}">${ok ? "Richtig erkannt! <span class='ru'>Верно!</span>" : "Leider nicht. <span class='ru'>Неверно.</span>"} ${isRight ? "Der Satz war richtig." : "Der Satz war falsch. Richtig ist:"}</div>
      ${isRight ? "" : `<div class="solution" style="text-align:center">${solutionHtml(sent.de)}</div>`}
      ${sent.r ? `<div class="rule"><b>Regel:</b> ${esc(sent.r)}</div>` : ""}`;
    say(plainSent(sent.de)); nextBtn(host.firstElementChild, done, ok);
  });
  return true;
};

/* --- Quiz-Grundgerüst --- */
/* Hilfe-Zeile: Aufgabe auf Deutsch (wird vorgelesen) + kurz auf Russisch */
function task(de, ru) { return `<p class="hint">${esc(de)}${ru ? ` <span class="ru">${esc(ru)}</span>` : ""}</p>`; }
function mcq(host, done, { type, label, prompt, options, right, cls, after, ref, word, say: sayText, sayAfter, aufgabe, aufgabeRu }) {
  const readAll = () => say([aufgabe, sayText, "Antworten: " + options.join(", ")].filter(Boolean).map(x => x.trim().replace(/[.!?]$/, "")).join(". "));
  host.innerHTML = `
    <div class="card">
      <div class="row between"><span class="pill">${esc(label)}</span>${HAS_TTS ? `<button class="say" id="sayTask" aria-label="Aufgabe vorlesen">🔊</button>` : ""}</div>
      ${aufgabe ? task(aufgabe, aufgabeRu) : ""}
      <div>${prompt}</div>
      <div class="choices ${cls || "two"}" id="ch"></div>
      <div id="res" class="panel" hidden></div>
    </div>`;
  if ($("#sayTask", host)) $("#sayTask", host).onclick = readAll;
  if (SET.auto && sayText) setTimeout(() => say(sayText), 250);
  const ch = $("#ch", host); let answered = false;
  options.forEach(o => {
    const b = document.createElement("button"); b.className = "choice" + (cls === "art" ? " " + o : ""); b.textContent = o;
    b.onclick = () => {
      if (answered) return; answered = true; const ok = o === right;
      b.classList.add(ok ? "right" : "wrong");
      if (!ok) [...ch.children].find(x => x.textContent === right)?.classList.add("right");
      log(type, ok, ref, ok ? null : { a: o, c: right });
      if (word && P.w[word.id] && !ok) { P.w[word.id].d = dayNum(); saveP(); }
      const r = $("#res", host); r.hidden = false;
      r.innerHTML = `<div class="feedback ${ok ? "ok" : "bad"}">${ok ? "Richtig! <span class='ru'>Верно!</span>" : "Leider falsch. <span class='ru'>Неверно.</span>"}</div>${after ? after() : ""}`;
      if (sayAfter) say(sayAfter);
      nextBtn(host.firstElementChild, done, ok);
    };
    ch.appendChild(b);
  });
  if (cls === "art") ch.className = "choices";
  return true;
}
function wordInfo(w) {
  return `<div class="rule"><div class="row" style="flex-wrap:nowrap;align-items:flex-start"><div style="flex:1"><b class="${w.t === "Nomen" ? artClass(w.a) : ""}">${esc(deLabel(w))}</b>${w.f ? " · " + esc(w.f) : ""}${w.b ? `<br>${esc(w.b)}` : ""}${w.x ? `<br><i>${esc(w.x)}</i>` : ""}<br><span class="ru">${esc(w.ru)}</span></div>${sayBtn(deLabel(w) + (w.x ? ". " + w.x : ""))}</div></div>`;
}
/* Bedeutung: nur Deutsch – Wort ↔ deutsche Erklärung. Russisch erscheint erst nach der Antwort. */
EX.bedeutung = function (host, done, opt = {}) {
  const list = prefSeen(wordPool().filter(w => w.b && w.b.length > 5));
  if (list.length < 4) return false;
  const w = opt.word && opt.word.b ? opt.word : rnd(list);
  const same = W.filter(x => x.id !== w.id && x.b && x.t === w.t && x.b !== w.b);
  const others = shuffle(same.length >= 3 ? same : W.filter(x => x.id !== w.id && x.b)).slice(0, 3);
  if (Math.random() < .5) {
    return mcq(host, done, { type: "bedeutung", label: "Was bedeutet das Wort?", aufgabe: "Was bedeutet das Wort? Wähle die richtige Erklärung.", aufgabeRu: "Выбери правильное объяснение.",
      prompt: `<div class="big">${esc(deLabel(w))}</div>`, say: deLabel(w), options: shuffle([w, ...others].map(x => x.b)), right: w.b, cls: "one", word: w, after: () => wordInfo(w), sayAfter: deLabel(w) + ". " + w.b, ref: w.id });
  }
  return mcq(host, done, { type: "bedeutung", label: "Welches Wort passt?", aufgabe: "Welches Wort passt zu der Erklärung?", aufgabeRu: "Какое слово подходит к объяснению?",
    prompt: `<p class="sent">${esc(w.b)}</p>`, say: w.b, options: shuffle([w, ...others].map(deLabel)), right: deLabel(w), word: w, after: () => wordInfo(w), sayAfter: deLabel(w), ref: w.id });
};
EX.artikel = function (host, done, opt = {}) {
  const list = prefSeen(wordPool().filter(w => w.t === "Nomen" && ["der", "die", "das"].includes(w.a)));
  if (!list.length) return false;
  const w = opt.word && opt.word.a ? opt.word : rnd(list);
  return mcq(host, done, { type: "artikel", label: "der · die · das", aufgabe: "Welcher Artikel ist richtig?", aufgabeRu: "Какой артикль правильный?",
    prompt: `<div class="big">${esc(w.w)}</div><p class="hint ru" style="text-align:center">${esc(w.ru)}</p>`, say: w.w, options: ["der", "die", "das"], right: w.a, cls: "art", word: w, after: () => wordInfo(w), sayAfter: deLabel(w), ref: w.id });
};
function stemOf(w) { let s = w.toLowerCase().replace(/^sich\s+/, "").replace(/\s*\(.*$/, "").trim(); if (/\s/.test(s)) return null; const n = Math.max(3, Math.min(5, s.length - 2)); return s.slice(0, n); }
function clozeFor(w) {
  if (!w.x || !["Nomen", "Verb", "Adjektiv", "Adverb"].includes(w.t)) return null;
  const st = stemOf(w.w); if (!st) return null;
  const toks = w.x.split(/(\s+)/);
  for (let i = 0; i < toks.length; i++) { const c = toks[i].replace(/[.,!?;:„“"]/g, ""); if (c && c.toLowerCase().startsWith(st)) return { w, toks, i, token: c }; }
  return null;
}
EX.luecke = function (host, done, opt = {}) {
  const all = wordPool().map(clozeFor).filter(Boolean);
  const list = prefSeen(all.map(c => c.w)).map(clozeFor).filter(Boolean);
  if (list.length < 4) return false;
  const c = opt.word ? (clozeFor(opt.word) || rnd(list)) : rnd(list);
  const same = all.filter(x => x.w.id !== c.w.id && x.w.t === c.w.t && x.token.toLowerCase() !== c.token.toLowerCase());
  const src = same.length >= 3 ? same : all.filter(x => x.w.id !== c.w.id && x.token.toLowerCase() !== c.token.toLowerCase());
  const opts = []; shuffle(src).forEach(x => { if (opts.length < 3 && !opts.includes(x.token)) opts.push(x.token); });
  const shown = c.toks.map((t, i) => i === c.i ? esc(t).replace(esc(c.token), '<span class="gapword">&nbsp;?&nbsp;</span>') : esc(t)).join("");
  const spoken = c.toks.map((t, i) => i === c.i ? t.replace(c.token, "… Lücke …") : t).join("");
  return mcq(host, done, { type: "luecke", label: "Lückentext", aufgabe: "Welches Wort fehlt im Satz?", aufgabeRu: "Какое слово пропущено?",
    prompt: `<p class="cloze">${shown}</p><p class="hint" style="text-align:center">Hilfe: <span class="ru">${esc(c.w.ru)}</span></p>`, say: spoken, options: shuffle([c.token, ...opts]), right: c.token,
    after: () => `<div class="solution" style="text-align:center">${esc(c.w.x)}</div>`, sayAfter: c.w.x, ref: c.w.id });
};
EX.wortart = function (host, done) {
  const list = prefSeen(wordPool().filter(w => w.t !== "Redemittel"));
  if (!list.length) return false;
  const w = rnd(list);
  const opts = ["Nomen", "Verb", "Adjektiv", "Adverb", "Präposition", "Konjunktion"];
  return mcq(host, done, { type: "wortart", label: "Wortart", aufgabe: "Was für ein Wort ist das?", aufgabeRu: "Какая это часть речи?",
    prompt: `<div class="big">${esc(w.w)}</div>${w.x ? `<p class="hint" style="text-align:center">„${esc(w.x)}“</p>` : ""}`, say: w.w + (w.x ? ". " + w.x : ""), options: opts, right: w.t, after: () => wordInfo(w), ref: w.id });
};
/* Hörtraining: Wort oder Satz nur hören, dann das Gehörte auswählen (alles auf Deutsch) */
EX.hoeren = function (host, done, opt = {}) {
  if (!HAS_TTS) return false;
  if (Math.random() < .5) {
    const pool = prefSeen(wordPool().filter(w => w.t !== "Redemittel" && !/\s/.test(w.w)));
    if (pool.length < 4) return false;
    const w = rnd(pool);
    const same = W.filter(x => x.id !== w.id && x.t === w.t && !/\s/.test(x.w) && x.w[0].toLowerCase() === w.w[0].toLowerCase());
    const others = shuffle(same.length >= 3 ? same : W.filter(x => x.id !== w.id && x.t === w.t && !/\s/.test(x.w))).slice(0, 3);
    return mcq(host, done, { type: "hoeren", label: "Hörtraining · Wort", aufgabe: "Hör zu. Welches Wort hörst du?", aufgabeRu: "Послушай. Какое слово ты слышишь?",
      prompt: `<div style="text-align:center"><button class="btn big" id="play">🔊 Anhören</button></div>`, say: deLabel(w), options: shuffle([w, ...others].map(deLabel)), right: deLabel(w), word: w, after: () => wordInfo(w), sayAfter: deLabel(w), ref: w.id })
      && bindPlay(host, deLabel(w));
  }
  const s0 = pickSentence(false); if (!s0) return false;
  const same = S.filter(x => x.id !== s0.id && x.k === s0.k && Math.abs(plainSent(x.de).length - plainSent(s0.de).length) < 40);
  const others = shuffle(same.length >= 2 ? same : S.filter(x => x.id !== s0.id)).slice(0, 2);
  const right = plainSent(s0.de);
  return mcq(host, done, { type: "hoeren", label: "Hörtraining · Satz", aufgabe: "Hör zu. Welchen Satz hörst du?", aufgabeRu: "Послушай. Какое предложение ты слышишь?",
    prompt: `<div style="text-align:center"><button class="btn big" id="play">🔊 Anhören</button></div>`, say: right, options: shuffle([right, ...others.map(x => plainSent(x.de))]), right, cls: "one",
    after: () => `${s0.ru ? `<div class="rubox">${esc(s0.ru)}</div>` : ""}`, sayAfter: right, ref: s0.id })
    && bindPlay(host, right);
};
function bindPlay(host, text) { const b = $("#play", host); if (b) b.onclick = () => say(text); return true; }

/* ================= Auswertung ================= */
const SB_TYPES = ["bauen", "verb", "rf", "diktat"];
const W_TYPES = ["karte", "bedeutung", "artikel", "luecke", "wortart", "hoeren"];
function analyse(days) {
  const since = days ? Math.floor(Date.now() / 1000) - days * 86400 : 0;
  const ev = LOG.filter(e => e.t >= since);
  const A = { n: ev.length, cat: {}, fehlerArt: {}, art: {}, artVerw: {}, thema: {}, wortart: {}, typ: {}, wrong: {} };
  const inc = (o, k, ok) => { if (!k) return; const x = o[k] || (o[k] = { n: 0, r: 0 }); x.n++; if (ok) x.r++; };
  ev.forEach(e => {
    inc(A.typ, e.y, e.o);
    if (SB_TYPES.includes(e.y)) {
      const k = (e.i && SBYID[e.i] && SBYID[e.i].k) || e.k; inc(A.cat, k, e.o);
      if (!e.o && e.f) A.fehlerArt[e.f] = (A.fehlerArt[e.f] || 0) + 1;
    }
    if (W_TYPES.includes(e.y) && e.i && WBYID[e.i]) { const w = WBYID[e.i]; inc(A.thema, w.th, e.o); inc(A.wortart, w.t, e.o); }
    if (e.y === "artikel") { inc(A.art, e.c || (WBYID[e.i] || {}).a, e.o); if (!e.o && e.a && e.c) { const key = e.a + " statt " + e.c; A.artVerw[key] = (A.artVerw[key] || 0) + 1; } }
    if (!e.o && e.i) { const x = A.wrong[e.i] || (A.wrong[e.i] = { n: 0, last: null }); x.n++; x.last = e; }
  });
  return A;
}
function rate(x) { return x && x.n ? x.r / x.n : null; }
function weakCats() {
  const A = analyse(30);
  const list = Object.entries(A.cat).filter(([k, v]) => v.n >= 3 && CATS[k]).sort((a, b) => rate(a[1]) - rate(b[1]));
  const weak = list.filter(([k, v]) => rate(v) < 0.85).slice(0, 3).map(x => x[0]);
  if (weak.length) return weak;
  // noch wenig Daten: die typischen Problemstellen zuerst
  const tried = new Set(list.map(x => x[0]));
  const def = ["NS", "NS_ZUERST", "KLAMMER", "INVERSION", "IND_FRAGE", "KONNEKTOR"].filter(k => !tried.has(k));
  return def.length ? def.slice(0, 3) : ["NS", "NS_ZUERST", "KLAMMER"];
}

/* ================= Grundkurs von vorn =================
   Stufe für Stufe von A2 bis B2. Die nächste Stufe öffnet sich erst mit mindestens 80 % richtig. */
const KURS = [
  { k: "HAUPTSATZ", t: "Das Verb steht auf Platz 2", ru: "Глагол на втором месте" },
  { k: "INVERSION", t: "Zeit oder Ort vorne – Verb bleibt auf Platz 2", ru: "Время или место впереди – глагол всё равно второй" },
  { k: "FRAGE", t: "Fragen und Bitten", ru: "Вопросы и просьбы" },
  { k: "KLAMMER", t: "Satzklammer: Modalverb, Perfekt, trennbare Verben", ru: "Рамочная конструкция" },
  { k: "KONNEKTOR", t: "denn, deshalb, trotzdem, sondern", ru: "Союзы-связки" },
  { k: "NS", t: "weil, dass, wenn: Verb ans Ende", ru: "Придаточное: глагол в конце" },
  { k: "NS_ZUERST", t: "Nebensatz am Anfang", ru: "Придаточное в начале" },
  { k: "IND_FRAGE", t: "Indirekte Fragen (ob, wann, wie …)", ru: "Косвенный вопрос" },
  { k: "ZU_INF", t: "zu + Infinitiv, um … zu", ru: "Инфинитив с zu" },
  { k: "RELATIV", t: "Relativsätze (der, die, das …)", ru: "Придаточные с «который»" },
  { k: "KONJ2", t: "Konjunktiv II: würde, hätte, wäre, könnte", ru: "Сослагательное наклонение" },
  { k: "PASSIV", t: "Passiv: wird gemacht, wurde gemacht", ru: "Пассив" },
  { k: null, t: "Abschluss: alles gemischt", ru: "Итог: всё вперемешку" }
];
const KURS_LEN = 15, KURS_PASS = 80;
function kursState() { P.kurs = P.kurs || { s: 0, best: {} }; return P.kurs; }
function kursCats(i) { return KURS[i].k ? [KURS[i].k] : null; }
function startKurs(i) {
  startSession("Grundkurs " + (i + 1) + ": " + KURS[i].t, (n, t) => {
    if (n % 5 === 4 && t === 0) return { type: n % 10 === 4 ? "karte" : "artikel" };
    const order = ["bauen", "verb", "bauen", "rf", "diktat", "bauen", "verb", "bauen"];
    return { type: t > 1 ? "bauen" : order[n % order.length], opt: { cats: kursCats(i) } };
  }, KURS_LEN, null, i);
}

/* ================= Sitzung ================= */
let session = null;
function startSession(title, plan, len = 20, kat, kurs) {
  session = { title, plan, len, i: 0, r: 0, f: 0, start: Date.now(), last: null, kat, kurs: kurs == null ? null : kurs };
  go("session");
}
function sessionNext(host) {
  if (session.i >= session.len) return sessionEnd(host);
  const box = document.createElement("div");
  host.querySelector("#exHost").innerHTML = ""; host.querySelector("#exHost").appendChild(box);
  $("#sprog", host).style.width = (100 * session.i / session.len) + "%";
  $("#scount", host).textContent = `${session.i + 1} / ${session.len}`;
  // bis zu 6 Versuche, eine passende Übung zu finden
  const FALLBACK = [{ type: "bauen" }, { type: "bedeutung" }, { type: "karte" }, { type: "artikel" }];
  for (let t = 0; t < 10; t++) {
    let step = t < 6 ? session.plan(session.i, t) : FALLBACK[t - 6];
    if (!step) { if (session.plan === PLAN.fehler) break; step = FALLBACK[t % 4]; }
    const fn = EX[step.type];
    const ok = fn && fn(box, res => { if (res) session.r++; else session.f++; session.i++; window.scrollTo(0, 0); sessionNext(host); }, Object.assign({}, step.opt || {}));
    if (ok) return;
  }
  if (session.i === 0) { box.innerHTML = `<div class="card empty"><h3>Gerade nichts zu üben</h3><p>Für heute ist alles erledigt. <span class="ru">На сегодня всё!</span></p></div>`; return; }
  sessionEnd(host);
}
function kursResultHtml(n) {
  const i = session.kurs, p = pct(session.r, n), ks = kursState();
  if (n && session.kursSaved !== true) { session.kursSaved = true; ks.best[i] = Math.max(ks.best[i] || 0, p); if (p >= KURS_PASS && ks.s <= i) ks.s = Math.min(KURS.length, i + 1); saveP(); }
  if (p >= KURS_PASS) return `<div class="feedback ok">Stufe ${i + 1} geschafft (${p} %)!${i + 1 < KURS.length ? " Die nächste Stufe ist frei." : " Der Grundkurs ist komplett!"}</div><p class="ru">Ступень пройдена!</p>`;
  return `<div class="feedback bad">${p} % richtig – für die nächste Stufe brauchst du ${KURS_PASS} %. Mach die Stufe noch einmal.</div><p class="ru">Нужно ${KURS_PASS} %. Повтори эту ступень ещё раз.</p>`;
}
function sessionEnd(host) {
  const n = session.r + session.f;
  $("#sprog", host).style.width = "100%";
  host.querySelector("#exHost").innerHTML = `
    <div class="card" style="text-align:center">
      <h2>${n ? (pct(session.r, n) >= 80 ? "Super gemacht!" : pct(session.r, n) >= 60 ? "Gut gemacht!" : "Weiter so!") : "Fertig"}</h2>
      <p class="ru">${n ? (pct(session.r, n) >= 80 ? "Отлично!" : "Хорошо! Продолжай!") : ""}</p>
      <div class="kpis"><div><b>${n}</b><span>Aufgaben</span></div><div><b style="color:var(--ok)">${session.r}</b><span>richtig</span></div><div><b style="color:var(--bad)">${session.f}</b><span>falsch</span></div></div>
      ${session.kurs != null ? kursResultHtml(n) : ""}
      <div class="row"><button class="btn" id="home2">${session.kurs != null ? "Zum Grundkurs" : "Zur Übersicht"}</button><button class="btn primary" id="again">${session.kurs != null && n && pct(session.r, n) >= KURS_PASS && session.kurs + 1 < KURS.length ? "Nächste Stufe" : "Noch eine Runde"}</button></div>
    </div>`;
  if (session.kurs != null) {
    const i = session.kurs, passed = n && pct(session.r, n) >= KURS_PASS;
    $("#home2", host).onclick = () => go("kurs");
    $("#again", host).onclick = () => startKurs(passed && i + 1 < KURS.length ? i + 1 : i);
    return;
  }
  $("#home2", host).onclick = () => go("home");
  $("#again", host).onclick = () => { session.i = 0; session.r = 0; session.f = 0; render(); };
}
/* Pläne */
const PLAN = {
  mix: i => {
    const order = ["karte", "bauen", "karte", "verb", "bedeutung", "rf", "karte", "bauen", "artikel", "diktat", "karte", "verb", "hoeren", "bauen", "karte", "rf", "luecke", "bauen", "verb", "hoeren"];
    const type = order[i % order.length];
    // Satzbau-Aufgaben im Tagesmix: jede zweite aus den schwächsten Grammatik-Themen
    if (["bauen", "verb", "rf", "diktat"].includes(type) && i % 2 === 1) return { type, opt: { cats: weakCats() } };
    return { type };
  },
  schwach: (i, t) => { const c = weakCats(); return { type: t > 2 ? "bauen" : ["bauen", "verb", "bauen", "rf", "verb", "diktat"][i % 6], opt: { cats: c } }; },
  kat: (i, t) => ({ type: t > 2 ? "bauen" : ["bauen", "verb", "rf", "bauen"][i % 4], opt: { cats: [session.kat] } }),
  satzbau: (i, t) => ({ type: t > 1 ? "bauen" : ["bauen", "verb", "rf", "bauen", "diktat", "verb", "bauen", "rf"][i % 8] }),
  bauen: () => ({ type: "bauen" }), verb: () => ({ type: "verb" }), rf: () => ({ type: "rf" }), diktat: () => ({ type: "diktat" }),
  karten: () => ({ type: "karte" }),
  quiz: (i, t) => ({ type: t > 2 ? "bedeutung" : ["bedeutung", "artikel", "luecke", "hoeren", "wortart", "artikel", "bedeutung", "hoeren"][i % 8] }),
  hoeren: () => ({ type: "hoeren" }),
  bedeutung: () => ({ type: "bedeutung" }), artikel: () => ({ type: "artikel" }), luecke: () => ({ type: "luecke" }), wortart: () => ({ type: "wortart" }),
  fehler: i => {
    const refs = Object.entries(P.fehler).sort((a, b) => b[1] - a[1]).map(x => x[0]);
    const ref = refs[i % Math.max(1, refs.length)];
    if (!ref) return null;
    if (SBYID[ref]) { const s = SBYID[ref]; return { type: s.de.includes("*") && i % 2 ? "verb" : "bauen", opt: { sent: s } }; }
    if (WBYID[ref]) return { type: i % 2 ? "bedeutung" : "karte", opt: { word: WBYID[ref], dir: "de" } };
    return null;
  }
};

/* ================= Ansichten ================= */
const app = $("#app");
let view = "home", viewArg = null;
const PARENT = { kurs: "home", pr: "pruefung", analyse: "statistik", session: "home", schreiben: "mehr", aufgabe: "schreiben", regeln: "mehr", liste: "mehr", einstellungen: "mehr", sicherung: "mehr" };
function go(v, arg) { view = v; viewArg = arg; render(); window.scrollTo(0, 0); }
window.appBack = function () { if (PARENT[view]) { go(PARENT[view]); return true; } if (view !== "home") { go("home"); return true; } return false; };
document.querySelectorAll("#tabs button").forEach(b => b.onclick = () => go(b.dataset.go));
function head(title, back) { return `<div class="top">${back ? `<button class="back" id="backBtn">${esc(back)}</button>` : ""}</div><h1>${title}</h1>`; }
function bindBack() { const b = $("#backBtn"); if (b) b.onclick = () => window.appBack(); }

function render() {
  const tabFor = { kurs: "home", pr: "pruefung", analyse: "statistik", session: "home", schreiben: "mehr", aufgabe: "mehr", regeln: "mehr", liste: "mehr", einstellungen: "mehr", sicherung: "mehr", quiz: "woerter" }[view] || view;
  document.querySelectorAll("#tabs button").forEach(b => b.setAttribute("aria-current", b.dataset.go === tabFor ? "page" : "false"));
  (VIEWS[view] || VIEWS.home)();
  bindBack();
}

function streak() {
  let s = 0; const d = new Date();
  if (!(ST.days[dayKey(d)] && ST.days[dayKey(d)].n >= 10)) d.setDate(d.getDate() - 1);
  while (ST.days[dayKey(d)] && ST.days[dayKey(d)].n >= 10) { s++; d.setDate(d.getDate() - 1); }
  return s;
}
function counts() {
  const now = dayNum(); const wp = wordPool();
  const dueW = wp.filter(w => P.w[w.id] && P.w[w.id].d <= now).length;
  const newW = Math.min(newLeft(), wp.filter(w => !P.w[w.id]).length);
  const learned = W.filter(w => P.w[w.id] && P.w[w.id].b >= 3).length;
  const sure = W.filter(w => P.w[w.id] && P.w[w.id].b >= 5).length;
  const seenW = W.filter(w => P.w[w.id]).length;
  const sentSeen = S.filter(s => P.s[s.id]).length;
  const sentOk = S.filter(s => P.s[s.id] && P.s[s.id].b >= 2).length;
  return { dueW, newW, learned, sure, seenW, sentSeen, sentOk };
}

const VIEWS = {};
VIEWS.home = function () {
  if (!SET.onboarded) return VIEWS.onboarding();
  const d = today(); const c = counts(); const g = Math.min(100, pct(d.n, SET.goal));
  const fehlerN = Object.keys(P.fehler).length;
  app.innerHTML = `
    <h1>${SET.name ? "Hallo, " + esc(SET.name) + "!" : "Deutsch lernen"}</h1>
    ${kursState().s < KURS.length ? kursCard() : ""}
    <div class="card">
      <div class="row between"><h3>Heute</h3><span class="hint">${streak() ? "🔥 " + streak() + (streak() === 1 ? " Tag" : " Tage") + " in Folge" : ""}</span></div>
      <div class="today">
        <div><b>${d.n}</b><span>Aufgaben</span></div>
        <div><b style="color:var(--ok)">${d.r}</b><span>richtig</span></div>
        <div><b style="color:var(--bad)">${d.n - d.r}</b><span>falsch</span></div>
        <div><b>${Math.round(d.sec / 60)}</b><span>Minuten</span></div>
      </div>
      <div class="goalbar" aria-label="Tagesziel"><i style="width:${g}%"></i></div>
      <p class="hint small">Tagesziel: ${d.n} von ${SET.goal} Aufgaben${d.n >= SET.goal ? " – geschafft! 🎉" : ""} · <span class="ru">Цель дня</span></p>
      <button class="btn primary big" id="mix">▶ Tagesmix starten</button>
      <p class="hint small" style="text-align:center">20 Aufgaben gemischt · Satzbau-Schwerpunkt: ${esc(CATS[weakCats()[0]].l)}</p>
      <p class="hint small" style="text-align:center">💡 Tipp: Ein deutsches Wort lange drücken (markieren) → Erklärung und Übersetzung · <span class="ru">выдели слово → перевод</span></p>
    </div>
    ${kursState().s >= KURS.length ? kursCard() : ""}
    <div class="menu">
      <button data-s="karten"><span class="ic">▤</span><b>Karteikarten</b><span>${c.dueW} Wiederholungen · ${c.newW} neu</span></button>
      <button data-s="satzbau"><span class="ic">⇄</span><b>Satzbau</b><span>Wortstellung üben</span></button>
      <button data-s="pruefung"><span class="ic">★</span><b>Prüfung ${esc(exam())}</b><span>Schreiben, Sprechen, Hören</span></button>
      <button data-s="quiz"><span class="ic">?</span><b>Quiz</b><span>Bedeutung, Artikel, Lücken</span></button>
      <button data-s="fehler" ${fehlerN ? "" : "disabled"}><span class="ic">!</span><b>Fehler üben</b><span>${fehlerN ? fehlerN + " schwierige Aufgaben" : "noch keine Fehler"}</span></button>
    </div>
    <div class="card">
      <div class="row between"><h3>Dein Wortschatz</h3><span class="hint small">${W.length} Wörter · ${S.length} Sätze</span></div>
      <div class="kpis"><div><b>${c.seenW}</b><span>gesehen</span></div><div><b>${c.learned}</b><span>gelernt</span></div><div><b>${c.sentSeen}</b><span>Sätze geübt</span></div></div>
    </div>`;
  $("#mix").onclick = () => startSession("Tagesmix", PLAN.mix, 20);
  const kg = $("#kursGo"); if (kg) kg.onclick = () => startKurs(Math.min(kursState().s, KURS.length - 1));
  const ko = $("#kursOpen"); if (ko) ko.onclick = () => go("kurs");
  app.querySelectorAll(".menu button").forEach(b => b.onclick = () => {
    const s = b.dataset.s;
    if (s === "karten") startSession("Karteikarten", PLAN.karten, 20);
    else if (s === "satzbau") go("satzbau");
    else if (s === "quiz") go("quiz");
    else if (s === "pruefung") go("pruefung");
    else if (s === "fehler") startSession("Fehler üben", PLAN.fehler, Math.min(20, Object.keys(P.fehler).length * 2 || 1));
  });
};
function kursCard() {
  const ks = kursState(), cur = Math.min(ks.s, KURS.length - 1), fertig = ks.s >= KURS.length;
  return `<div class="card">
      <div class="row between"><h3>Grundkurs von vorn</h3><span class="hint small">${Math.min(ks.s, KURS.length)} von ${KURS.length} Stufen</span></div>
      <div class="goalbar"><i style="width:${pct(Math.min(ks.s, KURS.length), KURS.length)}%"></i></div>
      <p class="hint small">${fertig ? "Alle Stufen geschafft – wiederhole schwache Stufen." : `Stufe ${cur + 1}: ${esc(KURS[cur].t)}`} · <span class="ru">${fertig ? "Все ступени пройдены" : esc(KURS[cur].ru)}</span></p>
      <div class="row"><button class="btn primary" id="kursGo">${fertig ? "▶ Abschluss wiederholen" : "▶ Weiter im Grundkurs"}</button><button class="btn" id="kursOpen">Alle Stufen</button></div>
    </div>`;
}
VIEWS.kurs = function () {
  const ks = kursState();
  app.innerHTML = `${head("Grundkurs von vorn", "Zurück")}
    <p class="hint">Jede Stufe hat ${KURS_LEN} Aufgaben. Mit mindestens ${KURS_PASS} % richtig öffnet sich die nächste Stufe. Es geht mit einfachen Sätzen los und wird dann schwerer.</p>
    <p class="ru">Каждая ступень — ${KURS_LEN} заданий. Нужно ${KURS_PASS} %, чтобы открыть следующую. Сначала простые предложения, потом сложнее.</p>
    <div class="list">${KURS.map((x, i) => {
      const open = i <= ks.s, done = i < ks.s, best = ks.best[i];
      const tip = x.k ? CATS[x.k].tip : "Alle Regeln gemischt.";
      return `<div class="card" style="${open ? "" : "opacity:.55"}">
        <div class="row between"><h3>${done ? "✓" : open ? "▶" : "🔒"} Stufe ${i + 1}: ${esc(x.t)}</h3>${sayBtn(x.t + ". " + tip)}</div>
        <p class="ru small">${esc(x.ru)}</p>
        <div class="rule">${esc(tip)}</div>
        ${best != null ? `<p class="hint small">Bestes Ergebnis: ${best} %</p>` : ""}
        ${open ? `<button class="btn ${done ? "" : "primary"}" data-k="${i}">${done ? "Wiederholen" : "Stufe starten"}</button>` : `<p class="hint small">Erst Stufe ${i} schaffen.</p>`}
      </div>`; }).join("")}</div>`;
  app.querySelectorAll("[data-k]").forEach(b => b.onclick = () => startKurs(+b.dataset.k));
};
VIEWS.onboarding = function () {
  app.innerHTML = `
    <h1>Willkommen!</h1>
    <p class="ru">Добро пожаловать! Это приложение поможет подготовиться к экзамену B1/B2.</p>
    <div class="card">
      <label>Wie heißt du? <span class="ru" style="font-weight:400">Как тебя зовут?</span><input id="obName" autocomplete="given-name" placeholder="Vorname"></label>
      <label>Welche Prüfung? <span class="ru" style="font-weight:400">Какой экзамен?</span>
        <select id="obEx"><option value="DTB">DTB B2 – Deutsch-Test für den Beruf</option><option value="DTZ">DTZ – Deutsch-Test für Zuwanderer (A2–B1)</option></select></label>
      <label>Welches Niveau? <span class="ru" style="font-weight:400">Какой уровень?</span>
        <select id="obLv"><option value="B1">nur B1</option><option value="alle" selected>B1 und B2</option><option value="B2">nur B2</option></select></label>
      <label>Wie viel pro Tag? <span class="ru" style="font-weight:400">Сколько в день?</span>
        <select id="obGoal"><option value="40">locker – 40 Aufgaben (~15 Min.)</option><option value="60" selected>normal – 60 Aufgaben (~20 Min.)</option><option value="100">intensiv – 100 Aufgaben (~35 Min.)</option></select></label>
      <button class="btn primary big" id="obGo">Los geht's! · Начать</button>
    </div>`;
  $("#obGo").onclick = () => { SET.name = $("#obName").value.trim(); SET.exam = $("#obEx").value; SET.niveau = $("#obLv").value; SET.goal = +$("#obGoal").value; SET.onboarded = true; SET.start = dayKey(); saveSET(); go("home"); };
};
VIEWS.session = function () {
  if (!session) return go("home");
  app.innerHTML = `
    <div class="top"><button class="back" id="backBtn">Beenden</button><span class="hint" id="scount"></span></div>
    <div class="prog"><div class="goalbar"><i id="sprog"></i></div></div>
    <div id="exHost" class="panel"></div>`;
  sessionNext(app);
};
VIEWS.woerter = function () {
  const c = counts();
  app.innerHTML = `${head("Wörter")}
    <div class="card"><h3>Karteikarten</h3><p class="hint">Heute: ${c.dueW} Wiederholungen und ${c.newW} neue Wörter. Gelernte Wörter kommen nach 1, 3, 7, 14, 30 … Tagen wieder.</p>
      <button class="btn primary" id="k1">Karten lernen</button>
      <div class="row"><button class="btn small" id="kRu">Russisch → Deutsch</button><button class="btn small" id="kMore">+5 neue Wörter heute</button></div></div>
    <h2>Quiz</h2>
    <div class="menu">
      <button data-q="quiz"><span class="ic">✱</span><b>Gemischt</b><span>alle Quizarten</span></button>
      <button data-q="bedeutung"><span class="ic">?</span><b>Bedeutung</b><span>Wort ↔ Erklärung auf Deutsch</span></button>
      <button data-q="hoeren" ${HAS_TTS ? "" : "disabled"}><span class="ic">🔊</span><b>Hörtraining</b><span>${HAS_TTS ? "hören und erkennen" : "Vorlesen nicht verfügbar"}</span></button>
      <button data-q="artikel"><span class="ic">d/d/d</span><b>der, die, das</b><span>Artikel trainieren</span></button>
      <button data-q="luecke"><span class="ic">_</span><b>Lückentext</b><span>Wort im Satz finden</span></button>
      <button data-q="wortart"><span class="ic">Aa</span><b>Wortart</b><span>Nomen, Verb, …</span></button>
      <button data-q="liste"><span class="ic">≡</span><b>Wortliste</b><span>alle Wörter suchen</span></button>
    </div>`;
  $("#k1").onclick = () => startSession("Karteikarten", PLAN.karten, 20);
  $("#kRu").onclick = () => { const seen = seenWords(wordPool()); if (seen.length < 5) { toast("Lerne zuerst ein paar Karten."); return; } startSession("Russisch → Deutsch", () => ({ type: "karte", opt: { word: rnd(seen), dir: "ru" } }), 20); };
  $("#kMore").onclick = () => { P.newCount = Math.max(0, P.newCount - 5); saveP(); toast("5 neue Wörter freigeschaltet"); render(); };
  app.querySelectorAll("[data-q]").forEach(b => b.onclick = () => { const q = b.dataset.q; if (q === "liste") go("liste"); else startSession(TYPE_NAMES[q] || "Quiz", PLAN[q], 20); });
};
VIEWS.quiz = VIEWS.woerter;
VIEWS.satzbau = function () {
  const marked = sentPool(true).length, all = sentPool(false).length;
  app.innerHTML = `${head("Satzbau")}
    <p class="hint">Hier trainierst du die Wortstellung. Das ist der wichtigste Teil, wenn Wörter oft vertauscht werden. <span class="ru">Здесь ты тренируешь порядок слов.</span></p>
    <button class="btn primary big" id="sbWeak">▶ Meine Schwächen trainieren</button>
    <p class="hint small" style="text-align:center">Schwerpunkt jetzt: ${weakCats().map(k => esc(CATS[k].l)).join(" · ")}</p>
    <button class="btn" id="sbMix">Satzbau gemischt</button>
    <div class="menu">
      <button data-p="bauen"><span class="ic">⇄</span><b>Satz bauen</b><span>${all} Sätze</span></button>
      <button data-p="verb"><span class="ic">V</span><b>Wo steht das Verb?</b><span>${marked} Sätze</span></button>
      <button data-p="rf"><span class="ic">✓✗</span><b>Richtig oder falsch?</b><span>Fehler erkennen</span></button>
      <button data-p="diktat" ${HAS_TTS ? "" : "disabled"}><span class="ic">🔊</span><b>Diktat</b><span>${HAS_TTS ? "hören und bauen" : "Vorlesen nicht verfügbar"}</span></button>
    </div>
    <div class="card"><h3>Die 3 wichtigsten Regeln</h3>
      <div class="ex">1. Hauptsatz: Verb auf <b>Position 2</b>.<br>2. Nebensatz (weil, dass, wenn …): Verb <b>ganz am Ende</b>.<br>3. Zwei Verbteile: Teil 2 <b>ans Ende</b> (Satzklammer).</div>
      ${HAS_TTS ? `<button class="btn small" data-say="Erstens: Im Hauptsatz steht das Verb auf Position 2. Zweitens: Im Nebensatz mit weil, dass oder wenn steht das Verb ganz am Ende. Drittens: Wenn das Verb zwei Teile hat, steht der zweite Teil ganz am Ende." style="align-self:flex-start">🔊 Regeln vorlesen</button>` : ""}
      <div class="rubox">1. Главное предложение: глагол на <b>2-м месте</b>. 2. Придаточное: глагол <b>в конце</b>. 3. Вторая часть глагола — <b>в конец</b>.</div>
      <button class="btn small" id="toRules">Alle Regeln ansehen</button>
      <label class="check"><input type="checkbox" id="leicht" ${SET.leicht ? "checked" : ""}> Leichter Modus: erstes Wort ist schon gesetzt</label>
    </div>`;
  $("#sbMix").onclick = () => startSession("Satzbau", PLAN.satzbau, 20);
  $("#sbWeak").onclick = () => startSession("Schwächen", PLAN.schwach, 20);
  app.querySelectorAll("[data-p]").forEach(b => b.onclick = () => startSession(TYPE_NAMES[b.dataset.p], PLAN[b.dataset.p], 20));
  $("#toRules").onclick = () => go("regeln");
  $("#leicht").onchange = e => { SET.leicht = e.target.checked; saveSET(); };
};

/* --- Statistik --- */
/* Erster Lerntag: ab hier zählen Tage ohne Lernen als Pause */
function startKey() { const ks = Object.keys(ST.days).filter(k => ST.days[k].n > 0 || ST.days[k].sec > 0).sort(); const k = [SET.start, ks[0]].filter(Boolean).sort()[0]; return k || dayKey(); }
/* Status eines Tages: frei (vor dem Start), heute, pause (0 Aufgaben), wenig, gelernt */
function dayStatus(x) {
  if (x.k < startKey()) return "vorher";
  if (x.d.n > 0) return x.d.n < Math.max(10, Math.round(SET.goal / 3)) ? "wenig" : "gelernt";
  return x.k === dayKey() ? "heute" : "pause";
}
function pauseDays(days) { return days.filter(x => dayStatus(x) === "pause"); }
function lastDays(n) { const out = []; const d = new Date(); for (let i = n - 1; i >= 0; i--) { const x = new Date(d); x.setDate(d.getDate() - i); const k = dayKey(x); out.push({ k, d: ST.days[k] || { n: 0, r: 0, sec: 0, t: {} } }); } return out; }
function chartSVG(days) {
  const Wd = 340, H = 170, L = 30, B = 26, top = 10; const max = Math.max(10, ...days.map(x => x.d.n));
  const step = Math.ceil(max / 4 / 10) * 10 || 10; const ymax = step * 4;
  const bw = (Wd - L - 6) / days.length; const y = v => top + (H - top - B) * (1 - v / ymax);
  let g = "";
  for (let v = 0; v <= ymax; v += step) g += `<line x1="${L}" x2="${Wd}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1"/><text x="${L - 5}" y="${y(v) + 4}" font-size="10" text-anchor="end" fill="var(--muted)">${v}</text>`;
  days.forEach((x, i) => {
    const cx = L + i * bw + 3; const w = Math.max(4, bw - 6);
    const r = x.d.r, f = x.d.n - x.d.r;
    if (r) g += `<rect x="${cx}" y="${y(r)}" width="${w}" height="${y(0) - y(r)}" fill="var(--ok)" rx="2"><title>${fmtDay(x.k)}: ${r} richtig</title></rect>`;
    if (f) g += `<rect x="${cx}" y="${y(r + f)}" width="${w}" height="${y(r) - y(r + f)}" fill="var(--bad)" rx="2"><title>${fmtDay(x.k)}: ${f} falsch</title></rect>`;
    if (dayStatus(x) === "pause") g += `<text x="${cx + w / 2}" y="${y(0) - 4}" font-size="13" font-weight="700" text-anchor="middle" fill="var(--bad)">✗<title>${fmtDay(x.k)}: nicht gelernt</title></text>`;
    if (days.length <= 14 || i % 2 === 0) g += `<text x="${cx + w / 2}" y="${H - 12}" font-size="9.5" text-anchor="middle" fill="${dayStatus(x) === "pause" ? "var(--bad)" : "var(--muted)"}">${wdOf(x.k)}</text><text x="${cx + w / 2}" y="${H - 2}" font-size="8.5" text-anchor="middle" fill="var(--muted)">${fmtDay(x.k).slice(0, 2)}</text>`;
  });
  return `<svg class="chart" viewBox="0 0 ${Wd} ${H}" role="img" aria-label="Aufgaben pro Tag">${g}</svg>`;
}
function typeTotals(days) {
  const t = {}; days.forEach(x => Object.entries(x.d.t || {}).forEach(([k, v]) => { t[k] = t[k] || { n: 0, r: 0 }; t[k].n += v.n; t[k].r += v.r; })); return t;
}
function refLabel(ref) {
  if (SBYID[ref]) return plainSent(SBYID[ref].de);
  if (WBYID[ref]) return deLabel(WBYID[ref]) + " – " + WBYID[ref].ru;
  return null;
}
function reportText() {
  const d = today(); const w7 = lastDays(7); const n7 = w7.reduce((a, x) => a + x.d.n, 0), r7 = w7.reduce((a, x) => a + x.d.r, 0);
  const sec7 = w7.reduce((a, x) => a + x.d.sec, 0); const act7 = w7.filter(x => x.d.n > 0).length;
  const p7 = pauseDays(w7); const p30 = pauseDays(lastDays(30));
  const pausenText = p7.length ? `\nNICHT gelernt (7 Tage): ${p7.map(x => wdOf(x.k) + " " + fmtDay(x.k)).join(", ")}` : "\nKein Tag ausgelassen (7 Tage) ✓";
  const tt = typeTotals(w7); const sb = ["bauen", "verb", "rf", "diktat"].reduce((a, k) => ({ n: a.n + (tt[k]?.n || 0), r: a.r + (tt[k]?.r || 0) }), { n: 0, r: 0 });
  const c = counts();
  const hard = Object.entries(P.fehler).sort((a, b) => b[1] - a[1]).slice(0, 3).map(x => refLabel(x[0])).filter(Boolean);
  return `📚 Deutsch-Lernbericht${SET.name ? " von " + SET.name : ""} – ${fmtDay(dayKey())}${new Date().getFullYear()}

Heute: ${d.n} Aufgaben, ${d.r} richtig, ${d.n - d.r} falsch (${pct(d.r, d.n)} %), ${Math.round(d.sec / 60)} Min.
Letzte 7 Tage: an ${act7} Tagen gelernt, ${n7} Aufgaben, ${pct(r7, n7)} % richtig, ${Math.round(sec7 / 60)} Min.${pausenText}
Pausentage in 30 Tagen: ${p30.length}
Satzbau (7 Tage): ${sb.n} Sätze, ${pct(sb.r, sb.n)} % richtig
Wortschatz: ${c.seenW} Wörter gesehen, ${c.learned} gelernt, ${c.sure} sicher
Serie: ${streak()} Tage in Folge${hard.length ? "\n\nSchwierig:\n- " + hard.join("\n- ") : ""}`;
}
async function shareReport() { return shareText(reportText()); }
async function shareText(text) {
  try { if (BR && BR.share) { BR.share(text); return; } } catch (e) { }
  try { if (navigator.share) { await navigator.share({ text }); return; } } catch (e) { if (e && e.name === "AbortError") return; }
  try { await navigator.clipboard.writeText(text); toast("Bericht kopiert – jetzt in WhatsApp einfügen"); return; } catch (e) { }
  const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); toast("Bericht kopiert"); } catch (e) { } ta.remove();
}
VIEWS.statistik = function () {
  const d = today(); const d14 = lastDays(14); const d30 = lastDays(30).reverse();
  const p14 = pauseDays(d14), p30 = pauseDays(lastDays(30));
  const counted14 = d14.filter(x => !["vorher", "heute"].includes(dayStatus(x))).length;
  const n7 = lastDays(7).reduce((a, x) => a + x.d.n, 0), r7 = lastDays(7).reduce((a, x) => a + x.d.r, 0);
  const tt = typeTotals(lastDays(30)); const c = counts();
  const hard = Object.entries(P.fehler).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([ref, n]) => ({ l: refLabel(ref), n })).filter(x => x.l);
  const total = Object.values(ST.days).reduce((a, x) => ({ n: a.n + x.n, r: a.r + x.r, sec: a.sec + x.sec }), { n: 0, r: 0, sec: 0 });
  app.innerHTML = `${head("Statistik")}
    <div class="card">
      <div class="row between"><h3>Heute</h3><span class="hint">${pct(d.r, d.n)} % richtig</span></div>
      <div class="today"><div><b>${d.n}</b><span>Aufgaben</span></div><div><b style="color:var(--ok)">${d.r}</b><span>richtig</span></div><div><b style="color:var(--bad)">${d.n - d.r}</b><span>falsch</span></div><div><b>${Math.round(d.sec / 60)}</b><span>Minuten</span></div></div>
      <div class="row"><button class="btn primary" id="share">Bericht senden (WhatsApp)</button><button class="btn" id="toAna">Fehleranalyse</button></div>
    </div>
    <div class="card">
      <div class="row between"><h3>Letzte 14 Tage</h3><div class="legend"><span><i style="background:var(--ok)"></i>richtig</span><span><i style="background:var(--bad)"></i>falsch</span></div></div>
      ${chartSVG(d14)}
      <div class="kpis"><div><b>${n7}</b><span>Aufgaben 7 Tage</span></div><div><b>${pct(r7, n7)} %</b><span>richtig 7 Tage</span></div><div><b>${streak()}</b><span>Tage in Folge</span></div></div>
    </div>
    <div class="card">
      <div class="row between"><h3>Tage ohne Lernen</h3><span class="hint small">seit ${fmtDay(startKey())}</span></div>
      <div class="kpis"><div><b style="color:${p14.length ? "var(--bad)" : "var(--ok)"}">${p14.length}</b><span>Pausen 14 Tage</span></div><div><b style="color:${p30.length ? "var(--bad)" : "var(--ok)"}">${p30.length}</b><span>Pausen 30 Tage</span></div><div><b>${counted14 - p14.length}/${counted14}</b><span>Tage gelernt (14)</span></div></div>
      ${p30.length ? `<p><b style="color:var(--bad)">Nicht gelernt:</b> ${p30.slice().reverse().map(x => wdOf(x.k) + " " + fmtDay(x.k)).join(", ")}</p>` : `<p class="feedback ok" style="text-align:left">Bisher kein Tag ausgelassen ✓</p>`}
    </div>
    <div class="card"><h3>Nach Übungsart <span class="hint small">(30 Tage)</span></h3>
      <div class="tablewrap"><table><tr><th>Übung</th><th class="num">Anzahl</th><th class="num">richtig</th><th></th></tr>
      ${Object.keys(TYPE_NAMES).filter(k => tt[k]).map(k => `<tr><td>${TYPE_NAMES[k]}</td><td class="num">${tt[k].n}</td><td class="num">${pct(tt[k].r, tt[k].n)} %</td><td><div class="bar"><i style="width:${pct(tt[k].r, tt[k].n)}%;background:${pct(tt[k].r, tt[k].n) >= 70 ? "var(--ok)" : pct(tt[k].r, tt[k].n) >= 50 ? "var(--accent)" : "var(--bad)"}"></i></div></td></tr>`).join("") || `<tr><td colspan="4" class="hint">Noch keine Übungen.</td></tr>`}
      </table></div></div>
    <div class="card"><h3>Jeder Tag</h3>
      <div class="tablewrap"><table><tr><th>Tag</th><th class="num">Aufg.</th><th class="num">richtig</th><th class="num">falsch</th><th class="num">%</th><th class="num">Min.</th></tr>
      ${d30.filter(x => dayStatus(x) !== "vorher").map(x => { const st = dayStatus(x);
        if (st === "pause") return `<tr style="background:var(--bad-soft)"><td>${wdOf(x.k)} ${fmtDay(x.k)}</td><td colspan="5" style="color:var(--bad);font-weight:700">✗ nicht gelernt</td></tr>`;
        if (st === "heute") return `<tr><td>${wdOf(x.k)} ${fmtDay(x.k)}</td><td colspan="5" class="hint">heute noch nicht gelernt</td></tr>`;
        return `<tr><td>${wdOf(x.k)} ${fmtDay(x.k)}${st === "wenig" ? ` <span class="pill" style="color:var(--accent);border-color:var(--accent)">wenig</span>` : ""}</td><td class="num">${x.d.n}</td><td class="num" style="color:var(--ok)">${x.d.r}</td><td class="num" style="color:var(--bad)">${x.d.n - x.d.r}</td><td class="num">${pct(x.d.r, x.d.n)}</td><td class="num">${Math.round(x.d.sec / 60)}</td></tr>`; }).join("") || `<tr><td colspan="6" class="hint">Noch keine Daten.</td></tr>`}
      </table></div>
      <p class="hint small">Insgesamt: ${total.n} Aufgaben, ${pct(total.r, total.n)} % richtig, ${Math.round(total.sec / 60)} Minuten.</p></div>
    <div class="card"><h3>Wortschatz</h3>
      <div class="kpis"><div><b>${c.seenW}</b><span>gesehen</span></div><div><b>${c.learned}</b><span>gelernt</span></div><div><b>${c.sure}</b><span>sicher</span></div></div>
      <p class="hint small">„Gelernt“ = mindestens 3-mal hintereinander gewusst. „Sicher“ = 5-mal. Von ${W.length} Wörtern.</p>
      <div class="kpis"><div><b>${c.sentSeen}</b><span>Sätze geübt</span></div><div><b>${c.sentOk}</b><span>sicher gebaut</span></div><div><b>${S.length}</b><span>Sätze gesamt</span></div></div></div>
    <div class="card"><h3>Häufigste Fehler</h3>
      ${hard.length ? `<div class="list">${hard.map(x => `<div class="li"><div class="t">${esc(x.l)}</div><span class="pill">${x.n}×</span></div>`).join("")}</div><button class="btn" id="fx">Diese Fehler üben</button>` : `<p class="hint">Noch keine Fehler gespeichert.</p>`}
    </div>`;
  $("#share").onclick = shareReport;
  $("#toAna").onclick = () => go("analyse");
  if ($("#fx")) $("#fx").onclick = () => startSession("Fehler üben", PLAN.fehler, Math.min(20, Object.keys(P.fehler).length * 2));
};

/* --- Fehleranalyse --- */
let anaDays = 30;
function barRow(label, x, extra) {
  const p = Math.round(100 * rate(x));
  const col = p >= 80 ? "var(--ok)" : p >= 60 ? "var(--accent)" : "var(--bad)";
  return `<tr><td style="white-space:normal">${label}</td><td class="num">${x.n}</td><td class="num"><b style="color:${col}">${p} %</b></td><td><div class="bar"><i style="width:${p}%;background:${col}"></i></div></td>${extra !== undefined ? `<td>${extra}</td>` : ""}</tr>`;
}
const FEHLERART = { verb: "Verb an falscher Stelle", rest: "Verb richtig, andere Wörter vertauscht", reihe: "Wörter vertauscht", "fehler-uebersehen": "Falschen Satz für richtig gehalten", "richtig-als-falsch": "Richtigen Satz für falsch gehalten" };
function wrongList(A, max) {
  return Object.entries(A.wrong).filter(([id]) => SBYID[id]).sort((a, b) => b[1].n - a[1].n).slice(0, max).map(([id, x]) => ({ id, n: x.n, s: SBYID[id], last: x.last }));
}
VIEWS.analyse = function () {
  const A = analyse(anaDays);
  const cats = Object.entries(A.cat).filter(([k]) => CATS[k]).sort((a, b) => rate(a[1]) - rate(b[1]));
  const enough = cats.filter(([k, v]) => v.n >= 3);
  const weak = weakCats();
  const fa = Object.entries(A.fehlerArt).sort((a, b) => b[1] - a[1]); const faSum = fa.reduce((s, x) => s + x[1], 0);
  const arts = ["der", "die", "das"].filter(a => A.art[a]);
  const verw = Object.entries(A.artVerw).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const themen = Object.entries(A.thema).filter(([k, v]) => v.n >= 4).sort((a, b) => rate(a[1]) - rate(b[1])).slice(0, 8);
  const wa = Object.entries(A.wortart).filter(([k, v]) => v.n >= 4).sort((a, b) => rate(a[1]) - rate(b[1]));
  const wl = wrongList(A, 10);
  app.innerHTML = `${head("Fehleranalyse", "Statistik")}
    <div class="seg" id="anaSeg"><button data-d="7" aria-pressed="${anaDays === 7}">7 Tage</button><button data-d="30" aria-pressed="${anaDays === 30}">30 Tage</button><button data-d="0" aria-pressed="${anaDays === 0}">Alles</button></div>
    ${A.n < 20 ? `<div class="card"><p>Noch wenig Daten (${A.n} Antworten). Nach ein paar Tagen Lernen wird die Auswertung genauer.</p><p class="ru small">Пока мало данных. Через несколько дней анализ станет точнее.</p></div>` : ""}
    <div class="card">
      <h3>Empfehlung</h3>
      ${weak.map(k => `<div class="rule"><b>${esc(CATS[k].l)}</b>${A.cat[k] ? ` – ${Math.round(100 * rate(A.cat[k]))} % richtig` : " – noch nicht geübt"}<br>${esc(CATS[k].tip)}<br><span class="ru">${esc(CATS[k].ru)}</span></div>`).join("")}
      <button class="btn primary" id="anaWeak">▶ Genau diese Themen üben</button>
    </div>
    <div class="card"><h3>Satzbau nach Grammatik-Thema</h3>
      ${cats.length ? `<div class="tablewrap"><table><tr><th>Thema</th><th class="num">Anz.</th><th class="num">richtig</th><th></th><th></th></tr>
      ${cats.map(([k, v]) => barRow(esc(CATS[k].l), v, `<button class="btn small" data-kat="${k}">üben</button>`)).join("")}</table></div>
      <p class="hint small">Sortiert vom schwächsten zum stärksten Thema. ${enough.length < cats.length ? "Themen mit weniger als 3 Antworten sind noch ungenau." : ""}</p>` : `<p class="hint">Noch keine Satzbau-Übungen gemacht.</p>`}
    </div>
    <div class="card"><h3>Welche Fehler passieren?</h3>
      ${faSum ? `<div class="tablewrap"><table>${fa.map(([k, n]) => `<tr><td style="white-space:normal">${esc(FEHLERART[k] || k)}</td><td class="num">${n}×</td><td class="num">${Math.round(100 * n / faSum)} %</td></tr>`).join("")}</table></div>` : `<p class="hint">Noch keine Fehler beim Satzbau.</p>`}
    </div>
    <div class="card"><h3>Artikel der / die / das</h3>
      ${arts.length ? `<div class="tablewrap"><table><tr><th>richtig wäre</th><th class="num">Anz.</th><th class="num">richtig</th><th></th></tr>${arts.map(a => barRow(`<b class="art-${a}">${a}</b>`, A.art[a])).join("")}</table></div>
      ${verw.length ? `<p class="hint small">Häufigste Verwechslungen: ${verw.map(([k, n]) => esc(k) + " (" + n + "×)").join(", ")}</p>` : ""}` : `<p class="hint">Noch keine Artikel-Übungen.</p>`}
    </div>
    <div class="card"><h3>Wortschatz nach Thema</h3>
      ${themen.length ? `<div class="tablewrap"><table><tr><th>Thema</th><th class="num">Anz.</th><th class="num">richtig</th><th></th></tr>${themen.map(([k, v]) => barRow(esc(k), v)).join("")}</table></div>` : `<p class="hint">Noch zu wenig Daten.</p>`}
      ${wa.length ? `<p class="hint small">Nach Wortart: ${wa.map(([k, v]) => esc(k) + " " + Math.round(100 * rate(v)) + " %").join(" · ")}</p>` : ""}
    </div>
    <div class="card"><h3>Diese Sätze waren am schwersten</h3>
      ${wl.length ? `<div class="list">${wl.map(x => `<div class="li"><div class="t"><span class="solution" style="font-size:16px">${solutionHtml(x.s.de)}</span>${x.last && ["bauen", "diktat"].includes(x.last.y) && x.last.a ? `<small>Zuletzt gebaut: <s>${esc(x.last.a)}</s></small>` : ""}<small>${esc(CATS[x.s.k] ? CATS[x.s.k].l : "")}</small></div><span class="pill">${x.n}×</span></div>`).join("")}</div>` : `<p class="hint">Noch keine schweren Sätze.</p>`}
    </div>
    <div class="card"><h3>Auswertung weitergeben</h3>
      <p class="hint">Schickt die genaue Auswertung als Text, zum Beispiel an Mario. Damit können neue Übungen genau auf die Schwächen abgestimmt werden.</p>
      <button class="btn" id="anaShare">Auswertung teilen</button>
    </div>`;
  app.querySelectorAll("#anaSeg button").forEach(b => b.onclick = () => { anaDays = +b.dataset.d; render(); });
  $("#anaWeak").onclick = () => startSession("Schwächen", PLAN.schwach, 20);
  app.querySelectorAll("[data-kat]").forEach(b => b.onclick = () => startSession(CATS[b.dataset.kat].l, PLAN.kat, 15, b.dataset.kat));
  $("#anaShare").onclick = () => shareText(analyseText());
};
function analyseText() {
  const A = analyse(30); const pc = x => Math.round(100 * rate(x)) + " %";
  const cats = Object.entries(A.cat).filter(([k]) => CATS[k]).sort((a, b) => rate(a[1]) - rate(b[1]));
  const fa = Object.entries(A.fehlerArt).sort((a, b) => b[1] - a[1]);
  const verw = Object.entries(A.artVerw).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const themen = Object.entries(A.thema).filter(([k, v]) => v.n >= 4).sort((a, b) => rate(a[1]) - rate(b[1])).slice(0, 6);
  const typ = Object.entries(A.typ).sort((a, b) => b[1].n - a[1].n);
  const wl = wrongList(A, 20);
  const L = [];
  L.push(`DEUTSCH-AUSWERTUNG${SET.name ? " – " + SET.name : ""} (letzte 30 Tage, ${A.n} Antworten, Stand ${new Date().toLocaleDateString("de-DE")})`);
  L.push("", "ÜBUNGSARTEN:"); typ.forEach(([k, v]) => L.push(`- ${TYPE_NAMES[k] || k}: ${v.n}×, ${pc(v)}`));
  L.push("", "SATZBAU NACH THEMA (schwächstes zuerst):"); cats.forEach(([k, v]) => L.push(`- ${CATS[k].l}: ${v.n}×, ${pc(v)}`));
  if (fa.length) { L.push("", "FEHLERARTEN:"); fa.forEach(([k, n]) => L.push(`- ${FEHLERART[k] || k}: ${n}×`)); }
  if (Object.keys(A.art).length) { L.push("", "ARTIKEL:"); ["der", "die", "das"].forEach(a => A.art[a] && L.push(`- ${a}: ${A.art[a].n}×, ${pc(A.art[a])}`)); verw.forEach(([k, n]) => L.push(`  Verwechslung ${k}: ${n}×`)); }
  if (themen.length) { L.push("", "SCHWÄCHSTE WORTTHEMEN:"); themen.forEach(([k, v]) => L.push(`- ${k}: ${pc(v)}`)); }
  if (wl.length) {
    L.push("", "SCHWERSTE SÄTZE (richtig → zuletzt gebaut):");
    wl.forEach(x => L.push(`- [${x.n}×, ${CATS[x.s.k] ? CATS[x.s.k].l : ""}] ${plainSent(x.s.de)}${x.last && ["bauen", "diktat"].includes(x.last.y) && x.last.a ? "  →  " + x.last.a : ""}`));
  }
  return L.join("\n");
}

/* ================= Prüfungstraining: DTB B2 (Beruf) oder DTZ (Zuwanderer) ================= */
let BERUF = {};
/* Antwortoptionen mischen, damit die richtige Antwort nicht immer an derselben Stelle steht */
function mixOpts(x) {
  if (Array.isArray(x)) { x.forEach(mixOpts); return x; }
  if (x && typeof x === "object") {
    if (Array.isArray(x.o) && typeof x.r === "number" && x.o[x.r] !== undefined && x.o.some(o => String(o).length > 6)) { const right = x.o[x.r]; x.o = shuffle(x.o); x.r = x.o.indexOf(right); }
    Object.values(x).forEach(v => { if (v && typeof v === "object") mixOpts(v); });
  }
  return x;
}
const EXAMS = { DTB: "DTB B2 (Deutsch-Test für den Beruf)", DTZ: "DTZ (Deutsch-Test für Zuwanderer, A2–B1)" };
const PR_TYPES = {
  mail: { l: { DTB: "E-Mail beantworten" }, g: "Schreiben", ic: "✉", min: 20 },
  notiz: { l: { DTB: "Telefonnotiz" }, g: "Schreiben", ic: "☎", min: 5 },
  forum: { l: { DTB: "Forumsbeitrag" }, g: "Schreiben", ic: "💬", min: 25 },
  brief: { l: { DTZ: "Brief / E-Mail schreiben" }, g: "Schreiben", ic: "✉", min: 30 },
  sb: { l: { DTB: "Sprachbausteine", DTZ: "Brief-Lückentext (Lesen Teil 5)" }, g: "Schreiben", ic: "▦", min: 10 },
  fragen: { l: { DTB: "Prüferfragen (Teil 1B)", DTZ: "Sich vorstellen (Teil 1)" }, g: "Sprechen", ic: "❓", min: 3 },
  vortrag: { l: { DTB: "Vortrag (Teil 1A)", DTZ: "Über Erfahrungen erzählen (Teil 2)" }, g: "Sprechen", ic: "🎤", min: 3 },
  diskussion: { l: { DTB: "Diskussion (Teil 2)" }, g: "Sprechen", ic: "⇆", min: 5 },
  loesung: { l: { DTB: "Lösung finden (Teil 3)", DTZ: "Gemeinsam planen (Teil 3)" }, g: "Sprechen", ic: "✓", min: 5 },
  hoeren: { l: { DTB: "Hören im Beruf", DTZ: "Hören: Ansagen und Gespräche" }, g: "Hören", ic: "🔊", min: 2 },
  lesen: { l: { DTZ: "Lesen: Anzeigen und Wegweiser" }, g: "Lesen", ic: "📄", min: 5 }
};
function exam() { return SET.exam || "DTB"; }
function prLabel(t) { return PR_TYPES[t].l[exam()] || PR_TYPES[t].l.DTB || PR_TYPES[t].l.DTZ; }
function prTypesFor() { return Object.keys(PR_TYPES).filter(t => PR_TYPES[t].l[exam()]); }
function prList(typ) { return (BERUF[typ] || []).filter(x => !x.ex || x.ex.includes(exam())); }
function prDone(typ, id) { return (P.beruf || {})[typ + ":" + id]; }
function prMark(typ, id, ok) { P.beruf = P.beruf || {}; const k = typ + ":" + id; const x = P.beruf[k] || { n: 0, ok: 0 }; x.n++; if (ok) x.ok++; x.t = Date.now(); P.beruf[k] = x; saveP(); }
function prNext(typ, exclude) {
  const l = prList(typ).filter(x => x.id !== exclude); if (!l.length) return null;
  const un = l.filter(x => !prDone(typ, x.id)); if (un.length) return un[0];
  return l.slice().sort((a, b) => (prDone(typ, a.id).ok / prDone(typ, a.id).n) - (prDone(typ, b.id).ok / prDone(typ, b.id).n) || prDone(typ, a.id).t - prDone(typ, b.id).t)[0];
}
/* Timer */
let prTimer = null;
function startTimer(el, minutes, onEnd) {
  clearInterval(prTimer); let s = minutes * 60;
  const draw = () => { el.textContent = "⏱ " + Math.floor(s / 60) + ":" + pad(s % 60); el.style.color = s < 60 ? "var(--bad)" : ""; };
  draw(); prTimer = setInterval(() => { s--; draw(); if (s <= 0) { clearInterval(prTimer); el.textContent = "⏱ Zeit ist um!"; onEnd && onEnd(); } }, 1000);
}
function stopTimer() { clearInterval(prTimer); }
/* Punkte-Rechner DTZ: Hören+Lesen (max 45): ab 33 B1, ab 20 A2. B1 gesamt: Sprechen B1 + (H/L oder Schreiben) B1 + anderer Teil mind. A2 (seit 1.11.2026) */
function dtzCheck(v) {
  const hl = +v.hl || 0; const hlLv = hl >= 33 ? "B1" : hl >= 20 ? "A2" : "unter A2";
  const s = v.s || "", sp = v.sp || ""; const tips = []; const rank = { "B1": 2, "A2": 1, "unter A2": 0, "": -1 };
  const ok = sp === "B1" && ((hlLv === "B1" && rank[s] >= 1) || (s === "B1" && rank[hlLv] >= 1));
  if (sp !== "B1") tips.push("Sprechen muss B1 sein.");
  if (!(hlLv === "B1" || s === "B1")) tips.push(`Hören/Lesen (${hl} von 45 → ${hlLv}) oder Schreiben muss B1 sein. Für B1 in Hören/Lesen: mindestens 33 Punkte.`);
  if ((hlLv === "B1" && rank[s] < 1) || (s === "B1" && rank[hlLv] < 1)) tips.push("Der andere schriftliche Teil muss mindestens A2 sein (neue Regel seit 1.11.2026).");
  return { ok, hlLv, tips };
}
/* Punkte-Rechner nach DTB-Regel: Summe ≥ 144, mind. 3 Teile ≥ 36, schwächster Teil ≥ 24 */
function dtbCheck(v) {
  const vals = [v.l, v.h, v.s, v.sp].map(x => +x || 0); const sum = vals.reduce((a, b) => a + b, 0);
  const ge36 = vals.filter(x => x >= 36).length; const min = Math.min(...vals);
  const ok = sum >= 144 && ge36 >= 3 && min >= 24;
  const tips = [];
  if (sum < 144) tips.push(`Summe: ${sum.toLocaleString("de-DE")} von mindestens 144 – es fehlen ${(144 - sum).toLocaleString("de-DE")} Punkte.`);
  if (ge36 < 3) { const names = ["Lesen", "Hören", "Schreiben", "Sprechen"]; const below = names.filter((n, i) => vals[i] < 36).map((n, i) => n); tips.push(`Nur ${ge36} Teile haben mindestens 36 Punkte – nötig sind 3. Unter 36: ${names.filter((n, i) => vals[i] < 36).join(", ")}.`); }
  if (min < 24) tips.push(`Der schwächste Teil hat ${min.toLocaleString("de-DE")} Punkte – nötig sind mindestens 24.`);
  return { ok, sum, ge36, min, tips };
}
function prCount(group) { return Object.keys(PR_TYPES).filter(t => PR_TYPES[t].g === group).reduce((a, t) => a + prList(t).length, 0); }
VIEWS.pruefung = function () {
  const X = exam();
  const v = SET.dtb || {}; const has = ["l", "h", "s", "sp"].some(k => v[k] !== undefined && v[k] !== "");
  const c = has ? dtbCheck(v) : null;
  const z = SET.dtz || {}; const cz = (z.hl || z.s || z.sp) ? dtzCheck(z) : null;
  const grp = g => prTypesFor().filter(t => PR_TYPES[t].g === g).map(t => {
    const l = prList(t); const done = l.filter(x => prDone(t, x.id)).length;
    return `<button data-pt="${t}" ${l.length ? "" : "disabled"}><span class="ic">${PR_TYPES[t].ic}</span><b>${esc(prLabel(t))}</b><span>${l.length ? done + " von " + l.length + " geübt" : "kommt bald"}</span></button>`;
  }).join("");
  const section = (g, title, hint) => { const h = grp(g); return h ? `<h2>${title} <span class="hint small">(${prTypesFor().filter(t => PR_TYPES[t].g === g).reduce((a, t) => a + prList(t).length, 0)} Aufgaben)</span></h2>${hint || ""}<div class="menu">${h}</div>` : ""; };
  const opt = (k, val) => `<option ${k === val ? "selected" : ""}>${k}</option>`;
  app.innerHTML = `${head("Prüfungstraining")}
    <div class="seg" id="exSeg"><button data-ex="DTB" aria-pressed="${X === "DTB"}">DTB B2 (Beruf)</button><button data-ex="DTZ" aria-pressed="${X === "DTZ"}">DTZ (A2–B1)</button></div>
    <p class="hint">${X === "DTB" ? "Training im Format „Deutsch-Test für den Beruf B2“: Situationen aus der Arbeitswelt." : "Training im Format „Deutsch-Test für Zuwanderer“: Situationen aus dem Alltag."} Wörter, Satzbau und Grammatik übst du wie bisher in den anderen Bereichen. <span class="ru">${X === "DTB" ? "Экзамен DTB B2 (для работы)." : "Экзамен DTZ (для иммигрантов)."}</span></p>
    ${X === "DTZ" ? `<div class="card">
      <h3>Mein Ziel: Punkte-Rechner DTZ</h3>
      <p class="hint small">B1 gilt, wenn <b>Sprechen B1</b> ist, dazu <b>Hören/Lesen oder Schreiben B1</b> und der andere schriftliche Teil <b>mindestens A2</b>. Hören + Lesen: ab 33 von 45 Punkten B1, ab 20 A2.</p>
      <div class="grid2"><label>Hören + Lesen (0–45) <input id="zhl" inputmode="numeric" value="${esc(z.hl ?? "")}"></label>
        <label>Schreiben <select id="zs"><option value="">–</option>${["B1", "A2", "unter A2"].map(k => opt(k, z.s)).join("")}</select></label>
        <label>Sprechen <select id="zsp"><option value="">–</option>${["B1", "A2", "unter A2"].map(k => opt(k, z.sp)).join("")}</select></label></div>
      <button class="btn small" id="zSave">Berechnen und speichern</button>
      ${cz ? `<div class="rule"><b style="color:${cz.ok ? "var(--ok)" : "var(--bad)"}">${cz.ok ? "B1 erreicht ✓" : "B1 noch nicht erreicht"}</b><br>${cz.tips.map(esc).join("<br>")}</div>` : ""}
    </div>` : `<div class="card">
      <h3>Mein Ziel: Punkte-Rechner</h3>
      <p class="hint small">Jeder Teil hat höchstens 60 Punkte. Bestanden: <b>Summe ≥ 144</b>, <b>mindestens 3 Teile ≥ 36</b> und <b>kein Teil unter 24</b>.</p>
      <div class="grid2">
        <label>Lesen <input id="dl" inputmode="decimal" value="${esc(v.l ?? "")}" placeholder="0–60"></label>
        <label>Hören <input id="dh" inputmode="decimal" value="${esc(v.h ?? "")}" placeholder="0–60"></label>
        <label>Schreiben <input id="ds" inputmode="decimal" value="${esc(v.s ?? "")}" placeholder="0–60"></label>
        <label>Sprechen <input id="dsp" inputmode="decimal" value="${esc(v.sp ?? "")}" placeholder="0–60"></label>
      </div>
      <button class="btn small" id="dSave">Berechnen und speichern</button>
      ${c ? `<div class="rule"><b style="color:${c.ok ? "var(--ok)" : "var(--bad)"}">${c.ok ? "Bestanden ✓" : "Noch nicht bestanden"}</b> · Summe ${c.sum.toLocaleString("de-DE")} / 240<br>${c.tips.map(esc).join("<br>")}${!c.ok ? "<br><b>Am schnellsten:</b> den schwächsten Teil auf mindestens 36 bringen." : ""}</div>` : ""}
    </div>`}
    ${section("Schreiben", "Schreiben")}
    ${section("Sprechen", "Sprechen", `<p class="hint small">Sprich immer <b>laut</b>, auch wenn du allein bist. Danach hörst du eine Musterlösung und bewertest dich selbst. <span class="ru">Всегда говори вслух!</span></p>`)}
    ${section("Hören", "Hören")}
    ${section("Lesen", "Lesen")}`;
  app.querySelectorAll("#exSeg button").forEach(b => b.onclick = () => { SET.exam = b.dataset.ex; saveSET(); render(); });
  if ($("#zSave")) $("#zSave").onclick = () => { SET.dtz = { hl: $("#zhl").value, s: $("#zs").value, sp: $("#zsp").value }; saveSET(); render(); };
  if ($("#dSave")) $("#dSave").onclick = () => { SET.dtb = { l: $("#dl").value.replace(",", "."), h: $("#dh").value.replace(",", "."), s: $("#ds").value.replace(",", "."), sp: $("#dsp").value.replace(",", ".") }; saveSET(); render(); };
  app.querySelectorAll("[data-pt]").forEach(b => b.onclick = () => { const t = b.dataset.pt; const x = prNext(t); if (x) go("pr", { typ: t, id: x.id }); });
};
VIEWS.pr = function () {
  stopTimer();
  const a = viewArg || {}; const typ = a.typ; const item = prList(typ).find(x => x.id === a.id);
  if (!item) return go("pruefung");
  const T = Object.assign({}, PR_TYPES[typ], { l: prLabel(typ) });
  const nextBtnHtml = `<button class="btn primary" id="prNext">Nächste Aufgabe →</button>`;
  const bindNext = () => { const b = $("#prNext"); if (b) b.onclick = () => { const x = prNext(typ, item.id); if (x) go("pr", { typ, id: x.id }); else go("pruefung"); }; };
  const selfRate = (logType) => `<div class="card"><h3>Wie gut hat es geklappt?</h3><p class="ru small">Как получилось?</p>
      <div class="choices"><button class="choice" data-r="2">😀 gut</button><button class="choice" data-r="1">🙂 teilweise</button><button class="choice" data-r="0">😕 schwer</button></div>
      <div id="rated" hidden class="panel">${nextBtnHtml}</div></div>`;
  const bindRate = (logType) => app.querySelectorAll("[data-r]").forEach(b => b.onclick = () => {
    if (!$("#rated").hidden) return; const r = +b.dataset.r; b.classList.add(r === 2 ? "right" : r === 0 ? "wrong" : "right");
    prMark(typ, item.id, r === 2); log(logType, r === 2, null, { pr: typ, pid: item.id, sr: r }); $("#rated").hidden = false; bindNext();
  });
  const head2 = `${head(esc(item.t), "Prüfung")}<div class="row between"><span class="pill">${esc(T.l)}</span><span class="pill" id="tm">⏱ ${T.min}:00</span></div>`;
  const timerBtn = `<button class="btn small" id="tStart">⏱ Prüfungszeit starten (${T.min} Min.)</button>`;
  const bindTimer = () => { const b = $("#tStart"); if (b) b.onclick = () => { startTimer($("#tm"), T.min, () => toast("Die Zeit ist um!")); b.hidden = true; }; };
  const rmHtml = rm => rm && rm.length ? `<div><p class="hint small" style="margin-bottom:6px">Hilfreiche Sätze (antippen = anhören):</p><div class="chips">${rm.map(x => `<span data-say="${esc(x)}" style="cursor:pointer">${esc(x)}</span>`).join("")}</div></div>` : "";
  const model = (m, label) => `<div id="mo" hidden class="card"><div class="row between"><h3>${label || "Musterlösung"}</h3>${sayBtn(m, "Musterlösung vorlesen")}</div><div class="model">${esc(m)}</div></div>`;
  const writeBox = (key, ziel) => `<label>Dein Text <textarea id="tx" spellcheck="false"></textarea></label><p class="hint small" id="wc"></p>`;
  const bindWrite = (key, ziel) => { const tx = $("#tx"); tx.value = P.drafts["pr:" + key] || ""; const wc = () => { const n = (tx.value.trim().match(/\S+/g) || []).length; $("#wc").textContent = `${n} Wörter${ziel ? " · Ziel: mindestens " + ziel : ""}`; }; tx.oninput = () => { P.drafts["pr:" + key] = tx.value; saveP(); wc(); }; wc(); };
  const checklist = pts => `<h3>Checkliste</h3>${pts.map((x, i) => `<label class="check"><input type="checkbox" class="ck"> ${esc(x)}</label>`).join("")}`;
  const doneWriting = (ziel, logType = "schreiben") => {
    const n = ($("#tx").value.trim().match(/\S+/g) || []).length;
    if (n < Math.min(20, ziel || 20)) { toast("Schreib zuerst mindestens " + Math.min(20, ziel || 20) + " Wörter."); return false; }
    const cks = [...app.querySelectorAll(".ck")]; const all = cks.every(c => c.checked);
    stopTimer(); prMark(typ, item.id, all && (!ziel || n >= ziel)); log(logType, all && (!ziel || n >= ziel), null, { pr: typ, pid: item.id, w: n, ck: cks.filter(c => c.checked).length + "/" + cks.length });
    $("#mo").hidden = false; $("#mo").scrollIntoView({ behavior: "smooth", block: "start" }); return true;
  };

  if (typ === "brief") {
    app.innerHTML = `${head2}
      <div class="card">${task("Lies die Situation und schreib einen Brief oder eine E-Mail. Schreib zu allen Punkten.", "Прочитай ситуацию и напиши письмо по всем пунктам.")}
        <div class="row between"><h3>Situation</h3>${sayBtn(item.situation + " " + item.punkte.join(". "), "Aufgabe vorlesen")}</div>
        <p>${esc(item.situation)}</p><ul style="margin:0;padding-left:20px">${item.punkte.map(x => `<li>${esc(x)}</li>`).join("")}</ul>${item.ru ? `<div class="rubox">${esc(item.ru)}</div>` : ""}
        ${rmHtml(item.rm)}${timerBtn}${writeBox("brief:" + item.id, item.w || 0)}${checklist(["Anrede", ...item.punkte, "Gruß am Ende", "Verb im Nebensatz am Ende (weil, dass, wenn …)"])}
        <div class="row"><button class="btn" id="showM">Musterlösung zeigen</button><button class="btn primary" id="doneT">Fertig</button></div></div>
      ${model(item.m)}<div id="nx" hidden>${nextBtnHtml}</div>`;
    bindTimer(); bindWrite("brief:" + item.id, item.w || 0);
    $("#showM").onclick = () => { $("#mo").hidden = false; $("#nx").hidden = false; bindNext(); };
    $("#doneT").onclick = () => { if (doneWriting(item.w || 0)) { $("#nx").hidden = false; bindNext(); } };
  }
  else if (typ === "lesen") {
    app.innerHTML = `${head2}
      <div class="card">${task(item.anweisung || "Lies die Texte und beantworte die Fragen.", "Прочитай тексты и ответь на вопросы.")}
        <div class="row between"><h3>${esc(item.t)}</h3>${sayBtn(item.texte.map(x => (x.k ? x.k + ": " : "") + x.text).join(" "), "Texte vorlesen")}</div>
        ${item.texte.map(x => `<div class="ex">${x.k ? `<b>${esc(x.k)}</b> ` : ""}${esc(x.text)}</div>`).join("")}</div>
      <div class="card" id="lq"></div><div id="nx" hidden>${nextBtnHtml}</div>`;
    const lq = $("#lq"); let n = 0, r = 0;
    item.fragen.forEach((f, qi) => {
      const box = document.createElement("div"); box.className = "panel"; box.style.gap = "8px";
      box.innerHTML = `<div class="row between" style="flex-wrap:nowrap"><p style="flex:1"><b>${qi + 1}.</b> ${esc(f.q)}</p>${sayBtn(f.q)}</div><div class="choices ${f.o.length > 3 ? "two" : "one"}"></div>`;
      const ch = box.querySelector(".choices"); let done = false;
      f.o.forEach((o, oi) => { const b = document.createElement("button"); b.className = "choice"; b.textContent = o; b.onclick = () => {
        if (done) return; done = true; const ok = oi === f.r; n++; if (ok) r++; b.classList.add(ok ? "right" : "wrong"); if (!ok) ch.children[f.r].classList.add("right");
        log("lesen_pr", ok, null, { pr: typ, pid: item.id });
        if (n === item.fragen.length) { prMark(typ, item.id, r === n); $("#nx").hidden = false; bindNext(); toast(r + " von " + n + " richtig"); }
      }; ch.appendChild(b); });
      lq.appendChild(box);
    });
  }
  else if (typ === "mail") {
    app.innerHTML = `${head2}
      <div class="card"><div class="row between"><h3>Eingang</h3>${sayBtn("E-Mail von " + item.von + ". Betreff: " + item.betreff + ". " + item.text, "E-Mail vorlesen")}</div>
        <p class="small hint">Von: ${esc(item.von)} · Betreff: <b>${esc(item.betreff)}</b></p><div class="model" style="background:var(--bg)">${esc(item.text)}</div></div>
      <div class="card" id="qs"><h3>Teil 1: Fragen zur E-Mail</h3><p class="hint small">${task("Lies die E-Mail und wähle die richtige Antwort.", "Выбери правильный ответ.")}</p></div>
      <div class="card" id="wr" hidden>
        <h3>Teil 2: Antwort schreiben</h3>${sayBtn(item.aufgabe + " " + item.punkte.join(". "), "Aufgabe vorlesen")}
        <p>${esc(item.aufgabe)}</p><ul style="margin:0;padding-left:20px">${item.punkte.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        ${item.ru ? `<div class="rubox">${esc(item.ru)}</div>` : ""}${rmHtml(item.rm)}${timerBtn}
        ${writeBox("mail:" + item.id)}${checklist(["Anrede und Gruß", ...item.punkte, "Höflicher Ton (Sie-Form)"])}
        <div class="row"><button class="btn" id="showM">Musterlösung zeigen</button><button class="btn primary" id="doneT">Fertig</button></div>
      </div>${model(item.m)}<div id="nx" hidden>${nextBtnHtml}</div>`;
    const qs = $("#qs"); let answered = 0;
    item.fragen.forEach((f, qi) => {
      const box = document.createElement("div"); box.className = "panel"; box.style.gap = "8px";
      box.innerHTML = `<div class="row between" style="flex-wrap:nowrap"><p style="flex:1"><b>${qi + 1}.</b> ${esc(f.q)}</p>${sayBtn(f.q + " " + f.o.join(". "))}</div><div class="choices one"></div>`;
      const ch = box.querySelector(".choices"); let done = false;
      f.o.forEach((o, oi) => { const b = document.createElement("button"); b.className = "choice"; b.textContent = o; b.onclick = () => {
        if (done) return; done = true; const ok = oi === f.r; b.classList.add(ok ? "right" : "wrong"); if (!ok) ch.children[f.r].classList.add("right");
        log("mailfragen", ok, null, { pr: typ, pid: item.id }); answered++; if (answered === item.fragen.length) { $("#wr").hidden = false; bindTimer(); }
      }; ch.appendChild(b); });
      qs.appendChild(box);
    });
    if (!item.fragen.length) { $("#wr").hidden = false; bindTimer(); }
    bindWrite("mail:" + item.id);
    $("#showM").onclick = () => { $("#mo").hidden = false; $("#nx").hidden = false; bindNext(); };
    $("#doneT").onclick = () => { if (doneWriting(0)) { $("#nx").hidden = false; bindNext(); } };
  }
  else if (typ === "notiz") {
    app.innerHTML = `${head2}
      <div class="card">${task("Hör den Anruf (zweimal möglich) und schreib eine Notiz für deine Kollegin.", "Послушай звонок и запиши заметку для коллеги.")}
        <p>${esc(item.situation || "")}</p>
        <div class="row"><button class="btn big" id="play1">🔊 Anruf anhören</button></div><p class="hint small" id="plays">noch 2× anhören</p>${timerBtn}</div>
      <div class="card"><h3>Telefonnotiz</h3>
        ${item.felder.map((f, i) => `<label>${esc(f.l)} <input class="nf" data-i="${i}" autocomplete="off"></label>`).join("")}
        <button class="btn primary" id="chkN">Prüfen</button><div id="nres" class="panel" hidden></div></div>
      <div id="mo" hidden class="card"><div class="row between"><h3>Der Anruf zum Nachlesen</h3>${sayBtn(item.audio)}</div><div class="model">${esc(item.audio)}</div>${item.m ? `<h3>Musternotiz</h3><div class="model">${esc(item.m)}</div>` : ""}</div>
      <div id="nx" hidden>${nextBtnHtml}</div>`;
    let plays = 2;
    $("#play1").onclick = () => { if (plays <= 0) { toast("In der Prüfung hörst du den Anruf nur zweimal."); return; } plays--; say(item.audio); $("#plays").textContent = plays ? "noch 1× anhören" : "nicht mehr anhören"; if (!prTimer) { startTimer($("#tm"), T.min); const tb = $("#tStart"); if (tb) tb.hidden = true; } };
    bindTimer();
    const norm = s => s.toLowerCase().replace(/[.,:;!?\-\/()]/g, " ").replace(/\s+/g, " ").trim();
    $("#chkN").onclick = () => {
      stopTimer(); let r = 0;
      const out = item.felder.map((f, i) => { const v = norm(app.querySelector(`.nf[data-i="${i}"]`).value); const ok = f.a.some(a => v.includes(norm(a))); if (ok) r++; return `<div>${ok ? "✓" : "✗"} <b>${esc(f.l)}:</b> ${ok ? "richtig" : "richtig wäre: " + esc(f.a[0])}</div>`; });
      const ok = r === item.felder.length; prMark(typ, item.id, ok); log("notiz", ok, null, { pr: typ, pid: item.id, sc: r + "/" + item.felder.length });
      $("#nres").hidden = false; $("#nres").innerHTML = `<div class="feedback ${ok ? "ok" : "bad"}" style="text-align:left">${r} von ${item.felder.length} Angaben richtig</div>${out.join("")}`;
      $("#mo").hidden = false; $("#nx").hidden = false; bindNext(); $("#chkN").disabled = true;
    };
  }
  else if (typ === "forum") {
    app.innerHTML = `${head2}
      <div class="card"><div class="row between"><h3>Forum: ${esc(item.frage)}</h3>${sayBtn(item.frage + " " + item.beitraege.map(b => b.name + " schreibt: " + b.text).join(" "), "Forum vorlesen")}</div>
        ${item.beitraege.map(b => `<div class="ex"><b>${esc(b.name)}:</b> ${esc(b.text)}</div>`).join("")}</div>
      <div class="card">${task("Schreib einen Beitrag mit deiner Meinung (mindestens 120 Wörter).", "Напиши свой комментарий (минимум 120 слов).")}
        <ul style="margin:0;padding-left:20px">${item.punkte.map(x => `<li>${esc(x)}</li>`).join("")}</ul>${item.ru ? `<div class="rubox">${esc(item.ru)}</div>` : ""}
        ${rmHtml(item.rm)}${timerBtn}${writeBox("forum:" + item.id, 120)}${checklist(["Eigene Meinung klar gesagt", ...item.punkte, "Auf einen anderen Beitrag reagiert", "Abschluss / Fazit"])}
        <div class="row"><button class="btn" id="showM">Musterlösung zeigen</button><button class="btn primary" id="doneT">Fertig</button></div></div>
      ${model(item.m)}<div id="nx" hidden>${nextBtnHtml}</div>`;
    bindTimer(); bindWrite("forum:" + item.id, 120);
    $("#showM").onclick = () => { $("#mo").hidden = false; $("#nx").hidden = false; bindNext(); };
    $("#doneT").onclick = () => { if (doneWriting(120)) { $("#nx").hidden = false; bindNext(); } };
  }
  else if (typ === "sb") {
    const parts = item.text.split(/\{\{(\d+)\}\}/);
    app.innerHTML = `${head2}
      <div class="card">${task("Lies den Text und wähle für jede Lücke das passende Wort.", "Выбери подходящее слово для каждого пропуска.")}
        <div class="row between"><span></span>${sayBtn(item.text.replace(/\{\{\d+\}\}/g, " … Lücke … "), "Text vorlesen")}</div>
        <div class="model" style="background:var(--bg);line-height:1.9" id="sbt"></div></div>
      <div class="card" id="sbq"></div>
      <div class="card" id="sbr" hidden></div><div id="nx" hidden>${nextBtnHtml}</div>`;
    const sbt = $("#sbt"); parts.forEach((p, i) => { if (i % 2 === 0) sbt.appendChild(document.createTextNode(p)); else { const s = document.createElement("b"); s.className = "gapword"; s.id = "g" + p; s.textContent = " (" + p + ") "; sbt.appendChild(s); } });
    const sbq = $("#sbq"); let n = 0, r = 0;
    item.gaps.forEach((g, gi) => {
      const box = document.createElement("div"); box.className = "row"; box.style.alignItems = "center";
      box.innerHTML = `<b style="min-width:28px">${gi + 1}</b>`; const ch = document.createElement("div"); ch.className = "choices"; ch.style.flex = "1"; let done = false;
      g.o.forEach((o, oi) => { const b = document.createElement("button"); b.className = "choice"; b.style.fontSize = "16px"; b.textContent = o; b.onclick = () => {
        if (done) return; done = true; const ok = oi === g.r; n++; if (ok) r++; b.classList.add(ok ? "right" : "wrong"); if (!ok) ch.children[g.r].classList.add("right");
        const gap = $("#g" + (gi + 1)); gap.textContent = " " + g.o[g.r] + " "; gap.style.color = ok ? "var(--ok)" : "var(--bad)";
        log("sb", ok, null, { pr: typ, pid: item.id, kat: g.k || "", a: o, c: g.o[g.r] });
        if (n === item.gaps.length) { const all = r === n; prMark(typ, item.id, r >= n - 1); $("#sbr").hidden = false; $("#sbr").innerHTML = `<div class="feedback ${all ? "ok" : "bad"}">${r} von ${n} richtig</div>${item.gaps.filter(x => x.e).map((x, i) => `<div class="rule"><b>${esc(x.o[x.r])}</b>: ${esc(x.e)}</div>`).join("")}${sayBtn(item.text.replace(/\{\{(\d+)\}\}/g, (m, k) => item.gaps[k - 1].o[item.gaps[k - 1].r]), "Ganzen Text vorlesen")}`; $("#nx").hidden = false; bindNext(); }
      }; ch.appendChild(b); });
      box.appendChild(ch); sbq.appendChild(box);
    });
  }
  else if (typ === "vortrag") {
    app.innerHTML = `${head2}
      <div class="card">${task("Sprich 2 bis 3 Minuten laut über das Thema. Benutze die Stichpunkte.", "Говори 2–3 минуты вслух по теме, используй пункты.")}
        <div class="row between"><h3>${esc(item.thema || item.t)}</h3>${sayBtn((item.thema || item.t) + ". " + item.stichpunkte.join(". "), "Thema vorlesen")}</div>
        <ul style="margin:0;padding-left:20px">${item.stichpunkte.map(x => `<li>${esc(x)}</li>`).join("")}</ul>${item.ru ? `<div class="rubox">${esc(item.ru)}</div>` : ""}
        ${rmHtml(item.rm)}<button class="btn primary" id="go">▶ Jetzt sprechen (Timer 3 Min.)</button><button class="btn" id="showM">Fertig – Muster anhören</button></div>
      ${model(item.m, "Mustervortrag")}<div id="sr" hidden>${selfRate("sprechen")}</div>`;
    $("#go").onclick = () => { startTimer($("#tm"), 3, () => toast("3 Minuten sind um.")); $("#go").hidden = true; };
    $("#showM").onclick = () => { stopTimer(); $("#mo").hidden = false; $("#sr").hidden = false; say(item.m); bindRate("sprechen"); $("#mo").scrollIntoView({ behavior: "smooth" }); };
  }
  else if (typ === "fragen") {
    const qs = item.fragen; let i = 0;
    app.innerHTML = `${head2}<div class="card">${task("Hör die Frage und antworte laut in 2–4 Sätzen. Dann hörst du eine Musterantwort.", "Послушай вопрос и ответь вслух 2–4 предложениями.")}<div id="fq" class="panel"></div></div><div id="sr" hidden>${selfRate("sprechen")}</div>`;
    const drawQ = () => {
      const q = qs[i]; $("#fq").innerHTML = `<p class="hint small">Frage ${i + 1} von ${qs.length}</p><p class="sent">${esc(q.q)}</p>${q.ru ? `<p class="ru small" style="text-align:center">${esc(q.ru)}</p>` : ""}
        <div class="row"><button class="btn" id="rep">🔊 Frage wiederholen</button><button class="btn primary" id="ans">Ich habe geantwortet</button></div><div id="fm" hidden class="panel"><div class="model">${esc(q.m)}</div>${sayBtn(q.m)}<button class="btn primary" id="nq">${i < qs.length - 1 ? "Nächste Frage" : "Fertig"}</button></div>`;
      say(q.q); startTimer($("#tm"), 1);
      $("#rep").onclick = () => say(q.q);
      $("#ans").onclick = () => { stopTimer(); $("#fm").hidden = false; $("#ans").hidden = true; say(q.m); $("#nq").onclick = () => { i++; if (i < qs.length) drawQ(); else { $("#sr").hidden = false; bindRate("sprechen"); $("#sr").scrollIntoView({ behavior: "smooth" }); } }; };
    };
    drawQ();
  }
  else if (typ === "diskussion" || typ === "loesung") {
    const steps = item.schritte; let i = 0;
    app.innerHTML = `${head2}
      <div class="card">${task(typ === "loesung" ? "Ihr müsst gemeinsam ein Problem im Betrieb lösen. Die App spielt deine Kollegin oder deinen Kollegen. Antworte immer zuerst laut, dann wähle die beste Reaktion." : "Ihr diskutiert über ein Thema. Die App spielt deinen Partner. Antworte zuerst laut, dann wähle die beste Reaktion.", typ === "loesung" ? "Решите вместе проблему на работе. Сначала отвечай вслух, потом выбери лучший ответ." : "Обсуждение. Сначала отвечай вслух, потом выбери лучший ответ.")}
        <div class="row between"><h3>${esc(item.thema || item.t)}</h3>${sayBtn(item.situation, "Situation vorlesen")}</div><div class="ex">${esc(item.situation)}</div>
        ${item.optionen ? `<p class="hint small">Mögliche Lösungen:</p><ul style="margin:0;padding-left:20px">${item.optionen.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}${rmHtml(item.rm)}</div>
      <div class="card" id="dlg"></div>${model(item.m, "Mustergespräch")}<div id="sr" hidden>${selfRate("sprechen")}</div>`;
    const dlg = $("#dlg"); let right = 0;
    const drawS = () => {
      const s = steps[i]; const box = document.createElement("div"); box.className = "panel"; box.style.gap = "8px";
      box.innerHTML = `<div class="row" style="flex-wrap:nowrap;align-items:flex-start"><b style="min-width:70px">${esc(s.wer || "Partner")}:</b><span style="flex:1">${esc(s.sagt)}</span>${sayBtn(s.sagt)}</div>
        <p class="hint small">Antworte jetzt laut. Dann wähle die beste Reaktion: <span class="ru">Ответь вслух, потом выбери.</span></p><div class="choices one"></div><div class="res"></div>`;
      dlg.appendChild(box); say(s.sagt);
      const ch = box.querySelector(".choices"); let done = false;
      s.o.forEach((o, oi) => { const b = document.createElement("button"); b.className = "choice"; b.textContent = o; b.onclick = () => {
        if (done) return; done = true; const ok = oi === s.r; if (ok) right++; b.classList.add(ok ? "right" : "wrong"); if (!ok) ch.children[s.r].classList.add("right");
        say(s.o[s.r]); if (s.e) box.querySelector(".res").innerHTML = `<div class="rule">${esc(s.e)}</div>`;
        log(typ === "loesung" ? "loesung_wahl" : "diskussion_wahl", ok, null, { pr: typ, pid: item.id });
        i++; setTimeout(() => { if (i < steps.length) drawS(); else { $("#mo").hidden = false; $("#sr").hidden = false; bindRate("sprechen"); toast(right + " von " + steps.length + " Reaktionen passend"); } }, 900);
      }; ch.appendChild(b); });
    };
    drawS();
  }
  else if (typ === "hoeren") {
    app.innerHTML = `${head2}
      <div class="card">${task(item.anweisung || "Hör den Text und beantworte die Fragen. Du kannst ihn zweimal hören.", "Послушай текст и ответь на вопросы.")}
        <p>${esc(item.situation || "")}</p><button class="btn big" id="play1">🔊 Anhören</button><p class="hint small" id="plays">noch 2× anhören</p></div>
      <div class="card" id="hq"></div>
      <div id="mo" hidden class="card"><div class="row between"><h3>Text zum Nachlesen</h3>${sayBtn(item.text)}</div><div class="model">${esc(item.text)}</div></div><div id="nx" hidden>${nextBtnHtml}</div>`;
    let plays = 2; $("#play1").onclick = () => { if (plays <= 0) { toast("Nur zweimal anhören – wie in der Prüfung."); return; } plays--; say(item.text); $("#plays").textContent = plays ? "noch 1× anhören" : "nicht mehr anhören"; };
    const hq = $("#hq"); let n = 0, r = 0;
    item.fragen.forEach((f, qi) => {
      const box = document.createElement("div"); box.className = "panel"; box.style.gap = "8px";
      const opts = f.o || ["richtig", "falsch"]; const rr = f.o ? f.r : (f.rf ? 0 : 1);
      box.innerHTML = `<p><b>${qi + 1}.</b> ${esc(f.q)}</p><div class="choices ${opts.length === 2 ? "two" : "one"}"></div>`;
      const ch = box.querySelector(".choices"); let done = false;
      opts.forEach((o, oi) => { const b = document.createElement("button"); b.className = "choice"; b.textContent = o; b.onclick = () => {
        if (done) return; done = true; const ok = oi === rr; n++; if (ok) r++; b.classList.add(ok ? "right" : "wrong"); if (!ok) ch.children[rr].classList.add("right");
        log("hoeren_beruf", ok, null, { pr: typ, pid: item.id });
        if (n === item.fragen.length) { prMark(typ, item.id, r === n); $("#mo").hidden = false; $("#nx").hidden = false; bindNext(); toast(r + " von " + n + " richtig"); }
      }; ch.appendChild(b); });
      hq.appendChild(box);
    });
  }
};

/* --- Mehr --- */
VIEWS.mehr = function () {
  app.innerHTML = `${head("Mehr")}
    <div class="menu">
      <button data-v="schreiben"><span class="ic">✎</span><b>Schreiben</b><span>Prüfungsaufgaben mit Musterlösung</span></button>
      <button data-v="regeln"><span class="ic">§</span><b>Grammatik</b><span>Regeln auf Deutsch und Russisch</span></button>
      <button data-v="liste"><span class="ic">≡</span><b>Wortliste</b><span>${W.length} Wörter durchsuchen</span></button>
      <button data-v="einstellungen"><span class="ic">⚙</span><b>Einstellungen</b><span>Name, Niveau, Tagesziel</span></button>
      <button data-v="sicherung"><span class="ic">⇩</span><b>Sicherung</b><span>Fortschritt sichern</span></button>
    </div>
    <p class="hint small">Inhalte: ${W.length} Wörter, ${S.length} Sätze (davon ${MAN.saetze || 0} Übungssätze), ${T.length} Schreibaufgaben. Stand ${MAN.version ? new Date(MAN.version * 1000).toLocaleDateString("de-DE") : "–"}.</p>`;
  app.querySelectorAll("[data-v]").forEach(b => b.onclick = () => go(b.dataset.v));
};
VIEWS.regeln = function () {
  app.innerHTML = `${head("Grammatik", "Mehr")}<div class="panel" id="rg"></div>`;
  $("#rg").appendChild($("#tpl-regeln").content.cloneNode(true));
  if (HAS_TTS) app.querySelectorAll("details.g .gbody").forEach(g => {
    const b = document.createElement("button"); b.className = "btn small"; b.textContent = "🔊 Regel vorlesen"; b.style.alignSelf = "flex-start";
    b.onclick = () => { const c = g.cloneNode(true); c.querySelectorAll(".rubox, button").forEach(x => x.remove()); say(c.innerText.replace(/\s+/g, " ")); };
    g.prepend(b);
  });
};
VIEWS.liste = function () {
  app.innerHTML = `${head("Wortliste", "Mehr")}<input id="q" placeholder="Suchen: Deutsch oder Russisch …" autocomplete="off"><div class="card"><div class="list" id="ls"></div></div>`;
  const q = $("#q"); const ls = $("#ls");
  const draw = () => {
    const s = q.value.trim().toLowerCase();
    const r = W.filter(w => !s || w.w.toLowerCase().includes(s) || (w.ru || "").toLowerCase().includes(s) || (w.th || "").toLowerCase().includes(s)).sort((a, b) => a.w.localeCompare(b.w, "de"));
    ls.innerHTML = r.slice(0, 200).map(w => `<div class="li"><div class="t">${w.a ? `<span class="${artClass(w.a)}">${esc(w.a)}</span> ` : ""}<b>${esc(w.w)}</b> <span class="ru">${esc(w.ru)}</span><small>${esc(w.t)} · ${esc(w.lv)}${w.th ? " · " + esc(w.th) : ""} · ${P.w[w.id] ? "Fach " + (P.w[w.id].b + 1) : "neu"}</small></div>${sayBtn(deLabel(w))}</div>`).join("") + (r.length > 200 ? `<p class="hint">… und ${r.length - 200} weitere. Bitte genauer suchen.</p>` : "") || `<p class="hint">Nichts gefunden.</p>`;
  };
  q.oninput = draw; draw();
};
VIEWS.schreiben = function () {
  app.innerHTML = `${head("Schreiben", "Mehr")}
    <p class="hint">Schreib den Text selbst, prüfe die Checkliste und vergleiche dann mit der Musterlösung. <span class="ru">Напиши текст сам, потом сравни с образцом.</span></p>
    <div class="card"><div class="list">${T.map(t => `<button class="li" data-t="${esc(t.id)}"><div class="t"><b>${esc(t.t)}</b><small>${esc(t.lv)} · ca. ${t.w} Wörter${P.schreibenDone[t.id] ? " · ✓ geschrieben" : ""}</small></div><span>›</span></button>`).join("")}</div></div>`;
  app.querySelectorAll("[data-t]").forEach(b => b.onclick = () => go("aufgabe", b.dataset.t));
};
VIEWS.aufgabe = function () {
  const t = T.find(x => x.id === viewArg); if (!t) return go("schreiben");
  app.innerHTML = `${head(esc(t.t), "Schreiben")}
    <div class="card">
      <div class="row between"><span class="pill">${esc(t.lv)} · ca. ${t.w} Wörter</span>${HAS_TTS ? `<button class="btn small" id="sayT">🔊 Aufgabe vorlesen</button>` : ""}</div>
      <p>${esc(t.s)}</p><ul style="margin:0;padding-left:20px">${t.p.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <div class="rubox">${esc(t.ru)}</div>
      ${t.rm && t.rm.length ? `<div><p class="hint small" style="margin-bottom:6px">Hilfreiche Sätze:</p><div class="chips">${t.rm.map(x => `<span data-say="${esc(x)}" style="cursor:pointer">${esc(x)}</span>`).join("")}</div></div>` : ""}
    </div>
    <div class="card">
      <label>Dein Text <textarea id="tx" spellcheck="false" placeholder="Sehr geehrte …"></textarea></label>
      <p class="hint small" id="wc"></p>
      <h3>Checkliste</h3>
      <label class="check"><input type="checkbox"> Anrede (z. B. „Sehr geehrte …,“ / „Liebe …,“)</label>
      ${t.p.map(x => `<label class="check"><input type="checkbox"> ${esc(x)}</label>`).join("")}
      <label class="check"><input type="checkbox"> Gruß am Ende</label>
      <label class="check"><input type="checkbox"> Verb im Nebensatz am Ende? (weil, dass, wenn …)</label>
      <div class="row"><button class="btn" id="showM">Musterlösung zeigen</button><button class="btn primary" id="doneT">Fertig</button></div>
      <div id="mo" hidden><h3>Musterlösung</h3><div class="model">${esc(t.m || "")}</div>${HAS_TTS ? `<button class="btn small" id="sayM" style="margin-top:8px">🔊 Vorlesen</button>` : ""}</div>
    </div>`;
  if ($("#sayT")) $("#sayT").onclick = () => say(t.s + " Schreiben Sie etwas zu diesen Punkten: " + t.p.join(" ") + " Schreiben Sie etwa " + t.w + " Wörter.");
  const tx = $("#tx"); tx.value = P.drafts[t.id] || "";
  const wc = () => { const n = (tx.value.trim().match(/\S+/g) || []).length; $("#wc").textContent = `${n} Wörter · Ziel: ca. ${t.w}`; };
  tx.oninput = () => { P.drafts[t.id] = tx.value; saveP(); wc(); }; wc();
  $("#showM").onclick = () => { $("#mo").hidden = false; $("#mo").scrollIntoView({ behavior: "smooth", block: "start" }); };
  if ($("#sayM")) $("#sayM").onclick = () => say(t.m);
  $("#doneT").onclick = () => {
    const n = (tx.value.trim().match(/\S+/g) || []).length;
    if (n < 20) { toast("Schreib zuerst mindestens 20 Wörter."); return; }
    P.schreibenDone[t.id] = (P.schreibenDone[t.id] || 0) + 1; saveP(); log("schreiben", true, null);
    toast("Gespeichert. Vergleiche jetzt mit der Musterlösung!"); $("#mo").hidden = false;
  };
};
VIEWS.einstellungen = function () {
  app.innerHTML = `${head("Einstellungen", "Mehr")}
    <div class="card">
      <label>Name <input id="sName" value="${esc(SET.name)}" autocomplete="given-name"></label>
      <label>Prüfung <select id="sEx"><option value="DTB">DTB B2 – Deutsch-Test für den Beruf</option><option value="DTZ">DTZ – Deutsch-Test für Zuwanderer</option></select></label>
      <label>Niveau <select id="sLv"><option value="B1">nur B1</option><option value="alle">B1 und B2</option><option value="B2">nur B2</option></select></label>
      <label>Neue Wörter pro Tag <select id="sPer"><option>20</option><option>30</option><option>40</option><option>60</option><option>80</option></select></label>
      <label>Tagesziel (Aufgaben) <select id="sGoal"><option>40</option><option>60</option><option>80</option><option>100</option><option>150</option></select></label>
      <label>Vorlese-Tempo <select id="sRate"><option value="0.7">langsam</option><option value="0.9">normal</option><option value="1">schnell</option></select></label>
      <label class="check"><input type="checkbox" id="sLeicht"> Satzbau leichter: erstes Wort ist schon gesetzt</label>
      <label class="check"><input type="checkbox" id="sAuto"> Wörter und Sätze automatisch vorlesen</label>
      <label class="check"><input type="checkbox" id="sTap"> Wörter beim Antippen vorlesen</label>
      <button class="btn primary" id="sSave">Speichern</button>
      ${HAS_TTS ? `<button class="btn small" id="sTest">🔊 Vorlesen testen</button>` : `<p class="hint small">Vorlesen ist auf diesem Gerät nicht verfügbar.</p>`}
    </div>`;
  $("#sEx").value = exam(); $("#sLv").value = SET.niveau; $("#sPer").value = String(SET.perDay); $("#sGoal").value = String(SET.goal); $("#sRate").value = String(SET.rate); $("#sLeicht").checked = SET.leicht; $("#sAuto").checked = SET.auto; $("#sTap").checked = SET.tapSay;
  $("#sSave").onclick = () => { SET.name = $("#sName").value.trim(); SET.exam = $("#sEx").value; SET.niveau = $("#sLv").value; SET.perDay = +$("#sPer").value; SET.goal = +$("#sGoal").value; SET.rate = +$("#sRate").value; SET.leicht = $("#sLeicht").checked; SET.auto = $("#sAuto").checked; SET.tapSay = $("#sTap").checked; saveSET(); toast("Gespeichert"); };
  if ($("#sTest")) $("#sTest").onclick = () => say("Guten Tag! Ich lerne jeden Tag Deutsch, weil ich die Prüfung bestehen möchte.");
};
VIEWS.sicherung = function () {
  app.innerHTML = `${head("Sicherung", "Mehr")}
    <div class="card"><p>Der Fortschritt ist nur auf diesem Handy gespeichert. Mit diesem Code kannst du ihn auf ein anderes Gerät übertragen oder sichern.</p>
      <p class="ru small">Прогресс хранится только на этом телефоне. Этот код можно сохранить или перенести.</p>
      <button class="btn" id="exp">Sicherungscode erstellen</button>
      <textarea id="code" style="min-height:120px;font-size:12px" placeholder="Sicherungscode"></textarea>
      <div class="row"><button class="btn" id="cp">Kopieren / Teilen</button><button class="btn" id="imp">Code einspielen</button></div>
      <div id="impConfirm" hidden class="panel"><p class="feedback bad">Achtung: Der jetzige Fortschritt wird ersetzt.</p><button class="btn bad" id="impYes">Ja, ersetzen</button></div>
    </div>`;
  $("#exp").onclick = () => { $("#code").value = btoa(unescape(encodeURIComponent(JSON.stringify({ P, ST, SET, LOG, v: 2 })))); };
  $("#cp").onclick = async () => { const t = $("#code").value; if (!t) return; try { if (BR && BR.share) { BR.share(t); return; } await navigator.clipboard.writeText(t); toast("Kopiert"); } catch (e) { $("#code").select(); document.execCommand("copy"); toast("Kopiert"); } };
  $("#imp").onclick = () => { if (!$("#code").value.trim()) { toast("Erst den Code einfügen."); return; } $("#impConfirm").hidden = false; };
  $("#impYes").onclick = () => {
    try { const o = JSON.parse(decodeURIComponent(escape(atob($("#code").value.trim())))); if (!o.P || !o.ST) throw 0; P = o.P; ST = o.ST; SET = Object.assign(SET, o.SET || {}); if (o.LOG) { LOG = o.LOG; LS.set("dl-log", LOG); } saveP(); saveST(); saveSET(); toast("Fortschritt eingespielt"); go("home"); }
    catch (e) { toast("Der Code ist ungültig."); }
  };
};

/* ================= Start ================= */
(async function boot() {
  try { await loadContent(); }
  catch (e) { app.innerHTML = `<div class="card empty"><h3>Keine Verbindung</h3><p>Die Inhalte konnten nicht geladen werden. Bitte Internet einschalten und die App neu öffnen.</p><p class="ru">Нет соединения с интернетом. Включи интернет и открой приложение снова.</p><button class="btn primary" onclick="location.reload()">Nochmal versuchen</button></div>`; return; }
  const h = location.hash.slice(1); go(VIEWS[h] && h !== "session" && h !== "aufgabe" ? h : "home");
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => { });
})();
})();
