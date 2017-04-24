/**
 * Created by tigran on 4/23/17.
 */

const config = require('./configure').getConfig()
    , ReactServerDOM = require('react-dom/server')
    , targetProxy = require('./targetProxy');

// adding babel for requiring JSX files
require('babel-register')({
    extensions: ['.jsx', '.js'],
    presets: ['es2015', 'react'],
    // enabling babel-caching if we are in release mode
    cache: !config.debug
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
    if(config.debug) {
        fixRequireKeys();
    }

    let App = require(path).default;
    let app = new App(props);
    if(config.debug) {
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

module.exports = function (view_path, render_app, api_target) {
    let file_name = view_path;
    if(typeof view_path === 'object') {
        file_name = view_path.name;
        api_target = (typeof view_path.target === 'undefined' ? api_target : view_path.target );
    }

    return function (req, res) {
        targetProxy(req, api_target)
            .then(function (body) {
                let txt = renderJSX(render_app, body);
                if(txt) {
                    res.render(file_name, {html: txt});
                    return;
                }

                res.status(500).end();
            })
            .catch(function () {

            });
    };
};