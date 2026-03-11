const jwt = require("jsonwebtoken")

const authMiddleware = (req) => {

    const authHeader = req.headers.authorization || "";

    if (!authHeader) return null;

    const token = authHeader.replace("Bearer ", "");
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        throw new Error("invalid or expired token")
    }
}

module.exports = authMiddleware;