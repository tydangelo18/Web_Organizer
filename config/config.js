require('dotenv').config();

// console.log(process.env.NODE_ENV);

module.exports = {
	development: {
		username: 'root',
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: '127.0.0.1',
		dialect: 'mysql',
	},
	production: {
		use_env_variable: 'JAWSDB_URL',
		dialect: 'mysql',
	},
};

