import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Bear from './app/models/bear.babel';

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
	console.log(req.body);
    next(); // make sure we go to the next routes and don't stop here
});
// initial test
router.get('/', (req, res) => {
	res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/bears')
    // add bear
	.post((req, res) => {
        
        let bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save((err) => {
			if (err)
				res.send(err);
			const message = 'Bear ' + bear.name + ' created!';

			res.json({ message: message });
		});

	})
	// Get all bears
	.get((req, res) => {
		Bear.find((err, bears) => {
			if (err) 
				res.send(err);
			res.json(bears);
		});
	})
	
router.route('/bears/:bear_id')
	// get bear by id
	.get((req, res) => {
		Bear.findById(req.params.bear_id, (err, bear) => {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})
	.put((req, res) => {
		Bear.findById(req.params.bear_id, (err, bear) => {
			if (err) 
				res.send(err);
			const oldName = bear.name;
			bear.name = req.body.name;

			bear.save((err) => {
				if (err)
					res.send(err);
				const message = 'Bear ' + oldName + ' updated to name ' + bear.name;
				res.json({ message: message });
			});

		});
	})
	.delete((req, res) => {
		Bear.remove({
			_id: req.params.bear_id
			}, (err, bear) => {
				if (err)
					res.send(err);
				const message = 'Successfully removed';
				res.json({ message: message });
			});
	});



// REGISTER ROUTES
app.use('/api', router);

app.listen(PORT, () => {
	console.log('Listening on PORT', PORT);
});
