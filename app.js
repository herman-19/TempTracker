const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
    res.send("<h1>Hello</h1>");
})

app.listen(3000, () => {
    console.log('Server listening on Port 3000');
})