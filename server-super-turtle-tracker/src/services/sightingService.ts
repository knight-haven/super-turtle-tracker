import pool from "../db/pool";
import { ID, Sighting } from "../interfaces";
import status = require("http-status");
import queries = require("../db/queries");
import express = require("express");

export const getSightings = async (
  _request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const results = await pool.query<Sighting>(queries.getSightings);
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const getSightingById = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const id = parseInt(request.params.id);
    const results = await pool.query<Sighting>(queries.getSightingById, [id]);
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const createSighting = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const { turtleId, time, location, latitude, longitude, length, notes } = request.body;
  try {
    const results = await pool.query<ID>(queries.createSighting, [
      turtleId,
      time,
      location,
      latitude,
      longitude,
      length,
      notes,
    ]);
    response.status(status.CREATED).send(`${results.rows[0].id}`);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
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
    response.status(status.OK).send(`Sighting modified with ID: ${id}`);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
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
    response.status(status.OK).send(`Sighting deleted with ID: ${id}`);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getSightingByTurtleId = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const turtleId = parseInt(request.params.turtleId);
    const results = await pool.query<Sighting>(queries.getSightingByTurtleId, [turtleId]);
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

export const getRecentSightings = async (
  _request: express.Request,
  response: express.Response,
): Promise<void> => {
  try {
    const results = await pool.query<Sighting>(queries.getRecentSightings);
    response.status(status.OK).json(results.rows);
  } catch (error) {
    response.status(status.INTERNAL_SERVER_ERROR).json(error.message);
  }
};
