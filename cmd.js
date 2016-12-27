/**
 * Created by tigran on 12/27/16.
 */
const CMD = require('commander');

CMD.version('0.0.1')
    .usage('[options] <directory entry point> \n\r  By providing entry directory rendering server can find requested JSX file by URL path/name')
    .option('-p, --port <n>', 'Define Server Port for starting proxy rendering server', function(val) {return parseInt(val)}, 8888)
    .option('-R, --release', 'Run rendering in release mode, which means server will make a caching and a lot more!', function(val) { return !val; })
    .option('-w, --watch', 'Watch for file changes for hot reloading rendering process during development', function(val) { return !val })
    .parse(process.argv);

module.exports = {
    port: CMD.port,
    release: (CMD.release === true),
    watch: (CMD.watch === true),
    jsx_dir: CMD.args[0]
};