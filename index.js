import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./Routes/user-routes.js";
import { blogRouter } from "./Routes/blog-routes.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());

// app.use(bodyParser.json());

app.use(express.json());

// app.use("/api", (req, res, next) => {
//     res.send("Hi");
// })

// app.use((error, req, res, next) => {});

app.use("/api/user", userRouter);

app.use("/api/blog", blogRouter);

// app.use('/api/users', router)

// app.use('/user/signup', router)

dotenv.config();

const mongoURL = process.env.MONGO_URL;

// console.log(process.env.MONGO_URL);

const connectToMongo = () => {
  try {
    const res = mongoose.connect(mongoURL);
    // console.log("connected to database and listening to port 5000");
  } catch (error) {
    // console.log("error");
  }
};

connectToMongo();

app.listen(process.env.PORT);
