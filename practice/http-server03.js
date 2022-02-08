const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res)=> {
    
    fs.readFile('./headers.txt', (error, data) =>{ //讀取檔案
        if(error){
            res.end(`<p>有問題</p>`);
        } else{
            res.writeHead(200, {
                'Content-Type':'text/html ; charset=UTF-8'
            })
            res.end(data);
        };
    })
});

server.listen(3000);
