const express = require("express");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const cors = require("cors");
require('dotenv').config()
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json()); //req.body



// app.get('/', (req, res) => {
//     res.send('Server is ruuning')
// });

app.use("/auth", require("./routes/auth"));




// app.get("/products", async (req, res) => {
//     try {
//         const products = await pool.query("SELECT * FROM product;")
//         console.log(products.rows)
//         res.json(products.rows)
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error:", err.message);
//     }
// });


// app.get("/users", async (req, res) => {
//     try {
//         const users = await pool.query("SELECT * FROM user;")
//         res.json(users.rows)
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error:", err.message);
//     }
// });

// app.post('/register', async (req, res) => {
//     const { password, email } = req.body;
//     const newUser = await prisma.user.create({ data: { password, email } });
//     res.status(201).json(newUser);
//   });

  app.get('/', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
  });

app.listen(5000, () => {
    console.log(`Server is starting on port 5000`);
  });
  