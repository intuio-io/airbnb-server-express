const prisma = require("../../prisma");

// validations
const { reservationSchema } = require("../validationSchemas/reservationSchema");

exports.addReservation = async (req, res) => {
  const { error } = reservationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = req.user;

  try {
    const listingAndReservation = await prisma.listing.update({
      where: {
        id: req.body.listingId,
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
      query.listingId = req.query.listingId;
    }

    if (req.query.userId) {
      query.userId = req.query.userId;
    }

    if (req.query.authorId) {
      query.listing = { userId: req.query.authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
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

    if (!reservationId || typeof reservationId !== "string") {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [{ userId: req.user.id }, { listing: { userId: req.user.id } }],
      },
    });

    return res
      .status(201)
      .json({ message: "cancelled successfully", reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
