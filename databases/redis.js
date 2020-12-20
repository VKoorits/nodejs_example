var redis = require("redis");
var config = require('../config/config')
var client = redis.createClient(config.redis.port, config.redis.host);

client.on("error", function() {
    console.log("ERROR: redis connection not installed");
    assert(err instanceof Error);
    assert(err instanceof AbortError);
    assert(err instanceof AggregateError);
  
    // The set and get are aggregated in here
    assert.strictEqual(err.errors.length, 2);
    assert.strictEqual(err.code, "NR_CLOSED");
});

client.on("connect", function() {
    console.log("INFO: server connected to redis");
});

exports.client = client