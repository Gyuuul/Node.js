import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
// import Chat from './Chat/Chat';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

export default function route() {
    const AuthLandingPage = Auth(LandingPage, null);
    const AuthLoginPage = Auth(LoginPage, false);
    const AuthRegisterPage = Auth(RegisterPage, false);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={ <AuthLandingPage /> } />
                    <Route path="/login" element={ <AuthLoginPage /> }/>
                    <Route path="/register" element={ <AuthRegisterPage /> } />
                </Routes>
            </Router>
        </>
    )
}
