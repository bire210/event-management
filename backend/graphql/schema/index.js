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
  password:String
  token:String
  createdEvent:[Event]
}
input UserInput{
   email:String!
  password:String!
}

input EventInput {
  title:String!
  desc:String!
  price:Float!
  date:String!
}
  type Query {
    events: [Event!]!
    eventById(id: ID!): Event
    login(user:UserInput):User
    getEvents(id:ID!):[Event]
  }

  type Mutation {
    createEvent(event:EventInput): Event
    updateEventById(id: ID!, event: EventInput): Event
    deleteEventById(id: ID!): Event
    createUser(user:UserInput):User
    
  }
`);

module.exports={schema}