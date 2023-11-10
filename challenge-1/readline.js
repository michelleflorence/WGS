// Membuat variable readline dari fungsi readline di node
const readline = require('readline');

 const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
 });
 
// Readline: sebuah function untuk memberitahu user utk input sesuatu
// Pertanyaan pertama: Nama
 rl.question('Siapa Nama Kamu? ', (nama) => {
    console.log('Nama kamu adalah ' + nama);
    
    // Pertanyaan kedua: No telp
    rl.question('Berapa No Telp Kamu? ', (notelp) => {
        console.log(`No Telp kamu adalah ${notelp}`);
        
        // Pertanyaan ketiga: alamat
        rl.question('Alamat kamu dimana? ', (alamat) => {
            console.log(`Alamat kamu di ${alamat}`);

            // Pertanyaan keempat: email
            rl.question('Email: ', (email) => {
                console.log(`Email anda: ${email}`);
                rl.close(); // Tutup antarmuka baris perintah setelah selesai
            })
        });
    });
});

// Prompt ASYNC
const prompt = require('prompt-sync')();
const name = prompt('Siapa nama kamu? ');
const notelp = prompt('Berapa no telp kamu? ');
const alamat = prompt('Nama alamat kamu? ');
console.log(`Nama kamu adalah ${name}, no telp kamu adalah ${notelp}, dan alamat berada di ${alamat}`);

