const express = require('express');

const app = express();

const server = require('http').server(app);

app.use(express.static('public'));

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('connection established', socket.id);

    socket.on('message', (data)=> {
        io.emit('message', data);
    })

    socket.on('disconnect', ()=> {
        console.log(socket.id,'->left the chat');
    })
})

const PORT = 9000;

server.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`);
})