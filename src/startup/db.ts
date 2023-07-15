import mongoose from 'mongoose';

module.exports = function(){
    const db = process.env.DATABASE_URL as string
    mongoose.set('strictQuery',true);
    mongoose.connect(db).then(()=>{console.log(`Connected To Database`)}
    ).catch(err=>{console.log(`Failed to connect : ${err}`)})
}