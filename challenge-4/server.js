const express = require('express')
const app = express() // Memanggil fungsi express

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Define a route for the home page
app.get('/', (req, res) => { 
    // __dirname: path atau root dimana kita mengerjakan code
    res.sendFile('./home.html', {root: __dirname})
})

// Define a route for the about page
app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root: __dirname})
})

// Define a route for the contact page
app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', {root: __dirname})
})

// Define a route for handling requests to '/product/:id'
app.get('/product/:id', (req, res) => {
    // req.params.id: Captures the value of the 'id' parameter from the route path
    // req.query.name: Captures the value of the 'name' query parameter from the URL
    // Id: harus diisi, query: opsional (nanti akan return undefined apabila tidak diisi)

    // Send a response containing information about the product ID and name
    res.send('Product id: ' + req.params.id + ' Product Name: ' + req.query.name)
})

// Define a route for handling 404 errors
app.use('/', (req, res) => {
    res.sendFile('./error.html', {root: __dirname});
    res.status(404)
})

// Start the server on port 3000
app.listen(3000, () => { 
    console.log("Running on Port 3000")
})