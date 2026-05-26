/**
 * Prajna Studio - contact form handler
 *
 * Behaviour:
 *  1. Tries to submit the form to Formspree (async).
 *     - To enable: replace the placeholder Formspree endpoint in contact.html
 *       with your real one from https://formspree.io (free tier).
 *       Confirm the email once and submissions land in
 *       prabhuhiremath712@gmail.com.
 *  2. If Formspree is not configured (placeholder still present) OR the
 *     network request fails, falls back to opening the user's mail client
 *     with a prefilled message to prabhuhiremath712@gmail.com.
 */
(function () {
  const TARGET_EMAIL = 'prabhuhiremath712@gmail.com';
  const FORMSPREE_PLACEHOLDER = 'your-form-id';

  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  function setStatus(msg, kind) {
    statusEl.textContent = msg || '';
    statusEl.classList.remove('success', 'error');
    if (kind) statusEl.classList.add(kind);
  }

  function buildMailto(data) {
    const subject = encodeURIComponent('New Prajna Studio enquiry from ' + (data.name || 'website'));
    const lines = [
      'Name: ' + (data.name || ''),
      'Company: ' + (data.company || '-'),
      'Email: ' + (data.email || ''),
      '',
      'Project:',
      data.message || ''
    ];
    return 'mailto:' + TARGET_EMAIL +
           '?subject=' + subject +
           '&body=' + encodeURIComponent(lines.join('\n'));
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
      name:    form.name.value.trim(),
      company: form.company.value.trim(),
      email:   form.email.value.trim(),
      message: form.message.value.trim()
    };

    if (!data.name || !data.email || !data.message) {
      setStatus('Please fill in name, email, and your message.', 'error');
      return;
    }

    // Mirror replyTo so Formspree replies go to the visitor.
    const replyTo = document.getElementById('hiddenReplyTo');
    if (replyTo) replyTo.value = data.email;

    submitBtn.disabled = true;
    setStatus('Sending...');

    const action = form.getAttribute('action') || '';
    const formspreeReady = action && !action.includes(FORMSPREE_PLACEHOLDER);

    if (formspreeReady) {
      try {
        const res = await fetch(action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });

        if (res.ok) {
          form.reset();
          setStatus('Thanks &mdash; your message is on its way to ' + TARGET_EMAIL + '.', 'success');
          statusEl.innerHTML = statusEl.textContent; // allow entity render
          submitBtn.disabled = false;
          return;
        }
        throw new Error('Formspree responded with ' + res.status);
      } catch (err) {
        // fall through to mailto fallback
        console.warn('[contact] Formspree submit failed, using mailto fallback:', err);
      }
    }

    // Fallback: open the user's mail client with a prefilled message.
    window.location.href = buildMailto(data);
    setStatus(
      'Opening your email app to send the message to ' + TARGET_EMAIL + '. ' +
      'If nothing happens, email us directly at ' + TARGET_EMAIL + '.',
      'success'
    );
    submitBtn.disabled = false;
  });
})();
