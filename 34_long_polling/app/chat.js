let clients = [];

exports.publish = (message) => {
    for (let i = 0; i < clients.length; i++) {
        clients[i].end(message);
    }
    
    clients = [];
}

exports.subscribe = (req, res) => {
    clients.push(res);

    res.on('close', () => {
        clients.splice(clients.indexOf(res), 1);
    });
}