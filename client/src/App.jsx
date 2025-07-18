import { useState } from "react";

import "./App.css";

import Home from "./Pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Application from "./Pages/Application.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Application" element={<Application/>}/>
      </Routes>
    </Router>
  );
}

export default App;
