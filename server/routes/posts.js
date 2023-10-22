import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Photo from "../connection/model.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router
  .route("/")
  .get(async (req, res) => {
    try {
      const posts = await Photo.find();
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Fetching posts failed, please try again",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { name, text, photo } = req.body;
      const PhotoUrl = await cloudinary.uploader.upload(photo);

      const newPost = await Photo.create({
        name,
        text,
        photo: PhotoUrl.url,
      });
      res.status(200).json({ success: true, data: newPost });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to create a post, please try again.",
      });
    }
  });

export default router;
