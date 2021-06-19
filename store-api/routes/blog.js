const express = require("express")
const Blog = require("../models/blog")
const { BadRequestError, NotFoundError } = require("../utils/errors")
const router = express.Router()

//posting new to db
router.post("/", async (req, res, next) => {
    try {
        //handle creating a new post
        const newPost = req.body.post
        if (!newPost) {
            return next(new BadRequestError("no post found in request"))
        }
        const post = await Blog.createPost(newPost)
        res.status(201).json({ post })
    } catch (err) {
        next(err)
    }
})

//get from db
router.get("/", async (req, res, next) => {
    try {
        const products = await Blog.listPosts()
        // res.status(200).json({ posts })
        res.status(200).json({ products })
    } catch (err){
        next(err)
    }
})

//get from db by ID
router.get("/:productID", async (req, res, next) => {
    try {
        const blogSlug = req.params.productID
        const products = await Blog.fetchPostBySlug(blogSlug)
        if (!products) {
            throw new NotFoundError("product not found")
        }
        res.status(200).json({ products })
    } catch (err){
        next(err)
    }
})

module.exports = router