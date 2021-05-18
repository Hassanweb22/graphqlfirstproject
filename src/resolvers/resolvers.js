const Parent = require("../models/Parent")
const Child = require("../models/Child")

const resolvers = {
    Query: {
        parents: () => Parent.find(),
        childs: () => Child.find(),
        SingleChild: async (parent, arg, ctx) => {
            const findChild = await Child.findOne({ name: String(arg.name).toLocaleLowerCase() });
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
    SingleChild: {
        parents: async (parent, arg, ctx) => {
            const findParent = await Parent.findOne({ fatherName: parent.fname })
            return findParent
        },
        siblings: async (parent, arg, ctx) => {
            let findSiblings = await Child.find({ fname: parent.fname })
            findSiblings = findSiblings.filter(child => child.name != parent.name)
            console.log("getResult", findSiblings)
            return findSiblings
        }
    },
    SingleParent: {
        childs: async (parent, arg, ctx) => {
            const findChilds = await Child.find({ fname: parent.fatherName })
            // console.log("SingleParent", findChilds)
            return findChilds
        }
    },
};


module.exports = resolvers