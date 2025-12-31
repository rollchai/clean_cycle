import usermodel from "../model/User.js";
import bcrypt from "bcrypt"
  import jwt from "jsonwebtoken";

export const register=async(req,res)=>{
    try {
        let user=await usermodel.findOne({
            email:req.body.email
        })
        if(user){
            res.status(201).send({message:"user already register"})
            return   
        }
        const hashpass=await bcrypt.hash(req.body.password,10)
        let userinfo=await usermodel.create({
          email:req.body.email,
          password:hashpass,
          role:req.body.role,
          name:req.body.name,
          address:req.body.address,
       
        })
        if(userinfo)
        {
            res.status(201).send({message:"user created"})
        }
            else res.status(401).send({message:"user not created"})
    } catch (e) {
        res.status(404).send({message:"fail"})
    }
}
export const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const userData = await usermodel.findOne({ email });

    if (!userData) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

   const isMatch = await bcrypt.compare(password, userData.password);
if (!isMatch) {
  res.status(401).send({message:"unable to login" }); 
} 
const token =jwt.sign(
  {id:userData._id,
    role:userData.role,
  },
  process.env.JWT_SECRET,
  {expiresIn:"1h"}
)
res.status(200).send({
  id:userData._id,
  role:userData.role,
  token
})
  
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).send({ message: "Server error" });
  }
};

export const getallagents=async(req,res)=>{
    try {
        const agents=await usermodel.find({
            role:"agent"
            
        });
        res.json(agents)
    } catch (error) {
        res.status(500).json({error:"Failed to fetch agent"})
    }
}
//update profile



export const updateProfile = async (req, res) => {
  try {
    const update =await usermodel.findByIdAndUpdate(
      req.body._id,
      {
         name:req.body.name,
    email: req.body.email,
    password:req.body.password,
    role:req.body.role,
      address:req.body.address,
     area:req.body.area,
 
      },
      {new:true}
    )
    res.json(update)
  } catch (error) {
    res.status(500).json({error:"failed to update"})
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = await usermodel.findById(req.params.id).select("name email address area points score");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch user profile" });
  }
};



