const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res)=> {
    res.writeHead(200, {
        'Content-Type':'text/html ; charset=UTF-8'
    })
    fs.writeFile('./headers.txt', JSON.stringify(req.headers ,null, 4), error =>{
        if(error){
            res.end(`<p>有問題</p>`);
        } else{
            res.end(`<p>沒問題</p>`);
        };
        
    })
});

server.listen(3000);
