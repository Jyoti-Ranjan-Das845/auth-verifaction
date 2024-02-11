import mongoose from 'mongoose';
const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    // password : {
    //     type : String,
    //     required : true 
    // },
    verified : {
        type : Boolean,
        default : false
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;