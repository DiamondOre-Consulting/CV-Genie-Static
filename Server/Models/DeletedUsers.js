import mongoose from "mongoose";

const deletedClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

export default mongoose.model("DeletedClient", deletedClientSchema);