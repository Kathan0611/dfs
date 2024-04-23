const User = require("./../model/UserModel");
const Product = require("../model/ProductModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


//create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      req.flash()
      return res.staus(204).json({
        message: "fill required filed ",
        data: {
          User: User,
        },
      });
    }

    const hashPassword = bcrypt.hashSync(password, 12);
    const user = new User({ name: name, email: email, password: hashPassword });
    await user.save();
    return res.status(201).json({
      data: {
        status: "Success",
        User: user,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//getTop5 User
exports.get5document = async (req, res) => {
  try {
    const token = req.headers.authorization.toString().split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing in headers" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    const userId = decoded;
    const user = await User.find({ _id: userId }).limit(5);
    if (!user) {
      return res.status(404).json({
        message: "document not found",
      });
    }

    return res.status(200).json({
      data: {
        staus: "Success",
        result: user.length,
        data: {
          user: user,
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};


//get SingleUser
exports.singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.toString().split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing in headers" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded === id) {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          message: "document not found",
        });
      }

      return res.status(200).json({
        data: {
          staus: "Success",
          data: {
            user: user,
          },
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};


//Update User
exports.upadateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const token = req.headers.authorization.toString().split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing in headers" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    if (decoded === id) {
      const UpdatedUser = await User.findByIdAndUpdate(
        id,
        { name: name, email: email, password: bcrypt.hashSync(password, 12) },
        { new: true }
      );
      if (!UpdatedUser) {
        res.status(404).json("Document is not found");
      }
      await UpdatedUser.save();

      return res.status(200).json({
        status: "Success",
        data: {
          UpdateUser: UpdatedUser,
        },
      });
    } else {
      return res.status(401).json({ message: "Unauthorization User" });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};


//deleteUser
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.toString().split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing in headers" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log(decoded);
    if (decoded === id) {
      const deleteUser = await User.findByIdAndDelete(id);

      if (!deleteUser) {
        res.status(404).json({ message: "document is not found" });
      }

      res.status(200).json({
        status: "success",
        data: {
          deleteUser: deleteUser,
        },
      });
    } else {
      return res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};


//dashbord
exports.dashbord = async (req, res) => {
  try {
    const user = await User.aggregate([{ $count: "name" }]);

    if (!user) {
      res.status(404).json({ message: "User document Not Found " });
    }
    res.render("dashbord", { count: user[0].name },{toggle:'OFF'});
    //  })
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


//getAll product for sequelize
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({
      data: {
        message: error.message,
      },
    });
  }
};

//create Product
exports.createProduct=async (req,res)=>{
    try{
   
        // const{name,price,description}=req.body;

        const product= await Product.create(req.body);

        return res.status(200).json({
            data:{
                status:'success',
                data:product
            }
        })
    }
    catch(err){
        res.status(400).json({
            data:{
                message:err.message
            }
        })
    }
}