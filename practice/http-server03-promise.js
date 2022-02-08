const http = require('http');
const fs = require('fs');
const { resolve } = require('path');

function myReadFile(file_path){
    return new Promise((resolve, reject) => {
        if(error) return reject(error);
        resolve(data);
    })
}

const server = http.createServer( async (req, res)=> {
    res.writeHead(200, {
        'Content-Type':'text/html ; charset=UTF-8'})

    const mRF = await myReadFile('./headers.txt', (error, data));
        res.end(mRF)
});

server.listen(3000);
