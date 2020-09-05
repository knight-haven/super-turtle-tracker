import express from "express";
import verifyAuth from "../middlewares/auth";
import sendMail from "../services/mailService";

const router = express.Router();

router.get("/:address", verifyAuth, sendMail);

export default router;
