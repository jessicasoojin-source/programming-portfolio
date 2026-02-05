function Home() {
  return (
    <section className="home" id="home">
      <div className="container home__inner">
        <p className="kicker">Designer · Web · Creative</p>
        <h2 className="home__title">
          I design and build clean,<br />
          emotional digital experiences.
        </h2>
        <p className="home__sub">
          Web design, React projects, visual storytelling.
        </p>

        <div className="home__cta">
          <a href="#portfolio" className="btn">View portfolio</a>
          <a href="#contact" className="btn btn--ghost">Contact</a>
        </div>
      </div>
    </section>
  )
}

export default Home
