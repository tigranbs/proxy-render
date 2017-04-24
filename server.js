#!/usr/bin/env node

const express = require('express')
    , bodyParser = require('body-parser')
    , app = express()
    , fs = require('fs')
    , path = require('path')
    , commands = require('./cmd')
    , Render = require('./render')
    , Log = require('./log');

app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/:filename(*)', (req, res) => {

    let file_path = path.resolve(commands.jsx_dir, req.params.filename);
    let req_time = Date.now();

    // checking if we have a file with given name or not
    fs.stat(file_path, (err, stat) => {
        if(err) {
            res.status(404).send('Request file not found');
            Log(file_path, "File Not Found!");
            return;
        }

        if(!stat.isFile()) {
            res.status(500).send('Sent directory path instead of giving JSX file path');
            Log(file_path, "Seems this is not a file!");
            return;
        }

        let txt = Render.jsx(file_path, req.body);
        if(!txt) {
            res.status(500).send('Unable to render requested file');
        } else {
            res.end(txt);
        }

        if(!commands.release) {
            Log(file_path, " - " + (Date.now() - req_time) + "ms");
        }
    });
});

app.listen(commands.port, function () {
    console.log('Proxy Render Running on port ' + commands.port + '!')
});