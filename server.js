const express = require('express');
const app = express();

//Express listener
app.listen(PORT, ()=> {
    console.log('Forum App listening...');
});

app.use(express.static('public'));      //make public folder available

//404 error
app.get('*', (req, res) => {
    res.status(404).json('DOH!, page not found')
})
