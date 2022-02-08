const http = require('http');
const fs = require('fs').promises;


const server = http.createServer((req, res)=> {
    res.writeHead(200, {
        'Content-Type':'text/html ; charset=UTF-8'
    })
    fs.writeFile('./headers2.txt', JSON.stringify(req.headers ,null, 4))
    .then(()=>{
        res.end('ok')
    })
});

server.listen(3000);
