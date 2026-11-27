import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import "./App.css";

type ThemeMode = "dark" | "light";
type Experience = { period: string; role: string; domain: string; summary: string; highlights: string[]; tags: string[] };
type Project = { category: string; title: string; description: string; highlights: string[]; tags: string[] };
type CaseStudy = {
  status: string;
  title: string;
  takeaway: string;
  diagnosis: string;
  approach: string;
  results?: {
    caption: string;
    columns: string[];
    rows: { run: string; samples: string; throughput: string; errors: string; p95: string }[];
    note: string;
  };
};
type Content = {
  meta: { title: string; description: string };
  nav: { caseStudies: string; about: string; expertise: string; experience: string; projects: string; contact: string };
  controls: { switchToLight: string; switchToDark: string; switchLanguage: string; openMenu: string; closeMenu: string; skip: string; home: string; navigation: string; snapshot: string; portrait: string };
  hero: { eyebrow: string; role: string; headline: string; emphasis: string; intro: string; explore: string; email: string; profileLabel: string; profileLine: string; locationLabel: string; location: string; focusLabel: string; focus: string; yearsLabel: string; years: string };
  caseStudies: { title: string; items: CaseStudy[] };
  about: { label: string; title: string; body: string; note: string; principles: string[]; facts: { label: string; value: string }[] };
  expertise: { label: string; title: string; intro: string; cards: { title: string; body: string; tags: string[] }[] };
  experience: { label: string; title: string; intro: string; items: Experience[] };
  projects: { label: string; title: string; intro: string; source: string; demo: string; openSource: string; items: Project[] };
  contact: { label: string; title: string; body: string; email: string; github: string; linkedin: string; location: string };
  footer: { note: string; top: string };
};

const email = "phuong011999vn@gmail.com";
const github = "https://github.com/thanhphuong080199";
const linkedin = "https://www.linkedin.com/in/thanh-phuong-le-354811282/";
const projectLinks = [
  { github: `${github}/vietguessr`, demo: "https://vietguessr.vercel.app/", mark: "VG" },
  { github: `${github}/calorie-tracker`, demo: undefined, mark: "CT" },
];

function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch { /* Storage may be unavailable. */ }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function App() {
  const { t, i18n } = useTranslation();
  const content = t("content", { returnObjects: true }) as unknown as Content;
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const language = i18n.resolvedLanguage === "vi" ? "vi" : "en";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* Optional preference. */ }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = content.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content.meta.description);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#111610" : "#f6f8f2");
  }, [content.meta.description, content.meta.title, language, theme]);

  const toggleLanguage = () => {
    const next = language === "en" ? "vi" : "en";
    void i18n.changeLanguage(next);
    try { localStorage.setItem("language", next); } catch { /* Optional preference. */ }
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">{content.controls.skip}</a>
      <header className="site-header">
        <div className="header-inner page-width">
          <a className="brand" href="#top" onClick={closeMenu} aria-label={content.controls.home}>
            <span className="brand-mark">TP<span>.</span></span>
            <span className="brand-name">Thanh Phuong Le</span>
          </a>
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label={content.controls.navigation}>
            <a href="#about" onClick={closeMenu}>{content.nav.about}</a>
            <a href="#expertise" onClick={closeMenu}>{content.nav.expertise}</a>
            <a href="#experience" onClick={closeMenu}>{content.nav.experience}</a>
            <a href="#projects" onClick={closeMenu}>{content.nav.projects}</a>
            <a href="#case-studies" onClick={closeMenu}>{content.nav.caseStudies}</a>
            <a href="#contact" onClick={closeMenu}>{content.nav.contact}</a>
          </nav>
          <div className="header-actions">
            <button className="icon-button language-button" type="button" onClick={toggleLanguage} aria-label={content.controls.switchLanguage} title={content.controls.switchLanguage}>
              {language === "en" ? "VI" : "EN"}
            </button>
            <button className="icon-button" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? content.controls.switchToLight : content.controls.switchToDark} title={theme === "dark" ? content.controls.switchToLight : content.controls.switchToDark} aria-pressed={theme === "light"}>
              {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            </button>
            <button className="icon-button mobile-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? content.controls.closeMenu : content.controls.openMenu} aria-expanded={menuOpen}>
              {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero page-width" id="top" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" />{content.hero.eyebrow}</p>
            <p className="hero-role">{content.hero.role}</p>
            <h1 id="hero-heading">{content.hero.headline}<br /><em>{content.hero.emphasis}</em></h1>
            <p className="hero-intro">{content.hero.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#case-studies">{content.hero.explore}<FiArrowUpRight aria-hidden="true" /></a>
              <a className="button button-outline" href={`mailto:${email}`}>{content.hero.email}<FiMail aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-panel" aria-label={content.controls.snapshot}>
            <div className="panel-heading"><span>{content.hero.profileLabel} / 01</span><span className="panel-orbit">✳</span></div>
            <img className="panel-portrait" src={`${import.meta.env.BASE_URL}images/portrait.jpeg`} alt={content.controls.portrait} />
            <div className="panel-line"><span>{content.hero.locationLabel}</span><strong>{content.hero.location}</strong></div>
            <div className="panel-line"><span>{content.hero.focusLabel}</span><strong>{content.hero.focus}</strong></div>
            <div className="panel-line"><span>{content.hero.yearsLabel}</span><strong>{content.hero.years}</strong></div>
            <div className="panel-code" aria-hidden="true">{content.hero.profileLine}</div>
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-heading">
          <div className="page-width section-grid">
            <div className="section-side"><span className="section-index">01 / {content.about.label}</span></div>
            <div className="section-main">
              <h2 id="about-heading">{content.about.title}</h2>
              <p className="lead">{content.about.body}</p>
              <p className="supporting-copy">{content.about.note}</p>
              <div className="principles">{content.about.principles.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="about-facts">{content.about.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</div>
            </div>
          </div>
        </section>

        <section className="section expertise-section" id="expertise" aria-labelledby="expertise-heading">
          <div className="page-width">
            <div className="section-heading"><span className="section-index">02 / {content.expertise.label}</span><div><h2 id="expertise-heading">{content.expertise.title}</h2><p>{content.expertise.intro}</p></div></div>
            <div className="expertise-grid">
              {content.expertise.cards.map((card, index) => (
                <article className="expertise-card" key={card.title}>
                  <span className="card-number">0{index + 1}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <div className="tag-list">{card.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience" aria-labelledby="experience-heading">
          <div className="page-width">
            <div className="section-heading"><span className="section-index">03 / {content.experience.label}</span><div><h2 id="experience-heading">{content.experience.title}</h2><p>{content.experience.intro}</p></div></div>
            <div className="experience-list">
              {content.experience.items.map((item, index) => (
                <article className="experience-item" key={item.period}>
                  <div className="experience-meta"><span className="experience-number">0{index + 1}</span><span>{item.period}</span></div>
                  <div className="experience-body"><p className="experience-domain">{item.domain}</p><h3>{item.role}</h3><p>{item.summary}</p><ul>{item.highlights.map((point) => <li key={point}>{point}</li>)}</ul><div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
          <div className="page-width">
            <div className="section-heading"><span className="section-index">04 / {content.projects.label}</span><div><h2 id="projects-heading">{content.projects.title}</h2><p>{content.projects.intro}</p></div></div>
            <div className="project-grid">
              {content.projects.items.map((project, index) => {
                const links = projectLinks[index];
                return <article className="project-card" key={project.title}>
                  <div className={`project-visual project-visual-${index + 1}`} aria-hidden="true"><span className="visual-grid" /><span className="visual-mark">{links.mark}</span><span className="visual-corner">0{index + 1} / {content.projects.openSource}</span></div>
                  <div className="project-content"><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><ul>{project.highlights.map((point) => <li key={point}>{point}</li>)}</ul><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={links.github} target="_blank" rel="noopener noreferrer">{content.projects.source}<FiArrowUpRight aria-hidden="true" /></a>{links.demo && <a href={links.demo} target="_blank" rel="noopener noreferrer">{content.projects.demo}<FiArrowUpRight aria-hidden="true" /></a>}</div></div>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section className="section case-studies-section" id="case-studies" aria-labelledby="case-studies-heading">
          <div className="page-width">
            <div className="section-heading case-studies-heading">
              <h2 id="case-studies-heading">{content.caseStudies.title}</h2>
            </div>
            <div className="case-study-list">
              {content.caseStudies.items.map(({ status, title, takeaway, diagnosis, approach, results }) => (
                <article className="case-study" key={title}>
                  <p className="case-study-status">{status}</p>
                  <h3>{title}</h3>
                  <p className="case-study-takeaway">{takeaway}</p>
                  <p>{diagnosis}</p>
                  <p>{approach}</p>
                  {results && (
                    <>
                      <table className="case-study-results">
                        <caption>{results.caption}</caption>
                        <thead>
                          <tr>{results.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr>
                        </thead>
                        <tbody>
                          {results.rows.map(({ run, samples, throughput, errors, p95 }) => (
                            <tr key={run}>
                              <th scope="row">{run}</th>
                              <td>{samples}</td>
                              <td>{throughput}</td>
                              <td>{errors}</td>
                              <td>{p95}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="case-study-note">{results.note}</p>
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="page-width contact-inner"><span className="section-index">05 / {content.contact.label}</span><div><h2 id="contact-heading">{content.contact.title}</h2><p>{content.contact.body}</p><div className="contact-links"><a className="button button-primary" href={`mailto:${email}`}><FiMail aria-hidden="true" />{content.contact.email}<FiArrowUpRight aria-hidden="true" /></a><a className="button button-outline" href={github} target="_blank" rel="noopener noreferrer"><FiGithub aria-hidden="true" />{content.contact.github}<FiArrowUpRight aria-hidden="true" /></a><a className="button button-outline" href={linkedin} target="_blank" rel="noopener noreferrer"><FiLinkedin aria-hidden="true" />{content.contact.linkedin}<FiArrowUpRight aria-hidden="true" /></a></div><p className="contact-location">{content.contact.location} · {email}</p></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="page-width"><span>© {new Date().getFullYear()} Thanh Phuong Le <span className="footer-separator">/</span> {content.footer.note}</span><a href="#top">{content.footer.top} ↑</a></div></footer>
    </div>
  );
}

export default App;
