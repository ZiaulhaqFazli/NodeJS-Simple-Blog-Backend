import express from 'express';
const blogRouter = express.Router();
import { getAllblogs,addBlog, udpateBlog, deleteBlog, getBlogById } from '../controllers/blog-controller';

blogRouter.get("/", getAllblogs); 
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", udpateBlog);
blogRouter.get("/getSingleBlog/:id", getBlogById);
blogRouter.delete("/delete/:id", deleteBlog);
export default blogRouter;