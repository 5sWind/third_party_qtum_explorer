'use strict';

var BaseService = require('./service');
var inherits = require('util').inherits;
var fs = require('fs');
var child_process = require('child_process');
var path = require('path');
var bodyParser = require('body-parser');

var InsightUI = function(options) {
  BaseService.call(this, options);
  if (typeof options.apiPrefix !== 'undefined') {
    this.apiPrefix = options.apiPrefix;
  } else {
    this.apiPrefix = 'insight-api';
  }
  if (typeof options.routePrefix !== 'undefined') {
    this.routePrefix = options.routePrefix;
  } else {
    this.routePrefix = 'insight';
  }

  this.network = options.node.network;

};

InsightUI.dependencies = ['insight-api'];

inherits(InsightUI, BaseService);

InsightUI.prototype.start = function(callback) {
  this.indexFile = this.filterIndexHTML(fs.readFileSync(__dirname + '/../public/index.html', {encoding: 'utf8'}));
  this.contractFile = this.filterIndexHTML(fs.readFileSync(__dirname + '/../public/contract.html', {encoding: 'utf8'}));
  this.underAttackFile = this.filterIndexHTML(fs.readFileSync(__dirname + '/../public/under-attack.html', {encoding: 'utf8'}));
  setImmediate(callback);
};

InsightUI.prototype.getRoutePrefix = function() {
  return this.routePrefix;
};

InsightUI.prototype.setupRoutes = function(app, express) {
  var self = this;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.get('/under-attack', function(req, res) {

      res.setHeader('Content-Type', 'text/html');

      return res.send(self.underAttackFile);

  });

  app.get('/contract', function (req, res, next) {
      res.setHeader('Content-Type', 'text/html');
      var body = fs.readFileSync(__dirname + '/../public/contract.html', {encoding: 'utf8'});
      return res.send(body);
  });

  app.post('/contract', function (req, res, next) {
    const code = req.body.code;

    const str = Buffer.from(code).toString('hex');

    child_process.exec(`/Users/wangxia/dev/qtum/src/qtum-cli -rpcport=18332 -rpcuser=lychees -rpcpassword=password createcontract "${str}"`, (err, stdout, stderr) => {
      if (err) {
        var result = err.message.split('\n');
        result.shift();

        return res.send({
          message: result.join('\n'),
        });
      }
      if (stderr) {
        var result = stderr.split('\n');
        result.shift();

        return res.send({
          message: result.join('\n'),
        });
      }
      if (stdout) {
        return res.send({
          message: stdout,
        });
      }
    });
  });

  app.use('/', function(req, res, next){
    if (req.headers.accept && req.headers.accept.indexOf('text/html') !== -1 &&
      req.headers["X-Requested-With"] !== 'XMLHttpRequest'
    ) {

      res.setHeader('Content-Type', 'text/html');
      res.send(self.indexFile);
    } else {

      express.static(__dirname + '/../public')(req, res, next);
    }
  });
};

InsightUI.prototype.filterIndexHTML = function(data) {
  var transformed = data
    .replace(/apiPrefix = '\/api'/, "apiPrefix = '/" + this.apiPrefix + "'")
    .replace(/current_network = null/, "current_network = '" + (this.network.name === 'testnet' ? 'testnet' : 'livenet') + "'");

  if (this.routePrefix) {
    transformed = transformed.replace(/<base href=\"\/\"/, '<base href="/' + this.routePrefix + '/"');
  }

  return transformed;
};

module.exports = InsightUI;
