import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AddModal from '../components/AddModal';
import UpdateModal from '../components/UpdateModal';
import DetailModal from '../components/DetailModal';

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:3030/contact')
            setContacts(res.data.Data)
        }
        fetchData()
    },[contacts])

    const deleteButton = async (id) => {
        try {
            await axios.delete(`http://localhost:3030/contact/${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    const addButton = async (contact) => {
        try {
            await axios.post('http://localhost:3030/contact', contact)
        } catch (e) {
            console.log(e)
        }
    }

    const updateButton = (contact) => {
        setSelectedContact(contact)
        setOpenUpdate(true)
    }

    const onUpdateContact = async (contact) => {
        try {
            await axios.put(`http://localhost:3030/contact/${contact.id}`, contact)
        } catch (e) {
            console.log(e)   
        }
    } 

    const detailButton = (contact) => {
        setSelectedContact(contact)
        setOpenDetail(true)
    }


  return (
    <div className='flex flex-col items-center justify-center p-8'>
        <div className='mr-auto'>
        <button onClick={() => setOpenAdd(true)} className="inline-flex p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-800 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Add Contact
            </span>
        </button>
        </div>
        <div className='bg-white rounded shadow-md w-full'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm text-center text-white'>Nama</th>
                        <th className='py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm text-center text-white'>Nomor Telepon</th>
                        <th className='py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm text-center text-white'>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id} className='hover:bg-blue-100 '>
                            <td className="py-2 px-4 text-sm text-center">{contact.nama}</td>
                            <td className="py-2 px-4 text-sm text-center">{contact.telepon}</td>
                            <td className="py-2 px-4 text-sm text-center">
                                <button onClick={() => detailButton(contact)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                                    <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Detail
                                    </span>
                                </button>
                                <button onClick={() => updateButton(contact)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                    <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Update
                                    </span>
                                </button>
                                <button onClick={() => deleteButton(contact.id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                    <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Delete
                                    </span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddModal open={openAdd} onAddContact={addButton} onClose={() => setOpenAdd(false)}/>
            <DetailModal open={openDetail} contact={selectedContact} onClose={() => setOpenDetail(false)}/>
            <UpdateModal open={openUpdate} contact={selectedContact} onUpdateContact={onUpdateContact} onClose={() => setOpenUpdate(false)}/>
        </div>
    </div>
  )
}

export default Contact
