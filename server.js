const Hapi = require('hapi')
    , server = new Hapi.Server();

server.connection({port: 3000});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, replay) {
        replay('Server working !');
    }
});

server.start((err) => {
    if(err) {
        throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
});