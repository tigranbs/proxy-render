#!/usr/bin/env node

/**
 * Created by tigran on 4/23/17.
 */
const fs = require('fs')
    , path = require("path")
    , express = require('express')
    , app = express()
    , render_fn = require('./render');


/*
* Example for config
* module.exports = {
*   "view": "views/index",
*    "view_ending": "ejs",
*    "target": "http://localhost:3000/api"
* };
*
* module.exports = {
*   "view": {
*       "/login": "views/auth/login.ejs"
*   },
*    "view_ending": "ejs",
*    "target": "http://localhost:3000/api"
* };
*
* module.exports = {
*   "view": {
*       "/login": {
*           "name": "views/auth/login.ejs",
*           "target": "http://localhost:3000/api/login"
*       }
*   },
*    "view_ending": "ejs",
*    "target": "http://localhost:3000/api"
* };
*
* */

let config_path = path.join(path.resolve("./"), 'proxy_render.config.js');

// Reading configuration file
try {
    fs.accessSync(config_path, fs.constants.R_OK)
} catch (e) {
    console.log(e);
    console.log("Unable to find file 'proxy_render.config.js' for configuration options. Or maybe file is not accessible for current user.");
    process.exit(1);
}

let render_config = require(config_path);

switch (typeof render_config.view) {
    case 'string':
        // if only one view is defined, then using it for every request
        app.use(render_fn(render_config.view));
        break;
    case 'object':
        // Setting views for specific given routes
        for(let key in render_config.view) {
            app.get(key, render_fn(render_config.view[key]), render_config.target);
        }
        break;
    default:
        console.log('"view" option is required to define views for specific request urls. Could be "string" or "object"');
        process.exit(1);
        break;
}

render_config.host = (typeof render_config.host === 'undefined' ? '0.0.0.0' : render_config.host);
render_config.port = (typeof render_config.port === 'undefined' ? '8000' : render_config.port);

app.set('view engine', (typeof render_config.view_engine === 'undefined' ? 'ejs': render_config.view_engine));
app.listen(render_config.port, render_config.host);