const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const notesDb = require('../db/db.json');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

module.exports = router;
