const mongoose = require("mongoose");
const plusSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },  
    Watergoal: Number,
    Waterintake: Number,
    Caloriesgoal: Number,
    Caloriesintake: Number,
    Breakfast: String,
    Lunch: String,
    Dinner: String,
    Cardio: Number,
    Strength: Number,
    Stretching: Number,
});
module.exports=mongoose.model("Plus",plusSchema);
