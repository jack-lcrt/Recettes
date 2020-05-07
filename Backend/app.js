const express = require('express');
const mongoose = require('mongoose');
const recipe = require('./model/model');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

mongoose
	.connect(process.env.mongo, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));

mongoose.set('useCreateIndex', true);// avoid deprecated message, non essential
app.use(cors());
app.use(express.static('public'));
app.use('/', express.static('public'));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
	recipe
		.find({ recommend: false })
		.then((recipe) => {
			return res.send(recipe);
		})
		.catch((error) => {
			return res.json({ error });
		});
});

app.get('/api/recommend', (req, res) => {
	recipe
		.find({ recommend: true })
		.then((recipe) => res.send(recipe))
		.catch((error) => res.json({ error }));
});

app.get('/api/:id', (req, res) => {
	recipe
		.findById(req.params.id)
		.then((recipe) => res.send(recipe))
		.catch((error) => res.status(400).json({ error }));
});

app.get('/api/search/:value', (req,res) => {
	recipe
		.find({$text: {$search: req.params.value}})
		.then((recipe) => res.send(recipe))
		.catch((error) => res.status(400).json({ error }));
});

app.post('/api', (req, res) => {
	const Recipe = new recipe({
		...req.body,
	});
	Recipe.save()
		.then(() => res.send('ok'))
		.catch(() => {
			return res.send('error');
		});
});

app.delete('/api/:id', (req, res) => {
	recipe
		.deleteOne({ _id: req.params.id })
		.then(res.send('ok'))
		.catch((error) => res.json({ error }));
});

app.put('/api/:id', (req, res) => {
	recipe
		.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(res.send('Updated'))
		.catch((error) => res.status(400).send(error));
});

module.exports = app;
