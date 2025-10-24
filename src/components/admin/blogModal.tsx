"use client";

import { Calendar, Eye, Save, User, X } from "lucide-react";
import { useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  status: "published" | "draft" | "scheduled";
  views: number;
  category: string;
}

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "preview";
  post?: BlogPost;
  onSave: (post: Partial<BlogPost>) => void;
}

export default function BlogModal({
  isOpen,
  onClose,
  mode,
  post,
  onSave,
}: BlogModalProps) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content:
      post?.content ||
      "This is the full content of the blog post. In a real implementation, this would be a rich text editor with formatting options, images, and other media.",
    author: post?.author || "",
    category: post?.category || "",
    status: post?.status || ("draft" as const),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Constitutional Law">
                      Constitutional Law
                    </option>
                    <option value="Environmental Law">Environmental Law</option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Human Rights">Human Rights</option>
                    <option value="Digital Rights">Digital Rights</option>
                  </select>
                </div>
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
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Enter a brief excerpt or summary"
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Enter the full blog post content"
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
