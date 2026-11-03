# Deutsch lernen B1/B2 – Hinweise für Claude

- Nutzer: Mario (spricht Deutsch). Lernerin: russischsprachig, Prüfung B1/B2, vertauscht oft die Wortstellung.
- Inhalte immer in `quellen/` pflegen (Format siehe README), danach `python3 tools/build_content.py` laufen lassen und die erzeugten `web/content/*.json` mit committen.
- Neue Sätze: konjugiertes Verb mit `*…*` markieren, russische Übersetzung und kurze Regel auf einfachem Deutsch angeben.
- Keine echten Namen der Lernerin in Inhalte schreiben (Repo ist öffentlich). Beispielname in Musterlösungen: Olga Iwanowa.
- Web-App ohne Build-Schritt: `web/index.html`, `web/app.js`, `web/style.css`. Fortschritt liegt in localStorage (`dl-prog`, `dl-stats`, `dl-set`, Antwortprotokoll `dl-log`) – Schlüssel nicht umbenennen, sonst geht Fortschritt verloren.
- Die Android-App lädt nur https://savox76.github.io/lernapp-deutsch/ – Änderungen an `android/` nur, wenn wirklich nötig (Nutzerin muss sonst neu installieren).
- Auswertung: Wenn Mario eine geteilte „DEUTSCH-AUSWERTUNG“ schickt, die schwächsten Grammatik-Themen und die schwersten Sätze daraus ablesen und gezielt neue Sätze für genau diese Themen in `quellen/` ergänzen. Grammatik-Kategorien werden in `web/app.js` (`categorize`) aus Regeltext und Satz erkannt.
