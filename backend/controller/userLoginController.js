const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function createUserLogin (req, res) {
    const {
        username,
        password,
    } = req.body;

    try{
        const user = await prisma.user.findUnique({ where: { username }});
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign( { userId: user.user_id }, process.env.JWT_Secret);
        res.setHeader("Set-Cookie", `token=${ token }; httpOnly; path=/`);
        res.status(200).json({ message: 'Login Success' , token: token});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Invalid credentials', token: token });
    }
};

async function getSpecificUser(req,res) {
    try {
      const { id } = req.params;
      const user = await prisma.User.findUnique({
        where: { 
        user_id: Number(id) ,
        }
      });
      res.status(200).json({ message: "Successfully found specific user", user });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "User not found" });
    }
  };

  module.exports = {
    createUserLogin,
    getSpecificUser,
  };

