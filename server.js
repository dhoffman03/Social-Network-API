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

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017',
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
)

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`API server running on port ${PORT}!`))