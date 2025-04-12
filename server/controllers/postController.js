const Posts = require('../model/postModal');

const createpost = async (req, res) => {
    try {
        const { title, description, likes, comments } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required",
                success: false
            });
        }

        const newpost = new Posts({
            title,
            description,
            likes: likes || 0,
            comments: comments || [],
            author: req.user._id // Add the author ID from the authenticated user
        });

        const savedpost = await newpost.save();

        return res.status(201).json({
            message: "Post created successfully",
            success: true,
            post: savedpost
        });

    } catch (error) {
        console.error("Error in createpost:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

const deletepost = async (req, res) => {
    try {
        const { id: postid } = req.params;

        if (!postid) {
            return res.status(400).json({
                message: "Post ID is required",
                success: false
            });
        }

        // Check if the post exists and belongs to the user
        const post = await Posts.findOne({ _id: postid, author: req.user._id });
        
        if (!post) {
            return res.status(404).json({
                message: "Post not found or you don't have permission to delete it",
                success: false
            });
        }

        const deletedpost = await Posts.findByIdAndDelete(postid);

        return res.status(200).json({
            message: "Post deleted successfully",
            success: true,
            post: deletedpost
        });

    } catch (error) {
        console.error("Error in deletepost:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

const updatepost = async (req, res) => {
    try {
        const { id: postid } = req.params;
        const { title, description } = req.body;

        if (!postid) {
            return res.status(400).json({
                message: "Post ID is required",
                success: false
            });
        }

        // Check if at least one field to update is provided
        if (!title && !description) {
            return res.status(400).json({
                message: "At least one field (title or description) is required for update",
                success: false
            });
        }

        // Check if the post exists and belongs to the user
        const post = await Posts.findOne({ _id: postid, author: req.user._id });
        
        if (!post) {
            return res.status(404).json({
                message: "Post not found or you don't have permission to update it",
                success: false
            });
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;

        const updatedPost = await Posts.findByIdAndUpdate(
            postid,
            updateData,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            message: "Post updated successfully",
            success: true,
            post: updatedPost
        });

    } catch (error) {
        console.error("Error in updatepost:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find()
            .populate('author', 'username email') // Populate author information
            .sort({ createdAt: -1 }); // Sort by newest first

        if (posts.length === 0) {
            return res.status(404).json({
                message: "No posts found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Posts fetched successfully",
            success: true,
            posts
        });

    } catch (error) {
        console.error("Error in getAllPosts:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

const getpostbyid = async (req, res) => {
    try {
        const { id: postid } = req.params;

        if (!postid) {
            return res.status(400).json({
                message: "Post ID is required",
                success: false
            });
        }

        const post = await Posts.findById(postid)
            .populate('author', 'username email'); // Populate author information

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Post fetched successfully",
            success: true,
            post
        });

    } catch (error) {
        console.error("Error in getpostbyid:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

module.exports = { createpost, deletepost, getAllPosts, updatepost, getpostbyid };