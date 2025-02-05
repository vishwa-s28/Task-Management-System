import he from "he";

const inputSanitization = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = typeof req.body[key] === "string" ? he.encode(req.body[key]) : req.body[key];
      }
    }
  }
  if (req.query) {
    for (const key in req.query) {
      if (req.query.hasOwnProperty(key)) {
        req.query[key] = typeof req.query[key] === "string" ? he.encode(req.query[key]) : req.query[key];
      }
    }
  }
  if (req.params) {
    for (const key in req.params) {
      if (req.params.hasOwnProperty(key)) {
        req.params[key] = typeof req.params[key] === "string" ? he.encode(req.params[key]) : req.params[key];
      }
    }
  }
  next();
};

export default inputSanitization;
