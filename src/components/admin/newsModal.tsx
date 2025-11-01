/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createNews, updateNews } from "@/service/News";
import { AlertCircle, Calendar, Eye, Save, User, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NewsArticle {
  id: number;
  title: string;
  description?: string;
  author: string;
  created_at?: string | null;

}

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "preview";
  article?: NewsArticle | undefined;
  onSave: (article: Partial<NewsArticle>) => void;
  loadNews: () => void;

}

export default function NewsModal({
  isOpen,
  onClose,
  mode,
  article,
  loadNews,
  onSave,
}: NewsModalProps) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    description:
      article?.description ||
      "This is the full description of the news article.",
    author: article?.author || "",


  });

  useEffect(() => {
    if (mode === "edit" && article) {
      setFormData({
        title: article.title || "",
        description: article.description || "",
        author: article.author || "",
      });
    } else if (mode === "add") {
      // Reset when adding new blog
      setFormData({
        title: "",
        description: "",
        author: "",

      });
    }
  }, [mode, article]);

  //create news
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      author: "",

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

    let res;

    if (mode === "edit" && article?.id) {
      data.append("_method", "PUT");
      res = await updateNews(article.id, data);
      console.log("Updating news with ID:", data);
    } else {
      res = await createNews(data);
      console.log("Creating new news:", res);
    }

    if (res?.status === 200 || res?.status === 201) {
      loadNews();
      onClose();
      resetForm();
    } else {
      console.log("Error saving news:", res.message);
    }
  };

  if (!isOpen) return null;



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
                    {article?.created_at &&
                      new Date(article.created_at).toLocaleDateString()}
                  </span>
                </div>

              </div>
              <div className="prose max-w-none">

                <div className="text-gray-800 leading-relaxed">
                  {article?.description}
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
                  placeholder="Enter the full news article description"
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
