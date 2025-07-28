const moment = require('moment');
const User = require("../models/user"); // adjust path as needed

exports.checkAndUpdateInterviewLimit = async (userId) => {
  const user = await User.findById(userId);

  const today = moment().startOf('day');
  const lastDate = user.lastInterviewDate ? moment(user.lastInterviewDate).startOf('day') : null;

  // Reset if it's a new day
  if (!lastDate || !lastDate.isSame(today)) {
    user.interviewsPerDay = 5;
    user.lastInterviewDate = new Date();
  }

  if (user.interviewsPerDay > 0) {
    user.interviewsPerDay -= 1;
    await user.save();
    return { allowed: true, remaining: user.interviewsPerDay };
  } else {
    return { allowed: false, message: "You’ve reached today’s interview limit." };
  }
};
