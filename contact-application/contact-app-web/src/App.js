import Contact from './pages/Contact'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <main className='px-10 py-3'>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </main>
      <footer className='fixed w-full bottom-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm text-white py-3 text-center'>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
