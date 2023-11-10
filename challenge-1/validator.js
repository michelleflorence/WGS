// Import validator
// Validator: memeriksa atau memvalidasi apakah data yang dimasukkan sesuai atau tidak
const validator = require('validator');

// Membuat variable dari fungsi readline di node js
const readline = require('readline');

// Tampung fungsi readline ke variabel rl utk membuat interface input & output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Membuat fungsi untuk mengajukan pertanyaan nama
function askName() {
    rl.question('Siapa nama kamu? ', (nama) => {
        console.log('Nama kamu adalah ' + nama);
        askNumber(); // Lanjut ke pertanyaan nomor
     })
}

//  Membuat fungsi untuk mengajukan pertanyaan nomor 
function askNumber() {
    rl.question('Berapa No Telp Kamu? ', (notelp) => {
        // Jika input sesuai dengan mobile phone local Indo, maka lanjut ke pertanyaan email
        if (validator.isMobilePhone(notelp, 'id-ID')){
            console.log('Nomor telepon valid');
            askEmail();
        } else {
            console.log('Nomor telepon tidak valid, masukkan kembali nomor telepon anda!');
            askNumber(); // Ulang pertanyaan nomor jika tidak sesuai
        }
    });
}

// Membuat fungsi untuk mengajukan pertanyaan email
function askEmail() {
    rl.question('Apa email Anda? ', (email) => {
        // Jika input sesuai dengan format email, maka lanjut ke pertanyaan berikutnya
        if (validator.isEmail(email)){
            console.log('Email valid');
            askAddress(); // Panggil fungsi untuk lanjut ke pertanyaan alamat
        } else {
            console.log('Email tidak valid, masukkan kembali email Anda!');
            askEmail(); // Ulang pertanyaan email jika email tidak valid
        }
    });
}

// Membuat fungsi untuk mengajukan pertanyaan alamat
function askAddress() {
    rl.question('Dimana alamat anda? ', (alamat) => {
        console.log(`Alamat kamu di ${alamat}`);
        rl.close(); // Tutup interface readline setelah mendapatkan alamat yang sesuai
    });
}

// Mulai dengan fungsi untuk pertanyaan nama
askName();
