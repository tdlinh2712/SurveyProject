const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

//create model class
mongoose.model('users', userSchema);