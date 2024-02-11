import mongoose from 'mongoose';
const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';


const tokenSchema = new Schema({
	username : {
		type : String,
		required : true
	},
    userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	token: { 
        type: String, 
        required: true },
	    createdAt: { type: Date, default: Date.now, expires: 3600 
    },
});

tokenSchema.plugin(passportLocalMongoose);
// tokenSchema.virtuals('username').get(() => undefined);

const Token =  mongoose.model("Token", tokenSchema);

export default Token;