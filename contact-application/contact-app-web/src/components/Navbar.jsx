import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 text-sm text-center flex flex-row justify-between px-10 py-3 text-white'>
        <a href='/' className='hover:text-gray-300'>Michi's World</a>
        <nav className='flex flex-row gap-5'>
            <a href='/contact' className='hover:text-gray-300'>Contact</a>
        </nav>
    </div>
  )
}

export default Navbar