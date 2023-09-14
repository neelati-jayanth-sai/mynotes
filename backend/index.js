const connectToDb = require('./db');
const express = require('express');
require('dotenv').config()
connectToDb();

const app = express();
const port = process.env.PORT_BACKEND;

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
