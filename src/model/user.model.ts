import mongoose, { Schema, Document } from "mongoose";

export interface message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<message> = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

export interface user extends Document {
  username: string;
  email: string;
  password: string;
  isAcceptingMessages: boolean;
  verifyToken: string;
  verifyTokenExpiry: Date;
  isVerified: boolean;
  messages: message[];
}

const userSchema: Schema<user> = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^.+@.+\..+$/, "email must contains these"],
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  verifyToken: {
    type: String,
    required: [true, "verify token is required"],
  },
  verifyTokenExpiry: {
    type: Date,
    required: [true, "verify token expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  messages: [messageSchema],
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export { userModel };
