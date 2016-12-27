#!/usr/bin/env node

const express = require('express')
    , bodyParser = require('body-parser')
    , ReactServerDOM = require('react-dom/server')
    , app = express()
    , fs = require('fs')
    , path = require('path')
    , commands = require('./cmd');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// adding babel for requiring JSX files
require('babel-register')({
    extensions: ['.jsx'],
    presets: ['es2015', 'react']
});

app.post('/:filename*', (req, res) => {

    let file_path = path.resolve(commands.jsx_dir, req.params.filename);

    // checking if we have a file with given name or not
    fs.stat(file_path, (err, stat) => {
        if(err) {
            res.status(404).send('Request file not found');
            return;
        }

        if(!stat.isFile()) {
            res.status(500).send('Sent directory path instead of giving JSX file path');
            return;
        }

        let App = require(file_path).default;
        let app = new App(req.body);

        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.render('index', {
            html: ReactServerDOM.renderToString(app)
        });
    });
});

app.listen(commands.port, function () {
    console.log('listening on port 3000!')
});