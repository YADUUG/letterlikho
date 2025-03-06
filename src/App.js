import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AIGenerator from "./pages/AIGenerator";
import LetterTemplate from "./components/LetterTemplate";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/letter-generator" element={<LetterTemplate />} />
          <Route path="/ai-generator" element={<AIGenerator />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;