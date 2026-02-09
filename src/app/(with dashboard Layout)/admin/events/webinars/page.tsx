"use client";

import AdminLayout from "@/components/admin/layout";
import WebinarsModal from "@/components/admin/WebinarsModal";

import { getAllSpeakers } from "@/service/Speaker";
import { deleteWebinars, getAllWebinars } from "@/service/webinar";
import { Speaker, Webinar } from "@/types";
import {
    Calendar,
    Clock,
    DollarSign,
    Edit,
    Eye,
    MapPin,
    Plus,
    Search,
    Trash2,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminPrograms() {
    const [webinars, setWebinars] = useState<Webinar[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        mode: "add" | "edit" | "preview";
        webinar?: Webinar;
    }>({
        isOpen: false,
        mode: "add",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [speakers, setSpeakers] = useState<Speaker[]>([]);

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

    const handleEditSpeaker = (webinar: Webinar) => {
        setModalState({
            isOpen: true,
            mode: "edit",
            webinar,
        });
    };

    const handlePreviewSpeaker = (webinar: Webinar) => {
        setModalState({
            isOpen: true,
            mode: "preview",
            webinar,
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

    //load all ConferenceAndSeminer----------------
    const loadWebinars = async () => {
        const data = await getAllWebinars(searchTerm, currentPage, perPage);
        console.log("webinars loaded:", data?.data);
        if (data?.data?.data) {
            setWebinars(data.data.data);
            setLastPage(data.data.last_page);
            setCurrentPage(data.data.current_page);
            setTotal(data.data.total);
            setPerPage(data.data.per_page);

        } else {
            setWebinars([]);
        }
    };

    useEffect(() => {
        loadWebinars();

    }, [searchTerm, selectedStatus, currentPage, perPage]);


    //delete ConferenceAndSeminer ===================
    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        const res = await deleteWebinars(id);
        if (res?.status === 200) {
            alert("Webinars deleted successfully!");
            loadWebinars(); // Refresh the list
        } else {
            alert("Failed to delete Webinars.");
        }
    };


    return (
        <>
            <div className="p-2 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Webinar Management
                            </h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full"></div>
                        </div>
                        <p className="text-gray-600">Manage your online webinar programs</p>
                    </div>
                    <button
                        onClick={handleAddPost}
                        className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-900/30 hover:shadow-xl transition-all"
                    >
                        <Plus className="h-5 w-5" />
                        Add Webinar
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search webinars..."
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
                            <option value="upcoming">Upcoming</option>
                            <option value="registration-open">Registration Open</option>
                            <option value="full">Full</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                {/* Webinars Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                        Program
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                        Schedule
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                        Enrollment
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                        Price
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {webinars.map((webinar) => (
                                    <tr key={webinar.id} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900 mb-1">
                                                    {webinar.title}
                                                </div>
                                                <div className="text-sm text-gray-600 mb-2">
                                                    {webinar.description?.length > 80
                                                        ? webinar.description.slice(0, 80) + "..."
                                                        : webinar.description}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                        {webinar.speaker_id?.charAt(0)?.toUpperCase() || 'I'}
                                                    </div>
                                                    <span>Instructor: {webinar.speaker_id || 'TBA'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    {new Date(webinar.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                    {webinar.time}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <MapPin className="h-4 w-4 text-gray-400" />
                                                    {webinar.platform}
                                                </div>
                                                <div className="text-xs text-gray-500 pl-6">
                                                    Duration: {webinar.duration}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <Users className="h-5 w-5 text-blue-900" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">
                                                        {webinar.attendees}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Enrolled</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-5 w-5 text-green-600" />
                                                <span className="text-lg font-bold text-gray-900">
                                                    {webinar.price}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {(() => {
                                                const status = webinar.status?.toLowerCase();
                                                const getStatusStyle = () => {
                                                    switch (status) {
                                                        case 'upcoming':
                                                        case 'scheduled':
                                                            return {
                                                                bg: 'bg-blue-50 text-blue-900 border-blue-200',
                                                                dot: 'bg-blue-600'
                                                            };
                                                        case 'registration-open':
                                                        case 'registration_open':
                                                        case 'open':
                                                            return {
                                                                bg: 'bg-green-50 text-green-900 border-green-200',
                                                                dot: 'bg-green-600'
                                                            };
                                                        case 'full':
                                                        case 'sold-out':
                                                        case 'sold_out':
                                                            return {
                                                                bg: 'bg-orange-50 text-orange-900 border-orange-200',
                                                                dot: 'bg-orange-600'
                                                            };
                                                        case 'completed':
                                                        case 'ended':
                                                        case 'finished':
                                                            return {
                                                                bg: 'bg-purple-50 text-purple-900 border-purple-200',
                                                                dot: 'bg-purple-600'
                                                            };
                                                        case 'live':
                                                        case 'ongoing':
                                                            return {
                                                                bg: 'bg-red-50 text-red-900 border-red-200',
                                                                dot: 'bg-red-600 animate-pulse'
                                                            };
                                                        case 'cancelled':
                                                        case 'canceled':
                                                            return {
                                                                bg: 'bg-gray-50 text-gray-900 border-gray-200',
                                                                dot: 'bg-gray-600'
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
                                                        {webinar.status.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                    </span>
                                                );
                                            })()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEditSpeaker(webinar)}
                                                    className="p-2 text-blue-600 hover:text-white hover:bg-blue-900 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handlePreviewSpeaker(webinar)}
                                                    className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all"
                                                    title="Preview"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(webinar.id)}
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
                {webinars.length > 0 && (
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
                {webinars.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center py-16">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                <Search className="h-10 w-10 text-gray-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No webinars found</h3>
                                <p className="text-gray-600 mb-6">
                                    Try adjusting your search or filter criteria, or add a new webinar
                                </p>
                                <button
                                    onClick={handleAddPost}
                                    className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-900/30 transition-all"
                                >
                                    <Plus className="h-5 w-5" />
                                    Add First Webinar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Status Legend */}
                {webinars.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-100 p-5">
                        <h4 className="text-sm font-bold text-gray-900 mb-3">Status Legend</h4>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                                <span className="text-xs font-medium text-gray-700">Registration Open</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                                <span className="text-xs font-medium text-gray-700">Upcoming/Scheduled</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
                                <span className="text-xs font-medium text-gray-700">Live/Ongoing</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-orange-600"></span>
                                <span className="text-xs font-medium text-gray-700">Full/Sold Out</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                                <span className="text-xs font-medium text-gray-700">Completed/Finished</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-gray-600"></span>
                                <span className="text-xs font-medium text-gray-700">Cancelled</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Webinars Modal */}
            <WebinarsModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                mode={modalState.mode}
                webinar={modalState.webinar}
                loadWebinar={loadWebinars}
                speakers={speakers}

            />
        </>
    );
}
