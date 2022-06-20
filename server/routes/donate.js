import express from "express";
const router = express.Router();

import {
  createDonate,
  getDonates,
  getDonate,
  deleteDonate,
} from "../controllers/donate.js";

router.post("/", createDonate);
router.get("/", getDonates);
router.get("/:id", getDonate);
router.delete("/:id", deleteDonate);

export default router;
