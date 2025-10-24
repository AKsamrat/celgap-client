"use client";

import AdminLayout from "@/components/admin/layout";
import NewsModal from "@/components/admin/newsModal";

import {
  AlertCircle,
  Calendar,
  Edit,
  Eye,
  Plus,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  status: "published" | "draft" | "breaking";
  views: number;
  category: string;
  priority: "high" | "medium" | "low";
}

const mockNewsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Supreme Court Ruling on Digital Privacy Rights",
    excerpt:
      "The Supreme Court has delivered a landmark judgment on digital privacy rights, setting new precedents...",
    author: "Legal News Team",
    date: "2024-12-20",
    status: "breaking",
    views: 2150,
    category: "Court Decisions",
    priority: "high",
  },
  {
    id: 2,
    title: "New Environmental Protection Act Passed",
    excerpt:
      "Parliament has passed comprehensive environmental protection legislation with stricter penalties...",
    author: "Policy Reporter",
    date: "2024-12-19",
    status: "published",
    views: 1680,
    category: "Legislation",
    priority: "high",
  },
  {
    id: 3,
    title: "Legal Education Reform Committee Report",
    excerpt:
      "The committee on legal education reform has submitted its recommendations for curriculum updates...",
    author: "Education Correspondent",
    date: "2024-12-18",
    status: "published",
    views: 920,
    category: "Education",
    priority: "medium",
  },
  {
    id: 4,
    title: "Corporate Governance Guidelines Updated",
    excerpt:
      "SEBI has released updated corporate governance guidelines for listed companies...",
    author: "Business Law Reporter",
    date: "2024-12-17",
    status: "draft",
    views: 0,
    category: "Corporate Law",
    priority: "medium",
  },
];

export default function AdminNews() {
  const [newsArticles, setNewsArticles] =
    useState<NewsArticle[]>(mockNewsArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "add" | "edit" | "preview";
    article?: NewsArticle;
  }>({
    isOpen: false,
    mode: "add",
  });

  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || article.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "all" || article.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      setNewsArticles(newsArticles.filter((article) => article.id !== id));
    }
  };

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

  const handleAddArticle = () => {
    setModalState({
      isOpen: true,
      mode: "add",
    });
  };

  const handleEditArticle = (article: NewsArticle) => {
    setModalState({
      isOpen: true,
      mode: "edit",
      article,
    });
  };

  const handlePreviewArticle = (article: NewsArticle) => {
    setModalState({
      isOpen: true,
      mode: "preview",
      article,
    });
  };

  const handleSaveArticle = (articleData: Partial<NewsArticle>) => {
    if (modalState.mode === "add") {
      const newArticle: NewsArticle = {
        id: Math.max(...newsArticles.map((a) => a.id)) + 1,
        title: articleData.title || "",
        excerpt: articleData.excerpt || "",
        author: articleData.author || "",
        date: new Date().toISOString().split("T")[0],
        status: articleData.status || "draft",
        views: 0,
        category: articleData.category || "",
        priority: articleData.priority || "medium",
      };
      setNewsArticles([newArticle, ...newsArticles]);
    } else if (modalState.mode === "edit" && modalState.article) {
      setNewsArticles(
        newsArticles.map((article) =>
          article.id === modalState.article!.id
            ? { ...article, ...articleData }
            : article
        )
      );
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: "add",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              News Management
            </h2>
            <p className="text-gray-600 mt-2">
              Manage news articles and breaking news
            </p>
          </div>
          <button
            onClick={handleAddArticle}
            className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            New News Article
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="breaking">Breaking</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* News Articles Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {article.status === "breaking" && (
                            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                          )}
                          {article.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {article.excerpt}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {article.category}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {article.author}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          article.status
                        )}`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                          article.priority
                        )}`}
                      >
                        {article.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {new Date(article.date).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {article.views.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditArticle(article)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePreviewArticle(article)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No news articles found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* News Modal */}
      <NewsModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        article={modalState.article}
        onSave={handleSaveArticle}
      />
    </AdminLayout>
  );
}
