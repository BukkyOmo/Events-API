const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello Events API.',
        statusCode: 200,
        status: 'Success'
    })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
