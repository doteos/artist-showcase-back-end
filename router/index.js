//index.js
const { PostController } = require("../controller");

module.exports = (app) => {
    //Create a Post
    app.post("/posts/create", PostController.create)
    //Find many Post
    app.get("/posts", PostController.find)
    //Find a Post
    app.get("/posts/:id", PostController.findOne)
    //Update a Post by Id
    app.put("/posts/:id/update", PostController.update)
    //Delete a post by Id
    app.delete("/posts/:id/delete", PostController.destroy)
}