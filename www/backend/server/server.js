var http = require('http');
var server = http.createServer(function(req, res) {
    res.end('hello');
});
server.listen({
    port: 3000,
    host: '47.123.6.8'
}, 
function() {
    console.log('Server running at http://47.123.6.8:3000/');
});