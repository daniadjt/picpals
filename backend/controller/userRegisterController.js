const { PrismaClient } =require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function createUserRegister(req, res) {
    const { fullname,
            email,
            username,
            password
        }
        = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            const{ password: passwordDB, ...user} = await prisma.User.create({
                data: {
                    fullname,
                    email,
                    username, 
                    password: hashedPassword,   
                },
            });
            res.status(201).json({
                message: "Successfully Register!", user
            });
        } catch (error) {
            console.error("Error in user registration:", error);
            res.status(400).json({message: "Something went wrong"});
        }
};

module.exports = {
    createUserRegister
}

