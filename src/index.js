import express from 'express';
import { connectDB } from './DB/connection.js';
import { noteRouter, userRouter } from './modules/index.js';

const app = express();

connectDB();
app.use(express.json());

app.use("/user",userRouter)
app.use("/note",noteRouter)
const port = 3000
app.listen(port, () => console.log(` app listening on port ${port}!`))
