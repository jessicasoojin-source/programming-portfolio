const projects = [
  {
    id: 1,
    title: "OFFTIME",
    desc: "Upcycled textile brand · Web & storyboard",
    tag: "Team project",
  },
  {
    id: 2,
    title: "OJO Studio",
    desc: "Eyewear brand concept · React UI",
    tag: "Personal",
  },
  {
    id: 3,
    title: "AI Visual Prompts",
    desc: "Prompt design & visual direction",
    tag: "Creative",
  },
]

function Portfolio() {
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section__head">
          <h2>Portfolio</h2>
          <p>Selected work — design & development.</p>
        </div>

        <div className="grid">
          {projects.map((p) => (
            <article className="card" key={p.id}>
              <div className="card__img" />
              <div className="card__body">
                <div className="card__top">
                  <h3>{p.title}</h3>
                  <span className="chip">{p.tag}</span>
                </div>
                <p className="muted">{p.desc}</p>
                <button className="btnSmall" type="button">View</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
