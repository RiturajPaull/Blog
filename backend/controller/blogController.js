import imagekit from "../configs/imageKit.js";
import BlogModel from "../model/BlogModel.js";
import fs from "fs";
import CommentModel from "../model/CommentModel.js";
import main from "../configs/gemini.js";

export const addBlog = async (req, resp) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    console.log(title);
    console.log(subTitle);
    console.log(description);
    console.log(category);
    console.log(isPublished);

    const imageFile = req.file; // multer middleware
    if (!title || !description || !category || !imageFile) {
      return resp
        .status(400)
        .json({ message: "Please fill all fields", success: false });
    }

    // will store the image url in string with the help of Imagekit
    // upload image to imgaekit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimization through imagekit URL transformation.
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = optimizedImageUrl;
    const blogData = {
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    };
    await BlogModel.create(blogData);

    resp.status(201).json({
      message: "Blog Added Successfully!!",
      success: true,
      blogData,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const getAllBlogs = async (req, resp) => {
  try {
    const blog = await BlogModel.find({ isPublished: true });
    console.log("Blog", blog);
    if (!blog || blog.length === 0) {
      return resp.status(404).json({
        message: "No published blogs found",
        success: false,
      });
    }
    return resp.status(200).json({
      message: "Blog Post fetched successfully",
      success: true,
      blog,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const getBlogById = async (req, resp) => {
  try {
    const { blogId } = req.params;

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return resp.status(400).json({
        message: "Blog Not found",
        success: false,
      });
    }

    return resp.status(200).json({
      message: "Individual blog is fetched",
      success: true,
      blog,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
    });
  }
};
export const deleteBlogById = async (req, resp) => {
  try {
    const { id } = req.body;

    // dlete the blog and also delete the comment on this blog
    const blog = await BlogModel.findByIdAndDelete(id);
    await CommentModel.deleteMany({ blog: id });
    if (!blog) {
      return resp.status(400).json({
        message: "Blog Not found",
        success: false,
      });
    }

    return resp.status(200).json({
      message: "Individual blog is delete",
      success: true,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
    });
  }
};

export const togglePublish = async (req, resp) => {
  try {
    const { id } = req.body;
    const blog = await BlogModel.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    return resp.status(200).json({
      message: "Blog status updated",
      success: true,
    });
  } catch (error) {
    return resp.status(200).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const addComment = async (req, resp) => {
  try {
    const { blog, name, content } = req.body;
    if (!blog || !name || !content) {
      return resp.status(400).json({
        message: "All the fields are mandatory",
        success: false,
      });
    }

    const comment = await CommentModel.create({
      blog,
      name,
      content,
    });

    return resp.status(200).json({
      message: "Comment added for review",
      success: true,
      comment,
    });
  } catch (error) {
    return resp.status(200).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const getIndividualBlogComment = async (req, resp) => {
  try {
    const { blogId } = req.body;
    const comment = await CommentModel.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    return resp.status(200).json({
      message: "Comment data for individual blog ",
      success: true,
      comment,
    });
  } catch (error) {
    return resp.status(200).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const geminiAi = async (req, resp) => {
  try {
    const { prompt } = req.body;
    const response = await main(
      prompt + "Generate a blog content for this topic in simple text format"
    );
    return resp.send({
      response,
      success: true,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};
