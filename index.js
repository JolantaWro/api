const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json()); //req.body


//routes
// app.use("/auth", require("./routes/auth"));
// app.use("/dashboard", require("./routes/dashboard"));


app.get('/', (req, res) => {
    res.send('Server is ruuning')
});



app.get("/products", async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM products;")
        console.log(products.rows)
        res.json(products.rows)
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error:", err.message);
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users;")
        res.json(users.rows)
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error:", err.message);
    }
});



app.listen(5000, () => {
    console.log(`Server is starting on port 5000`);
  });
  