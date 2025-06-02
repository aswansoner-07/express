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
    branch: String,
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


// Create a new user

app.post('/adduser', async (req, res) => {
    try{
        console.log(req.body);
        // const { name, age, branch } = req.body;
        // const newUser = new User({ name, age, branch });
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch(err){
        console.error("Error creating user:", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Update a user by ID

app.put('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    try{
        
        const updatedUser=await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(201).json({ message: 'User updated successfully', user: updatedUser });
    }
    catch(err){
        console.error("Error updating user:", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// Delete a user by ID

app.delete('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    try{
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully',user: deletedUser });
    }
    catch(err){
        console.error("Error deleting user:", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// get ,post,put,patch