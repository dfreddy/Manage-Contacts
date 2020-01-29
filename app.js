const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database')

// Test DB
db.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.log('Error: ' + err))

const app = express();

// Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, './views/layouts')
}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: false
}))

// Routes
app.get('/', (req, res) => res.render('index', {
  layout: 'landing'
}));

app.use('/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`));