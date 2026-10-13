# BCCO Cyber Security Architecture & Attack Defense Manual

This document details the multi-layered cyber security, anti-bruteforce, and DDoS mitigation systems protecting the **Bihar Cancer Care Organisation (BCCO)** official website and CMS platform.

---

## 1. Summary of Active Defenses

```
                        [ Internet / Attackers ]
                                   │
                                   ▼
          ┌─────────────────────────────────────────────────┐
          │  Layer 1: Edge & CDN / Cloudflare WAF (DDoS)    │
          │  - Anycast Global DDoS Scrubbing (L3/L4/L7)     │
          │  - Bot Fight Mode & Under-Attack Challenge      │
          └────────────────────────┬────────────────────────┘
                                   │
                                   ▼
          ┌─────────────────────────────────────────────────┐
          │  Layer 2: Apache Web Server WAF (.htaccess)     │
          │  - Bad Bot & Exploit Scanner Blocking           │
          │  - SQLi, XSS, RFI, & Path-Traversal Filters    │
          │  - Request Size Limit (10MB) & Slowloris Drop   │
          │  - Strict Execution Lock on /uploads/           │
          │  - Direct Access Denial for /admin/includes/    │
          └────────────────────────┬────────────────────────┘
                                   │
                                   ▼
          ┌─────────────────────────────────────────────────┐
          │  Layer 3: Application Engine (PHP & Node.js)    │
          │  - Anti-Bruteforce Lockout (5 attempts = 15m)   │
          │  - Exponential Tarpit Delay (throttles scripts) │
          │  - Invisible Honeypot Bot Traps                 │
          │  - Sliding-Window IP Rate Limiter               │
          │  - Session Hijacking & UA Fingerprint Checks    │
          │  - Timing-Safe CSRF Verification                │
          │  - Prepared Statements (100% SQLi Immune)       │
          └─────────────────────────────────────────────────┘
```

---

## 2. Anti-Bruteforce Defense Engine

### Implementation (`admin/includes/auth.php` & `admin/login.php` & `admin/login.html`)
1. **Multi-Vector Throttling**:
   - Tracks failed attempts by **Client IP** address and by **Target Account** name. This prevents distributed attacks where botnets rotate IP addresses while targeting a single administrator account.
2. **Progressive Tarpitting (Slow-Down)**:
   - When 2 or more failed attempts are detected, the server automatically introduces a progressive micro-sleep (`usleep()`).
   - Automated password crackers (such as Hydra or custom Python scripts) relying on rapid 500+ requests/sec are instantly choked to a crawl.
3. **Automatic Account Lockout**:
   - After **5 consecutive failed attempts**, the account and IP are locked out for **15 minutes**.
   - Lockout remaining time is dynamically calculated and communicated to legitimate users with a real-time countdown timer.
4. **Honeypot Traps**:
   - Hidden fields (`bcco_guard_hp` and `botHoneypot`) are rendered invisibly in the DOM. Human users never interact with them, but headless bot scanners auto-fill them, triggering immediate rejection and logging.
5. **Session Hijacking & Fixation Protection**:
   - Session identifiers are regenerated (`session_regenerate_id(true)`) immediately upon successful authentication.
   - User-Agent fingerprints are hashed and compared on every request. If an attacker steals a cookie and tries to use it from a different browser or OS, the session is invalidated immediately.
   - Strict cookie security flags: `HttpOnly`, `SameSite=Strict`, `Secure` (over HTTPS).

---

## 3. DDoS & HTTP Flood Mitigation

### A. Web Server Level (`.htaccess`)
- **`LimitRequestBody 10485760` (10 MB)**: Prevents memory exhaustion attacks caused by attackers streaming gigantic POST request payloads.
- **Method Whitelisting**: Rejects dangerous HTTP methods (`TRACE`, `TRACK`, `CONNECT`, `DEBUG`) used in cross-site tracing and proxy attacks.
- **Probe Scanner Filter**: Instantly issues `403 Forbidden` to automated probe tools looking for WordPress, Joomla, Drupal, phpMyAdmin, or shell backdoors.
- **Bad User-Agent Blocking**: Blocks known automated attack utilities including `sqlmap`, `nikto`, `wpscan`, `havij`, `masscan`, `zgrab`, `nmap`, `dirbuster`, `gobuster`, and malicious python/curl flood scripts.

### B. Node Server Level (`server.js`)
- **Anti-Slowloris Connection Hardening**:
  - `headersTimeout = 10000ms` (Drops slow-header attacks within 10 seconds).
  - `requestTimeout = 20000ms` (Terminates hanging request sockets).
  - `keepAliveTimeout = 5000ms` (Reclaims idle connection slots).
  - `maxHeadersCount = 100` (Mitigates header-bombing memory attacks).
- **In-Memory Sliding-Window Rate Limiter**:
  - Limits each IP to **200 requests/minute** for general browsing.
  - Limits each IP to **15 requests/minute** for POST/form submissions.
  - Returns `429 Too Many Requests` with dynamic `Retry-After` headers.

---

## 4. Web Application Firewall (WAF) & Injection Protection

### 1. SQL Injection (SQLi)
- All database queries in PHP use PDO prepared statements with parameterized inputs (`$stmt->execute([$param])`). No raw variables are ever concatenated into SQL strings.
- Apache `.htaccess` rules inspect incoming query strings and block SQL keywords (`UNION SELECT`, `INFORMATION_SCHEMA`, `BENCHMARK()`, `SLEEP()`, `WAITFOR DELAY`).

### 2. Cross-Site Scripting (XSS)
- All user-supplied output is encoded using `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')`.
- Content Security Policy (CSP) is strictly enforced in HTTP headers.
- Query string XSS filter drops requests containing `<script>`, `javascript:`, `onerror=`, or `document.cookie`.

### 3. Remote Code Execution (RCE) via Uploads (`uploads/.htaccess`)
- The `/uploads/` directory has `php_flag engine off` and all executable handlers disabled (`RemoveHandler .php .cgi .pl .py .sh`).
- Apache immediately denies requests for scripts (`.php`, `.phtml`, `.phar`, `.sh`, `.exe`, `.asp`, `.jsp`, `.sql`).
- Only verified static image extensions (`.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`, `.ico`) are served.

### 4. Direct Access Denial (`admin/includes/.htaccess`)
- All files in `admin/includes/` (database passwords, configuration, auth scripts) return `403 Forbidden` if requested directly via browser URL. They can only be accessed internally by server-side PHP includes.

---

## 5. Security Headers Checklist

| Header | Value | Protection |
| :--- | :--- | :--- |
| **X-Content-Type-Options** | `nosniff` | Blocks MIME-confusion drive-by downloads |
| **X-Frame-Options** | `SAMEORIGIN` | Blocks UI redressing / Clickjacking |
| **X-XSS-Protection** | `1; mode=block` | Enables legacy browser XSS filters |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Protects private URLs from leaking in referrers |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=()` | Disables unauthorized hardware access |
| **Cross-Origin-Opener-Policy** | `same-origin` | Isolates browsing context against Spectre leaks |
| **Content-Security-Policy** | Restricted to self & whitelisted APIs | Blocks malicious scripts and unauthorized embeds |

---

## 6. Cloudflare Anti-DDoS Setup Guide (Recommended for Production)

For large-scale Layer 3/4 volumetric DDoS attacks (1 Gbps - 100 Gbps), software running on a shared hosting server cannot stop network pipe saturation. **Cloudflare Free Tier** provides unlimited unmetered DDoS mitigation:

1. **Sign Up**: Create a free account at [cloudflare.com](https://www.cloudflare.com/).
2. **Add Domain**: Enter `bcco.ngo` (or your domain name).
3. **Update Nameservers**: In GoDaddy Domain DNS Manager, replace GoDaddy nameservers with the 2 assigned Cloudflare nameservers (e.g. `adam.ns.cloudflare.com`).
4. **Proxy Status**: In Cloudflare DNS records, ensure `A` record for `bcco.ngo` and `CNAME` for `www` have **Proxy Status: Proxied (Orange Cloud)**.
5. **SSL/TLS Mode**: In Cloudflare Dashboard &rarr; **SSL/TLS**, select **Full (Strict)**.
6. **Under Attack Mode**: If the website ever faces an active massive DDoS attack:
   - Open Cloudflare Dashboard.
   - Toggle **"Under Attack Mode"** on the overview page.
   - Cloudflare will present an automatic 5-second JavaScript challenge to every visitor before passing traffic to your GoDaddy server, neutralizing 100% of bot floods.
7. **Security &rarr; WAF &rarr; Bot Fight Mode**: Enable free **Bot Fight Mode** to challenge known scrapers and attack proxies automatically.

