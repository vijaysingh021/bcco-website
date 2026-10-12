# Bihar Cancer Care Organisation (BCCO) - Deployment Guide
## Deploying to GoDaddy Domain & cPanel Linux Hosting

This guide provides clear step-by-step instructions to deploy the BCCO website on GoDaddy cPanel shared hosting (Apache).
*(यह गाइड आपको GoDaddy डोमेन और cPanel होस्टिंग पर वेबसाइट लाइव करने के लिए आसान स्टेप्स प्रदान करती है।)*

---

### Prerequisites *(शुरू करने से पहले आवश्यक चीजें)*
1. Your GoDaddy Domain name (e.g., `biharcancercare.org` or your purchased domain).
2. GoDaddy cPanel Linux Hosting account credentials.
3. The project files in this folder.

---

### Step 1: Prepare and Zip the Files *(फाइलों का ज़िप तैयार करना)*
1. On your computer, select all files inside the `bcco-website` folder:
   - `index.html`
   - `404.html`
   - `contact.php`
   - `.htaccess` *(Note: this is a hidden file, ensure hidden files are visible)*
   - `robots.txt`
   - `sitemap.xml`
   - `site.webmanifest`
   - `favicon.ico`
   - `apple-touch-icon.png`
   - `css/` folder
   - `js/` folder
   - `assets/` folder
2. Compress (Zip) them into a single file named `bcco-website.zip`.
   *(सभी फाइलों को सेलेक्ट करके एक `.zip` फाइल बनाएं। ध्यान रखें कि फोल्डर नहीं, अंदर की फाइलें सीधे रूट में हों।)*

---

### Step 2: Upload and Extract to `public_html` *(cPanel में अपलोड करना)*
1. Log in to your **GoDaddy Account** and open **cPanel** *(cPanel खोलें)*.
2. Open **File Manager** *(फाइल मैनेजर पर क्लिक करें)*.
3. Navigate into the **`public_html`** directory.
   *(अगर वहां पहले से कोई डिफ़ॉल्ट फाइल जैसे `index.php` या `default.html` हो, तो उसे हटा दें या बैकअप कर लें।)*
4. Click **Upload** in the top toolbar and select `bcco-website.zip`.
5. Once upload reaches 100% (green), return to File Manager and right-click `bcco-website.zip` -> **Extract**.
6. **Critical Check**: Verify that `index.html` sits directly inside `public_html` (i.e. path is `public_html/index.html`, NOT `public_html/bcco-website/index.html`).
7. Ensure `.htaccess` is extracted. If hidden files are not visible, click **Settings** (top right of File Manager) -> check **Show Hidden Files (dotfiles)** -> Save.
8. Delete `bcco-website.zip` to save storage.

---

### Step 3: Point Your Domain (DNS Configuration) *(डोमेन को होस्टिंग से जोड़ना)*
Depending on how your domain and hosting are setup on GoDaddy:

- **Scenario A: Domain and Hosting are on the same GoDaddy account**
  1. Go to **My Products** -> **Web Hosting** -> **Manage**.
  2. Under Domains, ensure your domain is set as the **Primary Domain**.
  3. GoDaddy will automatically link the DNS A Record to your hosting IP.

- **Scenario B: Domain is registered elsewhere or needs manual DNS**
  1. Find your cPanel Shared IP address (displayed on the right sidebar of cPanel home screen under **General Information -> Shared IP Address**).
  2. Go to your Domain DNS Management:
     - Set `A Record`: Host `@` -> Points to `[Your cPanel IP]` (TTL: 600 or 1/2 hour).
     - Set `CNAME Record`: Host `www` -> Points to `@` or your domain.
  3. *Propagation Note*: DNS changes can take from 15 minutes up to 24–48 hours to update worldwide *(DNS अपडेट होने में थोड़ा समय लग सकता है)*.

---

### Step 4: Enable Free SSL Certificate (HTTPS) *(मुफ़्त SSL सक्रिय करना)*
1. In cPanel, search for **SSL/TLS Status** or **AutoSSL**.
2. Click **Run AutoSSL** to generate and install the free cPanel Sectigo/Let's Encrypt certificate.
3. Check that the padlock icon next to your domain turns green.
4. Because the provided `.htaccess` includes automatic HTTPS redirection, all visitors visiting `http://` will automatically be redirected to secure `https://`.

---

### Step 5: Configure Business Email & `contact.php` *(ईमेल सेटअप)*
1. In cPanel, click **Email Accounts** -> **Create** (if creating a custom domain mailbox like `contact@bcco.ngo`).
2. Alternatively, BCCO's confirmed official mailbox is currently configured:
   ```php
   // contact.php (Line 11):
   $TO_EMAIL = "bccoofficial01@gmail.com";
   ```
3. To change this address in the future, right-click `contact.php` in File Manager -> **Edit**, update `$TO_EMAIL`, and save.
   *(वेबसाइट के संपर्क फॉर्म, कॉलबैक और करियर फॉर्म के अनुरोध सीधे इस इनबॉक्स पर आएंगे।)*

---

### Step 6: Verified Organization Details *(पुष्टीकृत आधिकारिक विवरण)*
The website is pre-configured with BCCO's verified statutory and contact details:

| Field | Configuration / Value | Where Configured |
| :--- | :--- | :--- |
| **Production Domain** | `https://bcco.ngo/` | `index.html`, `404.html`, `sitemap.xml`, `robots.txt`, `.htaccess` |
| **Recipient Email** | `bccoofficial01@gmail.com` | `contact.php`, `index.html`, `404.html` |
| **Helpline Numbers** | `+91 9431893358` · `+91 6123573290` | Header, Hero, Contact, Footer, Call bar |
| **Registered Office** | Ward No. 8, Satyabha Niwas, IAS Nagar, Beside Patel Bhawan, Police Headquarters, Patna, Bihar - 800023 | Contact page, Footer, JSON-LD Schema |
| **PAN & CSR** | PAN: `AAQAB0546B` · CSR: `CSR00107875` | Certificates page, Contact, Footer |
| **Tax Exemption** | `12A and 80G Certified` (50% Tax Exemption) | Certificates page, Donate modal |
| **Donation Bank** | SBI A/C: `44908340531` · IFSC: `SBIN0009004` · UPI: `biharcancercareorganisation@sbi` | `#donateModal` |

---

### Step 7: Launch Verification Checklist *(लॉन्च से पहले जांच सूची)*
- [ ] **Desktop & Mobile Display**: Test on desktop, tablet, and mobile device. Check that navigation, hero, and all sections render cleanly.
- [ ] **Canonical Apex Redirection**: Type `http://www.bcco.ngo` or `http://bcco.ngo` in your browser; verify it resolves to `bcco.ngo`.
- [ ] **AutoSSL Activation**: In cPanel > **SSL/TLS Status**, verify AutoSSL certificate is issued and valid for `bcco.ngo` and `www.bcco.ngo`.
- [ ] **404 Page**: Type `https://bcco.ngo/non-existent-page`; verify the branded 404 page loads and links back to home.
- [ ] **Contact Form Test**: Submit a test message on the Contact page; verify the confirmation message appears and the email arrives in your inbox.
- [ ] **Newsletter Test**: Submit an email address in the footer; verify confirmation appears.
- [ ] **Donation Modal**: Click the "Donate" button; verify modal opens, direct bank/UPI details and copy buttons work, and amount selection operates properly.
- [ ] **FAQ Accordion**: Open and close each question.
- [ ] **Advisory Carousel**: Verify smooth infinite scrolling on desktop and mobile.

---

### Step 8: Google Search Console & Sitemap Submission *(गूगल सर्च में जोड़ना)*
1. Open [Google Search Console](https://search.google.com/search-console).
2. Add your property (URL prefix: `https://bcco.ngo/`).
3. Verify ownership (choose HTML Tag, DNS TXT record, or upload an HTML verification file to `public_html`).
4. In the left menu, click **Sitemaps**.
5. Enter `sitemap.xml` and click **Submit**.
   *(गूगल कुछ ही दिनों में आपकी वेबसाइट को इंडेक्स करना शुरू कर देगा।)*

---

### Step 9: How to Update the Website in the Future *(भविष्य में अपडेट कैसे करें)*
1. Make code or content changes on your local computer.
2. Test changes locally in your browser.
3. Commit and push your changes to your private GitHub repository:
   ```bash
   git add .
   git commit -m "Update: [describe change]"
   git push origin main
   ```
4. In GoDaddy cPanel File Manager, upload only the updated files (e.g. `index.html`, `css/style.min.css`, etc.) into `public_html`.
5. Clear browser cache (Ctrl+F5 / Cmd+Shift+R) to verify the new update.

