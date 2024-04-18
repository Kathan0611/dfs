const express=require('express');
const connect =require('./dbconfig/db')
const app= express();
require('dotenv').config();
const router=require('./Routes/UseRouter');
const authRouter=require('./Routes/authRouter');

PORT=process.env.PORT;
app.use(express.json());
// console.log("LLLLLLLLLLLL")
app.use('/api/v2',authRouter)
app.use('/api/v1',router)


connect().then(()=>{
     app.listen(PORT,()=>{
          console.log(`server is running on ${PORT}`)
     })

}).catch((err)=>console.log(err))

