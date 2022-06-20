import mongoose from "mongoose";

const petSchema = mongoose.Schema({
  name: String,
  petId: String,
  shelter: String,
  age: String,
  type: String,
  breed: String,
  gender: String,
  isBarren: String,
  diseases: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PetModal = mongoose.model("Pet", petSchema);

export default PetModal;
