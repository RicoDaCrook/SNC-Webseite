# 🔧 KOMPLETTE FIX ANLEITUNG

## Problem
- Header ist auf anderen Seiten verschoben
- Animation ist zu langsam
- Alter Text "Heute noch 3 Termine verfügbar" wird angezeigt
- Hydration Errors

## LÖSUNG - STEP BY STEP

### 1. DEV SERVER STOPPEN
```bash
# Im Terminal:
Strg + C
```

### 2. CACHE KOMPLETT LÖSCHEN
```bash
rm -rf .next
rm -rf node_modules/.cache
```

### 3. BROWSER CACHE LÖSCHEN
- Chrome DevTools öffnen (F12)
- Rechtsklick auf Reload-Button
- "Cache leeren und hart neu laden"

### 4. DEV SERVER NEU STARTEN
```bash
npm run dev
```

### 5. BROWSER HARD REFRESH
```
Strg + Shift + R
(oder Cmd + Shift + R auf Mac)
```

## WENN DAS NICHT FUNKTIONIERT:

### Manuelle Fixes:

#### A) src/app/globals.css (Zeile ~65 einfügen)
```css
/* Navigation Alignment Fix */
nav a,
nav button:not(.touch-target) {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
```

#### B) src/app/page.tsx - Animation Speed (Zeile ~56)
**Ändern von:**
```tsx
}, 50 + delay)
```
**Zu:**
```tsx
}, 40 + delay)
```

#### C) src/app/page.tsx - KFZ-Gutachten Delay (Zeile ~276)
**Ändern von:**
```tsx
<TypingText text="KFZ-Gutachten" delay={600} />
```
**Zu:**
```tsx
<TypingText text="KFZ-Gutachten" delay={100} />
```

#### D) src/app/page.tsx - UrgencyText verwenden (Zeile ~423)
**Suche nach:**
```tsx
<span>Heute noch 3 Termine verfügbar</span>
```
**Ersetzen durch:**
```tsx
<UrgencyText />
```

#### E) src/app/rechner/page.tsx (Zeile ~197-204)
**Alle Links brauchen py-2:**
```tsx
<Link href="/" className="... py-2">Home</Link>
<Link href="/ueber-snc" className="... py-2">Über SNC</Link>
<Link href="/faq" className="... py-2">FAQ</Link>
```

#### F) src/app/faq/page.tsx (Zeile ~116-123)
**Alle Links brauchen py-2:**
```tsx
<Link href="/" className="... py-2">Home</Link>
<Link href="/rechner" className="... py-2">Rechner</Link>
<Link href="/ueber-snc" className="... py-2">Über SNC</Link>
```

#### G) src/app/ueber-snc/page.tsx (Zeile ~48-56)
**Alle Links brauchen py-2:**
```tsx
<Link href="/" className="... py-2">Home</Link>
<Link href="/rechner" className="... py-2">Rechner</Link>
<Link href="/faq" className="... py-2">FAQ</Link>
```

## NACH DEN FIXES:

1. Dev Server stoppen (Strg + C)
2. `rm -rf .next` ausführen
3. `npm run dev` starten
4. Browser: Strg + Shift + R

## ERFOLG PRÜFEN:

✅ Navigation auf allen Seiten aligned
✅ Animation schneller (< 1 Sekunde für "KFZ-Gutachten")
✅ Text wechselt um 19:00 Uhr
✅ Keine Hydration Errors

## ZEITBASIERTE ANZEIGE:

- **00:00 - 18:59 Uhr:** "Schnelle Terminvergabe – Noch heute möglich"
- **19:00 - 23:59 Uhr:** "Morgen garantierten Termin sichern"

---

**Wenn alles nicht funktioniert, melde dich und ich mache die Änderungen komplett neu!**
