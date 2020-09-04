import { v4 as uuid } from "uuid";
import pool from "../db/pool";
import status = require("http-status");
import queries = require("../db/queries");
import express = require("express");
import admin = require("firebase-admin");
import serviceAccount = require("../../firebase_creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
});
const bucket = admin.storage().bucket();

export const getPhotos = async (
  _request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const results = await pool.query(queries.getPhotos);
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const getPhotoById = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    const results = await pool.query(queries.getPhotoById, [id]);
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
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
    response.status(status.CREATED).send(`${results.rows[0].id}`);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).send(error.message);
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
    response.status(status.OK).send(`Photo modified with ID: ${id}`);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const deletePhoto = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    await pool.query(queries.deletePhoto, [id]);
    response.status(status.OK).send(`Photo deleted with ID: ${id}`);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const getPhotoByTurtleId = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const turtleId = parseInt(request.params.turtleId);
    const results = await pool.query(queries.getPhotoByTurtleId, [turtleId]);
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const getPhotoBySightingId = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const sightingId = parseInt(request.params.sightingId);
    const results = await pool.query(queries.getPhotoBySightingId, [sightingId]);
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};
