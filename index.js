var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (request, response) {
    var pathName = url.parse(request.url).pathname;

    fs.readFile(__dirname + pathName, function (err, data) {
        if (err) {
            response.writeHead(404, {'Content-type': 'text/plan'});
            response.write('Page Was Not Found');
            response.end();
        } else {
            response.writeHead(200);
            response.write(data);
            response.end();
        }
    })
}).listen(7001);
