const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
/*const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    port: 3306
});

connection.connect();*/

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const sneackersRouter = require('./routes/sneackers.js');
const streetwearRouter = require('./routes/streetwear.js');
const sportwearRouter = require('./routes/sportswear.js');

app.use('/', sneackersRouter);
app.use('/', streetwearRouter);
app.use('/', sportwearRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})