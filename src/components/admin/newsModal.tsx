"use client";

import { AlertCircle, Calendar, Eye, Save, User, X } from "lucide-react";
import { useState } from "react";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  status: "published" | "draft" | "breaking";
  views: number;
  category: string;
  priority: "high" | "medium" | "low";
}

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "preview";
  article?: NewsArticle;
  onSave: (article: Partial<NewsArticle>) => void;
}

export default function NewsModal({
  isOpen,
  onClose,
  mode,
  article,
  onSave,
}: NewsModalProps) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    excerpt: article?.excerpt || "",
    content:
      article?.content ||
      "This is the full content of the news article. In a real implementation, this would include detailed reporting, quotes, and comprehensive coverage of the news event.",
    author: article?.author || "",
    category: article?.category || "",
    status: article?.status || ("draft" as const),
    priority: article?.priority || ("medium" as const),
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "breaking":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "add" && "Add News Article"}
            {mode === "edit" && "Edit News Article"}
            {mode === "preview" && "Preview News Article"}
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
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                  {article?.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    article?.status || ""
                  )}`}
                >
                  {article?.status === "breaking" && (
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                  )}
                  {article?.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                    article?.priority || ""
                  )}`}
                >
                  {article?.priority} priority
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {article?.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{article?.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {article?.date &&
                      new Date(article.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  <span>{article?.views} views</span>
                </div>
              </div>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-6">{article?.excerpt}</p>
                <div className="text-gray-800 leading-relaxed">
                  {article?.content ||
                    "This is the full content of the news article. In a real implementation, this would include detailed reporting, quotes, and comprehensive coverage of the news event."}
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
                    placeholder="Enter news article title"
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <option value="Court Decisions">Court Decisions</option>
                    <option value="Legislation">Legislation</option>
                    <option value="Education">Education</option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Policy Updates">Policy Updates</option>
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
                    <option value="breaking">Breaking News</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Priority *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
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
                  placeholder="Enter the full news article content"
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
              {mode === "add" ? "Create Article" : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
