const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

const notesRouter = require('./routes/notesRoute');
app.use('/notes', notesRouter);

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
    'uuid': uuidv4()
  };

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const parsedNotes = JSON.parse(data);
    parsedNotes.push(newNote);

    fs.writeFile(
      './db/db.json',
      JSON.stringify(parsedNotes, null, 2),
      (err) => {
        err ? console.error(err) : console.info('Successfully wrote db.json');
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
