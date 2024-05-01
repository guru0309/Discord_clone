// const mongoose = require("mongoose");
const url = "mongodb+srv://gaurangg4:3KswxVXeszesFDRN@cluster0.dkbevr9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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