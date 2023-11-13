let dataGlobal = [];

const readline = require('readline');
const fs = require('fs');
const validator = require('validator');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const dirPath = './data';
const dataPath = './data/contact.json';

// Membuat file dan folder otomatis
if (!fs.existsSync (dirPath)) {
    fs.mkdirSync(dirPath);
}

// Membuat file jika belum ada
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// Read file json dari folder data
const readFile = () => {
    fs.readFile(dataPath, 'utf-8', (err, dataTemp) => {
        // Buat variabel data, ubah tipe data JSON ke Object JavaScript
        const data = JSON.parse(dataTemp) 
        // Tampung variabel data ke dataGlobal supaya bisa diakses
        dataGlobal = data
        if (err) throw err;
    })
}

// Save file
const writeFile = () => { 
    fs.writeFileSync(dataPath, JSON.stringify(dataGlobal))
}

// Fungsi untuk membuat Promise dalam melakukan input pertanyaan
const question = (ask) => {
  return new Promise((resolve) => {
    rl.question(ask, resolve);
  });
};

// Fungsi utama untuk melakukan input data dan menyimpannya
async function ask() {
    try {
        // Membaca file untuk mendapatkan data yang sudah ada
        readFile();

        // Menggunakan async/await untuk memastikan urutan eksekusi yang benar
        const nama = await question('Siapa nama Anda? ');
        console.log('Nama saya adalah ', nama);
        
        let notelp;
        do {
            notelp = await question('Berapa nomor telepon Anda? ');
            // Memeriksa apakah nomor telepon yang dimasukkan valid menggunakan validator
            if (!validator.isMobilePhone(notelp, 'id-ID')) {
                console.log('Nomor telepon tidak valid, masukkan kembali nomor telepon Anda!');
            }
        } while (!validator.isMobilePhone(notelp, 'id-ID')); // Melakukan loop selama nomor telepon tidak valid
        console.log('Nomor telepon valid!');

        let email;
        do {
            email = await question('Apa email Anda? ');
            // Memeriksa apakah email yang dimasukkan valid menggunakan validator
            if (!validator.isEmail(email)) {
                console.log('Email tidak valid, masukkan kembali email Anda!');
            }
        } while (!validator.isEmail(email)); // Melakukan loop selama email tidak valid
        console.log('Email valid!');

        const alamat = await question('Apa alamat Anda? ');
        console.log('Alamat saya adalah', alamat);

        console.log("============================================");
        console.log("Semua data berhasil ditambahkan!");
        rl.close();

        // Menyimpan data ke dalam variabel dataPush
        const dataPush = {nama, notelp, email, alamat}
        dataGlobal.push(dataPush);

        // Menulis kembali data ke dalam file
        writeFile();

    } catch (error) {
        console.error('Terjadi kesalahan', error);
    }
};

// Menjalankan fungsi untuk input dan penyimpanan data
ask();