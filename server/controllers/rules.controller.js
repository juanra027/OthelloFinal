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
    console.log("antes del validate move")
    console.log(req.body.actualPlayer)
    let object = methods.validateMove(req.body.matrix,req.body.posX,req.body.posY,req.body.actualPlayer,req.body.matrix.length); 
    console.log("despues del validate move")
    res.json(object);
}
rulesCtrl.getUsers = async (req,res)=>{
    let players = {player1:'',player2:''}
    var docRef,getDoc; 
    
    function usersOnline (){
        console.log("Entro a usersOnline")
        docRef= db.collection('PlayervsPlayerOnline').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            usersLocal();
        } else {
            //console.log('Document data:', doc.data());
            players={player1:doc.data().player1,player2:doc.data().player2}
            res.json(players);
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    function usersLocal(){
        console.log("Entro a usersLocal")
        docRef= db.collection('PlayervsPlayerLocal').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            usersComputer();
        } else {
            //console.log('Document data:', doc.data());
            players={player1:doc.data().player1,player2:doc.data().player2}
            res.json(players);
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    function usersComputer(){
        console.log("Entro a usersComputer")
        docRef= db.collection('PlayervsComputer').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            res.json(players)
        } else {
            //console.log('Document data:', doc.data());
            players={player1:doc.data().player1,player2:doc.data().player2}
            res.json(players);
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    usersOnline();    
}
rulesCtrl.createMatchPvPL= async (req,res)=>{
    let matrix = await methods.crearTablero(req.body.size);

    db.collection("PlayervsPlayerLocal").add({
        finished:false,
        matrix: matrix.toString(),
        player1:req.body.player1,
        player2:req.body.player2,
        tamanno: req.body.size
    }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        console.log("You can now also access .this as expected: ", this.foo)
        res.json({id:docRef.id,matrix:matrix})
    })
    /*
    let matrix = await methods.crearTablero(req.body.size);

    var docRef = db.collection('PlayervsPlayerLocal/').doc();
    var setTablero =  docRef.set({
    finished:false,
    matrix: matrix.toString(),
    players: {player1:req.body.player1,player2:req.body.player2},
    tamanno: req.body.size
    }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        console.log("You can now also access .this as expected: ", this.foo)
        res.json({id:docRef.id,matrix:matrix})
    })*/
}
rulesCtrl.createMatchPvPO= async (req,res)=>{
    let matrix = await methods.crearTablero(req.body.size);

    db.collection("PlayervsPlayerOnline").add({
        finished:false,
        matrix: matrix.toString(),
        player1:req.body.player1,
        player2:req.body.player2,
        tamanno: req.body.size
    }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        console.log("You can now also access .this as expected: ", this.foo)
        res.json({id:docRef.id,matrix:matrix})
    })
}
rulesCtrl.createMatchPvE= async (req,res)=>{
    let matrix = await methods.crearTablero(req.body.size);
    var docRef = db.collection('PlayervsComputer/').doc();
    var setTablero =  docRef.set({
    finished:false,
    matrix: matrix.toString(),
    players: {player1:req.body.player1,player2:'Computer'},
    tamanno: req.body.size
    });
    res.json("se creo el tablero, mensaje desde servidor")
}
rulesCtrl.joinMatchPvPO= async (req,res)=>{
    var docRef = db.collection('PlayervsPlayerOnline').doc(req.body.roomId.toString());

    var updateSingle = docRef.update({ "player2.uid": req.body.player.uid,"player2.name":req.body.player.name});
    res.json("se creo el tablero, mensaje desde servidor")
    //res.json("se creo el tablero, mensaje desde servidor")
}
module.exports = rulesCtrl;