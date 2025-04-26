const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // leave empty unless you have a password
  database: 'earist'
});

app.get('/cor', (req, res) => {
  const { student_no } = req.query;

  let sql = 'SELECT * FROM certificate_of_registration';
  let params = [];

  if (student_no) {
    sql += ' WHERE student_no = ?';
    params.push(student_no);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
