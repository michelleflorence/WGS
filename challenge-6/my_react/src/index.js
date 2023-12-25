import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  Navbar from './components/Navbar'

// ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.render(<Navbar />, document.getElementById('nav'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const nav = ReactDOM.createRoot(document.getElementById('nav'));
nav.render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>
);

reportWebVitals();
