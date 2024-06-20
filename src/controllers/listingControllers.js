const prisma = require("../../prisma");

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

    // Respond with the newly created listing
    res
      .status(201)
      .json({ success: "success", message: "Listing created successfuly!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    // Fetch all listings ordered by createdAt in descending order
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!listings) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listings);
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
