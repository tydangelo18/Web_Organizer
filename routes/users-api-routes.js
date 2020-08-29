// Require User Model
const db = require('../models');

// User Routes
module.exports = function (app) {
	// User Route: Find all Users
	app.get('/api/users', function (req, res) {
		db.User.findAll({
			include: [db.Bookmark],
		}).then(function (dbUser) {
			res.json(dbUser);
		});
	});

	// User Route: Find One User
	app.get('/api/users/:id', function (req, res) {
		db.User.findOne({
			where: {
				id: req.params.id,
			},
			include: [db.Bookmark],
		}).then(function (dbUser) {
			res.json(dbUser);
		});
	});

	// User Route: Create new User
	app.post('/api/users', function (req, res) {
		// console.log(req.body);

		// Object to enter (create) into user table
		db.User.create({
			email: req.body.email,
			password: req.body.password,
		})
			.then(function (dbUser) {
				res.json(dbUser);
			})
			.catch((error) => {
				console.log(error);
				res.json(error);
			});
	});

	// User Route: Delete a User
	app.delete('api/users/:id', function (req, res) {
		// Specify which User to delete with "where" keyword
		db.User.destroy({
			where: {
				id: req.params.id,
			},
		}).then(function (dbUser) {
			res.json(dbUser);
		});
	});

	// User Route: Updating User (email or password)
	app.put('/api/users', function (req, res) {
		// Specify which User to update with "where" keyword
		db.User.update(
			{
				email: req.body.email,
				password: req.body.password,
			},
			{
				where: {
					id: req.body.id,
				},
			}
		).then(function (dbUser) {
			res.json(dbUser);
		});
	});
};
