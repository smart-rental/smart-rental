import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    dob: String,
})

let user = mongoose.model('PostMessage', userSchema);

export default user;