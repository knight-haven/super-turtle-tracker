import express from "express";
import verifyAuth from "../middlewares/auth";
import * as SightingService from "../services/sightingService";

const router = express.Router();

router.get("/", verifyAuth, SightingService.getSightings);
router.get("/recent", verifyAuth, SightingService.getRecentSightings);
router.get("/:id", verifyAuth, SightingService.getSightingById);
router.post("/", verifyAuth, SightingService.createSighting);
router.put("/:id", verifyAuth, SightingService.updateSighting);
router.delete("/:id", verifyAuth, SightingService.deleteSighting);
router.get("/turtle/:turtleId", verifyAuth, SightingService.getSightingByTurtleId);

export default router;
