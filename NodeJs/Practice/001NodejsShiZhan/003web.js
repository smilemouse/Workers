const http = require('http');

const server = http.createServer(function(req, res) {
    res.setHeader('Content-type','text/html');
    res.statusCode = '404';
    res.end('<span style = "color:red;">Hello Word</span>');
});
server.listen(3000);