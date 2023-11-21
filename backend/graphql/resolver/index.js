const { eventModel } = require("../../models/eventModel");
const { userModel } = require("../../models/userModel");

const tranformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: new Date(event._doc.date).toISOString(),
  };
};

const rootValue = {
  events: async () => {
    try {
      let allEvent = await eventModel.find().populate("creator");
      allEvent = allEvent.map((event) => {
        return tranformEvent(event);
      });
      return allEvent;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getEvents: async ({ id }) => {
    try {
      let eventslist = await eventModel
        .find({ creator: id })
        .populate("creator");

      eventslist = eventslist.map((event) => {
        return tranformEvent(event);
      });
      return eventslist;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  eventById: async ({ id }) => {
    try {
      const event = await eventModel.findById(id).populate("creator");
      return tranformEvent(event);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  createEvent: async ({ event }) => {
    const newEvent = new eventModel({
      title: event.title,
      desc: event.desc,
      price: event.price,
      date: new Date(event.date),
      creator: "655c3a7008b2d892ca8e3bb4",
    });
    try {
      const result = await newEvent.save();
      await result.populate("creator");
      const user = await userModel.findById("655c3a7008b2d892ca8e3bb4");
      user.createdEvent.push(result);
      user.save();
      return tranformEvent(result);
    } catch (error) {
      throw new Error(error.message);
    }
  },
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
        throw new Error("User not Found");
      }
      const isPasswordValid = await bcrypt.compare(
        user.password,
        findUser.password
      );
      if (!isPasswordValid) {
        throw new Error("Wrong Password");
      }
      const token = generateToken(findUser._id);
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
  updateEventById: async ({ id, event }) => {
    try {
      const updatedEvent = await eventModel.findByIdAndUpdate(
        id,
        {
          title: event.title,
          desc: event.desc,
          price: event.price,
          date: new Date(event.date),
        },
        { new: true }
      );
      return tranformEvent(updatedEvent);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteEventById: async ({ id }) => {
    try {
      const deletedEvent = await eventModel.findByIdAndDelete(id);
      return tranformEvent(deletedEvent);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { rootValue };
