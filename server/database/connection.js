const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        //mongodb connection string
        const con = await mongoose.connect(process.env.MONGODB_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateUser: true
        })
        console.log(`Mongo_DB Connected Successfully ${con.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB