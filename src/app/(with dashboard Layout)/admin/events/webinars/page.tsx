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
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Webinar Management
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Manage your Webinars
                        </p>
                    </div>
                    <button
                        onClick={handleAddPost}
                        className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors duration-200"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Webinar
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search programs..."
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
                            <option value="upcoming">Upcoming</option>
                            <option value="registration-open">Registration Open</option>
                            <option value="full">Full</option>
                            <option value="completed">Completed</option>
                        </select>

                    </div>
                </div>

                {/* Programs Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Program
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Schedule
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Enrollment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {webinars.map((webinar) => (
                                    <tr key={webinar.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {webinar.title}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    {webinar.description}
                                                </div>

                                                <div className="text-xs text-gray-400 mt-1">
                                                    Instructor: {webinar.speaker_id}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <div className="flex items-center mb-1">
                                                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                                    {new Date(webinar.date).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center mb-1">
                                                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                                    {webinar.time}
                                                </div>
                                                <div className="flex items-center mb-1">
                                                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                                                    {webinar.platform}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Duration: {webinar.duration}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 text-gray-400 mr-2" />
                                                <div>
                                                    <div className="text-sm text-gray-900">
                                                        {webinar.attendees}
                                                    </div>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                                                <span className="text-sm font-medium text-gray-900">
                                                    {webinar.price}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                    webinar.status
                                                )}`}
                                            >
                                                {webinar.status.replace("-", " ")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditSpeaker(webinar)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handlePreviewSpeaker(webinar)}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(webinar.id)}
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
                {webinars.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No programs found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}

            </div>
            {/* Pagination */}
            {webinars.length > 0 && (
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

            {/* Webinars Modal */}
            <WebinarsModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                mode={modalState.mode}
                webinar={modalState.webinar}
                loadWebinar={loadWebinars}
                speakers={speakers}

            />
        </AdminLayout>
    );
}
