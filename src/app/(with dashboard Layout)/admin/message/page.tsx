/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Eye,
    Trash2,
    Mail,
    Phone,
    User,
    MessageSquare,
    Calendar,
    Filter,
    X,
} from "lucide-react";
import AdminLayout from "@/components/admin/layout";
import { deleteContact, getAllContact } from "@/service/Contact";
import toast from "react-hot-toast";

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string;
    enquiry_type: string;
    subject: string;
    message: string;
    created_at: Date;
}

export default function ContactMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEnquiryType, setSelectedEnquiryType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

    // Load messages function (replace with your API call)
    const loadMessages = async () => {
        setLoading(true);
        // Replace this with your actual API call
        // const response = await fetch(`/api/contacts?search=${searchTerm}&type=${selectedEnquiryType}&page=${currentPage}&per_page=${perPage}`);
        const data = await getAllContact(searchTerm, selectedEnquiryType, currentPage, perPage);

        console.log("contact", data?.data?.data)

        setMessages(data?.data?.data);
        setTotal(data?.data?.data.length);
        setLastPage(Math.ceil(data?.data?.data.length / perPage));
        setLoading(false);
    };

    useEffect(() => {
        loadMessages();
    }, [searchTerm, selectedEnquiryType, currentPage, perPage]);

    const handleViewMessage = (message: ContactMessage) => {
        setSelectedMessage(message);
        setViewModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this message?");
        if (!confirmDelete) return;
        await deleteContact(id);
        // Replace with your delete API call
        // await deleteContact(id);

        toast.success("Message deleted successfully!");
        loadMessages();
    };

    const getEnquiryTypeColor = (type: string) => {
        switch (type) {
            case "general":
                return "bg-blue-50 text-blue-900 border-blue-200";
            case "legal":
                return "bg-green-50 text-green-900 border-green-200";
            case "partnership":
                return "bg-red-50 text-red-900 border-red-200";
            case "media":
                return "bg-purple-50 text-purple-900 border-purple-200";
            default:
                return "bg-gray-50 text-gray-900 border-gray-200";
        }
    };

    return (
        <AdminLayout>

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold text-gray-900">Contact Messages</h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full"></div>
                        </div>
                        <p className="text-gray-600">View and manage contact form submissions</p>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-200">
                        <MessageSquare className="w-5 h-5 text-blue-900" />
                        <div>
                            <p className="text-xs text-blue-700 font-medium">Total Messages</p>
                            <p className="text-2xl font-bold text-blue-900">{total}</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or subject..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-400" />
                            <select
                                value={selectedEnquiryType}
                                onChange={(e) => setSelectedEnquiryType(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all font-medium bg-white"
                            >
                                <option value="all">All Types</option>
                                <option value="general">General</option>
                                <option value="legal">Legal</option>
                                <option value="partnership">Partnership</option>
                                <option value="media">Media</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Messages Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Contact Info</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Enquiry Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Date</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12">
                                            <div className="flex flex-col items-center gap-3">
                                                <svg className="animate-spin h-8 w-8 text-blue-900" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                <span className="text-gray-500 font-medium">Loading messages...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : messages.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <MessageSquare className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <span className="text-gray-500 font-medium">No messages found</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    messages?.map((message) => (
                                        <tr key={message.id} className="hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                            {message.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <User className="w-3 h-3 text-gray-400" />
                                                                <span className="text-sm font-semibold text-gray-900">{message.name}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600 ml-10">
                                                        <Mail className="w-3 h-3" />
                                                        <span>{message.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600 ml-10">
                                                        <Phone className="w-3 h-3" />
                                                        <span>{message.phone}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border-2 ${getEnquiryTypeColor(message?.enquiry_type)}`}>
                                                    {message?.enquiry_type?.charAt(0).toUpperCase() + message?.enquiry_type?.slice(1)}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    {new Date(message.created_at).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleViewMessage(message)}
                                                        className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all"
                                                        title="View"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(message.id)}
                                                        className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {messages.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-600">
                                Showing <strong className="text-blue-900">{(currentPage - 1) * perPage + 1}</strong> to{" "}
                                <strong className="text-blue-900">{Math.min(currentPage * perPage, total)}</strong> of{" "}
                                <strong className="text-blue-900">{total}</strong> results
                            </div>

                            <div className="flex items-center gap-3">
                                <label htmlFor="perPage" className="text-sm font-medium text-gray-600">
                                    Show:
                                </label>
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
                                    <option value={50}>50</option>
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

                {/* View Message Modal */}
                {viewModalOpen && selectedMessage && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                            <Eye className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">Message Details</h2>
                                            <p className="text-blue-200 text-xs mt-0.5">Contact form submission</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setViewModalOpen(false)}
                                        className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
                                {/* Contact Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <User className="w-4 h-4 text-blue-900" />
                                            <span className="text-xs font-semibold text-blue-900 uppercase">Name</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{selectedMessage.name}</p>
                                    </div>

                                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Mail className="w-4 h-4 text-green-900" />
                                            <span className="text-xs font-semibold text-green-900 uppercase">Email</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{selectedMessage.email}</p>
                                    </div>

                                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Phone className="w-4 h-4 text-purple-900" />
                                            <span className="text-xs font-semibold text-purple-900 uppercase">Phone</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{selectedMessage.phone}</p>
                                    </div>

                                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-4 h-4 text-orange-900" />
                                            <span className="text-xs font-semibold text-orange-900 uppercase">Date</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {new Date(selectedMessage.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Enquiry Type */}
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Filter className="w-4 h-4 text-gray-700" />
                                        <span className="text-xs font-semibold text-gray-700 uppercase">Enquiry Type</span>
                                    </div>
                                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border-2 ${getEnquiryTypeColor(selectedMessage?.enquiry_type)}`}>
                                        {selectedMessage?.enquiry_type?.charAt(0).toUpperCase() + selectedMessage?.enquiry_type?.slice(1)}
                                    </span>
                                </div>

                                {/* Subject */}
                                <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-900">
                                    <h3 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">Subject</h3>
                                    <p className="text-gray-900 font-semibold">{selectedMessage?.subject}</p>
                                </div>

                                {/* Message */}
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Message</h3>
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedMessage?.message}</p>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-200">
                                <button
                                    onClick={() => setViewModalOpen(false)}
                                    className="px-5 py-2.5 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        handleDelete(selectedMessage?.id);
                                        setViewModalOpen(false);
                                    }}
                                    className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-bold flex items-center gap-2 shadow-lg"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete Message
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}