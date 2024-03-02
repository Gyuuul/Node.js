import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';

export default function route() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<LandingPage/>} />
                </Routes>
            </Router>
        </>
    )
}
