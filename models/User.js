import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  discriminator: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
