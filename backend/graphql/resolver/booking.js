const { dateToString } = require("../../helper/utils");
const { bookingModel } = require("../../models/booking");
const { eventModel } = require("../../models/eventModel");

const tranformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
  };
};

const tranformBookedEvent = (result) => {
  return {
    ...result._doc,
    _id: result.id,
    event: { ...tranformEvent(result._doc.event) },
    createdAt: dateToString(result._doc.createdAt),
    updatedAt: dateToString(result._doc.updatedAt),
  };
};

const bookingResolver = {
  bookings: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated !");
      }
      let bookings = await bookingModel
        .find({ user: req.user.userId })
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
      bookings = bookings.filter((booking) => {
        return booking.user && booking.event && tranformBookedEvent(booking);
      });
      // console.log("booking*************", bookings);
      return bookings;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  bookEvent: async ({ eventId }, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated !");
      }
      let fetchEvent = await eventModel
        .findOne({ _id: eventId })
        .populate("creator");
      const booking = new bookingModel({
        user: req.user.userId,
        event: fetchEvent,
      });
      // console.log("booked the event");

      const result = await booking.save();
      await result.populate("user");
      // console.log("res", result);

      return tranformBookedEvent(result);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  cancelBooking: async ({ bookingId }, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated !");
      }
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
};

module.exports = { bookingResolver };
