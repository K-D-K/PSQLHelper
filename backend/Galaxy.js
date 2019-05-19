"use strict"

const DB = require('./DB.js');

class Galaxy{
  constructor() {
    this.db = new DB();
  }

  getDb() {
    return this.db;
  }
}

module.exports = Galaxy;