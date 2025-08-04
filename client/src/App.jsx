import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home.jsx";
import Signin from "./routes/signin.jsx";
import Signup from "./routes/signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Application from "./Pages/Application.jsx";
import ResourcesPage from "./Pages/Resources.jsx";
import { UserProvider } from './context/UserContext.jsx';
import ApplicationForm from "./Pages/ApplicationForm.jsx";

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/resources" element={<ResourcesPage/>}/>
        <Route path="/application" element={<Application/>}/>
        <Route path="/apply" element={<ApplicationForm />}/>
        
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
