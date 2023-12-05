const express = require('express')
const app = express() // Memanggil fungsi express
const fs = require('fs');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
var expressLayouts = require('express-ejs-layouts');
const { getAllContact, addContact, getContact, deleteContact, updateContact } = require('./repository');

app.use(bodyParser.urlencoded({extended:true}))
app.use(expressLayouts);
app.use(express.static('public'));

// Tetapkan file layout untuk EJS
app.set('layout', './layouts/layout')

// Tetapkan EJS sebagai view engine
app.set('view engine', 'ejs')

// Tetapkan route untuk halaman utama
app.get('/', (req, res) => { 
    // Render view 'home' dan kirimkan data ke dalamnya
    res.render('home', 
    {
        nama: 'Michelle Florence', 
        title: 'Simple Web Server'
    })
})

// Definisikan route untuk halaman about
app.get('/about', (req, res) => {
    res.render('about', {title: 'About Page'})
})

// Definisikan route untuk halaman contact
app.get('/contact', async (req, res) => {
    const contact = await getAllContact()
    res.render('contact', 
    {
        title: 'Contact Page',
        data: contact
    })
})

// Definisikan route untuk halaman detail contact
app.get('/detail-contact/:id', async (req, res) => {
    const id = req.params.id
    const contact = await getContact(id)
    res.render('detail-contact', 
    {
        contact: contact,
        title: 'Detail Contact'
    })
})

// Definisikan route untuk menampilkan formulir penambahan kontak
app.get('/add-contact', async (req, res) => {
    // Render view 'add-contact' dengan judul 'Add Contact' dan data kontak awal (null)
    res.render('add-contact', {
        title: 'Add Contact',
        contact: null
    })
})

// Definisikan route untuk menangani permintaan penambahan kontak melalui metode POST
app.post('/add-contact', 
[
    // Validasi input menggunakan express-validator
    check('email', 'Email is not valid!').isEmail(),
    check('telepon', 'Mobile not valid!').isMobilePhone('id-ID')
], 
async (req, res) => { 
    // Ambil hasil validasi
    let error = validationResult(req);

    // Baca data kontak yang sudah ada dari file
    const { nama, telepon, email, alamat } = req.body;

    // Bentuk objek kontak baru
    const contact = {nama, telepon, email, alamat}

    // Periksa apakah terdapat kesalahan validasi atau nama kontak sudah terdaftar sebelumnya
    if (!error.isEmpty()) {
        // Render kembali formulir 'add-contact' dengan pesan kesalahan dan data kontak yang dimasukkan
        res.render('add-contact', {errors: error.array(), title: 'Add Contact', contact: contact});

    } else {     
        const result = await addContact(contact)

        if(!result) {
            res.render('add-contact', {errors: error.array(), title: 'Add Contact', contact: contact})
        }

        // Redirect ke halaman kontak setelah berhasil menambahkan kontak
        res.redirect('/contact');
    }
 })

 // Definisikan route untuk menampilkan formulir pembaruan kontak
app.get('/update-contact/:id', async (req, res) => {
    const id = req.params.id
    const contact = await getContact(id)

    // Render view 'update-contact' dengan data kontak yang akan diperbarui
    res.render('update-contact', {
        contact: contact,
        title: 'Update Contact'
    })
})

// Definisikan route untuk menangani permintaan pembaruan kontak melalui metode POST
app.post('/update-contact', 
[
    // Validasi input menggunakan express-validator
    check('email', 'Email is not valid!').isEmail(),
    check('telepon', 'Mobile not valid!').isMobilePhone('id-ID')
], 
async (req, res) => {
    // Tampung hasil validasi
    let error = validationResult(req);

    const {id, nama, telepon, email, alamat} = req.body

    // Bentuk objek kontak yang akan diperbarui
    let data = {
        id: id,
        nama: nama,
        telepon: telepon,
        email: email, 
        alamat: alamat
    }
    
    if (!error.isEmpty()) {
        // Render kembali formulir 'update-contact' dengan error message dan data kontak yang dimasukkan
        res.render('update-contact', {
            errors: error.array(), 
            title: 'Update Contact', 
            contact: data
        })

    } else {
        const result = await updateContact(data)

        if(!result) {
            res.render('update-contact', {
                errors: error.array(), 
                title: 'Update Contact', 
                contact: data
            })
        }

        // Redirect ke halaman kontak setelah berhasil menambahkan kontak
        res.redirect('/contact');
    }
})

// Definisikan route untuk menghapus kontak
app.get('/delete-contact/:id', async (req, res) => {
    // Baca data kontak yang sudah ada dari file
    const id = req.params.id

    await deleteContact(id)

    // Redirect ke halaman kontak setelah berhasil menghapus kontak
    res.redirect('/contact');

})

// Tentukan route untuk menangani 404 not found
app.use('/', (req, res) => {
    res.render('error', {title: '404 Not Found!'})
    res.status(404)
})

// Start server pada port 3000
app.listen(3000, () => { 
    console.log("Running on Port 3000")
})
