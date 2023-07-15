import express from 'express';
const router = express.Router()
import adminMethods from '../controllers/adminControllers';

//Tournament Routes :
router.get('/get-tournaments',adminMethods.getAllTournaments)
router.get('/get-tournament/:id',adminMethods.getTournamentById)
router.put('/update-tournament/:id',adminMethods.updateTournament)
router.post('/create-tournament',adminMethods.createTournament)



module.exports = router