import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token =
    req.headers.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body = req.body || {};
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default authMiddleware;
