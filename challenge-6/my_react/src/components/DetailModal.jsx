import React from 'react'

const DetailModal = ({open, name, email, phone, address, onClose}) => {
    return (
      <div className={`fixed inset-0 flex justify-center items-center ${!open ? 'invisible' : 'visible opacity-90'}`}
        onClick={onClose}>
        <div className='flex rounded-md flex-col px-8 w-100 h-96 bg-blue-500 text-white text-center justify-center gap-10'>
          <div>
            <h1 className='text-2xl'>Name : {name}</h1>
          </div>
          <div>
            <h1 className='text-2xl'>Email : {email}</h1>
          </div>
          <div>
            <h1 className='text-2xl'>Phone : {phone} </h1>
          </div>
          <div>
            <h1 className='text-2xl'>Address : {address} </h1>
          </div>
          <div className='items-center'>
            <button className='bg-red-600 text-white w-20 h-12 
                rounded-md text-xl hover:bg-red-300 
                hover:text-slate-700'>
                    Close
            </button>
          </div>
        </div>
      </div>
    );
  }

export default DetailModal