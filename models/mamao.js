var db = require('../lib/db');

var MAMAO_CONFIRMADO = "confirmado";
var MAMAO_NEGADO = "negado";
var MAMAO_AGUARDANDO = "aguardando";
var MAMAO_RESOLVIDO = "resolvido";

var MamoeiroSchema = new db.Schema({
    email: {type: String, unique: true},
    nome: String,
    tipo: String,
    created_at: {type: Date, default: Date.now}
});

var MamaoComentarioSchema = new db.Schema({
    mamoeiro: { type: db.Schema.Types.ObjectId, ref: 'Mamoeiro' },
    comentario: String,
    situacao: String,
    created_at: {type: Date, default: Date.now}
});

var MamaoSchema = new db.Schema({
    mamoeiro: { type: db.Schema.Types.ObjectId, ref: 'Mamoeiro' },
    latitude: String,
    longitude: String,
    tipo: String,
    situacao: String,
    titulo: String,
    comentarios: [{ type: db.Schema.Types.ObjectId, ref: 'Comentario' }],
    created_at : { type : Date, default: Date.now }
});

var Mamoeiro = db.mongoose.model('Mamoeiro', MamoeiroSchema);
var Comentario = db.mongoose.model('Comentario', MamaoComentarioSchema);
var Mamao = db.mongoose.model('Mamao', MamaoSchema);



module.exports = {
    /**
     * Salva um novo mamoeiro e chama a callback.
     * @param inEmail
     * @param inNome
     * @param inCallback
     */
    novoMamoeiro: function(inEmail, inNome, inCallback) {
        var mamoeiro = new Mamoeiro({email: inEmail, nome: inNome});

        this.pegaMamoeiro(inEmail, function(mamoeiroPossivel, err) {
            if (!mamoeiroPossivel) {
                mamoeiro.save(function (saveErr) {
                    inCallback(mamoeiro, saveErr);
                });
            }

            if (err) {
                inCallback(null, err);
            }

            if (mamoeiroPossivel) {
                inCallback(mamoeiroPossivel, null);
            }
        });


    },
    /**
     * Encontra o mamoeiro passado em inEmail e chama a callback.
     * @param inEmail
     * @param inCallback
     */
    pegaMamoeiro: function(inEmail, inCallback) {
        Mamoeiro
            .findOne({email: inEmail})
            .exec(function(err, mamoeiro){
                inCallback(mamoeiro, err);
            });
    },
    /**
     * Cria um novo mamão com base nos dados passados em inData e no mamoeiro
     * especificado por inEmail. Depois chama callback.
     * @param inEmail
     * @param inData
     * @param inCallback
     */
    novoMamao: function(inEmail, inData, inCallback) {
        this.pegaMamoeiro(inEmail, function(mamoeiro, err){
            if (err || !mamoeiro) {
                inCallback(null, err);
                return false;
            }

            inData.mamoeiro = mamoeiro._id;
            var mamao = new Mamao(inData);

            mamao.save(function(err){
                inCallback(mamao, err);
            });
        });
    },
    atualizaMamao: function(inEmail, inId, inData, inCallback) {
        Mamao.findById(inId, function(err, mamao) {
            if (err) {
                inCallback(mamao, err);
                return false;
            }

            mamao.latitude = inData.latitude;
            mamao.longitude = inData.longitude;

            mamao.save(function(err){
                inCallback(mamao, err);
            })
        })
    },
    /**
     * Retorna todos os mamoes no banco de dados.
     *
     * TODO: Essa função vai fuder o banco de dados. Precisa ser modificada para lat/long.
     *
     * @param inCallback
     */
    todosOsMamoes: function(inCallback) {
        Mamao.find().populate('mamoeiro comentarios').exec(function(err, mamoes) {
            inCallback(mamoes, err);
        });
    },
    /**
     * Retorna um mamao junto com os comentarios e o mamoeiro
     * @param inId
     * @param inCallback
     */
    pegaMamao: function(inId, inCallback) {
        Mamao.findById(inId, function(err, mamao){
                inCallback(mamao, err);
            });
    },
    novoMamaoComentario: function(inEmail, inId, inData, inCallback) {

    }
};
