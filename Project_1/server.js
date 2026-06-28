//Creating local server with node js.

const { log } = require('console');
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
    res.end("Your Local Server Is created! ")
})

const port = 6000;
server.listen(port, '127.0.0.1',() => {
    console.log(`Your server is running on port: ${port}...`)
})


