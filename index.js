const { PrismaClient } = require('@prisma/client');
const express = require("express");
const prisma = new PrismaClient();
const app = express();
const cors = require("cors");
require('dotenv').config()

//middleware
app.use(cors());
app.use(express.json()); //req.body



app.get('/', (req, res) => {
    res.send('Server is ruuning')
});
app.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.use("/auth", require("./routes/auth"));



// app.get('/products', async (req, res) => {
//     try {
//         const products = await prisma.product.findMany();
//         res.json(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server error");
//     }
// });

app.listen(5000, () => {
    console.log(`Server is starting on port 5000`);
  });
  