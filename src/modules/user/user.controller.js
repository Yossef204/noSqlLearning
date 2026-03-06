import { Router } from "express";
import { checkUserExist, createUser } from "./user.service.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    //destructure the body
    const { email, phone } = req.body;
    //check if user exists
    const userExist = await checkUserExist({
      $or: [
        {
          $and: [
            { email },
            { email: { $exists: true } },
            { email: { $ne: null } },
          ],
        },
        {
          $and: [
            { phone },
            { phone: { $exists: true } },
            { phone: { $ne: null } },
          ],
        },
      ],
    });
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

export default router;
