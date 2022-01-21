const mongoose = require("mongoose");
const { dbURI } = require("./config.json");

const connectDB = async () => {
  const conn = await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = { connectDB };
