import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
const port = 3000;
const app = express();

const dbURI = "mongodb+srv://ziaulhaq:Galaxy58P@mongocluster.wcymfq3.mongodb.net/node-db?retryWrites=true&w=majority";
//Mongoose connect function
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(port))
    .then(() => console.log("Mongoose is Connected!"))
    .catch((error) => console.log(error));


app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);
