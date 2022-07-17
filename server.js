import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
// db and authenticateUser
import connectDB from "./db/connect.js";

// router
import respondents from "./routes/respondents.js";

// middleware
app.use(express.static("./client/public"));
app.use(express.json());

app.use("/api/respondents", respondents);

// direct the get route to the index.html, and react would do the job
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
