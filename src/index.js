const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require("./typeDefs")
const resolvers = require("./resolvers/resolvers")

const monogoURL = process.env.mongooseURL

const startSever = async () => {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    server.applyMiddleware({ app });
    app.use(cors)
    await mongoose.connect(monogoURL, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen({ port: "https://myfirstgraphqlproject.herokuapp.com/" }, () =>
        console.log('Now browse to http://localhost:4000' + server.graphqlPath)
    );

}

startSever()