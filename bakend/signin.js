const express = require("express");
const prisma = require("./prismaclient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Signinrouter = express.Router();

Signinrouter.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.username, id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = Signinrouter;  // ✅ Fixed Export
