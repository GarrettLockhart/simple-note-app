const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const notesDb = require('../db/db.json');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('/:uuid', (req, res) => {
  const id = req.params.uuid;
  res.json(notesDb); 
});

module.exports = router;
