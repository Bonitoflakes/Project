import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true, useUnifiedTopology: true,
            });
        console.log(`Connected to the database successfully, ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error while connecting to the database : ${error}`);
    }
}

export { connectDB };