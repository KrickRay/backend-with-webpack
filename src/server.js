import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send(`
    <!DOCTYPE html>
        <html>
        <head>
            <title>Hello World!</title>
        </head>
        <body>
            <h1 id="header">Hello world!</h1>
            <button id="button">Change color</button>
            <script src="http://localhost:5001/client.js"></script>
        </body>
    </html>`);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});