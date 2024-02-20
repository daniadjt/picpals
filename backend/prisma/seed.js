const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const seedData = async () => {
    try{
        const now = new Date();
        const user = await prisma.User.createMany({
            data: [
                {
                    fullname: "Bagheera Djatniko",
                    email: "bagheeradjatniko@mail.com",
                    username: "bagheeradjtnk",
                    password: "bagheera123",
                },
            ],
        });
        
        //Seeding Post
        const post = await prisma.Post.createMany({
            data: [
                {
                    user_id: 1,
                    image: "../uploads/ygy.jpeg",
                    caption: "A Day At The Beach!",
                    created_at: now,
                    updated_at: now,
                },
                {
                    user_id: 1,
                    image: "../uploads/book.jpeg",
                    caption: "Manifest A Strong Mind!",
                    created_at: now,
                    updated_at: now,
                },
                {
                    user_id: 1,
                    image: "../uploads/sky.jpeg",
                    caption: "Sunset in Yogyakarta",
                    created_at: now,
                    updated_at: now,
                }
            ]
        });
        console.log("Seeding complete");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await prisma.$disconnect();
    }
};

seedData()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        ProcessingInstruction.exit(1);
    });