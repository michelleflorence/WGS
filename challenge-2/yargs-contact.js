const yargs = require('yargs');
const fs = require('fs');

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


// Read file json dari folder data
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
    fs.writeFileSync(dataPath, JSON.stringify(dataTemp))
}

// Menambahkan data lewat yargs
yargs.command({
    command: 'add',
    describe: 'Menambahkan Data Kontak',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        telepon: {
            describe: 'Nomor Telepon',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Alamat email',
            type: 'string',
        },
        alamat: {
            describe: 'Alamat',
            type: 'string',
        },
    },
    handler(argv) {
        // Mendeklarasikan objek newData dengan properti sesuai dengan input dari pengguna
        const newData = {
            nama: argv.nama,
            telepon: argv.telepon,
            email: argv.email || '', // Jika email tidak disediakan, gunakan string kosong
            alamat: argv.alamat || '', // Jika alamat tidak disediakan, gunakan string kosong
        };

        // Membaca data yang sudah ada
        const existingData = readFile();

        // Menambahkan data baru 
        existingData.push(newData);

        // Menulis kembali data ke file
        writeFile(existingData);

        console.log('Data berhasil ditambahkan:', newData);
    },
});

// Menampilkan list nama dan nomor telepon
yargs.command({
    command: 'list',
    describe: 'Melihat nama dan nomor telepon',
    handler() {
        const existingData = readFile();

        console.log('List Data Kontak: ');
        existingData.forEach((contact, index) => {
            console.log(`Nama ${index+1}: ${contact.nama}, Telepon ${index+1}: ${contact.telepon}`);
        });
    },
});

// Menampilkan detail
yargs.command({
    command: 'detail',
    describe: 'Menampilkan data / filtering berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        const existingData = readFile();
        console.log(argv);
        const contact = existingData.find((c) => c.nama.toLowerCase() === argv.nama.toLowerCase());

        if (contact) {
            console.log('Nama: ', contact.nama);
            console.log('Nomor Telepon: ', contact.telepon);
            console.log('Alamat email: ', contact.email);
            console.log('Email: ', contact.alamat);
        } else {
            console.log('Data dengan nama ', argv.nama, ' tidak ditemukan');
        }
    }
});

yargs.parse();
