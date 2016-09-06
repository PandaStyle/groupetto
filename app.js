var Hapi = require('hapi');
var Inert = require('inert');
var strava = require('strava-v3');
var Event = require('./models/Event')
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');

var redirect_uri = process.env.NODE_ENV === 'production' ?  'http://www.ridegruppetto.com/handleauth' : 'http://localhost:8081/handleauth';

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1:27017/test');

// Setup
cloudinary.config({
    cloud_name: 'grupetto',
    api_key: '677869975664931',
    api_secret: 'zRYHLql9pmgK-uQzm2InXvWpZhY'
});

// Create a server with a host and port
var server = new Hapi.Server();
server.register(Inert, function () {});
server.connection({
    port: 8081,
    routes: { cors: true } 
});



server.state('strava_access_token', {
    ttl: 24 * 60 * 60 * 1000,     // One day
    encoding: 'base64json',
    path: "/"
});



server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            index: true
        }
    }
});


server.route({
    method: 'GET',
    path:'/strava/tokenexchange',
    handler: function (request, reply) {


        if(request.query.error){
            console.log(error);
            console.error(request.query.error);
            throw request.query.error
        }


        var code = request.query.code;
        console.log(request.query);
        strava.oauth.getToken(code, function(err, res){

            if(err)
                throw err;

            reply(res).state('strava_access_token', res.access_token).redirect("/")
        })
    }
});


server.route({
    method: 'GET',
    path:'/strava/activities',
    handler: function (request, reply) {
        strava.activities.listFriends({'access_token': request.state.strava_access_token},function(err,payload) {
            if(!err) {
                reply(payload);
            }
            else {
                console.error(err);
                throw err;
            }
        });
    }
});

server.route({
    method: 'GET',
    path:'/strava/myroutes',
    handler: function (request, reply) {
        console.log(request.state)
        strava.athlete.listRoutes({'access_token': request.state.strava_access_token},function(err,payload) {
            if(!err) {
                reply(payload);
            }
            else {
                console.error(err);
                throw err;
            }
        });
    }
});

server.route({
    method: 'GET',
    path:'/strava/myactivities',
    handler: function (request, reply) {
        console.log(request.state)
        strava.athlete.listActivities({'access_token': request.state.strava_access_token},function(err,payload) {
            if(!err) {
                reply(payload);
            }
            else {
                console.error(err);
                throw err;
            }
        });
    }
});

server.route({
    method: 'GET',
    path:'/strava/following',
    handler: function (request, reply) {
        console.log(request.state)
        strava.athlete.listFriends({'access_token': request.state.strava_access_token},function(err,payload) {
            if(!err) {
                reply(payload);
            }
            else {
                console.error(err);
                throw err;
            }
        });
    }
});


server.route({
    method: 'GET',
    path:'/strava/me',
    handler: function (request, reply) {
        console.log(request.state)
        strava.athlete.get({'access_token': request.state.strava_access_token},function(err,payload) {
            if(!err) {
                reply(payload);
            }
            else {
                console.error(err);
                throw err;
            }
        });
    }
});


server.route({
    method: 'GET',
    path:'/authorize_user',
    handler: function (req, res) {
        res.redirect(api.get_authorization_url(redirect_uri, { scope: ['public_content'], state: 'a state' }));
    }
});

server.route({
    method: 'GET',
    path: '/handleauth',
    handler: function (req, res) {
        api.authorize_user(req.query.code, redirect_uri, function (err, result) {
            if (err) {
                console.log(err.body);
                res("Didn't work");
            } else {
                res(result);
            }
        });
    }
});


server.route({
    method: 'GET',
    path:'/events',
    handler:  (request, reply) => {
        Event.find((err, resp) => {
            if (err) {
                return reply(err);
            }
            reply(resp);
        });
    }
});

server.route({
    method: 'GET',
    path:'/events/{id}',
    handler: function (request, reply) {
        Event.findOne({
            _id: request.params.id
        }, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (!doc) {
                return reply(Boom.notFound());
            }

            reply(doc);
        });

    }
});


server.route({
    method: 'POST',
    path:'/events',

    handler:  (request, reply) => {
        var event = new Event(request.payload);
        event.save((err, resp) => {
            if (err) {
                return reply(err);
            }
            reply(resp);
        });
    }
});

server.route({
    method: 'DELETE',
    path:'/events/{id}',
    handler: function (request, reply) {
        Event.remove({
            _id: request.params.id
        }, (err, result) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (result.n === 0) {
                return reply(Boom.notFound());
            }

            reply().code(204);
        });

    }
});

server.route({
    method: 'GET',
    path:'/ping',
    handler: function (request, reply) {
        var e = process.env.NODE_ENV;
        reply({"pong hahaha, NODE_ENV value:" : e});
    }
});


server.route({
    method: 'POST',
    path:'/images/upload',
    handler: function (request, reply) {
        cloudinary.uploader.upload(request.payload.image, function (result) {
            console.log(result)
            reply(result);
        });
    }
});

server.start(function (err) {
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
