import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home.jsx";
import Signin from "./routes/signin.jsx";
import Signup from "./routes/signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResourcesPage from "./Pages/Resources.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/resources" element={<ResourcesPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
