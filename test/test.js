"use strict";
var test = require("unit.js");
var index = require("../index.js");

(err, result) => {
  try {
    test.number(result.statusCode).is(200);
    test.string(result.body).contains("ApolloServer");
    done();
  } catch (error) {
    done(error);
  }
};
