const mongoose =require('mongoose')
const colors =require('colors')

const connectDB =async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected successfully `)

    } catch(error){
        console.log(`Mongodb Server Issue ${error}`)
    }
};

module.exports=connectDB;

