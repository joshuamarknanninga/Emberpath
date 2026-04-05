const SocialPost = require('../models/SocialPost');
const Comment = require('../models/Comment');
const Message = require('../models/Message');

const feed = async (req, res) => {
  const posts = await SocialPost.find()
    .populate('user', 'name')
    .sort({ createdAt: -1 })
    .limit(50);

  const ids = posts.map((p) => p._id);
  const comments = await Comment.find({ post: { $in: ids } }).populate('user', 'name').sort({ createdAt: 1 });

  res.json({ posts, comments });
};

const createPost = async (req, res) => {
  const post = await SocialPost.create({ user: req.userId, content: req.body.content, tags: req.body.tags || [] });

  req.app.locals.broadcast('social.post.created', {
    id: post._id,
    content: post.content,
    tags: post.tags
  });

  res.status(201).json(post);
};

const createComment = async (req, res) => {
  const comment = await Comment.create({
    post: req.params.postId,
    user: req.userId,
    content: req.body.content
  });

  req.app.locals.broadcast('social.comment.created', {
    id: comment._id,
    post: comment.post,
    content: comment.content
  });

  res.status(201).json(comment);
};

const sendMessage = async (req, res) => {
  const message = await Message.create({
    fromUser: req.userId,
    toUser: req.body.toUser,
    content: req.body.content
  });

  req.app.locals.broadcast('social.message.sent', {
    id: message._id,
    toUser: message.toUser,
    preview: message.content.slice(0, 120)
  });

  res.status(201).json(message);
};

module.exports = { feed, createPost, createComment, sendMessage };
