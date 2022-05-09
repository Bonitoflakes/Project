import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // // connects randomly to the three ports here
    // let idx = Math.floor(Math.random() * 3);
    let idx = 0;
    let dbUrl = process.env.MONGO_REPLICATION_SET_URLS.split(",")[idx];
    const conn = await mongoose.connect(process.env.MONGO_ATLAS_URI || dbUrl, {
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
