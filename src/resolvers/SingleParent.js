const SingleParent = {
    childs: async (parent, arg, { Child }) => {
        console.log("SingleParent", parent)
        const findChilds = await Child.find({ fname: parent.fatherName })
        return findChilds
    }
}

module.exports = SingleParent