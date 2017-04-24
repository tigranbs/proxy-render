#!/usr/bin/env node

/**
 * Created by tigran on 4/23/17.
 */
const express = require('express')
    , app = express()
    , AppConfigure = require('./configure');

AppConfigure.configure(app);
let config = AppConfigure.getConfig();

app.set('view engine', (typeof config.view_engine === 'undefined' ? 'ejs': config.view_engine));
app.listen(config.port, config.host);