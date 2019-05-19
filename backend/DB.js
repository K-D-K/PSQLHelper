"use strict";

const pg = require("pg");
const config = require('./config.js');
const Utils = require("./Utils.js");
const Promise = require('promise');

class DataBase {

	constructor() {
		this.pool = new pg.Pool(config.dbConfig);
	}

	execute(command) {
		return new Promise(function(resolve, reject) {
			this.pool.connect(function(err, client, done) {
				if (!Utils.isUndefined(err)) {
					reject(Utils.convertToError(err));
				} else {
					this.client.query(command, function(err, result) {
						done();
						if (!Utils.isUndefined(err)) {
							reject(Utils.convertToError(err));
						} else {
							resolve(new Utils.Success(result.rows));
						}
					})
				}
			})
		})
	}
}

module.exports = DataBase;