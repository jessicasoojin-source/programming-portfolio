function Home() {
  return (
    <section className="home home--bg" id="home">
      <div className="container home__grid">
        <div className="home__text">
          <p className="kicker">Trilingual · Design · Web</p>

          <h2 className="home__title">
            Soojin Lee
          </h2>

          <p className="home__sub">
            Portfolio — web design, React projects, and visual storytelling.
          </p>

          <div className="home__cta">
            <a className="btn" href="#portfolio">View portfolio</a>
            <a className="btn btn--ghost" href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
