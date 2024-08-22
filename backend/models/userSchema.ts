import { Schema, model } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: {} },
);

const UserModel = model("User", UserSchema);

export { UserModel };