const prisma = require("../../prisma");
const { getIO } = require("../utils/socketManager");

// validations
const { listingSchema } = require("../validationSchemas/listingSchema");

exports.addListing = async (req, res) => {
  const { error } = listingSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Create the listing in the database
    const result = await prisma.listing.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        imageSrc: req.body.imageSrc,
        category: req.body.category,
        roomCount: req.body.roomCount,
        bathroomCount: req.body.bathroomCount,
        guestCount: req.body.guestCount,
        locationValue: req.body.location,
        userId: req.body.userId,
        price: req.body.price,
      },
    });

    const io = getIO();
    // Emit an event when listings are fetched or updated
    io.emit("listingsUpdated");

    // Respond with the newly created listing
    res
      .status(201)
      .json({ success: "success", message: "Listing created successfuly!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = req?.query;
    const query = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount, // greater then or equal
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount, // greater then or equal
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount, // greater then or equal
      };
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    // Fetch all listings ordered by createdAt in descending order
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    let filteredListings = listings;

    if (locationValue) {
      // Filter listings based on locationValue using raw SQL
      filteredListings = listings.filter((listing) => {
        return listing.locationValue["value"] === locationValue;
      });
    }

    res.status(200).json(filteredListings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return res.status(404).json({ message: "No listing found" });
    }

    return res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFavoriteListings = async (req, res) => {
  try {
    const user = req.user;
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user.favoriteIds || [])],
        },
      },
    });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    const user = req.user;

    if (!listingId || typeof listingId !== "string") {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: user.id,
      },
    });

    return res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
