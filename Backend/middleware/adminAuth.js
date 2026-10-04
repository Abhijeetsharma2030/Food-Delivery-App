import userModel from "../models/userModel.js";
import authMiddleware from "./auth.js";

// verifies the token (via authMiddleware) and checks the user has isAdmin set
const adminAuth = (req, res, next) => {
  authMiddleware(req, res, async () => {
    try {
      const user = await userModel.findById(req.body.userId);
      if (!user || !user.isAdmin) {
        return res.json({ success: false, message: "Admin access only" });
      }
      next();
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  });
};

export default adminAuth;
