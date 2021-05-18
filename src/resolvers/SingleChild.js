
const SingleChild = {
    category: (parent, args, { Parent }) => {
        console.log("Parent", Parent)
        // return categories.find(category => {
        //     return category.id === parent.category
        // })
        return Parent
    }
}

module.exports = SingleChild