//PostController
const { Post } = require("../model");

module.exports = {
    create: async (req, res, next) => {
        try {
            const { post } = req.body

            //Create new post
            const newPost = await new Post(post).save();

            //Send the response
            res.send({
                data: {
                    post: newPost
                },
                status: {
                    code: 200,
                    message: "Operation handle correctly",
                    succeeded: true
                }
            })
        } catch(err) {
            //Send the error
            next(err)
        }
    },
    find: async (req, res, next) => {
        try {
            const { search="", searchBy="message", order='desc', orderBy='createdAt' } = req.query;

            //Find, sort and paginate the Post
            const thePost = await Post.paginate({ [searchBy]: { $regex : `${search}` } }, { sort: { [orderBy]: order } });

            //Send the response
            res.send({
                data: {
                    post: thePost.docs,
                    total: thePost.total
                },
                status: {
                    code: 200,
                    message: "Operation handle correctly",
                    succeeded: true
                }
            })
        } catch(err){
            //Send the error
            next(err)
        }
    },
    findOne: async (req, res, next) => {
        try {
            const { id } = req.params;

            //Find a post by Id
            const thePost = await Post.findById(id);

            //Send the response
            res.send({
                data: {
                    post: thePost
                },
                status: {
                    code: 200,
                    message: "Operation handle correctly",
                    succeeded: true
                }
            })
        } catch(err){
            //Send the error
            next(err)
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { post } = req.body;

            //Find a post by Id and update
            const thePost = await Post.findByIdAndUpdate(id, { ...post });

            //Send the response
            res.send({
                data: {
                    post: thePost
                },
                status: {
                    code: 200,
                    message: "Operation handle correctly",
                    succeeded: true
                }
            })
        } catch(err){
            //Send the error
            next(err)
        }
    },
    destroy: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { post } = req.body;

            //Find a post by id and remove it
            const thePost = await Post.findByIdAndRemove(id);

            //Send the response
            res.send({
                status: {
                    code: 200,
                    message: "Operation handle correctly",
                    succeeded: true
                }
            })
        } catch(err){
            //Send the error
            next(err)
        }
    }
}