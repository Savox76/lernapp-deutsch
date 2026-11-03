# Masterplan – Deutsch lernen B1·B2

Stand: 03.11.2026 · Verantwortlich: Mario · Umsetzung: Claude

---

## 1. Ziel

Victoria besteht ihre Deutschprüfung auf **B1** (danach optional B2).
Die App soll genau das trainieren, was in der Prüfung abgefragt wird, mit Schwerpunkt auf ihrer größten Schwäche, der **Wortstellung**.

**Grundregeln der App (gelten für jede Erweiterung)**

1. **Antworten immer auf Deutsch.** Russisch dient nur dazu, die Aufgabe schneller zu verstehen. Die Übersetzung erscheint nach der Antwort.
2. **Alles kann man sich anhören:** jedes Wort, jeden Satz, jede Aufgabe und jede Regel.
3. **Satzbau zuerst:** Verbposition, Nebensatz und Satzklammer haben Vorrang.
4. **Die App passt sich an:** Die Fehleranalyse bestimmt, was als Nächstes geübt wird.
5. **Inhalte ohne App-Update:** Neue Inhalte kommen per Commit in `quellen/`. Die APK wird nur geändert, wenn es wirklich nötig ist.

---

## 2. Stand heute

| Bereich | Stand |
|---|---|
| Inhalte | 1668 Wörter, 807 Übungssätze (630 mit markiertem Verb) plus ca. 1600 Beispielsätze, 18 Schreibaufgaben mit Musterlösung, 14 Grammatikkapitel (DE und RU) |
| Übungen | Karteikarten (Wiederholung nach 1/3/7/14/30 Tagen), Satz bauen, Wo steht das Verb?, Richtig oder falsch?, Diktat, Hörtraining, Bedeutung (nur Deutsch), der/die/das, Lückentext, Wortart, Schreiben mit Checkliste |
| Steuerung | Tagesmix (20 Aufgaben), Tagesziel, Serie, „Meine Schwächen trainieren“ |
| Statistik | pro Tag Aufgaben, richtig, falsch und Minuten; Pausentage; Diagramm 14 Tage; WhatsApp-Bericht |
| Fehleranalyse | 12 Grammatik-Themen, Fehlerarten, Artikel-Verwechslungen, Wortthemen, schwerste Sätze, „Auswertung teilen“ |
| Technik | Web-App auf GitHub Pages, Android-App (WebView, Vorlesen über Android-Sprachausgabe), Fortschritt lokal auf dem Handy |

**Noch offen (Mario):** GitHub Pages einschalten (*Settings → Pages → Source: GitHub Actions*), APK auf Victorias Handy installieren.

---

## 3. Rechercheergebnis: So sind die Prüfungen aufgebaut

### 3.1 Deutsch-Test für Zuwanderer (DTZ, A2–B1) – wahrscheinlich Victorias Prüfung

| Teil | Zeit | Inhalt laut Prüfungshandbuch |
|---|---|---|
| **Hören** (20 Aufgaben) | 25 Min. | T1 Ansagen am Telefon und Durchsagen (4) · T2 Radioinformationen (5) · T3 Gespräche (8) · T4 Meinungsäußerungen (3) |
| **Lesen** (25 Aufgaben) | 45 Min. | T1 Kataloge, Register, Verzeichnisse (5) · T2 Anzeigen (5) · T3 Presse und formelle Mitteilungen (6) · T4 Informationsbroschüren (3) · T5 formeller Brief als Lückentext (6) |
| **Schreiben** | 30 Min. | 1 Brief oder E-Mail (halbformell oder formell); eine von zwei Aufgaben, 4 Leitpunkte, Anrede und Gruß |
| **Sprechen** (Paar) | ca. 10 Min. pro Person | T1 sich vorstellen und Nachfragen beantworten · T2 Informationen geben bzw. über ein Bild oder Erfahrungen erzählen, vergleichen · T3 gemeinsam etwas planen bzw. aushandeln |

**Bewertung:** Hören und Lesen zusammen: ab 20 von 45 richtig = A2, **ab 33 von 45 = B1**. Schreiben und Sprechen bewerten Prüfende nach Kriterien.

**⚠ Neu seit 1. November 2026 (Änderung der Integrationskurstestverordnung):**
B1 gilt nur, wenn **Sprechen B1** ist, dazu **Hören/Lesen oder Schreiben B1** und **der andere schriftliche Teil mindestens A2**.
Früher reichte B1 in Sprechen plus einem schriftlichen Teil. Ein leeres Schreiben führt jetzt also zum Nichtbestehen.
→ **Für uns heißt das: Schreiben darf nicht vernachlässigt werden.**

### 3.2 telc Deutsch B1 (Zertifikat Deutsch)

| Teil | Inhalt |
|---|---|
| Leseverstehen | T1 Überschriften zuordnen (5) · T2 Detailverstehen a/b/c (5) · T3 Situationen ↔ Anzeigen (10) |
| **Sprachbausteine** | T1 Grammatik-Lückentext a/b/c (10) · T2 Wortschatz-Lückentext aus 15 Wörtern (10) |
| Hörverstehen | T1 global (5) · T2 Detail (10) · T3 selektiv (5), richtig/falsch |
| Schreiben | Brief oder E-Mail mit 4 Leitpunkten (ca. 100–120 Wörter, 30 Min.) |
| Sprechen (Paar) | T1 Kontaktaufnahme · T2 Gespräch über ein Thema · T3 gemeinsam planen |

Bestehen: 60 % schriftlich (135/225) **und** 60 % mündlich (45/75).

### 3.3 Goethe-Zertifikat B1 (modular, jedes Modul ab 60 %)

| Modul | Inhalt |
|---|---|
| Lesen (65 Min.) | T1 Blog/E-Mail richtig/falsch · T2 Zeitungstexte a/b/c · T3 Anzeigen zuordnen · T4 Meinungen dafür/dagegen · T5 Hausordnung oder Anleitung a/b/c |
| Hören (40 Min.) | T1 kurze Ansagen · T2 Vortrag/Führung · T3 Gespräch richtig/falsch · T4 Radiodiskussion: wer sagt was? |
| Schreiben (60 Min.) | 1 informelle E-Mail · 2 Forumsbeitrag mit Meinung (ca. 80 Wörter) · 3 formelle E-Mail (ca. 40 Wörter) |
| Sprechen (15 Min.) | T1 gemeinsam etwas planen · T2 Präsentation zu einem Thema · T3 Fragen zur Präsentation |

### 3.4 B2 (für später)

- **telc B2:** wie B1 aufgebaut (Lesen 3 Teile, Sprachbausteine 2 Teile, Hören 3 Teile), Schreiben: Anfrage **oder** Beschwerde, mindestens 150 Wörter; Sprechen: Erfahrung präsentieren, diskutieren, planen.
- **Goethe B2:** Lesen 5 Teile, Hören 4 Teile, Schreiben 75 Min. (Forumsbeitrag mit Meinung + formelle Nachricht im Beruf), Sprechen: Vortrag + Diskussion.

---

## 4. Abgleich: Was die App schon trainiert und was fehlt

| Prüfungsteil | Schon in der App | Fehlt noch |
|---|---|---|
| Hören – Ansagen, Durchsagen | Hörtraining (Wort/Satz), Diktat | **Ansagen mit Fragen a/b/c** (Uhrzeit, Gleis, Termin …) |
| Hören – Radio, Gespräche, Meinungen | – | **Gespräche richtig/falsch**, **Meinungen zuordnen** |
| Lesen – Kataloge, Wegweiser | – | **„Wo finde ich …?“ mit Kaufhaus- oder Amtswegweiser** |
| Lesen – Anzeigen | – | **Situationen ↔ Anzeigen zuordnen** |
| Lesen – Presse, Broschüren | Lückentext (Satz) | **Kurztexte mit richtig/falsch bzw. a/b/c** |
| Lesen T5 / Sprachbausteine | – | **Brief-Lückentext mit a/b/c (Grammatik) und Wortkasten (Wortschatz)** |
| Schreiben | 18 Aufgaben, Checkliste, Musterlösung | **30-Minuten-Timer, Leitpunkte-Prüfung, Baukasten für Briefe, Fehlerliste** |
| Sprechen T1 | Redemittel als Wörter | **Vorstellung trainieren (Fragekarten, Musterantworten zum Anhören)** |
| Sprechen T2 | – | **Über Bild oder Erfahrung erzählen (Stichpunkte → Muster)** |
| Sprechen T3 | Redemittel, Beispielsätze | **Planungsgespräch mit App-Partner (die App spricht die Gegenrolle)** |
| Gesamt | – | **Prüfungssimulation mit Zeit und Ergebnis A2/B1 nach neuer Regel** |
| Grammatik | Satzbau stark | **Kasus nach Präpositionen, Adjektivendungen, Konnektoren-Lücken** |

---

## 5. Neue Aufgabentypen – Vorschläge

Legende: **Aufwand** S = klein, M = mittel, L = groß · **APK** = Victoria muss die App neu installieren

### Priorität 1 – direkt prüfungsrelevant, ohne neue APK

| # | Aufgabe | Prüfungsbezug | Umsetzung | Aufwand |
|---|---|---|---|---|
| 1.1 | **Brief-Lückentext (Sprachbausteine)** | DTZ Lesen T5, telc SB 1/2 | Formeller Brief mit 6–10 Lücken, je a/b/c (Präposition, Konnektor, Artikel, Verbform) bzw. Wortkasten; jede Lücke einem Grammatik-Thema zugeordnet → fließt in die Fehleranalyse | M |
| 1.2 | **Hören: Ansagen und Durchsagen** | DTZ Hören T1, Goethe Hören T1 | Kurze Texte (Anrufbeantworter, Bahnhof, Arztpraxis, Kaufhaus) werden vorgelesen, danach 1 Frage a/b/c; Text erst nach der Antwort sichtbar | M |
| 1.3 | **Lesen: Anzeigen zuordnen** | DTZ Lesen T2, telc LV3, Goethe Lesen T3 | 5 Situationen, 6–8 kurze Anzeigen, eine passt nicht | M |
| 1.4 | **Lesen: Wegweiser und Verzeichnisse** | DTZ Lesen T1 | Etagenplan Kaufhaus, Amt oder Klinik → „Wohin gehen Sie?“ a/b/c | S |
| 1.5 | **Schreiben im Prüfungsmodus** | alle Prüfungen | 30-Minuten-Timer, Wortzähler, Häkchen pro Leitpunkt, Briefbaukasten (Anrede, Einleitung, Bitte, Schluss, Gruß als antippbare Sätze), danach Musterlösung | S |
| 1.6 | **Prüfungssimulation „Mini-DTZ“** | DTZ gesamt | 1× pro Woche: je 1 Block Hören, Lesen, Sprachbausteine, Schreiben mit Zeitlimit → Punkte und Einschätzung A2/B1 nach der **neuen Regel** | M |
| 1.7 | **Grammatik-Drill Kasus und Endungen** | Sprachbausteine | Präposition + Artikel (mit dem/den), Adjektivendungen, wo/wohin – als a/b/c im Satz | S |

### Priorität 2 – wichtig, etwas mehr Inhalt nötig

| # | Aufgabe | Prüfungsbezug | Umsetzung | Aufwand |
|---|---|---|---|---|
| 2.1 | **Hören: Gespräche richtig/falsch** | DTZ Hören T3, Goethe T3, telc HV | Dialog mit zwei Stimmen (verschiedene Stimmhöhe), danach 2–3 Aussagen richtig/falsch | M |
| 2.2 | **Hören: Meinungen** | DTZ Hören T4, Goethe Hören T4 | 3 Personen sagen ihre Meinung → Aussagen zuordnen | M |
| 2.3 | **Lesen: Presse und Broschüren** | DTZ Lesen T3/T4, Goethe Lesen T2/T5 | Kurztexte (Zeitungsmeldung, Hausordnung, Elternbrief) mit 3 Fragen | M |
| 2.4 | **Sprechen T1: Vorstellung** | DTZ/telc/Goethe Sprechen | Fragekarten (Name, Herkunft, Familie, Arbeit, Hobbys …); Victoria spricht laut, dann hört sie eine Musterantwort; Checkliste „Habe ich alles gesagt?“ | S |
| 2.5 | **Sprechen T2: Erzählen** | DTZ Sprechen T2, Goethe Präsentation | Thema mit 4 Stichpunkten → 1 Minute frei sprechen (Timer) → Musterantwort anhören | M |
| 2.6 | **Sprechen T3: gemeinsam planen** | alle Prüfungen | Die App spielt den Partner und spricht Vorschläge per Sprachausgabe. Victoria antwortet laut und wählt danach die passende Antwort aus 3 Möglichkeiten. Redemittel werden eingeblendet. | M |
| 2.7 | **Redemittel-Trainer** | Sprechen und Schreiben | Situation („Sie möchten widersprechen“) → passende Wendung wählen oder bauen | S |

### Priorität 3 – später bzw. mit Technik-Update

| # | Aufgabe / Funktion | Hinweis |
|---|---|---|
| 3.1 | **Sich selbst aufnehmen und anhören** (Sprechen) | Mikrofon braucht eine neue APK (Berechtigung) |
| 3.2 | **Aussprache prüfen** (Spracherkennung) | neue APK und Android-Spracherkennung; nur grobe Prüfung möglich |
| 3.3 | **Zweite Stimme in der Android-App** | Für Dialoge mit zwei deutlich verschiedenen Stimmen braucht es eine kleine APK-Änderung (Stimmhöhe) |
| 3.4 | **Test „Leben in Deutschland“** | Gehört zum Orientierungskurs bzw. zur Einbürgerung; offizieller Fragenkatalog des BAMF |
| 3.5 | **B2-Formate** | Überschriften zuordnen, Forumsbeitrag 150 Wörter, Diskussion, Beschwerde |
| 3.6 | **Betreuer-Ansicht und Online-Speicher** | Mario sieht den Stand jederzeit; Grundlage für mehrere Lernende (Supabase, kostenloser Einstieg) |
| 3.7 | **Mehrere Lernende / weitere Sprachen** | Ukrainisch, Arabisch, Türkisch als Hilfssprache; nur nach erfolgreichem Test (siehe Abschnitt 8) |

---

## 6. Fahrplan

| Zeitraum | Aufgabe | Wer |
|---|---|---|
| **Woche 1** | Pages einschalten, APK installieren, Victoria lernt täglich (Tagesmix + 1× Schwächen), schickt abends den Bericht | Mario, Victoria |
| **Woche 1–2** | Rückmeldungen sammeln: falsch gewertete Sätze, nervige Stellen, fehlende Wörter | Mario |
| **Ende Woche 1** | **Erste Auswertung** teilen → gezielte neue Sätze für die schwächsten Themen | Victoria → Mario → Claude |
| **Woche 2–3** | Priorität 1 bauen (1.1–1.7), mit Inhalten (je Typ mind. 20–30 Aufgaben) | Claude |
| **Woche 3** | Erste Mini-Prüfungssimulation → Einschätzung A2/B1 | Victoria |
| **Woche 4–5** | Priorität 2 bauen (Hören-Dialoge, Sprechen-Trainer) | Claude |
| **jede Woche** | Auswertung teilen → neue Inhalte gegen die Schwächen | alle |
| **4 Wochen vor der Prüfung** | jede Woche 1 Simulation, Schreiben 2× pro Woche | Victoria |
| **danach** | Priorität 3 nach Bedarf, Entscheidung über Betreuer-Ansicht und mehr Benutzer | Mario |

---

## 7. Empfohlener Lernplan für Victoria

| Wann | Was | Dauer |
|---|---|---|
| täglich | **Tagesmix** (20 Aufgaben) | 10–15 Min. |
| täglich | **Meine Schwächen trainieren** oder Karteikarten | 10 Min. |
| 2× pro Woche | **1 Schreibaufgabe** mit Checkliste, danach Musterlösung laut anhören | 30 Min. |
| 2× pro Woche | **Sprechen:** Vorstellung bzw. Planungsgespräch laut üben (sobald 2.4–2.6 da sind) | 10 Min. |
| 1× pro Woche | **Mini-Prüfung** (sobald 1.6 da ist) + Auswertung an Mario | 45 Min. |

Ziel: **an mindestens 6 von 7 Tagen lernen**. Pausentage zeigt die Statistik rot an.

---

## 8. Auswertung und Verbesserung (Kreislauf)

1. Victoria lernt, die App protokolliert jede Antwort.
2. *Statistik → Fehleranalyse → Auswertung teilen* → Text per WhatsApp an Mario.
3. Mario kopiert den Text in den Chat mit Claude.
4. Claude liest die schwächsten Themen und schwersten Sätze heraus und ergänzt **gezielte neue Sätze und Aufgaben** in `quellen/` (Regeln: siehe `CLAUDE.md`).
5. Push → die App hat beim nächsten Öffnen die neuen Inhalte, und der Tagesmix übt automatisch die Schwächen.

**Messgrößen**
- Satzbau-Quote je Grammatik-Thema (Ziel: jedes Thema ≥ 80 %)
- Lerntage pro Woche (Ziel ≥ 6)
- Mini-Prüfung: Hören + Lesen ≥ 33/45 Punkte (B1-Grenze), Schreiben alle Leitpunkte erfüllt

---

## 9. Mehrere Benutzer (Option für später)

Zuerst mit Victoria testen, dann mit **3–5 weiteren Lernenden** aus ihrem Umfeld oder Kurs.
Lohnt sich ein Ausbau, wenn die Testpersonen nach 2 Wochen noch dabei sind und die App weiterempfehlen?

**Mögliche Zielgruppe:** Menschen im Integrationskurs, die durch DTZ oder B1 gefallen sind.
**Was die App anders macht:** Fokus auf den Satzbau, Hilfe in der Muttersprache, Statistik für Betreuende.
**Wer bezahlen könnte:** Sprachschulen, Kursträger, Betreuende mit mehreren Lernenden.
**Technisch nötig:** Betreuer-Ansicht und Online-Speicher (3.6), Anmeldung, ggf. privates Repo.

---

## 10. Rechtliches und Qualität

- **Keine Aufgaben aus offiziellen Modelltests kopieren** (telc, Goethe, g.a.s.t. sind urheberrechtlich geschützt). Wir schreiben **eigene Aufgaben im gleichen Format**.
- Offizielle kostenlose Modelltests dürfen verlinkt und zusätzlich auf Papier geübt werden.
- Prüfungsnamen nur zur Beschreibung verwenden, nicht als Marke der App.
- Das Repo ist öffentlich → keine echten Namen oder persönlichen Daten in Inhalten.

---

## 11. Offene Fragen an Mario

1. **Welche Prüfung** schreibt Victoria: DTZ, telc B1 oder Goethe B1?
2. **Wann** ist der nächste Prüfungstermin?
3. **In welchem Teil** hat sie zuletzt Punkte verloren (Ergebnisbogen)?
4. Ist Priorität 1 so in Ordnung, oder sollen wir mit dem **Sprechen** beginnen?
5. Später: Betreuer-Ansicht mit Online-Speicher, ja oder nein?

---

## Quellen

- Goethe-Institut / BAMF: [DTZ Prüfungshandbuch](https://WWW.GOETHE.DE/resources/files/pdf209/dtz_pruefungshandbuch.pdf), [DTZ Modellsatz](https://WWW.GOETHE.DE/resources/files/pdf209/dtz_modellsatz_e_2009_08.pdf)
- [asyl.net – Neue Anforderungen beim Deutsch-Test für Zuwanderer (ab 1.11.2026)](https://www.asyl.net/view/neue-anforderungen-beim-deutsch-test-fuer-zuwanderer)
- [§ 10 Integrationskurstestverordnung](https://www.gesetze-im-internet.de/inttestv/__10.html)
- [sprachschule.org – DTZ Komplett-Guide](https://www.sprachschule.org/blog/dtz-deutsch-test-fuer-zuwanderer-komplett-guide/)
- [deutsch-pruefung.de – telc B1 Guide](https://deutsch-pruefung.de/blog/telc-b1-ultimate-guide), [telc B2 Guide](https://deutsch-pruefung.de/blog/telc-b2-ultimate-guide)
- [Goethe-Institut – Goethe-Zertifikat B1](https://www.goethe.de/ins/gb/de/m/sta/gla/prf/gzb1/inf.html), [Goethe-Zertifikat B2](https://www.goethe.de/ins/gb/de/m/sta/lon/prf/gzb2/wi9.html), [Durchführungsbestimmungen B2](https://www.goethe.de/resources/files/pdf325/durchfuehrungsbestimmungen_b2.pdf)
- [The Language Office – Goethe B1 Prüfungsaufbau](https://www.thelanguageoffice.com/exam-pattern-of-goethe-institut-b1/)

Hinweis: Angaben aus Ratgeberseiten wurden, wo möglich, mit offiziellen Dokumenten abgeglichen. Vor der Prüfung die aktuellen Unterlagen des Prüfungsanbieters prüfen.
