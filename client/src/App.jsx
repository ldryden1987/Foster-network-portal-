import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home.jsx";
import Signin from "./routes/signin.jsx";
import Signup from "./routes/signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Application from "./Pages/Application.jsx";
import ResourcesPage from "./Pages/Resources.jsx";
import AboutUs from "./Pages/AboutUs.jsx"
import { UserProvider } from './context/UserContext.jsx';
import Dashboard from './Pages/Dashboard.jsx'
import ApplicationForm from "./Pages/ApplicationForm.jsx";
import Animals from "./routes/Animals.jsx";

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/resources" element={<ResourcesPage/>}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/application" element={<Application/>}/>
        <Route path="/apply" element={<ApplicationForm />}/>
        <Route path="/animals" element={<Animals/>}/>
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
