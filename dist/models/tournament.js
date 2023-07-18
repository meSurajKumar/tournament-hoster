"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tournamentSchema = new mongoose_1.Schema({
    tournamentName: { type: String },
    tournamentType: { type: String },
    time: { type: String },
    tournamentID: { type: String },
    tournamentPass: { type: String }
}, {
    timestamps: true,
    versionKey: false
});
const Tournament = (0, mongoose_1.model)('tournaments', tournamentSchema);
exports.default = Tournament;
