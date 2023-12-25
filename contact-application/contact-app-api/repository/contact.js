const query = require("../util/db.js")

const addContactRepo = async (contact) => {
    try {
        const queryText = 'INSERT INTO contacts(nama, telepon, email, alamat) VALUES($1, $2, $3, $4)'

        const value = [contact.nama, contact.telepon, contact.email, contact.alamat]

        const result = await query(queryText, value)

        return result.rows

    } catch (e) {
        console.log(e);
        return null
    }
}

const getAllContactRepo = async () => {
    try {
        const queryText = 'SELECT * FROM contacts ORDER BY id ASC'

        const result = await query(queryText)

        return result.rows
    } catch (e) {
        console.log(e);
        return null
    }
}

const getContactRepo = async (id) => {
    try {
        const queryText = 'SELECT * FROM contacts WHERE id = $1'

        const result = await query(queryText, [id])

        return result.rows[0]
    } catch (e) {
        console.log(e);
        return null
    }
}

const updateContactRepo = async (contact) => {
    try {
        const queryText = 'UPDATE contacts SET nama = $1, telepon = $2, email = $3, alamat = $4 WHERE id = $5'

        const value = [contact.nama, contact.telepon, contact.email, contact.alamat, contact.id]

        const result = await query(queryText, value)

        return result.rows
    } catch (e) {
        console.log(e);
        return null
    }
}

const deleteContactRepo = async (id) => {
    try {
        const queryText = 'DELETE FROM contacts WHERE id = $1'

        const result = await query(queryText, [id])

        return result.rows
    } catch (e) {
        console.log(e);
        return null
    }
}

module.exports = {addContactRepo, getAllContactRepo, getContactRepo, updateContactRepo, deleteContactRepo}