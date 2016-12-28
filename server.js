#!/usr/bin/env node

const express = require('express')
    , bodyParser = require('body-parser')
    , ReactServerDOM = require('react-dom/server')
    , app = express()
    , fs = require('fs')
    , path = require('path')
    , commands = require('./cmd');

app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// adding babel for requiring JSX files
require('babel-register')({
    extensions: ['.jsx'],
    presets: ['es2015', 'react'],
    // enabling babel-caching if we are in release mode
    cache: commands.release
});

let getLogTime = () => {
    return "[" + (new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")) + "]";
};

app.post('/:filename*', (req, res) => {

    let file_path = path.resolve(commands.jsx_dir, req.params.filename);
    let req_time = Date.now();

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
        if(!commands.release) {
            // clearing require cache for handling file changes
            delete require.cache[file_path];
        }

        try {
            // sending back rendered HTML file
            res.send(ReactServerDOM.renderToString(app));
        } catch (e) {
            res.status(501).end();
            console.log(getLogTime() , 'error', e.stack);
            return;
        }

        if(!commands.release) {
            console.log(getLogTime()
                , 'debug'
                , file_path + " - " + (Date.now() - req_time) + "ms");
        }
    });
});

app.listen(commands.port, function () {
    console.log('listening on port 3000!')
});