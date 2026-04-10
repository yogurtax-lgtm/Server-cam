const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: { origin: "*" }
});

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado:', socket.id);

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
    
    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
