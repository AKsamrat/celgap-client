"use client";


import AdminLayout from "@/components/admin/layout";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SpeakerPost } from "../../speaker/page";
import { getAllSpeakers } from "@/service/Speaker";
import { deleteSpringTraineeWorkshop, getAllSpringTraineeWorkshop } from './../../../../../service/SpringTraineeWorksop/index';
import SpringTraineeWorkshopModal, { Speaker } from "@/components/admin/sprinTraineeWorkshopModal";

export interface SpringTraineeWorkshop {
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

export default function SpringSchool() {
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
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Spring School & Workshop Management
                            </h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full"></div>
                        </div>
                        <p className="text-gray-600">Manage your spring school and workshop programs</p>
                    </div>
                    <button
                        onClick={handleAddPost}
                        className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-900/30 hover:shadow-xl transition-all"
                    >
                        <Plus className="h-5 w-5" />
                        Add Spring School & Workshop
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search spring schools and workshops..."
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

                {/* Spring School & Workshop Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Title</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Date & Time</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Venue</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Description</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Instructor</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-white">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {springTraineeWorkshops?.map((workshop) => (
                                    <tr key={workshop.id} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{workshop.title}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {workshop.date}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {workshop.time}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {workshop.venue}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 max-w-xs">
                                                {workshop.description?.length > 60
                                                    ? workshop.description.slice(0, 60) + "..."
                                                    : workshop.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {(() => {
                                                const status = workshop.status?.toLowerCase();
                                                const getStatusStyle = () => {
                                                    switch (status) {
                                                        case 'published':
                                                        case 'active':
                                                        case 'ongoing':
                                                            return {
                                                                bg: 'bg-green-50 text-green-900 border-green-200',
                                                                dot: 'bg-green-600'
                                                            };
                                                        case 'draft':
                                                            return {
                                                                bg: 'bg-gray-50 text-gray-900 border-gray-200',
                                                                dot: 'bg-gray-600'
                                                            };
                                                        case 'cancelled':
                                                        case 'canceled':
                                                            return {
                                                                bg: 'bg-red-50 text-red-900 border-red-200',
                                                                dot: 'bg-red-600'
                                                            };
                                                        case 'upcoming':
                                                        case 'scheduled':
                                                        case 'registration_open':
                                                            return {
                                                                bg: 'bg-blue-50 text-blue-900 border-blue-200',
                                                                dot: 'bg-blue-600'
                                                            };
                                                        case 'completed':
                                                        case 'ended':
                                                        case 'finished':
                                                            return {
                                                                bg: 'bg-purple-50 text-purple-900 border-purple-200',
                                                                dot: 'bg-purple-600'
                                                            };
                                                        case 'full':
                                                        case 'registration_closed':
                                                            return {
                                                                bg: 'bg-orange-50 text-orange-900 border-orange-200',
                                                                dot: 'bg-orange-600'
                                                            };
                                                        default:
                                                            return {
                                                                bg: 'bg-yellow-50 text-yellow-900 border-yellow-200',
                                                                dot: 'bg-yellow-600'
                                                            };
                                                    }
                                                };
                                                const { bg, dot } = getStatusStyle();
                                                return (
                                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border-2 ${bg}`}>
                                                        <span className={`w-2 h-2 rounded-full mr-2 ${dot}`}></span>
                                                        {workshop.status ? String(workshop.status).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A'}
                                                    </span>
                                                );
                                            })()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold border border-blue-200">
                                                {workshop.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {workshop.speaker?.name ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                        {workshop.speaker.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{workshop.speaker.name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400 italic">No instructor</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEditSpeaker(workshop)}
                                                    className="p-2 text-blue-600 hover:text-white hover:bg-blue-900 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handlePreviewSpeaker(workshop)}
                                                    className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all"
                                                    title="Preview"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(workshop.id)}
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
                {springTraineeWorkshops.length > 0 && (
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
                {springTraineeWorkshops?.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center py-16">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                <Search className="h-10 w-10 text-gray-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No spring schools or workshops found</h3>
                                <p className="text-gray-600 mb-6">
                                    Try adjusting your search or filter criteria, or add a new program
                                </p>
                                <button
                                    onClick={handleAddPost}
                                    className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-900/30 transition-all"
                                >
                                    <Plus className="h-5 w-5" />
                                    Add First Program
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Status Legend */}
                {springTraineeWorkshops?.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-100 p-5">
                        <h4 className="text-sm font-bold text-gray-900 mb-3">Status Legend</h4>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                                <span className="text-xs font-medium text-gray-700">Published/Active/Ongoing</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                                <span className="text-xs font-medium text-gray-700">Upcoming/Registration Open</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                                <span className="text-xs font-medium text-gray-700">Completed/Finished</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-orange-600"></span>
                                <span className="text-xs font-medium text-gray-700">Full/Registration Closed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-gray-600"></span>
                                <span className="text-xs font-medium text-gray-700">Draft</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-600"></span>
                                <span className="text-xs font-medium text-gray-700">Cancelled</span>
                            </div>
                        </div>
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
