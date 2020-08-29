import { ObjectMap } from "csv-writer/src/lib/lang/object";
import * as dotenv from "dotenv";
import { QueryResult, QueryResultRow } from "pg";
import { v4 as uuid } from "uuid";
import Pool = require("pg");
import express = require("express");
import fs = require("fs");
import sgMail = require("@sendgrid/mail");
import createCsvWriter = require("csv-writer");
import admin = require("firebase-admin");
import serviceAccount = require("./firebase_creds.json");

const CsvWriter = createCsvWriter.createObjectCsvWriter;
dotenv.config();
const pool = new Pool.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PW,
  port: parseInt(process.env.PG_PORT || ""),
  max: parseInt(process.env.PG_MAX || ""),
  min: parseInt(process.env.PG_MIN || ""),
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
});
const bucket = admin.storage().bucket();

export const getTurtles = (_request: express.Request, response: express.Response): void => {
  pool.query(
    `SELECT DISTINCT ON (turtle.id) turtle.id, turtle.mark, turtle.turtle_number AS number, turtle.sex,
      CASE WHEN NOT photo.is_deleted THEN photo.name END AS avatar, photo.url
    FROM turtle
    FULL JOIN photo
    ON turtle.id = photo.turtle_id
    WHERE turtle.is_deleted = false
    ORDER BY turtle.id`,
    [],
    (error: Error, results: QueryResult<QueryResultRow>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).json(results.rows);
      }
    },
  );
};

export const getTurtleById = (request: express.Request, response: express.Response): void => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT *
      FROM turtle
      WHERE id = $1 AND is_deleted = false`,
    [id],
    (error: Error, results: QueryResult<QueryResultRow>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).json(results.rows);
      }
    },
  );
};

export const createTurtle = (request: express.Request, response: express.Response): void => {
  const { number, mark, sex } = request.body;

  pool.query(
    `INSERT INTO turtle (turtle_number, mark, sex)
      VALUES ($1, $2, $3)
      RETURNING id`,
    [number, mark, sex],
    (error: Error, results: QueryResult<{ id: number }>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(201).send(`${results.rows[0].id}`);
      }
    },
  );
};

export const updateTurtle = (request: express.Request, response: express.Response): void => {
  const id = parseInt(request.params.id);
  const { number, mark, sex } = request.body;

  pool.query(
    `UPDATE turtle
      SET turtle_number = $1, mark = $2, sex = $3
      WHERE id = $4`,
    [number, mark, sex, id],
    (error: Error) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).send(`Turtle modified with ID: ${id}`);
      }
    },
  );
};

export const deleteTurtle = (request: express.Request, response: express.Response): void => {
  const id = parseInt(request.params.id);

  pool.query(
    `UPDATE turtle
      SET is_deleted = true
      WHERE id = $1`,
    [id],
    (turtleError: Error) => {
      if (turtleError) {
        response.status(400).json(turtleError);
      } else {
        pool.query(
          `UPDATE sighting
            SET is_deleted = true
            WHERE turtle_id = $1`,
          [id],
          (sightingError: Error) => {
            if (sightingError) {
              response.status(400).json(sightingError);
            } else {
              pool.query(
                `UPDATE photo
                  SET is_deleted = true
                  WHERE turtle_id = $1`,
                [id],
                (photoError: Error) => {
                  if (photoError) {
                    response.status(400).json(photoError);
                  } else {
                    response.status(200).send(`Turtle deleted with ID: ${id}`);
                  }
                },
              );
            }
          },
        );
      }
    },
  );
};

export const getSightings = (_request: express.Request, response: express.Response): void => {
  pool.query(
    `SELECT *
      FROM sighting
      WHERE is_deleted = false
      ORDER BY time_seen DESC`,
    [],
    (error: Error, results: QueryResult<QueryResultRow>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).json(results.rows);
      }
    },
  );
};

export const getSightingById = (request: express.Request, response: express.Response): void => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT *
      FROM sighting
      WHERE id = $1 AND is_deleted = false`,
    [id],
    (error: Error, results: QueryResult<QueryResultRow>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).json(results.rows);
      }
    },
  );
};

export const createSighting = (request: express.Request, response: express.Response): void => {
  const { turtleId, time, location, latitude, longitude, length, notes } = request.body;

  pool.query(
    `INSERT INTO sighting (turtle_id, time_seen, turtle_location, latitude, longitude, carapace_length, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id`,
    [turtleId, time, location, latitude, longitude, length, notes],
    (error: Error, results: QueryResult<{ id: number }>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(201).send(`${results.rows[0].id}`);
      }
    },
  );
};

export const updateSighting = (request: express.Request, response: express.Response): void => {
  const id = parseInt(request.params.id);
  const { turtleId, time, location, latitude, longitude, length, notes } = request.body;

  pool.query(
    `UPDATE sighting
      SET turtle_id = $1, time_seen = $2, turtle_location = $3, latitude = $4, longitude = $5, carapace_length = $6, notes = $7
      WHERE id = $8`,
    [turtleId, time, location, latitude, longitude, length, notes, id],
    (error: Error) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).send(`Sighting modified with ID: ${id}`);
      }
    },
  );
};

export const deleteSighting = (request: express.Request, response: express.Response): void => {
  const id = parseInt(request.params.id);

  pool.query(
    `UPDATE sighting
      SET is_deleted = true
      WHERE id = $1`,
    [id],
    (sightingError: Error) => {
      if (sightingError) {
        response.status(400).json(sightingError);
      } else {
        pool.query(
          `UPDATE photo
            SET is_deleted = true
            WHERE sighting_id = $1`,
          [id],
          (photoError: Error) => {
            if (photoError) {
              response.status(400).json(photoError);
            } else {
              response.status(200).send(`Sighting deleted with ID: ${id}`);
            }
          },
        );
      }
    },
  );
};

export const getSightingByTurtleId = (
  request: express.Request,
  response: express.Response,
): void => {
  const turtleId = parseInt(request.params.turtleId);

  pool.query(
    `SELECT *
      FROM turtle, sighting
      WHERE turtle.id = turtle_id AND turtle_id = $1 AND turtle.is_deleted = false AND sighting.is_deleted = false
      ORDER BY time_seen DESC`,
    [turtleId],
    (error: Error, results: QueryResult<QueryResultRow>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).json(results.rows);
      }
    },
  );
};

export const getRecentSightings = (_request: express.Request, response: express.Response): void => {
  pool.query(
    `SELECT DISTINCT ON (turtle_id) turtle_id, time_seen, latitude, longitude
      FROM sighting
      ORDER BY turtle_id, time_seen DESC`,
    [],
    (error: Error, results: QueryResult<QueryResultRow>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).json(results.rows);
      }
    },
  );
};

export const getPhotos = (_request: express.Request, response: express.Response): void => {
  pool.query(
    `SELECT *
      FROM photo
      WHERE is_deleted = false`,
    [],
    (error: Error, results: QueryResult<QueryResultRow>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).json(results.rows);
      }
    },
  );
};

export const getPhotoById = (request: express.Request, response: express.Response): void => {
  const id = parseInt(request.params.id);

  pool.query(
    `SELECT *
      FROM photo
      WHERE id = $1 AND is_deleted = false`,
    [id],
    (error: Error, results: QueryResult<QueryResultRow>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).json(results.rows);
      }
    },
  );
};

export const createPhoto = (request: express.Request, response: express.Response): void => {
  // https://groups.google.com/g/firebase-talk/c/aDJvYyNIJik?pli=1
  // https://stackoverflow.com/questions/60922198/firebase-storage-upload-image-file-from-node-js
  const { turtleId, sightingId, imageData } = request.body;
  const fileName: string = uuid();

  const imageBuffer = Buffer.from(imageData, "base64");
  const metadata = {
    metadata: {
      // This line is very important. It's to create a download token.
      firebaseStorageDownloadTokens: uuid(),
    },
    contentType: "image/jpeg",
    cacheControl: "public, max-age=31536000",
  };

  const file = bucket.file(`images/${fileName}`);
  file.save(
    imageBuffer,
    {
      metadata,
    },
    async (uploadError) => {
      if (uploadError) {
        response.status(400).send(uploadError.message);
      } else {
        const url = (
          await file.getSignedUrl({
            action: "read",
            expires: "03-09-2491",
          })
        )[0];
        pool.query(
          `INSERT INTO photo (turtle_id, sighting_id, name, url)
                  VALUES ($1, $2, $3, $4)
                  RETURNING id`,
          [turtleId, sightingId, fileName, url],
          (queryError: Error, results: QueryResult<{ id: number }>) => {
            if (queryError) {
              response.status(400).json(queryError.message);
            } else {
              response.status(201).send(`${results.rows[0].id}`);
            }
          },
        );
      }
    },
  );
};

export const updatePhoto = (request: express.Request, response: express.Response): void => {
  const id = parseInt(request.params.id);
  const { turtleId, sightingId, name } = request.body;

  pool.query(
    `UPDATE photo
      SET turtle_id = $1, sighting_id = $2, name = $3
      WHERE id = $4`,
    [turtleId, sightingId, name, id],
    (error: Error) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).send(`Photo modified with ID: ${id}`);
      }
    },
  );
};

export const deletePhoto = (request: express.Request, response: express.Response): void => {
  const id = parseInt(request.params.id);

  pool.query(
    `UPDATE photo
      SET is_deleted = true
      WHERE id = $1`,
    [id],
    (error: Error) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).send(`Photo deleted with ID: ${id}`);
      }
    },
  );
};

export const getPhotoByTurtleId = (request: express.Request, response: express.Response): void => {
  const turtleId = parseInt(request.params.turtleId);

  pool.query(
    `SELECT photo.name
      FROM turtle, photo
      WHERE turtle.id = turtle_id AND turtle_id = $1 AND turtle.is_deleted = false AND photo.is_deleted = false`,
    [turtleId],
    (error: Error, results: QueryResult<QueryResultRow>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).json(results.rows);
      }
    },
  );
};

export const getPhotoBySightingId = (
  request: express.Request,
  response: express.Response,
): void => {
  const sightingId = parseInt(request.params.sightingId);

  pool.query(
    `SELECT photo.id, photo.name
      FROM sighting, photo
      WHERE sighting.id = sighting_id AND sighting_id = $1 AND sighting.is_deleted = false AND photo.is_deleted = false`,
    [sightingId],
    (error: Error, results: QueryResult<QueryResultRow>) => {
      if (error) {
        response.status(400).json(error.message);
      } else {
        response.status(200).json(results.rows);
      }
    },
  );
};

export const sendEmail = (request: express.Request, response: express.Response): void => {
  const emailAddress = request.params.address;

  pool.query(
    `SELECT turtle_number, mark, sex, time_seen, turtle_location, latitude, longitude, carapace_length, notes
      FROM turtle, sighting
      WHERE turtle.id = sighting.turtle_id AND turtle.is_deleted = false AND sighting.is_deleted = false
      ORDER BY turtle_number`,
    [],
    async (queryError: Error, results: { rows: ObjectMap<QueryResultRow>[] }) => {
      if (queryError) {
        response.status(400).json(queryError);
      } else {
        // https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
        const csvWriter = CsvWriter({
          path: "turtle_data.csv",
          header: [
            { id: "turtle_number", title: "Turtle Number" },
            { id: "mark", title: "Mark" },
            { id: "sex", title: "Sex" },
            { id: "time_seen", title: "Date" },
            { id: "turtle_location", title: "Location" },
            { id: "latitude", title: "Latitude" },
            { id: "longitude", title: "longitude" },
            { id: "carapace_length", title: "Carapace Length (mm)" },
            { id: "notes", title: "Notes" },
          ],
        });
        await csvWriter.writeRecords(results.rows);
        // .then(() => console.log("The CSV file was written successfully"));

        // https://www.twilio.com/blog/sending-email-attachments-with-sendgrid
        const pathToAttachment = `${__dirname}/turtle_data.csv`;
        const attachment = fs.readFileSync(pathToAttachment).toString("base64");

        const msg = {
          to: emailAddress,
          from: "turtletrackerbackend@gmail.com",
          subject: "Calvin EcoPreserve Turtle Data",
          text:
            "Dear Turtle Tracker User,\n\nAttached is a csv file with the all the box turtle data at the Calvin EcoPreserve.\n\nSincerely,\nThe Turtle Tracker Team",
          attachments: [
            {
              content: attachment,
              filename: "turtle_data.csv",
              type: "application/csv",
              disposition: "attachment",
            },
          ],
        };
        sgMail.send(msg).catch((messageError) => {
          response.status(400).json(messageError);
        });
        try {
          fs.unlinkSync("./turtle_data.csv");
          response.status(200).json(results.rows);
        } catch (error) {
          response.status(400).json(error.message);
        }
      }
    },
  );
};
