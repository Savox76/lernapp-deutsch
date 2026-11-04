#!/usr/bin/env python3
"""Baut die Inhalte der App aus den Textdateien im Ordner quellen/.

Wörter  (quellen/woerter-*.txt), eine Zeile pro Wort, getrennt mit |
  Wort|Artikel|Formen|Wortart|Russisch|Bedeutung|Beispielsatz|Niveau|Thema
  Wortart: N=Nomen V=Verb A=Adjektiv Adv=Adverb P=Präposition K=Konjunktion R=Redemittel
  Artikel bei Nomen der/die/das, sonst -. Formen leer = -.

Sätze   (quellen/saetze-*.txt), eine Zeile pro Satz:
  Satz|Russisch|Niveau|Regel[|Thema[|Alternative Sätze, getrennt mit " / "]]
  Das konjugierte Verb mit Sternchen markieren: Ich *gehe* heute, weil ich krank *bin*.
  Markierte Verben nutzt die App für die Übungen "Wo steht das Verb?" und "Richtig oder falsch?".

Schreibaufgaben: quellen/schreiben*.json (Listen, werden zusammengeführt).

Aufruf:  python3 tools/build_content.py
"""
import glob, hashlib, json, os, re, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "quellen")
OUT = os.path.join(ROOT, "web", "content")
WA = {"N": "Nomen", "V": "Verb", "A": "Adjektiv", "Adv": "Adverb", "P": "Präposition", "K": "Konjunktion", "R": "Redemittel"}

def sid(text):
    return hashlib.sha1(text.encode("utf8")).hexdigest()[:10]

def plain(s):
    return s.replace("*", "")

errors = []
words, seen_w = [], set()
for path in sorted(glob.glob(os.path.join(SRC, "woerter-*.txt"))):
    for n, line in enumerate(open(path, encoding="utf8"), 1):
        line = line.rstrip("\n").strip()
        if not line or line.startswith("#"):
            continue
        f = [x.strip() for x in line.split("|")]
        if len(f) != 9:
            errors.append(f"{os.path.basename(path)}:{n}: {len(f)} Felder statt 9"); continue
        w, a, fo, wa, ru, bed, bsp, lv, th = f
        if ru in ("", "-"):
            continue  # Platzhalter ohne Übersetzung überspringen
        if wa not in WA: errors.append(f"{os.path.basename(path)}:{n}: Wortart '{wa}' unbekannt"); continue
        if lv not in ("A2", "B1", "B2"): errors.append(f"{os.path.basename(path)}:{n}: Niveau '{lv}'"); continue
        if wa == "N" and a not in ("der", "die", "das"): errors.append(f"{os.path.basename(path)}:{n}: Nomen ohne Artikel"); continue
        key = w.lower()
        if key in seen_w: continue
        seen_w.add(key)
        words.append({"id": "w" + sid(key), "w": w, "a": "" if a == "-" else a, "f": "" if fo == "-" else fo,
                      "t": WA[wa], "ru": ru, "b": bed, "x": bsp, "lv": lv, "th": th})

sents, seen_s = [], set()
for path in sorted(glob.glob(os.path.join(SRC, "saetze-*.txt"))):
    for n, line in enumerate(open(path, encoding="utf8"), 1):
        line = line.rstrip("\n").strip()
        if not line or line.startswith("#"):
            continue
        f = [x.strip() for x in line.split("|")]
        if len(f) < 4:
            errors.append(f"{os.path.basename(path)}:{n}: zu wenige Felder"); continue
        de, ru, lv, regel = f[:4]
        th = f[4] if len(f) > 4 else ""
        alt = [plain(x.strip()) for x in f[5].split(" / ")] if len(f) > 5 and f[5] else []
        if any(t.count("*") not in (0, 2) for t in de.split()):
            errors.append(f"{os.path.basename(path)}:{n}: Sternchen müssen genau ein Wort umschließen: {de}"); continue
        p = plain(de)
        if p in seen_s: continue
        seen_s.add(p)
        item = {"id": "s" + sid(p), "de": de, "ru": ru, "lv": lv, "r": regel}
        if th: item["th"] = th
        if alt: item["alt"] = alt
        sents.append(item)

if errors:
    print("\n".join(errors)); sys.exit(1)

os.makedirs(OUT, exist_ok=True)
json.dump(words, open(os.path.join(OUT, "woerter.json"), "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
json.dump(sents, open(os.path.join(OUT, "saetze.json"), "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
tasks, seen_ids = [], set()
for sch in sorted(glob.glob(os.path.join(SRC, "schreiben*.json"))):
    for t in json.load(open(sch, encoding="utf8")):
        if t["id"] in seen_ids: errors.append(f"{os.path.basename(sch)}: doppelte id {t['id']}"); continue
        seen_ids.add(t["id"]); tasks.append(t)
json.dump(tasks, open(os.path.join(OUT, "schreiben.json"), "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
# Prüfungsaufgaben: quellen/pruefung/*.json, jede Datei {"typ": [Aufgaben …]}
pr = {}
for path in sorted(glob.glob(os.path.join(SRC, "pruefung", "*.json"))):
    try:
        data = json.load(open(path, encoding="utf8"))
    except Exception as e:
        print(f"{os.path.basename(path)}: JSON-Fehler: {e}"); sys.exit(1)
    for typ, items in data.items():
        for it in items:
            if "id" not in it:
                print(f"{os.path.basename(path)}: Aufgabe ohne id"); sys.exit(1)
        have = {x["id"] for x in pr.get(typ, [])}
        for it in items:
            if it["id"] in have: print(f"{os.path.basename(path)}: doppelte id {typ}/{it['id']}"); sys.exit(1)
            have.add(it["id"])
        pr.setdefault(typ, []).extend(items)
json.dump(pr, open(os.path.join(OUT, "pruefung.json"), "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
marked = sum(1 for s in sents if "*" in s["de"])
manifest = {"version": int(time.time()), "woerter": len(words), "saetze": len(sents), "markiert": marked, "schreiben": len(tasks), "pruefung": {k: len(v) for k, v in pr.items()}}
json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w", encoding="utf8"), ensure_ascii=False)
print(f"{len(words)} Wörter, {len(sents)} Sätze ({marked} mit Verbmarkierung), {len(tasks)} Schreibaufgaben")
print("Prüfungsaufgaben:", ", ".join(f"{k} {len(v)}" for k, v in sorted(pr.items())) or "keine")
