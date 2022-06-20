import mongoose from "mongoose";
import DonateModal from "../models/donate.js";

export const createDonate = async (req, res) => {
  const donate = req.body;
  const newDonate = new DonateModal({ ...donate });

  try {
    await newDonate.save();
    res.status(201).json(newDonate);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getDonates = async (req, res) => {
  try {
    const donates = await DonateModal.find();
    res.status(200).json(donates);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getDonate = async (req, res) => {
  const { id } = req.params;
  try {
    const donate = await DonateModal.findById(id);
    res.status(200).json(donate);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteDonate = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: ` No donate exist with id: ${id}` });
    }
    await DonateModal.findByIdAndRemove(id);
    res.json({ message: "Donate Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
