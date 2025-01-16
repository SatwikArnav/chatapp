const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const Signuprouter = express.Router();

const prisma = require("./prismaclient");
// Encrypt Password Function
const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

Signuprouter.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Email, username, and password are required." });
        }

        // Hash password before storing it
        const hashedPassword = await encryptPassword(password);

        // ✅ Ensure Prisma is correctly used with your actual model name
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        const token = jwt.sign({ email: user.username, id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = Signuprouter;
