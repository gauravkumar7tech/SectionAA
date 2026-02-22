const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views2');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/check', (req, res) => {
  const num = parseInt(req.body.num);
  const result = num % 2 === 0 ? 'Even' : 'Odd';
  res.render('home', { result });
});

app.listen(3000);