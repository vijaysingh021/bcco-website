# Contributing to Bihar Cancer Care Organisation (BCCO) Website

Thank you for your interest in contributing to the **Bihar Cancer Care Organisation (BCCO)** official website repository. Your contributions help ensure that cancer awareness, patient navigation, and compassionate care resources reach patients, families, and caregivers across Bihar.

---

## 1. Ways to Contribute

You can contribute to this project in several ways:
- **Code & Frontend Enhancements:** Improving responsive design, web performance, accessibility (WCAG 2.1 AA), or interactive features.
- **Content & Documentation:** Updating patient awareness content, FAQs, hospital directories, government schemes, or documentation.
- **Bug Reports & Issues:** Identifying broken links, layout bugs on specific mobile devices, or accessibility shortcomings.
- **Security & Infrastructure:** Hardening `.htaccess`, improving form security in `contact.php`, or optimizing Content Security Policy (CSP).

---

## 2. Technical Stack & Architecture Principles

To ensure seamless hosting on GoDaddy cPanel Apache shared hosting without complex runtime dependencies, this project strictly adheres to:

1. **Pure Standards-Based Stack:**
   - Semantic HTML5
   - Vanilla CSS (with CSS Custom Properties / Design Tokens)
   - Modern Vanilla JavaScript (ES6+, zero runtime frameworks)
   - PHP for form handling and server-side endpoints
   - Apache `.htaccess` for caching, compression, and security headers
2. **Zero-Build Requirement for Production:**
   - The public website must remain functional as static files without requiring a Node.js server in production.
   - Any minification is handled via `node build-minify.js`.
3. **Medical & Content Accuracy:**
   - Never fabricate or guess medical facts, cancer warning signs, hospital contacts, or government scheme eligibility.
   - All healthcare content must be grounded in verified guidelines from WHO, ICMR, Tata Memorial Centre, or Bihar Directorate of Health Services.

---

## 3. Local Development Workflow

### Step 1: Clone the Repository
```bash
git clone https://github.com/vijaysingh021/bcco-website.git
cd bcco-website
```

### Step 2: Configure Your Git Identity (For GitHub Contribution Graph)
Ensure your local git commit email matches your GitHub account email:
```bash
git config user.name "Your Name"
git config user.email "your-github-email@example.com"
```
*(Tip: To have commits appear in your GitHub Contribution Graph, ensure this email is listed under GitHub Settings &rarr; Emails).*

### Step 3: Run Locally
Start the built-in development server:
```bash
node server.js
```
Then visit `http://localhost:8080/` in your browser.

Alternatively, use any static web server:
```bash
# Python
python -m http.server 8080

# Node.js
npx serve .
```

### Step 4: Minify Assets (When Editing CSS or JS)
If you modify `css/style.css`, `js/main.js`, or `js/ai-assistant.js`, run:
```bash
node build-minify.js
```
This updates `css/style.min.css`, `js/main.min.js`, and `js/ai-assistant.min.js`.

---

## 4. Pull Request & Commit Guidelines

1. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```
2. **Commit Changes with Clear Messages:**
   Use conventional commit prefixes:
   - `feat:` New feature or functionality
   - `fix:` Bug fix or styling resolution
   - `docs:` Documentation updates
   - `style:` Formatting, whitespace, or visual cleanup
   - `refactor:` Code restructuring without functional change
3. **Push and Open a Pull Request:**
   ```bash
   git push origin feature/your-feature-name
   ```
   Open a PR against the `main` branch with a summary of changes and test steps.

---

## 5. Code of Conduct & Medical Responsibility

- **Compassion & Respect:** All communications, design choices, and user interactions must prioritize patient dignity and empathy.
- **Accessibility First:** Ensure text contrast, touch target sizes (`>= 44px`), keyboard navigability, and ARIA labels are maintained.
- **Medical Disclaimer:** The website provides educational and awareness resources; emergency medical cases must always be directed to certified oncologists and emergency helplines (`+91 94318 93358`).

---

## 6. Questions & Support

For questions regarding development or contributing to BCCO:
- **Email:** [bccoofficial01@gmail.com](mailto:bccoofficial01@gmail.com)
- **Official Website:** [https://bcco.ngo/](https://bcco.ngo/)
- **Helpline:** +91 94318 93358

