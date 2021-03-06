const express = require('express');
const router = express.Router();
const rulesCtrl = require('../controllers/rules.controller')

router.get('/getMatrix',rulesCtrl.getMatrix)//pide
router.get('/playerActual',rulesCtrl.playerActual)//pide


router.put('/rules/:posX/:posY',rulesCtrl.tryMove)//actualiza
router.post('/createMatchPvPL',rulesCtrl.createMatchPvPL)//crea matriz
router.post('/createMatchPvPO',rulesCtrl.createMatchPvPO)//crea matriz
router.post('/createMatchPvE',rulesCtrl.createMatchPvE)//crea matriz
router.put('/joinMatchPvPO',rulesCtrl.joinMatchPvPO)//crea matriz
router.put('/updateMatch/:roomId',rulesCtrl.updateMatch)//crea matriz
router.put('/getUsers/:id',rulesCtrl.getUsers)//pide
router.put('/surrender/:id',rulesCtrl.surrender)//pide
router.put('/getMatch/:id',rulesCtrl.getMatch)//pide
router.put('/getAllOnlineRooms',rulesCtrl.getAllOnlineRooms)//pide
router.put('/getAllPlayingRooms',rulesCtrl.getAllPlayingRooms)//pide
router.put('/getPuntaje',rulesCtrl.getPuntaje)//pide
//router.post//crea datos
//router.delete//elimina datos

module.exports = router;