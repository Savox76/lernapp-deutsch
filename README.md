# Deutsch lernen A2 · B1 · B2

Lern-App für die Deutschprüfungen **DTB B2 (Deutsch-Test für den Beruf)** und **DTZ (A2–B1)** mit russischen Übersetzungen.
Schwerpunkt: **Wortstellung / Satzbau** mit einem Grundkurs von vorn, Prüfungstraining für Schreiben und Sprechen,
Wortschatz mit Karteikasten und eine **Tagesstatistik**.

- **Web-App:** https://savox76.github.io/lernapp-deutsch/
- **Android-App (APK):** https://github.com/Savox76/lernapp-deutsch/releases/latest/download/deutsch-lernen.apk

Die Android-App lädt die Web-App. Neue Wörter, Sätze und Funktionen erscheinen deshalb
automatisch beim nächsten Öffnen. Die App muss nicht neu installiert werden.

## Einmalig einrichten

1. **GitHub Pages einschalten:** Repo → *Settings* → *Pages* → bei *Source* „**GitHub Actions**“ wählen.
   Danach unter *Actions* den Workflow „Web-App veröffentlichen“ einmal mit *Run workflow* starten.
2. **APK installieren:** Den APK-Link oben auf dem Handy öffnen, Datei herunterladen und öffnen.
   Android fragt einmal, ob Installationen aus dieser Quelle erlaubt sind → erlauben.

## Was die App kann

| Bereich | Inhalt |
|---|---|
| Heute | **Grundkurs von vorn** (13 Stufen von „Verb auf Platz 2“ bis Passiv, nächste Stufe ab 80 %), Tagesmix (20 Aufgaben gemischt), Tagesziel, Serie |
| Prüfung | Umschaltbar **DTB B2** / **DTZ**. DTB: E-Mail beantworten, Telefonnotiz, Forumsbeitrag, Sprachbausteine, Vortrag, Prüferfragen, Diskussion, Lösung finden, Hören im Beruf. DTZ: Brief, Brief-Lückentext, Lesen (Wegweiser, Anzeigen), Sich vorstellen, Erzählen, Gemeinsam planen, Hören. Mit Timer, Redemitteln, Musterlösungen zum Anhören und **Punkterechner** (bestanden ja/nein). |
| Wörter | Karteikasten mit Wiederholung nach 1, 3, 7, 14, 30 … Tagen, Quiz: Bedeutung, der/die/das, Lückentext, Wortart |
| Satzbau | Satz bauen, Wo steht das Verb?, Richtig oder falsch?, Diktat (hören und bauen) |
| Statistik | Aufgaben, richtig/falsch und Minuten pro Tag, Diagramm 14 Tage, Übungsarten, häufigste Fehler, **Bericht per WhatsApp senden** |
| Fehleranalyse | Satzbau nach Grammatik-Thema, Fehlerarten (Verb falsch / Wörter vertauscht), Artikel-Verwechslungen, schwache Wortthemen, schwerste Sätze, **Auswertung teilen**. Der Tagesmix und „Meine Schwächen trainieren“ wählen Sätze gezielt aus den schwächsten Themen. |
| Mehr | Schreibaufgaben mit Musterlösung, Grammatik auf Deutsch und Russisch, Wortliste, Einstellungen, Sicherung |

Der Fortschritt wird nur auf dem Handy gespeichert. Unter *Mehr → Sicherung* kann man einen Sicherungscode erstellen.

## Inhalte hinzufügen

Die Inhalte stehen als einfache Textdateien im Ordner `quellen/`. Eine Zeile = ein Eintrag, Felder mit `|` getrennt.

**Wörter** (`quellen/woerter-*.txt`):

```
Wort|Artikel|Formen|Wortart|Russisch|Bedeutung|Beispielsatz|Niveau|Thema
Antrag|der|Anträge|N|заявление|ein offizielles Schreiben …|Ich habe den Antrag abgegeben.|B1|Behörden
```

Wortart: `N` Nomen, `V` Verb, `A` Adjektiv, `Adv` Adverb, `P` Präposition, `K` Konjunktion, `R` Redemittel.
Artikel nur bei Nomen, sonst `-`.

**Sätze** (`quellen/saetze-*.txt`):

```
Satz|Russisch|Niveau|Regel|Thema
Ich bleibe zu Hause, weil ich krank *bin*.|Я остаюсь дома, потому что болею.|B1|weil → Verb am Ende|Gesundheit
```

Das **konjugierte Verb mit Sternchen** markieren (`*bin*`). Damit funktionieren die Übungen
„Wo steht das Verb?“ und „Richtig oder falsch?“.

**Prüfungsaufgaben** (`quellen/pruefung/*.json`): Jede Datei ist ein Objekt `{"typ": [Aufgaben]}`.
Jede Aufgabe braucht eine eindeutige `id` und `ex` (`["DTB"]`, `["DTZ"]` oder beides).
Typen und Felder:

| Typ | Felder |
|---|---|
| `mail` | `t, von, betreff, text, fragen[{q,o,r}], aufgabe, punkte[], ru, rm[], m` |
| `notiz` | `t, situation, audio, felder[{l, a:[Stichwörter]}], m` |
| `forum` | `t, frage, beitraege[{name,text}], punkte[], ru, rm[], m` |
| `brief` | `t, situation, punkte[], ru, rm[], m, w` |
| `sb` | `t, text` mit `{{1}}`…, `gaps[{o:[a,b,c], r, k, e}]` |
| `vortrag` | `t, thema, stichpunkte[], ru, rm[], m` |
| `fragen` | `t, fragen[{q, m, ru}]` |
| `diskussion`, `loesung` | `t, thema, situation, optionen?, rm[], schritte[{wer, sagt, o[], r, e}], m` |
| `hoeren` | `t, situation?, text, fragen[{q,o,r} oder {q, rf:true/false}]` |
| `lesen` | `t, anweisung, texte[{k,text}], fragen[{q,o,r}]` |

`r` ist die Nummer der richtigen Option (ab 0). Die App mischt die Optionen selbst.

Nach dem Ändern: `python3 tools/build_content.py` ausführen (prüft die Dateien) und committen.
Beim Push baut GitHub die Web-App automatisch neu.

## Technik

- `web/` – die App (HTML, CSS, JavaScript ohne Framework), offline-fähig über einen Service Worker
- `quellen/` → `tools/build_content.py` → `web/content/*.json`
- `android/` – kleine Android-App (WebView) mit Vorlesen (Android-Sprachausgabe) und Teilen
- `.github/workflows/` – veröffentlicht die Web-App auf GitHub Pages und baut die APK als Release

Der Signierschlüssel `android/keystore/app.jks` liegt im Repo, damit jede neue APK als Update installiert
werden kann. Für eine private App ist das ausreichend.
