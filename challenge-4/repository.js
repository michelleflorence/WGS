const Pool = require('pg').Pool
require('dotenv').config()
const util = require('util')

// Buat wadah/pool untuk menampung username, db, password, host, port
const pool = new Pool({
    user: process.env.USERNAME_DB,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,
})

const query = util.promisify(pool.query).bind(pool)

exports.addContact = async (contact) => { 
    try{
        // Mengambil index array ke 1, 2, 3, 4
        const queryText = 'INSERT INTO contacts(email, name, phone, address) VALUES($1, $2, $3, $4);'
        const values = [contact.email, contact.name, contact.phone, contact.address]

        const result = await query(queryText, values)
        return result.rows
    } catch(e){
        console.log(e)
        return null
    }
 }

 exports.getAllContact = async () => {
    try {
        const queryText = 'SELECT * FROM contacts'
        
        const result = await query(queryText)

        return result.rows
    } catch(e){
        console.log(e)
        return null
    }
 }

 exports.getContact = async (id) => {
    try {
        const queryText = 'SELECT * FROM contacts WHERE id = $1'
        
        const result = await query(queryText, [id]);

        return result.rows[0]
    } catch(e){
        console.log(e)
        return null
    }
 }

 exports.deleteContact = async (id) => { 
    try {
        const queryText = 'DELETE FROM contacts WHERE id = $1'

        const result = await query(queryText, [id]);

        return result.rows
    } catch(e){
        console.log(e)
        return null
    }
  }

  exports.updateContact = async (contact) => { 
    try {
        const queryText = 'UPDATE contacts SET email = $1, name = $2, phone = $3, address = $4 WHERE id = $5'
        
        const values = [contact.email, contact.name, contact.phone, contact.address, contact.id]

        const result = await query(queryText, values)

        return result.rows
    } catch(e){
        console.log(e)
        return null
    }
   }