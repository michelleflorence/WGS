// Buat variabel global supaya bisa diakses di dalam atau luar fungsi
let dataGlobal = []
let emailGlobal = ''
let phoneGlobal = '' 
let addressGlobal = '' 
let nameGlobal = '' 

// Import validator 
const validator = require('validator');

// Import file system
const fs = require('fs');

// Read file data.json dari folder data
fs.readFile('./data/data.json', 'utf-8', (err, dataTemp) => {
    // Buat variabel data, ubah tipe data JSON ke Object JavaScript
    const data = JSON.parse(dataTemp) 
    // Tampung variabel data ke dataGlobal supaya bisa diakses
    dataGlobal = data
    if (err) throw err;
})

// Buat variable readline dari module readline node js
const readline = require('readline');

// Buat variable rl supaya bisa menampung interface untuk baca input & output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Membuat fungsi untuk mengajukan pertanyaan nama
function askName() {
    rl.question('Siapa nama kamu? ', (nama) => {
        console.log('Nama kamu adalah ' + nama);
        // Tampung nama ke variabel nameGlobal
        nameGlobal = nama
        askNumber(); // Lanjut ke pertanyaan nomor
     })
}

//  Membuat fungsi untuk mengajukan pertanyaan nomor 
function askNumber() {
    rl.question('Berapa No Telp Kamu? ', (notelp) => {
        if (validator.isMobilePhone(notelp, 'id-ID')){
            console.log('Nomor telepon valid');
            // Tampung nomor telepon ke variabel phoneGlobal
            phoneGlobal = notelp
            askEmail(); // Lanjut ke pertanyaan email
        } else {
            console.log('Nomor telepon tidak valid, masukkan kembali nomor telepon anda!');
            askNumber(); // Ulang pertanyaan nomor jika tidak valid
        }
    });
}

// Membuat fungsi untuk mengajukan pertanyaan email
function askEmail() {
    rl.question('Masukkan email Anda ', (email) => {
        if (validator.isEmail(email)){
            console.log('Email valid');
            // Tampung email ke variabel emailGlobal
            emailGlobal = email
            askAddress(); // Lanjut ke pertanyaan alamat
        } else {
            console.log('Email tidak valid, masukkan kembali email Anda!');
            askEmail(); // Ulang pertanyaan email jika email tidak valid
        }
    });
}

// Membuat fungsi untuk mengajukan pertanyaan alamat
function askAddress() {
    rl.question('Dimana alamat anda? ', (alamat) => {
        if (validator.matches(alamat)) {
            console.log(`Alamat kamu di ${alamat}`);
            // Mengganti nilai variabel global `addressGlobal` dengan nilai dari parameter `alamat`
            addressGlobal = alamat
            // Membuat objek `dataPush` yang berisi informasi terkait pengguna
            const dataPush = {name: nameGlobal, phone: phoneGlobal, email: emailGlobal, address: addressGlobal}
            // Menambahkan objek `dataPush` ke dalam array `dataGlobal`
            dataGlobal.push(dataPush)
            // Memanggil fungsi `writeFile()` untuk menyimpan perubahan ke dalam file JSON
            writeFile()

            console.log("============================================");
            console.log("Semua data berhasil ditambahkan!");
            rl.close(); // Tutup interface readline setelah mendapatkan alamat yang sesuai
        } else {
            askAddress(); // Ulang pertanyaan alamat jika tidak sesuai
        }
    })
}

// Menulis data ke file data.json menggunakan fungsi writeFile
const writeFile = () => { 
    fs.writeFileSync('./data/data.json', JSON.stringify(dataGlobal))
 }

// Memulai dengan pertanyaan nama
askName();


