const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  image: String,
  password: { type: String },

  questions: {
    type: [String],
  },

  isSubscribed: {
    type: Boolean,
    default: false,
  },

  interviewGiven:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "interview",
    },
  ],

  solvedQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "interview",
    },
  ],

  lastAnalyzedCount: { type: Number, default: 0 },

  payments: [
    {
      order_id: { type: String, required: true },
      payment_id: { type: String, required: true },
      signature: { type: String, required: true },
      amount: { type: Number, required: true },
      status: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
      },
      createdAt: { type: Date, default: Date.now },
      expiresAt: { type: Date },
      planName: {
        type: String,
        enum: ["Starter", "Pro", "Elite"],
        required: true,
      },
      totalInterviews: {
        type: Number,
        required: true,
      },
      usedInterviews: {
        type: Number,
        default: 0,
      },
    },
  ],

  freeInterview: {
    type: Number,
    default: 3,
  },

  improvements: [
    {
      analysis: { type: Object, required: true },
      dateCreated: { type: Date, default: Date.now },
    },
  ],

  interviewsPerDay: {
    type: Number,
    default: 5,
  },

  lastInterviewDate: {
    type: Date,
    default: null,
  },

  selectedPlan: {
    type: String,
    enum: ["Early", "Regular"],
    default: null,
  },

  lastPaymentAmount: {
    type: Number,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
