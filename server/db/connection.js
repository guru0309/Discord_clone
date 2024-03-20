// const mongoose = require("mongoose");
const url = "mongodb+srv://202001247:WJnS8OwpqWQnBnsX@guru03.t8mf5zf.mongodb.net/?retryWrites=true&w=majority&appName=guru03"

// const connectDB = (url) => {
  //   return mongoose
  //     .connect(url)
  //     .then(() => console.log(`Connected!😃`))
  //     .catch((error) => console.log(error));
  // };
  
  
  // const url = "mongodb://localhost:27017/discord-2.0"
  
  const mongoose = require('mongoose');
  
  const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // make the process fail
        process.exit(1);
    }
}


module.exports = connectDB;