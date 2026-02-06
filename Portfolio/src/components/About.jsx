function About() {
  return (
    <section className="section aboutSplit" id="about">
      <div className="container aboutSplit__grid">
        <div className="aboutSplit__text">
          <h2>About</h2>

          <p className="muted">
            I’m a trilingual creative based in South Korea. I work across design and web,
            and I’m strong at communication — Spanish, English, and Korean.
          </p>

          <div className="aboutPills">
            <span className="pill">Spanish · Native</span>
            <span className="pill">English · Fluent</span>
            <span className="pill">Korean · Working</span>
          </div>

          <div className="aboutBox">
            <h3>Strengths</h3>
            <ul className="list">
              <li>Clear communication & teamwork in multicultural environments</li>
              <li>UI/UX sense + clean visual layout</li>
              <li>Fast learning, consistent iteration</li>
            </ul>
          </div>
        </div>

        <div className="aboutSplit__photo" aria-label="Profile photo" />
      </div>
    </section>
  )
}

export default About
