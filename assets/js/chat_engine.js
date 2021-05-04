class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;
        this.socket.on('connect', function () {
            console.log('Connection Established using sockets...!');


            // send req to join room 
            self.socket.emit('join_room', {
                userEmail: self.userEmail,
                chatroom: 'codeial'
            });

            // getting response back if user joined 
            self.socket.on('user_joined', function (data) {
                console.log('A user has joined', data);
            });
        });
    }
}