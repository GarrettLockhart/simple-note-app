const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const notesDb = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
  res.json(notesDb);
});

router.post('/notes', (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const parsedNotes = JSON.parse(data);
    parsedNotes.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 2));
  });
});

module.exports = router;
