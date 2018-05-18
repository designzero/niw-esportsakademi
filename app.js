// const fs = require('fs');
// const sys = require('sys');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 80;

app.use(express.static(__dirname + '/public'));

app.get("/student", (req, res) => {
    
    
})

function onConnection(socket){
  socket.on('draw', (data) => socket.broadcast.emit('draw', data));
  socket.on('cngMap', (data) => socket.broadcast.emit('cngMap', data));
  socket.on('clear', (data) => socket.broadcast.emit('clear', data));
  socket.on('cngColor', (data) => socket.broadcast.emit('cngColor', data));
  socket.on('rotate', (data) => socket.broadcast.emit('rotate', data));
  socket.on('undo', (data) => socket.broadcast.emit('undo', data));
  socket.on('redo', (data) => socket.broadcast.emit('redo', data));
  socket.on('cpush', (data) => socket.broadcast.emit('cpush', data));
  socket.on('ping', (data) => socket.broadcast.emit('ping', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));