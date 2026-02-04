/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Eye,
    Trash2,
    Mail,
    Calendar,
    Download,
    X,
    CheckCircle,
    UserCheck,
    Send,
} from "lucide-react";
import { deleteNewsletter, getAllNewsletter } from "@/service/Newsletter";
import AdminLayout from "@/components/admin/layout";
import { toast } from "react-hot-toast";

interface NewsletterSubscriber {
    id: number;
    email: string;
    subscribed_at: Date;
    is_active: boolean;
    source?: string;
}

export default function NewsletterPage() {
    const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedSubscriber, setSelectedSubscriber] = useState<NewsletterSubscriber | null>(null);

    // Load subscribers function (replace with your API call)
    const loadSubscribers = async () => {
        setLoading(true);

        const res = await getAllNewsletter()

        console.log(res)
        // Replace this with your actual API call
        // const response = await fetch(`/api/newsletter?search=${searchTerm}&status=${selectedStatus}&page=${currentPage}&per_page=${perPage}`);
        // const data = await response.json();

        // Mock data for demonstration


        setSubscribers(res?.data?.data);
        setTotal(res?.data?.data.length);
        setActiveCount(res?.data?.data.filter((s: any) => s.status === 'active').length);
        setLastPage(Math.ceil(res?.data?.data.length / perPage));
        setLoading(false);
    };

    useEffect(() => {
        loadSubscribers();
    }, [searchTerm, selectedStatus, currentPage, perPage]);

    const handleViewSubscriber = (subscriber: NewsletterSubscriber) => {
        setSelectedSubscriber(subscriber);
        setViewModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this subscriber?");
        if (!confirmDelete) return;
        await deleteNewsletter(id)
        // Replace with your delete API call
        // await deleteSubscriber(id);

        toast.success("Subscriber deleted successfully!");
        loadSubscribers();
    };

    const handleExport = () => {
        // Export subscribers to CSV
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Email,Status,Subscribed Date\n"
            + subscribers.map(s =>
                `${s.email},${s.is_active},${new Date(s.subscribed_at).toLocaleDateString()} || 'N/A'}`
            ).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusColor = (status: boolean) => {
        switch (status) {
            case true:
                return "bg-green-50 text-green-900 border-green-200";
            case false:
                return "bg-gray-50 text-gray-900 border-gray-200";
            default:
                return "bg-blue-50 text-blue-900 border-blue-200";
        }
    };

    const getStatusIcon = (status: boolean) => {
        switch (status) {
            case true:
                return <CheckCircle className="w-3 h-3" />;
            case false:
                return <X className="w-3 h-3" />;
            default:
                return <Mail className="w-3 h-3" />;
        }
    };

    return (
        <AdminLayout>

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold text-gray-900">Newsletter Subscribers</h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full"></div>
                        </div>
                        <p className="text-gray-600">Manage your newsletter subscription list</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-xl border border-green-200">
                            <UserCheck className="w-5 h-5 text-green-900" />
                            <div>
                                <p className="text-xs text-green-700 font-medium">Active</p>
                                <p className="text-2xl font-bold text-green-900">{activeCount}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-200">
                            <Mail className="w-5 h-5 text-blue-900" />
                            <div>
                                <p className="text-xs text-blue-700 font-medium">Total</p>
                                <p className="text-2xl font-bold text-blue-900">{total}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters & Actions */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search by email..."
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
                            <option value="true">Active</option>
                            <option value="false">Unsubscribed</option>
                        </select>
                        <button
                            onClick={handleExport}
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-green-600/30 transition-all"
                        >
                            <Download className="h-5 w-5" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Subscribers Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Status</th>

                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Subscribed Date</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-12">
                                            <div className="flex flex-col items-center gap-3">
                                                <svg className="animate-spin h-8 w-8 text-blue-900" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                <span className="text-gray-500 font-medium">Loading subscribers...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : subscribers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-12">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <Mail className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <span className="text-gray-500 font-medium">No subscribers found</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    subscribers.map((subscriber) => (
                                        <tr key={subscriber.id} className="hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                        <Mail className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900">{subscriber.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border-2 ${getStatusColor(subscriber.is_active)}`}>
                                                    {getStatusIcon(subscriber?.is_active)}
                                                    {subscriber.is_active === true ? "Active" : "Unsubscribed"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    {new Date(subscriber.subscribed_at).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleViewSubscriber(subscriber)}
                                                        className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all"
                                                        title="View"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(subscriber.id)}
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
                {subscribers.length > 0 && (
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
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
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

                {/* View Subscriber Modal */}
                {viewModalOpen && selectedSubscriber && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                            <Eye className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">Subscriber Details</h2>
                                            <p className="text-blue-200 text-xs mt-0.5">Newsletter subscription information</p>
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
                            <div className="p-6 space-y-6">
                                {/* Email */}
                                <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-900">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Mail className="w-5 h-5 text-blue-900" />
                                        <span className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Email Address</span>
                                    </div>
                                    <p className="text-lg font-bold text-gray-900">{selectedSubscriber.email}</p>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="w-4 h-4 text-green-900" />
                                            <span className="text-xs font-semibold text-green-900 uppercase">Status</span>
                                        </div>
                                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border-2 ${getStatusColor(selectedSubscriber.is_active)}`}>
                                            {getStatusIcon(selectedSubscriber.is_active)}
                                            {selectedSubscriber.is_active ? "Active" : "Unsubscribed"}
                                        </span>
                                    </div>

                                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Send className="w-4 h-4 text-purple-900" />
                                            <span className="text-xs font-semibold text-purple-900 uppercase">Source</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{selectedSubscriber.source || 'N/A'}</p>
                                    </div>

                                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 md:col-span-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-4 h-4 text-orange-900" />
                                            <span className="text-xs font-semibold text-orange-900 uppercase">Subscribed Date</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {new Date(selectedSubscriber.subscribed_at).toLocaleDateString("en-US", {
                                                weekday: 'long',
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Subscription Duration */}
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-gray-700 uppercase">Subscription Duration</span>
                                        <span className="text-sm font-bold text-blue-900">
                                            {Math.floor((new Date().getTime() - new Date(selectedSubscriber.subscribed_at).getTime()) / (1000 * 60 * 60 * 24))} days
                                        </span>
                                    </div>
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
                                        handleDelete(selectedSubscriber.id);
                                        setViewModalOpen(false);
                                    }}
                                    className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-bold flex items-center gap-2 shadow-lg"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete Subscriber
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}