import "dotenv/config";
import mongoose from "mongoose";
import User from "../src/models/User.js";

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  const result = await User.updateMany(
    {},
    { $set: { admin:false,
        superadmin:false
    } }
  );

  console.log(`Updated ${result.modifiedCount} documents`);

  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
