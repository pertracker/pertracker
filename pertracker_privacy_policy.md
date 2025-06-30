# Datenschutzerklärung - PerTracker

**Stand:** 30. Juni 2025

## 1. Verantwortlicher
**Kontakt:** github@pertracker.xyz

## 2. Überblick
PerTracker ist eine Progressive Web App (PWA) zur Verfolgung des Menstruationszyklus, entwickelt mit Vue.js. Die App funktioniert vollständig offline und speichert alle Daten ausschließlich lokal auf Ihrem Gerät.

## 3. Datenverarbeitung

### 3.1 Lokale Datenspeicherung (localStorage)
**Alle Zyklusdaten werden ausschließlich in Ihrem Browser gespeichert:**
- **Speicherort:** Browser LocalStorage (`peridoTrackerData`)
- **Keine Server-Übertragung:** Daten verlassen nie Ihr Gerät
- **Datenkontrolle:** 100% bei Ihnen

### 3.2 Gespeicherte Datentypen
```js
{
  startDate: "YYYY-MM-DD",
  endDate: "YYYY-MM-DD" | "",
  flow: "Light" | "Medium" | "Heavy", 
  symptoms: ["Cramps", "Headache", ...],
  notes: "Freitext-Notizen"
}
```

**Zusätzliche Metadaten:**
- App-Version bei Export
- Export-Datum bei Backup-Dateien

### 3.3 Verfügbare Symptom-Kategorien
- Cramps, Headache, Bloating, Fatigue
- Mood Swings, Acne, Back Pain, Breast Tenderness

## 4. Technische Implementierung

### 4.1 Progressive Web App Features
- **Service Worker:** Für Offline-Funktionalität
- **Manifest:** Für App-Installation
- **Responsive Design:** Für alle Geräte optimiert

### 4.2 Externe Ressourcen
**Einzige externe Verbindungen:**
- `cdnjs.cloudflare.com` - Vue.js Framework (einmalig beim Laden)
- `fonts.googleapis.com` - Material Icons (einmalig beim Laden)

**Keine Verbindungen zu:**
- Analytics-Diensten
- Tracking-Systemen
- Werbepartnern
- Social Media

### 4.3 Code-Implementierung
```js
// Datenspeicherung - nur lokal
localStorage.setItem("peridoTrackerData", JSON.stringify(records))

// Daten laden - nur aus lokalem Speicher
const data = localStorage.getItem("peridoTrackerData")
```

## 5. Funktionalitäten

### 5.1 Statistik-Berechnung
Alle Berechnungen erfolgen clientseitig:
- Durchschnittliche Zykluslänge
- Durchschnittliche Periodendauer  
- Vorhersage nächster Periode

### 5.2 Export/Import (.pertrack Dateien)
- **Export:** JSON-Format mit allen Ihren Daten
- **Import:** Lokale .pertrack Dateien
- **Dateiformat:** `{records: [...], appVersion: "1.0.0", exportDate: "..."}`

## 6. PWA Installation & Service Worker

### 6.1 Installation
- Offline-fähige Installation als App
- Erkennung: `window.navigator.standalone` oder `display-mode: standalone`
- Installationsaufforderung über `beforeinstallprompt` Event

### 6.2 Service Worker (`sw.js`)
- Caching für Offline-Nutzung
- Keine Datenübertragung
- Nur App-Dateien im Cache

## 7. Datenschutz-Garantien

### 7.1 Zero Server Architecture
**Technische Gewährleistung:**
- Keine Backend-Server für Nutzerdaten
- Keine API-Endpoints für Datenübertragung
- Keine Cloud-Synchronisation

### 7.2 Client-Side Only Processing
```js
// Beispiel: Alle Berechnungen lokal
function calculateStats() {
  const cycles = records.map(/* lokale Berechnung */);
  return localStatistics;
}
```

### 7.3 Browser-Sicherheit
- Same-Origin-Policy Schutz
- LocalStorage isoliert pro Domain
- Keine Cross-Domain Requests

## 8. Ihre Rechte & Kontrolle

### 8.1 Vollständige Datenkontrolle
- **Einsicht:** Alle Daten in Browser-DevTools einsehbar
- **Export:** Jederzeit als .pertrack Datei
- **Löschung:** Browser-Daten löschen = vollständige Entfernung
- **Portabilität:** .pertrack Format für andere Apps

### 8.2 Keine DSGVO-Verarbeitung beim Betreiber
Da keine Daten an uns übertragen werden, können wir keine personenbezogenen Daten verarbeiten, korrigieren oder löschen.

## 9. Browser-Speicher Details

### 9.1 Verwendete Browser-APIs
```js
// LocalStorage (persistent)
localStorage.setItem("peridoTrackerData", data)

// ServiceWorker (für Caching)
navigator.serviceWorker.register('./sw.js')

// File API (für Import/Export)
const fileReader = new FileReader()
```

### 9.2 Speicher-Limits
- LocalStorage: ~5-10MB (browserspezifisch)
- Typische PerTracker Daten: <1MB für Jahre der Nutzung

## 10. Sicherheitsempfehlungen

### 10.1 Gerätesicherheit
- Bildschirmsperre aktivieren
- Browser-Updates installieren
- Regelmäßige .pertrack Backups erstellen

### 10.2 Daten-Backup
```js
// Automatischer Export-Dateiname
`pertrack-export-${new Date().toISOString().slice(0,10)}.pertrack`
```

## 11. Technische Transparenz

### 11.1 Open Source Verifikation
- Sourcecode vollständig einsehbar
- Keine obfuszierten Scripts
- Client-Side Rendering mit Vue.js

### 11.2 Netzwerk-Monitoring
Sie können selbst überprüfen (Browser DevTools → Network):
- Keine POST/PUT Requests mit Daten
- Nur initiale Ressourcen-Downloads

## 12. Minderjährige
App geeignet ab 13 Jahren. Elterliche Begleitung empfohlen für jüngere Nutzer.

## 13. Kontakt
Bei technischen oder datenschutzrechtlichen Fragen:
**E-Mail:** github@pertracker.xyz

---

**Technische Bestätigung:** Diese Datenschutzerklärung basiert auf der Code-Analyse der PerTracker PWA. Die Zero-Server-Architektur gewährleistet maximalen Datenschutz für sensible Gesundheitsdaten.

**Letzte Code-Analyse:** Juni 2025 | **App-Version:** 1.0.0