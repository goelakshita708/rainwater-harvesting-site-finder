
import React, { useState } from "react";

import { BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import FindSite from "./pages/FindSite";
import Result from "./pages/Result";
import About from "./pages/About";

function App() {
  const [result, setResult] = useState(null);

  const handleSetResult = (data) => {
    setResult(data);

    setTimeout(() => {
      document.getElementById("result")?.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  };

  return (
    <BrowserRouter>
      <header className="header">
        <a href="#home" className="brand">
          <span className="logo">RH</span>
          <span>Rainwater Finder</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#find-site">Find Site</a>
          <a href="#result">Results</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <section id="home">
          <Home />
        </section>

        <section id="find-site">
          <FindSite setResult={handleSetResult} />
        </section>

        <section id="result">
          <Result result={result} />
        </section>

        <section id="about">
          <About />
        </section>
      </main>

      <footer>
        Rainwater Harvesting Site Finder | Student Mini Project
      </footer>
    </BrowserRouter>
  );
}

export default App;
