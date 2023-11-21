const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const bcrypt = require("bcrypt");

const { connection} = require("./config/connetDb");

const { schema } = require("./graphql/schema");
const { rootValue } = require("./graphql/resolver");
const app = express();
app.use(express.json());


app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  })
);

const PORT = 8000;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("data base is connected");
  } catch (error) {
    console.log("Data base is not connected");
    return process.exit(0);
  }
  console.log(`server is running over ${PORT}`);
});
