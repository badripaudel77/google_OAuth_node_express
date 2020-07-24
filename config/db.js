const mongoose = require('mongoose')

const keys = require('./keys');

const connectDB = async () => {

    const db_url = keys.mongoURI;
    try {
      await mongoose.connect( db_url,
            {
               useNewUrlParser : true,
               useUnifiedTopology :true,
               useFindAndModify : true
            });
        console.log("database connected at url " + db_url);
    } 
    catch (error) {
        console.log('error occured while connecting to the database ', error);
        process.exit(1);
    }
}

//export it
module.exports = connectDB;