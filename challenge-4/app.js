const express = require('express')
const app = express() // Memanggil fungsi express
const fs = require('fs');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');

// Deklarasi folder
const dirPath = './data';

// Deklarasi nama file
const dataPath = './data/yargs.json';

// Membuat file dan folder otomatis
if (!fs.existsSync (dirPath)) {
    fs.mkdirSync(dirPath);
}

// Membuat file jika belum ada
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// readFile(): fungsi yang digunakan untuk membaca data dari file. 
// Fungsi ini mengembalikan data yang telah di-parse dari format JSON.
const readFile = () => {
    try {
        // Membaca file secara synchronous dan mengembalikan hasil parsing JSON
        const dataTemp = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(dataTemp) || [];
    } catch (err) {
        // Menangani kesalahan dengan mencetak pesan dan mengembalikan array kosong
        console.error('Terjadi kesalahan dalam membaca file:', err.message);
        return [];
    }
}

// Save file
const writeFile = (dataTemp) => { 
    // Mengubah data ke dalam bentuk JSON dan menulisnya ke dalam file
    fs.writeFileSync(dataPath, JSON.stringify(dataTemp))
}

var expressLayouts = require('express-ejs-layouts');

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
app.get('/contact', (req, res) => {
    const existingData = readFile()
    res.render('contact', 
    {
        title: 'Contact Page',
        data: existingData
    })
})

// Definisikan route untuk halaman detail contact
app.get('/detail-contact/:nama', (req, res) => {
    const existingData = readFile()
    const contact = existingData.find((c) => c.nama === req.params.nama);
    res.render('detail-contact', 
    {
        contact,
        title: 'Detail Contact'
    })
})

// Definisikan route untuk menampilkan formulir penambahan kontak
app.get('/add-contact', (req, res) => {
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
(req, res) => { 
    // Ambil hasil validasi
    let error = validationResult(req);
    let errors = []

    // Baca data kontak yang sudah ada dari file
    const existingData = readFile();
    const { nama, telepon, email } = req.body;

    // Bentuk objek kontak baru
    const contact = {nama, telepon, email}

    // Periksa apakah terdapat kesalahan validasi atau nama kontak sudah terdaftar sebelumnya
    if (!error.isEmpty() || !existingData.every(contact => contact.nama !== nama)) {
        // Jika nama sudah terdaftar, tambahkan pesan kesalahan
        if(!existingData.every(contact => contact.nama !== nama)){
            errors.push({'msg':'Name are already registered'})
        }
        
        // Jika terdapat kesalahan validasi lainnya, tambahkan pesan kesalahan
        if(!error.isEmpty()){
            errors.push(...error.array())
        }

        // Render kembali formulir 'add-contact' dengan pesan kesalahan dan data kontak yang dimasukkan
        res.render('add-contact', {errors: errors, title: 'Add Contact', contact: contact});
    } else {     
        // Jika tidak ada kesalahan, tambahkan kontak baru ke dalam data yang sudah ada
        const newContact = {
            nama: nama,
            telepon: telepon,
            email: email,
        };

        existingData.push(newContact);

        // Tulis kembali data ke dalam file
        writeFile(existingData);

        // Redirect ke halaman kontak setelah berhasil menambahkan kontak
        res.redirect('/contact');
    }
 })

 // Definisikan route untuk menampilkan formulir pembaruan kontak
app.get('/update-contact', (req, res) => {
    // Baca data kontak yang sudah ada dari file
    const existingData = readFile()

    // Ambil nama kontak dari parameter query
    const nama = req.query.nama
    let data

    // Cari data kontak yang sesuai dengan nama dari parameter query
    for (let i = 0; i < existingData.length; i++) {
        if (existingData[i]['nama'] === nama){
            data = existingData[i]
        }
    }

    // Tambahkan properti 'old_name' untuk menyimpan nama sebelum diperbarui
    data.old_name = data.nama
    
    // Render view 'update-contact' dengan data kontak yang akan diperbarui
    res.render('update-contact', {
        contact: data,
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
(req, res) => {
    // Tampung hasil validasi
    let error = validationResult(req);

    // Tampung error gabungan
    let errors = []

    // Baca data kontak yang sudah ada dari file
    const existingData = readFile()
    const {old_name, nama, telepon, email} = req.body

    // Bentuk objek kontak yang akan diperbarui
    let contact = {
        old_name: old_name,
        nama: nama,
        telepon: telepon,
        email: email
    }
    
    // Periksa apakah terdapat kesalahan validasi atau nama kontak sudah terdaftar sebelumnya
    if (!error.isEmpty()) {
        // Jika nama sudah terdaftar dan berbeda dengan nama sebelumnya, tambahkan error message
        if(!old_name === nama){
            if(!existingData.every(contact => contact.nama !== nama)){
                errors.push({'msg':'Name are already registered'})
            }
        } 

        // Jika terdapat kesalahan validasi lainnya, tambahkan error message
        if(!error.isEmpty()){
            errors.push(...error.array())
        }

        // Render kembali formulir 'update-contact' dengan error message dan data kontak yang dimasukkan
        res.render('update-contact', {errors: errors, title: 'Update Contact', contact: contact});

    } else {
        // Perbarui data kontak yang sesuai dengan nama sebelumnya
        for (let i = 0; i < existingData.length; i++) {
            if(existingData[i]['nama'] === old_name){
                existingData[i] = contact
            }
        }
    
        // Tulis kembali data ke dalam file
        writeFile(existingData)

        // Redirect ke halaman kontak setelah berhasil memperbarui kontak
        res.redirect('/contact')
    }
})

// Definisikan route untuk menghapus kontak
app.get('/delete-contact', (req, res) => {
    // Baca data kontak yang sudah ada dari file
    const existingData = readFile()

    // Ambil nama kontak dari parameter query
    const nama = req.query.nama

    // Cari data kontak yang sesuai dengan nama dari parameter query dan hapus
    for (let k = 0; k < existingData.length; k++){
        if(existingData[k]['nama'] === nama){
            existingData.splice(k, 1);
        }
    }

    // Tulis kembali data ke dalam file
    writeFile(existingData)

    // Redirect ke halaman kontak setelah berhasil menghapus kontak
    res.redirect('/contact')

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

// app.post('/add-contact', (req, res) => { 
//     const existingData = readFile()
//     const {nama, telepon, email} = req.body
//     const contact = {
//         nama: nama,
//         telepon: telepon,
//         email: email
//     }
//     existingData.push(contact)
//     writeFile(existingData)
//     res.redirect('/contact')
//  })