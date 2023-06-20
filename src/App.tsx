import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Home } from './pages/home';
import { ForgotPassword } from './pages/forgotPassword';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/forgotPassword" element={<ForgotPassword />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
