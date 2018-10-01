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
rulesCtrl.getPuntaje = async (req,res)=>{
    let puntaje = methods.calculaPuntaje(req.body.matrix,req.body.matrix.length)
    res.json(puntaje)
} 

rulesCtrl.tryMove = (req,res)=>{
    //console.log("antes del validate move")
    //console.log(req.body.actualPlayer)
    //let object = methods.movimiento(req.body.matrix,req.body.posX,req.body.posY,[req.body.actualPlayer,req.body.computer,req.body.difficulty],req.body.matrix.length)
    let object = methods.validateMove(req.body.matrix,req.body.posX,req.body.posY,req.body.actualPlayer,req.body.matrix.length); 
    //console.log("despues del validate move")
    res.json(object);
}
rulesCtrl.getUsers = async (req,res)=>{
    let players = {player1:'',player2:''}
    var docRef,getDoc; 
    
    function usersOnline (){
        //console.log("Entro a usersOnline")
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
        //console.log("Entro a usersLocal")
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
        //console.log("Entro a usersComputer")
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
        tamanno: req.body.size,
        actPlayer: req.body.actPlayer
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
        player1:req.body.player1,
        player2:req.body.player2,
        tamanno: req.body.size,
        actPlayer: req.body.actPlayer
    }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        console.log("You can now also access .this as expected: ", this.foo)
        res.json({id:docRef.id,matrix:matrix})
    })
}
rulesCtrl.createMatchPvE= async (req,res)=>{
    let matrix = await methods.crearTablero(req.body.size);

    //methods.movimiento(matrix,0,0,[1,0,null],matrix.length)
    db.collection("PlayervsComputer").add({
        finished:false,
        matrix: matrix.toString(),
        player1:req.body.player1,
        player2:req.body.player2,
        //difficulty:req.body.difficulty,
        tamanno: req.body.size,
        actPlayer: req.body.actPlayer
    }).then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        console.log("You can now also access .this as expected: ", this.foo)
        res.json({id:docRef.id,matrix:matrix})
    })
}
rulesCtrl.joinMatchPvPO= async (req,res)=>{
    var docRef = db.collection('PlayervsPlayerOnline').doc(req.body.roomId.toString());

    var updateSingle = docRef.update({ "player2.uid": req.body.player.uid,"player2.name":req.body.player.name});
    res.json("se creo el tablero, mensaje desde servidor")
    //res.json("se creo el tablero, mensaje desde servidor")
}
rulesCtrl.getMatch = async (req,res)=>{
    //let players = {player1:'',player2:''}
    let match=null;
    var docRef,getDoc; 
    
    function matchOnline (){
        //console.log("Entro a usersOnline")
        docRef= db.collection('PlayervsPlayerOnline').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            matchLocal();
        } else {
            //console.log('Document data:', doc.data());
            match=doc.data()
            res.json(match);
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    function matchLocal(){
        //console.log("Entro a usersLocal")
        docRef= db.collection('PlayervsPlayerLocal').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            matchComputer();
        } else {
            //console.log('Document data:', doc.data());
            match=doc.data()
            res.json(match);
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    function matchComputer(){
        //console.log("Entro a usersComputer")
        docRef= db.collection('PlayervsComputer').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            res.json(match)
        } else {
            //console.log('Document data:', doc.data());
            match=doc.data()
            res.json(match);
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    matchOnline();    
}
rulesCtrl.updateMatch = async (req,res)=>{
    //let players = {player1:'',player2:''}
    //console.log("empieza updatematch")
    var docRef,getDoc; 
    
    function updateMatchOnline (){
        //console.log("Entro a usersOnline")
        docRef= db.collection('PlayervsPlayerOnline').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            updateMatchLocal();
        } else {
            //console.log('llego a donde hace el update');
            var updateSingle = docRef.update({"actPlayer.uid": req.body.actualPlayer.uid,"actPlayer.piece":req.body.actualPlayer.piece,"matrix":req.body.matrix.toString()});
            res.json("se creo el tablero, mensaje desde servidor")
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    function updateMatchLocal(){
        //console.log("Entro a usersLocal")
        docRef= db.collection('PlayervsPlayerLocal').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            updateMatchComputer();
        } else {
            //console.log('Document data:', doc.data());
            var updateSingle = docRef.update({ "actPlayer.uid": req.body.actualPlayer.uid,"actPlayer.piece":req.body.actualPlayer.piece,"matrix":req.body.matrix.toString()});
            res.json("se creo el tablero, mensaje desde servidor")
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    function updateMatchComputer(){
        //console.log("Entro a usersComputer")
        docRef= db.collection('PlayervsComputer').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            res.json(match)
        } else {
            //console.log('Document data:', doc.data());
            var updateSingle = docRef.update({ "actPlayer.uid": req.body.actualPlayer.uid,"actPlayer.piece":req.body.actualPlayer.piece,"matrix":req.body.matrix.toString()});
            res.json("se creo el tablero, mensaje desde servidor")
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    updateMatchOnline();    
}
rulesCtrl.surrender = async (req,res)=>{
    //let players = {player1:'',player2:''}
    //console.log("empieza updatematch")
    var docRef,getDoc;
    
    function updateMatchOnline (){
        //console.log("Entro a usersOnline")
        docRef= db.collection('PlayervsPlayerOnline').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            updateMatchLocal();
        } else {
            //console.log('llego a donde hace el update');
            var updateSingle = docRef.update({"finished":true});
            res.json("se creo el tablero, mensaje desde servidor")
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    function updateMatchLocal(){
        //console.log("Entro a usersLocal")
        docRef= db.collection('PlayervsPlayerLocal').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            updateMatchComputer();
        } else {
            //console.log('Document data:', doc.data());
            var updateSingle = docRef.update({"finished":true});
            res.json("se creo el tablero, mensaje desde servidor")
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    function updateMatchComputer(){
        //console.log("Entro a usersComputer")
        docRef= db.collection('PlayervsComputer').doc(req.body.roomId);
        getDoc = docRef.get()
        .then(doc => {
        if (!doc.exists) {
            res.json(match)
        } else {
            //console.log('Document data:', doc.data());
            var updateSingle = docRef.update({"finished":true});
            res.json("se creo el tablero, mensaje desde servidor")
        }
        })
        .catch(err => {
        console.log('Error getting document', err);
        });
    }
    updateMatchOnline();    
}
rulesCtrl.getAllOnlineRooms = async (req,res)=>{
    var rooms=[]
    var docRef = db.collection('PlayervsPlayerOnline');
    var getDoc = docRef.get()
    .then(snapshot => {
        //console.log(snapshot.length)
      snapshot.forEach(doc => {
          if(doc.data().actPlayer.piece===0&&doc.data().actPlayer.uid!==req.body.userUid){
              rooms.push({roomId:doc.id,data:doc.data()})
          }
      });
      res.json({rooms:rooms})
    })
    .catch(err => {
      console.log('Error getting documents', err);
      res.json({rooms:[]})
    });

}
rulesCtrl.getAllPlayingRooms = async (req,res)=>{
    var rooms=[]
    var docRef,getDoc;
    
    function getPlayingMatchOnline (){
        docRef= db.collection('PlayervsPlayerOnline')
        getDoc = docRef.get()
        .then(snapshot => {
            //console.log(snapshot.length)
          snapshot.forEach(doc => {
            if(doc.data().finished===false&&(doc.data().player1.uid===req.body.userUid||doc.data().player2.uid===req.body.userUid)){
                rooms.push({roomId:doc.id,data:doc.data()})
            }
          });
          getPlayingMatchLocal()
        })
        .catch(err => {
            getPlayingMatchLocal()
          console.log('Error getting documents', err);
        });
    }
    function getPlayingMatchLocal(){
        //console.log("Entro a usersLocal")
        docRef= db.collection('PlayervsPlayerLocal')
        getDoc = docRef.get()
        .then(snapshot => {
            //console.log(snapshot.length)
          snapshot.forEach(doc => {
            if(doc.data().finished===false&&(doc.data().player1.uid===req.body.userUid||doc.data().player2.uid===req.body.userUid)){
                rooms.push({roomId:doc.id,data:doc.data()})
            }
          });
          getPlayingMatchComputer();
        })
        .catch(err => {
            getPlayingMatchComputer();
          console.log('Error getting documents', err);
        });
    }
    function getPlayingMatchComputer(){
        //console.log("Entro a usersComputer")
        docRef= db.collection('PlayervsComputer')
        getDoc = docRef.get()
        .then(snapshot => {
            //console.log(snapshot.length)
          snapshot.forEach(doc => {
            if(doc.data().finished===false&&(doc.data().player1.uid===req.body.userUid||doc.data().player2.uid===req.body.userUid)){
                rooms.push({roomId:doc.id,data:doc.data()})
            }
          });
          //console.log(rooms)
          res.json({rooms:rooms})
        })
        .catch(err => {
            res.json({rooms:rooms})
          console.log('Error getting documents', err);
        });
    }
    getPlayingMatchOnline();
}


module.exports = rulesCtrl;