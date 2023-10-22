import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  name: String,
  text: String,
  photo: String
})

export default mongoose.model('infos', PhotoSchema);
