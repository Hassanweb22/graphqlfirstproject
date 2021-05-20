const Parent = require("../models/Parent")
const Child = require("../models/Child")
const SingleChild = require("./SingleChild")
// const SingleParent = require("./SingleParent");


const resolvers = {
    Query: {
        parents: () => Parent.find(),
        childs: () => Child.find(),
        SingleChild: async (parent, arg, ctx) => {
            const findChild = await Child.findOne({ name: arg.name });
            return findChild
        },
        SingleParent: async (parent, arg, ctx) => {
            const findParent = await Parent.findOne({ fatherName: arg.fatherName });
            return findParent
        }
    },
    Mutation: {
        createParent: async (_, { fatherName, occupation }) => {
            const parent = new Parent({ fatherName, occupation });
            await parent.save()
            console.log(parent)
            return parent
        },
        createChild: async (_, { name, fname, age }) => {
            const child = new Child({ name, fname, age });
            await child.save()
            return child
        },
        updateChild: async (_, { name, fname, age }) => {
            const update = await Child.updateOne({ name }, { fname })
            console.log(update.nModified)
            return {
                name,
                fname
            }
        },
        deleteChild: async (_, { name }) => {
            const find = await Child.findOneAndRemove({ name })
            return find
        }
    },
    SingleParent: {
        childs: async (parent, arg, { Child }) => {
            console.log("SingleParent", parent)
            const findChilds = await Child.find({ fname: parent.fatherName })
            return findChilds
        }
    },
    SingleChild

};


module.exports = resolvers