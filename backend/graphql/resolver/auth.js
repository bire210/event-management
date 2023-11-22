const { generateToken } = require("../../config/connetDb");
const { userModel } = require("../../models/userModel");
const bcrypt = require("bcrypt");
const authResolver = {
  createUser: async ({ user }) => {
    try {
      const findUser = await userModel.findOne({ email: user.email });
      if (findUser) {
        throw new Error("This email is already exist ! ");
      }
      const newUser = new userModel({
        email: user.email,
        password: user.password,
        createdEvent: [],
      });

      const result = await newUser.save();
      return { ...result._doc, _id: result.id, password: null };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  login: async ({ user }) => {
    try {
      const findUser = await userModel.findOne({ email: user.email });
      if (!findUser) {
        throw new Error("User does not exist");
      }
      const isPasswordValid = await bcrypt.compare(
        user.password,
        findUser.password
      );
      if (!isPasswordValid) {
        throw new Error(" Password is Wrong");
      }
      const token = generateToken(findUser._id, findUser.email);
      return {
        _id: findUser._id,
        email: findUser.email,
        token,
        password: null,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { authResolver };
