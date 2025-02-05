import { AUTH_ERRORS } from "../constants/errorMessages.js";

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: AUTH_ERRORS.INSUFFICIENT_PERMISSIONS });
    }

    next();
  };
};

export default authorize;
