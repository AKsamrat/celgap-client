/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createBlog, updateBlog } from "@/service/Blog";
import { Calendar, Eye, Save, User, X } from "lucide-react";
import { useState, useEffect } from "react";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  author: string;
  date: Date;
  status: "published" | "draft";
  image: string;
  created_at: Date;
  updated_at: Date;
}

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "preview";
  post?: BlogPost | undefined;
  loadBlogs: () => void;

}

export default function BlogModal({
  isOpen,
  onClose,
  mode,
  post,
  loadBlogs,

}: BlogModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    image: null as File | null,
    status: "draft",
  });
  // When modal opens in edit mode, fill form with existing post data
  useEffect(() => {
    if (mode === "edit" && post) {
      setFormData({
        title: post.title || "",
        description: post.description || "",
        author: post.author || "",
        image: null,
        status: post.status || "draft",
      });
    } else if (mode === "add") {
      // Reset when adding new blog
      setFormData({
        title: "",
        description: "",
        author: "",
        image: null,
        status: "draft",
      });
    }
  }, [mode, post]);

  //create blog=============
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      author: "",
      image: null,
      status: "draft",
    });
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("author", formData.author);
    data.append("status", formData.status);
    if (formData.image) data.append("image", formData.image);

    // for (let [key, value] of data.entries()) {
    //   console.log(key, value);
    // }

    let res;

    if (mode === "edit" && post?.id) {
      data.append("_method", "PUT");
      res = await updateBlog(post.id, data);
      console.log("Updating blog with ID:", data);
    } else {
      res = await createBlog(data);
      console.log("Updating blog with ID:", res);
    }

    if (res?.status === 200 || res?.status === 201) {
      loadBlogs();
      onClose();
      resetForm();
    } else {
      console.log("Error saving blog:", res.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "add" && "Add New Blog Post"}
            {mode === "edit" && "Edit Blog Post"}
            {mode === "preview" && "Preview Blog Post"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {mode === "preview" ? (
            // Preview Mode
            <div className="p-6">
              <div className="mb-6">
                <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                  {post?.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {post?.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post?.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {post?.date && new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  <span>{post?.views} views</span>
                </div>
              </div>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-6">{post?.excerpt}</p>
                <div className="text-gray-800 leading-relaxed">
                  {post?.content ||
                    "This is the full content of the blog post. In a real implementation, this would be a rich text editor with formatting options, images, and other media."}
                </div>
              </div>
            </div>
          ) : (
            // Add/Edit Form
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="Enter blog post title"
                  />
                </div>
                <div>
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Author *
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="Enter author name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                {/* status----------- */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>

                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFormData({ ...formData, image: e.target.files[0] });
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                />
              </div>

              {/* content------------ */}

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Enter the full blog post description"
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        {mode !== "preview" && (
          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {mode === "add" ? "Create Post" : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
