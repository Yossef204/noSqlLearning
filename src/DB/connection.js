import {MongoClient} from 'mongodb'
export const client = new MongoClient(process.env.DB_HOST);

export function connectDB(){
    client.connect().then(()=>{
        console.log("db connected successfully");
    }).catch((err)=>{
        console.log("db failed to connect",err);
    })
}

export const db = client.db("sticky-notes");