const connectToMongo = require('./db');

const express = require('express')
const app = express()
const port = process.env.local || 3001
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerDocs');
connectToMongo();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/app', require('./routes/QuestionData'));
app.use('/auth', require('./routes/UsersData'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
