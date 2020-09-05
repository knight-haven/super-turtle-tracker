import pool from "../db/pool";
import { ID, Photo, Sighting, Turtle, TurtleSightingPhoto } from "../interfaces";
import status = require("http-status");
import queries = require("../db/queries");
import express = require("express");

export const getTurtles = async (
  _request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const results = await pool.query<Turtle>(queries.getTurtles);
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const getTurtleById = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    const results = await pool.query<Turtle>(queries.getTurtleById, [id]);
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const createTurtle = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const { number, mark, sex } = request.body;
  try {
    const results = await pool.query<ID>(queries.createTurtle, [number, mark, sex]);
    response.status(status.CREATED).send(`${results.rows[0].id}`);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
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
    response.status(status.OK).send(`Turtle modified with ID: ${id}`);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
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
    response.status(status.OK).send(`Turtle deleted with ID: ${id}`);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const getTurtleSightingsAndPhotosByTurtleId = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const finalObj: TurtleSightingPhoto = {
    turtle: undefined,
    sightings: undefined,
    photos: undefined,
  };
  try {
    const turtleId = parseInt(request.params.turtleId);
    const turtleResults = await pool.query<Turtle>(queries.getTurtleById, [turtleId]);
    [finalObj.turtle] = turtleResults.rows;
    const sightingResults = await pool.query<Sighting>(queries.getSightingByTurtleId, [turtleId]);
    finalObj.sightings = sightingResults.rows;
    const photoResults = await pool.query<Photo>(queries.getPhotoByTurtleId, [turtleId]);
    finalObj.photos = photoResults.rows;
    response.status(status.OK).json(finalObj);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};
