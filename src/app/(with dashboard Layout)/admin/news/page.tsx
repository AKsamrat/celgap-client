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
                    Date
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newsArticles?.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 flex items-center">

                          {article.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {article.description}
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
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {article.created_at
                            ? new Date(article.created_at).toLocaleDateString()
                            : "N/A"}
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
        {newsArticles?.length === 0 && (
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
      {/* Pagination */}
      {newsArticles.length > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing <strong>{(currentPage - 1) * perPage + 1}</strong> to{" "}
            <strong>{Math.min(currentPage * perPage, total)}</strong> of{" "}
            <strong>{total}</strong> results
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="perPage" className="text-sm text-gray-600">Show:</label>
            <select
              id="perPage"
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
            >
              Previous
            </button>

            {[...Array(lastPage)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${currentPage === index + 1
                  ? "bg-blue-900 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === lastPage}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${currentPage === lastPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}


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
