const connectToMongo = require('./db');

const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');
connectToMongo();
app.use(cors());
app.use(express.json());


app.use('/app', require('./routes/QuestionData'));
app.use('/auth', require('./routes/UsersData'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
