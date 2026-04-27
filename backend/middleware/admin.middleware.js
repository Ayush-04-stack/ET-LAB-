function adminMiddleware(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(403).send({ "message": "Not authorized as admin" })
    }
}

export default adminMiddleware
