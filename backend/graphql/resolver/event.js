const { dateToString } = require("../../helper/utils");
const { eventModel } = require("../../models/eventModel");
const { userModel } = require("../../models/userModel");

const tranformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
  };
};

const eventResolver = {
  events: async (args, req) => {
    try {
      // console.log("***********inside get all events");
      let allEvent = await eventModel.find().populate("creator");
      // console.log(allEvent, "**************************");
      allEvent = allEvent.map((event) => {
        return tranformEvent(event);
      });
      return allEvent;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getEvents: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated !");
      }
      let eventslist = await eventModel
        .find({ creator: { $ne: req.user.userId } })
        .populate("creator");
      // console.log("get all the event of a particular login user", eventslist);

      eventslist = eventslist.map((event) => {
        return tranformEvent(event);
      });
      return eventslist;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  eventById: async ({ id }, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated !");
      }
      const event = await eventModel.findById(id).populate("creator");
      return tranformEvent(event);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  createEvent: async ({ event }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated !");
    }
    const newEvent = new eventModel({
      title: event.title,
      desc: event.desc,
      price: event.price,
      date: new Date(event.date),
      creator: req.user.userId,
    });
    try {
      const result = await newEvent.save();
      await result.populate("creator");
      const user = await userModel.findById(req.user.userId);
      user.createdEvent.push(result.id);
      user.save();
      return tranformEvent(result);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateEventById: async ({ id, event }, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated !");
      }
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
  deleteEventById: async ({ id }, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated !");
      }
      const deletedEvent = await eventModel
        .findByIdAndDelete(id)
        .populate("creator");
      return tranformEvent(deletedEvent);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { eventResolver };
