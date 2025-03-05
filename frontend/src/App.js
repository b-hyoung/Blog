import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './Header/Navbar.js';
import MainPage from './MainPage/MainPage.js';
import Login from './Login/Login.js';
import SignUpPage from './Login/SignUp/SignUpPage.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
