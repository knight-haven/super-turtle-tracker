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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queries = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable radix */
/* eslint-disable no-console */
var dotenv = __importStar(require("dotenv"));
var Pool = require("pg");
var fs = require("fs");
var sgMail = require("@sendgrid/mail");
var createCsvWriter = require("csv-writer");
var CsvWriter = createCsvWriter.createObjectCsvWriter;
dotenv.config();
var pool = new Pool.Pool({
    user: process.env.DEV_PG_USER,
    host: process.env.DEV_PG_HOST,
    database: process.env.DEV_PG_DB,
    password: process.env.DEV_PG_PW,
    port: parseInt(process.env.PG_PORT),
    max: parseInt(process.env.PG_MAX),
    min: parseInt(process.env.PG_MIN),
});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// eslint-disable-next-line @typescript-eslint/no-namespace
var Queries;
(function (Queries) {
    var _this = this;
    Queries.getTurtles = function (request, response) {
        pool.query("SELECT DISTINCT ON (turtle.id) turtle.id, turtle.mark, turtle.turtle_number AS number, turtle.sex, photo.name AS avatar\n      FROM turtle, photo\n      WHERE turtle.is_deleted = false AND photo.is_deleted = false AND turtle.id = photo.turtle_id\n      ORDER BY id", [], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(200).json(results.rows);
        });
    };
    Queries.getTurtleById = function (request, response) {
        var id = parseInt(request.params.id);
        pool.query("SELECT *\n      FROM turtle\n      WHERE id = $1 AND is_deleted = false", [id], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(200).json(results.rows);
        });
    };
    Queries.createTurtle = function (request, response) {
        var _a = request.body, number = _a.number, mark = _a.mark, sex = _a.sex;
        pool.query("INSERT INTO turtle (turtle_number, mark, sex)\n      VALUES ($1, $2, $3)\n      RETURNING id", [number, mark, sex], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(201).send("" + results.rows[0].id);
        });
    };
    Queries.updateTurtle = function (request, response) {
        var id = parseInt(request.params.id);
        var _a = request.body, number = _a.number, mark = _a.mark, sex = _a.sex;
        pool.query("UPDATE turtle\n      SET turtle_number = $1, mark = $2, sex = $3\n      WHERE id = $4", [number, mark, sex, id], function (error) {
            if (error) {
                console.error(error);
            }
            response.status(200).send("Turtle modified with ID: " + id);
        });
    };
    Queries.deleteTurtle = function (request, response) {
        var id = parseInt(request.params.id);
        pool.query("UPDATE turtle\n      SET is_deleted = true\n      WHERE id = $1", [id], function (turtleError) {
            if (turtleError) {
                console.error(turtleError);
            }
            else {
                pool.query("UPDATE sighting\n            SET is_deleted = true\n            WHERE turtle_id = $1", [id], function (sightingError) {
                    if (sightingError) {
                        console.error(sightingError);
                    }
                    else {
                        pool.query("UPDATE photo\n                  SET is_deleted = true\n                  WHERE turtle_id = $1", [id], function (photoError) {
                            if (photoError) {
                                console.error(photoError);
                            }
                            response.status(200).send("Turtle deleted with ID: " + id);
                        });
                    }
                });
            }
        });
    };
    Queries.getSightings = function (request, response) {
        pool.query("SELECT *\n      FROM sighting\n      WHERE is_deleted = false\n      ORDER BY time_seen DESC", [], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(200).json(results.rows);
        });
    };
    Queries.getSightingById = function (request, response) {
        var id = parseInt(request.params.id);
        pool.query("SELECT *\n      FROM sighting\n      WHERE id = $1 AND is_deleted = false", [id], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(200).json(results.rows);
        });
    };
    Queries.createSighting = function (request, response) {
        var _a = request.body, turtleId = _a.turtleId, time = _a.time, location = _a.location, latitude = _a.latitude, longitude = _a.longitude, length = _a.length, notes = _a.notes;
        pool.query("INSERT INTO sighting (turtle_id, time_seen, turtle_location, latitude, longitude, carapace_length, notes)\n      VALUES ($1, $2, $3, $4, $5, $6, $7)\n      RETURNING id", [turtleId, time, location, latitude, longitude, length, notes], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(201).send("" + results.rows[0].id);
        });
    };
    Queries.updateSighting = function (request, response) {
        var id = parseInt(request.params.id);
        var _a = request.body, turtleId = _a.turtleId, time = _a.time, location = _a.location, latitude = _a.latitude, longitude = _a.longitude, length = _a.length, notes = _a.notes;
        pool.query("UPDATE sighting\n      SET turtle_id = $1, time_seen = $2, turtle_location = $3, latitude = $4, longitude = $5, carapace_length = $6, notes = $7\n      WHERE id = $8", [turtleId, time, location, latitude, longitude, length, notes, id], function (error) {
            if (error) {
                console.error(error);
            }
            response.status(200).send("Sighting modified with ID: " + id);
        });
    };
    Queries.deleteSighting = function (request, response) {
        var id = parseInt(request.params.id);
        pool.query("UPDATE sighting\n      SET is_deleted = true\n      WHERE id = $1", [id], function (sightingError) {
            if (sightingError) {
                console.error(sightingError);
            }
            else {
                pool.query("UPDATE photo\n            SET is_deleted = true\n            WHERE sighting_id = $1", [id], function (photoError) {
                    if (photoError) {
                        console.error(photoError);
                    }
                    response.status(200).send("Sighting deleted with ID: " + id);
                });
            }
        });
    };
    Queries.getSightingByTurtleId = function (request, response) {
        var turtleId = parseInt(request.params.turtleId);
        pool.query("SELECT *\n      FROM turtle, sighting\n      WHERE turtle.id = turtle_id AND turtle_id = $1 AND turtle.is_deleted = false AND sighting.is_deleted = false\n      ORDER BY time_seen DESC", [turtleId], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(200).json(results.rows);
        });
    };
    Queries.getRecentSightings = function (request, response) {
        pool.query("SELECT DISTINCT ON (turtle_id) turtle_id, time_seen, latitude, longitude\n      FROM sighting\n      ORDER BY turtle_id, time_seen DESC", [], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(200).json(results.rows);
        });
    };
    Queries.getPhotos = function (request, response) {
        pool.query("SELECT *\n      FROM photo\n      WHERE is_deleted = false", [], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(200).json(results.rows);
        });
    };
    Queries.getPhotoById = function (request, response) {
        var id = parseInt(request.params.id);
        pool.query("SELECT *\n      FROM photo\n      WHERE id = $1 AND is_deleted = false", [id], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(200).json(results.rows);
        });
    };
    Queries.createPhoto = function (request, response) {
        var _a = request.body, turtleId = _a.turtleId, sightingId = _a.sightingId, name = _a.name;
        pool.query("INSERT INTO photo (turtle_id, sighting_id, name)\n      VALUES ($1, $2, $3)\n      RETURNING id", [turtleId, sightingId, name], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(201).send("" + results.rows[0].id);
        });
    };
    Queries.updatePhoto = function (request, response) {
        var id = parseInt(request.params.id);
        var _a = request.body, turtleId = _a.turtleId, sightingId = _a.sightingId, name = _a.name;
        pool.query("UPDATE photo\n      SET turtle_id = $1, sighting_id = $2, name = $3\n      WHERE id = $4", [turtleId, sightingId, name, id], function (error) {
            if (error) {
                console.error(error);
            }
            response.status(200).send("Photo modified with ID: " + id);
        });
    };
    Queries.deletePhoto = function (request, response) {
        var id = parseInt(request.params.id);
        pool.query("UPDATE photo\n      SET is_deleted = true\n      WHERE id = $1", [id], function (error) {
            if (error) {
                console.error(error);
            }
            response.status(200).send("Photo deleted with ID: " + id);
        });
    };
    Queries.getPhotoByTurtleId = function (request, response) {
        var turtleId = parseInt(request.params.turtleId);
        pool.query("SELECT photo.name\n      FROM turtle, photo\n      WHERE turtle.id = turtle_id AND turtle_id = $1 AND turtle.is_deleted = false AND photo.is_deleted = false", [turtleId], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(200).json(results.rows);
        });
    };
    Queries.getPhotoBySightingId = function (request, response) {
        var sightingId = parseInt(request.params.sightingId);
        pool.query("SELECT photo.id, photo.name\n      FROM sighting, photo\n      WHERE sighting.id = sighting_id AND sighting_id = $1 AND sighting.is_deleted = false AND photo.is_deleted = false", [sightingId], function (error, results) {
            if (error) {
                console.error(error);
            }
            response.status(200).json(results.rows);
        });
    };
    Queries.sendEmail = function (request, response) {
        var emailAddress = request.params.address;
        pool.query("SELECT turtle_number, mark, sex, time_seen, turtle_location, latitude, longitude, carapace_length, notes\n      FROM turtle, sighting\n      WHERE turtle.id = sighting.turtle_id AND turtle.is_deleted = false AND sighting.is_deleted = false\n      ORDER BY turtle_number", [], function (queryError, results) { return __awaiter(_this, void 0, void 0, function () {
            var csvWriter, pathToAttachment, attachment, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (queryError) {
                            console.error(queryError);
                        }
                        csvWriter = CsvWriter({
                            path: 'turtle_data.csv',
                            header: [
                                { id: 'turtle_number', title: 'Turtle Number' },
                                { id: 'mark', title: 'Mark' },
                                { id: 'sex', title: 'Sex' },
                                { id: 'time_seen', title: 'Date' },
                                { id: 'turtle_location', title: 'Location' },
                                { id: 'latitude', title: 'Latitude' },
                                { id: 'longitude', title: 'longitude' },
                                { id: 'carapace_length', title: 'Carapace Length (mm)' },
                                { id: 'notes', title: 'Notes' }
                            ]
                        });
                        return [4 /*yield*/, csvWriter
                                .writeRecords(results.rows)
                                .then(function () { return console.log('The CSV file was written successfully'); })
                            // https://www.twilio.com/blog/sending-email-attachments-with-sendgrid
                        ];
                    case 1:
                        _a.sent();
                        pathToAttachment = __dirname + "/turtle_data.csv";
                        attachment = fs.readFileSync(pathToAttachment).toString('base64');
                        msg = {
                            to: emailAddress,
                            from: 'turtletrackerbackend@gmail.com',
                            subject: 'Calvin EcoPreserve Turtle Data',
                            text: 'Dear Turtle Tracker User,\n\nAttached is a csv file with the all the box turtle data at the Calvin EcoPreserve.\n\nSincerely,\nThe Turtle Tracker Team',
                            attachments: [
                                {
                                    content: attachment,
                                    filename: 'turtle_data.csv',
                                    type: 'application/csv',
                                    disposition: 'attachment'
                                }
                            ]
                        };
                        sgMail.send(msg).catch(function (messageError) {
                            console.error(messageError);
                        });
                        try {
                            fs.unlinkSync('./turtle_data.csv');
                        }
                        catch (error) {
                            console.error(error);
                        }
                        response.status(200).json(results.rows);
                        return [2 /*return*/];
                }
            });
        }); });
    };
})(Queries = exports.Queries || (exports.Queries = {}));
