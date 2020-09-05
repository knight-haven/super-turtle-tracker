import express from "express";
import verifyAuth from "../middlewares/auth";
import * as TurtleService from "../services/turtleService";

const router = express.Router();

router.get("/", verifyAuth, TurtleService.getTurtles);
router.get("/:id", verifyAuth, TurtleService.getTurtleById);
router.post("/", verifyAuth, TurtleService.createTurtle);
router.put("/:id", verifyAuth, TurtleService.updateTurtle);
router.delete("/:id", verifyAuth, TurtleService.deleteTurtle);
router.get("/sighting/photo/:turtleId", TurtleService.getTurtleSightingsAndPhotosByTurtleId);

export default router;
