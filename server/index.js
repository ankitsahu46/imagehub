import express from "express";
import cors from "cors";
import connectDb from "./connection/connect.js";
// import dalle from './routes/dalle.js';
import dotenv from "dotenv";
import post from "./routes/posts.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api/v1/dalle', dalle);

app.get("/", (req, res) => {
  res.status(200).send("Hello from DALL-E!");
});
app.use("/post", post);

async function serverConnect() {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(5000, () => {
      return console.log("server is listening on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
}
serverConnect();
