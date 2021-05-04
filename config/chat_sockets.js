module.exports.chatSockets = function (socketServer) {
    // receiving the connection here
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function (socket) {
        console.log('New connection received', socket.id);
        socket.on('disconnect', function () {
            console.log('socket disconnected..!');
        });
    });
}