const express = require('express');
const mongoose = require('mongoose');
const Notes = require('./model/model');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.mongo, {
  useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



// app.use(bodyparser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    Notes.find()
        .then(notes => res.render('home', { task: notes,error:'' }))
        .catch(error => res.status(400).json({ error }));

});

app.post('/', (req, res, next) => {
    const note = new Notes({
        title: req.body.title,
        color: req.body.color,
        description: req.body.description
    });
    note.save()
        .then(res.redirect('/'))
        .catch(next);
});

app.delete('/:id', (req, res) => {
  Notes.deleteOne({ _id: req.params.id })
        .then(() => res.status(200))
        .catch(error => res.status(400).json({ error }));
});



module.exports = app;

