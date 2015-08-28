var net = require('net');
var host = 'localhost';
var port = 6969;

var client = net.connect(port, host, function () {
  process.stdin.resume();
  process.stdin.pipe(client);
  console.log('Connected to: ' + host + ':' + port);
});

client.on('data', function (data) {

  data = data.toString();

  console.log(data);
});

client.on('end', function () {
  console.log('disconnected from server');
});