const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3003;


app.get('/', (req, res) => {
    res.send('API is WORKING...')
})

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});