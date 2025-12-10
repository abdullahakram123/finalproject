const mongoose = require("mongoose")
const profileSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    Username: {type:String , required:true},
    Location: String,
    Weight: Number,
    Height: Number,
    Age: Number,
});
module.exports = mongoose.model("profile", profileSchema);