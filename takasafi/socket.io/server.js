import express from "express"
import {createServer} from 'http'
import {Server}  from "socket.io"
import  ws from 'ws'

const httpServer  = createServer();
const io = new Server(httpServer, {
  wsEngine: 'ws.Server'
});

io.on('connection', (socket)=>{
  console.log('a user connected');
  socket.on('disconnected', ()=>{
   console.log('user disconnected');
 });
});

httpServer.listen(3000, (req,res)=>{
  console.log('listening on *:3001');
});


console.log("my current type of work")


