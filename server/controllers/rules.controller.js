const editJsonFile = require("edit-json-file");
let file = editJsonFile(`${__dirname}/../../Data.json`);

var methods = require('../../modules/reversie')
const admin = require('firebase-admin');
var db = admin.firestore();

const rulesCtrl = {}

rulesCtrl.getMatrix = async (req,res)=>{
    let matrix = await (file.get("matrix"))
    res.json(matrix);
}

rulesCtrl.playerActual = async (req,res) => {
    let actualPlayer = await (file.get("actualPlayer"))
    if(actualPlayer===1){
        res.json("1");
    }
    else{
        res.json("2");
    }
   
} 

rulesCtrl.tryMove = (req,res)=>{
    let object = methods.validateMove(req.body.matrix,req.body.posX,req.body.posY,req.body.actualPlayer,req.body.matrix[0].lenght); 
    res.json(object.matrix);
}
rulesCtrl.Users = async (req,res)=>{
    console.log('servidor resivio esto '+req.body.id)
    let players = {}
    /*var docRef = db.collection('PlayervsPlayerLocal').doc(req.body.roomId);
    var getDoc = docRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        players=doc.data()
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

    docRef = db.collection('PlayervsPlayerOnline').doc(req.body.roomId);
    getDoc = docRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        players=doc.data()
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
    docRef = db.collection('PlayervsComputer').doc(req.body.roomId);
    getDoc = docRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        players=doc.data()
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });*/
    res.json(players);
}
rulesCtrl.createMatchPvPL= async (req,res)=>{
    let matrix = await methods.crearTablero(req.body.size);

    var docRef = db.collection('PlayervsPlayerLocal/').doc();
    var setTablero =  docRef.set({
    finished:false,
    matrix: matrix.toString(),
    player1: req.body.player1,
    player2: req.body.player2,
    tamanno: req.body.size
    }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        console.log("You can now also access .this as expected: ", this.foo)
        res.json({id:docRef.id,matrix:matrix})
    })
}
rulesCtrl.createMatchPvPO= async (req,res)=>{
    let matrix = await methods.crearTablero(req.body.size);

    db.collection("PlayervsPlayerOnline").add({
        finished:false,
        matrix: matrix.toString(),
        player1: req.body.player1,
        player2: req.body.player2,
        tamanno: req.body.size
    }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        console.log("You can now also access .this as expected: ", this.foo)
        res.json({id:docRef.id,matrix:matrix})
    })

    /*var docRef = db.collection('PlayervsPlayerOnline/').doc();
    var setTablero =  docRef.set({
    finished:false,
    matrix: matrix.toString(),
    jugador1: req.body.player1,
    jugador2: req.body.player2,
    tamanno: req.body.size
    });*/
    //res.json("se creo el tablero, mensaje desde servidor")
}
rulesCtrl.createMatchPvE= async (req,res)=>{
    let matrix = await methods.crearTablero(req.body.size);
    var docRef = db.collection('PlayervsComputer/').doc();
    var setTablero =  docRef.set({
    finished:false,
    matrix: matrix.toString(),
    player1: req.body.player1,
    player2: 'Computer',
    tamanno: req.body.size
    });
    res.json("se creo el tablero, mensaje desde servidor")
}
rulesCtrl.joinMatchPvPO= async (req,res)=>{
    var docRef = db.collection('PlayervsPlayerOnline').doc(req.body.roomId.toString());
    var updateSingle = docRef.update({ player2: req.body.player});
    res.json("se creo el tablero, mensaje desde servidor")
    //res.json("se creo el tablero, mensaje desde servidor")
}
module.exports = rulesCtrl;