var express = require('express');
var routes = require('/routes');
var mongo = require('mongo');
var http = require('http');
var mongoskin = require('mongoskin');
var dbUrl = process.env.MONGOHQ_URL || "mongodb://@localhost:27017/simplequery"
var app = express();

