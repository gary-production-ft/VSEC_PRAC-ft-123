# VSEC Practical Assignments

This repository contains Om Pawar's VSEC practical work, organized by
assignment. It includes front-end exercises, Git and MongoDB practice, REST
APIs, and React applications.

## Repository structure

### [Assignment NO.1](./Assignment%20NO.1/)

Login and form-handling exercises:

- `login.html` and `part_b.html` contain the page layouts and forms.
- `login.css` provides the styling.
- `login.js` contains the browser-side interaction and validation logic.

### [Assignment no. 2_](./Assignment%20no.%202_/)

Git and introductory assignment notes:

- `Git Commands Info` documents commonly used Git commands.
- `Assignment NO. 3` contains the related written exercise.
- `image1.png` and `image2.png` provide supporting screenshots.

### [Assignment No.3](./Assignment%20No.3/)

Interactive marksheet exercise:

- `marksheet.html` defines the marksheet form and page structure.
- `marksheet.css` styles the marksheet interface.
- `marksheet.js` handles calculations and dynamic result updates.

### [Assignment No. 4](./Assignment%20No.%204/)

HTML, CSS, and JavaScript web-page exercise:

- `index.html` is the page markup.
- `style.css` contains the presentation styles.
- `script.js` adds client-side behavior.

### [Assignment NO.5](./Assignment%20NO.5/)

MongoDB query practice:

- `Queries.txt` contains insert, find, update, and delete examples.
- `Queries Result.txt` records representative query results.

### [Assignment  6 (API)](./Assignment%20%206%20(API)/)

Node.js API work split into two parts:

- **API ASSIGNMENT PART A** contains an Express users API, its
  `package.json`, `test.js` entry point, and request/response screenshots for
  GET, POST, PUT, and DELETE operations.
- **API ASSIGNMENT PART B** contains an Express CRUD API backed by MongoDB.
  The implementation is in `src/server.js` and `src/db.js`; MongoDB
  playground files demonstrate database operations.
- Use `.env.example` as the configuration template. Keep local environment
  values in `.env` and never commit credentials.

### [Assignment 7 (React)](./Assignment%207%20(React)/)

React and Vite projects:

- **Assignment 7 Part A** is a TypeScript React portfolio-style application.
  It includes reusable components for navigation, preloading, custom cursor,
  kinetic text, marquee content, WebGL background, editorial sections, hero
  content, galleries, and footer sections. GSAP and Lenis provide animation
  and smooth-scrolling behavior.
- **Assingment 7 Part B** is a JavaScript React/Vite application with a
  portfolio interface, reusable assets, CSS styling, and React Router
  support.
- Both projects include their own `package.json`, Vite configuration, source
  files, public assets, and build/lint scripts.

### Root files

- `Home.html` is the repository-level HTML landing page.
- `.gitignore` excludes dependencies, local environment files, logs, and
  generated build output.

## Running the projects

For a Node.js or React assignment with a `package.json`:

```bash
cd "path/to/project"
npm install
npm run dev
```

For the API projects, use `npm start` where available. For the React projects,
`npm run build` creates a production build and `npm run lint` runs the
configured linter.

## Author

**Om Pawar**
