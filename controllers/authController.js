import userModel from "../models/userModel";
import {hashPassword} from "../helpers/authHelper";

export const registerController = async(req,res) =>{
    try{
        const {name,email,password,phone,address}=req.body;

        //validations

        if(!name){
            return res.send({error: 'Name is required'})
        }


        if(!email){
            return res.send({error: 'Email is required'})
        }


        if(!password){
            return res.send({error: 'Password is required'})
        }


        if(!phone){
            return res.send({error: 'Phone is required'})
        }


        if(!address){
            return res.send({error: 'Address is required'})
        }

        //check user
        const existingUser = await userModel.findOne({email})


        // existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already register please login'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        //save
        const user=new userModel({name,email,password:hashedPassword,phone,address}).save();
        res.status(201).send({
            success:true,
            message:'User registered successfully',
            user,

        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in registeration',

        })
    }
}

