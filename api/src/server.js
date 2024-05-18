import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
const userRoutes = require("./router/index");
import sequelize from "./Connections/connectDb";

const PORT = process.env.PORT || 3003;
const app = express();
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const connectDb = sequelize();
sequelize();
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(process.env.PORT);
  console.log(`Server is running on port ${process.env.PORT}`);
});
