import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { findUserById } from "../services/userServices.js";
import dotenv from "dotenv";

const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization } = req.header;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await findUserById(id);
    if (!user || !user.token) {
      return next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};