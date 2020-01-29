const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Contact = require('../models/Contact');
const path = require('path');
const FS = require('fs');

// GET contacts table
router.get('/', (req, res) =>
  Contact.findAll()
  .then(contacts => res.render('contacts', {
    contacts
  }))
  .catch(err => console.log(err))
);

// INSERT into contacts table
/*
router.get('/add', (req, res) => {
  let img = FS.readFileSync(path.resolve(__dirname + '/../public/img2.jpg'));

  const data = {
    username: 'lijiaxin',
    email: 'li@email.com',
    age: 23,
    avi: img,
    bio: 'yktv',
  };

  let {
    username,
    email,
    age,
    avi,
    bio
  } = data;

  Contact.create({
      username,
      email,
      age,
      avi,
      bio
    })
    .then(contact => res.redirect('/contacts'))
    .catch(err => console.log(err));
});
*/

module.exports = router;