const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON bodies
const PORT = process.env.PORT || 8001;


mongoose.connect("mongodb://localhost:27017/anjalidb")
.then(()=>{
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.error("MongoDB connection error:", err.message);
});

// Define a simple user schema
const userSchema=new mongoose.Schema({
    name: String,
    age: Number,
    branch: String
});

// Create a user model
const User = mongoose.model('User', userSchema);


app.get('/', async (req, res) => {
    res.send('Welcome in my API');
});

//fetrch all users from DB
app.get('/users', async (req, res) => {
     try{
        const users=await User.find();
        res.json(users);
     }
    catch(err){
            console.error("Error fetching users:", err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
});


// fetch a user by ID

app.get('/api/users/:id', async (req, res) => {

 const userId = req.params.id;

 try{
    const user =await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
 }
catch(err){
        console.error("Error fetching user:", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

// fetch a user by name

app.get('/users/:name', async (req, res) => {

 const userName = req.params.name;
console.log(userName);
 try{
    const user =await User.find({ name: userName });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
 }
catch(err){
        console.error("Error fetching user:", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});