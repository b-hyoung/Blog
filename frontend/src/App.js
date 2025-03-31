import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import Navbar from './Header/Navbar.js';
import MainPage from './MainPage/MainPage.js';
import Login from './Login/Login.js';
import SignUpPage from './Login/SignUp/SignUpPage.js';
import Blog from './Blog/Blog.js';
import ReadPost from './Blog/Section/ReadPost/ReadPost.js';
import Post from './Blog/Section/Post/Post.js';

function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname === '/blog' || location.pathname=== '/blog/post' || location.pathname==='/blog/read_post' ?
        <>
        </>
        :
        <Navbar />
      }
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUpPage />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/post' element={<Post />} />
        <Route path='/blog/read_post' element={<ReadPost />} />
      </Routes>
    </div>
  );
}

export default App;
