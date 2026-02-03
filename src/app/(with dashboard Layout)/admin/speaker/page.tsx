"use client";


import AdminLayout from "@/components/admin/layout";
import SpeakerModal from "@/components/admin/speakerModal";
import { deleteBlog } from "@/service/Blog";
import { deleteSpeaker, getAllSpeakers } from "@/service/Speaker";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export interface SpeakerPost {
  id: number;
  name: string;
  designation: string;
  organization: string;
  bio: string;
  topic: string;
  photo: string;
  created_at: Date;
  updated_at: Date;
}

export default function AdminSpeaker() {
  const [speakers, setSpeakers] = useState<SpeakerPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "add" | "edit" | "preview";
    speaker?: SpeakerPost;
  }>({
    isOpen: false,
    mode: "add",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);


  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddPost = () => {
    setModalState({
      isOpen: true,
      mode: "add",
    });
  };

  const handleEditSpeaker = (speaker: SpeakerPost) => {
    setModalState({
      isOpen: true,
      mode: "edit",
      speaker,
    });
  };

  const handlePreviewSpeaker = (speaker: SpeakerPost) => {
    setModalState({
      isOpen: true,
      mode: "preview",
      speaker,
    });
  };



  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: "add",
    });
  };

  //load all speaker----------------
  const loadSpeaker = async () => {
    const data = await getAllSpeakers(searchTerm, currentPage, perPage);
    console.log("Speakers loaded:", data?.data);
    if (data?.data?.data) {
      setSpeakers(data.data.data);
      setLastPage(data.data.last_page);
      setCurrentPage(data.data.current_page);
      setTotal(data.data.total);
      setPerPage(data.data.per_page);

    } else {
      setSpeakers([]);
    }
  };

  useEffect(() => {
    loadSpeaker();

  }, [searchTerm, selectedStatus, currentPage, perPage]);


  //delete blog ===================
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    const res = await deleteSpeaker(id);
    if (res?.status === 200) {
      alert("Speaker deleted successfully!");
      loadSpeaker(); // Refresh the list
    } else {
      alert("Failed to delete speaker.");
    }
  };


  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-gray-900">Speaker Management</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full"></div>
            </div>
            <p className="text-gray-600">Manage your speaker posts and profiles</p>
          </div>
          <button
            onClick={handleAddPost}
            className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-900/30 hover:shadow-xl transition-all"
          >
            <Plus className="h-5 w-5" />
            Add New Speaker
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search speakers by name, designation, or organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all font-medium bg-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Speaker Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Photo</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Designation</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Organization</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white">Topic</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-white">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {speakers?.map((speaker, index) => (
                  <tr key={speaker.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {speaker.photo ? (
                        <img
                          src={speaker.photo}
                          alt={speaker.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 shadow-md"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {speaker.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{speaker.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{speaker.designation}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{speaker.organization}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {speaker.topic ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-900 font-medium">
                            {speaker.topic}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">No topic</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditSpeaker(speaker)}
                          className="p-2 text-blue-600 hover:text-white hover:bg-blue-900 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handlePreviewSpeaker(speaker)}
                          className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all"
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(speaker.id)}
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
        {speakers.length > 0 && (
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
        {speakers?.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No speakers found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria, or add a new speaker
                </p>
                <button
                  onClick={handleAddPost}
                  className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-900/30 transition-all"
                >
                  <Plus className="h-5 w-5" />
                  Add First Speaker
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Blog Modal */}
      <SpeakerModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        mode={modalState.mode}
        speaker={modalState.speaker}
        loadSpeakers={loadSpeaker}

      />
    </AdminLayout>
  );
}
