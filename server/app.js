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
app.use(cors({origin: 'http://localhost:4200'}));


//Routes
app.use('/api/game',require('./routes/rules.routes'));

//Starting the server
server.listen(app.get('port'), () => {
    console.log("App now running on port", app.get('port'));
  });


//sockets
var conections=[]
io.on('connection', function(client) {
  var conections2 = []
  conections.push(client)
  console.log(conections.length+ ' <-lista general')
  conections2.push(client)
  console.log(conections2.length+ ' <-lista adentro')
  
  console.log('conectado')
  
  client.on('disconnect', function() {
    console.log("disconnected")
  });


  client.on('createRoom', function(data) {
    console.log('matrix recibida es--'+data.matrix)
    if(io.sockets.adapter.rooms[data.roomId] === undefined){
      client.join(data.roomId);
      //client.join(data.roomId);
      io.sockets.adapter.rooms[data.roomId].matrix=data.matrix 
      io.sockets.adapter.rooms[data.roomId].actualPlayer=1
      io.sockets.adapter.rooms[data.roomId].roomId=data.roomId
      io.sockets.adapter.rooms[data.roomId].roomId=data.roomId
      console.log(io.sockets.adapter.rooms[data.roomId])
      io.in(data.roomId).emit('didMove',io.sockets.adapter.rooms[data.roomId].matrix)
      io.in(data.roomId).emit('nextPlayer',io.sockets.adapter.rooms[data.roomId].actualPlayer)
      io.in(data.roomId).emit('roomId',io.sockets.adapter.rooms[data.roomId].roomId)
      console.log(' Client created and joined the room '+data.roomId+ ' and client id is '+ client.id);
    }
    else
      console.log("error, sala llena")
  });
  
  
  client.on('join', function(data) {
    if(io.sockets.adapter.rooms[data.roomId] !== undefined &&io.sockets.adapter.rooms[data.roomId].length<2){
      client.join(data.roomId);
      io.in(data.roomId).emit('didMove',io.sockets.adapter.rooms[data.roomId].matrix)
      io.in(data.roomId).emit('nextPlayer',io.sockets.adapter.rooms[data.roomId].actualPlayer)
      io.in(data.roomId).emit('roomId',io.sockets.adapter.rooms[data.roomId].roomId)
      console.log(' Client joined the room '+data.roomId+ ' and client id is '+ client.id);
    }
    else if (io.sockets.adapter.rooms[data.roomId] === undefined){
      console.log("sala no existe")
    }
    else{
      console.log(io.sockets.adapter.rooms[data.roomId])
      console.log("error, sala llena")
    }
  });
  
  client.on('doMove',function(data){
    io.sockets.adapter.rooms[data.roomId].matrix = data.matrix
    io.in(data.roomId).emit('didMove',io.sockets.adapter.rooms[data.roomId].matrix)
    io.in(data.roomId).emit('nextPlayer',io.sockets.adapter.rooms[data.roomId].actualPlayer)
  });
});