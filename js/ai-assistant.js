/**
 * Bihar Cancer Care Organisation (BCCO) - AI Care Assistant & Web Knowledge Bot
 * Real-time oncology guidance, live internet medical retrieval, and local Bihar support.
 */

(function () {
  "use strict";

  const trigger = document.getElementById('floatingAiTrigger');
  const widget = document.getElementById('bccoAiWidget');
  const closeBtn = document.getElementById('bccoAiCloseBtn');
  const clearBtn = document.getElementById('bccoAiClearBtn');
  const bodyEl = document.getElementById('bccoAiBody');
  const form = document.getElementById('bccoAiForm');
  const input = document.getElementById('bccoAiInput');
  const chips = document.getElementById('bccoAiChips');

  if (!trigger || !widget || !bodyEl || !form || !input) return;

  // Local verified knowledge base for Bihar & BCCO
  const LOCAL_KNOWLEDGE = [
    {
      keywords: ['helpline', 'phone', 'contact', 'call', 'number', 'mobile', 'whatsapp', 'sampark'],
      title: 'BCCO Official Helpline & Support',
      answer: "You can reach the Bihar Cancer Care Organisation (BCCO) directly through our verified helplines:\n\n• **Primary Helpline & WhatsApp:** [+91 94318 93358](tel:+919431893358)\n• **Office Landline:** [+91 612 3573290](tel:+916123573290)\n• **Official Email:** [bccoofficial01@gmail.com](mailto:bccoofficial01@gmail.com)\n• **Address:** Ward No. 8, Satyabha Niwas, IAS Nagar, Beside Patel Bhawan, Police Headquarters, Patna - 800023.",
      source: 'Verified BCCO Official Records',
      action: { type: 'whatsapp', text: 'Chat on WhatsApp', phone: '+919431893358' }
    },
    {
      keywords: ['address', 'office', 'location', 'patna', 'patel bhawan', 'where is bcco', 'kaha'],
      title: 'BCCO Registered Office Location',
      answer: "Bihar Cancer Care Organisation is headquartered in Patna:\n\n**Address:**\nWard No. 8, Satyabha Niwas, IAS Nagar, Beside Patel Bhawan, Police Headquarters, Patna, Bihar - 800023, India.\n\nFamilies and caregivers are welcome to visit our counseling team for guidance on cancer diagnosis and treatment paths.",
      source: 'BCCO Administrative Registry'
    },
    {
      keywords: ['hospital', 'doctor', 'aiims', 'mahavir', 'igims', 'pmch', 'treatment', 'patna hospital', 'aspataal', 'center'],
      title: 'Major Cancer Hospitals & Centers in Bihar',
      answer: "Key specialized oncology centers in Patna and Bihar include:\n\n1. **Mahavir Cancer Sansthan & Research Centre:** Phulwarisharif, Patna — Large comprehensive charitable cancer hospital.\n2. **AIIMS Patna (All India Institute of Medical Sciences):** Phulwarisharif, Patna — Premier central institute with medical, surgical, and radiation oncology.\n3. **IGIMS (Indira Gandhi Institute of Medical Sciences):** Sheikhpura, Patna — State Cancer Institute with advanced radiotherapy, PET-CT, and surgical oncology.\n4. **PMCH (Patna Medical College & Hospital):** Ashok Rajpath, Patna.\n\nBCCO volunteers provide patient navigation and counseling to ensure families reach the right department without delay.",
      source: 'Bihar Directorate of Health Services'
    },
    {
      keywords: ['ayushman', 'pmjay', 'scheme', 'financial', 'paisa', 'cost', 'fund', 'free', 'yojana', 'rahat kosh'],
      title: 'Government Financial Aid & Schemes in Bihar',
      answer: "Financial support schemes available for cancer patients in Bihar:\n\n1. **Ayushman Bharat (PM-JAY):** Offers cashless cancer treatment up to ₹5,00,000 per family/year at empanelled centers including Mahavir Cancer Sansthan, AIIMS, and IGIMS.\n2. **Bihar Mukhyamantri Chikitsa Rahat Kosh:** Direct state government grant for economically weaker patients undergoing cancer chemotherapy and surgeries.\n3. **Rashtriya Arogya Nidhi (RAN):** Financial assistance for BPL patients receiving treatment at premier government medical institutes.\n\nContact BCCO at **+91 94318 93358** for step-by-step help with hospital empanelment and scheme paperwork.",
      source: 'National Health Authority & Govt of Bihar'
    },
    {
      keywords: ['donate', 'donation', 'dan', 'account', 'ifsc', 'upi', 'tax', '80g', '12a', 'csr'],
      title: 'Donation & Tax Exemption Credentials',
      answer: "Donations to BCCO provide free cancer screening camps, medicines, and counseling for poor families in Bihar:\n\n• **Account Name:** Bihar Cancer Care Organization\n• **Account Number:** 44908340531\n• **Bank & Branch:** State Bank of India (SBI)\n• **IFSC Code:** SBIN0009004\n• **UPI ID:** biharcancercareorganisation@sbi\n• **Tax Benefit:** 12A and 80G Certified (Donations eligible for tax exemption under IT Act)\n• **CSR Registration:** CSR00107875 | **PAN:** AAQAB0546B",
      source: 'BCCO Financial Registry'
    },
    {
      keywords: ['symptom', 'lakshan', 'warning signs', 'sign', 'early detection', 'caution', 'cancer kaise'],
      title: 'Warning Signs of Cancer (CAUTION Criteria)',
      answer: "Key signs that warrant early medical evaluation:\n\n• **C** - Change in bowel or bladder routine\n• **A** - A non-healing ulcer, mouth sore, or white patch lasting > 2 weeks\n• **U** - Unusual bleeding, discharge, or hemoptysis\n• **T** - Thickening or painless lump in breast, neck, or groin\n• **I** - Indigestion, difficulty swallowing, or feeling full quickly\n• **O** - Obvious change in the size, shape, or color of a mole\n• **N** - Nagging cough or persistent hoarseness\n• Unexplained rapid weight loss or persistent fatigue\n\n*Note: These symptoms do not necessarily mean cancer, but an early medical check saves lives.*",
      source: 'World Health Organization (WHO) & Tata Memorial Centre'
    }
  ];

  // Initialize Welcome Message
  function initChat() {
    bodyEl.innerHTML = `
      <div class="ai-msg ai-msg--bot">
        <div class="ai-msg__avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </div>
        <div class="ai-msg__bubble">
          <p><strong>Namaste!</strong> I am the <strong>BCCO Care AI Assistant</strong>.</p>
          <p>I can help answer your questions about cancer symptoms, hospital guidance in Bihar, government schemes (Ayushman Bharat), or find medical knowledge directly from the web.</p>
          <p style="font-size:0.85em; opacity:0.85; margin-bottom:0;">Feel free to choose a topic below or type your question in English, Hindi, or Hinglish.</p>
        </div>
      </div>
    `;
  }

  initChat();

  // Widget Toggle Controls
  function openWidget() {
    widget.removeAttribute('hidden');
    widget.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    input.focus();
  }

  function closeWidget() {
    widget.classList.remove('is-open');
    widget.setAttribute('hidden', '');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  }

  trigger.addEventListener('click', () => {
    if (widget.hasAttribute('hidden') || !widget.classList.contains('is-open')) {
      openWidget();
    } else {
      closeWidget();
    }
  });

  closeBtn.addEventListener('click', closeWidget);

  clearBtn.addEventListener('click', () => {
    initChat();
    input.focus();
  });

  // Suggestion Chips
  if (chips) {
    chips.addEventListener('click', e => {
      const chip = e.target.closest('.ai-chip');
      if (!chip) return;
      const q = chip.dataset.query || chip.textContent;
      input.value = q;
      form.dispatchEvent(new Event('submit'));
    });
  }

  // Handle Form Submission
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    // Render User Message
    appendMessage('user', query);
    input.value = '';

    // Show Typing Indicator
    const typingId = showTypingIndicator();

    try {
      const response = await fetchAnswer(query);
      removeTypingIndicator(typingId);
      appendBotResponse(response);
    } catch (err) {
      removeTypingIndicator(typingId);
      appendMessage('bot', "I had difficulty connecting to the medical network. For immediate assistance, please call our 24x7 helpline directly at [+91 94318 93358](tel:+919431893358).", 'Connection Fallback');
    }
  });

  // Answering Pipeline
  async function fetchAnswer(query) {
    const lower = query.toLowerCase();

    // 1. Try Local Verified Knowledge Base
    for (const item of LOCAL_KNOWLEDGE) {
      for (const kw of item.keywords) {
        if (lower.includes(kw)) {
          return {
            title: item.title,
            answer: item.answer,
            source: item.source,
            action: item.action || null
          };
        }
      }
    }

    // 2. Try PHP Backend API endpoint if reachable
    try {
      const res = await fetch(`api/ai.php?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.answer) {
          return {
            title: data.title || 'Medical Knowledge',
            answer: data.answer,
            source: data.source || 'Live Internet Knowledge (Verified Archive)',
            url: data.url || null
          };
        }
      }
    } catch (apiErr) {
      // API unreachable (e.g. GitHub Pages static), continue to live browser search
    }

    // 3. Live Browser Fallback: Query Wikipedia REST API (Full CORS Support)
    try {
      const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`);
      if (searchRes.ok) {
        const searchJson = await searchRes.json();
        if (searchJson?.query?.search?.[0]?.title) {
          const topTitle = searchJson.query.search[0].title;
          const summaryRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topTitle)}`);
          if (summaryRes.ok) {
            const summaryData = await summaryRes.json();
            if (summaryData && summaryData.extract) {
              return {
                title: summaryData.title,
                answer: summaryData.extract,
                source: 'Live Internet Medical Encyclopedia (Wikipedia)',
                url: summaryData.content_urls?.desktop?.page || null
              };
            }
          }
        }
      }
    } catch (wikiErr) {
      // Fallback
    }

    // 4. Default Fallback
    return {
      title: 'BCCO Patient Advisory',
      answer: "Every cancer case is unique and requires proper clinical evaluation, biopsy, and radiological imaging (CT/PET). For guidance on doctors, hospitals in Bihar, or free emotional support, please call the **BCCO Helpline at +91 94318 93358** or send us a WhatsApp message.",
      source: 'BCCO Patient Guidance Protocol',
      action: { type: 'whatsapp', text: 'Chat on WhatsApp (+91 94318 93358)', phone: '+919431893358' }
    };
  }

  function appendMessage(role, text, source) {
    const msg = document.createElement('div');
    msg.className = `ai-msg ai-msg--${role}`;

    const parsedText = formatMarkdown(escapeHtml(text));

    msg.innerHTML = `
      <div class="ai-msg__avatar">
        ${role === 'bot' 
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
        }
      </div>
      <div class="ai-msg__bubble">
        ${parsedText}
        ${source ? `<div class="ai-msg__meta">🌐 ${escapeHtml(source)}</div>` : ''}
      </div>
    `;

    bodyEl.appendChild(msg);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function appendBotResponse(res) {
    const msg = document.createElement('div');
    msg.className = 'ai-msg ai-msg--bot';

    const formattedAnswer = formatMarkdown(escapeHtml(res.answer));
    const titleHtml = res.title ? `<div style="font-weight:700;margin-bottom:6px;color:#250A2E;">${escapeHtml(res.title)}</div>` : '';
    const sourceHtml = res.source ? `
      <div class="ai-msg__meta">
        <span>🌐 Source: ${escapeHtml(res.source)}</span>
        ${res.url ? `<a href="${res.url}" target="_blank" rel="noopener noreferrer" style="color:#5B176F;margin-left:6px;text-decoration:underline;">Read More &rarr;</a>` : ''}
      </div>
    ` : '';

    let actionBtnHtml = '';
    if (res.action && res.action.type === 'whatsapp') {
      actionBtnHtml = `
        <div style="margin-top:10px;">
          <a href="https://wa.me/919431893358?text=Hello%20BCCO,%20I%20have%20a%20question%20regarding:%20${encodeURIComponent(res.title || 'Cancer Support')}" target="_blank" rel="noopener noreferrer" class="btn btn-wa-chat">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.94.55 3.75 1.5 5.28L2 22l4.89-1.46C8.36 21.49 10.12 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.05c-1.63 0-3.17-.46-4.49-1.26l-.32-.2-2.92.87.88-2.85-.21-.34A8.043 8.043 0 0 1 3.95 12c0-4.44 3.61-8.05 8.05-8.05s8.05 3.61 8.05 8.05-3.61 8.05-8.05 8.05z"/></svg>
            ${escapeHtml(res.action.text)}
          </a>
        </div>
      `;
    }

    msg.innerHTML = `
      <div class="ai-msg__avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
      </div>
      <div class="ai-msg__bubble">
        ${titleHtml}
        ${formattedAnswer}
        ${actionBtnHtml}
        ${sourceHtml}
      </div>
    `;

    bodyEl.appendChild(msg);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function showTypingIndicator() {
    const id = 'typing_' + Date.now();
    const ind = document.createElement('div');
    ind.id = id;
    ind.className = 'ai-msg ai-msg--bot';
    ind.innerHTML = `
      <div class="ai-msg__avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
      </div>
      <div class="ai-msg__bubble" style="background:#F8F4FB;">
        <div class="ai-typing">
          <span></span><span></span><span></span>
        </div>
        <small style="color:#718096;font-size:0.75rem;margin-top:4px;display:block;">Retrieving medical &amp; web knowledge...</small>
      </div>
    `;
    bodyEl.appendChild(ind);
    bodyEl.scrollTop = bodyEl.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#5B176F;text-decoration:underline;font-weight:600;">$1</a>')
      .replace(/\n\n+/g, '</p><p>')
      .replace(/\n• /g, '<br>&bull; ')
      .replace(/\n/g, '<br>');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Keyboard Escape listener
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && widget.classList.contains('is-open')) {
      closeWidget();
    }
  });

})();
