var SolrNode = require("solr-node")

var client = new SolrNode({
    host: "127.0.0.1",
    port: "8983",
    core: "zchg",
    protocol: "http"
});
module.exports = client;

