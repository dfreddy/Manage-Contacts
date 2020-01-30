const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Contact = require('../models/Contact');
const path = require('path');
const FS = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// GET contacts table
router.get('/', (req, res) =>
  Contact.findAll()
  .then(contacts => res.render('contacts', {
    contacts
  }))
  .catch(err => console.log(err))
);

// ADD contact form
router.get('/add', (req, res) => res.render('add'));

// server-side form validation
function validate(errors, elements, elements_name) {
  for (let i = 0; i < elements.length; i++) {
    if (!elements[i]) errors.push({
      text: 'Please add ' + elements_name[i],
    });
  }

  return errors;
};

router.post('/add', (req, res) => {
  let {
    username,
    email,
    age,
    bio
  } = req.body;

  let elements = [username, email, age, bio];
  let elements_name = ['username', 'email', 'age', 'bio'];
  let errors = validate([], elements, elements_name);

  if (errors.length > 0) {
    res.render('add', {
      errors,
      username,
      email,
      age,
      bio
    });
  } else {
    Contact.create({
        username,
        email,
        age,
        bio
      })
      .then(contact => res.redirect('/contacts'))
      .catch(err => console.log(err));
  }
});

router.get('/delete/:id', (req, res) => {
  Contact.destroy({
      where: {
        id: req.params.id,
      }
    })
    .then((u) => res.redirect('/contacts'));
});

router.get('/search', (req, res) => {
  let {
    term
  } = req.query;

  Contact.findAll({
      where: {
        username: {
          [Op.iLike]: '%' + term + '%'
        }
      }
    })
    .then(contacts => res.render('contacts', {
      contacts
    }))
    .catch(err => console.log(err));
});

module.exports = router;