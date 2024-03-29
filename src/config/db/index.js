const mongoose = require('mongoose');

const ConnectDb = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('Database is connected'))
        .catch(() => console.log('Database is not connected'));
}

module.exports = ConnectDb;