# Portfolio

A static personal portfolio. No framework, no build step, no dependencies.
Download the folder, open `index.html`, and it runs.

---

## File structure

```
portfolio/
├── index.html      markup and page structure
├── styles.css      all styling, in 12 labelled sections
├── script.js       CONFIG block + rendering
├── .gitignore      keeps OS junk and editor folders out of the repo
└── README.md       this file
```

### What each file does

| File | Role |
|---|---|
| `index.html` | The page skeleton: header, hero, projects container, experience, education, skills container, footer. Loads `styles.css` in the head and `script.js` with `defer`. |
| `styles.css` | Every style rule. Numbered sections at the top of the file map to the page. Section 7 holds the projects grid. |
| `script.js` | The `CONFIG` object (links, projects, skills) and the code that renders projects and skills into the page, orders projects by status, handles the avatar fallback, and drives the copy-email button. |

---

## Where to edit things

Open `script.js`. The top of the file is a `CONFIG` object, and almost everything
you'll want to change is in it.

### Links

```js
email:       "Joshualima900@gmail.com",
githubUrl:   "https://github.com/J0shua-afk",
linkedinUrl: "https://www.linkedin.com/in/YOUR-PROFILE",
repoUrl:     "https://github.com/J0shua-afk/Joshua.Lima",
```

`email` feeds the footer address, the `mailto:` link and the copy button at once.
`repoUrl` is the footer's "Source code" link.

### Projects

Each project is one object in the `projects` array:

```js
{
  title: "Smart Home",
  description: "A software-only IoT simulation: ...",
  status: "building",
  technologies: ["Python", "MQTT", "JavaScript"],
  githubUrl: "https://github.com/J0shua-afk/smart-home",
  liveUrl: ""
}
```

| Field | Notes |
|---|---|
| `title` | Project name. |
| `description` | One to two sentences. Leave `""` and no description renders. |
| `status` | `"building"` (yellow glow), `"live"` (green glow), or `""` for no label. |
| `technologies` | Array of strings, joined with a middle dot on the page. |
| `githubUrl` | Repository link. |
| `liveUrl` | Leave `""` and the Live label is plain text. Put a URL in and it becomes a clickable link automatically. |

**Ordering is automatic.** Building first, then Live, then anything unlabelled.
Within a group, entries keep the order you wrote them in. Change a `status` and the
page reorders itself — you never re-sort the array by hand.

**Layout is uniform.** Every project renders as a `row` — title and tech on the
left, description and links on the right, all sharing one left edge, so the
section reads as a single index. One entry can be pinned to the wide display
treatment if you ever want a featured slot:

```js
layout: "lead"    // optional; the default is "row"
```

To add a project, copy any block into the array. To remove one, delete its block.

### Skills

```js
skills: [
  { label: "Languages", items: "Python, C#, C/C++, ..." }
]
```

One object per row. Add, remove or rename rows freely.

### Profile picture

The header shows your initials (`JL`) in a circle until a real photo exists:

1. Save your photo as `assets/profile.jpg`.
2. Square crop; roughly 200×200 px is plenty — it renders at 26 px.

If the file is missing or fails to load, it falls back to the initials silently, so a
broken image icon can never appear.

### Education and hero text

These two live in `index.html` rather than the config, since they're short and
structural. Search the file for:

- `<!-- EDUCATION` — copy an `<li class="edu__item">` block to add a school.
- `<section class="hero` — the bolded part of the sentence is inside `<strong>`.

---


## Quick reference

| I want to change… | Where |
|---|---|
| Header GitHub link | `CONFIG.githubUrl` in `script.js` |
| Header LinkedIn link | `CONFIG.linkedinUrl` in `script.js` |
| Profile photo | `assets/profile.jpg` |
| Project title, description, tech | that project's object in `CONFIG.projects` |
| Project repo or live link | `githubUrl` / `liveUrl` in that object |
| Building / Live label | that project's `status` |
| Project order | change a `status` — sorting is automatic |
| Project layout variant | add `layout:` to that project |
| Skills | `CONFIG.skills` |
| Email address | `CONFIG.email` |
| Footer "Source code" link | `CONFIG.repoUrl` |
| Education | the `<!-- EDUCATION -->` block in `index.html` |
| Hero sentence | the `<section class="hero">` block in `index.html` |
| Colours, type, spacing | the `:root` tokens at the top of `styles.css` |
