/*
  File ini berisi operasi-operasi dasar terhadap database PostgreSQL
  untuk mengelola data kontak. Operasi melibatkan penambahan, pengambilan,
  pembaruan, dan penghapusan data kontak.
*/

// Import library PostgreSQL (pg), dotenv, dan util.
const Pool = require('pg').Pool
require('dotenv').config()
const util = require('util')

// Konfigurasi koneksi pool PostgreSQL menggunakan informasi dari variabel lingkungan (dotenv).
const pool = new Pool({
    user: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.PORT_DB
})

// Menerapkan fungsi query dari pool dengan menggunakan promisify dari util.
const query = util.promisify(pool.query).bind(pool)

// Fungsi untuk menambahkan data kontak baru ke dalam database.
const addContact = async (contact) => {
    try {
        // Teks query SQL untuk INSERT ke dalam tabel contacts.
        const queryText = 'INSERT INTO contacts(nama, telepon, email, alamat) VALUES($1, $2, $3, $4)'

        // Array value berisi nilai-nilai parameter untuk di-bind ke dalam query.
        const value = [contact.nama, contact.telepon, contact.email, contact.alamat]

        // Eksekusi query menggunakan fungsi query dari pool.
        const result = await query(queryText, value)

        // Mengembalikan hasil query berupa rows yang berisi data yang baru ditambahkan.
        return result.rows

    } catch (e) {
        // Menangani kesalahan dengan mencetak pesan error ke konsol.
        console.log(e);

        // Mengembalikan nilai null jika terjadi kesalahan.
        return null
    }
}

// Fungsi untuk mengambil semua data kontak dari database.
const getAllContact = async () => {
    try {
        // Teks query SQL untuk SELECT seluruh data dari tabel contacts, diurutkan berdasarkan id ASC.
        const queryText = 'SELECT * FROM contacts ORDER BY id ASC'

        // Eksekusi query menggunakan fungsi query dari pool, tanpa memberikan nilai parameter.
        const result = await query(queryText)

        // Mengembalikan hasil query berupa rows yang berisi seluruh data kontak dari tabel.
        return result.rows
    } catch (e) {
        // Menangani kesalahan dengan mencetak pesan error ke konsol.
        console.log(e);
        // Mengembalikan nilai null jika terjadi kesalahan.
        return null
    }
}

// Fungsi untuk mengambil data kontak berdasarkan ID dari database.
const getContact = async (id) => {
    try {
        const queryText = 'SELECT * FROM contacts WHERE id = $1'

        const result = await query(queryText, [id])

        return result.rows[0]
    } catch (e) {
        console.log(e);
        return null
    }
}

// Fungsi untuk memperbarui data kontak dalam database.
const updateContact = async (contact) => {
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

// Fungsi untuk menghapus data kontak dari database berdasarkan ID.
const deleteContact = async (id) => {
    try {
        const queryText = 'DELETE FROM contacts WHERE id = $1'

        const result = await query(queryText, [id])

        return result.rows
    } catch (e) {
        console.log(e);
        return null
    }
}

// Mengekspor fungsi-fungsi di atas agar dapat digunakan di modul lain.
module.exports = {addContact, getAllContact, getContact, updateContact, deleteContact}