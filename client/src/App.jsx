import { useState } from "react";

import "./App.css";

import Home from "./Pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
