const mongoose=require('mongoose');

const connect =async (req,res)=>{

    await mongoose.connect('mongodb://localhost:27017/toggle');
     
    console.log(`Database Successfully connected`)

}

module.exports=connect;