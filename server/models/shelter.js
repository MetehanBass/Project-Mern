import mongoose from "mongoose";

const shelterSchema = mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  city: String,
  address: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ShelterModal = mongoose.model("Shelter", shelterSchema);

export default ShelterModal;
