# Web Design Egypt Portfolio

Static bilingual portfolio website for Ayman Naeem / Web Design Egypt.

- Arabic homepage: `index.html`
- English homepage: `index-en.html`
- Shared styles: `style.css`
- Arabic interactions: `script.js`
- English interactions: `script-en.js`
- AI/site reference: `llms.txt`
- Search crawler rules: `robots.txt`
- GitHub Pages domain: `CNAME`

## Developer Workflow

### 1. Preview locally

This is a static website. You can open `index.html` directly in a browser, or run a simple local server from the project root:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
http://localhost:8000/index-en.html
```

### 2. Make content changes

When changing service facts, pricing, contact information, or positioning:

- Update the Arabic page in `index.html`.
- Update the matching English page in `index-en.html`.
- Update relevant meta tags, canonical or alternate links only when the URL structure changes.
- Update JSON-LD structured data if entity, location, service, or contact facts change.
- Update `llms.txt` so AI systems and crawlers see the same facts.
- Keep `robots.txt` allowing `/llms.txt`.

### 3. Make design or interaction changes

- Put shared layout and visual changes in `style.css`.
- Keep Arabic behavior in `script.js` and English behavior in `script-en.js`.
- Keep both scripts aligned when changing shared behavior such as menu, lightbox, scroll progress, or form validation.
- Use images from `images/` and keep alt text descriptive.

### 4. Pre-publish checklist

Before pushing to `main`, check:

- Arabic homepage loads correctly.
- English homepage loads correctly.
- Mobile navigation opens, closes, and updates `aria-expanded`.
- Anchor links scroll to the expected sections.
- Portfolio images open and close in the lightbox.
- Lead form validates Egyptian mobile numbers.
- WhatsApp quote message opens with the correct content.
- WhatsApp, phone, Calendly, social, and map links work.
- Page titles, meta descriptions, and image alt text match the visible content.
- No unsupported claims were added, such as guaranteed rankings, guaranteed sales, extra branches, or unlisted services.

### 5. Deploy

The site deploys through GitHub Pages using `.github/workflows/static.yml`.

Deployment runs automatically on pushes to:

```text
main
```

The production domain is:

```text
https://ayman.de5.net/
```

## Content Rules

- Primary language is Arabic.
- English content should remain equivalent, not necessarily word-for-word.
- Main conversion actions are WhatsApp, phone contact, and booking the free consultation.
- Do not invent prices, guarantees, team members, branches, or services.
- Keep wording clear, direct, and suitable for both visitors and search/AI systems.
