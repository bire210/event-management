const { dateToString } = require("../../helper/utils");
const { bookingModel } = require("../../models/booking");
const { eventModel } = require("../../models/eventModel");
const { userModel } = require("../../models/userModel");

const tranformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
  };
};

const tranformBookedEvent = (result) => {
  return {
    // ...booking._doc,
    // _id: booking.id,
    // createdAt: dateToString(booking._doc.createdAt),
    // updatedAt: dateToString(booking._doc.updatedAt),
    ...result._doc,
    _id: result.id,
    event: { ...tranformEvent(result._doc.event) },
    createdAt: dateToString(result._doc.createdAt),
    updatedAt: dateToString(result._doc.updatedAt),
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

  bookings: async () => {
    try {
      let bookings = await bookingModel
        .find()
        .populate({
          path: "user",
          populate: {
            path: "createdEvent",
            populate: {
              path: "creator",
              select: "email password",
            },
          },
        })
        .populate({
          path: "event",
          populate: {
            path: "creator",
            select: "email",
          },
        });
      bookings = bookings.map((booking) => {
        return tranformBookedEvent(booking);
      });
      return bookings;
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

  bookEvent: async ({ eventId }) => {
    try {
      let fetchEvent = await eventModel.findOne({ _id: eventId });
      const booking = new bookingModel({
        user: "655c3a7008b2d892ca8e3bb4",
        event: fetchEvent,
      });

      const result = await booking.save();
      return tranformBookedEvent(result);
    } catch (error) {}
  },

  cancelBooking: async ({ bookingId }) => {
    try {
      const booking = await bookingModel
        .findById({ _id: bookingId })
        .populate("user")
        .populate({
          path: "event",
          populate: {
            path: "creator",
          },
        });
      if (!booking) {
        throw new Error("Event not Found");
      }

      await bookingModel.findByIdAndDelete(bookingId);
      return tranformEvent(booking.event);
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
