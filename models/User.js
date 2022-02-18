import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    // As in discord
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  discriminator: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
