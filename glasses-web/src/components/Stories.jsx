function Stories() {
  const stories = [
    {
      id: 1,
      title: 'Campaign Diary',
      text: 'A visual story exploring minimal eyewear and quiet identity.',
    },
    {
      id: 2,
      title: 'Material Study',
      text: 'Frames designed with balance, clarity, and everyday comfort.',
    },
    {
      id: 3,
      title: 'Studio Mood',
      text: 'Editorial direction inspired by softness, simplicity, and form.',
    },
  ]

  return (
    <section className="stories">
      <div className="container">
        <div className="stories__head">
          <h2 className="stories__title">Stories</h2>
          <p className="stories__sub">
            Editorial moments, campaign notes, and brand visuals.
          </p>
        </div>

        <div className="stories__grid">
          {stories.map((story) => (
            <article className="storyCard" key={story.id}>
              <div className="storyCard__img"></div>

              <div className="storyCard__body">
                <h3 className="storyCard__title">{story.title}</h3>
                <p className="storyCard__text">{story.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stories