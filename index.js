const Parent = require('./src/models/Parent')
const Child = require('./src/models/Child')
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require("./src/typeDefs")
const resolvers = require("./src/resolvers/resolvers")

const monogoURL = process.env.mongooseURL

const startSever = async () => {
    const app = express();

    app.use(cors())
    app.use(express.static(path.resolve(path.join(__dirname, 'client/build'))));

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

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build'));
    });

    server.applyMiddleware({ app });
    await mongoose.connect(monogoURL, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen({ port: process.env.PORT || 4000 }, () =>
        console.log('Now browse to http://localhost:4000' + server.graphqlPath)
    );

}

startSever()