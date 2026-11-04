# Masterplan – Deutsch lernen A2 · B1 · B2 (DTB und DTZ)

Stand: 04.11.2026 · Verantwortlich: Mario · Umsetzung: Claude

---

## 1. Ziel

Die Lernerin besteht den **Deutsch-Test für den Beruf B2 (DTB)**. Ihr Alltagsdeutsch soll dabei mitwachsen, deshalb kann man in der App auch den **DTZ** (Deutsch-Test für Zuwanderer, A2–B1) wählen.

Der letzte Versuch zeigt das typische Bild: **Lesen und Hören sind solide, Schreiben und Sprechen fehlen.** Dazu kommt die Wortstellung als Grundproblem. Deshalb gilt:

1. **Von vorn beginnen:** Der *Grundkurs* fängt bei „Verb auf Platz 2“ an und geht Stufe für Stufe bis Passiv und Konjunktiv II. Die nächste Stufe öffnet sich erst ab 80 % richtig.
2. **Schreiben und Sprechen täglich**, nicht nur am Ende.
3. **Nichts auf eine Sache beschränken:** alle vier Prüfungsteile, Alltag und Beruf.

**Grundregeln der App (gelten für jede Erweiterung)**

1. **Antworten immer auf Deutsch.** Russisch hilft nur beim Verstehen der Aufgabe. Die Übersetzung erscheint nach der Antwort.
2. **Alles kann man sich anhören:** jedes Wort, jeden Satz, jede Aufgabe und jede Regel.
3. **Satzbau zuerst:** Verbposition, Nebensatz und Satzklammer haben Vorrang.
4. **Die App passt sich an:** Die Fehleranalyse bestimmt, was als Nächstes geübt wird.
5. **Inhalte ohne App-Update:** Neue Inhalte kommen per Commit in `quellen/`. Die APK wird nur geändert, wenn es wirklich nötig ist.

---

## 2. Stand heute

| Bereich | Stand |
|---|---|
| Wortschatz | 1754 Wörter (A2-Grundwortschatz, B1, B2, Berufswortschatz) |
| Satzbau | 973 Übungssätze (789 mit markiertem Verb) von A2 bis B2, davon ca. 70 Berufssätze mit B2-Strukturen |
| **Grundkurs von vorn** | 13 Stufen von „Verb auf Platz 2“ bis „Passiv“ plus Abschluss; Freischaltung ab 80 % |
| **Prüfung DTB** | 15 E-Mails mit Fragen und Antwortaufgabe, 12 Telefonnotizen, 8 Forumsbeiträge, 12 Sprachbaustein-Texte, 10 Vorträge, 4 Fragerunden, 8 Diskussionen, 6 Planungsaufgaben, 12 Hörtexte |
| **Prüfung DTZ** | 10 Briefe, 8 Leseaufgaben (Wegweiser, Anzeigen, Aushänge), 6 Brief-Lückentexte, 5 Erzählthemen, 2 Fragerunden, 4 Planungsaufgaben, 8 Hörtexte |
| Prüfungsrechner | Punkte eintragen → bestanden ja/nein nach DTB- bzw. neuer DTZ-Regel |
| Übungen | Karteikarten, Satz bauen, Wo steht das Verb?, Richtig oder falsch?, Diktat, Hörtraining, Bedeutung, der/die/das, Lückentext, Wortart, Schreiben mit Checkliste und Timer |
| Statistik | pro Tag Aufgaben, richtig, falsch, Minuten; Pausentage; Fehleranalyse nach 12 Grammatik-Themen; „Auswertung teilen“ |
| Technik | Web-App auf GitHub Pages, Android-App (WebView, Vorlesen), Fortschritt lokal auf dem Handy |

**Noch offen (Mario):** GitHub Pages einschalten (*Settings → Pages → Source: GitHub Actions*), danach den Workflow „Web-App veröffentlichen“ einmal starten.

---

## 2a. Meilensteine Inhalts-Ausbau (Auftrag vom 04.11.2026: alles vervierfachen)

Ziel: ≈ 7.000 Wörter · ≈ 3.900 Übungssätze · 72 Schreibaufgaben · ≈ 520 Prüfungsaufgaben (DTB + DTZ).
Jeder Inhalts-Meilenstein bringt ungefähr **+400 Wörter, +250 Sätze und +30 Prüfungsaufgaben** und wird nach Abschluss auf main gepusht.
(Plan am 04.11. nach M5 angepasst: Die Pakete sind kleiner als zuerst gedacht, dafür sind es mehr.)

| # | Meilenstein | Schwerpunkt | Status |
|---|---|---|---|
| M1 | Lernsteuerung | 30 neue Wörter/Tag, weniger Wiederholungen (Satz erst nach 40, Wort nach 20 anderen) | ✅ fertig |
| M2 | Grundkurs-Sätze | 40–90 Sätze pro Stufe, A2 zuerst | ✅ fertig |
| M3 | Schreibaufgaben | 18 → 72 (A2, B1, B2, DTZ und DTB) | ✅ fertig |
| M4 | Inhaltspaket 1 | Wörter 1.754 → 3.169 · Sätze 973 → 1.602 · Prüfung 130 → 240 | ✅ fertig |
| M5 | Inhaltspaket 2: Beruf | Pflege, Lager, Büro, Handel, Gastro, Bau, Kita · Wörter → 3.524 · Sätze → 1.800 · Prüfung → 261 | ✅ fertig |
| M6 | Inhaltspaket 3: Alltag | Küche, Einkaufen, Haushalt, Stadt, Familie, Kleidung, Natur · DTZ-Briefe, Lesen, Hören · Wörter → 3.829 · Sätze → 1.957 · Prüfung → 289 | ✅ fertig |
| M7 | Inhaltspaket 4 | B2-Wortschatz · Sprachbausteine | ✅ fertig (Wörter → 4.114, Sätze → 2.197, Prüfung → 317) |
| M8 | Inhaltspaket 5 | Gesundheit, Behörden · Hören | ⏳ als Nächstes |
| M9 | Inhaltspaket 6 | Gesellschaft, Medien, Umwelt · Vortrag und Diskussion | offen |
| M10 | Inhaltspaket 7 | Wohnen, Familie, Freizeit · Lösung finden, Fragen, Forum | offen |
| M11 | Inhaltspaket 8 | Grammatik-Drill zu allen 12 Themen · DTB-E-Mails und Telefonnotizen | offen |
| M12 | Inhaltspaket 9 | Verben, Adjektive, Redemittel · gemischte Prüfungsaufgaben | offen |
| M13 | Inhaltspaket 10 | Wortfamilien, Nomen-Verb-Verbindungen · Sprechen DTZ | offen |
| M14 | Inhaltspaket 11 | Lücken füllen, bis alle Zielzahlen erreicht sind | offen |
| M15 | Abschluss | Qualitätscheck (Dubletten, Fehler, Test im Browser), Zahlen prüfen | offen |

**Stand:** 7 von 15 Meilensteinen fertig. Aktuell: 4.114 Wörter · 2.197 Sätze · 72 Schreibaufgaben · 317 Prüfungsaufgaben.

---

## 3. Die Prüfungen

### 3.1 Deutsch-Test für den Beruf B2 (DTB) – Hauptziel

| Teil | Inhalt | In der App |
|---|---|---|
| **Lesen** | 4 Teile: Texte aus dem Arbeitsalltag (Mitteilungen, Anweisungen, Berichte) | Lesen über E-Mail-Fragen und Sprachbausteine; eigene DTB-Leseteile folgen |
| **Lesen + Schreiben** | E-Mail lesen, Fragen beantworten, dann eine Antwort schreiben (z. B. auf eine Beschwerde, mit Lösungsvorschlag) | **E-Mail beantworten** (Fragen → Antwort mit Timer, Leitpunkte, Redemittel, Musterlösung) |
| **Hören** | 4 Teile: Telefonate, Besprechungen, Durchsagen, Gespräche | **Hören im Beruf** (max. 2× hören, a/b/c und richtig/falsch) |
| **Hören + Schreiben** | Telefonat hören und eine **Telefonnotiz** schreiben | **Telefonnotiz** (Anruf 2×, Felder werden automatisch geprüft) |
| **Sprachbausteine + Schreiben** | 2 Lückentexte mit je 6 Lücken, dazu ein **Forumsbeitrag** | **Sprachbausteine** mit Erklärung je Lücke, **Forumsbeitrag** (mind. 120 Wörter) |
| **Sprechen** | 1A Vortrag · 1B Fragen der Prüfer · 2 Diskussion · 3 gemeinsam eine Lösung finden | **Vortrag** (3-Min.-Timer), **Prüferfragen**, **Diskussion** und **Lösung finden** (die App spielt den Partner) |

**Bestehensregel:** Jeder Bereich (Lesen, Hören, Schreiben, Sprechen) bringt maximal **60 Punkte**, zusammen 240.
B2 ist bestanden, wenn **mindestens 144 Punkte** erreicht sind, **mindestens drei Bereiche je 36 Punkte** haben und **kein Bereich unter 24 Punkten** liegt.
→ **Für uns heißt das:** Ein guter Lese- und Hörteil reicht nicht. Schreiben **und** Sprechen müssen beide sicher über 24, einer davon über 36.

### 3.2 Deutsch-Test für Zuwanderer (DTZ, A2–B1) – Alltagsdeutsch

| Teil | Zeit | Inhalt |
|---|---|---|
| Hören (20 Aufgaben) | 25 Min. | Ansagen und Durchsagen, Radio, Gespräche, Meinungen |
| Lesen (25 Aufgaben) | 45 Min. | Wegweiser und Verzeichnisse, Anzeigen, Presse, Broschüren, **Brief-Lückentext** |
| Schreiben | 30 Min. | Brief oder E-Mail mit 4 Leitpunkten |
| Sprechen (Paar) | ca. 10 Min. | sich vorstellen · über Erfahrungen erzählen · gemeinsam planen |

**Bewertung:** Hören + Lesen: ab 20 von 45 = A2, **ab 33 von 45 = B1**.
**Seit 1. November 2026:** B1 gilt nur, wenn **Sprechen B1** ist, dazu **Hören/Lesen oder Schreiben B1** und **der andere schriftliche Teil mindestens A2**.

### 3.3 telc B1/B2 und Goethe B1/B2 (zum Vergleich)

Ähnliche Aufgaben: Sprachbausteine (telc), Forumsbeitrag und formelle Nachricht (Goethe B2), Präsentation und Diskussion. Alles, was die App für DTB und DTZ trainiert, hilft auch hier.

---

## 4. Was fehlt noch

| Bereich | Fehlt | Priorität |
|---|---|---|
| Lesen DTB | eigene Leseteile (Überschriften zuordnen, Anweisungen, Berichte mit a/b/c) | 1 |
| Hören | Dialoge mit zwei Stimmen (braucht kleine APK-Änderung), Meinungen zuordnen | 2 |
| Simulation | komplette Prüfung mit Zeitlimit und Punkteschätzung | 1 |
| Sprechen | sich selbst aufnehmen und anhören (braucht Mikrofon-Berechtigung, neue APK) | 3 |
| Grammatik | Drill zu Kasus nach Präpositionen und Adjektivendungen | 2 |
| Wortschatz | Fachwortschatz je Branche (Pflege, Lager, Büro, Handel), sobald der Beruf feststeht | 2 |

Neue Aufgabentypen werden erst nach Rücksprache mit Mario gebaut (siehe `CLAUDE.md`).

---

## 5. Lernplan

| Wann | Was | Dauer |
|---|---|---|
| täglich | **Grundkurs**: nächste Stufe oder letzte Stufe wiederholen, bis 80 % sitzen | 10 Min. |
| täglich | **Tagesmix** (20 Aufgaben) | 10–15 Min. |
| täglich | **1 Aufgabe Sprechen** (Vortrag, Diskussion oder Lösung finden) laut üben | 10 Min. |
| 3× pro Woche | **1 Aufgabe Schreiben** (E-Mail, Telefonnotiz oder Forum) mit Timer, danach Musterlösung laut anhören | 25 Min. |
| 2× pro Woche | **Sprachbausteine** und **Hören im Beruf** | 15 Min. |
| 1× pro Woche | Alltagsdeutsch: Prüfung auf **DTZ** umstellen und eine Runde Brief, Lesen, Hören | 30 Min. |
| 1× pro Woche | Auswertung an Mario schicken | 2 Min. |

Ziel: **an mindestens 6 von 7 Tagen lernen**, auch wenn es zäh ist. Pausentage zeigt die Statistik rot an.

---

## 6. Auswertung und Verbesserung (Kreislauf)

1. Die Lernerin übt, die App protokolliert jede Antwort.
2. *Statistik → Fehleranalyse → Auswertung teilen* → Text per WhatsApp an Mario.
3. Mario kopiert den Text in den Chat mit Claude.
4. Claude liest die schwächsten Themen und schwersten Sätze heraus und ergänzt **gezielte neue Sätze und Aufgaben** in `quellen/` (Regeln: siehe `CLAUDE.md`).
5. Push → die App hat beim nächsten Öffnen die neuen Inhalte.

**Messgrößen**
- Grundkurs: alle 13 Stufen mit ≥ 80 %
- Satzbau-Quote je Grammatik-Thema ≥ 80 %
- Prüfungsrechner: Schreiben und Sprechen je ≥ 36 (Selbsteinschätzung anhand der Musterlösungen)
- Lerntage pro Woche ≥ 6

---

## 7. Mehrere Benutzer (Option für später)

Zuerst mit einer Lernerin testen, dann mit 3–5 weiteren Lernenden. Nötig wären dann eine Betreuer-Ansicht, ein Online-Speicher und eine Anmeldung.
→ Seit 04.11.2026 Teil des Monetarisierungsplans, siehe **Abschnitt 9**.

---

## 8. Rechtliches und Qualität

- **Keine Aufgaben aus offiziellen Modelltests kopieren.** Alle Aufgaben in der App sind selbst geschrieben, im gleichen Format.
- Offizielle kostenlose Modelltests dürfen verlinkt und zusätzlich auf Papier geübt werden.
- Prüfungsnamen nur zur Beschreibung, nicht als Marke.
- Das Repo ist öffentlich → **keine echten Namen, keine Ergebnisse, keine persönlichen Daten** in Inhalten. Beispielname: Olga Iwanowa.

---

## 9. Monetarisierung (Plan vom 04.11.2026)

**Idee:** Monatsabo für **4,99 €** für Zuwanderer, die sich auf DTZ oder DTB vorbereiten. Die erste Zielgruppe sind russischsprachige Lernende, weil die App dafür schon gebaut ist.
**Grundsatz:** Die Inhalts-Meilensteine M7–M15 haben Vorrang. Verkauft wird erst, wenn die App bei mehreren fremden Lernenden funktioniert.

### 9.1 Was sich technisch ändern muss

| Heute | Problem für ein Abo | Lösung |
|---|---|---|
| Inhalte liegen öffentlich (Repo und GitHub Pages) | Jeder kann alles kostenlos abrufen, ein Abo wäre wertlos | Bezahlinhalte in ein **privates Repo** und auf einen Server, der sie nur nach Anmeldung ausliefert |
| Fortschritt nur im localStorage | Neues Handy oder Daten gelöscht heißt Fortschritt weg. Für zahlende Kunden ist das nicht akzeptabel | **Konto und Online-Speicher**, z. B. Supabase oder Firebase; localStorage bleibt als Offline-Zwischenspeicher |
| Android-App ist nur eine WebView-Hülle | Google Play lehnt reine Website-Hüllen oft ab. Digitale Abos in der App müssen über **Google Play Billing** laufen | App bekommt eigene Funktionen (offline lernen, Vorlesen, Sprechen aufnehmen) und Play Billing |
| Oberfläche auf Deutsch | Neue Nutzer verstehen die Bedienung nicht sofort | Menüs und Hilfe zusätzlich auf Russisch, später weitere Sprachen |

### 9.2 Gratis und Premium

| Gratis (zum Ausprobieren) | Premium (4,99 €/Monat) |
|---|---|
| Grundkurs Stufe 1–3 | alle 13 Grundkurs-Stufen |
| Tagesmix, begrenzt pro Tag | Tagesmix ohne Grenze |
| Karteikarten A2 | gesamter Wortschatz A2–B2 und Beruf |
| je 1 Beispielaufgabe DTZ und DTB | alle Prüfungsaufgaben, Prüfungssimulation, Statistik und Fehleranalyse |

Zusätzlich **7 Tage Premium kostenlos** testen. Die bisherige Lernerin behält dauerhaft vollen Zugang.

### 9.3 Rechnung

4,99 € brutto − 19 % USt. = 4,19 € − 15 % Google-Anteil = **ca. 3,56 € pro Abo und Monat**.

| Zahlende Abos | Netto pro Monat (vor Server-Kosten und Steuer) |
|---|---|
| 100 | ≈ 356 € |
| 280 | ≈ 1.000 € |
| 1.400 | ≈ 5.000 € |

### 9.4 Fahrplan

| # | Phase | Inhalt | Ergebnis / Bedingung zum Weitergehen | Status |
|---|---|---|---|---|
| G1 | Inhalte fertig | M7–M15 abschließen | alle Zielzahlen erreicht, Qualitätscheck bestanden | ⏳ läuft |
| G2 | Testgruppe | 10–20 fremde Lernende nutzen die Web-App **kostenlos** 4 Wochen lang. Kurzer Fragebogen: Was fehlt? Würdest du 4,99 € zahlen? | mind. die Hälfte lernt nach 4 Wochen noch ≥ 3 Tage pro Woche, mind. 5 würden zahlen | offen |
| G3 | Rechtliches | Gewerbe anmelden, steuerliche Einordnung klären (Kleinunternehmer?), Impressum, Datenschutzerklärung (DSGVO), AGB mit Widerrufsbelehrung, Google-Play-Entwicklerkonto mit Zahlungsprofil, App-Name auf Markenrechte prüfen | alles erledigt, bevor der erste Euro fließt | offen |
| G4 | Technik | Anmeldung und Online-Speicher, Bezahlinhalte privat, Gratis/Premium-Grenze, Play Billing, russische Oberfläche, Datenübernahme aus localStorage | geschlossener Test mit der Testgruppe im Play Store | offen |
| G5 | Start | Play-Store-Eintrag auf Deutsch und Russisch, Werbung in Telegram- und Facebook-Gruppen für Zuwanderer, Lehrkräfte von Integrations- und Berufssprachkursen ansprechen | erste 50 zahlende Abos | offen |
| G6 | Ausbau | weitere Hilfssprachen (zuerst Ukrainisch), Jahresabo, Sprechen mit Aufnahme | Wachstum je nach Zahlen aus G5 | offen |

### 9.5 Offene Entscheidungen (Mario)

- Preis: nur Monatsabo 4,99 € oder zusätzlich ein günstigeres Jahresabo?
- Name der App für den Play Store
- Online-Speicher: Supabase oder Firebase (Claude macht vor G4 einen Vorschlag)
- Wann startet G2? Vorschlag: sobald M10 fertig ist, damit die Testgruppe schon genug Inhalt hat

Neue Aufgabentypen und Änderungen an `android/` werden auch hier erst nach Rücksprache gebaut.

---

## Quellen

- [deutsch1.net – Deutsch-Test für den Beruf (DTB)](https://deutsch1.net/blog/deutsch-test-fuer-den-beruf)
- [deutsch-vorbereitung.com – DTB B2: Aufbau und Tipps](https://www.deutsch-vorbereitung.com/en/30-blog-artikel.html)
- Cornelsen, Prüfungstraining DTB B2 (Leseprobe, content.e-bookshelf.de)
- BAMF: Modelltest Berufssprachkurse B2 (bamf.de)
- Goethe-Institut / BAMF: [DTZ Prüfungshandbuch](https://WWW.GOETHE.DE/resources/files/pdf209/dtz_pruefungshandbuch.pdf), [DTZ Modellsatz](https://WWW.GOETHE.DE/resources/files/pdf209/dtz_modellsatz_e_2009_08.pdf)
- [asyl.net – Neue Anforderungen beim DTZ (ab 1.11.2026)](https://www.asyl.net/view/neue-anforderungen-beim-deutsch-test-fuer-zuwanderer)
- [§ 10 Integrationskurstestverordnung](https://www.gesetze-im-internet.de/inttestv/__10.html)
- [deutsch-pruefung.de – telc B1](https://deutsch-pruefung.de/blog/telc-b1-ultimate-guide), [telc B2](https://deutsch-pruefung.de/blog/telc-b2-ultimate-guide)
- [Goethe-Zertifikat B2](https://www.goethe.de/ins/gb/de/m/sta/lon/prf/gzb2/wi9.html)

Hinweis: Vor der Prüfung die aktuellen Unterlagen des Prüfungsanbieters prüfen.
