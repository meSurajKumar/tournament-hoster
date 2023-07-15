import express from 'express';
import cors from 'cors';
const path = require('path')

module.exports = (app:any)=>{
    app.use(express.json({limit:'50mb'}));
    app.use(express.urlencoded({extended:true}));
    app.use(cors());
    app.use(express.static(path.join(__dirname,'../public')))

}