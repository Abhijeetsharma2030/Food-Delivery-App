// Usage: node scripts/make-admin.js user@example.com
// Marks an existing user as admin so they can use the admin panel.
import "dotenv/config";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";

const email = process.argv[2];
if (!email) {
  console.log("Usage: node scripts/make-admin.js <email>");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
const user = await userModel.findOneAndUpdate({ email }, { isAdmin: true }, { new: true });
console.log(user ? `${email} is now an admin` : `No user found with email ${email}`);
await mongoose.disconnect();
