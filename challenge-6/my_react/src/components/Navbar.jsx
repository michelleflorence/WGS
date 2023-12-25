import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-blue-400 flex flex-row justify-between px-10 py-3 text-white'>
        <a href='/' className='hover:text-gray-300'>Michi's World</a>
        <nav className='flex flex-row gap-5'>
            <a href='/searchimage' className='hover:text-gray-300'>Images</a>
            <a href='/searchvideo' className='hover:text-gray-300'>Videos</a>
            <a href='/contact' className='hover:text-gray-300'>Contact</a>
            <a href='/comment' className='hover:text-gray-300'>Comment</a>
            <a href='/clock' className='hover:text-gray-300'>Clock</a>
            <a href="/hooks" className='hover:text-gray-300'>Hooks</a>
        </nav>
    </div>
  )
}

export default Navbar