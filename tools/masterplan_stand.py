"""Aktualisiert die Zahlen im MASTERPLAN.md aus web/content (nach build_content.py ausführen).
Aufruf: python3 tools/masterplan_stand.py "nach M14" 14
  1. Argument: Text für „Zuletzt komplett geprüft … <Text>“
  2. Argument: Anzahl fertiger Meilensteine in Phase 1
Status-Spalten einzelner Meilensteine werden weiterhin von Hand gepflegt."""
import json, re, sys, collections, datetime, os
os.chdir(os.path.join(os.path.dirname(__file__), ".."))
label, done = sys.argv[1], int(sys.argv[2])
m = json.load(open("web/content/manifest.json"))
pr = json.load(open("web/content/pruefung.json"))
c = {t: collections.Counter(e for x in v for e in x["ex"]) for t, v in pr.items()}
tot = sum(len(v) for v in pr.values())
f = lambda n: f"{n:,}".replace(",", ".")
heute = datetime.date.today().strftime("%d.%m.%Y")
s = open("MASTERPLAN.md", encoding="utf8").read()
s = re.sub(r"\*\*Zuletzt komplett geprüft:\*\* [^\n]*", f"**Zuletzt komplett geprüft:** {heute} {label} (Code, Inhalte und Veröffentlichung abgeglichen).", s)
s = re.sub(r"## 2\. Stand heute[^\n]*", f"## 2. Stand heute (geprüft am {heute} {label})", s)
s = re.sub(r"\| Wortschatz \| [^|]*\|", f"| Wortschatz | {f(m['woerter'])} Wörter (A2, B1, B2, Beruf, Alltag, Wortfamilien, Nomen-Verb-Verbindungen) |", s, count=1)
s = re.sub(r"\| Satzbau \| [^|]*\|", f"| Satzbau | {f(m['saetze'])} Übungssätze ({f(m['markiert'])} mit markiertem Verb), alle 12 Grammatik-Themen auf A2–B2 |", s, count=1)
s = re.sub(r"\| Schreibaufgaben \| [^|]*\|", f"| Schreibaufgaben | {m['schreiben']} (A2, B1, B2, DTZ und DTB; laufend mehr) |", s, count=1)
g = lambda t, e: c.get(t, {}).get(e, 0)
dtb = f"{g('lesen','DTB')} Leseaufgaben (Teil 1–4) · {g('mail','DTB')} E-Mails · {g('notiz','DTB')} Telefonnotizen · {g('forum','DTB')} Forumsbeiträge · {g('sb','DTB')} Sprachbausteine · {g('vortrag','DTB')} Vorträge · {g('fragen','DTB')} Fragerunden · {g('diskussion','DTB')} Diskussionen · {g('loesung','DTB')} Lösung finden · {g('hoeren','DTB')} Hörtexte · {g('dialog','DTB')} Dialoge"
dtz = f"{g('brief','DTZ')} Briefe · {g('lesen','DTZ')} Leseaufgaben · {g('sb','DTZ')} Brief-Lückentexte · {g('vortrag','DTZ')} Erzählthemen · {g('fragen','DTZ')} Fragerunden · {g('loesung','DTZ')} Gemeinsam planen · {g('hoeren','DTZ')} Hörtexte · {g('dialog','DTZ')} Dialoge"
s = re.sub(r"(\| \*\*Prüfung DTB\*\* \| )[^|]*\|", lambda x: x.group(1) + dtb + " |", s, count=1)
s = re.sub(r"(\| \*\*Prüfung DTZ\*\* \| )[^|]*\|", lambda x: x.group(1) + dtz + " |", s, count=1)
s = re.sub(r"\*\*Stand:\*\* [^\n]*", f"**Stand:** {done} von 17 Meilensteinen (Phase 1) fertig. Aktuell: {f(m['woerter'])} Wörter · {f(m['saetze'])} Sätze · {m['schreiben']} Schreibaufgaben · {tot} Prüfungsaufgaben.", s)
s = re.sub(r"(\| G1 \| Inhalte fertig \|[^\n]*\| )⏳ läuft \(\d+ von 17\) \|", lambda x: x.group(1) + f"⏳ läuft ({done} von 17) |", s)
open("MASTERPLAN.md", "w", encoding="utf8").write(s)
print(f"Masterplan aktualisiert: {m['woerter']} Wörter, {m['saetze']} Sätze, {m['schreiben']} Schreibaufgaben, {tot} Prüfungsaufgaben, {done}/17 fertig")
