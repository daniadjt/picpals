const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) 
    }
  })
  const upload = multer({ storage: storage })

const postController = {
    getAllPost: async (req, res) => {
        const post = await prisma.Post.findMany();
        res.status(200).json( { post })
    }, 

    getPostById: async (req, res) => {
        try{
            const { id } = req.params;
            const postById = await prisma.Post.findUnique({
                where: { post_id: Number(id) },
            });
            res.status(200).json( { postById });
        } catch (error) {
            console.log(error);
            res.status(400).json( { message: "Post not found" });
        }
    },

    createPost: async (req, res) => {
        try {
            upload.single('image')(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json({ message: "Error uploading file" })
                } else if (err) {
                    return res.status(500).json({ message: "Unknown error uploading file" })
                }
                
                const {
                    caption,
                    created_at,
                    updated_at,
                    user_id
                } = req.body;
                
                const userId = parseInt(user_id);
    
                const createPost = await prisma.Post.create({
                    data: {
                        image: req.file.filename,
                        caption,
                        created_at,
                        updated_at,
                        user: { connect: { id: userId } } 
                    },
                });
    
                res.status(200).json({ message: 'Post successfully created!', createPost });
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error to create post' });
        }
    },

    updatePost : async (req, res) => {
        try {
            const {
                caption,
                created_at,
                updated_at,
                user_id
            } = req.body;
            const { id } = req.params;
            const userId = parseInt(user_id);
            
            const updatePost = await prisma.Post.update({
                where: { post_id: Number(id) },
                data: {
                    caption,
                    created_at,
                    updated_at,
                    user: { connect: { id: userId } } 
                },
            });
            res.status(200).json( { message: 'Post successfully updated', updatePost });
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Post error to update' });
        }
    },

    deletePost: async (req, res) => {
        try{
            const { id } = req.params;
            const deletePost = await prisma.Post.delete({
                where: { post_id: Number(id) },
            });
            res.status(200).json({ message: 'Successfully deleted!', deletePost});
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Error to delete post' })
        }
    },
};

module.exports = postController;