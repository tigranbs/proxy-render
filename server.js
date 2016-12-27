#!/usr/bin/env node

const express = require('express')
    , bodyParser = require('body-parser')
    , ReactServerDOM = require('react-dom/server')
    , app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const arguments = require('./cmd');

// adding babel for requiring JSX files
require('babel-register')({
    extensions: ['.jsx'],
    presets: ['es2015', 'react']
});

let JSXApp = false;

if(!arguments.watch && arguments.release) {
    JSXApp = require(arguments.file).default;
}

app.get('/', (req, res) => {
    let App = JSXApp;
    if(App == false) {
        App = require('./front/app').default;
    }

    let app = new App({
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