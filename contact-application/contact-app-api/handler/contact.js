const { getAllContactRepo, addContactRepo, getContactRepo, updateContactRepo, deleteContactRepo } = require("../repository/contact")
const { failedGetResponse, successGetResponse, successInsertResponse, failedInsertResponse } = require("../util/response")

const insertContact = async (req, res) => {
    const contact = {
        nama: req.body.nama,
        telepon: req.body.telepon,
        email: req.body.email,
        alamat: req.body.alamat
    }

    const data = await addContactRepo(contact)
    if (!data) return failedInsertResponse(res)

    return successInsertResponse(res)
}

const getContacts = async (req, res) => {
    const contacts = await getAllContactRepo()
    if (!contacts) return failedGetResponse(res)
    
    return successGetResponse(res, contacts)
}

const getContact = async (req, res) => {
    const id = req.params.id

    const contact = await getContactRepo(id)
    if(!contact) return failedGetResponse(res)

    return successGetResponse(res, contact)
}

const updateContact = async (req, res) => {
    const id = req.params.id
    const {nama, telepon, email, alamat} = req.body
    const contact = {
        id: id,
        nama: nama,
        telepon: telepon,
        email: email,
        alamat: alamat
    }

    const data = await updateContactRepo(contact)
    if(!data) return failedInsertResponse(res)

    return successInsertResponse(res)
}

const deleteContact = async (req, res) => {
    const id = req.params.id

    await deleteContactRepo(id)   

    return successInsertResponse(res)
}


module.exports = {getContacts, insertContact, deleteContact, updateContact, getContact}