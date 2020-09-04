import express from "express";
import verifyAuth from "../middlewares/auth";
import * as PhotoService from "../services/photoService";

const router = express.Router();

router.get("/", verifyAuth, PhotoService.getPhotos);
router.get("/:id", verifyAuth, PhotoService.getPhotoById);
router.post("/", verifyAuth, PhotoService.createPhoto);
router.put("/:id", verifyAuth, PhotoService.updatePhoto);
router.delete("/:id", verifyAuth, PhotoService.deletePhoto);
router.get("/turtle/:turtleId", verifyAuth, PhotoService.getPhotoByTurtleId);
router.get("/sighting/:sightingId", verifyAuth, PhotoService.getPhotoBySightingId);

export default router;
