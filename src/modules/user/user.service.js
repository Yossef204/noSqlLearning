import { User } from "../../DB/index.js";

export const checkUserExist = async (data)=>{
   const user = await User.findOne(data)   // {} | null
    return user;
};


export const createUser = async (data)=>{
    return await User.insertOne(data);
};