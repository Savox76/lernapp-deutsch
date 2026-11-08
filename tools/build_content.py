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
# Dialoge: quellen/dialoge/*.txt (einfaches Textformat, siehe README)
def parse_dialoge(path):
    out, cur, step = [], None, None
    fn = os.path.basename(path)
    for n, line in enumerate(open(path, encoding="utf8"), 1):
        line = line.rstrip("\n").strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("==="):
            f = [x.strip() for x in line[3:].split("|")]
            if len(f) < 5: errors.append(f"{fn}:{n}: Kopfzeile braucht id | ex | Titel | Partner | Situation | Russisch"); continue
            cur = {"id": f[0], "ex": f[1].split("+"), "t": f[2], "partner": f[3], "situation": f[4], "schritte": []}
            if len(f) > 5 and f[5]: cur["ru"] = f[5]
            out.append(cur); step = None; continue
        if cur is None: errors.append(f"{fn}:{n}: Zeile vor der ersten Kopfzeile"); continue
        key, _, val = line.partition(":"); val = val.strip()
        if key == "P":
            step = {"p": val}; cur["schritte"].append(step)
        elif key == "A":
            if step is None or "a" in step: step = {}; cur["schritte"].append(step)
            a, _, ar = val.partition("|"); step["a"] = a.strip()
            if ar.strip(): step["ar"] = ar.strip()
        elif key == "M":
            parts = [x.strip() for x in val.split("||")]
            if step is None: errors.append(f"{fn}:{n}: M ohne A"); continue
            if any(t.count("*") not in (0, 2) for t in parts[0].split()): errors.append(f"{fn}:{n}: Sternchen falsch: {parts[0]}")
            step["m"] = parts[0]
            if len(parts) > 1: step["alt"] = parts[1:]
        elif key == "K": step["k"] = [x.strip() for x in val.split(",") if x.strip()]
        elif key == "R": step["r"] = val
        elif key == "X": step["x"] = val
        elif key == "ENDE": cur["ende"] = val
        else: errors.append(f"{fn}:{n}: unbekannter Schlüssel {key}")
    for d in out:
        for k, st in enumerate(d["schritte"]):
            if "a" not in st or "m" not in st: errors.append(f"{fn}: {d['id']} Schritt {k + 1} ohne A oder M")
    return out
dlg = []
for path in sorted(glob.glob(os.path.join(SRC, "dialoge", "*.txt"))):
    dlg.extend(parse_dialoge(path))
if dlg:
    ids = [d["id"] for d in dlg]
    for x in set(ids):
        if ids.count(x) > 1: errors.append(f"Dialog-id doppelt: {x}")
    pr.setdefault("dialog", []).extend(dlg)
if errors:
    print("\n".join(errors)); sys.exit(1)
json.dump(pr, open(os.path.join(OUT, "pruefung.json"), "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
# Endungen: quellen/endungen-*.txt  Satz mit {Stamm|Endung}|Russisch|Niveau|Regel|Kategorie
END_KAT = {"AKK", "DAT", "GEN", "WEC", "ADB", "ADU", "ADO", "VERB"}
ends, seen_e = [], set()
for path in sorted(glob.glob(os.path.join(SRC, "endungen-*.txt"))):
    fn = os.path.basename(path)
    for n, line in enumerate(open(path, encoding="utf8"), 1):
        line = line.rstrip("\n").strip()
        if not line or line.startswith("#"):
            continue
        f = [x.strip() for x in line.split("|")]
        # Lücken enthalten selbst ein "|": erst Lücken schützen
        prot = re.sub(r"\{([^|}]*)\|([^}]*)\}", lambda m: "{" + m.group(1) + "\x00" + m.group(2) + "}", line)
        f = [x.strip().replace("\x00", "|") for x in prot.split("|")]
        if len(f) != 5: errors.append(f"{fn}:{n}: {len(f)} Felder statt 5"); continue
        de, ru, lv, regel, k = f
        if k not in END_KAT: errors.append(f"{fn}:{n}: Kategorie '{k}' unbekannt"); continue
        if lv not in ("A2", "B1", "B2"): errors.append(f"{fn}:{n}: Niveau '{lv}'"); continue
        if not re.search(r"\{[^|}]*\|[^}]*\}", de): errors.append(f"{fn}:{n}: keine Lücke {{Stamm|Endung}}"); continue
        plainE = re.sub(r"\{([^|}]*)\|([^}]*)\}", r"\1\2", de)
        if plainE in seen_e: continue
        seen_e.add(plainE)
        ends.append({"id": "e" + sid(plainE), "de": de, "ru": ru, "lv": lv, "r": regel, "k": k})
if errors:
    print("\n".join(errors)); sys.exit(1)
json.dump(ends, open(os.path.join(OUT, "endungen.json"), "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
# Prüfungssimulation: Ablauf und Erklärtexte (mehrsprachig) nur prüfen und kopieren
simsrc = os.path.join(SRC, "simulation.json")
if os.path.exists(simsrc):
    try:
        sim = json.load(open(simsrc, encoding="utf8"))
    except Exception as e:
        print(f"simulation.json: JSON-Fehler: {e}"); sys.exit(1)
    for ex in ("DTB", "DTZ"):
        for t in sim[ex]["teile"]:
            for a in t["aufgaben"]:
                if a[0] not in pr: print(f"simulation.json: Typ {a[0]} gibt es nicht"); sys.exit(1)
    json.dump(sim, open(os.path.join(OUT, "simulation.json"), "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
marked = sum(1 for s in sents if "*" in s["de"])
manifest = {"version": int(time.time()), "woerter": len(words), "saetze": len(sents), "markiert": marked, "schreiben": len(tasks), "endungen": len(ends), "pruefung": {k: len(v) for k, v in pr.items()}}
json.dump(manifest, open(os.path.join(OUT, "manifest.json"), "w", encoding="utf8"), ensure_ascii=False)
print(f"{len(words)} Wörter, {len(sents)} Sätze ({marked} mit Verbmarkierung), {len(tasks)} Schreibaufgaben, {len(ends)} Endungen-Sätze")
print("Prüfungsaufgaben:", ", ".join(f"{k} {len(v)}" for k, v in sorted(pr.items())) or "keine")
