
// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.header("Authorization"); // e.g., "Bearer eyJ..."
  if (!authHeader) {
    return res.status(401).json({ error: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1]; // extract actual token
  if (!token) {
    return res.status(401).json({ error: "Malformed token" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // contains { id, username }
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = auth;
