const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing in environment variables");
  }

  await mongoose.connect(uri, {
    autoIndex: true,
  });
};

module.exports = connectDB;
