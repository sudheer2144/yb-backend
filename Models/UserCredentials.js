import mongoose from "mongoose";

const schema = mongoose.Schema;

const userCredentialsSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

export default mongoose.model("UserCredentials", userCredentialsSchema);
