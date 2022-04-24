import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Connected to the database successfully, ${conn.connection.host}`
    );
    console.log(`Available Models in the database:  ${mongoose.modelNames()}`);
  } catch (error) {
    console.log(`Error while connecting to the database : ${error}`);
  }
};

export { connectDB };
