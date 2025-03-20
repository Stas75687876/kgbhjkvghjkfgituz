# Umstellung auf Server-Rendering für API-Unterstützung

## Problem identifiziert:
Der Build ist fehlgeschlagen mit der Meldung:
```
Error: Page "/api/products/[id]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.
```

## Ursache des Problems:
- Statische Exporte (`output: 'export'`) können keine dynamischen API-Routen verarbeiten
- Deine App verwendet API-Routen wie `/api/products/[id]`
- Diese API-Routen sind für die Funktionalität der Website essentiell (Produkte anzeigen, Warenkorb, Login, etc.)

## Vorgenommene Änderungen:

### 1. next.config.js aktualisiert:
- `output: 'export'` wurde entfernt bzw. deaktiviert
- `unoptimized: true` bei den Images wurde entfernt (nur für statische Exports nötig)
- `trailingSlash: true` wurde entfernt, da nicht mehr notwendig

### 2. render.yaml geändert:
- Konfiguration von `env: static` zu `env: node` geändert
- `staticPublishPath` entfernt
- `startCommand: npm start` hinzugefügt
- `buildCommand` um `npx prisma generate` erweitert

## Deployment-Schritte:

1. **Pushe die Änderungen auf GitHub:**
   ```
   git add next.config.js render.yaml
   git commit -m "Fix: Umstellung auf Server-Rendering für API-Unterstützung"
   git push origin master
   ```

2. **Konfiguriere das Projekt auf Render.com neu:**
   - Gehe zu deinem Render-Dashboard
   - Wähle dein Projekt
   - Stelle sicher, dass es als "Web Service" (nicht "Static Site") konfiguriert ist
   - Die Build-Einstellungen sollten automatisch aus der render.yaml übernommen werden
   - Klicke auf "Clear Build Cache and Deploy"

3. **Überprüfe die Logs und Umgebungsvariablen:**
   - Achte auf erfolgreiche Ausführung des Prisma-Befehls im Build
   - Stelle sicher, dass alle Umgebungsvariablen korrekt gesetzt sind
   - Besonders wichtig: DATABASE_URL, JWT_SECRET, SKIP_TYPESCRIPT_CHECK

## Nach dem Deployment:
- Die Website sollte nun mit funktionierenden API-Routen und korrektem Styling erscheinen
- Benutze weiterhin die Browser-Konsole (F12), um nach Fehlern zu suchen, falls Probleme auftreten
- Der Login, Warenkorb und die Produktseiten sollten jetzt korrekt funktionieren 