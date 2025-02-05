import jwt from "jsonwebtoken";
import db from "../sequelize-client.js";
import { AUTH_ERRORS } from "../constants/errorMessages.js";

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: AUTH_ERRORS.NO_TOKEN });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { User } = db;
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: AUTH_ERRORS.USER_NOT_FOUND });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: AUTH_ERRORS.INVALID_TOKEN });
  }
};

export default authenticate;
