# Masterplan – Deutsch lernen A2 · B1 · B2 (DTB und DTZ)

Stand: 04.11.2026 · Verantwortlich: Mario · Umsetzung: Claude

**Zuletzt komplett geprüft:** 04.11.2026 nach M17 (Code, Inhalte und Veröffentlichung abgeglichen).
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

## 2. Stand heute (geprüft am 04.11.2026 nach M17)

| Bereich | Stand | |
|---|---|---|
| Wortschatz | 7.079 Wörter (A2, B1, B2, Beruf, Alltag, Wortfamilien, Nomen-Verb-Verbindungen) | ✅ |
| Satzbau | 3.905 Übungssätze (3.900 mit markiertem Verb), alle 12 Grammatik-Themen auf A2–B2 | ✅ |
| Schreibaufgaben | 100 (A2, B1, B2, DTZ und DTB; laufend mehr) | ✅ |
| **Grundkurs von vorn** | 13 Stufen von „Verb auf Platz 2“ bis „Passiv“ plus Abschluss; Freischaltung ab 80 %; A2-Sätze zuerst | ✅ |
| **Prüfung DTB** | 55 E-Mails · 42 Telefonnotizen · 34 Forumsbeiträge · 52 Sprachbausteine · 21 Vorträge · 10 Fragerunden · 26 Diskussionen · 15 Lösung finden · 53 Hörtexte | ✅ |
| **Prüfung DTZ** | 38 Briefe · 30 Leseaufgaben · 33 Brief-Lückentexte · 26 Erzählthemen · 15 Fragerunden · 23 Gemeinsam planen · 54 Hörtexte | ✅ |
| Prüfungsrechner | Punkte eintragen → bestanden ja/nein nach DTB-Regel und neuer DTZ-Regel (ab 1.11.2026) | ✅ |
| Übungen | Karteikarten, Satz bauen, Wo steht das Verb?, Richtig oder falsch?, Diktat, Hörtraining, Bedeutung, der/die/das, Lückentext, Wortart, Schreiben mit Checkliste und Timer · Wort markieren (lange drücken) → Erklärung, Formen, Beispiel, Vorlesen, Übersetzung auf Tipp (offline) | ✅ |
| Tagesmix | 20 Aufgaben, jede zweite Satzbau-Aufgabe aus den schwächsten Grammatik-Themen | ✅ |
| Lernsteuerung | 30 neue Wörter pro Tag (einstellbar 20–80), Satz erst nach 40, Wort nach 20 anderen wieder | ✅ |
| Statistik | pro Tag Aufgaben, richtig, falsch, Minuten; Serie; Pausentage; Fehleranalyse nach 12 Grammatik-Themen; „Auswertung teilen“ | ✅ |
| Vorlesen | jedes Wort, jeder Satz, jede Aufgabe, jede Regel (`say()`); lange Texte mit Leiste ⏸ Pause / ▶ Weiter / ⏹ Stopp; automatisches Vorlesen bei neuer Aufgabe standardmäßig aus (in den Einstellungen einschaltbar) | ✅ |
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

**Stand:** 17 von 17 Meilensteinen (Phase 1) fertig. Aktuell: 7.079 Wörter · 3.905 Sätze · 100 Schreibaufgaben · 527 Prüfungsaufgaben.


**Phase 1 ist abgeschlossen (04.11.2026).** Nächster Schritt nach Rücksprache mit Mario: M18 (Datenstruktur für mehrere Sprachen) oder zuerst die offenen ❓-Punkte aus Abschnitt 4 (z. B. Dialoge, Lesen DTB, Prüfungssimulation).

**Nach Phase 1:** Inhalte (vor allem Schreibaufgaben, Sätze, Prüfungsaufgaben) wachsen laufend weiter – die Zielzahlen sind Zwischenziele, keine Obergrenze.

**Warum 17 statt 15:** Gängige Wörter sind inzwischen fast alle vorhanden (oft 30–60 % Dubletten). M5–M11 haben je nur 170–340 statt 400 neue Wörter gebracht. Mario hat am 04.11.2026 zugestimmt, mehr Meilensteine einzuplanen.

## 2b. Ausblick: Phase 2 und 3 (Wunsch von Mario, 04.11.2026)

Die App soll eine **reine Lernapp** werden: später auch C1/C2 und weitere Ausgangssprachen. Reihenfolge: erst Phase 1 abschließen, dann Phase 2, dann Phase 3. Vor jedem Umbau Mario fragen.

**Phase 2 – Mehrere Ausgangssprachen (M18–M25+)**

| # | Meilenstein | Inhalt | Status |
|---|---|---|---|
| M18 | Datenstruktur mehrsprachig | Übersetzungen nicht mehr nur im Feld `ru`, sondern pro Sprache (z. B. `ru`, `uk`, `en`, `ar`, `tr`). Alte Felder bleiben lesbar, localStorage-Schlüssel bleiben gleich. Neue Einstellung „Meine Sprache“. Die rund 23 festen Stellen mit Russisch in `web/app.js` umbauen. | ⬜ |
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

---

## 3. Die Prüfungen

### 3.1 Deutsch-Test für den Beruf B2 (DTB) – Hauptziel

| Teil | Inhalt | In der App |
|---|---|---|
| **Lesen** | 4 Teile: Texte aus dem Arbeitsalltag (Mitteilungen, Anweisungen, Berichte) | 🟡 Lesen über E-Mail-Fragen und Sprachbausteine; eigene DTB-Leseteile ⬜ (neuer Aufgabentyp, ❓ Mario) |
| **Lesen + Schreiben** | E-Mail lesen, Fragen beantworten, dann eine Antwort schreiben (z. B. auf eine Beschwerde, mit Lösungsvorschlag) | ✅ **E-Mail beantworten** (Fragen → Antwort mit Timer, Leitpunkte, Redemittel, Musterlösung) |
| **Hören** | 4 Teile: Telefonate, Besprechungen, Durchsagen, Gespräche | ✅ **Hören im Beruf** (max. 2× hören, a/b/c und richtig/falsch) |
| **Hören + Schreiben** | Telefonat hören und eine **Telefonnotiz** schreiben | ✅ **Telefonnotiz** (Anruf 2×, Felder werden automatisch geprüft) |
| **Sprachbausteine + Schreiben** | 2 Lückentexte mit je 6 Lücken, dazu ein **Forumsbeitrag** | ✅ **Sprachbausteine** mit Erklärung je Lücke, **Forumsbeitrag** (mind. 120 Wörter) |
| **Sprechen** | 1A Vortrag · 1B Fragen der Prüfer · 2 Diskussion · 3 gemeinsam eine Lösung finden | ✅ **Vortrag** (3-Min.-Timer), **Prüferfragen**, **Diskussion** und **Lösung finden** (die App spielt den Partner) |

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
| Lesen DTB | eigene Leseteile (Überschriften zuordnen, Anweisungen, Berichte mit a/b/c) – neuer Aufgabentyp | 1 | ⬜ ❓ Rücksprache nötig |
| Hören | Dialoge mit zwei Stimmen (braucht kleine APK-Änderung), Meinungen zuordnen | 2 | ⬜ |
| Simulation | komplette Prüfung mit Zeitlimit und Punkteschätzung | 1 | ⬜ ❓ Rücksprache nötig |
| Sprechen | sich selbst aufnehmen und anhören (braucht Mikrofon-Berechtigung, neue APK) | 3 | ⬜ |
| **Dialoge führen** | Gespräche üben, in denen die Lernerin selbst antwortet (Vorschlag in 3 Stufen, siehe Abschnitt 4a) | 1 | ⬜ ❓ Entscheidung Mario |
| Grammatik | Drill zu Kasus nach Präpositionen und Adjektivendungen | 2 | 🟡 viele Übungssätze dazu (M7, M11, M12), aber kein eigener Übungstyp |
| Wortschatz | Fachwortschatz je Branche (Pflege, Lager, Büro, Handel, Gastro, Handwerk) | 2 | ✅ M5, M11 (weiterer Ausbau in M15) |

Neue Aufgabentypen werden erst nach Rücksprache mit Mario gebaut (siehe `CLAUDE.md`).

### 4a. Vorschlag: Dialoge führen (04.11.2026, ❓ Entscheidung Mario)

| Stufe | Was | Technik | Aufwand | Kosten |
|---|---|---|---|---|
| 1 | **Geführte Dialoge**: Szenen mit 6–10 Wechseln (Arzt, Amt, Vermieter, Kollegin). Der Partner spricht (Vorlesen mit 2 Stimmen), die Lernerin **tippt oder spricht** ihre Antwort frei, die App prüft Schlüsselwörter und Verbposition und zeigt eine Musterantwort. Varianten je nach Antwort (verzweigt). | nur Web-App, neue Inhaltsdateien `quellen/dialoge/*.json` | mittel | keine |
| 2 | **Antwort sprechen statt tippen**: Spracherkennung (Mikrofon). Im Browser (Chrome) direkt möglich, in der Android-App nur mit kleinem App-Update (Mikrofon-Berechtigung + Android-Spracherkennung über die vorhandene Brücke). | Web-App + **APK-Update** | klein–mittel | keine |
| 3 | **Freies Gespräch mit KI-Partner**: Die Lernerin unterhält sich frei, die KI bleibt in der Rolle (z. B. Vermieterin), korrigiert danach Fehler und bewertet wie in der Prüfung. | braucht einen kleinen **Server** (API-Schlüssel darf nicht in die öffentliche App), passt zu Phase G4 (Konto/Server) | groß | laufend pro Gespräch (wenige Cent) |

Empfehlung: Stufe 1 zuerst (sofort für alle nutzbar, offline, kostenlos), dann Stufe 2, Stufe 3 zusammen mit dem Abo-Server.

---

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

- **Keine Aufgaben aus offiziellen Modelltests kopieren.** Alle Aufgaben in der App sind selbst geschrieben, im gleichen Format.
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
