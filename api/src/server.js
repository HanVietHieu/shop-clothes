import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 3003;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(process.env.PORT);
  console.log("Server is running on port 3000");
});
