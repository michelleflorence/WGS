const express = require('express')
const { getContacts, insertContact, updateContact, deleteContact, getContact } = require('../handler/contact.js')

const router = express.Router()

router.get('/', getContacts)
router.post('/', insertContact)
router.put('/:id', updateContact)
router.delete('/:id', deleteContact)
router.get('/:id', getContact)


module.exports = router