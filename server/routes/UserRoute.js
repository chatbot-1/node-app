const express = require('express')
const router = express.Router()
const { User } = require('../models')
const bcrypt = require('bcrypt')
const { validate } = require('../middlewares/AuthMid')
const { sign } = require('jsonwebtoken')


router.post("/", async (req, res) => {
    const { userName, password } = req.body
    const user = await User.findOne({ where: { userName: userName } })

    if (user) {
        res.json({error: "username already exists"})
    } else {
        bcrypt.hash(password, 10).then((hash) => {
            User.create({
                userName: userName,
                password: hash,
            })
            res.json("successfully registered!!")
        })
    }
})

router.post('/login', async (req, res) => {
    const { userName, password } = req.body
    const user = await User.findOne({ where: { userName: userName } })
    if (user) {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                return res.json({ error: "password is incorrect" })
            }
            const accessToken = sign({ userName: user.userName, id: user.id },
                "important data"
            )
            res.json({ token: accessToken, userName: userName, id: user.id })
        })
    } else {
        return res.json({ error: "user does not exist" })
    }
})

router.get('/auth', validate, (req, res) => {
    res.json(req.user)
})

router.get("/user-info/:id", async(req, res) => {
    const id = req.params.id
    const userInfo = await User.findByPk(id, {attributes: {exclude: ['password']}})
    res.json(userInfo)
})

module.exports = router