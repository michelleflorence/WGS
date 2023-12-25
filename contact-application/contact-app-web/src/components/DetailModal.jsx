import React from 'react';

const DetailModal = ({ open, onClose, contact}) => {
  

  if (!open) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}>
        
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md w-96 text-center">
        <h1 className="text-2xl text-blue-500 font-semibold mb-4">{contact?.nama}</h1>
        <h1 className="text-2xl text-blue-500 font-semibold mb-4">{contact?.telepon}</h1>
        <h1 className="text-2xl text-blue-500 font-semibold mb-4">{contact?.email}</h1>
        <h1 className="text-2xl text-blue-500 font-semibold mb-4">{contact?.alamat}</h1>

        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailModal;