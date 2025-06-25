import mongoose from "mongoose";

const collection = "MockingUsers";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  pets: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "MockingPets",
    },
  ],
});

const mockingUserModel = mongoose.model(collection, schema);

export default mockingUserModel;
