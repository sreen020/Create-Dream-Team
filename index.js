const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

app.use(express.static('src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.use(expressLayouts);
app.set('layout', './partials/layout');
app.set('view engine', 'ejs');

/*****************************************************
 * Connect to database
 ****************************************************/
let db = null;

async function connectDB() {
	const uri = process.env.DB_URI;
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	try {
		await client.connect();
		db = client.db(process.env.DB_NAME);
	} catch (error) {
		throw error;
	}
}
// ROUTES
// Home page
app.get('/', async (req, res) => {
	const query = {};
	const options = { sort: { rating: -1 } };
	const users = await db.collection('users').find(query, options).toArray();
	console.log(users);

	res.render('pages/index', { title: 'Home', data: users });
});

// Detail page person
app.get('/person/:id', async (req, res) => {
	const query = { _id: ObjectId(req.params.id) };
	const person = await db.collection('users').findOne(query);

	res.render('pages/personDetail', {
		title: `${person.firstname} ${person.lastname}`,
		data: person,
	});
});

app.post('/add-user', async (req, res) => {
	console.log(req.body);

	let newPerson = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		zipcode: req.body.zipcode,
		house_number: req.body.house_number,
		position: req.body.position,
		footed: req.body.footed,
		experience: req.body.experience,
		match_day: req.body.match_day,
		rating: req.body.rating,
	};

	await db.collection('users').insertOne(newPerson);
	res.redirect('/');
});

app.get('/filter-users', async (req, res) => {
	console.log(req.query);
	const query = req.query;
	const persons = await db.collection('users').find(query).toArray();

	res.render('pages/index', { title: 'Home', data: persons });
});

// Pagina om nieuw account aan te maken
app.get('/profile', (req, res) => {
	res.render('pages/profile', { title: 'Profile' });
});

// 404 page
app.use('*', (req, res) => {
	res.render('pages/404', { title: '404 page' });
});

app.listen(3000, () => {
	console.log('listening on 3000');
	connectDB().then(() => console.log('connected mongoDB'));
});
