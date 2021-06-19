const { BadRequestError } = require("../utils/errors")
const { storage } = require("../data/storage")

class Blog {
    static async createPost(post) {
        //create post
        if (!post.slug) {
            throw new BadRequestError("Post must have a unique slug")
        }
        const existingPost = await Blog.fetchPostBySlug(post.slug)
        if (existingPost) {
            throw new BadRequestError("Post must have a unique slug")
        }
        const postedAt = new Date().toISOString()
        const newPost = { ...post, postedAt }

        storage.get("posts").push(newPost).write()

        return newPost
    }

    static async listPosts() {
        //list all posts in db
        const posts = storage.get("products").orderBy("postedAt", "desc")
        // const posts = storage.get("posts").orderBy("postedAt", "desc")

        return posts
    }

    static async fetchPostBySlug(productID) {
        //fetch post by its slug
        const post = storage.get("products").find({ id:Number(productID) }).value()

        return post
    }
}

module.exports = Blog