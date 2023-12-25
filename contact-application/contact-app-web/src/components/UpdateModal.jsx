import React, { useEffect, useState } from "react";
import validator from "validator";

const UpdateModal = ({open, onClose, onUpdateContact, contact}) => {
    const [updateContact, setUpdateContact] = useState({
        'id': '',
        'nama': '',
        'telepon': '',
        'email': '',
        'alamat': ''
    })

    useEffect(() => {
        if(contact) {
            setUpdateContact({
                'id': contact.id || '',
                'nama': contact.nama || '',
                'telepon': contact.telepon || '',
                'email': contact.email || '',
                'alamat': contact.alamat || ''
            })
        }
    }, [contact])

    const [emailValid, setEmailValid] = useState(true)
    const [phoneValid, setPhoneValid] = useState(true)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateContact((prevContact) => ({
          ...prevContact,
          [name]: value,
        }));
    };

    const handleUpdateContact = () => {
        if(validator.isEmail(updateContact.email)){
            setEmailValid(true)
        } else{
            setEmailValid(false)
        }
      
        if(validator.isMobilePhone(updateContact.telepon, 'id-ID')){
            setPhoneValid(true)
        } else{
            setPhoneValid(false)
        }

        if(validator.isEmail(updateContact.email) && validator.isMobilePhone(updateContact.telepon, 'id-ID')){
            onUpdateContact(updateContact);
            onClose();
            setUpdateContact({
                id: '',
                nama: '',
                telepon: '',
                email: '',
                alamat: ''
            })
        } 
    }

    if (!open) {
        return null;
    }

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}>
        
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md w-96 text-center">
        <h1 className="text-2xl text-blue-500 font-semibold mb-4">Update Contact</h1>
        <h1 className='text-red-500 bg-red-200 rounded-md my-3'>{!emailValid && 'Invalid Email Format'}</h1>
        <h1 className='text-red-500 bg-red-200 rounded-md my-3'>{!phoneValid && 'Invalid Mobile Phone Format'}</h1>

        <div className="mb-4">
          <input
            type="nama"
            name="nama"
            placeholder="Nama"
            value={updateContact.nama}
            onChange={handleInputChange}
            className="w-full border rounded-md py-2 px-3"/>
        </div>
        <div className="mb-4">
          <input
            type="telepon"
            name="telepon"
            placeholder="Telepon"
            value={updateContact.telepon}
            onChange={handleInputChange}
            className="w-full border rounded-md py-2 px-3"/>
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={updateContact.email}
            onChange={handleInputChange}
            className="w-full border rounded-md py-2 px-3"/>
        </div>
        <div className="mb-4">
          <input
            type="alamat"
            name="alamat"
            placeholder="Alamat"
            value={updateContact.alamat}
            onChange={handleInputChange}
            className="w-full border rounded-md py-2 px-3"/>
        </div>
        <button
          onClick={handleUpdateContact}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mr-2">
          Update Contact
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default UpdateModal
