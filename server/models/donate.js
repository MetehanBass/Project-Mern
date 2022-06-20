import mongoose from "mongoose";

const donateSchema = mongoose.Schema({
  catFood: String,
  dogFood: String,
  totalPrice: String,
  donaterName: String,
  donaterPhone: String,
  donaterEmail: String,
  createdAt: String,
});

const DonateModal = mongoose.model("Donate", donateSchema);

export default DonateModal;
