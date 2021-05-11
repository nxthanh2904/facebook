

const serverSocket =  (io) => {
    io.on('connection', (socket) => {

        // join room
        socket.on('join', (data) => {
            if (data) {
                console.log('joinnnn', data, socket.id);
                socket.join(data.roomId);
            }

        })

        // nhận tin nhắn từ client
        socket.on('sendMessage', (data, callback) => {
            if (data.roomId) {
                 console.log('sendddddd', data, socket.id);
                io.to(data.roomId).emit('message', { name: data.userId, text: data.message });
           }
          // socket.broadcast.emit('message', { name: data.userId, text: data.message });
            callback();        
        });
        

        socket.on("disconnect", () => {
        
            console.log("Dissconnet");
        })
    })

}

module.exports = {
    serverSocket,
}