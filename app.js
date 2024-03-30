require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('ejs');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    try {
        // res.render('index');
        res.json({ success: true, message: 'app is running successfull...' });
    } catch (error) {
        console.log(error);
        res.send(error);  
    };
});

app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}/definition`);
});