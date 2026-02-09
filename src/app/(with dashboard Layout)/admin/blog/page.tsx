"use client";

import BlogModal from "@/components/admin/blogModal";
import { deleteBlog, getAllBlogs, updateBlogStatus } from "@/service/Blog";
import { BlogPost } from "@/types";
import {
  Calendar,
  Edit,
  Eye,
  Plus,
  Search,
  Trash2,
  User,
  FileText,
  Filter,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminBlog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "add" | "edit" | "preview";
    post?: BlogPost;
  }>({
    isOpen: false,
    mode: "add",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);

  // Delete blog with improved UX
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this blog? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      const res = await deleteBlog(id);

      if (res?.status === 200) {
        // Show success message
        alert("Blog deleted successfully!");

        // If we're on the last item of a page > 1, go to previous page
        if (blogs.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          await loadBlogs();
        }
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete blog. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Modal handlers
  const handleAddPost = () => {
    setModalState({ isOpen: true, mode: "add" });
  };

  const handleEditPost = (post: BlogPost) => {
    setModalState({ isOpen: true, mode: "edit", post });
  };

  const handlePreviewPost = (post: BlogPost) => {
    setModalState({ isOpen: true, mode: "preview", post });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: "add" });
  };

  // Load blogs with error handling
  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAllBlogs(
        searchTerm,
        selectedStatus,
        currentPage,
        perPage
      );

      if (data?.data?.data) {
        setBlogs(data.data.data);
        setLastPage(data.data.last_page);
        setCurrentPage(data.data.current_page);
        setTotal(data.data.total);
        setPerPage(data.data.per_page);
      } else {
        setBlogs([]);
        setTotal(0);
      }
    } catch (error) {
      console.error("Load blogs error:", error);
      setError("Failed to load blogs. Please try again.");
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (postId: number, newStatus: string) => {
    try {
      setUpdatingStatusId(postId);
      const res = await updateBlogStatus(postId, newStatus);

      if (res?.status === 200) {
        await loadBlogs();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Status update error:", error);
      alert("Failed to update status. Please try again.");
      await loadBlogs(); // Reload to reset the select
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // Load blogs on dependency changes
  useEffect(() => {
    loadBlogs();
  }, [searchTerm, selectedStatus, currentPage, perPage]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(lastPage, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl p-3">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative z-10 flex justify-between items-center">
            <div>

              <h2 className="text-4xl font-bold mb-2">Blog Management</h2>
              <p className="">
                Manage your blog posts and articles ({total} total)
              </p>
            </div>
            <button
              onClick={handleAddPost}
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Plus className="h-5 w-5" />
              New Blog Post
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Filter className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by title, author, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
            <button
              onClick={loadBlogs}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading blog posts...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Blog Posts Table */}
            <div className="bg-blue-900 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-white">
                  <thead className="bg-gradient-to-r from-blue-900 to-blue-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogs?.map((post) => (
                      <tr
                        key={post.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="max-w-md">
                            <div className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                              {post.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {post.description}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg mr-2">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {post.author}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={post.status}
                            onChange={(e) =>
                              handleStatusUpdate(post.id, e.target.value)
                            }
                            disabled={updatingStatusId === post.id}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 border transition-all ${getStatusColor(
                              post.status
                            )} ${updatingStatusId === post.id
                              ? "opacity-50 cursor-wait"
                              : ""
                              }`}
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">
                              {new Date(post.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handlePreviewPost(post)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              disabled={deletingId === post.id}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-wait"
                              title="Delete"
                            >
                              {deletingId === post.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {blogs.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t bg-gray-50">
                  <div className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {(currentPage - 1) * perPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-gray-900">
                      {Math.min(currentPage * perPage, total)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">{total}</span>{" "}
                    results
                  </div>

                  <div className="flex items-center gap-2">
                    <label htmlFor="perPage" className="text-sm text-gray-600">
                      Show:
                    </label>
                    <select
                      id="perPage"
                      value={perPage}
                      onChange={(e) => {
                        setPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className={`p-2 rounded-lg text-sm font-medium transition-all ${currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === page
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === lastPage}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className={`p-2 rounded-lg text-sm font-medium transition-all ${currentPage === lastPage
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Empty State */}
            {blogs?.length === 0 && !isLoading && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No blog posts found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm || selectedStatus !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Get started by creating your first blog post"}
                  </p>
                  {!searchTerm && selectedStatus === "all" && (
                    <button
                      onClick={handleAddPost}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                      Create Blog Post
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Blog Modal */}
      <BlogModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        post={modalState.post}
        loadBlogs={loadBlogs}
      />
    </>
  );
}