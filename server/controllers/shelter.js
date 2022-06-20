import express from "express";
import mongoose from "mongoose";
import ShelterModal from "../models/shelter.js";

export const createShelter = async (req, res) => {
  const shelter = req.body;
  const newShelter = new ShelterModal({ ...shelter });

  try {
    await newShelter.save();
    res.status(201).json(newShelter);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getShelters = async (req, res) => {
  try {
    const shelters = await ShelterModal.find();
    res.status(200).json(shelters);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getShelter = async (req, res) => {
  const { id } = req.params;
  try {
    const shelter = await ShelterModal.findById(id);
    res.status(200).json(shelter);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteShelter = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: ` No shelter exist with id: ${id}` });
    }
    await ShelterModal.findByIdAndRemove(id);
    res.json({ message: "Shelter Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateShelter = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, city, address } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: ` No shelter exist with id: ${id}` });
    }
    const updatedShelter = {
      name,
      phone,
      email,
      city,
      address,
      _id: id,
    };
    await ShelterModal.findByIdAndUpdate(id, updatedShelter, { new: true });
    res.json(updatedShelter);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
