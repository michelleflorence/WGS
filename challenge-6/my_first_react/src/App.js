import React from 'react';
import './index.css';
import Navbar from './navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import ReduxForm from './pages/redux-form';

// Create a function for navigation
function App() {
  return(
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/about"  element={<About/>} />
          <Route path="/contact"  element={<Contact/>} />
          <Route path="/form" element={<ReduxForm/>}/>
        </Routes>
    </Router>
  );
};
export default App
