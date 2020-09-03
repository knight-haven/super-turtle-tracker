import { ObjectMap } from "csv-writer/src/lib/lang/object";
import * as dotenv from "dotenv";
import { QueryResultRow } from "pg";
import { v4 as uuid } from "uuid";
import pool from "./db/pool";
import { status } from "./helpers/status";
import queries = require("./db/queries");
import admin = require("firebase-admin");
import createCsvWriter = require("csv-writer");
import express = require("express");
import fs = require("fs");
import sgMail = require("@sendgrid/mail");

import serviceAccount = require("../firebase_creds.json");

const CsvWriter = createCsvWriter.createObjectCsvWriter;
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
});
const bucket = admin.storage().bucket();

export const getTurtleById = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    const results = await pool.query(queries.getTurtleById, [id]);
    response.status(status.success).json(results.rows);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const createTurtle = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const { number, mark, sex } = request.body;
  try {
    const results = await pool.query(queries.createTurtle, [number, mark, sex]);
    response.status(status.created).send(`${results.rows[0].id}`);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};
export const updateTurtle = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const { number, mark, sex } = request.body;
  try {
    const id = parseInt(request.params.id);
    await pool.query(queries.updateTurtle, [number, mark, sex, id]);
    response.status(status.success).send(`Turtle modified with ID: ${id}`);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const deleteTurtle = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    await pool.query(queries.deleteTurtle, [id]);
    await pool.query(queries.deleteSightingByTurtleId, [id]);
    await pool.query(queries.deletePhotoByTurtleId, [id]);
    response.status(status.success).send(`Turtle deleted with ID: ${id}`);
  } catch (error) {
    response.status(status.error).json(error);
  }
};

export const getSightings = async (
  _request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const results = await pool.query(queries.getSightings);
    response.status(status.success).json(results.rows);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const getSightingById = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    const results = await pool.query(queries.getSightingById, [id]);
    response.status(status.success).json(results.rows);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const createSighting = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const { turtleId, time, location, latitude, longitude, length, notes } = request.body;
  try {
    const results = await pool.query(queries.createSighting, [
      turtleId,
      time,
      location,
      latitude,
      longitude,
      length,
      notes,
    ]);
    response.status(status.created).send(`${results.rows[0].id}`);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const updateSighting = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const { turtleId, time, location, latitude, longitude, length, notes } = request.body;
  try {
    const id = parseInt(request.params.id);
    await pool.query(queries.updateSighting, [
      turtleId,
      time,
      location,
      latitude,
      longitude,
      length,
      notes,
      id,
    ]);
    response.status(status.success).send(`Sighting modified with ID: ${id}`);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const deleteSighting = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    await pool.query(queries.deleteSighting, [id]);
    await pool.query(queries.deletePhotoBySightingId, [id]);
    response.status(status.success).send(`Sighting deleted with ID: ${id}`);
  } catch (error) {
    response.status(status.error).json(error);
  }
};

export const getSightingByTurtleId = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const turtleId = parseInt(request.params.turtleId);
    const results = await pool.query(queries.getSightingByTurtleId, [turtleId]);
    response.status(status.success).json(results.rows);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const getRecentSightings = async (
  _request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const results = await pool.query(queries.getRecentSightings);
    response.status(status.success).json(results.rows);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const getPhotos = async (
  _request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const results = await pool.query(queries.getPhotos);
    response.status(status.success).json(results.rows);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const getPhotoById = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    const results = await pool.query(queries.getPhotoById, [id]);
    response.status(status.success).json(results.rows);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

// https://groups.google.com/g/firebase-talk/c/aDJvYyNIJik?pli=1
// https://stackoverflow.com/questions/60922198/firebase-storage-upload-image-file-from-node-js
export const createPhoto = async (
  request: express.Request,
  response: express.Response,
): Promise<Promise<Promise<void>>> => {
  const { turtleId, sightingId, imageData } = request.body;
  const fileName: string = uuid();

  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid(),
    },
    contentType: "image/jpeg",
  };
  try {
    const imageBuffer = Buffer.from(imageData, "base64");
    const file = bucket.file(`images/${fileName}`);
    await file.save(imageBuffer, { metadata });
    const url = (
      await file.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      })
    )[0];
    const results = await pool.query(queries.createPhoto, [turtleId, sightingId, fileName, url]);
    response.status(status.created).send(`${results.rows[0].id}`);
  } catch (error) {
    response.status(status.error).send(error.message);
  }
};

export const updatePhoto = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const { turtleId, sightingId, name } = request.body;
  try {
    const id = parseInt(request.params.id);
    await pool.query(queries.updatePhoto, [turtleId, sightingId, name, id]);
    response.status(status.success).send(`Photo modified with ID: ${id}`);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const deletePhoto = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    await pool.query(queries.deletePhoto, [id]);
    response.status(status.success).send(`Photo deleted with ID: ${id}`);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const getPhotoByTurtleId = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const turtleId = parseInt(request.params.turtleId);
    const results = await pool.query(queries.getPhotoByTurtleId, [turtleId]);
    response.status(status.success).json(results.rows);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const getPhotoBySightingId = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const sightingId = parseInt(request.params.sightingId);
    const results = await pool.query(queries.getPhotoBySightingId, [sightingId]);
    response.status(status.success).json(results.rows);
  } catch (error) {
    response.status(status.error).json(error.message);
  }
};

export const sendEmail = (request: express.Request, response: express.Response): void => {
  const emailAddress = request.params.address;

  pool.query(
    queries.getAllData,
    [],
    async (queryError: Error, results: { rows: ObjectMap<QueryResultRow>[] }) => {
      if (queryError) {
        response.status(status.error).json(queryError);
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
          response.status(status.error).json(messageError);
        });
        try {
          fs.unlinkSync("./turtle_data.csv");
          response.status(status.success).json(results.rows);
        } catch (error) {
          response.status(status.error).json(error.message);
        }
      }
    },
  );
};
