const mongoose = require('mongoose');
const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb+srv://ronaksurana2017:ronaksuranaproject@cluster0.npwieeh.mongodb.net/?retryWrites=true&w=majority",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
module.exports = connectToMongo;