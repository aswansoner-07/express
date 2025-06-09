const router = require('express').Router();
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new doctor

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({
            name,
            email,
            password: hashedPassword
        });

        await newDoctor.save();
        res.status(201).json({ message: "Doctor registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;