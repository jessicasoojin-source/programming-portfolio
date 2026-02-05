function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section__head">
          <h2>Contact</h2>
          <p>Let’s work together.</p>
        </div>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Name
            <input placeholder="Your name" />
          </label>

          <label>
            Email
            <input type="email" placeholder="you@email.com" />
          </label>

          <label>
            Message
            <textarea rows="4" placeholder="Tell me about your project" />
          </label>

          <button className="btn">Send</button>
        </form>
      </div>
    </section>
  )
}

export default Contact
