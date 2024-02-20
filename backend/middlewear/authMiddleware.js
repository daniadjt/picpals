const jwt = require("jsonwebtoken");
require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cookieParser = require('cookie-parser');

function authenticateUser() {
    return async (req, res, next) => {
      try {
        const token = req.cookies.token;
  
        if (token == null) return res.sendStatus(401);
  
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken || !decodedToken.userId) {
          return res.sendStatus(401);
        }
  
        req.user_id = decodedToken.userId;
        const user = await prisma.User.findUnique({
          where: { user_id: req.user_id },
        });
  
        if (user) {
          next(user);
        } else {
          res.sendStatus(403);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        res.sendStatus(500); 
      }
    };
  }

  module.exports = { authenticateUser };
