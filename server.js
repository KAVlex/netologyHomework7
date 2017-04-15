"use strict"

const express       = require("express");
const bodyParser    = require("body-parser");
const PORT          = (process.env && process.env.PORT) || 1338;

const app = express();

//1
app.get('/', (req, res) => {
   res.status(200).send('Hello, Express.js');
});

//2
app.get('/hello', (req, res) => {
   res.status(200).send('Hello stranger!');
});

//3
app.get('/hello/:name', (req, res) => {
   res.status(200).send(`Hello, ${req.params.name}!`)
});

//4
app.all('/sub/*', (req, res) => {
    res.send(`You requested URI: ${req.originalUrl}`)
});

//5 && Дополнительное задание
app.use(bodyParser.urlencoded({"extended": true}));
const auth = (req, res, next) => {
    req.get('Key') ? next()
        : res.status(401).send('401 Unauthorized');
}
app.post('/post', auth, (req, res) => {
   if (req.body && Object.keys(req.body).length > 0){
       res.json(req.body);
       return;
   }
   res.status(404).send('404 Not Found');
});

app.all('*', (req, res) => {
    res.send('test ok');
});

app.listen(PORT, () => {
    console.log('Start HTTP on port %d', PORT);
});
app.on('error', err => console.error(err));