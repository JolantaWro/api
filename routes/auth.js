const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db")
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/generator");
const authorization = require("../middleware/authorization");
const { request } = require("express");


// router.post("/register", validInfo, async (req, res) => {
//     try {
//         const { email, first_name, last_name, password } = req.body;
//         const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//         if (user.rows.length > 0) {
//             return res.status(401).json("User already exist!");
//         }

//         const salt = await bcrypt.genSalt(10);

//         // const saltRound = 10;
//         // const salt = await bcrypt.genSalt(saltRound);
//         const bcryptPassword = await bcrypt.hash(password, salt);

//         const newUser = await pool.query(
//             "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
//             [first_name, last_name, email, bcryptPassword]
//           );

//         const token = jwtGenerator(newUser.rows[0].user_id);
//         return res.json({token})
        
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// });


router.post("/register", validInfo, async (req, res) => {
    try {
        const { email, username, password, password2 } = req.body;

        if (password !== password2) {
            return res.status(401).json("Passwords do not match!");
        }


        const user = await pool.query("SELECT * FROM community WHERE email = $1", [email]);
        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }

        const salt = await bcrypt.genSalt(10);

        // const saltRound = 10;
        // const salt = await bcrypt.genSalt(saltRound);
        
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO community (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, bcryptPassword]
          );

        const token = jwtGenerator(newUser.rows[0].user_id);
        return res.json({token})
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/login", validInfo, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM community WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrec");
        }
        
        const token = jwtGenerator(user.rows[0].user_id);
        return res.json({token})
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