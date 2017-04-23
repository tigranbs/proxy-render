#!/usr/bin/env node

/**
 * Created by tigran on 4/23/17.
 */
const fs = require('fs')
    , path = require("path")
    , express = require('express');


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

