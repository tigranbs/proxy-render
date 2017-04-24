/**
 * Created by tigran on 4/24/17.
 */

module.exports = function () {
    let args = ["[" + (new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")) + "]"].concat(arguments);
    console.log.apply(this, args);
};