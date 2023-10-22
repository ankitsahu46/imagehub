import mongoose from 'mongoose';

const connectDb = async (DATABASE) => {
  try {
    const options = {
      user: 'ankitsahu789844',
      pass: 'Ankitsahu@7898',
      dbName: "Photo"
    }

    await mongoose.connect(DATABASE);
    console.log('connected successfully');
  }
  catch (err) {
    console.log("Error connecting to database");
  }
}

export default connectDb;