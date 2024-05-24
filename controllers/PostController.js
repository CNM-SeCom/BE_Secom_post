const Post = require('../models/PostModel');
const mongoose = require('mongoose');

// Create a new post
exports.create = async (req, res) => {
    try {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  

// Retrieve all posts
exports.findAll = async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

// Retrieve a single post by id
exports.findOne = (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        res.status(200).json(post);
    });
}

// Update a post by id
exports.update = (req, res) => {
    Post.findByIdAndUpdate
    (req.params.id, req.body, { new: true }, (err, post) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        res.status(200).json(post);
    });
}

// Delete a post by id
exports.delete = async (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).json({ message: 'Post ID is required' });
    }

    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully!' });
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).json({ message: 'An error occurred while deleting the post' });
    }
}


// Like a post
exports.like = (req, res) => {
    const id = req.body.id;
    console.log("id", id);
    const userId = String(req.body.userId);

    console.log("userId", userId);

    // Tìm bài đăng bằng id
    Post.findByIdAndUpdate(id)
        .then((post) => {
            if (!post) {
                return res.status(404).send({ message: 'Post not found' });
            }
            // Kiểm tra xem người dùng đã thích bài đăng chưa trong mảng likes có phần tử nào có úserId trùng với userId không
            const isLiked = post.likes.some((like) => like.userId === userId);
            if (isLiked) {
                // Nếu đã thích rồi thì trả về thông báo
                //xóa user đã like
                post.likes = post.likes.filter((like) => like.userId !== userId);
                post.save();
                return res.status(200).json(post);
            }
            // Thêm id người dùng vào mảng likes
            post.likes.push({userId: userId});
            // Cập nhật bài đăng
            post.save();
            res.status(200).json(post);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};


// Comment on a post
exports.comment = (req, res) => {
    const id = req.body.id;
    const comment = req.body.comment;
    const userId = String(req.body.userId);

    Post.findByIdAndUpdate(id)
        .then((post) => {
            if (!post) {
                return res.status(404).send({ message: 'Post not found' });
            }
            post.comments.push({comment: comment, user: userId});
            post.save();
            res.status(200).json(post);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
}