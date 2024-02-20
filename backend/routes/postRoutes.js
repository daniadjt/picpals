const express = require('express');
const router = express.Router();
const postController = require('../controller/postController')

router.get('/', postController.getAllPost);
router.post('/create', postController.createPost);
router.put('/:id/update', postController.updatePost);

router.route('/:id')
    .get(postController.getPostById)
    .delete(postController.deletePost);

module.exports = router;