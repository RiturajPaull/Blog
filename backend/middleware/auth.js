import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const auth = async (req, resp, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return resp.status(400).json({
        message: "No token found",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (!decode) {
      return resp.status(400).json({
        message: " Unauthorized User.",
        success: false,
      });
    }
    req.emailId = decode.email;
    next();
  } catch (error) {
    return resp.status(500).json({
      message: ("Token error", error.message),
      success: false,
    });
  }
};

export default auth;
