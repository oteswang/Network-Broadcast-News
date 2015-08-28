var net = require('net');
var host = 'localhost';
var port = 6969;
var PassThroughStream = require('stream').PassThrough;
var stream = new PassThroughStream();

var count = 1;
var clients = [];

var server = net.createServer(function (socket) {
  var remoteAddress = socket.remoteAddress;
  var remotePort = socket.remotePort;
  var connection = remoteAddress + ':' + remotePort;
  var id = count++;

  socket.write('Connected as: ' + 'Client' + id + ': ' + remotePort);
  clients.push(socket);
  console.log((new Date()) + ' Connection accepted [' + 'Client' + id + ': ' + remotePort + ']');

  socket.setEncoding('utf8');

  socket.on('data', function (data) {
    clients[id] = connection;

    data = data.toString();

    // socket.write('Message from: ' + remoteAddress + ':' + remotePort + ' : ' + data);

    console.log('SERVER BCAST FROM ' + remoteAddress + ':' + remotePort + ' >> ' + data);
    broadcaster(connection + ': "' + data + '"', socket);

  });
  // socket.pipe(stream);

  socket.on('end', function () {
    delete clients[id];
    console.log((new Date()) + ' [Client' + id + ': ' + remotePort + ']' + ' disconnected.');
  });

  function broadcaster (message, sender) {
    clients.forEach(function(client){
      if (client !== sender) {
        console.log(client);
        client.write(message);
      }
      return;
    });
  }
}).listen(port, host);

console.log('Server listening on ' + host + ':' + port);
