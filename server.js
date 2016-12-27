const express = require('express')
    , bodyParser = require('body-parser')
    , ReactServerDOM = require('react-dom/server')
    , app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// adding babel for requiring JSX files
require('babel-register')({
    extensions: ['.jsx'],
    presets: ['es2015', 'react']
});

const App = require('./front/app').default;

app.get('/', (req, res) => {
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

app.listen(3000, function () {
    console.log('listening on port 3000!')
});