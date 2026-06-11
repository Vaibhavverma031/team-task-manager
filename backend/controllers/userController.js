const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id name email role");

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getUsers,
};