function Home() {
  return (
    <section className="home home--bg" id="home">
      {/* 1) VIDEO DE FONDO: va primero para que quede detrás */}
      <video className="home__video" autoPlay muted loop playsInline>
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* 2) CAPA OSCURA SUAVE: mejora la lectura del texto */}
      <div className="home__shade" />

      {/* 3) TU CONTENIDO: queda arriba del video */}
      <div className="container home__grid">
        <div className="home__text">
          <p className="kicker">Trilingual · Design · Web</p>

          <h2 className="home__title">Soojin Lee</h2>

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
  );
}

export default Home;