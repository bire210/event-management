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
  bookEvent: async ({ eventId }) => {
    try {
      let fetchEvent = await eventModel
        .findOne({ _id: eventId })
        .populate("creator");
      const booking = new bookingModel({
        user: "655c3a7008b2d892ca8e3bb4",
        event: fetchEvent,
      });

      const result = await booking.save();
      await result.populate("user");
      
      return tranformBookedEvent(result);
    } catch (error) {
      throw new Error(error.message);
    }
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
};

module.exports = { bookingResolver };
