import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let idx = 0;
    let dbUrl = process.env.MONGO_REPLICATION_SET_URLS.split(",")[idx];
    // dbUrl = process.env.MONGO_URI_ATLAS;
    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Connected to the database successfully, ${conn.connection.host}`
    );
    console.log(`Available Collections in the database:  ${mongoose.modelNames()}`);
  } catch (error) {
    console.log(`Error while connecting to the database : ${error}`);
  }
};

export { connectDB };
