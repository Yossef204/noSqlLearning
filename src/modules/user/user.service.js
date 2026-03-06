import { ObjectId } from "mongodb";
import { User } from "../../DB/index.js";
import { db } from "../../DB/connection.js";

export const checkUserExist = async (data) => {
  const user = await db.collection("users").findOne(data); // {} | null
  return user;
};

export const createUser = async (data) => {
  return await db.collection("users").insertOne(data);
};

export const updateUser = async (filter, data, options) => {
  filter._id = new ObjectId(filter._id);
  return await db
    .collection("users")
    .findOneAndUpdate(filter, { $set: data }, options);
};

export const filterUserEmailAndPhone = (email, phone) => {
  return {
    $or: [
      {
        $and: [
          { email: { $exists: true } },
          { email: { $ne: null } },
          { email },
        //   { _id: { $ne: new ObjectId(id) } },
        ],
      },
      {
        $and: [
          { phone: { $exists: true } },
          { phone: { $ne: null } },
          { phone },
        //   { _id: { $ne: new ObjectId(id) } },
        ],
      },
    ],
  };
};

export const filterUserEmailAndPhoneById = (email, phone,id) => {
  return {
    $or: [
      {
        $and: [
          { email: { $exists: true } },
          { email: { $ne: null } },
          { email },
          { _id: { $ne: new ObjectId(id) } },
        ],
      },
      {
        $and: [
          { phone: { $exists: true } },
          { phone: { $ne: null } },
          { phone },
          { _id: { $ne: new ObjectId(id) } },
        ],
      },
    ],
  };
};

export const getAllUsers = async (filter) => {
    return await db.collection("users").find(filter).toArray();
};
