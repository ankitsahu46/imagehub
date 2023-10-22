// import express from 'express';
// import { Configuration, OpenAIApi } from 'openai';
// import dotenv from 'dotenv';

// dotenv.config();

// const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPEN_AI_API
// })

// const openai = new OpenAIApi(configuration);

// router.route('/').post( async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const aiResponse = await openai.Image.create({
//       prompt,
//       n: 1,
//       size: '1024x1024',
//       response_format: 'b64_json'
//     })
//     const image = aiResponse.data.data[0].b64_json;
//     res.status(200).json({photo: image});
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send(err?.response.data.error.message || "something went wrong");
//   }

// })

// export default router;
