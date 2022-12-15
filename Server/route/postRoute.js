const express = require('express');
const postController = require('../controller/postController');
const router = express.Router();

router.post('/', postController.uploadPostImage , postController.createPost);
router.get('/:id',postController.getPostById);
router.put('/:id',postController.updatePost);
router.get('/',postController.getAllPosts);
router.patch('/:id/likePost',postController.likePost);

module.exports = router;