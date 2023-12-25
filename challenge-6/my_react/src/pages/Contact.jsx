import React, { useState } from 'react'
import DetailModal from "../components/DetailModal";

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEMail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [openDetail, setOpenDetail] = useState(false)

  return (
    <div>
      <div className='ui form'>
        <div className='field'>
        <label>
          Name: 
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        </div>
        <div className='field'>
        <label>
          Email: 
          <input type="email" value={email} onChange={(e) => setEMail(e.target.value)}/>
        </label>
        </div>
        <div className='field'>
        <label>
          Phone: 
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </label>
        </div>
        <div className='field'>
        <label>
          Address: 
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
        </label>
        </div>
        <button className='w-20 h-12 bg-green-500 
          text-white rounded-md
          hover:bg-green-300 hover:text-slate-600' onClick={() => setOpenDetail(true)}>Submit</button>
      </div>
      <DetailModal open={openDetail} name={name} address={address} email={email} phone={phone} onClose={() => setOpenDetail(false)} />
    </div>
  );
}

export default Contact

