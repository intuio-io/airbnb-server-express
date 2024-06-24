require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketManager = require("../src/utils/socketManager");
const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const reservationRoutes = require("./routes/ReservationRoutes");

const app = express();
const server = http.createServer(app);

// Define CORS options
const corsOptions = {
  origin: process.env.CORS_ORIGIN, // Allows requests only from the specified origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  credentials: true, // Allow sending of cookies and session tokens
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Initialize Socket.IO using the socket manager
socketManager.init(server);

// Apply CORS middleware with custom options
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/reservation", reservationRoutes);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Socket.io connection
socketManager.getIO().on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
