import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
// import Chat from './Chat/Chat';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
export default function route() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage/>} />
                    {/* <Route path='/chat' element={<Chat/>} /> */}
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/register" element={<RegisterPage/>} />
                </Routes>
            </Router>
        </>
    )
}
