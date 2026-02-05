import Header from "./components/Header"
import Home from "./components/Home"
import About from "./components/About"
import Portfolio from "./components/Portfolio"
import Extra from "./components/Extra"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <About />
        <Portfolio />
        <Extra />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
