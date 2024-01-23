const express = require("express")
const router = express.Router()
const { Comments } = require('../models')
const { validate } = require('../middlewares/AuthMid')

router.get("/:PostId", async (req, res) => {
    const postId = req.params.PostId
    const comments = await Comments.findAll({ where: { PostId: postId } })
    res.json(comments)
})

router.post("/", validate, async (req, res) => {
    const comment = req.body
    const userName = req.user.userName
    comment.userName = userName
    await Comments.create(comment)
    res.json(comment)
})

router.delete("/:commentId", validate, async (req, res) => {
    const commentId = req.params.commentId
    await Comments.destroy({
        where: {
            id: commentId
        }
    })
    return res.json("comment deleted successfully")
})

module.exports = router