import { Router } from "express";
import { checkUserExist, createUser, filterUserEmailAndPhone, filterUserEmailAndPhoneById, updateUser } from "./user.service.js";
import { ObjectId } from "mongodb";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    //destructure the body
    const { email, phone } = req.body;
    //check if user exists
    const userExist = await checkUserExist(filterUserEmailAndPhone(email, phone));
    //if exists return error
    if (userExist) {
      throw new Error("User already exists", { cause: 409 });
    }
    //else create user and return success
    const { insertedId } = await createUser(req.body);
    return res.status(201).json({
      message: "user craeted successfully",
      success: true,
      data: { user: insertedId },
    });
  } catch (error) {
    res.status(error?.cause || 500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res, next)=>{
 try {
   //destruct the params
  const {id} = req.params;
  //destructure the body
  const {name,phone,email}=req.body;
  //check if user exists
  const userExist = filterUserEmailAndPhoneById(email,phone,id);

  if(userExist){
    throw new Error("User already exists", {cause : 409});
  }
  const updatedUser = await updateUser({_id : id},{name,phone},{returnDocument : "after"});
  //if not exists return error
  if(!updatedUser){
    throw new Error("User not found", {cause: 404});
  }
  //else update user and return success
  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: {user: updatedUser}
  });
 } catch (error) {
  res.status(error?.cause || 500).json({
    success: false,
    message: error.message,
  });
 }
})

export default router;
