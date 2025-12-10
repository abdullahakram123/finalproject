const express = require('express');
require("dotenv").config();
const cors = require('cors');
const User = require('./models/User');
const Profile = require("./models/Profile")
const Plus = require("./models/Plus");
const app = express();
const port = 5000;
const jwt= require('jsonwebtoken'); 
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/FitnessApp")
  .then(() => {
    console.log('mongo db is successfully connected');
  }).catch((error) => {
    console.log(error);
  })
// Register Api
app.post('/auth/register', async (req, res) => {
  const user = new User(req.body);
  await user.save()
  return res.status(200).json({
    status: true,
    message: "User Register",
    user: user,
  });
});
// Login Api
app.post('/auth/login', async (req, res) => {
  console.log("LOGIN API HIT");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User Not Found"
    })
  }
  if (user.password !== password) {
    return res.status(401).json({
      status: false,
      message: "Invaild"
    })
  };
  const token=jwt.sign(
    {id:user._id,email:user.email},
    "MY_SECRET_KEY",
    { expiresIn: "1h" }
  )
  return res.status(200).json({
    status: true,
    message: " Login SuccessFully",
    token,
    user: user,
  })
});
// Profile Api
app.post('/profile', async (req, res) => {
  const profile = new Profile(req.body);
  await profile.save()
  return res.status(200).json({
    status: true,
    message: "Profile Saved",
    data: profile,
  })
});
// Plus Api
app.post('/plus', async (req, res) => {
  console.log('Received body:', req.body);
  const today = new Date().toISOString().split("T")[0];
  const data = {
    ...req.body,
    date: today,
  };
  const existing = await Plus.findOne({userId:req.body.userId, data:today});
  let result;
  if(existing){
    result = await Plus.findByIdAndUpdate(existing._id, data, { new: true });
  }else{
    const plus = new Plus(data);
    result = await plus.save()
  };
  return res.status(200).json({
    status: true,
    message: "Today's data saved successfully",
    Add: result,
  })
});
// Dashboard Api
app.get('/dashboard/:userId', async (req, res) => {
  const userId = req.params.userId;
  const today = new Date().toISOString().split("T")[0];
  const profile = await Profile.findOne({ userId })
  const plusData = await Plus.findOne({ userId, date: today });
  return res.status(200).json({
    status: true,
    profile,
    plusData
  })
});
// Daily Data Api
app.get("/Weekly-activity/:userId", async(req,res)=>{
  const userId = req.params.userId;
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
   const data = await Plus.find({
    userId,
    date: { $gte: sevenDaysAgo.toISOString().split("T")[0] }
  }).sort({ date: 1 });

  res.json(data);
});
// History Data Api
app.get('/history/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('History API called with userId:', userId);
        
        const historyData = await Plus.find({ 
          userId: userId 
        }).sort({ date: -1 }).limit(7);
        
        console.log('Found records:', historyData.length);
        res.json(historyData);
    } catch (error) {
        console.error('Error in history API:', error);
        res.status(500).json({ error: error.message });
    }
});
// AI Api
const chatRoute = require('./routes/hello.js');
app.use("/api/chat", chatRoute);
console.log("server is started");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
