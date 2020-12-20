var redis = require('../databases/redis');

function ApiError(code,  message) {
    return {"code": code, "message": message}
}

exports.get = function(req, res) {
    if (typeof req.query.key !== "string") {
        res.status(400).send(ApiError(400, "expected string key param in query"));
        return;
    }    
    redis.client.get(req.query.key, function(err, reply) {
        if (reply === null) {
            res.status(404).send(ApiError(404, "key '" + req.query.key + "' not found"));
        } else {
            res.send({"value": reply});
        }
    });
}

exports.post = function(req, res) {
    if (typeof req.body.key !== "string" || typeof req.body.value !== "string") {
        res.status(400).send(ApiError(400, "wrong body format"));
        return;
    }
    redis.client.set(req.body.key, req.body.value, function(err, reply) {
        res.send({});
    });
}