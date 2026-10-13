/**
 * Bihar Cancer Care Organisation (BCCO) - Main Client JavaScript
 * Pure vanilla JavaScript - no external dependencies
 */

(function () {
  "use strict";

  const doc = document;
  const body = doc.body;
  const root = doc.documentElement;
  const $ = (s, c) => (c || doc).querySelector(s);
  const $$ = (s, c) => Array.from((c || doc).querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ==========================================================================
     1. Page Load Initialization
     ========================================================================== */
  requestAnimationFrame(() => setTimeout(() => body.classList.add('is-loaded'), 60));

  /* ==========================================================================
     2. Logo Image Fallback
     ========================================================================== */
  $$('.brand-img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const fb = img.parentElement ? img.parentElement.querySelector('.brand-fb') : null;
      if (fb) fb.hidden = false;
    });
  });

  /* ==========================================================================
     3. Blog / Article Content Store
     ========================================================================== */
  const ARTICLES = {
    visit: {
      cat: 'Patient Guidance',
      mins: '4 min read',
      title: 'Preparing for your first oncology visit: a practical checklist',
      paras: [
        "A first appointment with a cancer specialist can feel overwhelming — but a little preparation turns anxiety into purpose. Before the visit, write down everything you want to remember: when symptoms began, what tests you have already had, and every medicine or supplement being taken.",
        "Bring someone you trust. Two pairs of ears catch more than one, and a companion can take notes while you listen. Ask the doctor to slow down whenever you need — good doctors are grateful for clear questions.",
        "Questions worth asking: What do we know so far, and what remains uncertain? Which tests are next, and why? What should we watch for at home? Who do we call if something changes?",
        "Finally, ask for the plan in writing, or write it down yourself before leaving. A visit that ends with everyone understanding the next step is a visit that worked."
      ]
    },
    talk: {
      cat: 'Family Support',
      mins: '3 min read',
      title: 'Talking about cancer at home: why words matter',
      paras: [
        "In many families, the word 'cancer' is still spoken in a whisper. But silence rarely protects anyone — it only leaves people alone with their imagination.",
        "If someone in your family is facing cancer, honesty shaped with kindness usually helps most. Share what is known, admit what is not, and let everyone — including children — ask their questions. A simple 'we don't know yet, but the doctors are helping us find out' is more comforting than evasion.",
        "Ask what kind of support they actually want. Some want company at appointments; others want the kitchen to smell of normal food and the house to sound of ordinary life. Following their lead is itself a form of care.",
        "And if you are the one carrying the diagnosis, you are allowed to set the pace. Telling people is not an obligation you owe everyone at once — it is a conversation you can have when you are ready."
      ]
    },
    caregiver: {
      cat: 'Family Support',
      mins: '4 min read',
      title: 'Caring for the caregiver: small practices that sustain',
      paras: [
        "Caregivers are the quiet infrastructure of cancer care. They cook, remember, drive, wait and worry — often while managing jobs and households. Their wellbeing is not a luxury; it is what keeps the whole household standing.",
        "Small practices sustain: sleep before screens, one daily walk, one honest conversation with someone outside the situation. Accepting specific help — 'can you take Amma to Tuesday\'s appointment?' — works far better than 'I\'m fine.'",
        "Guilt is the caregiver\'s most common companion, and it deserves a direct answer: resting is not abandoning. You cannot pour from an empty cup, and the person you care for needs you durable, not heroic.",
        "If the weight grows heavy, speak to your own doctor or a counsellor, and let BCCO\'s volunteers share the load. Asking for help is not failure — it is part of the care."
      ]
    }
  };

  /* ==========================================================================
     4. Client-side Routing
     ========================================================================== */
  const ROUTES = {
    home: { t: 'Bihar Cancer Care Organisation | Care • Hope • Life' },
    cancer: { t: 'Know Your Cancer | Bihar Cancer Care Organisation' },
    certificates: { t: 'Registration Certificates | Bihar Cancer Care Organisation' },
    careers: { t: 'Careers & Volunteering | Bihar Cancer Care Organisation' },
    news: { t: 'Media & News | Bihar Cancer Care Organisation' },
    team: { t: 'Our Team & Board of Advisors | Bihar Cancer Care Organisation' },
    contact: { t: 'Contact Us | Bihar Cancer Care Organisation' }
  };
  let currentRoute = null;

  function route() {
    const h = (location.hash || '#/home').replace(/^#/, '');
    let page = 'home', sect = null;

    if (h.charAt(0) === '/') {
      const p = h.slice(1).split('/');
      if (p[0]) page = p[0];
      sect = p[1] || null;
    } else if (h) {
      sect = h; // Fallback for plain anchors
    }

    // Direct alias for Board of Advisors section
    if (page === 'advisory' || page === 'board-of-advisors' || (page === 'team' && sect === 'advisory')) {
      page = 'home';
      sect = 'home-advisory';
    }

    if (!ROUTES[page] || !doc.getElementById('page-' + page)) {
      page = 'home';
    }

    const isPageSwitch = currentRoute !== page;

    if (isPageSwitch) {
      $$('.page').forEach(pg => pg.classList.remove('is-active'));
      const activePg = doc.getElementById('page-' + page);
      if (activePg) activePg.classList.add('is-active');
      currentRoute = page;
      doc.title = ROUTES[page].t;
      if (!sect) window.scrollTo(0, 0);
    } else if (!sect) {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    }

    // Update nav link active status
    $$('.nav__link').forEach(l => {
      const r = l.dataset.route;
      const isActive = (sect === 'home-advisory' && r === 'home-advisory') ||
                       (sect !== 'home-advisory' && r === page);
      l.classList.toggle('is-active', isActive);
    });

    closeMenu();

    if (sect) {
      setTimeout(() => {
        const target = doc.getElementById(sect);
        if (target) {
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        }
      }, isPageSwitch ? 120 : 30);
    }
  }

  window.addEventListener('hashchange', route);

  // Link click handlers
  doc.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#/"]');
    if (a && a.getAttribute('href') === location.hash) {
      e.preventDefault();
      route();
    }
    const pos = e.target.closest('[data-pos]');
    if (pos) {
      setTimeout(() => {
        const s = $('#cPos');
        if (s) s.value = pos.dataset.pos;
      }, 400);
    }
  });

  const skipLink = $('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', e => {
      e.preventDefault();
      const m = $('#main');
      if (m) {
        m.setAttribute('tabindex', '-1');
        m.focus({ preventScroll: true });
        m.scrollIntoView();
      }
    });
  }

  route();

  /* ==========================================================================
     5. Scroll Progress, Navbar & Back to Top
     ========================================================================== */
  const nav = $('#navbar');
  const toTop = $('#toTop');
  const bar = $('#progressBar');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 24);
    if (toTop) toTop.classList.toggle('show', y > 640);
    if (bar) {
      const h = root.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ==========================================================================
     6. Mobile Navigation Menu
     ========================================================================== */
  const menuBtn = $('#menuBtn');
  const mmenu = $('#mobileMenu');

  function openMenu() {
    body.classList.add('menu-open');
    if (mmenu) mmenu.classList.add('open');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Close menu');
    }
  }

  function closeMenu() {
    if (!body.classList.contains('menu-open')) return;
    body.classList.remove('menu-open');
    if (mmenu) mmenu.classList.remove('open');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      body.classList.contains('menu-open') ? closeMenu() : openMenu();
    });
  }
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', closeMenu));

  /* ==========================================================================
     7. Scroll Reveals (IntersectionObserver)
     ========================================================================== */
  $$('[data-stagger]').forEach(p => {
    const step = parseInt(p.dataset.stagger, 10) || 90;
    $$('.reveal', p).forEach((el, i) => el.style.setProperty('--d', (i * step) + 'ms'));
  });

  const revealEls = $$('.reveal, .rl-parent, .reveal-img, .journey, .smartphones-stage');
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(es => {
      es.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* ==========================================================================
     8. Animated Stat Counters
     ========================================================================== */
  function runCount(el) {
    const target = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    const fmt = v => v.toLocaleString('en-IN') + suffix;
    if (reduced || target === 0) {
      el.textContent = fmt(target);
      return;
    }
    const dur = 1600;
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  const cEls = $$('[data-count]');
  if (reduced || !('IntersectionObserver' in window)) {
    cEls.forEach(runCount);
  } else {
    const cio = new IntersectionObserver(es => {
      es.forEach(en => {
        if (en.isIntersecting) {
          runCount(en.target);
          cio.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    cEls.forEach(el => cio.observe(el));
  }

  /* ==========================================================================
     9. Subnav Scroll-spy (Know Your Cancer)
     ========================================================================== */
  const chips = $$('.schip');
  if (chips.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(es => {
      es.forEach(en => {
        if (en.isIntersecting) {
          chips.forEach(c => c.setAttribute('aria-current', c.dataset.sect === en.target.id ? 'true' : 'false'));
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    $$('#page-cancer section[id]').forEach(s => spy.observe(s));
  }

  /* ==========================================================================
     10. FAQ Accordion
     ========================================================================== */
  $$('.faq-item').forEach(item => {
    const btn = $('.faq-q', item);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      $$('.faq-item.open').forEach(o => {
        if (o !== item) {
          o.classList.remove('open');
          const q = $('.faq-q', o);
          if (q) q.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ==========================================================================
     11. Accessible Modals with Focus Trap
     ========================================================================== */
  const donateModal = $('#donateModal');
  const readerModal = $('#readerModal');
  const docModal = $('#docModal');
  let lastFocus = null;

  function openModal(m) {
    if (!m) return;
    lastFocus = doc.activeElement;
    m.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add('open')));
    body.classList.add('modal-open');
    setTimeout(() => {
      const f = $('button, input, select, textarea, [tabindex]:not([tabindex="-1"])', m);
      if (f) f.focus();
    }, 90);
  }

  function closeModal(m) {
    if (!m) return;
    m.classList.remove('open');
    body.classList.remove('modal-open');
    setTimeout(() => {
      m.hidden = true;
      if (lastFocus) lastFocus.focus();
    }, 320);
  }

  window.addEventListener('keydown', e => {
    const open = $('.modal:not([hidden])');
    if (!open) return;
    if (e.key === 'Escape') {
      closeModal(open);
    }
    if (e.key === 'Tab') {
      const f = $$('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])', open)
        .filter(el => !el.disabled && el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && doc.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  });

  /* ==========================================================================
     12. Global Click Delegation
     ========================================================================== */
  doc.addEventListener('click', e => {
    const closer = e.target.closest('[data-close]');
    if (closer) {
      const m = closer.closest('.modal');
      if (m && !m.hidden) closeModal(m);
      return;
    }
    const d = e.target.closest('[data-open-donate]');
    if (d) {
      e.preventDefault();
      closeMenu();
      openModal(donateModal);
      return;
    }
    const art = e.target.closest('[data-article]');
    if (art) {
      e.preventDefault();
      openReader(art.dataset.article);
      return;
    }
    const dc = e.target.closest('[data-doc]');
    if (dc) {
      e.preventDefault();
      openDoc(dc);
      return;
    }
    const t = e.target.closest('[data-toast]');
    if (t) {
      e.preventDefault();
      showToast(t.dataset.toast);
    }
  });

  function openReader(slug) {
    const a = ARTICLES[slug];
    if (!a || !readerModal) return;
    const cat = $('#readerCat');
    const title = $('#readerTitle');
    const meta = $('#readerMeta');
    const bodyEl = $('#readerBody');
    if (cat) cat.textContent = a.cat;
    if (title) title.textContent = a.title;
    if (meta) meta.textContent = a.mins + ' · Educational guide';
    if (bodyEl) bodyEl.innerHTML = a.paras.map(p => '<p>' + p + '</p>').join('');
    openModal(readerModal);
  }

  function openDoc(btn) {
    if (!docModal) return;
    const card = btn.closest('.doc');
    const title = $('#docTitle');
    if (title) title.textContent = card ? card.querySelector('h3').textContent : '[Certificate]';
    openModal(docModal);
  }

  /* ==========================================================================
     13. Donation Modal Controls (Preview Only)
     ========================================================================== */
  if (donateModal) {
    $$('.amt', donateModal).forEach(chip => {
      chip.addEventListener('click', () => {
        $$('.amt', donateModal).forEach(c => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        const custom = $('#amtCustom');
        if (custom) custom.value = '';
      });
    });

    const amtCustom = $('#amtCustom');
    if (amtCustom) {
      amtCustom.addEventListener('input', () => {
        $$('.amt', donateModal).forEach(c => c.setAttribute('aria-pressed', 'false'));
      });
    }

    $$('.seg button', donateModal).forEach(b => {
      b.addEventListener('click', () => {
        $$('.seg button', donateModal).forEach(x => x.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', 'true');
      });
    });

    const gatewayBtn = $('#gatewayBtn');
    if (gatewayBtn) {
      gatewayBtn.addEventListener('click', () => {
        const note = $('#gatewayNote');
        if (note) {
          note.classList.remove('show');
          void note.offsetWidth;
          note.classList.add('show');
        }
      });
    }
  }

  /* ==========================================================================
     14. Toast Notification & Clipboard Copy
     ========================================================================== */
  const toast = $('#toast');
  let toastTimer;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
  }

  doc.addEventListener('click', e => {
    const copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) {
      const textToCopy = copyBtn.getAttribute('data-copy');
      if (textToCopy) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Copied to clipboard: ${textToCopy}`);
          }).catch(() => {
            showToast(`Copied: ${textToCopy}`);
          });
        } else {
          showToast(`Copied: ${textToCopy}`);
        }
      }
    }
  });

  /* ==========================================================================
     15. Form Validation & Submissions (with fetch to contact.php)
     ========================================================================== */
  function validateForm(form) {
    let ok = true, first = null;
    $$('input, select, textarea', form).forEach(field => {
      if (field.type === 'file' || field.name === 'website') return;
      const wrap = field.closest('.field');
      if (!wrap) return;
      const err = $('.field__err', wrap);
      const val = field.value.trim();
      let bad = false;
      if (field.required && !val) bad = true;
      if (val && field.type === 'email') bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (val && field.dataset.type === 'phone') bad = !/^[+\d][\d\s-]{6,17}$/.test(val);
      wrap.classList.toggle('has-err', bad);
      if (err) err.textContent = bad ? (field.dataset.msg || 'Please complete this field.') : '';
      if (bad) {
        ok = false;
        if (!first) first = field;
      }
    });
    if (first) first.focus();
    return ok;
  }

  // CV File Upload Validation
  const cvIn = $('#cvFile');
  let cvOK = false;
  if (cvIn) {
    const nameEl = $('#cvName'), errEl = $('#cvErr'), box = $('#cvBox'), DEF = 'No file chosen yet';
    cvIn.addEventListener('change', () => {
      const f = cvIn.files && cvIn.files[0];
      if (!f) {
        cvOK = false;
        if (nameEl) nameEl.textContent = DEF;
        if (errEl) errEl.textContent = '';
        if (box) box.classList.remove('has-err');
        return;
      }
      const okType = /\.(pdf|docx?|odt)$/i.test(f.name) || /pdf|msword|wordprocessingml/.test(f.type);
      const okSize = f.size <= 5 * 1024 * 1024;
      if (nameEl) nameEl.textContent = f.name;
      if (okType && okSize) {
        cvOK = true;
        if (errEl) errEl.textContent = '';
        if (box) box.classList.remove('has-err');
      } else {
        cvOK = false;
        if (box) box.classList.add('has-err');
        if (errEl) {
          errEl.textContent = !okType
            ? 'Please attach a PDF or Word document.'
            : 'That file is larger than 5 MB — please attach a smaller copy.';
        }
      }
    });
  }

  // Handle all forms
  $$('form[data-validate]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validateForm(form)) return;

      if (form.id === 'careersForm' && !cvOK) {
        const cvErr = $('#cvErr');
        const cvBox = $('#cvBox');
        if (cvErr) cvErr.textContent = 'Please attach your CV to complete the application.';
        if (cvBox) cvBox.classList.add('has-err');
        if (cvIn) cvIn.focus();
        return;
      }

      // Check if it's the donation form preview
      if (form.closest('#donateModal')) {
        const note = $('#gatewayNote');
        if (note) {
          note.classList.remove('show');
          void note.offsetWidth;
          note.classList.add('show');
        }
        return;
      }

      const submitBtn = $('button[type="submit"]', form);
      const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
      }

      // Prepare FormData
      const formData = new FormData(form);
      if (form.classList.contains('nl-form')) {
        formData.append('type', 'newsletter');
      } else if (form.id === 'careersForm') {
        formData.append('type', 'careers');
      } else {
        formData.append('type', 'contact');
      }

      try {
        const response = await fetch('contact.php', {
          method: 'POST',
          body: formData
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
          if (form.classList.contains('nl-form')) {
            form.hidden = true;
            const err = $('#nlErr');
            if (err) err.textContent = '';
            const ok = $('#nlOk');
            if (ok) { ok.hidden = false; ok.focus(); }
          } else {
            const ok = form.parentElement.querySelector('.form-ok');
            form.hidden = true;
            if (ok) { ok.hidden = false; ok.focus(); }
          }
        } else {
          const errMsg = data.message || 'We were unable to deliver your message at this moment. Please call our helpline or try again shortly.';
          if (form.classList.contains('nl-form')) {
            const err = $('#nlErr');
            if (err) err.textContent = errMsg;
          } else {
            showToast(errMsg);
          }
        }
      } catch (err) {
        console.error('Submission error:', err);
        showToast('Network error: Unable to submit at this time. Please check your connection or contact our helpline.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnHtml;
        }
      }
    });

    form.addEventListener('input', e => {
      const wrap = e.target.closest('.field');
      if (wrap && wrap.classList.contains('has-err')) {
        wrap.classList.remove('has-err');
        const err = $('.field__err', wrap);
        if (err) err.textContent = '';
      }
    });
  });

  /* ==========================================================================
     16. News / Event Category Filtering
     ========================================================================== */
  $$('.ftab').forEach(t => {
    t.addEventListener('click', () => {
      $$('.ftab').forEach(x => x.setAttribute('aria-pressed', x === t ? 'true' : 'false'));
      const cat = t.dataset.cat;
      $$('#ngrid .ncard').forEach(c => {
        const show = cat === 'all' || c.dataset.cat === cat;
        c.classList.toggle('hide', !show);
        if (show) {
          c.classList.remove('pop');
          void c.offsetWidth;
          c.classList.add('pop');
        }
      });
    });
  });

  /* ==========================================================================
     17. Testimonial Carousel
     ========================================================================== */
  (function () {
    const vp = $('#tstVp');
    const track = $('#tstTrack');
    if (!track) return;
    const slides = $$('.tst__slide', track);
    const dots = $$('.tst__dot');
    let idx = 0, timer = null, hovering = false, visible = false;

    function go(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      dots.forEach((d, j) => d.setAttribute('aria-current', j === idx ? 'true' : 'false'));
    }

    function restart() {
      if (timer) clearInterval(timer);
      if (!reduced) {
        timer = setInterval(() => {
          if (visible && !hovering) go(idx + 1);
        }, 6500);
      }
    }

    const prevBtn = $('#tstPrev');
    const nextBtn = $('#tstNext');
    if (prevBtn) prevBtn.addEventListener('click', () => { go(idx - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { go(idx + 1); restart(); });

    dots.forEach((d, j) => d.addEventListener('click', () => { go(j); restart(); }));

    if (vp) {
      vp.addEventListener('pointerdown', e => {
        const x0 = e.clientX;
        const up = e2 => {
          const dx = e2.clientX - x0;
          if (Math.abs(dx) > 45) {
            go(dx < 0 ? idx + 1 : idx - 1);
            restart();
          }
          window.removeEventListener('pointerup', up);
        };
        window.addEventListener('pointerup', up);
      });
      vp.addEventListener('mouseenter', () => { hovering = true; });
      vp.addEventListener('mouseleave', () => { hovering = false; });
      vp.addEventListener('focusin', () => { hovering = true; });
      vp.addEventListener('focusout', () => { hovering = false; });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(es => {
          es.forEach(en => { visible = en.isIntersecting; });
        }, { threshold: 0.4 }).observe(vp);
      } else {
        visible = true;
      }
    }
    go(0);
    restart();
  })();

  /* ==========================================================================
     18. Magnetic Buttons (Fine pointer & motion allowed only)
     ========================================================================== */
  if (finePointer && !reduced) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transition = 'transform .16s ease-out, box-shadow .3s, background .3s';
        el.style.transform = 'translate(' + (x * 0.18) + 'px,' + (y * 0.24) + 'px)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1), box-shadow .3s, background .3s';
        el.style.transform = '';
      });
    });
  }

  /* ==========================================================================
     19. Subtle Custom Cursor (Desktop with fine pointer only)
     ========================================================================== */
  if (finePointer && !reduced) {
    root.classList.add('has-cursor');
    const dot = $('#cursorDot');
    const ring = $('#cursorRing');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

    window.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    }, { passive: true });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring) ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();

    doc.addEventListener('mouseover', e => {
      const t = e.target.closest('a, button, [role="button"], input, select, textarea, label, .file');
      if (ring) ring.classList.toggle('is-on', !!t);
    });
  }

  /* ==========================================================================
     21. Media & News Category Filtering
     ========================================================================== */
  doc.addEventListener('click', e => {
    const btn = e.target.closest('.media-filter-btn');
    if (!btn) return;
    const filter = btn.dataset.filter || 'all';
    const container = btn.closest('.media-section') || doc;

    container.querySelectorAll('.media-filter-btn').forEach(b => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    const cards = container.querySelectorAll('.media-card');
    cards.forEach(card => {
      const cat = card.dataset.category;
      const match = filter === 'all' || cat === filter;
      if (match) {
        card.classList.remove('is-hidden');
        card.classList.remove('pop-anim');
        void card.offsetWidth;
        card.classList.add('pop-anim');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });

  /* ==========================================================================
     22. Video Modal Lightbox
     ========================================================================== */
  const videoModal = doc.getElementById('videoModal');
  let lastVideoFocusedEl = null;

  function openVideoModal(data) {
    if (!videoModal) return;
    lastVideoFocusedEl = doc.activeElement;

    const titleEl = doc.getElementById('vmodalTitle');
    const descEl = doc.getElementById('vmodalDesc');
    const durationEl = doc.getElementById('vmodalDuration');
    const dateEl = doc.getElementById('vmodalDate');

    if (titleEl) titleEl.textContent = data.title || 'BCCO Video Highlight';
    if (descEl) descEl.textContent = data.desc || 'Bihar Cancer Care Organisation video archive.';
    if (durationEl) durationEl.textContent = data.duration || '3:45';
    if (dateEl) dateEl.textContent = data.date || 'October 2026';

    videoModal.removeAttribute('hidden');
    body.style.overflow = 'hidden';

    const closeBtn = videoModal.querySelector('.vmodal__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeVideoModal() {
    if (!videoModal || videoModal.hasAttribute('hidden')) return;
    videoModal.setAttribute('hidden', '');
    body.style.overflow = '';
    if (lastVideoFocusedEl && typeof lastVideoFocusedEl.focus === 'function') {
      lastVideoFocusedEl.focus();
    }
  }

  doc.addEventListener('click', e => {
    const trigger = e.target.closest('[data-video]');
    if (trigger) {
      e.preventDefault();
      const card = trigger.closest('.media-card') || trigger;
      openVideoModal({
        title: card.dataset.title || trigger.dataset.title,
        desc: card.dataset.desc || trigger.dataset.desc,
        duration: card.dataset.duration || trigger.dataset.duration,
        date: card.dataset.date || trigger.dataset.date
      });
      return;
    }

    if (e.target.closest('[data-close-vmodal]')) {
      e.preventDefault();
      closeVideoModal();
    }
  });

  doc.addEventListener('keydown', e => {
    if (e.key === 'Escape' && videoModal && !videoModal.hasAttribute('hidden')) {
      closeVideoModal();
    }
  });

  /* ==========================================================================
     23. Advisor Card Bio Expansion Toggle
     ========================================================================== */
  doc.addEventListener('click', e => {
    const toggle = e.target.closest('.advisor-card__bio-toggle');
    if (!toggle) return;
    e.preventDefault();
    const card = toggle.closest('.advisor-card');
    if (!card) return;
    const isExpanded = card.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    toggle.innerHTML = isExpanded
      ? `Less Details <svg class="icon" aria-hidden="true" style="width:14px;height:14px"><use href="#i-arrow-up"/></svg>`
      : `Read Bio <svg class="icon" aria-hidden="true" style="width:14px;height:14px"><use href="#i-arrow-r"/></svg>`;
  });

  /* ==========================================================================
     24. CMS Content & Image Hydration (Seamless Dynamic Rendering)
     ========================================================================== */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  async function hydrateFromCMS() {
    let cmsData = null;

    // Try fetching from server API first
    try {
      const res = await fetch('api/content.php', { cache: 'no-cache' });
      if (res.ok) {
        const json = await res.json();
        if (json && json.success) cmsData = json;
      }
    } catch (e) {
      // Continue to local storage fallback
    }

    // Fallback or augment with localStorage
    if (!cmsData) {
      try {
        const localSecs = localStorage.getItem('bcco_cms_sections');
        const localPosts = localStorage.getItem('bcco_cms_posts');
        const localProfs = localStorage.getItem('bcco_cms_profiles');
        if (localSecs || localPosts || localProfs) {
          cmsData = {
            success: true,
            sections: localSecs ? JSON.parse(localSecs) : [],
            posts: localPosts ? JSON.parse(localPosts) : [],
            profiles: localProfs ? JSON.parse(localProfs) : []
          };
        }
      } catch (err) {}
    }

    if (!cmsData) return;

    // Normalize sections into a lookup map
    const secMap = {};
    if (Array.isArray(cmsData.sections)) {
      cmsData.sections.forEach(s => { secMap[s.section_key] = s; });
    } else if (cmsData.sections && typeof cmsData.sections === 'object') {
      Object.assign(secMap, cmsData.sections);
    }
    if (Array.isArray(cmsData.sectionsList)) {
      cmsData.sectionsList.forEach(s => { secMap[s.section_key] = s; });
    }
    if (Array.isArray(cmsData.sections_list)) {
      cmsData.sections_list.forEach(s => { secMap[s.section_key] = s; });
    }

    function cleanImgSrc(url) {
      if (!url) return '';
      return url.trim();
    }

    // 1. Hero Care Photograph (hero_panel)
    const heroSec = secMap.hero_panel;
    if (heroSec && heroSec.image_url && !heroSec.image_url.includes('placeholder')) {
      const heroPanel = $('.hero__panel');
      if (heroPanel) {
        let heroImg = heroPanel.querySelector('.hero__care-img');
        if (!heroImg) {
          heroImg = doc.createElement('img');
          heroImg.className = 'hero__care-img';
          heroPanel.insertBefore(heroImg, heroPanel.firstChild);
        }
        heroImg.src = cleanImgSrc(heroSec.image_url);
        heroImg.alt = heroSec.alt_text || heroSec.title || 'Bihar Cancer Care Organisation Patient Support';
        heroImg.loading = 'eager';
        heroImg.onerror = function() { this.style.display = 'none'; };
        const phTag = heroPanel.querySelector('.ph__tag');
        if (phTag) phTag.style.display = 'none';
      }
    }

    // 2. About Editorial Photograph (about_editorial)
    const aboutSec = secMap.about_editorial;
    if (aboutSec && aboutSec.image_url && !aboutSec.image_url.includes('placeholder')) {
      const aboutBox = $('.about__media .ph--a');
      if (aboutBox) {
        let aboutImg = aboutBox.querySelector('.about__img');
        if (!aboutImg) {
          aboutImg = doc.createElement('img');
          aboutImg.className = 'about__img';
          aboutBox.insertBefore(aboutImg, aboutBox.firstChild);
        }
        aboutImg.src = cleanImgSrc(aboutSec.image_url);
        aboutImg.alt = aboutSec.alt_text || 'Guiding Bihar Cancer Care';
        aboutImg.loading = 'lazy';
        aboutImg.onerror = function() { this.remove(); };
        const phTag = aboutBox.querySelector('.ph__tag');
        if (phTag) phTag.style.display = 'none';
      }
    }

    // 3. Media & News Card Images (media_card_1, media_card_2, media_card_3)
    const mediaSlots = [
      { key: 'media_card_1', selector: '.media-card[data-category="gallery"] .media-card__thumb-wrap' },
      { key: 'media_card_2', selector: '.media-card[data-video]:nth-of-type(1) .media-card__thumb-wrap' },
      { key: 'media_card_3', selector: '.media-card[data-video]:nth-of-type(2) .media-card__thumb-wrap' }
    ];

    mediaSlots.forEach(slot => {
      const sData = secMap[slot.key];
      if (sData && sData.image_url && !sData.image_url.includes('placeholder')) {
        $$(slot.selector).forEach(thumbWrap => {
          let realImg = thumbWrap.querySelector('.media-card__real-img');
          if (!realImg) {
            realImg = doc.createElement('img');
            realImg.className = 'media-card__real-img';
            thumbWrap.insertBefore(realImg, thumbWrap.firstChild);
          }
          realImg.src = cleanImgSrc(sData.image_url);
          realImg.alt = sData.alt_text || sData.title || '';
          realImg.loading = 'lazy';
          realImg.onerror = function() { this.remove(); };
        });
      }
    });

    // 4. Past Highlights Photo Gallery (gallery_1 to gallery_6)
    const galleryItems = $$('#highlights .gal .gitem');
    for (let i = 1; i <= 6; i++) {
      const gSec = secMap['gallery_' + i] || secMap['gallery_item_' + i];
      const gEl = galleryItems[i - 1];
      if (gSec && gEl) {
        if (gSec.image_url && !gSec.image_url.includes('placeholder')) {
          let gImg = gEl.querySelector('.gal__img');
          if (!gImg) {
            gImg = doc.createElement('img');
            gImg.className = 'gal__img';
            gEl.insertBefore(gImg, gEl.firstChild);
          }
          gImg.src = cleanImgSrc(gSec.image_url);
          gImg.alt = gSec.alt_text || gSec.title || 'Past highlight photo';
          gImg.loading = 'lazy';
          gImg.onerror = function() { this.remove(); };
        }
        if (gSec.subtitle || gSec.title) {
          const cap = gEl.querySelector('figcaption');
          if (cap) {
            cap.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-image"/></svg>${escapeHtml(gSec.subtitle || gSec.title)}`;
          }
        }
      }
    }

    // 5. Contact Section Map / Visual (contact_map)
    const mapSec = secMap.contact_map || secMap.contact_map_preview;
    if (mapSec && mapSec.image_url && !mapSec.image_url.includes('placeholder')) {
      const mapBox = $('.mapph');
      if (mapBox) {
        let mapImg = mapBox.querySelector('.map__img');
        if (!mapImg) {
          mapImg = doc.createElement('img');
          mapImg.className = 'map__img';
          mapBox.insertBefore(mapImg, mapBox.firstChild);
        }
        mapImg.src = cleanImgSrc(mapSec.image_url);
        mapImg.alt = mapSec.alt_text || 'BCCO Registered Office Patna';
        mapImg.loading = 'lazy';
        mapImg.onerror = function() { this.remove(); };
      }
    }

    // 6. Partner Logos (partner_1 to partner_4)
    const partnerRow = $('.partner-row');
    if (partnerRow) {
      const partnerEls = partnerRow.querySelectorAll('.partner');
      for (let p = 1; p <= 4; p++) {
        const pSec = secMap['partner_' + p];
        const pEl = partnerEls[p - 1];
        if (pSec && pEl && pSec.image_url) {
          pEl.innerHTML = `<img src="${cleanImgSrc(pSec.image_url)}" class="partner-logo-img" alt="${escapeHtml(pSec.alt_text || pSec.title || 'Partner')}" onerror="this.onerror=null;this.parentElement.innerHTML='<span style=\\'font-weight:600;font-size:13px;color:#5B176F;\\'>${escapeHtml(pSec.title || 'Partner')}</span>';">`;
        }
      }
    }

    // 7. Branding Logos (header_logo, footer_logo)
    if (secMap.header_logo && secMap.header_logo.image_url) {
      const headLogo = $('header .brand-img');
      if (headLogo) {
        headLogo.src = cleanImgSrc(secMap.header_logo.image_url);
        if (secMap.header_logo.alt_text) headLogo.alt = secMap.header_logo.alt_text;
      }
    }
    if (secMap.footer_logo && secMap.footer_logo.image_url) {
      const footLogo = $('footer .brand-img');
      if (footLogo) {
        footLogo.src = cleanImgSrc(secMap.footer_logo.image_url);
        if (secMap.footer_logo.alt_text) footLogo.alt = secMap.footer_logo.alt_text;
      }
    }

    // 8. Profiles (Leadership & Advisors)
    if (Array.isArray(cmsData.profiles) && cmsData.profiles.length > 0) {
      // Hydrate homepage advisory carousel
      const advisoryCards = $$('#home-advisory .track .card');
      const advisors = cmsData.profiles.filter(pr => pr.category === 'advisor' || !pr.category);
      if (advisors.length > 0 && advisoryCards.length > 0) {
        advisoryCards.forEach((card, idx) => {
          const prof = advisors[idx % advisors.length];
          if (!prof) return;
          const nameEl = card.querySelector('.phone-name');
          const roleEl = card.querySelector('.phone-role');
          const avWrap = card.querySelector('.phone-avatar');
          if (nameEl) nameEl.textContent = prof.name;
          if (roleEl) roleEl.textContent = prof.role + (prof.organization ? ' · ' + prof.organization : '');
          if (avWrap && prof.photo_url && !prof.photo_url.includes('avatar-default')) {
            avWrap.innerHTML = `<img src="${cleanImgSrc(prof.photo_url)}" class="phone-avatar-img" alt="${escapeHtml(prof.name)}" onerror="this.onerror=null;this.remove();">`;
          }
        });
      }

      // Hydrate team page
      const teamCards = $$('#page-team #team .mcard');
      const teamMembers = cmsData.profiles.filter(pr => pr.category === 'team');
      if (teamMembers.length > 0 && teamCards.length > 0) {
        teamMembers.forEach((prof, idx) => {
          const card = teamCards[idx];
          if (!card) return;
          const h3 = card.querySelector('h3');
          const role = card.querySelector('.mcard__role');
          const bio = card.querySelector('.mcard__bio');
          const av = card.querySelector('.avatar');
          if (h3) h3.textContent = prof.name;
          if (role) role.textContent = prof.role;
          if (bio && prof.organization) bio.textContent = `${prof.role} at ${prof.organization}. Dedicated to advancing community cancer support and guidance across Bihar.`;
          if (av && prof.photo_url && !prof.photo_url.includes('avatar-default')) {
            av.innerHTML = `<img src="${cleanImgSrc(prof.photo_url)}" class="mcard-avatar-img" alt="${escapeHtml(prof.name)}">`;
          }
        });
      }
    }

    // 9. Dynamic posts into ARTICLES store
    if (Array.isArray(cmsData.posts) && cmsData.posts.length > 0) {
      cmsData.posts.forEach(post => {
        if (!post.slug) return;
        ARTICLES[post.slug] = {
          cat: post.category || 'Patient Guidance',
          mins: '4 min read',
          title: post.title,
          paras: post.content ? post.content.split(/\n\n+/).filter(Boolean) : [post.excerpt || '']
        };
      });
    }
  }

  if (doc.readyState === 'complete') {
    hydrateFromCMS();
  } else {
    window.addEventListener('load', hydrateFromCMS);
  }

})();


