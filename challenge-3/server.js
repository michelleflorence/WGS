const http = require('http');
const port = 3000;
const fs = require('fs');

// Read filename
const readFile = (fileName) => {
    try {
        // Membaca file secara synchronous dan mengembalikan hasil parsing JSON
        const html = fs.readFileSync(fileName, 'utf-8');
        return html
    } catch (err) {
        // Menangani kesalahan dengan mencetak pesan dan mengembalikan array kosong
        console.error('Terjadi kesalahan dalam membaca file:', err.message);
    }
}

http.createServer((req, res) => {
        const url = req.url;
        if(url === '/'){
            const home = readFile('./home.html');
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write(home);
        } else if(url === '/about'){
            const about = readFile('./about.html');
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write(about);
        } else if(url === '/contact'){
            const contact = readFile('./contact.html');
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write(contact);
        } else {
            const error = readFile('./error.html');
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write(error);
        }

        res.end();
    })

    .listen(port, () => {
        console.log('Server is listening on port 3000!');
    });