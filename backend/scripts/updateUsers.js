require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/user"); // adjust the path

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateUsers() {
  try {
    const result = await User.updateMany(
      {
        $or: [
          { interviewsPerDay: { $exists: false } },
          { lastInterviewDate: { $exists: false } },
        ],
      },
      {
        $set: {
          interviewsPerDay: 5,
          lastInterviewDate: null,
        },
      }
    );

    console.log(`${result.modifiedCount || result.nModified} users updated.`);
  } catch (err) {
    console.error("Error updating users:", err);
  } finally {
    mongoose.connection.close();
  }
}

updateUsers();
