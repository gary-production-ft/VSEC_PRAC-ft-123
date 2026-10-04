import { Link, NavLink, Route, Routes } from 'react-router-dom'

const skills = [
  'React',
  'JavaScript',
  'Python',
  'Flutter',
  'Node.js',
  'MongoDB',
  'AI / ML',
  'LangChain',
  'Git',
  'Docker',
]

function Navigation() {
  return (
    <nav className="navigation">
      <Link className="logo" to="/">
        Om Pawar
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
      </div>
    </nav>
  )
}

function Home() {
  return (
    <>
      <section className="hero">
        <p className="small-heading">FULL-STACK AND AI/ML DEVELOPER</p>
        <h1>Hi, I&apos;m Om Pawar.</h1>
        <p className="intro">
          I build websites, mobile apps, and AI projects. I enjoy learning new
          technology and using it to solve real problems.
        </p>
        <div className="buttons">
          <Link className="button primary-button" to="/projects">
            View my projects
          </Link>
          <Link className="button secondary-button" to="/about">
            Learn about me
          </Link>
        </div>
      </section>

      <section className="simple-section">
        <h2>What can I do?</h2>
        <div className="cards">
          <article className="card">
            <h3>Web development</h3>
            <p>I create responsive websites with React, JavaScript, and Node.js.</p>
          </article>
          <article className="card">
            <h3>AI and machine learning</h3>
            <p>I am learning Python, AI models, and LangChain.</p>
          </article>
          <article className="card">
            <h3>Mobile development</h3>
            <p>I build cross-platform mobile apps using Flutter.</p>
          </article>
        </div>
      </section>
    </>
  )
}

function About() {
  return (
    <section className="page">
      <p className="small-heading">ABOUT ME</p>
      <h1>Nice to meet you!</h1>
      <div className="content">
        <p>
          I am a passionate developer from India. I like to understand how
          things work and then use that knowledge to build useful projects.
        </p>
        <p>
          Right now, I am learning AIML and LangChain. I am also open to
          collaborating on real-world projects.
        </p>
      </div>

      <h2>My skills</h2>
      <div className="skill-list">
        {skills.map((skill) => <span key={skill}>{skill}</span>)}
      </div>

      <a className="button primary-button" href="mailto:ompawar2897@gmail.com">
        Email me
      </a>
    </section>
  )
}

function Projects() {
  return (
    <section className="page">
      <p className="small-heading">MY PROJECTS</p>
      <h1>Things I am building.</h1>
      <div className="project-list">
        <article className="project">
          <p className="project-label">CURRENT PROJECT</p>
          <h2>Smriti Saathi</h2>
          <p>
            A real-world project that I am currently working on.
          </p>
          <a
            className="text-link"
            href="https://smritisathi90.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            Visit Smriti Saathi →
          </a>
        </article>

        <article className="project">
          <p className="project-label">PORTFOLIO WEBSITE</p>
          <h2>Portgary</h2>
          <p>A website where my projects and skills are available.</p>
          <a
            className="text-link"
            href="https://portgary.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            Visit Portgary →
          </a>
        </article>
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section className="page">
      <p className="small-heading">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="button primary-button" to="/">Go back home</Link>
    </section>
  )
}

function App() {
  return (
    <div className="app">
      <Navigation />

      {/* Routes decide which page is shown for the current URL. */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer>
        <p>© 2026 Om Pawar</p>
        <a href="mailto:ompawar2897@gmail.com">ompawar2897@gmail.com</a>
      </footer>
    </div>
  )
}

export default App
