const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notesRouter = require('./routes/notesRoute');
app.use('/notes', notesRouter);

const apiRouter = require('./routes/apiRoutes');
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
