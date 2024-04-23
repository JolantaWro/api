const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db")
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/generator");
const authorization = require("../middleware/authorization");

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post("/register", validInfo, async (req, res) => {
    try {
        const { first_name, last_name, email, password, password2 } = req.body;

        if (password !== password2) {
            return res.status(401).json("Passwords do not match!");
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (user) {
            return res.status(401).json("User already exist!");
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                password: bcryptPassword
            }
        });

        const token = jwtGenerator(newUser.id); 
        return res.json({ token });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


router.post("/login", validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json("Password or Email is incorrect");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        const token = jwtGenerator(user.id);
        return res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
router.get("/is-verify", authorization, async(req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;