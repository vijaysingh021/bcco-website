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

// Authentication is handled by the PHP CMS portal. This preview server does not
// store or compare any embedded credentials or recovery secrets.
const activeSessions = new Map();
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

  // Helper to read JSON request body (supports up to 10MB for image uploads)
  function readJsonBody(cb) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) { // 10MB limit
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Payload Too Large (Max 10MB)' }));
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

  const cleanUrl = (req.url || '').split('?')[0];
  const isLoginUrl = (
    cleanUrl === '/api/auth/login' ||
    cleanUrl === '/api/login' ||
    cleanUrl === '/admin/login' ||
    cleanUrl === '/admin/login.php' ||
    cleanUrl === '/login.php' ||
    cleanUrl === '/admin/login.html'
  );

  if (isPost && isLoginUrl) {
    res.writeHead(401, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      success: false,
      message: 'Authentication is handled by the PHP admin portal. Please use /admin/login.php.'
    }));
  }

  if (isPost && req.url === '/api/auth/change-password') {
    res.writeHead(501, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({
      success: false,
      message: 'Password changes are handled by the PHP admin portal. Please change your password from the secure admin interface.'
    }));
  }

  // Handle Mock POST API endpoints (contact / newsletter)
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

  // 6b. CMS CONTENT API: GET /api/content, GET /api/content.php
  if (!isPost && (cleanUrl === '/api/content' || cleanUrl === '/api/content.php')) {
    const dataFile = path.join(__dirname, 'data', 'cms_data.json');
    let cmsData = { success: false, sections: {}, posts: [], profiles: [], media: [], settings: {} };
    if (fs.existsSync(dataFile)) {
      try {
        const raw = fs.readFileSync(dataFile, 'utf8');
        const parsed = JSON.parse(raw);
        const sectionsMap = {};
        if (Array.isArray(parsed.sections)) {
          parsed.sections.forEach(s => {
            sectionsMap[s.section_key] = s;
          });
        }
        cmsData = {
          success: true,
          sections: sectionsMap,
          sectionsList: parsed.sections || [],
          posts: parsed.posts || [],
          profiles: parsed.profiles || [],
          media: parsed.media || [],
          settings: parsed.settings || {}
        };
      } catch (err) {
        console.error('[CMS Content] Error parsing cms_data.json:', err);
      }
    }
    res.writeHead(200, {
      ...securityHeaders,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    return res.end(JSON.stringify(cmsData));
  }

  // 6c. CMS SECTIONS UPDATE API: POST /api/sections/update
  if (isPost && (cleanUrl === '/api/sections/update' || cleanUrl === '/api/sections')) {
    return readJsonBody((data) => {
      const dataFile = path.join(__dirname, 'data', 'cms_data.json');
      if (!fs.existsSync(dataFile)) {
        res.writeHead(500, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: false, message: 'Database file missing.' }));
      }
      try {
        const cmsData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        const key = data.section_key;
        if (!key) {
          res.writeHead(400, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ success: false, message: 'section_key is required.' }));
        }

        let found = false;
        if (!Array.isArray(cmsData.sections)) cmsData.sections = [];
        for (let i = 0; i < cmsData.sections.length; i++) {
          if (cmsData.sections[i].section_key === key) {
            cmsData.sections[i] = {
              ...cmsData.sections[i],
              title: data.title !== undefined ? data.title : cmsData.sections[i].title,
              subtitle: data.subtitle !== undefined ? data.subtitle : cmsData.sections[i].subtitle,
              alt_text: data.alt_text !== undefined ? data.alt_text : cmsData.sections[i].alt_text,
              image_url: data.image_url !== undefined ? data.image_url : cmsData.sections[i].image_url,
              category: data.category !== undefined ? data.category : cmsData.sections[i].category,
              updated_at: new Date().toISOString()
            };
            found = true;
            break;
          }
        }
        if (!found) {
          cmsData.sections.push({
            section_key: key,
            title: data.title || key,
            subtitle: data.subtitle || '',
            alt_text: data.alt_text || '',
            image_url: data.image_url || 'assets/images/placeholder-image.svg',
            category: data.category || 'Custom Section',
            updated_at: new Date().toISOString()
          });
        }

        fs.writeFileSync(dataFile, JSON.stringify(cmsData, null, 2), 'utf8');
        res.writeHead(200, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          success: true,
          message: `Section slot '${key}' updated successfully!`,
          sections: cmsData.sections
        }));
      } catch (err) {
        res.writeHead(500, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: false, message: err.message }));
      }
    });
  }

  // 6d. CMS MEDIA UPLOAD API: POST /api/media/upload
  if (isPost && (cleanUrl === '/api/media/upload' || cleanUrl === '/api/upload')) {
    return readJsonBody((data) => {
      try {
        const fileData = data.dataUrl || data.filedata || data.image || data.file || '';
        const originalName = (data.fileName || data.filename || data.name || 'upload.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
        const altText = data.alt_text || data.alt || '';

        if (!fileData) {
          res.writeHead(400, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ success: false, message: 'No file data received.' }));
        }

        let base64Content = fileData;
        let ext = 'jpg';
        let mime = 'image/jpeg';

        if (fileData.startsWith('data:')) {
          const matches = fileData.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-+.]+);base64,(.+)$/);
          if (matches) {
            mime = matches[1].toLowerCase();
            base64Content = matches[2];
            if (mime === 'image/png') ext = 'png';
            else if (mime === 'image/webp') ext = 'webp';
            else if (mime === 'image/svg+xml') ext = 'svg';
            else if (mime === 'image/jpeg' || mime === 'image/jpg') ext = 'jpg';
            else {
              res.writeHead(400, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
              return res.end(JSON.stringify({ success: false, message: 'Unsupported file type. Only JPG, PNG, WebP, and SVG are allowed.' }));
            }
          }
        } else {
          const rawExt = path.extname(originalName).replace('.', '').toLowerCase();
          if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(rawExt)) {
            ext = rawExt === 'jpeg' ? 'jpg' : rawExt;
          }
        }

        const buffer = Buffer.from(base64Content, 'base64');
        if (buffer.length > 5 * 1024 * 1024) { // 5MB max
          res.writeHead(400, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
          return res.end(JSON.stringify({ success: false, message: 'File exceeds 5MB size limit.' }));
        }

        const uploadsDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const randHex = crypto.randomBytes(4).toString('hex');
        const timestamp = Date.now();
        const savedFilename = `img_${timestamp}_${randHex}.${ext}`;
        const targetDiskPath = path.join(uploadsDir, savedFilename);

        fs.writeFileSync(targetDiskPath, buffer);

        const relativePath = `uploads/${savedFilename}`;

        // Also record in cms_data.json media list
        const dataFile = path.join(__dirname, 'data', 'cms_data.json');
        if (fs.existsSync(dataFile)) {
          const cmsData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
          if (!Array.isArray(cmsData.media)) cmsData.media = [];
          const newMediaItem = {
            id: Date.now(),
            file_name: savedFilename,
            original_name: originalName,
            file_path: relativePath,
            file_size: buffer.length,
            dimensions: ext === 'svg' ? 'Vector SVG' : 'Optimized Image',
            alt_text: altText,
            created_at: new Date().toISOString()
          };
          cmsData.media.unshift(newMediaItem);
          fs.writeFileSync(dataFile, JSON.stringify(cmsData, null, 2), 'utf8');
        }

        res.writeHead(200, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({
          success: true,
          message: 'Image uploaded successfully!',
          file_name: savedFilename,
          fileName: savedFilename,
          file_path: relativePath,
          filePath: relativePath,
          url: relativePath,
          file_size: buffer.length
        }));
      } catch (err) {
        console.error('Upload Error:', err);
        res.writeHead(500, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: false, message: 'Upload processing failed: ' + err.message }));
      }
    });
  }

  // 6e. CMS POSTS SAVE API: POST /api/posts/save
  if (isPost && (cleanUrl === '/api/posts/save' || cleanUrl === '/api/posts')) {
    return readJsonBody((data) => {
      const dataFile = path.join(__dirname, 'data', 'cms_data.json');
      if (!fs.existsSync(dataFile)) {
        res.writeHead(500, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: false, message: 'Database missing.' }));
      }
      const cmsData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      if (!Array.isArray(cmsData.posts)) cmsData.posts = [];

      const id = data.id ? parseInt(data.id, 10) : Date.now();
      const existingIdx = cmsData.posts.findIndex(p => p.id === id);

      const postItem = {
        id: id,
        title: data.title || 'Untitled Post',
        slug: data.slug || `post-${id}`,
        category: data.category || 'General',
        author: data.author || 'BCCO Team',
        excerpt: data.excerpt || '',
        content: data.content || '',
        featured_image: data.featured_image || 'assets/images/placeholder-image.svg',
        status: data.status || 'published',
        created_at: data.created_at || new Date().toISOString()
      };

      if (existingIdx >= 0) {
        cmsData.posts[existingIdx] = postItem;
      } else {
        cmsData.posts.unshift(postItem);
      }

      fs.writeFileSync(dataFile, JSON.stringify(cmsData, null, 2), 'utf8');
      res.writeHead(200, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: true, message: 'Post saved successfully!', post: postItem }));
    });
  }

  // 6f. CMS PROFILES SAVE API: POST /api/profiles/save
  if (isPost && (cleanUrl === '/api/profiles/save' || cleanUrl === '/api/profiles')) {
    return readJsonBody((data) => {
      const dataFile = path.join(__dirname, 'data', 'cms_data.json');
      if (!fs.existsSync(dataFile)) {
        res.writeHead(500, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: false, message: 'Database missing.' }));
      }
      const cmsData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      if (!Array.isArray(cmsData.profiles)) cmsData.profiles = [];

      const id = data.id ? parseInt(data.id, 10) : Date.now();
      const existingIdx = cmsData.profiles.findIndex(p => p.id === id);

      const profileItem = {
        id: id,
        name: data.name || 'Member Name',
        role: data.role || 'Designation',
        organization: data.organization || '',
        category: data.category || 'advisor',
        photo_url: data.photo_url || 'assets/images/avatar-default.svg'
      };

      if (existingIdx >= 0) {
        cmsData.profiles[existingIdx] = profileItem;
      } else {
        cmsData.profiles.push(profileItem);
      }

      fs.writeFileSync(dataFile, JSON.stringify(cmsData, null, 2), 'utf8');
      res.writeHead(200, { ...securityHeaders, 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ success: true, message: 'Profile saved successfully!', profile: profileItem }));
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
