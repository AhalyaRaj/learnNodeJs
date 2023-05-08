const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
console.log(`request.......`,request.url);
// if(request.url === "/") {
//     fs.readFile(path.join(__dirname,"public","home.html"),(err,content) => {
//         if(err) throw err;
//         response.writeHead(200,{"Content-Type" : 'text/html'});
//         response.end(content);
//     })
// } 

// if(request.url === "/about") {
//     fs.readFile(path.join(__dirname,"public","about.html"),(err,content) => {
//         if(err) throw err;
//         response.writeHead(200,{"Content-Type" : 'text/html'});
//         response.end(content);
//     })
// }

// if(request.url === "/api/users") {
//    const users = {
//     "code" : 100,
//     "message": 'Success',
//     "error": null,
//     "data" : [
//         {
//             "name" : "Milson Thomas Gracelet",
//             "age" : 42
//         },
//         {
//             "name" : "Cynthia Selva Raj",
//             "age": 29
//         },
//         {
//             "name" : 'Marvin Milson Cynthia',
//             "age": 1
//         },
//     ]
//    }
//    response.writeHead(200,{"Content-Type" : 'application/json'});
//    response.end(JSON.stringify(users));
// } 

// Build file path
const filePath = path.join(__dirname,"public",request.url === "/" ? 'home.html' : request.url);

// get extension name
const extName = path.extname(filePath);

// initial content type
const contentType = "text/html";

switch(extName) {
    case ".js" : 
        contentType = "text/javascript";
        break;
    case ".css" :
        contentType = "text/css";
        break;
    case '.json' :
        contentType = "application/json";
        break;
    case ".png" : 
        contentType = "image/png";
        break;
    case ".jpg" :
        contentType = "image/jpg";
        break;

}

fs.readFile(filePath,(err,content) => {
    if(err) {
        if(err.code == "ENOENT") {
            // page not found
            response.writeHead(404, {"Content-Type": 'text/html'})
            fs.readFile(path.join(__dirname,"public","404.html"),(err,content404) => {
                if(err) throw err;
                response.end(content404,"utf8");
            })
        } else {
            response.writeHead(500);
            response.end(`Internal Server Error: ${err.code}`);
        }
    } else {
        response.writeHead(200, {"Content-Type" : contentType});
        response.end(content,"utf8");
    }
})
})

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log('Server started'))