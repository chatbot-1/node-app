const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = require('./models')

const postRouter = require("./routes/PostRouter")
app.use("/posts", postRouter)

const commentRouter = require("./routes/CommentRoute")
app.use("/comments", commentRouter)

const userRouter = require("./routes/UserRoute")
app.use("/user", userRouter)

const likeRouter = require("./routes/LikeRoute")
app.use("/like", likeRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server is running")
    })
})



