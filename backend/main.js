"use strict";

const express = require('express');
const cors = require('cors')
const app = express();
const Galaxy = require('./Galaxy.js');
const galaxy = new Galaxy();
const Query = require('./Query.js')

app.use(cors())
app.options('*', cors());
app.use(express.json());

app.get('/', (req, res, next) => {
	res.status(200).send("UP");
});

app.post('/query/execute', (req, res, next) => {
	Query.executeQuery(galaxy, req, res);
});

app.listen(4000, function() {
	console.log('Server is running.. on Port 4000');
});