const jwt = require("jsonwebtoken");
const prisma = require("../../prisma");

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decode.userId },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // Filter out the token that matches the one in the Authorization header
    const matchingToken = user.tokens.find((t) => t.token === token);

    if (!matchingToken) {
      // If the token doesn't match any in the user's tokens array, it's considered invalid
      return res.status(401).json({ message: "Token expired or invalid." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
