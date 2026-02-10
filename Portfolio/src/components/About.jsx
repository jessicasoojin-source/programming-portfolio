export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__container">

        {/* HEADER */}
        <header className="about__header">
          <h2 className="about__title">About</h2>

          <p className="about__intro">
            I’m a trilingual creative based in South Korea. I work across web design,
            visual design, and digital content, and I enjoy building clean,
            user-focused experiences with a calm, emotional touch.
          </p>

          <div className="about__chips">
            <span className="chip">Spanish · Native</span>
            <span className="chip">English · Fluent</span>
            <span className="chip">Korean · Working</span>
          </div>
        </header>

        {/* GRID */}
        <div className="about__grid">

          {/* LEFT COLUMN – ALL CONTENT */}
          <div className="about__content">

            <div className="card">
              <h3 className="card__title">Strengths</h3>
              <ul className="list">
                <li>Clear communication & teamwork in multicultural environments</li>
                <li>UI/UX sense + clean visual layout</li>
                <li>Fast learning, consistent iteration</li>
                <li>Strong attention to detail</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="card__title">How I work</h3>
              <p className="card__text">
                I value clarity and structure. I collaborate well, iterate through
                feedback, and build step by step with intention.
              </p>
            </div>

            <div className="card">
              <h3 className="card__title">Skills & Tools</h3>

              <div className="tags">
                <p className="tags__label">Web</p>
                <div className="tags__row">
                  <span className="tag">HTML</span>
                  <span className="tag">CSS</span>
                  <span className="tag">JavaScript (basic)</span>
                  <span className="tag">React (basic)</span>
                </div>

                <p className="tags__label">Design</p>
                <div className="tags__row">
                  <span className="tag">Figma</span>
                  <span className="tag">Photoshop</span>
                  <span className="tag">Illustrator</span>
                </div>

                <p className="tags__label">Video / Motion</p>
                <div className="tags__row">
                  <span className="tag">Premiere Pro</span>
                  <span className="tag">After Effects (basic)</span>
                </div>

                <p className="tags__label">Workflow</p>
                <div className="tags__row">
                  <span className="tag">VS Code</span>
                  <span className="tag">Git</span>
                  <span className="tag">GitHub</span>
                </div>

                <p className="tags__label">AI</p>
                <div className="tags__row">
                  <span className="tag">Midjourney</span>
                  <span className="tag">AI image/video tools</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN – PHOTO ONLY */}
          <div className="about__image">
            <div className="photoBox" aria-label="Profile image placeholder"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
