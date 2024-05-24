const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');


const postRoute = require('./routes/PostRoute');
const imageRoute = require('./routes/ImageRoute');

const app = express();
const port = 3003;

app.use(cors());

mongoose.connect('mongodb+srv://secom:secom@clusteraccount.4myv0ld.mongodb.net/Secom', { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
    console.log('err', err);
});
mongoose.connection.on('connected', (err, res) => {
    console.log('mongoose is connected');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session
    ({
        secret: 'secom',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));

app.use('/post', postRoute);
app.use('/image', imageRoute);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});