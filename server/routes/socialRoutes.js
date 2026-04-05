const express = require('express');
const { feed, createPost, createComment, sendMessage } = require('../controllers/socialController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/feed', feed);
router.post('/posts', requireAuth, createPost);
router.post('/posts/:postId/comments', requireAuth, createComment);
router.post('/messages', requireAuth, sendMessage);

module.exports = router;
