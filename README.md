# Bibhash Lenka — Developer Portfolio

A modern, responsive developer portfolio built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. It showcases my experience, projects, skills, and more, with a polished light/dark theme, scroll-reveal animations, and a working contact form.

🔗 **Live:** _add your deployed URL here_

---

## ✨ Features

- **Light & dark theme** — toggle in the navbar, defaults to dark, remembers your choice (no flash on load).
- **Animated hero** — floating gradient blobs, a live "code editor" intro card, and a shimmering name accent.
- **Stats highlights** — animated count-up of years of experience, products shipped, users reached, and integrations built.
- **Experience timeline** — detailed roles with responsibility bullet points.
- **Categorized skills** — an animated marquee plus a grouped grid (frontend, backend, state & data, testing, tools, etc.).
- **Projects** — sticky-stacking project cards with live demo links.
- **Achievements & Languages** — glowing award cards and animated proficiency bars.
- **Working contact form** — sends email via EmailJS, with validation and toast feedback.
- **Downloadable résumé** — one-click CV download from the hero.
- **Scroll-reveal animations** — lightweight, CSS-based (no heavy animation dependency).
- **SEO-ready** — metadata, custom favicon, and Open Graph friendly.

---

## 🛠️ Tech Stack

| Area | Tech |
|------|------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, SCSS |
| Animations | Lottie, react-fast-marquee, CSS scroll-reveal |
| Icons | react-icons |
| Email | EmailJS (`@emailjs/browser`) |
| Image processing | sharp |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ and npm

### Install & run

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## ⚙️ Configuration

All personal content lives in `utils/data/` so it's easy to edit:

| File | Contents |
|------|----------|
| `personal-data.js` | Name, title, summary, contact info, social links, résumé path |
| `experience.js` | Work history with bullet points |
| `educations.js` | Education history |
| `skills.js` | Marquee skills + categorized skill groups |
| `projects-data.js` | Projects (name, description, tools, links) |
| `achievements.js` | Awards / recognitions |
| `languages.js` | Spoken languages with proficiency |
| `stats.js` | Hero stat counters |

### Contact form (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com/). Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

> When deploying, add these same variables in your hosting provider's environment settings.

### Favicon & profile image

- Replace `public/favicon.jpeg`, then regenerate `app/icon.png` / `app/apple-icon.png`.
- Update the profile image referenced by `personalData.profile` in `utils/data/personal-data.js`.

---

## 🎨 Theming

Theme colors are defined as CSS variables in `app/css/globals.scss` under `[data-theme="dark"]` and `[data-theme="light"]`, exposed to Tailwind via `@theme`. Brand accent colors (teal / pink / violet) stay consistent across both themes. To tweak the palette, edit those variable blocks.

---

## 📦 Deployment

This app deploys cleanly to **Vercel**, **Netlify**, or **Railway**. Remember to set the EmailJS environment variables in your host's dashboard.

---

## 📄 License

Released under the MIT License.

---

Made with ❤️ by **Bibhash Lenka**
