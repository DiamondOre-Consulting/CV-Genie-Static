import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    name: {
        type : String ,
        requirre : true ,
    },
    email:{
        type: String,
        require : true,
    },
    phone : {
        type : String ,
        require : true,
    },
    massage: {
        type: String,
        require : true,
    },
    pdf : {
        type: String,
    }

})

export default mongoose.model("User" , UserSchema)