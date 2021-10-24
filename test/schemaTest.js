//Is easygraphql-tester
"use strict";

const EasyGraphQLTester = require("easygraphql-tester");
const fs = require("fs");
const path = require("path");

const userSchema = fs.readFileSync(
  path.join(__dirname, "schema", "user.gql"),
  "utf8"
);
const familySchema = fs.readFileSync(
  path.join(__dirname, "schema", "family.gql"),
  "utf8"
);

export const tester = new EasyGraphQLTester([userSchema, familySchema]);
