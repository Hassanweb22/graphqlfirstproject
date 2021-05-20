
const SingleChild = {
    parents: async (parent, arg, { Parent }) => {
        const findParent = await Parent.findOne({ fatherName: parent.fname })
        return findParent
    },
    siblings: async (parent, arg, { Child }) => {
        let findSiblings = await Child.find({ fname: parent.fname })
        findSiblings = findSiblings.filter(child => child.name != parent.name)
        console.log("getResult", findSiblings)
        return findSiblings
    }
}
module.exports = SingleChild