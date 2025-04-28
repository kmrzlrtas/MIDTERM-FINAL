const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql2.createPool({
host: "localhost",
user: "root",
port: 3306,
password: "",
database: "earist",
waitForConnections: true,
connectionLimit: 10,
queueLimit: 0,
});

db.getConnection((err) => {
if (err) {
console.error("Error connecting to the database:", err);
} else {
console.log("Connected to MySQL database");
}
});

//Get COR info
app.get("/api/cor", (req, res) => {
let sql = "SELECT * FROM certificate_of_registration";
db.query(sql, (err, results) => {
if (err) {
console.error("Error fetching data:", err);
return res.status(500).json({ error: "Database error" });
}
res.json(results);
});
});

const PORT = 5000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});