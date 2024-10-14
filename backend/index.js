import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config({
  path: "./.env",
});
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected !! DB HOST ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongo DBconnection error", error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);


    });
  })
  .catch((err) => {
    console.log("MongoDB connection Failed !", err);
  });
