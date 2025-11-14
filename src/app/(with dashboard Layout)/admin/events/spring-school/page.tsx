"use client";


import AdminLayout from "@/components/admin/layout";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SpeakerPost } from "../../speaker/page";
import { getAllSpeakers } from "@/service/Speaker";
import { deleteSpringTraineeWorkshop, getAllSpringTraineeWorkshop } from './../../../../../service/SpringTraineeWorksop/index';
import SpringTraineeWorkshopModal, { Speaker } from "@/components/admin/sprinTraineeWorkshopModal";

interface SpringTraineeWorkshop {
    id: number;
    title: string;
    date: string;
    venue: string;
    time: string;
    description: string;
    status: 'upcoming' | 'ongoing' | 'completed' | string;
    category: string;
    speaker_id?: string;
    speaker?: Speaker;
    duration?: string;
    created_at: Date;
    updated_at: Date;
}

export default function AdminSpeaker() {
    const [springTraineeWorkshops, setSpringTraineeWorkshop] = useState<SpringTraineeWorkshop[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        mode: "add" | "edit" | "preview";
        springTraineeWorkshop?: SpringTraineeWorkshop;
    }>({
        isOpen: false,
        mode: "add",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [speakers, setSpeakers] = useState<SpeakerPost[]>([]);

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

    const handleEditSpeaker = (springTraineeWorkshop: SpringTraineeWorkshop) => {
        setModalState({
            isOpen: true,
            mode: "edit",
            springTraineeWorkshop,
        });
    };

    const handlePreviewSpeaker = (springTraineeWorkshop: SpringTraineeWorkshop) => {
        setModalState({
            isOpen: true,
            mode: "preview",
            springTraineeWorkshop,
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

        } else {
            setSpeakers([]);
        }
    };

    useEffect(() => {
        loadSpeaker();

    }, [searchTerm, currentPage, perPage]);

    //load all SpringTraineeWorkshop----------------
    const loadSpringTraineeWorkshop = async () => {
        const data = await getAllSpringTraineeWorkshop(searchTerm, currentPage, perPage);
        console.log("SpringTraineeWorkshop loaded:", data?.data);
        if (data?.data?.data) {
            setSpringTraineeWorkshop(data.data.data);
            setLastPage(data.data.last_page);
            setCurrentPage(data.data.current_page);
            setTotal(data.data.total);
            setPerPage(data.data.per_page);

        } else {
            setSpringTraineeWorkshop([]);
        }
    };

    useEffect(() => {
        loadSpringTraineeWorkshop();

    }, [searchTerm, selectedStatus, currentPage, perPage]);


    //delete SpringTraineeWorkshop ===================
    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        const res = await deleteSpringTraineeWorkshop(id);
        if (res?.status === 200) {
            alert("SpringTraineeWorkshop deleted successfully!");
            loadSpringTraineeWorkshop(); // Refresh the list
        } else {
            alert("Failed to delete SpringTraineeWorkshop.");
        }
    };


    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Conference & Seminer Management
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Manage your Conference & Seminer posts here.
                        </p>
                    </div>
                    <button
                        onClick={handleAddPost}
                        className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors duration-200"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Conference & Seminer
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search blog posts..."
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

                        </select>
                    </div>
                </div>

                {/* Blog Posts Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2 text-sm">Title</th>
                                    <th className="border px-4 py-2 text-sm">Date</th>
                                    <th className="border px-4 py-2 text-sm">Venue</th>
                                    <th className="border px-4 py-2 text-sm">Time</th>
                                    <th className="border px-4 py-2 text-sm">Description</th>
                                    <th className="border px-4 py-2 text-sm">Status</th>
                                    <th className="border px-4 py-2 text-sm">Category</th>
                                    <th className="border px-4 py-2 text-sm">Speaker</th>
                                    <th className="border px-4 py-2 text-sm">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {springTraineeWorkshops?.map((speaker) => (
                                    <tr key={speaker.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{speaker.title}</td>
                                        <td className="border px-4 py-2">{speaker.date}</td>
                                        <td className="border px-4 py-2">{speaker.venue}</td>
                                        <td className="border px-4 py-2">{speaker.time}</td>
                                        <td className="border px-4 py-2">{speaker.description}</td>
                                        <td className="border px-4 py-2 capitalize">{speaker.status}</td>
                                        <td className="border px-4 py-2">{speaker.category}</td>
                                        <td className="border px-4 py-2">{speaker.speaker?.name || "No Speaker"}</td>
                                        <div className="flex space-x-2 mt-2 ml-2">
                                            <button
                                                onClick={() => handleEditSpeaker(speaker)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handlePreviewSpeaker(speaker)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(speaker.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination */}
                {springTraineeWorkshops.length > 0 && (
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



                {/* Empty State */}
                {springTraineeWorkshops?.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No speaker found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </div>

            {/* Conference Modal */}
            <SpringTraineeWorkshopModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                mode={modalState.mode}
                speaker={modalState.springTraineeWorkshop}
                loadConferenceAndSeminar={loadSpringTraineeWorkshop}
                speakers={speakers}

            />


        </AdminLayout >
    );
}
