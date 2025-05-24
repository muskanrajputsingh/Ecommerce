const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.post('/signup', async (req, res) => {
    const { name, phone, email, password, isAdmin } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        const existingUserPh = await User.findOne({ phone: phone });
        
        if (existingUser || existingUserPh) {
            return res.status(400).json({ status: false, msg: "User already exists!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            name: name,
            phone: phone,
            email: email,
            password: hashPassword,
            isAdmin: isAdmin || false  // Default to false if not provided
        });

        const token = jwt.sign(
            { email: result.email, id: result._id, isAdmin: result.isAdmin },
            process.env.JSON_WEB_TOKEN_SECRET_KEY
        );

        res.status(200).json({
            user: result,
            token: token,
            msg: "User registered successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: "Something went wrong" });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ status: false, msg: "User not found!" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ status: false, msg: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id, isAdmin: existingUser.isAdmin },
            process.env.JSON_WEB_TOKEN_SECRET_KEY
        );

        res.status(200).json({
            user: existingUser,
            token: token,
            msg: "User Authenticated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: "Something went wrong" });
    }
});

router.get('/', async (req, res) => {
    try {
        const userList = await User.find();
        if (!userList) {
            return res.status(500).json({ success: false });
        }
        res.status(200).send(userList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Something went wrong" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'The user with the given ID was not found.' });
        }
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            return res.status(200).json({ success: true, message: 'User deleted successfully!' });
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error });
    }
});

router.put('/:id', async (req, res) => {
    const { name, phone, email, password, isAdmin } = req.body;

    try {
        const userExist = await User.findById(req.params.id);
        if (!userExist) {
            return res.status(404).json({ status: false, msg: "User not found!" });
        }

        let newPassword;
        if (password) {
            newPassword = bcrypt.hashSync(password, 10);
        } else {
            newPassword = userExist.password;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: name,
                phone: phone,
                email: email,
                password: newPassword,
                isAdmin: isAdmin !== undefined ? isAdmin : userExist.isAdmin // Only update if provided
            },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ status: false, msg: 'User update failed' });
        }

        res.status(200).json({ status: true, msg: "User updated successfully!", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, msg: "Something went wrong" });
    }
});

module.exports = router;





// const {User} = require('../models/user');
// const express = require('express');
// const router=express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken");

// router.post('/signup',async(req,res)=>{
//     const {name,phone,email,password}=req.body;

//     try{
//         const existingUser = await User.findOne({email:email});
//         const existingUserPh = await User.findOne({email:email});
//         if(existingUser && existingUserPh){
//             res.status(400).json({status:false,msg:"user already exist!"})
//         }

//         const hashPassword = await bcrypt.hash(password,10);

//         const result = await User.create({
//             name:name,
//             phone:phone,
//             email:email,
//             password:hashPassword
//         });
//         const token = jwt.sign({email:result.email , id:result._id},process.env.JSON_WEB_TOKEN_SECRET_KEY);
        
//         res.status(200).json({
//             user:result,
//             token:token
//         })
//     }catch(error){
//         console.log(error)
//         res.status(500).json({status:false,msg:"something went wrong"});
//     }
// })

// router.post('/signin',async(req,res)=>{
//     const {email,password}=req.body;
//     try{
//         const existingUser=await User.findOne({email:email});
//         if(!existingUser){
//             res.status(404).json({status:false , msg:"User not found!"})
//         }
//         const matchPassword = await bcrypt.compare(password,existingUser.password);
//         if(!matchPassword){
//             return res.status(400).json({status:false,msg:"Invalid Credentials"})
//         }
//         const token=jwt.sign({email:existingUser.email,id:existingUser._id},process.env.JSON_WEB_TOKEN_SECRET_KEY);
        
//         res.status(200).json({
//             user:existingUser,
//             token:token,
//             msg:"User Authenticated"
//         })
//     }catch(error){
//         console.log(error);
//         res.status(500).json({status:false,msg:"something went wrong"});
//     }
// })

// router.get('/',async(req,res)=>{
//     const userList = await User.find();
//     if(!userList){
//         res.status(500).json({success:false})
//     }
//     res.send(userList);
// })

// router.get('/:id',async(req,res)=>{
//     const user=await User.findById(req.params.id);
//     if(!user){
//         res.status(500).json({message:'The user with the given id was not found.'})
//     }
//     res.status(200).send(user);
// })

// router.delete('/:id',(req,res)=>{
//     User.findByIdAndDelete(req.params.id).then(user=>{
//         if(user){
//             return res.status(200).json({success:true,message:'the user is deleted!'})
//         }else{
//             return res.status(404).json({success:false,message:"user not found"})
//         }
//     }).catch(err=>{
//         return res.status(500).json({success:false,error:err})
//     })
// })

// router.put('/:id',async(req,res)=>{
//     const {name,phone,email,password} = req.body;
//     const userExist = await User.findById(req.params.id);
//     let newPassword
//     if(req.body.password){
//         newPassword=bcrypt.hashSync(req.body.password,10)
//     }else{
//         newPassword=userExist.passwordHash;
//     }
//     const user = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//             name:name,
//             phone:phone,
//             email:email,
//             password:newPassword
//         },
//         {new:true}
//     )
//     if(!user)
//         return res.status(400).send('the user cannot be Updated')
//         res.send(user);
// })
// module.exports=router;