"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
// Deploy with: git subtree push --prefix backend heroku master
// eslint-disable-next-line import/order
var queries_1 = require("./queries");
var dotenv = __importStar(require("dotenv"));
var express = require("express");
var bodyParser = require("body-parser");
dotenv.config();
var app = express();
var SECRET = process.env.BACKEND_SECRET;
var getBearerToken = function (request) {
    var token = ' ';
    if (request.headers.authorization !== undefined) {
        try {
            // eslint-disable-next-line prefer-destructuring
            token = request.headers.authorization.split(' ')[1];
        }
        catch (error) {
            console.log('No bearer token given');
        }
    }
    return token;
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function (response) {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});
// For every response..
app.all('*', function (req, res, next) {
    var token = getBearerToken(req);
    if (token === SECRET) {
        app.get('/turtle', queries_1.Queries.getTurtles);
        app.get('/turtle/:id', queries_1.Queries.getTurtleById);
        app.post('/turtle', queries_1.Queries.createTurtle);
        app.put('/turtle/:id', queries_1.Queries.updateTurtle);
        app.delete('/turtle/:id', queries_1.Queries.deleteTurtle);
        app.get('/sighting', queries_1.Queries.getSightings);
        app.get('/sighting/:id', queries_1.Queries.getSightingById);
        app.post('/sighting', queries_1.Queries.createSighting);
        app.put('/sighting/:id', queries_1.Queries.updateSighting);
        app.delete('/sighting/:id', queries_1.Queries.deleteSighting);
        app.get('/sighting/turtle/:turtleId', queries_1.Queries.getSightingByTurtleId);
        app.get('/recentSighting', queries_1.Queries.getRecentSightings);
        app.get('/photo', queries_1.Queries.getPhotos);
        app.get('/photo/:id', queries_1.Queries.getPhotoById);
        app.post('/photo', queries_1.Queries.createPhoto);
        app.put('/photo/:id', queries_1.Queries.updatePhoto);
        app.delete('/photo/:id', queries_1.Queries.deletePhoto);
        app.get('/photo/turtle/:turtleId', queries_1.Queries.getPhotoByTurtleId);
        app.get('/photo/sighting/:sightingId', queries_1.Queries.getPhotoBySightingId);
        app.get('/email/:address', queries_1.Queries.sendEmail);
        next(); // Go onto the queries.
    }
    else {
        res.status(401).json('Unauthorized Request');
    }
});
var port = process.env.PORT;
if (port == null || port === '') {
    port = '5000';
}
app.listen(port, function () {
    console.log("App running on port " + port + ".");
});
