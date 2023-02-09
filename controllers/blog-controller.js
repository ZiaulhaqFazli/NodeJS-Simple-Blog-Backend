import express from 'express';
import mongoose from 'mongoose';
import Blog from '../models/Blog';
import User from '../models/User';

export const getAllblogs = async(req, res, next) => {
    let allBlogs;
    try{
        allBlogs = await Blog.find();
    }catch(err){
        console.log(err);
    }
    if(!allBlogs){
        return res.status(404).json({ message: "No Blogs Exists!"}); 
    }
    return res.status(200).json({ allBlogs });
};

export const addBlog = async(req, res, next) => {
    const { title, description, image, user } = req.body;
    let userExists;
    try{
        userExists = await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!userExists){
        return res.status(400).json({ message: "You can not create blog without User!" });
    }
    const blog = new Blog({
        title,
        description,
        image,
        user, 
    });
    try{
        const session = await mongoose.startSession();
        console.log(session);
        session.startTransaction();
        await blog.save({ session });
        userExists.blogs.push(blog);
        await userExists.save({ session });
        await session.commitTransaction();
    }catch(err){
        return res.status(500).json({ message: err }, console.log(err));
    }
    return res.status(200).json({ message: "Blog Created Successfully!", blog });
};

export const udpateBlog = async(req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
        }); 
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({ message: "Unable to update the blog!" });
    }
    return res.status(200).json({ message: "Blog updated successfully!", blog });
};

export const deleteBlog = async(req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndDelete(blogId).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err){
        console.log(err);
        if(!blog){
            res.status(404).json({ message: "Blog does not exists!" });
        }
    }
    return res.status(200).json({ message: "Blog deleted successfully!" });
};

export const getBlogById = async(req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(blogId);
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({ message: "Blog does not exixts!" });
    }
    return res.status(200).json({ message: "Blog deleted successfully!" });
};