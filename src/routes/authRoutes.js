const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/signin", authController.signin);

// Apply middleware to all subsequent routes
router.use(authenticateToken);

router.post("/signOut", authController.signOut);
router.get("/user", authController.getUser);
router.post("/addFavorite/:favoriteId", authController.addFavorite);
router.delete("/removeFavorite/:favoriteId", authController.removeFavorite);

module.exports = router;
