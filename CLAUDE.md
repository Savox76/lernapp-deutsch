# Deutsch lernen A2–B2 (DTB/DTZ) – Hinweise für Claude

- Nutzer: Mario (spricht Deutsch). Lernerin: russischsprachig, Ziel DTB B2 (Deutsch-Test für den Beruf), Alltagsdeutsch über DTZ; vertauscht oft die Wortstellung, Schreiben und Sprechen sind die Schwachstellen.
- Inhalte immer in `quellen/` pflegen (Format siehe README), danach `python3 tools/build_content.py` laufen lassen und die erzeugten `web/content/*.json` mit committen.
- Neue Sätze: konjugiertes Verb mit `*…*` markieren, russische Übersetzung und kurze Regel auf einfachem Deutsch angeben.
- Keine echten Namen der Lernerin in Inhalte schreiben (Repo ist öffentlich). Beispielname in Musterlösungen: Olga Iwanowa.
- Web-App ohne Build-Schritt: `web/index.html`, `web/app.js`, `web/style.css`. Fortschritt liegt in localStorage (`dl-prog`, `dl-stats`, `dl-set`, Antwortprotokoll `dl-log`) – Schlüssel nicht umbenennen, sonst geht Fortschritt verloren.
- Die Android-App lädt nur https://savox76.github.io/lernapp-deutsch/ – Änderungen an `android/` nur, wenn wirklich nötig (Nutzerin muss sonst neu installieren).
- Auswertung: Wenn Mario eine geteilte „DEUTSCH-AUSWERTUNG“ schickt, die schwächsten Grammatik-Themen und die schwersten Sätze daraus ablesen und gezielt neue Sätze für genau diese Themen in `quellen/` ergänzen. Grammatik-Kategorien werden in `web/app.js` (`categorize`) aus Regeltext und Satz erkannt.
- Planung: Siehe `MASTERPLAN.md` (Prüfungsaufbau, Prioritäten, Fahrplan). Vor dem Bau neuer Aufgabentypen Mario Bescheid geben.
- Didaktik: Russisch nur als Verständnishilfe (Aufgabenstellung, Übersetzung nach der Antwort). Antworten immer auf Deutsch. Alles (Wörter, Sätze, Aufgaben, Regeln) muss vorlesbar sein (`say()`, `sayBtn()`, Einstellung `SET.auto`).
- Prüfungsaufgaben liegen in `quellen/pruefung/*.json` (Format siehe README), jede Aufgabe mit `id` und `ex` (DTB/DTZ). Eigene Aufgaben schreiben, nie aus offiziellen Modelltests kopieren. Keine echten Prüfungsergebnisse ins Repo.
- Grundkurs (`KURS` in `web/app.js`): 13 Stufen nach Grammatik-Kategorien, nutzt A2-Sätze zuerst. Für jede Stufe sollten mindestens 15 Sätze mit Niveau A2/B1 existieren. Fortschritt in `P.kurs` (Teil von `dl-prog`).
- Neue Wortdateien nach dem Schreiben mit `python3 tools/dedupe_new.py quellen/woerter-XX.txt` bereinigen (entfernt Wörter, die es schon gibt). Schreibaufgaben dürfen auf mehrere Dateien `quellen/schreiben*.json` verteilt sein.
- Ziel laut Mario (04.11.2026): Inhalte vervierfachen (≈7.000 Wörter, ≈3.900 Sätze, 72 Schreibaufgaben, ≈520 Prüfungsaufgaben). Neue Wörter pro Tag: 30.
