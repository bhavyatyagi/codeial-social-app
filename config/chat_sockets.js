module.exports.chatSockets = function (socketServer) {
    // receiving the connection here
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function (socket) {
        console.log('New connection received', socket.id);
        socket.on('disconnect', function () {
            console.log('socket disconnected..!');
        });

        // recieve req of joining room 
        socket.on('join_room', function (data) {
            console.log('Joining request received', data);

            socket.join(data.chatroom);
            // tell frontend that user has joined 
            io.in(data.chatroom).emit('user_joined', data);
        });

        // detect send_message and broadcast to everyone in the chatroom 
        socket.on('send_message', function (data) {
            io.in(data.chatroom).emit('receive_message', data);
        });
    });


}