/**
 * Created by tigran on 4/24/17.
 */

const commands = require('./cmd')
    , ReactServerDOM = require('react-dom/server');

// adding babel for requiring JSX files
require('babel-register')({
    extensions: ['.jsx', '.js'],
    presets: ['es2015', 'react'],
    // enabling babel-caching if we are in release mode
    cache: commands.release
});

let requireKeys = [];

const clearRequireCache = () => {
    let delete_keys = [];
    for (let k in require.cache) {
        if(requireKeys.indexOf(k) === -1) {
            delete_keys.push(k);
        }
    }

    while (delete_keys.length > 0) {
        delete require.cache[delete_keys.pop()];
    }
};

const fixRequireKeys = () => {
    for(let k in require.cache) {
        requireKeys.push(k);
    }
};

const renderJSX = (path, props) => {
    if(!commands.release) {
        fixRequireKeys();
    }

    let App = require(path).default;
    let app = new App(props);
    if(!commands.release) {
        clearRequireCache();
    }

    try {
        return ReactServerDOM.renderToString(app);
    } catch (e) {
        console.log("Error while trying to render file: " + path);
        console.log(e);
    }

    return false;
};

module.exports = {
    jsx: renderJSX
};