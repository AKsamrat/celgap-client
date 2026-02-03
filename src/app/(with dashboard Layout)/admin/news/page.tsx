"use client";

import AdminLayout from "@/components/admin/layout";
import NewsModal from "@/components/admin/newsModal";
import { deleteNews, getAllNews } from "@/service/News";

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
import { useEffect, useState } from "react";

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  author: string;
  created_at?: string | null | undefined;

}



export default function AdminNews() {
  const [newsArticles, setNewsArticles] =
    useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");


  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "add" | "edit" | "preview";
    article?: NewsArticle;
  }>({
    isOpen: false,
    mode: "add",
  });
  //load all blogs----------------
  const loadNews = async () => {
    const data = await getAllNews(searchTerm, currentPage, perPage);
    // console.log("Blogs loaded:", data.data);
    if (data?.data?.data) {
      setNewsArticles(data.data.data); // Laravel paginate() wraps data inside 'data.data'
      setLastPage(data.data.last_page);
      setCurrentPage(data.data.current_page);
      setTotal(data.data.total);
      setPerPage(data.data.per_page);

    } else {
      setNewsArticles([]);
    }
  };

  useEffect(() => {
    loadNews();

  }, [searchTerm, currentPage, perPage]);

  //delete news ===================
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this news?");
    if (!confirmDelete) return;

    const res = await deleteNews(id);
    if (res?.status === 200) {
      alert("News deleted successfully!");
      loadNews(); // Refresh the list
    } else {
      alert("Failed to delete news.");
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
        description: articleData.description || "",
        author: articleData.author || "",
        created_at: new Date().toISOString().split("T")[0],

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
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-900">
                News Management
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full"></div>
            </div>
            <p className="text-gray-600">Manage news articles and breaking news</p>
          </div>
          <button
            onClick={handleAddArticle}
            className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-900/30 hover:shadow-xl transition-all"
          >
            <Plus className="h-5 w-5" />
            New News Article
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
              />
            </div>
          </div>
        </div>

        {/* News Articles Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">
                    Date
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {newsArticles?.map((article) => (
                  <tr key={article.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                          {article.title}
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed">
                          {article.description?.length > 120
                            ? article.description.slice(0, 120) + "..."
                            : article.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {article.author?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {article.author || 'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {article.created_at
                          ? new Date(article.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditArticle(article)}
                          className="p-2 text-blue-600 hover:text-white hover:bg-blue-900 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePreviewArticle(article)}
                          className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all"
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all"
                          title="Delete"
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

        {/* Pagination */}
        {newsArticles.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing <strong className="text-blue-900">{(currentPage - 1) * perPage + 1}</strong> to{" "}
                <strong className="text-blue-900">{Math.min(currentPage * perPage, total)}</strong> of{" "}
                <strong className="text-blue-900">{total}</strong> results
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="perPage" className="text-sm font-medium text-gray-600">Show:</label>
                <select
                  id="perPage"
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border-2 border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-900 text-white hover:bg-blue-800 shadow-md hover:shadow-lg"
                    }`}
                >
                  Previous
                </button>

                <div className="hidden md:flex items-center gap-1">
                  {[...Array(lastPage)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${currentPage === index + 1
                          ? "bg-blue-900 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <div className="md:hidden">
                  <span className="text-sm font-medium px-4 py-2 bg-blue-50 text-blue-900 rounded-lg border border-blue-200">
                    {currentPage} / {lastPage}
                  </span>
                </div>

                <button
                  disabled={currentPage === lastPage}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentPage === lastPage
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-900 text-white hover:bg-blue-800 shadow-md hover:shadow-lg"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {newsArticles?.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No news articles found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria, or add a new news article
                </p>
                <button
                  onClick={handleAddArticle}
                  className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-900/30 transition-all"
                >
                  <Plus className="h-5 w-5" />
                  Add First Article
                </button>
              </div>
            </div>
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
        loadNews={loadNews}
      />
    </AdminLayout>
  );
}
