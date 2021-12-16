require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const port = process.env.PORT || 80;
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    next();
});


const filebaseRoutes = require('./routes/filebase.routes');

app.use('/api/filebase', filebaseRoutes);

app.get('/*', function (req, res) {
    res.send('basic filebase demo');
});


app.listen(port, () => { console.log(`listening on  ${port}`) });