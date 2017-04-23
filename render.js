/**
 * Created by tigran on 4/23/17.
 */
module.exports = function (view_path, api_target) {
    let file_name = view_path;
    if(typeof view_path === 'object') {
        file_name = view_path.name;
        api_target = (typeof view_path.target === 'undefined' ? api_target : view_path.target );
    }

    return function (req, res) {
        res.render(file_name, {});
    };
};