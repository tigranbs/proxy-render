#!/usr/bin/env node

var express = require('express')
    , bodyParser = require('body-parser')
    , ReactServerDOM = require('react-dom/server')
    , app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var arguments = require('./cmd');

// adding babel for requiring JSX files
require('babel-register')({
    extensions: ['.jsx'],
    presets: ['es2015', 'react']
});

if(!arguments.watch && arguments.release) {
    var JSXApp = require(arguments.file).default;
}

app.get('/', (req, res) => {
    if(typeof JSXApp == 'undefined') {
        var JSXApp = require('./front/app').default;
    }

    let app = new JSXApp({
        path: req.originalUrl
    });

    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.render('index', {
        html: ReactServerDOM.renderToString(app)
    });
});

app.listen(arguments.port, function () {
    console.log('listening on port 3000!')
});