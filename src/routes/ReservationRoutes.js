const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.use(authenticateToken);

router.post("/addReservation", reservationController.addReservation);
router.get("/getReservations", reservationController.getReservations);
router.delete(
  "/delete/:reservationId",
  reservationController.deleteReservation
);

module.exports = router;
