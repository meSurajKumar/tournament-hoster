import { string } from "joi";
import { Schema , model } from "mongoose";

const tournamentSchema = new Schema({
    tournamentName : {type:String},
    tournamentType:{type:String},
    time:{type:String},
    tournamentID:{type:String},
    tournamentPass:{type:String}
},{
    timestamps:true,
    versionKey:false
})

const Tournament = model('tournaments',tournamentSchema)
export default Tournament