const Parent = require('./models/Parent')
const Child = require('./models/Child')
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
        resolvers,
        context: {
            Child,
            Parent
        },
        introspection: true,
        playground: true,
    });

    server.applyMiddleware({ app });
    await mongoose.connect(monogoURL, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen({ port: process.env.PORT || 4000 }, () =>
        console.log('Now browse to http://localhost:4000' + server.graphqlPath)
    );

}

startSever()