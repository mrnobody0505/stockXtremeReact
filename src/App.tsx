import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Home } from './pages/home';
import { ForgotPassword } from './pages/forgotPassword';
import { SuccessfulSignup } from './pages/successfulSignup';
import { AuthContextProvider } from './context/authContext';
import { ProtectedRoute } from './components/auth/protectedRoute';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/successfulSignup" element={<SuccessfulSignup />} />
            <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
