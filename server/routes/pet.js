import express from "express";
const router = express.Router();

import {
  createPet,
  updatePet,
  getPets,
  getPet,
  deletePet,
  getPetsByShelter,
  getPetsBySearch,
  checkPetByPetId,
  getPetsByPagination,
} from "../controllers/pet.js";

router.get("/pet-search", getPetsBySearch);
router.get("/", getPets);
router.get("/:id", getPet);

router.post("/", createPet);
router.get("/pets-by-shelter/:name", getPetsByShelter);
router.get("/pet-check/:id", checkPetByPetId);
router.get("/pet/pagination", getPetsByPagination);

router.delete("/:id", deletePet);
router.patch("/:id", updatePet);

export default router;
