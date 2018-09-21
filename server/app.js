const bodyParser = require('body-parser')
const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const cors = require('cors')

const admin = require('firebase-admin');
var serviceAccount = require('./web-game-firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


//Settings
app.set('port',process.env.PORT || 3000);


app.use(express.json());
//app.use(bodyParser.json())
app.use(cors({origin: ['https://web-game-fc8f9.firebaseapp.com','http://localhost:4200']}));


//Routes
app.use('/api/game',require('./routes/rules.routes'));

//Starting the server
server.listen(app.get('port'), () => {
    console.log("App now running on port", app.get('port'));
  });


//sockets
io.on('connection', function(client) {
  console.log('conectado')
  
  client.on('disconnect', function() {
    console.log("disconnected")
  });


  client.on('createRoom', async function(data) {
    //console.log('matrix recibida es--'+data.matrix)
    if(io.sockets.adapter.rooms[data.roomId] === undefined){
      client.join(data.roomId);
      //client.join(data.roomId);
      io.sockets.adapter.rooms[data.roomId].matrix=data.matrix 
      io.sockets.adapter.rooms[data.roomId].actualPlayer=data.actualPlayer
      io.sockets.adapter.rooms[data.roomId].roomId=data.roomId
      io.to(client.id).emit('didMove',io.sockets.adapter.rooms[data.roomId].matrix)
      io.to(client.id).emit('nextPlayer',io.sockets.adapter.rooms[data.roomId].actualPlayer)
      io.to(client.id).emit('roomId',io.sockets.adapter.rooms[data.roomId].roomId)
      console.log(' Client created and joined the room '+data.roomId+ ' and client id is '+ client.id);
    }
    else
      console.log("error, sala ya existe")
  });
  
  
  client.on('joinRoom',async function(data) {
      client.join(data.roomId);
      io.sockets.adapter.rooms[data.roomId].actualPlayer.piece=1
      //console.log("entro prueba y es: "+io.sockets.adapter.rooms[data.roomId].actualPlayer)
      io.to(client.id).emit('didMove',io.sockets.adapter.rooms[data.roomId].matrix)
      io.in(data.roomId).emit('nextPlayer',io.sockets.adapter.rooms[data.roomId].actualPlayer)
      io.to(client.id).emit('roomId',io.sockets.adapter.rooms[data.roomId].roomId)
      console.log(' Client joined the room '+data.roomId+ ' and client id is '+ client.id);
  });
  client.on('checkJoinRoom',async function(data) {
    if(io.sockets.adapter.rooms[data.roomId] !== undefined &&io.sockets.adapter.rooms[data.roomId].length<2){
      io.to(client.id).emit('joinChannel',true)
    }
    else if (io.sockets.adapter.rooms[data.roomId] === undefined){
      io.to(client.id).emit('joinChannel',null)
      console.log("sala no existe")
    }
    else{
      io.to(client.id).emit('joinChannel',null)
      console.log("error, sala llena")
    }
  });
  
  client.on('doMove',async function(data){
    io.sockets.adapter.rooms[data.roomId].matrix = data.matrix
    io.sockets.adapter.rooms[data.roomId].actualPlayer=data.actualPlayer
    io.in(data.roomId).emit('didMove',io.sockets.adapter.rooms[data.roomId].matrix)
    io.in(data.roomId).emit('nextPlayer',io.sockets.adapter.rooms[data.roomId].actualPlayer)
  });
});