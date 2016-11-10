'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bear = require('./app/models/bear.babel');

var _bear2 = _interopRequireDefault(_bear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 8080;

// express router for API calls
var router = _express2.default.Router();

// Database setup
_mongoose2.default.connect('localhost:27017');

// allow access to data from POST
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// API ROUTES
// =====================================

// middleware to use for all requests
router.use(function (req, res, next) {
	// do logging
	console.log('Something is happening.');
	console.log(req.body);
	next(); // make sure we go to the next routes and don't stop here
});
// initial test
router.get('/', function (req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/bears')
// add bear
.post(function (req, res) {

	var bear = new _bear2.default(); // create a new instance of the Bear model
	bear.name = req.body.name; // set the bears name (comes from the request)

	// save the bear and check for errors
	bear.save(function (err) {
		if (err) res.send(err);
		var message = 'Bear ' + bear.name + ' created!';

		res.json({ message: message });
	});
})
// Get all bears
.get(function (req, res) {
	_bear2.default.find(function (err, bears) {
		if (err) res.send(err);
		res.json(bears);
	});
});

router.route('/bears/:bear_id')
// get bear by id
.get(function (req, res) {
	_bear2.default.findById(req.params.bear_id, function (err, bear) {
		if (err) res.send(err);
		res.json(bear);
	});
}).put(function (req, res) {
	_bear2.default.findById(req.params.bear_id, function (err, bear) {
		if (err) res.send(err);
		var oldName = bear.name;
		bear.name = req.body.name;

		bear.save(function (err) {
			if (err) res.send(err);
			var message = 'Bear ' + oldName + ' updated to name ' + bear.name;
			res.json({ message: message });
		});
	});
}).delete(function (req, res) {
	_bear2.default.remove({
		_id: req.params.bear_id
	}, function (err, bear) {
		if (err) res.send(err);
		var message = 'Successfully removed bear ' + bear.name;
		res.json({ message: message });
	});
});

// REGISTER ROUTES
app.use('/api', router);

app.listen(PORT, function () {
	console.log('Listening on PORT', PORT);
});
