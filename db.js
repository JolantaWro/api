const Pool = require("pg").Pool;


const pool = new Pool({
	connectionString: process.env.DATABASE_URL
  })

pool.connect((err) => {
	if (err) throw err
	console.log("connect successfully Database")
})

module.exports = pool;