// import mongoose from "mongoose";

// export const connectDB = async (req, res) => {
//     //mongo server url
//     const url = "mongodb://127.0.0.1:27017/finance_manager";

//     const {connection} = await mongoose.connect(url);

//     console.log(`MongoDB Connection successful to ${connection.host}`);

// }
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

