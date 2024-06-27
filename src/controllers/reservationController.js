const prisma = require("../../prisma");
const { getIO } = require("../utils/socketManager");

// utils
const { parseValue } = require("../utils/parseValue");

// validations
const { reservationSchema } = require("../validationSchemas/reservationSchema");

exports.addReservation = async (req, res) => {
  const { error } = reservationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = req.user;

  try {
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: parseValue(req.body.listingId),
      },
      data: {
        reservations: {
          create: {
            userId: user.id,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            totalPrice: req.body.totalPrice,
          },
        },
      },
    });

    const io = getIO();
    // Emit an event when listings are fetched or updated
    io.emit("reservationsUpdated");

    res.status(201).json({
      success: "message",
      message: "Reservation created successfully!",
      listingAndReservation: listingAndReservation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const query = {};

    if (req.query.listingId) {
      query.listingId = parseValue(req.query.listingId);
    }

    if (req.query.userId) {
      query.userId = parseValue(req.query.userId);
    }

    if (req.query.authorId) {
      query.listing = { userId: parseValue(req.query.authorId) };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    if (!reservationId) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: parseValue(reservationId),
        OR: [
          { userId: parseValue(req.user.id) },
          { listing: { userId: parseValue(req.user.id) } },
        ],
      },
    });

    const io = getIO();
    // Emit an event when listings are fetched or updated
    io.emit("reservationsDeleted");

    return res
      .status(201)
      .json({ message: "cancelled successfully", reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
