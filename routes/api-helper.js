const request = require('request');

module.exports = {
	/*
	 ** This method returns a promise
	 ** which gets resolved or rejected based
	 ** on the result from the API
	 */
	api_get: function (url) {
		return new Promise((resolve, reject) => {
			request(url, { json: true }, (err, res, body) => {
				if (err) reject(err);
				resolve(body);
			});
		});
	},

	api_post: function (url, body) {
		return new Promise((resolve, reject) => {
			request.post(url, { json: true, body: body }, (err, res, body) => {
				if (err) reject(err);
				resolve(body);
			});
		});
	},

	api_delete: function (url) {
		return new Promise((resolve, reject) => {
			request.delete(url, { json: true }, (err, res, body) => {
				if (err) reject(err);
				resolve(body);
			});
		});
	},
};
