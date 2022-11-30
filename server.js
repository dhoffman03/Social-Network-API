// Import dependencies
const express = require('express');
const mongoose = require('mongoose')

const routes = require('./routes')

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

