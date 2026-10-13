/**
 * BCCO CMS Admin JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile sidebar toggle
  const toggleBtn = document.getElementById('mobileSidebarToggle');
  const sidebar = document.querySelector('.admin-sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Auto-slug generator on blog title change
  const titleInput = document.getElementById('postTitle');
  const slugInput = document.getElementById('postSlug');
  if (titleInput && slugInput) {
    titleInput.addEventListener('input', () => {
      if (!slugInput.dataset.manual) {
        slugInput.value = titleInput.value
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
    });
    slugInput.addEventListener('input', () => {
      slugInput.dataset.manual = 'true';
    });
  }

  // Image preview on file selection
  const imgInputs = document.querySelectorAll('input[type="file"][data-preview]');
  imgInputs.forEach(input => {
    input.addEventListener('change', e => {
      const previewId = input.dataset.preview;
      const previewEl = document.getElementById(previewId);
      if (!previewEl) return;

      const file = e.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert('Warning: Selected file exceeds the 5MB size limit.');
          input.value = '';
          return;
        }
        const reader = new FileReader();
        reader.onload = ev => {
          previewEl.src = ev.target.result;
          previewEl.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  });

  // Modal helpers
  window.openModal = function(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('open');
  };

  window.closeModal = function(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('open');
  };

  document.querySelectorAll('.modal-admin').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) m.classList.remove('open');
    });
  });

  // Copy to clipboard helper
  document.querySelectorAll('[data-copy-url]').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.copyUrl;
      navigator.clipboard.writeText(url).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = 'Copied!';
        setTimeout(() => { btn.innerHTML = origText; }, 2000);
      });
    });
  });

  // Delete confirmations
  document.querySelectorAll('[data-confirm]').forEach(el => {
    el.addEventListener('click', e => {
      const msg = el.dataset.confirm || 'Are you sure you want to delete this item?';
      if (!confirm(msg)) {
        e.preventDefault();
      }
    });
  });
});
