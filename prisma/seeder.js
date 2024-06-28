const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      name: "Shridatt",
      email: "shridatt@intuio.io",
      hashedPassword:
        "$2a$10$ED4j.DIC87Un3Sd4MsnI9uwKQufnvw.swRXZQOTzR8AM2CLOpEu8K",
      favoriteIds: [],
      tokens: [],
    },
  });

  // Create 50 listings for the user
  const listingsData = [
    {
      title: "Grand House",
      description: "The best life can offer!",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719484310/uvzmejw4syaag7rdvc5h.jpg",
      category: "Modern",
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 4,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [15.34748951493423, 74.02587890625001],
        region: "Goa",
      },
      userId: user.id,
      price: 100,
    },
    {
      title: "Modern City Apartment",
      description:
        "A sleek and stylish apartment located in the heart of the city. Close to popular attractions, restaurants, and public transport.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719484415/yrtyupjtdvgz8k1gna0l.jpg",
      category: "Modern",
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 1,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [15.67591272443864, 73.83911132812501],
        region: "Goa",
      },
      userId: user.id,
      price: 200,
    },
    {
      title: "Beachfront Villa",
      description:
        "A stunning villa with direct access to the beach. Enjoy breathtaking ocean views, a private pool, and spacious living areas.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719484615/moa3dvkxxcpjzviy792k.jpg",
      category: "Beach",
      roomCount: 5,
      bathroomCount: 3,
      guestCount: 3,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [15.63269078044717, 73.89404296875001],
        region: "Goa",
      },
      userId: user.id,
      price: 150,
    },
    {
      title: "Lake House",
      description:
        "A serene lake house with private dock access. Enjoy water activities, beautiful sunsets, and a tranquil environment.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719484772/ouyx3nnlcbviphpdz1cn.jpg",
      category: "Beach",
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 2,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [15.26154808955137, 74.13574218750001],
        region: "Goa",
      },
      userId: user.id,
      price: 60,
    },
    {
      title: "Traditional Country Manor",
      description:
        "An elegant manor house set in extensive grounds with lush gardens and a private lake. Perfect for large groups or family gatherings.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719484921/zczrezjow3dvpp2m3p5z.jpg",
      category: "Countryside",
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 2,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [16.04468875545257, 73.95996093750001],
        region: "Maharashtra",
      },
      userId: user.id,
      price: 120,
    },
    {
      title: "Rustic Farmhouse Retreat",
      description:
        "A charming farmhouse surrounded by rolling hills and farmland. Perfect for a quiet, relaxing getaway with a large garden and cozy interiors.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719487179/bxrhgd3hylt4l9ksocld.jpg",
      category: "Countryside",
      roomCount: 4,
      bathroomCount: 2,
      guestCount: 2,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [16.11877100685616, 73.95996093750001],
        region: "Maharashtra",
      },
      userId: user.id,
      price: 110,
    },
    {
      title: "Secluded Country Cottage",
      description:
        "A quaint cottage tucked away in the countryside, offering peace and tranquility. Features a wood-burning stove and beautiful garden views.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719487271/qvjmcx3hpa1bvxu7ygdq.jpg",
      category: "Countryside",
      roomCount: 2,
      bathroomCount: 1,
      guestCount: 2,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [15.25117604719611, 74.19067382812501],
        region: "Goa",
      },
      userId: user.id,
      price: 70,
    },
    {
      title: "Spacious Rural Barn",
      description:
        "A converted barn with modern amenities, located in a picturesque rural setting. Ideal for families looking for a peaceful retreat.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719487702/kizhq0ivvf7bdwihlsge.jpg",
      category: "Countryside",
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 2,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [18.14595403246637, 74.44335937500001],
        region: "Maharashtra",
      },
      userId: user.id,
      price: 120,
    },
    {
      title: "Cozy Woodland Cabin",
      description:
        "A small cabin nestled in the woods, providing a perfect escape from city life. Enjoy hiking, birdwatching, and the sounds of nature.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719487790/cxvqkbrtdm6ch1bwfmuz.jpg",
      category: "Countryside",
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 2,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [15.09166386755247, 74.39941406250001],
        region: "Karnataka",
      },
      userId: user.id,
      price: 149,
    },
    {
      title: "Eco-Friendly Country Home",
      description:
        "A sustainable, modern home with solar panels, a green roof, and energy-efficient appliances. Set in a serene rural environment.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719487904/w9unhnguvytm71tkydgh.jpg",
      category: "Modern",
      roomCount: 5,
      bathroomCount: 3,
      guestCount: 4,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [18.7287376415798, 74.70703125000001],
        region: "Maharashtra",
      },
      userId: user.id,
      price: 220,
    },
    {
      title: "Smart Rural Home",
      description:
        "A cutting-edge countryside home equipped with smart home technology, including automated lighting, heating, and security systems.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719487999/rnpvj6x7hza4avsfnpht.jpg",
      category: "Modern",
      roomCount: 6,
      bathroomCount: 3,
      guestCount: 4,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [20.2211172497324, 75.14648437500001],
        region: "Maharashtra",
      },
      userId: user.id,
      price: 230,
    },
    {
      title: "Modern Smart Home",
      description:
        "A cutting-edge countryside home equipped with smart home technology, including automated lighting, heating, and security systems.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719488076/d9vihiemuezqudwczwd6.jpg",
      category: "Modern",
      roomCount: 5,
      bathroomCount: 3,
      guestCount: 6,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [18.89523077150266, 79.18945312500001],
        region: "Telangana",
      },
      userId: user.id,
      price: 280,
    },
    {
      title: "Minimalist Country House",
      description:
        "A modern, minimalist home with clean lines and large glass doors that open to a picturesque countryside view. Perfect for a serene getaway.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719488490/rnfwf2up3bosf0r5qpdj.jpg",
      category: "Countryside",
      roomCount: 6,
      bathroomCount: 4,
      guestCount: 4,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [19.31215893265468, 77.69531250000001],
        region: "Maharashtra",
      },
      userId: user.id,
      price: 220,
    },
    {
      title: "Stylish Country Loft",
      description:
        "A loft-style home with high ceilings, exposed beams, and modern decor. Offers a unique blend of countryside charm and urban style.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719488592/xv1zoop1zvoezumvcbq7.jpg",
      category: "Countryside",
      roomCount: 5,
      bathroomCount: 3,
      guestCount: 6,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [19.72595003584697, 81.03515625000001],
        region: "Chhattisgarh",
      },
      userId: user.id,
      price: 190,
    },
    {
      title: "Luxury Poolside Villa",
      description:
        "A stunning villa with a large private pool, perfect for relaxing and entertaining. Features spacious living areas and modern amenities.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719488930/j3uxgxbcxr0rf36ye51h.jpg",
      category: "Pools",
      roomCount: 6,
      bathroomCount: 3,
      guestCount: 5,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [18.06113574068264, 80.15625000000001],
        region: "Telangana",
      },
      userId: user.id,
      price: 200,
    },
    {
      title: "Luxury Poolside Villa",
      description:
        "A stunning villa with a large private pool, perfect for relaxing and entertaining. Features spacious living areas and modern amenities.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719491675/lhivnkj1gmdm0hsyxwjt.jpg",
      category: "Pools",
      roomCount: 6,
      bathroomCount: 3,
      guestCount: 4,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [23.88819918553915, 75.67382812500001],
        region: "Rajasthan",
      },
      userId: user.id,
      price: 190,
    },
    {
      title: "Elegant Poolside Manor",
      description:
        "An elegant manor house with a grand pool area, ideal for large gatherings and special occasions. Features lush gardens and luxurious interiors.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719492041/tjoq81nzjpr0npm1dnch.jpg",
      category: "Pools",
      roomCount: 8,
      bathroomCount: 4,
      guestCount: 7,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [19.47664584221033, 81.29882812500001],
        region: "Chhattisgarh",
      },
      userId: user.id,
      price: 320,
    },
    {
      title: "Family Poolside Home",
      description:
        "A spacious family home with a large pool and outdoor entertainment area. Great for family vacations and summer fun.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719492156/m8u5hjvv9m1vajxtylmh.jpg",
      category: "Pools",
      roomCount: 5,
      bathroomCount: 2,
      guestCount: 4,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [21.86369594411445, 75.67382812500001],
        region: "Madhya Pradesh",
      },
      userId: user.id,
      price: 240,
    },
    {
      title: "Scenic Poolside Cottage",
      description:
        "A charming cottage with a beautiful pool and scenic views. Ideal for a relaxing holiday in a tranquil setting.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719492270/kqvdqejdn68j3e2nnnm7.jpg",
      category: "Pools",
      roomCount: 6,
      bathroomCount: 3,
      guestCount: 4,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [20.13857134605767, 77.87109375],
        region: "Maharashtra",
      },
      userId: user.id,
      price: 170,
    },
    {
      title: "Poolside Beach House",
      description:
        "A stunning beach house with a pool and ocean views. Perfect for enjoying both the beach and the pool in a luxurious setting.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719492635/mxlvvweir85moxijnnii.jpg",
      category: "Pools",
      roomCount: 5,
      bathroomCount: 3,
      guestCount: 3,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [24.7696670689634, 76.90429687500001],
        region: "Madhya Pradesh",
      },
      userId: user.id,
      price: 230,
    },
    {
      title: "Oceanfront Island Villa",
      description:
        "A luxurious villa with breathtaking ocean views, private beach access, and an infinity pool. Perfect for a tropical getaway.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719492767/bepirhvp3tzl0hxxopry.jpg",
      category: "Islands",
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 4,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [17.3926819635996, 79.62890625000001],
        region: "Telangana",
      },
      userId: user.id,
      price: 170,
    },
    {
      title: "Tropical Beach House",
      description:
        "A bright and airy beach house with open-plan living spaces and stunning sea views. Ideal for a relaxing island vacation.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719492868/xoxhkna3zfwyolhd593t.jpg",
      category: "Islands",
      roomCount: 9,
      bathroomCount: 6,
      guestCount: 8,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [22.35151896355199, 73.12500000000001],
        region: "Gujarat",
      },
      userId: user.id,
      price: 420,
    },
    {
      title: "Beachfront Cabana",
      description:
        "A rustic cabana with direct beach access and stunning sunset views. Ideal for a romantic getaway or a solo retreat.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719492980/owqb4n01btvolacxhobz.jpg",
      category: "Islands",
      roomCount: 2,
      bathroomCount: 1,
      guestCount: 3,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [20.63313673581173, 74.70703125000001],
        region: "Maharashtra",
      },
      userId: user.id,
      price: 110,
    },
    {
      title: "Cliffside Island Home",
      description:
        "A spectacular home perched on a cliff, offering panoramic ocean views and luxurious living spaces. Perfect for a lavish island stay.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719493145/lqboeepgylyq3yammisy.jpg",
      category: "Islands",
      roomCount: 6,
      bathroomCount: 3,
      guestCount: 5,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [20.38688454208346, 80.33203125],
        region: "Maharashtra",
      },
      userId: user.id,
      price: 180,
    },
    {
      title: "Eco-Friendly Island House",
      description:
        "A sustainable house designed with eco-friendly materials and practices. Enjoy the beauty of the island while minimizing your footprint.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719493263/wwb01si9kekfothk5li8.jpg",
      category: "Islands",
      roomCount: 5,
      bathroomCount: 3,
      guestCount: 4,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [21.37209617990614, 81.03515625000001],
        region: "Chhattisgarh",
      },
      userId: user.id,
      price: 220,
    },
    {
      title: "Charming Village House",
      description:
        "A lovely house located in a small countryside village. Experience local culture and scenic landscapes with all the comforts of home.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719493397/ujl1pgcw1uontborwgze.jpg",
      category: "Windmil",
      roomCount: 6,
      bathroomCount: 4,
      guestCount: 5,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [23.40483884947988, 79.89257812500001],
        region: "Madhya Pradesh",
      },
      userId: user.id,
      price: 210,
    },
    {
      title: "Scenic Hilltop Cottage",
      description:
        "A cozy cottage situated on a hilltop, offering panoramic views of the countryside. Perfect for a romantic getaway or solo retreat.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719493601/ty3cxpy86hljritloeex.jpg",
      category: "Windmil",
      roomCount: 4,
      bathroomCount: 3,
      guestCount: 5,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [23.40483884947988, 78.486328125],
        region: "Madhya Pradesh",
      },
      userId: user.id,
      price: 130,
    },
    {
      title: "Historic Country Estate",
      description:
        "A grand estate with historical charm, set in the countryside. Features expansive gardens, antique furnishings, and modern amenities.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719493712/y87fp8w09cdq1fwxx8u1.jpg",
      category: "Windmil",
      roomCount: 2,
      bathroomCount: 1,
      guestCount: 3,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [26.04066774894353, 75.84960937500001],
        region: "Rajasthan",
      },
      userId: user.id,
      price: 150,
    },
    {
      title: "Elegant City Penthouse",
      description:
        "A top-floor penthouse with breathtaking city skyline views, high-end finishes, and a private rooftop garden. Ideal for urban sophistication.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719493875/adcc2usd7mcqkfmlebst.jpg",
      category: "Lux",
      roomCount: 7,
      bathroomCount: 4,
      guestCount: 5,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [24.2876644397806, 81.21093750000001],
        region: "Madhya Pradesh",
      },
      userId: user.id,
      price: 329,
    },
    {
      title: "Opulent Mansion",
      description:
        "A grand mansion featuring sprawling gardens, a private theater, and a heated indoor pool. Experience ultimate luxury and comfort.",
      imageSrc:
        "https://res.cloudinary.com/dxq0m4l9x/image/upload/v1719494031/gygth8a3lb7awpqntk80.jpg",
      category: "Lux",
      roomCount: 9,
      bathroomCount: 5,
      guestCount: 11,
      locationValue: {
        value: "IN",
        label: "India",
        latlng: [20.7152667845802, 81.91406250000001],
        region: "Chhattisgarh",
      },
      userId: user.id,
      price: 520,
    },
  ];

  await prisma.listing.createMany({
    data: listingsData,
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
