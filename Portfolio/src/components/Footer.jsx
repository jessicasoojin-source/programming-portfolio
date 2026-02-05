function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} Soojin Lee</p>
        <p className="muted">Built with React + Vite</p>
      </div>
    </footer>
  )
}

export default Footer
