import mongoose from "mongoose";
import PetModal from "../models/pet.js";

export const createPet = async (req, res) => {
  const pet = req.body;
  const newPet = new PetModal({ ...pet });

  try {
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const checkPetByPetId = async (req, res) => {
  const { id } = req.params;
  try {
    const foundPet = await PetModal.find({ petId: id });
    res.status(200).send(foundPet);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getPetsByPagination = async (req, res) => {
  const { count, page, shelter } = req.query;

  try {
    let pets;
    let petsCount;
    if (shelter) {
      pets = await PetModal.find({ shelter })
        .limit(count)
        .skip(page * count);

      petsCount = await PetModal.countDocuments({ shelter });
    } else {
      pets = await PetModal.find()
        .limit(count)
        .skip(page * count);

      petsCount = await PetModal.countDocuments();
    }

    res.status(200).send({ petsCount, pets });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getPets = async (req, res) => {
  try {
    const pets = await PetModal.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getPetsByShelter = async (req, res) => {
  try {
    const { name: shelter } = req.params;
    const pets = await PetModal.find({ shelter });
    res.status(200).json(pets);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getPet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await PetModal.findById(id);
    res.status(200).json(pet);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: ` No pet exist with id: ${id}` });
    }
    await PetModal.findByIdAndRemove(id);
    res.json({ message: "Pet Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updatePet = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    shelter,
    age,
    petId,
    type,
    breed,
    isBarren,
    diseases,
    gender,
    imageFile,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: ` No pet exist with id: ${id}` });
    }
    const updatedPet = {
      name,
      petId,
      shelter,
      age,
      type,
      breed,
      gender,
      isBarren,
      diseases,
      imageFile,
      _id: id,
    };
    await PetModal.findByIdAndUpdate(id, updatedPet, { new: true });
    res.json(updatedPet);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getPetsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const name = new RegExp(searchQuery, "i");
    const pets = await PetModal.find({ name });
    res.json(pets);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
