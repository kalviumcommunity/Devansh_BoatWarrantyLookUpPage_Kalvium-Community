import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const adminEmail = "admin@gmail.com";
const adminPassword = "admin123";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return secret;
}

export function generateToken(userId) {
  return jwt.sign({ userId }, getSecret(), { expiresIn: "1d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, getSecret());
  } catch {
    return null;
  }
}

export function isAdmin(email, password) {
  return email === adminEmail && password === adminPassword;
}

export function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
