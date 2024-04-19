// const { del } = require('express/lib/application');
const User= require('./../model/UserModel');
const bcrypt= require('bcrypt');
exports.createUser = async(req,res)=>{
    try{
        // console.log(req.body)
        const {name,email,password}=req.body;
        if(!name || !email || !password)
        {
            return res.staus(204).json({
                message:'fill required filed ',
                data:{
                    User:User
                }
            })
        }
        
        const hashPassword =bcrypt.hashSync(password,12);
        const user=new User({name:name,email:email,password:hashPassword});
        await user.save();
       return res.status(200).json({
            data:{
                status:'Success',
                User:user
            }
        })

    }
    catch(err){
        res.status(400).json({message:err.message});
    }
    
}


exports.get5document=async (req,res)=>{
    try{
        const user=await User.find({}).limit(5);
        
         if(!user){
           return res.status(404).json({
                message:"document not found"
            })
         }

        return res.status(200).json({
            data:{
                staus:'Success',
                result:user.length,
                data:{
                    user:user
                }
            }
         })

    }
    catch(err){
        res.staus(400).json({
            message:err.message
        })
    }
}

exports.singleUser= async(req,res)=>{
   try{
       const {id}=req.params;
    //    console.log("::::::::::::::::::::")
       const user= await User.findById(id);
      if(!user){
       return res.status(404).json({
            message:"document not found"
        })
     }
     
     return res.status(200).json({
        data:{
            staus:'Success',
            data:{
                user:user
            }
        }
     })


    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}


exports.upadateUser= async(req,res)=>{
    try{
       
        const{id}=req.params;
        const {name,email,password}=req.body;
        const UpdatedUser=await User.findByIdAndUpdate(id,{name:name,email:email,password:bcrypt.hashSync(password,12)},{new:true});
        if(!UpdatedUser){
           
            res.status(404).json('Document is not found')
        }
          await UpdatedUser.save();

       return res.status(200).json({
            status:'Success',
            data:{
                UpdateUser:UpdatedUser
            }
        })



    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}


exports.deleteUser= async (req,res)=>{
    try{
        const {id}=req.params;
        const deleteUser = await User.findByIdAndDelete(id);

        if(!deleteUser){
            res.status(404).json({message:"document is not found"})
        }

        res.status(200).json({
            status:"success",
            data:{
                deleteUser:deleteUser
            }
        })

    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

exports.dashbord =async (req,res)=>{
    try{
         const user= await User.aggregate([{$count:"name"}])
        //  const user= await User.find({})
         if(!user){
            res.status(404).json({message:'User document Not Found '})
         }
res.render("dashbord", {count: user[0].name})
        //  res.status(200).json({
        //     status:"success",
        //     // result:user.length,
        //     message:'No of User',
        //     data:{
        //         user:user[0].name
        //     }
        //  })
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}



