'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

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

// initial test
router.get('/', function (req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// TODO: more API Calls here

// REGISTER ROUTES
app.use('/api', router);

app.listen(PORT, function () {
	console.log('Listening on PORT', PORT);
});
