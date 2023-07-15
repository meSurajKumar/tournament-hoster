import {Response , Request} from 'express'
import moment from "moment";
import Tournament from "../models/tournament";
import asyncMiddleware from "../middlewares/async";

class AdminMethods {
    constructor(){ }

    /**
     *  Create Tournament
     * @param {name, tournamentType}
     * @return {JOSN}
     */
    createTournament = asyncMiddleware(async(req:Request , res:Response)=>{
        const tournamentTime = moment().unix()
        const tournament =new Tournament({
            ...req.body,
            time:tournamentTime
        })
        await tournament.save()
        return res.status(200).send({message :"Tournament Created Successfully", data:tournament })
    })

    /**
     * Get All Tournaments
     * @param {}
     * @return {JOSN}
     */
    getAllTournaments  = asyncMiddleware(async(req:Request , res:Response)=>{
        const tournaments = await Tournament.find()
        return res.status(200).send({message:"All tournaments", data:tournaments})
    })

    /**
     * Get Tournament By Id
     * @param {}
     * @return {JOSN}
     */
     getTournamentById = asyncMiddleware(async(req:Request , res:Response)=>{
        const tournament = await Tournament.findById({_id:req.params.id})
        return res.status(200).send({message:"Tournament Details", data:tournament})
    })

    /**
     * Update Tournament By Id
     * @param {tournamentID ,tournamentPass}
     * @return {JOSN}
     */
    updateTournament  = asyncMiddleware(async(req:Request , res:Response)=>{
        const tournament = await Tournament.updateOne({_id:req.params.id},{tournamentID:req.body.tournamentID , tournamentPass:req.body.tournamentPass})
        return res.status(200).send({message:"Tournament Updated Successfully", data:tournament})
    })


}

const adminMethods = new AdminMethods()
export default adminMethods