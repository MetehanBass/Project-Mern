import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import shelterRouter from "./routes/shelter.js";
import petRouter from "./routes/pet.js";
import donateRouter from "./routes/donate.js";

//mongodb+srv://barinaktanal:<password>@cluster0.eemsp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); //http://localhost:5000/users/signup
app.use("/shelter", shelterRouter); //http://localhost:5000/shelter
app.use("/pet", petRouter); //http://localhost:5000/pet
app.use("/donate", donateRouter); //http://localhost:5000/donate

const MONGODB_URL =
  "mongodb+srv://barinaktanal:barinak123@cluster0.eemsp.mongodb.net/barinaktanal?retryWrites=true&w=majority";

const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port} .`));
  })
  .catch((error) => console.log(`${error} did not connect.`));
