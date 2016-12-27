/**
 * Created by tigran on 12/27/16.
 */
var CMD = require('commander');

CMD.version('0.0.1')
    .usage('[options] <main JSX file> \n\rJSX file should be main entry point for your application for passing properties to it')
    .option('-p, --port <n>', 'Define Server Port for starting proxy rendering server', function(val) {return parseInt(val)}, 8888)
    .option('-R, --release', 'Run rendering in release mode, which means server will make a caching and a lot more!', function(val) { return !val; })
    .option('-w, --watch', 'Watch for file changes for hot reloading rendering process during development', function(val) { return !val })
    .parse(process.argv);

module.exports = {
    port: CMD.port,
    release: (CMD.release === true),
    watch: (CMD.watch === true),
    file: CMD.args[0]
};