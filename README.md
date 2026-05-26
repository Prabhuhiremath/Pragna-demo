# Prajna Studio &mdash; Demo Site

A small static website for **Prajna Studio** built from the design mockups.
Four pages, dark theme, pink accent, and a working contact form.

## Pages

| Page      | File            |
| --------- | --------------- |
| Home      | `index.html`    |
| About     | `about.html`    |
| Services  | `services.html` |
| Contact   | `contact.html`  |

Shared styles live in `styles/main.css`.
The contact form logic lives in `scripts/contact.js`.

## Run it locally

It's just static HTML &mdash; double-click `index.html`, or serve it with any
static server, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Contact form &rarr; prabhuhiremath712@gmail.com

The form on `contact.html` is wired in two layers:

### 1. Primary: Formspree (recommended)

[Formspree](https://formspree.io) is a free service that forwards form
submissions to your inbox. It works with static sites (no backend needed).

**One-time setup:**

1. Sign up at <https://formspree.io> using **prabhuhiremath712@gmail.com**.
2. Create a new form. Formspree gives you an endpoint that looks like
   `https://formspree.io/f/abcd1234`.
3. Open `contact.html` and replace the placeholder `your-form-id` in the
   form's `action` attribute with your real form id, e.g.:

   ```html
   <form action="https://formspree.io/f/abcd1234" method="POST" ...>
   ```

4. Submit the form once from the live site &mdash; Formspree will send a
   confirmation email to `prabhuhiremath712@gmail.com`. Click the link to
   activate. After that, every submission lands in your Gmail inbox.

### 2. Fallback: `mailto:`

If Formspree is not configured (placeholder still in place) or the network
request fails, the form automatically opens the visitor's email app with a
pre-filled message addressed to `prabhuhiremath712@gmail.com`. So the site
is functional from day one even before you set up Formspree.

## Customising

- Replace the empty team cards on `about.html` with real photos &mdash; just drop
  `<img>` tags inside each `.team-card`.
- Replace placeholder copy on `services.html` with your own service items.
- Brand colour lives in `styles/main.css` under `--accent`.
