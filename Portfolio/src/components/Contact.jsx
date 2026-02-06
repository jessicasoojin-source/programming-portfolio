function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section__head">
          <h2>Contact</h2>
          <p>If you’d like to work together, feel free to reach out.</p>
        </div>

        <div className="contactBox">
          <div className="contactItem">
            <span className="contactLabel">Email</span>
            <a href="mailto:jessicasoojin@gmail.com">jessicasoojin@gmail.com</a>
          </div>

          <div className="contactItem">
            <span className="contactLabel">Phone</span>
            <a href="tel:+821017336437">+82 10-1733-6437</a>
          </div>

          <div className="contactItem">
            <span className="contactLabel">Location</span>
            <span>South Korea</span>
          </div>

          <div className="contactItem">
            <span className="contactLabel">GitHub</span>
            <a
              href="https://github.com/jessicasoojin-source"
              target="_blank"
              rel="noreferrer"
            >
              github.com/jessicasoojin-source
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
