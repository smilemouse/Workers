const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();
let server=null;

channel.clients={};
channel.subscriptions={};
channel.on('join', function(id, client) {
    console.log(id);
    this.clients[id] = client;
    this.subscriptions[id] = function(sendId, message) {
        if(id != sendId) {
            this.clients[id].write(message);
        }
    }
    this.on('broadcast', this.subscriptions[id]); 
});
channel.on('leave', function(id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + ' has left this chat.\n');
});
server = net.createServer(function(client) {
    let id=client.remoteAddress + ':' + client.remotePort;

    channel.emit('join', id, client);
    client.on('data', function(data) {
        data=data.toString();
        channel.emit('broadcast', id, data);
    });
    client.on('close', function() {
        channel.emit('leave', id);
    });
});
server.listen(3000);
