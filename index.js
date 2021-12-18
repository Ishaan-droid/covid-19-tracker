const express = require('express');
const app = express();

//Calling static files and loading the front page
app.use(express.static('public'));

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
