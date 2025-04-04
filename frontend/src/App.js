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
import useTokenStore from './store/tokenStore.js';

function App() {
  const location = useLocation()
  const token = useTokenStore((state) => state.accessToken);

  return (
    <div className="App">
      {location.pathname.startsWith('/blog') ? null : <Navbar />}
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUpPage />} />
        {token && (
          <>
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/post' element={<Post />} />
            <Route path='/blog/read_post' element={<ReadPost />} />
            <Route path='/blog/edit/:postId' element={<Post />} />
          </>
        )}
        <Route path='*' element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
