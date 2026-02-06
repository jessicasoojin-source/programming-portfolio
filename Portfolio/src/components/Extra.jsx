const extraWorks = [
  {
    id: 1,
    role: "Interpreter · Translator",
    place: "Events & productions",
    desc: "Worked as a Spanish–English / Spanish–Korean interpreter, supporting communication between international teams during live events and productions.",
    tag: "Languages",
  },
  {
    id: 2,
    role: "Administrative & Coordination Support",
    place: "General administration",
    desc: "Handled coordination tasks, internal communication, and administrative support in multicultural environments.",
    tag: "Work experience",
  },
  {
    id: 3,
    role: "Customer Service & Teamwork",
    place: "Hospitality",
    desc: "Customer-facing experience in fast-paced environments — strong communication, problem-solving, and responsibility.",
    tag: "Background",
  },
]

function Extra() {
  return (
    <section className="section section--muted" id="extra">
      <div className="container">
        <div className="section__head">
          <h2>Extra experience</h2>
          <p>Work beyond web projects — language, communication, and collaboration.</p>
        </div>

        <div className="extraGrid">
          {extraWorks.map((item) => (
            <article className="extraCard" key={item.id}>
              <div className="extraTop">
                <h3>{item.role}</h3>
                <span className="chip">{item.tag}</span>
              </div>
              <p className="extraPlace">{item.place}</p>
              <p className="muted">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Extra
