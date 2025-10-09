# SNC Gutachter - Premium Website

Moderne Next.js 14 Website für KFZ-Gutachter mit Supabase Backend und automatischen E-Mail-Benachrichtigungen.

## 🎨 Features

- ✅ Premium Homepage mit Parallax & Animationen
- ✅ **Stats Counter** (hochzählende Zahlen!)
- ✅ **"Unser Prozess" Section** mit Arbeitsbild
- ✅ **Wertminderungs-Rechner** (Multi-Step, Confetti, Count-Up!)
- ✅ **FAQ-Seite** mit 15 SEO-optimierten Fragen
- ✅ Impressum & Datenschutz (DSGVO-konform)
- ✅ Admin-Dashboard für Fall-Verwaltung
- ✅ Status-Tracking für Kunden (ohne Login)
- ✅ Automatische E-Mail-Benachrichtigungen
- ✅ PDF-Upload und Download
- ✅ WhatsApp-Integration
- ✅ Mobile-First Design
- ✅ €0/Monat Kosten

## 📁 Ordnerstruktur

```
snc-website/
├── public/
│   └── images/
│       ├── snclogo.png
│       ├── sncportrait.png
│       └── sncgutachter.png
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx
│   │   ├── status/
│   │   │   └── [token]/
│   │   │       └── page.tsx
│   │   ├── rechner/
│   │   │   └── page.tsx (NEU!)
│   │   ├── faq/
│   │   │   └── page.tsx (NEU!)
│   │   ├── impressum/
│   │   │   └── page.tsx (NEU!)
│   │   ├── datenschutz/
│   │   │   └── page.tsx (NEU!)
│   │   ├── api/
│   │   │   ├── cases/
│   │   │   │   └── route.ts
│   │   │   └── email/
│   │   │       └── route.ts
│   │   ├── layout.tsx (UPDATED - mit Footer!)
│   │   ├── page.tsx (UPDATED - Premium Upgrade!)
│   │   └── globals.css
│   ├── components/
│   │   └── Footer.tsx (NEU!)
│   └── lib/
│       ├── supabase.ts
│       └── resend.ts
├── .env.example
├── .gitignore
├── next.config.js
├── package.json (UPDATED - react-confetti hinzugefügt)
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Installation

### 1. Projekt erstellen

```bash
mkdir snc-website
cd snc-website
npm init -y
```

### 2. Alle Dateien erstellen

Kopiere alle Artifacts (1-19) als einzelne Dateien in die richtige Ordnerstruktur.

### 3. Bilder platzieren

Kopiere deine 3 Bilder nach `public/images/`:
- snclogo.png
- sncportrait.png  
- sncgutachter.png

### 4. Environment Variables

Erstelle `.env.local` basierend auf `.env.example`:

```bash
cp .env.example .env.local
```

**WICHTIG:** Trage folgendes ein:
- `SUPABASE_SERVICE_ROLE_KEY` (aus Supabase Dashboard → Settings → API)
- `ADMIN_PASSWORD` (dein sicheres Admin-Passwort)

### 5. Dependencies installieren

```bash
npm install
```

### 6. Supabase Setup

1. Öffne Supabase Dashboard
2. Gehe zu SQL Editor
3. Kopiere & führe aus: `SUPABASE.sql` (Artifact 19)
4. Erstelle Storage Bucket: "gutachten-pdfs" (public)

### 7. Lokal testen

```bash
npm run dev
```

Öffne http://localhost:3000

### 8. GitHub & Vercel Deployment

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Dann in Vercel:
1. Import Repository
2. Environment Variables eintragen (alle aus `.env.local`)
3. Deploy!

### 9. Domain verbinden

In Vercel → Settings → Domains → Add Domain → snc-svb.de

DNS-Records bei deinem Provider setzen (Vercel zeigt dir welche).

### 10. Resend Domain verifizieren

Nach Deployment:
1. Resend Dashboard → Domains
2. Add Domain: snc-svb.de
3. DNS-Records setzen (SPF, DKIM)
4. Warten bis verifiziert (kann 1-24h dauern)

## 🔐 Admin-Zugang

URL: `https://snc-svb.de/admin`
Passwort: Das was du in `.env.local` gesetzt hast

## 💰 Kosten

- Vercel: €0/Monat
- Supabase: €0/Monat (500MB Storage, 2GB Database)
- Resend: €0/Monat (3.000 E-Mails/Monat)

**Total: €0/Monat** 🎉

## 📧 E-Mail Setup

Nach Deployment MUSS Resend Domain verifiziert werden, sonst:
- E-Mails kommen von "noreply@resend.dev" 
- Nicht von "kontakt@snc-svb.de"

Verifikation dauert 1-24h.

## ❓ Support

Bei Problemen:
1. Prüfe `.env.local` Variablen
2. Prüfe Supabase SQL wurde ausgeführt
3. Prüfe Storage Bucket "gutachten-pdfs" existiert
4. Prüfe Resend Domain verifiziert

## 🎯 Next Steps

1. ✅ Deployment abgeschlossen?
2. ✅ Domain verbunden?
3. ✅ Resend verifiziert?
4. ✅ Test-Fall im Admin anlegen
5. ✅ E-Mail erhalten?
6. ✅ Status-Link funktioniert?
7. ✅ PDF hochladen & downloaden?

**Dann bist du FERTIG!** 🎉

## 📝 License

© 2025 SNC Gutachter - Alle Rechte vorbehalten
