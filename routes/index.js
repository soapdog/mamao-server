var Mamao = require('../models/mamao.js');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.pegaMamoes = function(req, res) {
    Mamao.todosOsMamoes(function(mamoes, err) {
        if (mamoes) {
            res.json(mamoes);
        } else {
            res.json(err);
        }
    });
}

exports.pegaMamao = function(req, res) {
    console.log("pega mamao id: " + req.query.id);
    Mamao.pegaMamao(req.query.id, function(mamao, err) {
        if (mamao) {
            res.json(mamao);
        } else {
            res.json(err);
        }
    });
}

exports.novoMamoeiro = function(req, res) {
    console.log("novo mamoeiro: " + req.query.email);
    Mamao.novoMamoeiro(req.query.email, req.query.nome, function(mamoeiro, err) {
        if (mamoeiro) {
            res.json(mamoeiro);
        } else {
            res.json(err);
        }
    });
}

exports.novoMamao = function(req, res) {
    var data = {};
    console.log("novo mamao: " + req.query.email);
    data.latitude = req.query.latitude;
    data.longitude = req.query.longitude;
    data.tipo = req.query.tipo;
    data.titulo = req.query.titulo;
    Mamao.novoMamao(req.query.email, data, function(mamao, err) {
        if (mamao) {
            res.json(mamao);
        } else {
            res.json(err);
        }
    });
}

exports.atualizaMamao = function(req, res) {
    var data = {};
    console.log("atualiza mamao: " + req.query._id);
    data.latitude = req.query.latitude;
    data.longitude = req.query.longitude;
    data.tipo = req.query.tipo;
    data.titulo = req.query.titulo;
    Mamao.atualizaMamao(req.query.email, req.query._id, data, function(mamao, err) {
        if (mamao) {
            res.json(mamao);
        } else {
            res.json(err);
        }
    })
}

exports.novoMamaoComentario = function(req, res) {
    console.log("novo mamao: " + req.query.email);
    Mamao.novoMamaoComentario(req.body.email, req.body.id, req.body.data, function(mamaoComentario, err) {
        if (mamaoComentario) {
            res.json(mamaoComentario);
        } else {
            res.json(err);
        }
    });
}

