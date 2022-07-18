import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
// db and authenticateUser
import connectDB from "./db/connect.js";

// for deploy
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

// router
import respondents from "./routes/respondents.js";

// make json data avaliable to us in the controller
app.use(express.json());

app.use(helmet()); // secure header
app.use(xss());
app.use(mongoSanitize()); // prevent MongoDB Operator Injection

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
