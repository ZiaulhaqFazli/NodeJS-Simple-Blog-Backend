import User from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUsers = async(req, res, next) => {
    let allUsers;
    try{
        allUsers = await User.find();
    }catch(err){
        console.log(err);
    }
    if(!allUsers){
        return res.status(400).json({ message: "No users found!"})
    }
    return res.status(200).json({allUsers});
}

export const signup = async(req, res, next) => {
    const { name, email, password } = req.body;
    let userExists;
    try{
        userExists = await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(userExists){ 
        return res.status(400).json({ message: "User already exists! Login instead :)"});
    }
    
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[],
    });

    try{
        await newUser.save();
    }catch(err){
        console.log(err);
    }
    return res.status(201).json({ message: "Signup Completed!", newUser})
}


export const login = async(req, res, next) => {
    const { email, password } = req.body;
    let userExists;
    try{
        userExists = await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(!userExists){
        return res.status(404).json({ message: "User does not exists!"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, userExists.password);
    if(!isPasswordCorrect){
        return res.status(400).json({ message: "Incorrect Credentials! "});
    }
    return res.status(201).json({ message: "Logged In successfully!"});
}