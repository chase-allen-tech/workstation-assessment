'use strict';

const Hapi = require('@hapi/hapi');
const { apiHandler } = require("./router")

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: apiHandler
});

server.start();

module.exports = server;