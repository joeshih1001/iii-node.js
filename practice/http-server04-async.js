const http = require('http');
const fs = require('fs').promises;


const server = http.createServer(async (req, res)=> {
    res.writeHead(200, {
        'Content-Type':'text/html ; charset=UTF-8'
    })
    try{
        await fs.writeFile('./headers3.txt', JSON.stringify(req.headers ,null, 4));
        
    }
    catch{
        res.end('error')
    }
    res.end('okok')
});


server.listen(3000);
