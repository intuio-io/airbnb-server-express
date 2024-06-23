const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingControllers");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Apply middleware to all subsequent routes
router.get("/getListings", listingController.getListings);
router.get(
  "/getFavorites",
  authenticateToken,
  listingController.getFavoriteListings
);
router.get("/:listingId", listingController.getListingById);

router.use(authenticateToken);

router.post("/addListing", listingController.addListing);
router.delete("/delete/:listingId", listingController.deleteListing);

module.exports = router;
