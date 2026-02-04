/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LawJournalModal from "@/components/admin/lawJournalModal";
import AdminLayout from "@/components/admin/layout";
import { asignLawJournal, deleteLowJournal, getAllLowJournal, getUserAllLowJournal } from "@/service/LawJournal";
import { getAllSpeakers } from "@/service/Speaker";
import {
    Calendar,
    Edit,
    Eye,
    PanelBottomOpenIcon,
    Plus,
    Search,
    Trash2,
    GitCommit,
    UserPen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Speaker } from './../../../../../components/admin/conferenceModal';
import StatusControl, { JournalStatus } from "@/components/admin/StatusControl";
import { useUser } from "@/Context/UserContext";
import { getAllUsers } from "@/service/AuthService";
import AssignReviewerModal from "@/components/admin/JournalAsignModal";
import toast from "react-hot-toast";
import { User } from "@/lib/auth";
import CommentAssignModal from "@/components/admin/CommentAssignModal";
import { getSingleJournalReview, submitJournalComment } from "@/service/Reviewer";

export interface LawItem {
    id: number;
    title: string;
    description: string;
    abstract: string;
    speaker: Speaker;
    keywords: string[];
    comment?: string;
    user?: User;
    admin_comment?: string[];
    downloadUrl?: string;
    externalUrl?: string;
    status?: JournalStatus;
    category?: string;
    speaker_id: string;
    created_at?: Date;
}


export default function LawPage() {

    const { user: currentUser } = useUser();
    const [lawJournals, setLawJournal] = useState<LawItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        mode: "add" | "edit" | "preview";
        LawJournal?: LawItem;
    }>({
        isOpen: false,
        mode: "add",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [speakers, setSpeakers] = useState<LawItem[]>([]);
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [commentAssignModalOpen, setCommentAssignModalOpen] = useState(false);
    const [selectedJournal, setSelectedJournal] = useState<any>(null);
    const [reviewers, setReviewers] = useState<any[]>([]);
    const [journalreview, setJournalReview] = useState<any[]>([]);


    const handleEditLawJournal = (LawJournal: LawItem) => {
        setModalState({
            isOpen: true,
            mode: "edit",
            LawJournal,
        });
    };

    const handlePreviewLawJournal = (LawJournal: LawItem) => {
        setModalState({
            isOpen: true,
            mode: "preview",
            LawJournal,
        });
    };
    const handleLawJournal = () => {
        setModalState({
            isOpen: true,
            mode: "add",
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

    //load all LawJournal----------------
    const loadLawJournal = async () => {
        const data = await getUserAllLowJournal(searchTerm, currentPage, perPage);
        console.log("LawJournal loaded:", data?.data);

        if (data?.data?.data) {
            setLawJournal(data.data.data);
            setLastPage(data.data.last_page);
            setCurrentPage(data.data.current_page);
            setTotal(data.data.total);
            setPerPage(data.data.per_page);

        } else {
            setLawJournal([]);

        }
    };
    //load all LawJournal----------------
    const loadAllUsers = async () => {
        const data = await getAllUsers();
        console.log("Users loaded:", data?.data);
        if (data?.data) {
            setReviewers(data.data);

        }
    };



    useEffect(() => {
        loadLawJournal();

    }, [searchTerm, selectedStatus, currentPage, perPage]);

    useEffect(() => {

        loadAllUsers();

    }, []);


    //delete LowJournal ===================
    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this journal?");
        if (!confirmDelete) return;

        const res = await deleteLowJournal(id);
        if (res?.status === 200) {
            toast.success("Journal deleted successfully!");
            loadLawJournal(); // Refresh the list
        } else {
            toast.error("Failed to delete journal.");
        }
    };

    //handle assign reviewer===================
    const handleAssignReviewer = async (reviewerId: string) => {
        if (!selectedJournal) return;
        const formData = new FormData();
        formData.append("reviewer_id", reviewerId);
        formData.append("law_journal_id", selectedJournal.id.toString());
        const res = await asignLawJournal(formData);
        if (res?.status === 200) {
            toast.success("Reviewer assigned successfully!");
            setAssignModalOpen(false);
            loadLawJournal(); // Refresh the list
        } else {
            toast.error("Failed to assign reviewer.");
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
                                Law Journal Management
                            </h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full"></div>
                        </div>
                        <p className="text-gray-600">Manage your law journal submissions</p>
                    </div>
                    <button
                        onClick={handleLawJournal}
                        className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-900/30 hover:shadow-xl transition-all"
                    >
                        <Plus className="h-5 w-5" />
                        Add Law Journal
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search law journals..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Law Journals Table */}
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
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                        Category
                                    </th>
                                    {/* <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                        Date
                                    </th> */}
                                    <th className="px-6 py-4 text-center text-sm font-bold text-white">
                                        Actions
                                    </th>
                                    {currentUser?.role === "admin" && (
                                        <th className="px-6 py-4 text-center text-sm font-bold text-white">
                                            Assign
                                        </th>
                                    )}
                                    {currentUser?.role === "admin" && (
                                        <th className="px-6 py-4 text-center text-sm font-bold text-white">
                                            Comment
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {lawJournals?.map((journal) => (
                                    <tr key={journal.id} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-gray-900">
                                                {journal.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                    {journal.user?.name?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {journal.user?.name || 'N/A'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {journal.status && currentUser?.role ? (
                                                <StatusControl
                                                    status={journal.status ?? "draft"}
                                                    journalId={journal.id}
                                                    userRole={currentUser?.role}
                                                    loadLawjournal={loadLawJournal}
                                                />
                                            ) : ("")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold border border-blue-200">
                                                {journal.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                {journal?.created_at && (
                                                    <span>{new Date(journal.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}</span>
                                                )}
                                            </div>
                                        </td> */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEditLawJournal(journal)}
                                                    className="p-2 text-blue-600 hover:text-white hover:bg-blue-900 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handlePreviewLawJournal(journal)}
                                                    className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all"
                                                    title="Preview"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(journal.id)}
                                                    className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                        {currentUser?.role === "admin" && (
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button
                                                    onClick={() => {
                                                        setSelectedJournal(journal);
                                                        setAssignModalOpen(true);
                                                    }}
                                                    className="p-2 text-indigo-600 hover:text-white hover:bg-indigo-900 rounded-lg transition-all inline-flex items-center justify-center"
                                                    title="Assign Reviewer"
                                                >
                                                    <PanelBottomOpenIcon className="h-6 w-6" />
                                                </button>
                                            </td>
                                        )}
                                        {currentUser?.role === "admin" && (
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button
                                                    onClick={() => {
                                                        setSelectedJournal(journal);
                                                        setCommentAssignModalOpen(true);
                                                    }}
                                                    className="p-2 text-blue-600 hover:text-white hover:bg-blue-900 rounded-lg transition-all inline-flex items-center justify-center"
                                                    title="Add Comment"
                                                >
                                                    <GitCommit className="h-7 w-7" />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <AssignReviewerModal
                            open={assignModalOpen}
                            onClose={() => setAssignModalOpen(false)}
                            journalTitle={selectedJournal?.title}
                            reviewers={reviewers}
                            onAssign={(reviewerId) => {
                                handleAssignReviewer(reviewerId.toString());
                                setAssignModalOpen(false);
                            }}
                        />
                        <CommentAssignModal
                            open={commentAssignModalOpen}
                            onClose={() => setCommentAssignModalOpen(false)}
                            journal={selectedJournal}
                            reviews={journalreview}
                        />
                    </div>
                </div>

                {/* Pagination */}
                {lawJournals.length > 0 && (
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
                {lawJournals?.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center py-16">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                <Search className="h-10 w-10 text-gray-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No law journals found</h3>
                                <p className="text-gray-600 mb-6">
                                    Try adjusting your search criteria, or add a new law journal
                                </p>
                                <button
                                    onClick={handleLawJournal}
                                    className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-900/30 transition-all"
                                >
                                    <Plus className="h-5 w-5" />
                                    Add First Journal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Law Journal Modal */}
            <LawJournalModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                mode={modalState.mode}
                article={modalState.LawJournal}
                loadLawJournal={loadLawJournal}
                speakers={speakers}
            />
        </AdminLayout>
    );
}