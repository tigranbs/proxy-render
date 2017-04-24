/**
 * Created by tigran on 4/24/17.
 */

const request = require('request');

const targetProxy = (req, target) => {
    return new Promise(function (resolve, reject) {
        let params = {}
        , headers = Object.assign({}, req.headers);
        delete headers.host;
        if(typeof target === 'string') {
            params = {
                uri: target,
                method: 'GET',
                headers: headers
            };
        }

        request(params, function (error, response, body) {
            if(error) {
                reject(error, response);
                return;
            }

            resolve(body, response);
        });
    });
};

module.exports = targetProxy;