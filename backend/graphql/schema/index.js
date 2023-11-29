const { buildSchema } = require("graphql");

const schema = buildSchema(`
type Event {
  _id:ID!
  title:String!
  desc:String!
  price:Float!
  date:String!
  creator:User!
}
type User {
  _id:ID!
  email:String!
  name:String!
  password:String
  token:String
  isAdmin:Boolean!
  createdEvent:[Event]
}

type Booking{
  _id:ID!
  event:Event!
  user:User!
  createdAt:String!
  updatedAt:String!
}
input UserInput{
   email:String!
  password:String!
  name:String
}

input EventInput {
  title:String!
  desc:String!
  price:Float!
  date:String!
}
  type Query {
    events: [Event!]!
    bookings:[Booking!]!
    eventById(id: ID!): Event
    login(user:UserInput):User
    getEvents:[Event]
    getUserById(id:ID!):User!
  }

  type Mutation {
    createEvent(event:EventInput): Event
    updateEventById(id: ID!, event: EventInput): Event
    deleteEventById(id: ID!): Event
    createUser(user:UserInput):User
    bookEvent(eventId:ID!):Booking!
    cancelBooking(bookingId:ID!):Event!
  }
`);

module.exports = { schema };
