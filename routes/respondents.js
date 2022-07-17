import express from "express";
const router = express.Router();
import { createRespondents } from "../controllers/respondentsController.js";

router.route("/").post(createRespondents);

export default router;
