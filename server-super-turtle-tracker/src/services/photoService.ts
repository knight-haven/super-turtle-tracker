import { v4 as uuid } from "uuid";
import pool from "../db/pool";
import { ID, Photo } from "../interfaces";
import saveImage from "../middlewares/firebase";
import status = require("http-status");
import queries = require("../db/queries");
import express = require("express");

export const getPhotos = async (
  _request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const results = await pool.query<Photo>(queries.getPhotos);
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
    const results = await pool.query<Photo>(queries.getPhotoById, [id]);
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
): Promise<void> => {
  const { turtleId, sightingId, imageData } = request.body;
  const fileName: string = uuid();
  const url = await saveImage(imageData, fileName);

  try {
    const results = await pool.query<ID>(queries.createPhoto, [
      turtleId,
      sightingId,
      fileName,
      url,
    ]);
    response.status(status.CREATED).send(`${results.rows[0].id}`);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
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
    const results = await pool.query<Photo>(queries.getPhotoByTurtleId, [turtleId]);
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
    const results = await pool.query<Photo>(queries.getPhotoBySightingId, [sightingId]);
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};
