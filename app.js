
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , db = require('./lib/db.js')
  , mamaoModel = require('./models/mamao.js');

/* We can access nodejitsu enviroment variables from process.env */
/* Note: the SUBDOMAIN variable will always be defined for a nodejitsu app */
if(process.env.SUBDOMAIN){
    url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
}

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.header("Origin"));
    res.header('Access-Control-Allow-Methods', req.header("Access-Control-Request-Method"));
    res.header('Access-Control-Allow-Headers', req.header("Access-Control-Request-Headers"));

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(allowCrossDomain); // must be before app.router
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// MAMOES
app.get("/pegamamoes", routes.pegaMamoes);
app.get("/pegamamao", routes.pegaMamao);


// MAMOEIRO
app.post("/novomamoeiro", routes.novoMamoeiro);
app.post("/novomamao", routes.novoMamao);

// MAMOEIRO COMENTARIO
app.post("/novomamaocomentario", routes.novoMamaoComentario);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
