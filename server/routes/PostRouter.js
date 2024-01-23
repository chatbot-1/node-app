const express = require("express")
const router = express.Router()
const { Posts, Likes } = require('../models')
const { validate } = require('../middlewares/AuthMid')

router.get("/", validate, async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes] })

    const likedPost = await Likes.findAll({ where: { UserId: req.user.id } })
    res.json({ listOfPosts: listOfPosts, likedPost: likedPost })
})

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post)
})

// router.get("/byUserId/:id", async (req, res) => {
//     const id = req.params.id
//     const totalPost = await Posts.findAll({ where: {} })
//     res.json(totalPost)
// })

router.post("/", validate, async (req, res) => {
    const post = req.body
    post.userName = req.user.userName
    // post.UserId = req.user.id
    await Posts.create(post)
    res.json(post)
})

router.delete("/:postId", validate, async (req, res) => {
    const postId = req.params.postId
    await Posts.destroy({
        where: {
            id: postId
        }
    })
    return res.json("post deleted")
})



module.exports = router