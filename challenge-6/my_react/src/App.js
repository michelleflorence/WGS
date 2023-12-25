import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import SearchImage from './pages/SearchImage'
import Footer from './components/Footer'
import { faker } from '@faker-js/faker'
import { Comments } from './pages/Comments'
import Clock from './pages/Clock'
import SearchVideo from './pages/SearchVideo'
import Hooks from './pages/Hooks'

const App = () => {
  let comments = [];

  for (let i=0; i<10; i++) {
      
      const comment = {
          name: faker.person.fullName(),
          avatar: faker.image.url(),
          date: faker.date.recent().toLocaleDateString(),
          time: faker.date.recent().toLocaleTimeString(),
          text: faker.lorem.text(),
          day: faker.date.weekday({ abbreviated: true }),
      }
      comments.push(comment)
  }

  return (
    <div>
      <main className='px-10 py-3'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/searchimage' element={<SearchImage />} />
            <Route path='/searchvideo' element={<SearchVideo />}/>
            <Route path='/contact' element={<Contact />} />
            <Route path='/comment' element={<Comments comments={comments}/>}/>
            <Route path='/clock' element={<Clock/>}/>
            <Route path='/hooks' element={<Hooks/>}/>
          </Routes>
        </BrowserRouter>
      </main>
      <footer className='fixed w-full bottom-0 bg-blue-500 text-white py-3 text-center'>
        <Footer />
      </footer> 
    </div>
  )
}

export default App

// if(!localStorage.getItem('data')){
  //   for (let i=0; i<10; i++) {
        
  //       const comment = {
  //           name: faker.person.fullName(),
  //           avatar: faker.image.url(),
  //           date: faker.date.recent().toLocaleDateString(),
  //           time: faker.date.recent().toLocaleTimeString(),
  //           text: faker.lorem.text(),
  //           day: faker.date.weekday({ abbreviated: true }),
  //       }
  //       comments.push(comment)
  //   }
  //   localStorage.setItem('data', JSON.stringify(comments))
  // }
  
// {/* <h1 className='px-10 py-3'>{new Date().toLocaleTimeString()}</h1> */}

// {/* <h2 className='px-10 py-3'>Halo saya {nama} dan pekerjaan saya {pekerjaan}</h2> */}

// {/* <input className='ml-10' type='number' min={5} /> */}

// const Hello = () => {
//   return {name: "Michelle Florence", job: "UI/UX Designer"}
// }

// const Hi = (nama, pekerjaan) => {
//   return nama + ' - ' + pekerjaan;
// }


// const nama = 'Michelle Florence'
// const pekerjaan = 'UI/UX Designer'