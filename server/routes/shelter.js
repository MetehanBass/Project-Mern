import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createShelter,
  deleteShelter,
  getShelter,
  getShelters,
  updateShelter,
} from "../controllers/shelter.js";

router.post("/", createShelter);
router.get("/", getShelters);
router.get("/:id", getShelter);

router.delete("/:id", deleteShelter);
router.patch("/:id", updateShelter);

export default router;
