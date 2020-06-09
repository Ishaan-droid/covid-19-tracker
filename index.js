const express = require('express');
const app = express();

//Calling static files and loading the front page
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});