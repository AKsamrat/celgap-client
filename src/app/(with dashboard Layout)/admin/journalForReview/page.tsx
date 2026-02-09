"use client"
import AdminLayout from '@/components/admin/layout';
import { useUser } from '@/Context/UserContext';
import { getAllLowJournalForReview } from '@/service/ReviewJournal';
import { JournalAssignment } from '@/types/Journal Reviewer';
import { Calendar, Eye, Plus, Search, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { LawItem } from '../publications/Law-Journal/page';
import ReviewJournalModal from '@/components/admin/ReviewJournalModal';


const JournalForReview = () => {
    const { user: currentUser } = useUser();
    const [reviewerLawJournals, setReviewersLawJournal] = useState<JournalAssignment[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        mode: "add" | "edit" | "preview";
        LawJournal?: JournalAssignment;
    }>({
        isOpen: false,
        mode: "add",
    });

    const handlePreviewLawJournal = (LawJournal: JournalAssignment) => {
        setModalState({
            isOpen: true,
            mode: "preview",
            LawJournal,
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            mode: "add",
        });
    };

    //load LawJournals
    const loadLawJournal = async () => {

        const data = await getAllLowJournalForReview(searchTerm, currentPage, perPage);
        if (data?.data) {
            setReviewersLawJournal(data?.data);
            // setLastPage(data.data.last_page);
            // setCurrentPage(data.data.current_page);
            // setTotal(data.data.total);
            // setPerPage(data.data.per_page);

        } else {
            // setLawJournal([]);
        }
    };

    useEffect(() => {
        loadLawJournal();

    }, [searchTerm, currentPage, perPage]);
    console.log("LawJournal reviewers:", reviewerLawJournals);
    return (
        <>
            <div className='p-2 space-y-6'>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Law Journal Review Management
                            </h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full"></div>
                        </div>
                        <p className="text-gray-600">Manage and review law journal submissions</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex justify-end">
                    <div className="w-full md:w-96 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search journal articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                        />
                    </div>
                </div>

                {/* Law Journal Table */}
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
                                    {currentUser?.role === "admin" && (
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                            Reviewer
                                        </th>
                                    )}
                                    {currentUser?.role === "admin" && (
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                            Status
                                        </th>
                                    )}
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-white">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {reviewerLawJournals?.map((journal) => (
                                    <tr key={journal.id} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {journal?.journal?.title}
                                                </div>
                                                {/* <div className="text-sm text-gray-500 mt-1">
                                                    {journal?.journal?.description?.length > 50
                                                        ? journal.journal.description.slice(0, 50) + "..."
                                                        : journal.journal.description}
                                                </div> */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                    {journal?.journal?.user?.name?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {journal?.journal?.user?.name || 'N/A'}
                                                </span>
                                            </div>
                                        </td>

                                        {currentUser?.role === "admin" && (
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    {journal?.reviewer?.name ? (
                                                        <>
                                                            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                                {journal?.reviewer?.name?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {journal?.reviewer?.name}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">Not assigned</span>
                                                    )}
                                                </div>
                                            </td>
                                        )}

                                        {currentUser?.role === "admin" && (
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {(() => {
                                                    const status = journal?.status?.toLowerCase();
                                                    const getStatusStyle = () => {
                                                        switch (status) {
                                                            case 'approved':
                                                            case 'published':
                                                            case 'completed':
                                                                return {
                                                                    bg: 'bg-green-50 text-green-900 border-green-200',
                                                                    dot: 'bg-green-600'
                                                                };
                                                            case 'pending':
                                                            case 'in_review':
                                                            case 'reviewing':
                                                                return {
                                                                    bg: 'bg-yellow-50 text-yellow-900 border-yellow-200',
                                                                    dot: 'bg-yellow-600'
                                                                };
                                                            case 'rejected':
                                                            case 'declined':
                                                                return {
                                                                    bg: 'bg-red-50 text-red-900 border-red-200',
                                                                    dot: 'bg-red-600'
                                                                };
                                                            case 'draft':
                                                                return {
                                                                    bg: 'bg-gray-50 text-gray-900 border-gray-200',
                                                                    dot: 'bg-gray-600'
                                                                };
                                                            case 'revision_required':
                                                            case 'under_revision':
                                                            case 'revising':
                                                                return {
                                                                    bg: 'bg-orange-50 text-orange-900 border-orange-200',
                                                                    dot: 'bg-orange-600'
                                                                };
                                                            default:
                                                                return {
                                                                    bg: 'bg-blue-50 text-blue-900 border-blue-200',
                                                                    dot: 'bg-blue-600'
                                                                };
                                                        }
                                                    };
                                                    const { bg, dot } = getStatusStyle();
                                                    return (
                                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border-2 ${bg}`}>
                                                            <span className={`w-2 h-2 rounded-full mr-2 ${dot}`}></span>
                                                            {journal?.status ? String(journal.status).replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A'}
                                                        </span>
                                                    );
                                                })()}
                                            </td>
                                        )}

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold border border-blue-200">
                                                {journal?.journal.category || 'Uncategorized'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                {new Date(journal.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handlePreviewLawJournal(journal)}
                                                className="p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all inline-flex items-center justify-center"
                                                title="Preview Journal"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Empty State */}
                {reviewerLawJournals?.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center py-16">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                <Search className="h-10 w-10 text-gray-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No journals found</h3>
                                <p className="text-gray-600">
                                    No law journal submissions match your search criteria
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Status Legend (Optional - for admin view) */}
                {currentUser?.role === "admin" && reviewerLawJournals?.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-100 p-5">
                        <h4 className="text-sm font-bold text-gray-900 mb-3">Status Legend</h4>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-600"></span>
                                <span className="text-xs font-medium text-gray-700">Approved/Published</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-yellow-600"></span>
                                <span className="text-xs font-medium text-gray-700">Pending/In Review</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-orange-600"></span>
                                <span className="text-xs font-medium text-gray-700">Revision Required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-600"></span>
                                <span className="text-xs font-medium text-gray-700">Rejected/Declined</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-gray-600"></span>
                                <span className="text-xs font-medium text-gray-700">Draft</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ReviewJournalModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                mode={modalState.mode}
                article={modalState.LawJournal}
                // onSave={handleSaveArticle}
                loadLawJournal={loadLawJournal}

            />
        </>
    )
}

export default JournalForReview
