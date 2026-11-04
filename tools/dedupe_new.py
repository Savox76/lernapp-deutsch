"""Entfernt in den angegebenen Wortdateien Einträge, deren Grundwort (ohne Klammerzusatz)
schon in einer anderen Datei vorkommt. Aufruf: python3 tools/dedupe_new.py quellen/woerter-14-adjektive.txt …"""
import sys, re, glob
targets = set(sys.argv[1:])
base = lambda w: re.sub(r"\s*\(.*?\)\s*", "", w).strip().lower()
known = set()
for f in sorted(glob.glob("quellen/woerter-*.txt")):
    if f in targets: continue
    for l in open(f, encoding="utf-8"):
        if l.strip() and not l.startswith("#"): known.add(base(l.split("|")[0]))
for f in sorted(targets):
    out, drop = [], 0
    for l in open(f, encoding="utf-8"):
        if l.strip() and not l.startswith("#"):
            b = base(l.split("|")[0])
            if b in known: drop += 1; continue
            known.add(b)
            w = l.split("|")[0]
            if "(" in w and not re.search(r"\((\+|an|auf|aus|bei|für|in|mit|nach|über|um|unter|von|vor|zu)\b", w):
                l = l.replace(w, base(w) if False else re.sub(r"\s*\(.*?\)", "", w), 1)
        out.append(l)
    open(f, "w", encoding="utf-8").write("".join(out))
    print(f, "entfernt:", drop)
