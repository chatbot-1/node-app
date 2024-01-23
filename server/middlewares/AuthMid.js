const { verify } = require('jsonwebtoken')

const validate = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if (!accessToken) return res.json({ error: "User not logged in!!!" })
    try {
        const validToken = verify(accessToken, "important data");
        req.user = validToken
        if (validToken) {
            return next()
        }
    } catch (err) {
        return res.json({ error: err })
    }
}

module.exports = { validate }