"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const adminControllers_1 = __importDefault(require("../controllers/adminControllers"));
//Tournament Routes :
router.get('/get-tournaments', adminControllers_1.default.getAllTournaments);
router.get('/get-tournament/:id', adminControllers_1.default.getTournamentById);
router.put('/update-tournament/:id', adminControllers_1.default.updateTournament);
router.post('/create-tournament', adminControllers_1.default.createTournament);
module.exports = router;
