# Bihar Cancer Care Organisation (BCCO) Website

Production-ready, high-performance static website for **Bihar Cancer Care Organisation (BCCO)**. Built with pure HTML5, vanilla CSS, and modern vanilla JavaScript, specifically engineered for zero-build-step deployment on GoDaddy cPanel shared hosting (Apache).

---

## Project Structure

```text
bcco-website/
├── index.html            # Main site entry point (pure static, relative paths)
├── 404.html              # Branded 404 error page matching site design
├── contact.php           # Secure PHP form handler (rate limiting, honeypot, mail())
├── .htaccess             # Apache configuration (HTTPS, caching, security headers, compression)
├── robots.txt            # Search engine crawler instructions
├── sitemap.xml           # XML sitemap for https://bcco.ngo/
├── site.webmanifest      # Progressive Web App manifest
├── favicon.ico           # Multi-resolution root favicon
├── apple-touch-icon.png  # Apple touch icon (180x180)
├── css/
│   ├── style.css         # Unminified readable source CSS
│   └── style.min.css     # Production minified CSS
├── js/
│   ├── main.js           # Unminified readable source JavaScript
│   └── main.min.js       # Production minified JavaScript
├── assets/
│   ├── images/
│   │   ├── logo.png      # Primary organization logo
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── apple-touch-icon.png
│   │   ├── android-chrome-192x192.png
│   │   └── android-chrome-512x512.png
│   └── fonts/            # Self-hosted WOFF2 fonts (privacy & 60fps speed)
│       ├── inter-400.woff2
│       ├── inter-500.woff2
│       ├── inter-600.woff2
│       ├── plus-jakarta-sans-600.woff2
│       ├── plus-jakarta-sans-700.woff2
│       └── plus-jakarta-sans-800.woff2
├── DEPLOYMENT.md         # Step-by-step GoDaddy cPanel deployment guide
└── README.md             # Project documentation and local running guide
```

---

## How to Run Locally

You do not need any build tools (no Webpack, Vite, or npm run commands). You can view and test the website locally in any of the following ways:

### Method 1: Direct File Open
Simply double-click `index.html` in your file explorer to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Method 2: Node.js Local Server (Recommended for testing fetch & routing)
If Node.js is installed on your computer, run:
```bash
npx serve .
# or
npx http-server -p 8080
```
Then navigate to `http://localhost:8080/` in your browser.

### Method 3: Python Built-in Server
If Python is installed:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000/`.

---

## Key Features & Architectural Decisions

1. **Pixel-Fidelity & Brand Palette**: Faithfully preserved all layouts, micro-animations, copy, tokens, and the signature purple/lavender color scheme (`#351044`, `#5B176F`, `#B985D8`).
2. **Self-Hosted Typography**: Plus Jakarta Sans and Inter are self-hosted in WOFF2 format inside `assets/fonts/` with `font-display: swap` and critical weights preloaded in `<head>` to prevent render-blocking and ensure user privacy.
3. **No External CDNs**: Replaced all third-party external CDN references with local relative assets (`assets/images/logo.png`).
4. **Smooth Interactions**: 60fps transform- and opacity-based animations driven by `IntersectionObserver`. Fully respects `prefers-reduced-motion` settings.
5. **Accessibility (WCAG AA)**: Skip links, ARIA landmarks and live regions, semantic HTML elements, high color contrast, focus-visible outlines, and modal focus trapping with `Escape` key listeners.
6. **Robust PHP Backend (`contact.php`)**:
   - Supports contact inquiries, callback requests, newsletter subscriptions, and career interest submissions.
   - Built-in honeypot bot trap (`website` hidden input field).
   - IP-based rate limiting to prevent spam floods.
   - Server-side sanitization and RFC-compliant email header assembly.
   - Configurable recipient address (`$TO_EMAIL = "bccoofficial01@gmail.com"`).
8. **Production Apache `.htaccess`**:
   - Canonical 301 redirection to apex non-www (`https://bcco.ngo/`) with safe HTTPS toggle.
   - `mod_deflate` gzip compression for all text, vector, and font MIME types.
   - 1-year immutable caching for static assets with instant revalidation for HTML.
   - Security headers: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.

---

## Deployment to GoDaddy cPanel

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions (with Hindi hints in brackets) on zipping, uploading to `public_html`, configuring DNS records, enabling AutoSSL, and setting up cPanel email.

---

## Production Configuration Status

The following official production values have been integrated:
- **Canonical Domain**: `https://bcco.ngo/` (configured in `index.html`, `404.html`, `robots.txt`, `sitemap.xml`, and `.htaccess`).
- **Email Recipient**: Set to `$TO_EMAIL = "bccoofficial01@gmail.com"` in `contact.php`.
- **Helplines**: `+91 9431893358` and `+91 6123573290` across all pages.
- **Office Address**: Ward No. 8, Satyabha Niwas, IAS Nagar, Beside Patel Bhawan, Police Headquarters, Patna, Bihar - 800023.
- **Statutory Details**: PAN `AAQAB0546B`, CSR Registration `CSR00107875`, `12A and 80G Certified`.
- **Donation Details**: Account No. `44908340531`, IFSC `SBIN0009004`, UPI `biharcancercareorganisation@sbi`.
- **Pending Verification**: Verified board/committee member profiles, client-specific impact counter statistics (`data-count`), and partner endorsement logos.
