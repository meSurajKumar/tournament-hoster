"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const tournament_1 = __importDefault(require("../models/tournament"));
const async_1 = __importDefault(require("../middlewares/async"));
class AdminMethods {
    constructor() {
        /**
         *  Create Tournament
         * @param {name, tournamentType}
         * @return {JOSN}
         */
        this.createTournament = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const tournamentTime = (0, moment_1.default)().unix();
            const tournament = new tournament_1.default(Object.assign(Object.assign({}, req.body), { time: tournamentTime }));
            yield tournament.save();
            return res.status(200).send({ message: "Tournament Created Successfully", data: tournament });
        }));
        /**
         * Get All Tournaments
         * @param {}
         * @return {JOSN}
         */
        this.getAllTournaments = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const tournaments = yield tournament_1.default.find();
            return res.status(200).send({ message: "All tournaments", data: tournaments });
        }));
        /**
         * Get Tournament By Id
         * @param {}
         * @return {JOSN}
         */
        this.getTournamentById = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const tournament = yield tournament_1.default.findById({ _id: req.params.id });
            return res.status(200).send({ message: "Tournament Details", data: tournament });
        }));
        /**
         * Update Tournament By Id
         * @param {tournamentID ,tournamentPass}
         * @return {JOSN}
         */
        this.updateTournament = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const tournament = yield tournament_1.default.updateOne({ _id: req.params.id }, { tournamentID: req.body.tournamentID, tournamentPass: req.body.tournamentPass });
            return res.status(200).send({ message: "Tournament Updated Successfully", data: tournament });
        }));
    }
}
const adminMethods = new AdminMethods();
exports.default = adminMethods;
