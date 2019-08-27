const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

//Express listener
app.listen(PORT, ()=> {
    console.log('Jeopardy listening...');
});

//make public folder available
app.use(express.static('public'));

//404 error
app.get('*', (req, res) => {
    res.status(404).json('DOH!, page not found')
})
