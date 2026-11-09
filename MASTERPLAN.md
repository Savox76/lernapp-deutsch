# Masterplan – Deutsch lernen A2 · B1 · B2 (DTB und DTZ)

Stand: 08.11.2026 · Verantwortlich: Mario · Umsetzung: Claude

**Zuletzt komplett geprüft:** 09.11.2026 nach J7 (Code, Inhalte und Veröffentlichung abgeglichen).
Zeichen: ✅ eingebaut/fertig · 🟡 teilweise · ⏳ in Arbeit · ⬜ offen · ❓ Entscheidung von Mario nötig
Claude aktualisiert diesen Plan nach **jedem** Arbeitsschritt selbstständig.

---

## 1. Ziel

**Vision (Mario, 04.11.2026):** Jedem Menschen das Deutschlernen so einfach wie möglich machen – von A2 bis später C2, in seiner eigenen Sprache erklärt.

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

## 2. Stand heute (geprüft am 09.11.2026 nach J7)

| Bereich | Stand | |
|---|---|---|
| Wortschatz | 7.235 Wörter (A2, B1, B2, Beruf, Alltag, Wortfamilien, Nomen-Verb-Verbindungen) | ✅ |
| Satzbau | 4.129 Übungssätze (4.123 mit markiertem Verb), alle 12 Grammatik-Themen auf A2–B2 | ✅ |
| Schreibaufgaben | 200 (A2, B1, B2, DTZ und DTB; laufend mehr) | ✅ |
| **Grundkurs von vorn** | 13 Stufen von „Verb auf Platz 2“ bis „Passiv“ plus Abschluss; Freischaltung ab 80 %; A2-Sätze zuerst | ✅ |
| **Prüfung DTB** | 260 Leseaufgaben (Teil 1–4) · 55 E-Mails · 52 Telefonnotizen · 52 Forumsbeiträge · 104 Sprachbausteine · 52 Vorträge · 52 Fragerunden · 52 Diskussionen · 52 Lösung finden · 208 Hörtexte · 150 Dialoge | ✅ |
| **Prüfung DTZ** | 104 Briefe · 208 Leseaufgaben · 52 Brief-Lückentexte · 52 Erzählthemen · 52 Fragerunden · 52 Gemeinsam planen · 208 Hörtexte · 75 Dialoge | ✅ |
| Prüfungsrechner | Punkte eintragen → bestanden ja/nein nach DTB-Regel und neuer DTZ-Regel (ab 1.11.2026) | ✅ |
| Übungen | Karteikarten, Satz bauen, Wo steht das Verb?, Richtig oder falsch?, Diktat, **Endungen (Kasus/Adjektive, 239 Sätze)**, Hörtraining, Bedeutung, der/die/das, Lückentext, Wortart, Schreiben mit Checkliste und Timer · Wort markieren (lange drücken) → Erklärung, Formen, Beispiel, Vorlesen, Übersetzung auf Tipp (offline) | ✅ |
| Tagesmix | 20 Aufgaben, jede zweite Satzbau-Aufgabe aus den schwächsten Grammatik-Themen | ✅ |
| Lernsteuerung | 30 neue Wörter pro Tag (einstellbar 20–80), Satz erst nach 40, Wort nach 20 anderen wieder | ✅ |
| Statistik | pro Tag Aufgaben, richtig, falsch, Minuten; Serie; Pausentage; Fehleranalyse nach 12 Grammatik-Themen; „Auswertung teilen“ | ✅ |
| Vorlesen | jedes Wort, jeder Satz, jede Aufgabe, jede Regel (`say()`); fester Player oben bei allen längeren Texten und in jeder Prüfungsaufgabe (▶/⏸, Schieberegler zum Springen, ⏮ ⏭ satzweise, Tempo 0,7/0,9/1,1); Lernmodus bei Prüfungsaufgaben (Umschalter seit 08.11.2026 auch direkt auf der Prüfungsseite; beliebig oft hören, Text zeigen, Satz antippen = ab hier hören, keine Bewertung) neben dem Prüfungsmodus (2× hören, Zeit, Bewertung); Aufgabenliste je Prüfungsteil zum freien Auswählen (Filter Neu/Geübt/Wiederholen, Suche, „Nächste empfohlene“); automatisches Vorlesen bei neuer Aufgabe standardmäßig aus (in den Einstellungen einschaltbar) | ✅ |
| Technik | Web-App auf GitHub Pages (wird bei jedem Push automatisch veröffentlicht), Android-App (WebView, Vorlesen), Fortschritt lokal auf dem Handy | ✅ |

~~Noch offen (Mario): GitHub Pages einschalten~~ → ✅ erledigt, die Veröffentlichung läuft bei jedem Push erfolgreich.

---

## 2a. Phase 1 – Meilensteine Inhalts-Ausbau A2–B2 (Auftrag vom 04.11.2026: alles vervierfachen)

Ziel: ≈ 7.000 Wörter · ≈ 3.900 Übungssätze · **mindestens 100 Schreibaufgaben** als Zwischenziel – danach laufend weitere, weil Lernende immer neue Aufgaben brauchen (Mario, 04.11.2026) · ≈ 520 Prüfungsaufgaben (DTB + DTZ).
Jeder Inhalts-Meilenstein bringt ungefähr **+400 Wörter, +250 Sätze und +30 Prüfungsaufgaben** und wird nach Abschluss auf main gepusht.
(Plan am 04.11. nach M5 angepasst: Die Pakete sind kleiner als zuerst gedacht, dafür sind es mehr.)

| # | Meilenstein | Schwerpunkt | Status |
|---|---|---|---|
| M1 | Lernsteuerung | 30 neue Wörter/Tag, weniger Wiederholungen (Satz erst nach 40, Wort nach 20 anderen) | ✅ fertig |
| M2 | Grundkurs-Sätze | 40–90 Sätze pro Stufe, A2 zuerst | ✅ fertig |
| M3 | Schreibaufgaben | 18 → 72 (A2, B1, B2, DTZ und DTB); seit 04.11. Ziel 100, Rest in M13/M14 | ✅ fertig |
| M4 | Inhaltspaket 1 | Wörter 1.754 → 3.169 · Sätze 973 → 1.602 · Prüfung 130 → 240 | ✅ fertig |
| M5 | Inhaltspaket 2: Beruf | Pflege, Lager, Büro, Handel, Gastro, Bau, Kita · Wörter → 3.524 · Sätze → 1.800 · Prüfung → 261 | ✅ fertig |
| M6 | Inhaltspaket 3: Alltag | Küche, Einkaufen, Haushalt, Stadt, Familie, Kleidung, Natur · DTZ-Briefe, Lesen, Hören · Wörter → 3.829 · Sätze → 1.957 · Prüfung → 289 | ✅ fertig |
| M7 | Inhaltspaket 4 | B2-Wortschatz · Sprachbausteine | ✅ fertig (Wörter → 4.114, Sätze → 2.197, Prüfung → 317) |
| M8 | Inhaltspaket 5 | Gesundheit, Behörden · Hören | ✅ fertig (Wörter → 4.378, Sätze → 2.446, Prüfung → 347) |
| M9 | Inhaltspaket 6 | Gesellschaft, Medien, Umwelt · Vortrag und Diskussion | ✅ fertig (Wörter → 4.716, Sätze → 2.671, Prüfung → 377) |
| M10 | Inhaltspaket 7 | Wohnen, Familie, Freizeit · Lösung finden, Fragen, Forum | ✅ fertig (Wörter → 4.974, Sätze → 2.880, Prüfung → 407) |
| M11 | Inhaltspaket 8 | Grammatik-Drill zu allen 12 Themen · DTB-E-Mails und Telefonnotizen | ✅ fertig (Wörter → 5.148, Sätze → 3.094, Prüfung → 437) |
| M12 | Inhaltspaket 9 | Verben, Adjektive, Redemittel · gemischte Prüfungsaufgaben | ✅ fertig (Wörter → 5.457, Sätze → 3.285, Prüfung → 467) |
| M13 | Inhaltspaket 10 | Wortfamilien, Nomen-Verb-Verbindungen · Sprechen DTZ · +14 Schreibaufgaben | ✅ fertig (Wörter → 5.710, Sätze → 3.430, Schreiben → 86, Prüfung → 497) |
| M14 | Inhaltspaket 11 | Lücken füllen: A2-Sätze für den Grundkurs, Wortstellung, Beruf · +14 Schreibaufgaben (→ 100) · gemischte Prüfung | ✅ fertig (Sätze → 3.658, Schreiben → 100, Prüfung → 527 – Prüfungsziel erreicht) |
| M15 | Wörter-Paket A | Fachwortschatz Pflege, Lager, Technik, Büro, Handel, Kita, Gastro · Adverbien · Natur/Körper/Verkehr · 92 Sätze dazu | ✅ fertig (Wörter → 6.050, Sätze → 3.750) |
| M16 | Wörter-Paket B | Restlücke bis ≈ 7.000 geschlossen: +1.029 Wörter (häufige Nomen/Verben B1/B2 und alle Wörter, die in Sätzen und Prüfungstexten der App vorkamen, aber im Wörterbuch fehlten) · +155 Sätze für die schwächsten Themen (Relativsatz/zu-Infinitiv/indirekte Frage A2, Konnektoren B1, Fragen B2) · neue Funktion „Wort markieren → Erklärung + Übersetzung“ | ✅ fertig |
| M17 | Abschluss Phase 1 | Qualitätscheck bestanden: keine doppelten Wörter/Sätze/IDs, alle Felder gefüllt, 241 alte Sätze nachträglich mit Verb markiert (jetzt 3.900 von 3.905, Rest ohne Verb wie „Gute Besserung!“), Prüfungsaufgaben geprüft (Antworten, Lücken, DTB/DTZ-Zuordnung), Browser-Test aller Bereiche · dazu: Vorlesen mit Pause/Weiter/Stopp bei langen Texten, automatisches Vorlesen standardmäßig aus | ✅ fertig |

**Stand:** 17 von 17 Meilensteinen (Phase 1) fertig. Aktuell: 7.235 Wörter · 4.129 Sätze · 200 Schreibaufgaben · 1817 Prüfungsaufgaben.


**Phase 1 ist abgeschlossen (04.11.2026).** Danach am 08.11.2026: Ausbau aus Lehrbuch-Auswertung (Abschnitt 2c, L1–L5 fertig). Nächster Schritt nach Rücksprache mit Mario: M18 (Datenstruktur für mehrere Sprachen) oder zuerst die offenen ❓-Punkte aus Abschnitt 4 (z. B. Dialoge, Lesen DTB, Prüfungssimulation).

**Nach Phase 1:** Inhalte (vor allem Schreibaufgaben, Sätze, Prüfungsaufgaben) wachsen laufend weiter – die Zielzahlen sind Zwischenziele, keine Obergrenze.

**Warum 17 statt 15:** Gängige Wörter sind inzwischen fast alle vorhanden (oft 30–60 % Dubletten). M5–M11 haben je nur 170–340 statt 400 neue Wörter gebracht. Mario hat am 04.11.2026 zugestimmt, mehr Meilensteine einzuplanen.

## 2c. Ausbau aus Lehrbuch-Auswertung (Auftrag vom 08.11.2026)

Mario hat 9 PDFs geschickt (DTB-Lesetraining, telc B2, „Mit Erfolg zu telc B2“, DTB C1 Prüfung Express, „Sicher! B2.1“, „Linie 1 Beruf B2“, Brief-Handout mit Bausteinen, Lösungsschlüssel mit russischen Notizen). **Sie dienen nur als Vorlage für Format, Themen und Schwierigkeit – alle Texte und Aufgaben in der App sind selbst geschrieben** (Abschnitt 8).

| # | Meilenstein | Inhalt | Status |
|---|---|---|---|
| L1 | **Lesen DTB Teil 1–4** | 26 eigene Leseaufgaben im echten DTB-Format (inzwischen 42, siehe L5): Teil 1 Personen ↔ Artikel a–h (6), Teil 2 Willkommensmappe/Anweisungen mit richtig/falsch + a/b/c (8), Teil 3 Forum mit X (6), Teil 4 Protokoll/Bericht (6). Nach jeder Antwort erscheint die Erklärung mit der Schlüsselstelle aus dem Text (Idee aus dem Lösungsschlüssel). Kleine Code-Änderung: Lesen jetzt auch im DTB-Modus, richtig/falsch wird nicht mehr gemischt, russische Anweisung je Aufgabe. | ✅ fertig |
| L2 | **Brief-Baukasten (Satzbau)** | 100 Sätze nach den Bausteinen Anfrage, Beschwerde, Bewerbung: Satz nicht mit „ich“ beginnen, Nebensatz vorn, indirekte Fragen, Konjunktiv II, dass-Sätze, weder/noch, Passiv, Präteritum, Genitiv-Präpositionen, Reihenfolge wann–warum–wie–wo. Viele Sätze mit erlaubten Umstellungen. | ✅ fertig |
| L3 | **Schreiben nach Baukasten** | 12 Schreibaufgaben (4 Anfragen, 4 Beschwerden, 4 Bewerbungen) mit eigenen Anzeigen, Redemitteln und Musterlösungen | ✅ fertig |
| L4 | **B2-Grammatik Beruf + Wörter** | 77 Sätze für Lücken aus dem Abgleich mit dem Berufssprachkurs B2 (Konjunktiv II Vergangenheit, indem, ohne zu/ohne dass, sodass/folglich, zum + Nomen, Passiv Perfekt/Zustandspassiv, Stellung von „nicht“, je … desto) · 96 neue Wörter (Brief, Umzug, Handwerk, Tourismus, Arbeitsrecht, IT) | ✅ fertig |
| L5 | **Weitere Lesesets + Grammatik aus „Sicher! B2.1“** | 16 weitere DTB-Leseaufgaben (je 4 pro Teil: Gastronomie, neue Medien, internationale Fachkräfte, Handel, Hygiene, Großraumbüro, IT-Regeln, Betriebsausflug, Teilzeit/Familie, Arbeitsvertrag, Technik im Betrieb, Bau, Pflegedienst) · 47 Sätze (zweiteilige Konnektoren, Mittelfeld, kausale Präpositionen, verkürzte wenn-Sätze, darauf/darüber + dass/zu, Partizip als Adjektiv) · 60 neue Wörter · 6 Schreibaufgaben (Antwort auf Reklamation, Fehlermeldung an die IT, Verbesserungsvorschlag, Vorstellung im Team, Leserbrief, Fragen zum Arbeitsvertrag) | ✅ fertig |
| L6 | DTB C1 | Prüfung-Express-C1 ausgewertet (Format bekannt) → gehört zu Phase 3 (M26) | ⬜ später |
| L7 | **Endungen, Prüferfragen, Lesen Teil 2** (08.11.2026) | Neuer Übungstyp **Endungen** unter Satzbau (auch „meine Schwächen“ und 2× im Tagesmix): Lücken wie „mit d… neu… Kollegen“, Auswahl aus 4 Formen, sofortige Korrektur, Regel + Russisch. 239 Sätze in 8 Bereichen (Akkusativ, Dativ, Genitiv nach Präpositionen, Wechselpräpositionen wo?/wohin?, Kasus nach Verben, Adjektiv nach der/die/das, nach ein/kein/mein, ohne Artikel). Fehleranalyse und „Auswertung teilen“ zeigen die schwächsten Endungs-Bereiche. Quelle: `quellen/endungen-*.txt`. · **Prüferfragen DTB** 10 → 30 (zu allen Vortragsthemen) · **Lesen Teil 2** 12 → 20 | ✅ fertig |
| L8 | **Mehr Aufgaben für die Simulation** (08.11.2026) | Ziel: jeder Teil reicht für ca. 20 Simulationen ohne Wiederholung. DTB Lesen Teil 1/3/4 je 10 → 20, Teil 2 20 → 40 · DTZ Lesen 30 → 79 · Hören DTB 53 → 80, DTZ 54 → 80 · Lösung finden (DTB) 15 → 21 · Sich vorstellen (DTZ) 15 → 21. Erzeugt mit kleinen Skripten (Inhalte in Python-Listen → JSON in `quellen/pruefung/`). | ✅ fertig |

**Fehler behoben (08.11.2026):** Seit dem Update „Aufgabenliste zum freien Auswählen“ hing im **Prüfungsmodus** jede Prüfungsaufgabe nach der ersten Antwort (die Protokoll-Funktion rief sich selbst endlos auf). Im Lernmodus trat der Fehler nicht auf. Ist behoben und im Browser getestet.

## 2d. Inhalte für mindestens ein Jahr (Wunsch Mario, 09.11.2026)

**Ziel:** Ein Deutschkurs dauert viele Monate, und die App wird später von vielen Lernenden genutzt. Deshalb soll es **mindestens ein Jahr** lang nicht langweilig werden: wöchentlich eine komplette Simulation und tägliches Training, ohne dass sich Aufgaben spürbar wiederholen.

**Rechnung:** 52 Simulationen pro Jahr × Aufgaben pro Simulation = Zielmenge je Prüfungsteil. Stand nach L8: es fehlten **ca. 900 Prüfungsaufgaben**; nach J1–J6 sind **alle Prüfungsteile** von DTB und DTZ für 52 Simulationen (ein Jahr, wöchentlich) ohne Wiederholung gefüllt. J7 (Trainingsinhalte) ist ebenfalls fertig – der Ein-Jahres-Plan ist komplett umgesetzt. Weitere Inhalte kommen laufend dazu; als Nächstes steht der Umbau der App an (Abschnitt 2e).

**Schon eingebaut (09.11.2026):** Aufgaben, die länger als **6 Monate** nicht geübt wurden, gelten wieder als „neu“ (Training und Simulation). Ist ein Teil komplett geübt, nimmt die Simulation die am längsten nicht gesehenen Aufgaben. Damit gibt es nie einen „leeren“ Teil – die neuen Pakete sorgen dafür, dass Wiederholungen erst nach einem Jahr kommen.

| # | Paket | Inhalt (Ziel = 52 Simulationen) | neue Aufgaben | Status |
|---|---|---|---|---|
| J1 | DTB Lesen | Teil 1 → 52, Teil 2 → 104, Teil 3 → 52, Teil 4 → 52 (Teil 4 jetzt auch mit Berichten aus der Mitarbeiterzeitung, nicht nur Protokollen) | 160 | ✅ fertig (09.11.2026) |
| J2 | DTB Hören | 80 → 208 (Durchsagen, Mailbox, Gespräche am Arbeitsplatz, Besprechungen, Radiobeiträge) | 128 | ✅ fertig (09.11.2026) |
| J3 | DTZ Hören | 80 → 208 (Ansagen am Telefon, Anrufbeantworter, Durchsagen, Radio, Alltagsgespräche) | 128 | ✅ fertig (09.11.2026) |
| J4 | DTZ Lesen | 79 → 208 (40 Wegweiser, 40 Anzeigen mit X, 49 Briefe/Aushänge/Zeitungsmeldungen) | 129 | ✅ fertig (09.11.2026) |
| J5 | Schreiben | DTB Sprachbausteine → 104, Forum → 52, Telefonnotiz → 52 · DTZ Brief-Lückentext → 52, Briefe → 104 (Lücken-Optionen werden beim Erzeugen gemischt, damit die richtige Antwort nicht immer vorne steht) | 165 | ✅ fertig (09.11.2026) |
| J6 | Sprechen | Vortrag, Prüferfragen, Diskussion, Lösung finden (DTB) und Erzählen, Sich vorstellen, Gemeinsam planen (DTZ) je → 52 | 196 | ✅ fertig (09.11.2026) |
| J7 | Training | Dialoge 60 → 150, Endungen 239 → 501, Schreibaufgaben 118 → 200 (A2 25, B1 30, B2 27 neu) | 433 | ✅ fertig (09.11.2026) |

Reihenfolge: J1–J4 zuerst (Lesen/Hören werden in jeder Simulation am meisten verbraucht), dann J5–J7. Pro Arbeitssitzung etwa ein Paket. Nach jedem Paket: Build, Browser-Test, Push, Zahlen hier aktualisieren.

**Für viele Lernende (später):**
- Varianten aus Vorlagen (z. B. Durchsagen, Wegweiser, Telefonnotizen mit wechselnden Namen, Zeiten, Orten) – vervielfacht einfache Aufgabentypen.
- Mit dem Abo-Server (G4, Dialoge Stufe 3): neue Aufgaben auf Abruf durch KI, jeweils geprüft – damit wird der Vorrat praktisch unbegrenzt.
- Qualitätssicherung bleibt: alle Aufgaben selbst geschrieben, nichts aus Lehrbüchern kopiert (Abschnitt 8).

## 2b. Ausblick: Phase 2 und 3 (Wunsch von Mario, 04.11.2026)

Die App soll eine **reine Lernapp** werden: später auch C1/C2 und weitere Ausgangssprachen. Reihenfolge: erst Phase 1 abschließen, dann Phase 2, dann Phase 3. Vor jedem Umbau Mario fragen.

**Phase 2 – Mehrere Ausgangssprachen (M18–M25+)**

| # | Meilenstein | Inhalt | Status |
|---|---|---|---|
| M18 | Datenstruktur mehrsprachig | Übersetzungen nicht mehr nur im Feld `ru`, sondern pro Sprache (z. B. `ru`, `uk`, `en`, `ar`, `tr`). Alte Felder bleiben lesbar, localStorage-Schlüssel bleiben gleich. Neue Einstellung „Meine Sprache“. Die rund 23 festen Stellen mit Russisch in `web/app.js` umbauen. Die App fragt die Sprache schon heute über `SET.lang` ab (Standard `ru`); die Erklärtexte der Prüfungssimulation (`quellen/simulation.json`) sind bereits pro Sprache angelegt. | ⬜ |
| M19 | Ukrainisch | Alle Wörter, Sätze, Aufgabenstellungen und Regeln ins Ukrainische (≈ 7.000 Wörter + 3.900 Sätze + Aufgaben → in Teilpaketen). | ⬜ |
| M20 | Englisch | Brückensprache für viele Lernende | ⬜ |
| M21 | Arabisch | deckt auch Syrien, Irak usw. ab; Schrift von rechts nach links → Layout anpassen | ⬜ |
| M22 | Türkisch | | ⬜ |
| M23 | Dari (Afghanistan) | Persisch, ebenfalls rechts nach links; Paschtu optional später | ⬜ |
| M24 | Französisch | | ⬜ |
| M25+ | weitere Sprachen nach Bedarf | | ⬜ |

Hinweis: Jede neue Sprache bedeutet Übersetzungen für den gesamten Inhalt. Das ist pro Sprache etwa so viel Arbeit wie 3–4 Inhalts-Meilensteine. Reihenfolge laut Mario (04.11.2026): Ukrainisch, Englisch, Arabisch, Türkisch, Dari, Französisch, weitere. Ukrainisch lohnt sich, weil in Deutschland sehr viele Ukrainerinnen und Ukrainer Deutsch lernen und viele DTZ/DTB machen.

**Phase 3 – C1 und C2 (später)**

| # | Meilenstein | Inhalt | Status |
|---|---|---|---|
| M26 | Recherche C1/C2 | Prüfungsformate klären (z. B. Goethe-Zertifikat C1/C2, telc C1, DTB C1) – vor dem Bau mit Mario festlegen, welche Prüfung | ⬜ |
| M27–M30 | C1-Inhalte | Wortschatz (abstrakt, akademisch, Fachsprache), komplexe Grammatik (Nominalstil, Partizipialattribute, Konjunktiv I), Prüfungsaufgaben im neuen Format | ⬜ |
| M31–M33 | C2-Inhalte | Stilistik, Redewendungen, Textproduktion auf hohem Niveau | ⬜ |
| M34 | Niveauwahl | In den Einstellungen Niveau A2–C2 wählbar, Grundkurs und Prüfungsbereich passen sich an | ⬜ |

## 2e. Neue App: Konzept für weitere Sprachen und Merkliste (Mario, 09.11.2026)

Mario (09.11.2026): „Wir ändern die App ja sowieso als nächstes.“ Alles, was beim Umbau berücksichtigt werden muss, steht hier gesammelt. Bis dahin werden Probleme **nur in den Inhaltsdateien** gelöst, die App bleibt unverändert.

### Konzept: weitere Ausgangssprachen (Phase 2, M18 ff.)

**Ist-Zustand:** Russisch steckt an drei Stellen:
1. als Spalte in den Text-Quellen (`woerter-*.txt` Spalte 5, `saetze-*.txt` Spalte 2, `endungen-*.txt`, Kopf- und A-Zeilen in `dialoge/*.txt`),
2. als Feld `ru` in Prüfungs- und Schreibaufgaben (Aufgabenstellung, bei Prüferfragen pro Frage),
3. als rund 460 feste russische Textstellen in `web/app.js` (Menüs, Hinweise, Erklärungen). Nur die Simulation (`quellen/simulation.json`) ist schon pro Sprache angelegt (`{"de": …, "ru": …}`, `UL()` = `SET.lang || "ru"`).

**Ziel-Struktur:**
| Baustein | Lösung |
|---|---|
| Stabile IDs | Jedes Wort, jeder Satz, jede Endungs-Zeile und jede Dialogzeile bekommt eine feste ID (Wörter z. B. `w-` + Lemma + Artikel, Sätze `s-` + kurzer Hash des deutschen Satzes, einmal erzeugt und in der Quelle gespeichert). Ohne IDs lassen sich Übersetzungen nicht sauber zuordnen. |
| Deutsch-Kern | Die deutschen Inhalte bleiben **eine** Quelle (`quellen/`). Sie enthalten keine Übersetzungen mehr, nur Deutsch, Regeln (auf einfachem Deutsch), Niveau, Kategorie. |
| Sprachpakete | Pro Sprache ein Ordner `quellen/i18n/<code>/` (`ru`, `uk`, `en`, `ar`, `tr`, `fa-AF` für Dari, `fr`) mit Dateien `woerter.tsv`, `saetze.tsv`, `endungen.tsv`, `dialoge.tsv`, `aufgaben.json` – jeweils **ID → Übersetzung**. Russisch wird als erstes Paket aus den heutigen Spalten herausgezogen (Skript, kein Handarbeit). |
| Build | `build_content.py` erzeugt `web/content/*.json` (nur Deutsch) und `web/content/<code>/*.json` (nur Übersetzungen). Die App lädt den Kern + **nur das gewählte Sprachpaket** → kleinere Downloads (heute ist `pruefung.json` 2 MB inkl. Russisch). |
| Oberfläche | Alle festen Texte aus `app.js` in Wörterbücher `web/i18n/<code>.json`, Zugriff über `t("schlüssel")`. Deutsche Begriffe der Lernwelt (z. B. „Sprachbausteine“) bleiben Deutsch, die Hilfe-Texte kommen aus dem Wörterbuch. |
| Rückfall | Fehlt eine Übersetzung: zuerst Englisch, sonst nur Deutsch mit dezentem Hinweis „Übersetzung folgt“. Eine Sprache wird erst freigeschaltet, wenn mindestens 95 % übersetzt sind. |
| Rechts-nach-links | Arabisch und Dari: Übersetzungsboxen bekommen `dir="rtl"` und `lang`, der deutsche Text bleibt links-nach-rechts. Schrift: Noto Sans Arabic (offline mitliefern). Layout an allen Stellen mit gemischtem Text testen. |
| Vorlesen | `say()` bleibt Deutsch. Optional Übersetzung vorlesen, wenn das Gerät die Stimme hat (uk, ar, tr meist ja; Dari oft nicht → Button dann ausblenden). |
| Einstellung | Beim ersten Start „Meine Sprache“ wählen, später in den Einstellungen änderbar (`SET.lang`). localStorage-Schlüssel bleiben gleich, Fortschritt ist sprachunabhängig. Die „Auswertung teilen“ bleibt auf Deutsch (geht an Mario/Lehrkraft). |
| Übersetzungs-Ablauf | Aus dem **Deutschen** übersetzen (nicht aus dem Russischen, sonst entstehen Russizismen im Ukrainischen); Russisch dient nur zur Kontrolle. In Paketen von 300–500 Einträgen. Prüfskript: jede ID vorhanden, keine leeren Felder, richtige Schrift (Ukrainisch: і ї є ґ, keine ы э ъ), Längen-Plausibilität. Vor dem Verkauf je Sprache ein Muttersprachler-Review einer Stichprobe. |
| Umfang pro Sprache | ca. 7.200 Wörter + 4.100 Sätze + ~1.700 Prüfungsaufgaben (Aufgabenstellungen, Prüferfragen) + Endungen, Dialoge, Schreibaufgaben + ~460 Oberflächentexte ≈ **15.000 Einträge**, etwa 40–50 Arbeitspakete. |

**Reihenfolge (Mario, 04.11.2026):** Ukrainisch → Englisch → Arabisch → Türkisch → Dari → Französisch → weitere.

### Merkliste: was die neue App können muss

| # | Punkt | Woher | Status |
|---|---|---|---|
| A1 | **Antworten mischen auch bei kurzen Optionen** (heute nur Optionen > 6 Zeichen). Ausnahme mit Kennzeichen `"ord": true` für Aufgaben mit sinnvoller Reihenfolge (Wegweiser EG/1. OG …, Uhrzeiten). Bis dahin offline gelöst: Sprachbausteine-Optionen in allen Quellen fest gemischt (09.11.2026). | Mario, 09.11.2026 | ⬜ |
| A2 | Mehrsprachigkeit nach Konzept oben (IDs, Sprachpakete, `t()`, RTL) | 2b / 2e | ⬜ |
| A3 | Dialoge Stufe 2: Spracheingabe (SpeechRecognizer de-DE über AndroidBridge, Mikrofon-Berechtigung → neue APK) | 4a | ⬜ |
| A4 | Dialoge Stufe 3: freie Antworten mit KI-Bewertung über eigenen Server (Abo) | 4a, 9 | ⬜ |
| A5 | Hören mit zwei Stimmen (Mann/Frau) für Gespräche | 4 | ⬜ |
| A6 | Sich selbst aufnehmen und anhören (Sprechen) | 4 | ⬜ |
| A7 | Inhalte in Paketen laden statt 2 MB auf einmal; Service Worker cacht pro Sprache | 2e | ⬜ |
| A8 | Konten, Synchronisierung zwischen Geräten, Premium (Abo) | 9.1, 9.2 | ⬜ |
| A9 | Fortschritt ist heute an Aufgaben-IDs gebunden – beim Umbau IDs nie ändern, sonst geht Fortschritt verloren (`dl-prog`, `dl-stats`, `dl-set`, `dl-log`) | CLAUDE.md | Regel |
| A10 | Niveauwahl A2–C2 (Phase 3) gleich im neuen Datenmodell vorsehen (`lv`-Feld überall vorhanden) | 2b | ⬜ |
| A11 | Android-Hülle nur dann neu ausliefern, wenn Mikrofon/Aufnahme dazukommen – Nutzerin muss sonst nicht neu installieren | CLAUDE.md | Regel |

---

## 3. Die Prüfungen

### 3.1 Deutsch-Test für den Beruf B2 (DTB) – Hauptziel

| Teil | Inhalt | In der App |
|---|---|---|
| **Lesen** | 4 Teile: Artikel zuordnen, Mitteilungen/Anweisungen, Forum, Protokoll/Bericht | ✅ **Lesen im Beruf (Teil 1–4)** mit Erklärung nach jeder Antwort (L1) |
| **Lesen + Schreiben** | E-Mail lesen, Fragen beantworten, dann eine Antwort schreiben (z. B. auf eine Beschwerde, mit Lösungsvorschlag) | ✅ **E-Mail beantworten** (Fragen → Antwort mit Timer, Leitpunkte, Redemittel, Musterlösung) |
| **Hören** | 4 Teile: Telefonate, Besprechungen, Durchsagen, Gespräche | ✅ **Hören im Beruf** (max. 2× hören, a/b/c und richtig/falsch) |
| **Hören + Schreiben** | Telefonat hören und eine **Telefonnotiz** schreiben | ✅ **Telefonnotiz** (Anruf 2×, Felder werden automatisch geprüft) |
| **Sprachbausteine + Schreiben** | 2 Lückentexte mit je 6 Lücken, dazu ein **Forumsbeitrag** | ✅ **Sprachbausteine** mit Erklärung je Lücke, **Forumsbeitrag** (mind. 120 Wörter) |
| **Sprechen** | 1A Vortrag · 1B Fragen der Prüfer · 2 Diskussion · 3 gemeinsam eine Lösung finden | ✅ **Dialoge führen** (60 Szenen, Antwort bauen/wählen/tippen) · **Vortrag** (3-Min.-Timer), **Prüferfragen**, **Diskussion** und **Lösung finden** (die App spielt den Partner) |

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

## 4. Was fehlt noch (geprüft am 04.11.2026)

| Bereich | Fehlt | Priorität | Status |
|---|---|---|---|
| Lesen DTB | eigene Leseteile Teil 1–4 | 1 | ✅ L1 + L5 (42 Aufgaben), laufend mehr |
| Hören | Dialoge mit zwei Stimmen (braucht kleine APK-Änderung), Meinungen zuordnen | 2 | ⬜ |
| Simulation | komplette Prüfung mit Zeitlimit und Punkteschätzung | 1 | ✅ fertig (08.11.2026, siehe 4b) |
| Sprechen | sich selbst aufnehmen und anhören (braucht Mikrofon-Berechtigung, neue APK) | 3 | ⬜ |
| **Dialoge führen** | Gespräche üben, in denen die Lernerin selbst antwortet | 1 | ✅ Stufe 1 fertig (60 Szenen, 08.11.2026) · Stufe 2 und 3 später (Abschnitt 4a) |
| Grammatik | Drill zu Kasus nach Präpositionen und Adjektivendungen | 2 | ✅ eigener Übungstyp „Endungen“ (08.11.2026, 239 Sätze), siehe L7 |
| Wortschatz | Fachwortschatz je Branche (Pflege, Lager, Büro, Handel, Gastro, Handwerk) | 2 | ✅ M5, M11 (weiterer Ausbau in M15) |

Neue Aufgabentypen werden erst nach Rücksprache mit Mario gebaut (siehe `CLAUDE.md`).

### 4a. Dialoge führen (Stufe 1 gebaut am 08.11.2026, Stufe 2 und 3 für später – Entscheidung Mario)

| Stufe | Was | Technik | Aufwand | Kosten | Status |
|---|---|---|---|---|---|
| 1 | **Geführte Dialoge** ✅: 60 Szenen (30 Beruf/DTB, 30 Alltag/DTZ, Alltag auch im DTB-Modus), je 5–8 Wechsel. Der Partner spricht, die Lernerin antwortet auf eine von drei Arten: 🧩 **Satz bauen** (Standard, trainiert die Wortstellung), ☑ **Auswählen** (richtige Antwort vs. falsche Verbstellung vs. unpassend), ⌨ **Frei tippen** (prüft wichtige Wörter und Stellung des Verbs, danach Selbsteinschätzung). Am Ende das ganze Gespräch zum Anhören und laut Lesen. Inhalte als einfache Textdateien in `quellen/dialoge/*.txt` (Format siehe README) – laufend erweiterbar. | nur Web-App | – | keine | ✅ fertig |
| 2 | **Antwort sprechen statt tippen** (⬜ später, Mario 08.11.2026): eigener 🎤-Knopf in der App. Grund: In der Android-WebView ist die Spracherkennung des Browsers gesperrt → APK-Änderung nötig: Mikrofon-Berechtigung (RECORD_AUDIO) + Android-`SpeechRecognizer` (Sprache fest `de-DE`) über die vorhandene `AndroidBridge`, Ergebnis per Callback an die Web-App. Einsatz: Dialoge („Frei sprechen“ als 4. Antwortart, Prüfung wie bei „Frei tippen“: wichtige Wörter + Verbstellung), Schreib-/Textfelder, **Sprechaufgaben** (Vortrag, Prüferfragen, Diskussion, Lösung finden, DTZ Sprechen) mit Mitschrift zum Vergleich mit der Musterlösung; optional eigene Antwort aufnehmen und anhören. Im Browser (Chrome) über die Web-Speech-API ohne APK. Fortschritt bleibt beim Neuinstallieren erhalten (liegt in der Web-App). **Bis dahin (Übergangslösung, ohne App-Änderung):** Mikrofon der Handy-Tastatur (Gboard 🎤) in jedem Textfeld nutzen – Spracheingabe auf Deutsch stellen. | Web-App + **APK-Update** (Lernerin muss einmal neu installieren) | klein–mittel | keine | ⬜ später |
| 3 | **Freies Gespräch mit KI-Partner** (⬜ später, Mario 08.11.2026): Die Lernerin unterhält sich frei, die KI bleibt in der Rolle (z. B. Vermieterin, Prüferin), korrigiert danach Fehler (Wortstellung zuerst) und bewertet wie in der Prüfung. | braucht einen kleinen **Server** (API-Schlüssel darf nicht in die öffentliche App), passt zu G4 (Konto/Server) | groß | laufend pro Gespräch (wenige Cent) | ⬜ später |

Reihenfolge: Stufe 1 ✅ → Stufe 2, sobald Stufe 1 im Alltag gut läuft → Stufe 3 zusammen mit dem Abo-Server (G4).

---

### 4b. Prüfungssimulation (gebaut am 08.11.2026)

Unter **Prüfung → Prüfungssimulation** für DTB B2 und DTZ. Ablauf und Zeiten wie in der echten Prüfung (Quellen: telc/BAMF DTB B2, Goethe/BAMF DTZ-Modellsatz):

| DTB B2 | Zeit | Aufgaben in der Simulation |
|---|---|---|
| Lesen | 45 Min. | je 1× Teil 1, 3, 4 und 2× Teil 2 |
| Lesen und Schreiben | 20 Min. | 1 E-Mail (Fragen + Antwort) |
| Hören | 20 Min. | 4 Hörtexte (max. 2× hören) |
| Hören und Schreiben | 5 Min. | 1 Telefonnotiz |
| Sprachbausteine und Schreiben | 35 Min. | 2 Lückentexte + 1 Forumsbeitrag |
| Sprechen | ca. 16 Min. | Vortrag, Prüferfragen, Diskussion, Lösung finden |

| DTZ | Zeit | Aufgaben in der Simulation |
|---|---|---|
| Hören | 25 Min. | 4 Hörtexte |
| Lesen | 45 Min. | 4 Leseaufgaben + 1 Brief-Lückentext |
| Schreiben | 30 Min. | Wahl zwischen 2 Briefen |
| Sprechen | ca. 10 Min. | sich vorstellen, erzählen, gemeinsam planen |

- **Zu Beginn** erklärt die App, wie die Prüfung abläuft – auf Deutsch und zusätzlich in der Sprache der Lernerin (jetzt Russisch). Die Texte stehen in `quellen/simulation.json` mit einem Feld pro Sprache (`de`, `ru`, später `uk`, `en`, `ar`, `tr`, `fa`, `fr` …) → bei M18 ff. nur dort ergänzen, kein App-Update nötig.
- **Während der Simulation:** nur Deutsch, kein Lernmodus, Zeitbalken pro Teil, bei Zeitablauf weiter zum nächsten Teil (offene Aufgaben = 0 Punkte). Unterbrechen und Fortsetzen möglich, die Zeit läuft nur bei offener Aufgabe. Es werden bevorzugt noch nicht geübte Aufgaben gewählt. Einzelne Teile können auch allein geübt werden.
- **Auswertung:** Lesen/Hören genau gezählt; Schreiben aus Checkliste, Wortzahl und (DTB) Sprachbausteinen geschätzt; Sprechen aus der Selbsteinschätzung („teilweise“ reicht absichtlich nicht für 36 Punkte bzw. B1). Danach Bestehensregel DTB bzw. neue DTZ-Regel, schwache Aufgaben, „Ergebnis teilen“ (WhatsApp an Mario) und Übernahme in den Punkte-Rechner. Die letzten Ergebnisse werden gespeichert.
- **Statistik (Wunsch Mario, 08.11.2026):** Jede Simulation wird gespeichert – fertige mit Punkten und „bestanden?“, **abgebrochene** mit dem Teil, in dem abgebrochen wurde, der Zahl der bearbeiteten Aufgaben und den Punkten bis dahin, laufende als „läuft gerade“. Zu sehen unter Statistik → Prüfungssimulationen und auf der Startseite der Simulation; der WhatsApp-Bericht enthält die Simulationen der letzten 30 Tage.
- **Reichweite (Stand 08.11.2026, nach L8):** DTB: Lesen je Teil 20, Hören 20, Lösung finden 21, Vortrag 21, alle anderen Teile 26–55 Simulationen ohne Wiederholung · DTZ: Hören 20, Lesen 19, Briefe 19, Sich vorstellen 21, Rest 23–33. Danach wiederholen sich Aufgaben (zufällig). Bei Bedarf weitere Aufgaben für die knappsten Teile ergänzen.
- **Später:** Schreiben und Sprechen durch KI bewerten lassen (zusammen mit Dialoge Stufe 3, braucht Server).

## 5. Lernplan

Alle Bausteine dieses Plans sind in der App vorhanden ✅. Ob er eingehalten wird, zeigt die Statistik (Serie und Pausentage).

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

Status: ✅ eingebaut (Protokoll `dl-log`, Fehleranalyse, „Auswertung teilen“). Noch ist keine Auswertung von Mario angekommen.

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

- **Keine Aufgaben aus offiziellen Modelltests oder Lehrbüchern kopieren.** Alle Aufgaben in der App sind selbst geschrieben, im gleichen Format. Lehrbücher (Hueber, Klett, telc u. a.) dienen nur als Vorlage für Aufbau, Themen und Niveau – wichtig, weil die App später verkauft werden soll.
- Offizielle kostenlose Modelltests dürfen verlinkt und zusätzlich auf Papier geübt werden.
- Prüfungsnamen nur zur Beschreibung, nicht als Marke.
- Das Repo ist öffentlich → **keine echten Namen, keine Ergebnisse, keine persönlichen Daten** in Inhalten. Beispielname: Olga Iwanowa.

---

## 9. Monetarisierung (Plan vom 04.11.2026)

**Idee:** Monatsabo für **4,99 €** für Zuwanderer, die sich auf DTZ oder DTB vorbereiten. Die erste Zielgruppe sind russischsprachige Lernende, weil die App dafür schon gebaut ist.
**Grundsatz:** Die Inhalts-Meilensteine M7–M17 haben Vorrang. Verkauft wird erst, wenn die App bei mehreren fremden Lernenden funktioniert.

### 9.1 Was sich technisch ändern muss

| Heute | Problem für ein Abo | Lösung |
|---|---|---|
| Inhalte liegen öffentlich (Repo und GitHub Pages) | Jeder kann alles kostenlos abrufen, ein Abo wäre wertlos | Bezahlinhalte in ein **privates Repo** und auf einen Server, der sie nur nach Anmeldung ausliefert |
| Fortschritt nur im localStorage | Neues Handy oder Daten gelöscht heißt Fortschritt weg. Für zahlende Kunden ist das nicht akzeptabel | **Konto und Online-Speicher**, z. B. Supabase oder Firebase; localStorage bleibt als Offline-Zwischenspeicher |
| Android-App ist nur eine WebView-Hülle | Google Play lehnt reine Website-Hüllen oft ab. Digitale Abos in der App müssen über **Google Play Billing** laufen | App bekommt eigene Funktionen (offline lernen, Vorlesen, Sprechen aufnehmen) und Play Billing |
| Oberfläche auf Deutsch | Neue Nutzer verstehen die Bedienung nicht sofort | Menüs und Hilfe zusätzlich auf Russisch, später weitere Sprachen (Phase 2, M18) |

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
| G1 | Inhalte fertig | M7–M17 abschließen | alle Zielzahlen erreicht, Qualitätscheck bestanden | ✅ fertig (17 von 17, 04.11.2026) |
| G2 | Testgruppe | 10–20 fremde Lernende nutzen die Web-App **kostenlos** 4 Wochen lang. Kurzer Fragebogen: Was fehlt? Würdest du 4,99 € zahlen? | mind. die Hälfte lernt nach 4 Wochen noch ≥ 3 Tage pro Woche, mind. 5 würden zahlen | ⬜ offen |
| G3 | Rechtliches | Gewerbe anmelden, steuerliche Einordnung klären (Kleinunternehmer?), Impressum, Datenschutzerklärung (DSGVO), AGB mit Widerrufsbelehrung, Google-Play-Entwicklerkonto mit Zahlungsprofil, App-Name auf Markenrechte prüfen | alles erledigt, bevor der erste Euro fließt | ⬜ offen |
| G4 | Technik | Anmeldung und Online-Speicher, Bezahlinhalte privat, Gratis/Premium-Grenze, Play Billing, russische Oberfläche, Datenübernahme aus localStorage | geschlossener Test mit der Testgruppe im Play Store | ⬜ offen |
| G5 | Start | Play-Store-Eintrag auf Deutsch und Russisch, Werbung in Telegram- und Facebook-Gruppen für Zuwanderer, Lehrkräfte von Integrations- und Berufssprachkursen ansprechen | erste 50 zahlende Abos | ⬜ offen |
| G6 | Ausbau | weitere Hilfssprachen (siehe Phase 2, Abschnitt 2b), Jahresabo, Sprechen mit Aufnahme | Wachstum je nach Zahlen aus G5 | ⬜ offen |

### 9.5 Offene Entscheidungen (Mario)

- ❓ Preis: nur Monatsabo 4,99 € oder zusätzlich ein günstigeres Jahresabo?
- ❓ Name der App für den Play Store
- ❓ Online-Speicher: Supabase oder Firebase (Claude macht vor G4 einen Vorschlag)
- ❓ Wann startet G2? Vorschlag war: sobald M10 fertig ist → **M10 ist fertig**, die Entscheidung liegt bei Mario

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
