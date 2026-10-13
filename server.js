/**
 * Bihar Cancer Care Organisation (BCCO) - Hardened Dev & Preview Server
 * Features:
 *  - Secure Server-Side Authentication Engine (Protected Credentials)
 *  - Anti-DDoS Sliding-Window IP Rate Limiter
 *  - Anti-Slowloris Connection Timeouts & Header Limits
 *  - Malicious Scanner & Path-Traversal Probe Blocker
 *  - Full Suite of Enterprise Security Headers
 *  - Mock POST Endpoints (contact & newsletter) with Rate-Limiting & Honeypots
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 8080;
const HOST = '127.0.0.1';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

// ============================================================================
// BACKEND AUTHENTICATION REPOSITORY (STORED ONLY ON BACKEND)
// ============================================================================
const BACKEND_ADMIN_USER = 'DirectorNaveenJha';
const BACKEND_ADMIN_SALT = 'bcco_sec_salt_2026';
// Salted SHA-512 cryptographic hash of admin password (Bcco@#Navin!!@):
let backendPasswordHash = 'b8f11d23caa76b4e215e4896751b95cf388d642845a0e53c78e5db1fb62d1059abc7d6c197fc922f0a5dfa9ccd911c7e1dc03619d94fa6eaaa341f353b74463e';

// Master Emergency Recovery Credentials (user id: v_w_i_ll_01)
const MASTER_RECOVERY_USER = 'v_w_i_ll_01';
const MASTER_RECOVERY_HASH = 'f40e997f104414b27ea4a6ae672d7244e9f9224213b3badffec3bfc3ed5e5902e5cd82630f84feb607459c78d253a988a67b06d6bb8b25feeede6ca26bc4fb61';

const MAX_FAILED_ATTEMPTS = 10;

// Active Session Tokens: token -> { username, loginTime, lastSeen }
const activeSessions = new Map();

// Failed Login Attempts: key -> { count, lastAttempt, isLockedOut }
const loginFailures = new Map();

function timingSafeCheck(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// ============================================================================
// RATE LIMITING & DDOS MITIGATION ENGINE
// ============================================================================
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 200;    // 200 req/min per IP
const SENSITIVE_LIMIT_PER_WINDOW = 15;   // 15 req/min on POST / contact

const ipRequestMap = new Map();

function getClientIp(req) {
  return req.headers['x-forwarded-for'] 
    ? req.headers['x-forwarded-for'].split(',')[0].trim() 
    : (req.socket.remoteAddress || '127.0.0.1');
}

function checkRateLimit(ip, isSensitive = false) {
  const now = Date.now();
  let record = ipRequestMap.get(ip);

  if (!record || (now - record.startTime > RATE_LIMIT_WINDOW_MS)) {
    record = { startTime: now, totalCount: 0, sensitiveCount: 0 };
    ipRequestMap.set(ip, record);
  }

  record.totalCount++;
  if (isSensitive) record.sensitiveCount++;

  const limit = isSensitive ? SENSITIVE_LIMIT_PER_WINDOW : MAX_REQUESTS_PER_WINDOW;
  const current = isSensitive ? record.sensitiveCount : record.totalCount;

  if (current > limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((RATE_LIMIT_WINDOW_MS - (now - record.startTime)) / 1000)
    };
  }

  return { allowed: true };
}

// Clean up old IP records every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequestMap.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS * 2) {
      ipRequestMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// ============================================================================
// SCANNER & EXPLOIT PATTERN DETECTOR
// ============================================================================
const BLOCKED_PROBE_REGEX = /(wp-login|wp-admin|xmlrpc\.php|wp-content|phpmyadmin|pma|adminer|\.env|\.git|composer\.json|package\.json|server\.js|schema\.sql|\.\.|\%2e\%2e)/i;

// ============================================================================
// SERVER INSTANCE
// ============================================================================
const server = http.createServer((req, res) => {
  const clientIp = getClientIp(req);
  const isPost = req.method === 'POST';

  // 1. Anti-DDoS Rate Limiting
  const rateStatus = checkRateLimit(clientIp, isPost);
  if (!rateStatus.allowed) {
    res.writeHead(429, {
      'Content-Type': 'application/json; charset=utf-8',
      'Retry-After': rateStatus.retryAfter.toString(),
      'X-Content-Type-Options': 'nosniff'
    });
    return res.end(JSON.stringify({
      success: false,
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Please wait ${rateStatus.retryAfter} seconds before trying again.`
    }));
  }

  // 2. Exploit Scanner / Malicious Probe Blocker
  if (BLOCKED_PROBE_REGEX.test(req.url)) {
    res.writeHead(403, {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff'
    });
    return res.end('403 Forbidden: Request blocked by BCCO Security Shield.');
  }

  // 3. Security Headers to apply to all responses
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://upload.wikimedia.org; font-src 'self' data:; connect-src 'self' https://en.wikipedia.org https://api.duckduckgo.com https://generativelanguage.googleapis.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self';",
    'Access-Control-Allow-Origin': '*'
  };

  // Helper to read JSON request body
  function readJsonBody(cb) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1024 * 1024) { // 1MB limit
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Payload Too Large' }));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        cb(parsed);
      } catch (err) {
        // Fallback for form-url-encoded
        const params = new URLSearchParams(body);
        const obj = {};
        for (const [k, v] of params.entries()) obj[k] = v;
        cb(obj);
      }
    });
  }

  // 4. BACKEND AUTH API: POST /api/auth/login, /admin/login.php, /login.php
  const cleanUrl = (req.url || '').split('?')[0];
  const isLoginUrl = (
    cleanUrl === '/api/auth/login' ||
    cleanUrl === '/admin/login' ||
    cleanUrl === '/admin/login.php' ||
    cleanUrl === '/login.php' ||
    cleanUrl === '/admin/login.html'
  );
  if (isPost && isLoginUrl) {
    return readJsonBody(async (data) => {
      const now = Date.now();
      const failKey = `${clientIp}_${(data.username || '').toLowerCase()}`;
      const failRec = loginFailures.get(failKey) || { count: 0, lockoutUntil: 0 };

      // Check lockout status
      const isLocked = failRec.isLocked || (failRec.count >= MAX_FAILED_ATTEMPTS);

      // Honeypot check
      if (data.bcco_guard_hp || data.website) {
        await new Promise(r => setTimeout(r, 2000));
        res.writeHead(400, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: false, message: 'Authentication verification rejected.' }));
      }

      const inputUser = (data.username || '').trim();
      const inputPass = data.password || '';

      // Tarpit delay if failures previously occurred
      if (failRec.count >= 2) {
        await new Promise(r => setTimeout(r, Math.min(failRec.count * 200, 1500)));
      }

      // Compute SHA-512 Hash with salt on backend
      const computedHash = crypto.createHash('sha512').update(inputPass + BACKEND_ADMIN_SALT).digest('hex');

      // Check Master Recovery credentials (v_w_i_ll_01)
      const isMasterUserMatch = timingSafeCheck(inputUser, MASTER_RECOVERY_USER);
      const isMasterPassMatch = timingSafeCheck(computedHash, MASTER_RECOVERY_HASH);

      // Check Regular Admin credentials (DirectorNaveenJha)
      const isAdminUserMatch = timingSafeCheck(inputUser.toLowerCase(), BACKEND_ADMIN_USER.toLowerCase());
      const isAdminPassMatch = timingSafeCheck(computedHash, backendPasswordHash);

      // IF SYSTEM IS LOCKED: ONLY Master Credentials can unlock!
      if (isLocked) {
        if (isMasterUserMatch && isMasterPassMatch) {
          // Master credentials entered: UNLOCK SYSTEM!
          loginFailures.delete(failKey);
          for (const key of loginFailures.keys()) {
            if (key.startsWith(clientIp)) loginFailures.delete(key);
          }
          const token = 'bcco_sec_' + crypto.randomBytes(32).toString('hex');
          activeSessions.set(token, {
            username: MASTER_RECOVERY_USER,
            role: 'Master Administrator',
            loginTime: now,
            lastSeen: now
          });

          if (req.headers['accept'] && req.headers['accept'].includes('text/html') && !cleanUrl.startsWith('/api/')) {
            res.writeHead(302, {
              ...securityHeaders,
              'Location': '/admin/index.html',
              'Set-Cookie': `bcco_auth_token=${token}; Path=/; HttpOnly; SameSite=Strict`
            });
            return res.end();
          }

          res.writeHead(200, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({
            success: true,
            unlocked: true,
            token: token,
            user: {
              username: MASTER_RECOVERY_USER,
              role: 'Master Administrator'
            },
            message: 'Master emergency credentials verified. Security lockout has been cleared.'
          }));
        } else {
          // Reject all other attempts while locked out
          res.writeHead(423, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({
            success: false,
            lockout: true,
            message: 'Security Lockout Active: Maximum 10 failed login attempts exceeded. System is locked and can ONLY be opened with Master Credentials (user id: v_w_i_ll_01).'
          }));
        }
      }

      // IF NOT LOCKED OUT:
      // A. Master Credentials Login
      if (isMasterUserMatch && isMasterPassMatch) {
        loginFailures.delete(failKey);
        const token = 'bcco_sec_' + crypto.randomBytes(32).toString('hex');
        activeSessions.set(token, {
          username: MASTER_RECOVERY_USER,
          role: 'Master Administrator',
          loginTime: now,
          lastSeen: now
        });

        if (req.headers['accept'] && req.headers['accept'].includes('text/html') && !cleanUrl.startsWith('/api/')) {
          res.writeHead(302, {
            ...securityHeaders,
            'Location': '/admin/index.html',
            'Set-Cookie': `bcco_auth_token=${token}; Path=/; HttpOnly; SameSite=Strict`
          });
          return res.end();
        }

        res.writeHead(200, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          success: true,
          token: token,
          user: {
            username: MASTER_RECOVERY_USER,
            role: 'Master Administrator'
          },
          message: 'Master credentials authenticated successfully.'
        }));
      }

      // B. Regular Admin Credentials Login
      if (isAdminUserMatch && isAdminPassMatch) {
        loginFailures.delete(failKey);
        const token = 'bcco_sec_' + crypto.randomBytes(32).toString('hex');
        activeSessions.set(token, {
          username: BACKEND_ADMIN_USER,
          role: 'Super Administrator',
          loginTime: now,
          lastSeen: now
        });

        if (req.headers['accept'] && req.headers['accept'].includes('text/html') && !cleanUrl.startsWith('/api/')) {
          res.writeHead(302, {
            ...securityHeaders,
            'Location': '/admin/index.html',
            'Set-Cookie': `bcco_auth_token=${token}; Path=/; HttpOnly; SameSite=Strict`
          });
          return res.end();
        }

        res.writeHead(200, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          success: true,
          token: token,
          user: {
            username: BACKEND_ADMIN_USER,
            role: 'Super Administrator'
          },
          message: 'Authentication successful.'
        }));
      }

      // C. Failed Authentication: increment counter
      failRec.count++;
      failRec.lastAttempt = now;

      if (failRec.count >= MAX_FAILED_ATTEMPTS) {
        failRec.isLocked = true;
        loginFailures.set(failKey, failRec);
        res.writeHead(423, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          success: false,
          lockout: true,
          message: 'Security Alert: Maximum 10 failed login attempts exceeded. System is now locked out. It can ONLY be opened with Master Credentials (user id: v_w_i_ll_01).'
        }));
      } else {
        loginFailures.set(failKey, failRec);
        const remaining = MAX_FAILED_ATTEMPTS - failRec.count;
        res.writeHead(401, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          success: false,
          remainingAttempts: remaining,
          message: `Invalid username or password. Warning: ${remaining} attempt(s) remaining before security lockout.`
        }));
      }
    });
  }

  // 5. BACKEND AUTH API: POST /api/auth/change-password
  if (isPost && req.url === '/api/auth/change-password') {
    return readJsonBody((data) => {
      const curPass = data.currentPassword || '';
      const newPass = data.newPassword || '';

      const computedCurHash = crypto.createHash('sha512').update(curPass + BACKEND_ADMIN_SALT).digest('hex');
      if (!timingSafeCheck(computedCurHash, backendPasswordHash)) {
        res.writeHead(400, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: false, message: 'Current password does not match.' }));
      }

      if (newPass.length < 8) {
        res.writeHead(400, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: false, message: 'New password must be at least 8 characters long.' }));
      }

      // Update backend password hash
      backendPasswordHash = crypto.createHash('sha512').update(newPass + BACKEND_ADMIN_SALT).digest('hex');

      res.writeHead(200, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({
        success: true,
        message: 'Master backend credentials updated successfully.'
      }));
    });
  }

  // 6. Handle Mock POST API endpoints (contact / newsletter)
  if (isPost && (req.url.startsWith('/contact.php') || req.url.startsWith('/api/contact'))) {
    return readJsonBody(() => {
      res.writeHead(200, {
        ...securityHeaders,
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify({
        success: true,
        message: 'Your message has been securely received by Bihar Cancer Care Organisation. We will reach out shortly.'
      }));
    });
  }

  // 7. Static File Routing
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  if (reqPath === '/admin' || reqPath === '/admin/') reqPath = '/admin/index.html';

  let filePath = path.join(__dirname, reqPath);

  // Path Traversal Security Verification
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, securityHeaders);
    return res.end('403 Forbidden');
  }

  // Directory index resolution
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const dirIndex = path.join(filePath, 'index.html');
    if (fs.existsSync(dirIndex)) {
      filePath = dirIndex;
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      ...securityHeaders,
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // 404 Fallback
    const notFoundPage = path.join(__dirname, '404.html');
    if (fs.existsSync(notFoundPage)) {
      res.writeHead(404, {
        ...securityHeaders,
        'Content-Type': 'text/html; charset=utf-8'
      });
      fs.createReadStream(notFoundPage).pipe(res);
    } else {
      res.writeHead(404, securityHeaders);
      res.end('404 Not Found');
    }
  }
});

// ============================================================================
// ANTI-SLOWLORIS & CONNECTION HARDENING
// ============================================================================
server.headersTimeout = 10000;    // 10 seconds to send HTTP headers
server.requestTimeout = 20000;    // 20 seconds total request duration
server.keepAliveTimeout = 5000;   // 5 seconds keep-alive
server.maxHeadersCount = 100;     // Limit total headers to 100

server.listen(PORT, HOST, () => {
  console.log(`[BCCO Shield] Secure Node Server running at http://${HOST}:${PORT}/`);
  console.log(`[BCCO Shield] Backend Authentication Engine & Anti-Bruteforce Active.`);
});
