import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Bear from './app/models/bear';

const app = express();
const PORT = process.env.PORT || 8080;

// express router for API calls
const router = express.Router();

// Database setup
mongoose.connect('localhost:27017');

// allow access to data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API ROUTES
// =====================================

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// initial test
router.get('/', (req, res) => {
	res.json({ message: 'hooray! welcome to our api!' });
});


// REGISTER ROUTES
app.use('/api', router);

app.listen(PORT, () => {
		console.log('Listening on PORT', PORT);
	});
