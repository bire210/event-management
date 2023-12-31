const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase:true
  },
  name:{
    type:String,
    required:true,
    trim:true,
    lowerCase:true
  },
  password: {
    type: String,
    required: true,
    trim:true
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  createdEvent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
