import {Express , Request , Response} from 'express'

const authRoutes = require('../routes/authRoutes')
const adminRouter = require('../routes/adminRoutes')

module.exports = function(app:Express){
    app.get('/',(req:Request , res:Response)=>{
        return res.status(200).send(`Welcome to your-images`)
    })
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/admin',adminRouter)

    app.use('*',(req:Request , res:Response)=>{
        return res.status(400).send(`Route You are looking for not exists!`)
    })
}
