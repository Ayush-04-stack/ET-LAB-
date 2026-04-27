import jwt from "jsonwebtoken"

function authMiddleware(req, res, next) {
    let token = req.headers.authorization

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).send({ "message": "Not authorized, no token" })
    }

    try {
        token = token.split(" ")[1]
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({ "message": "Not authorized, token failed" })
    }
}

export default authMiddleware
