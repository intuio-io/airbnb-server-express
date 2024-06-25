/**
 * Author: Intuio.io
 * Date: 2024
 * Description: Brief description of the component
 *
 * Copyright (c) 2024 Your Company Name
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../prisma");

// validations
const { registerSchema } = require("../validationSchemas/authSchema");
const { signInSchema } = require("../validationSchemas/authSchema");

exports.register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        hashedPassword: hashedPassword,
      },
    });
    const token = jwt.sign({ userId: result.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Store the token in the db
    await prisma.user.update({
      where: { id: result.id },
      data: {
        tokens: [{ token, signedAt: Date.now().toString() }],
      },
    });

    res.status(201).json({ ...result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  const { error } = signInSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.hashedPassword
    );

    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password." });

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    let oldTokens = user.tokens || [];

    if (oldTokens.length) {
      oldTokens = oldTokens.filter((t) => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
        if (timeDiff < 86400) {
          return t;
        }
      });
    }

    // Construct the tokens array with the new token object
    const updatedTokens = [
      ...oldTokens,
      { token, signedAt: Date.now().toString() },
    ];

    // Update the user with the new tokens array
    await prisma.user.update({
      where: { id: user.id },
      data: {
        tokens: updatedTokens,
      },
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization failed!" });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter((t) => t.token !== token);

    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        tokens: newTokens,
      },
    });

    res.json({ success: true, message: "Sign out successfully!" });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (!req?.user) {
      return res.status(403).json({ message: "User not found" });
    }
    // Clone the req.user object to avoid mutating the original
    const sanitizedUser = { ...req.user };

    // Delete the tokens field from the sanitized user object
    delete sanitizedUser.tokens;

    // Send the sanitized user object in the response
    res.json(sanitizedUser);
  } catch (error) {
    res.status(401).json({ message: "Failed to load user" });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const user = req.user;

    if (!favoriteId || typeof favoriteId !== "string") {
      return res.status(404).json({ message: "Invalid listing Id" });
    }

    let favoriteIds = [...(user.favoriteIds || [])];

    favoriteIds.push(favoriteId);

    // Add the new favoriteId to the user's favorites array
    const updatedUser = await prisma.user.update({
      where: { id: user?.id },
      data: {
        favoriteIds,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const user = req.user;

    if (!favoriteId || typeof favoriteId !== "string") {
      return res.status(404).json({ message: "Invaid listing Id" });
    }

    let favoriteIds = [...(user.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== favoriteId);

    // Add the new favoriteId to the user's favorites array
    const updatedUser = await prisma.user.update({
      where: { id: user?.id },
      data: {
        favoriteIds,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
