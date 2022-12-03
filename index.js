const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'trendsfabs'
})

// connect db
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql')
})

// defining the Express app


// defining an array to work as the database (temporary solution)


// defining an endpoint to return all ads
app.get('/posts', (req, res) => {
  let sql = 'SELECT * FROM post';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result)
    res.send(result)
  })
});

app.get('/', (req, res) => {
  res.send('this is api home')
})

app.post('/addpost', async (req, res) => {
  console.log(req.body)
  const data = req.body;
  let sql = `INSERT INTO post ( title, description) VALUES (${JSON.stringify(data.title)}, ${JSON.stringify(data.description)})`;
  console.log(sql)
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ title: `${JSON.stringify(data.title)}` }
    )
  })
})

// delete post

app.delete('/posts/delete/:id', (req, res) => {
  const data = req.params
  console.log(data)
  let sql = `DELETE FROM post where id = ${data.id}`
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(`post with id ${req.params.id} deleted from database`)
  })
})

//post by id

app.get('/posts/:id', (req, res) => {
  const data = req.params
  console.log(data)
  let sql = `SELECT * FROM post where id = ${data.id}`

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result)
  })
})

// update by id
app.put('/posts/update/:id', (req, res) => {
  const data = req.params
  const datas = req.body
  console.log(data)
  let sql = `UPDATE post SET title = ${JSON.stringify(datas.title)}, description = ${JSON.stringify(datas.description)} WHERE id = ${data.id} `

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send('update successfull')
  })
})


// starting the server
app.listen(3003, () => {
  console.log('listening on port 3003');
});