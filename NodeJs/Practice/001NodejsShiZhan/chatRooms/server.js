const http=require('http');
const fs=require('fs');
const mime=require('mime');
const path=require('path');
const chatSever=require('./lib/chat_server');
let cache={};

const server=http.createServer(function(request, response) {
    let filePath=false;

    if(request.url=="/"){
        filePath='public/index.html';
    }else{
        filePath='public/'+request.url;
    }

    let absPath='./'+filePath;
    serveStatic(response,cache,absPath);
});
server.listen(3000,function(){
    console.log('Server listening on port 3000');
});
chatSever.listen(server);



function send404(response){
    response.writeHead(404,{'Content-Type':'text/plain'});
    response.write('Error 404:resource is not find');
    response.end();
}

function sendFile(response,filePath,fileContents){
    response.writeHead(200,{'Contnet-Type':mime.getType(path.basename(filePath))})
    response.end(fileContents);
};

function serveStatic(response, cache, absPath) {
    if(cache[absPath]){
        sendFile(response,absPath,cache[absPath]);
    }else{
        fs.exists(absPath, function(exists) {
            if(exists){
                fs.readFile(absPath,function(err, data) {
                    if(err){
                        send404(response);
                    }else{
                        cache[absPath]=data;
                        sendFile(response, absPath, data);
                    }
                });
            }else{
                send404(response);
            }
        })
    }
}