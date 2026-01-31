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
        <AdminLayout>
            <div className='space-y-3'>
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Law Journal Review Management
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Manage Your law Journal
                        </p>
                    </div>
                    {/* <button
                        onClick={handleLawJournal}
                        className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors duration-200"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Law Journal
                    </button> */}
                </div>
                {/* Filters */}
                <div className="flex justify-end ">
                    <div className="flex flex-col md:flex-row gap-4 w-96">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search news articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                            />
                        </div>


                    </div>
                </div>
                {/* News Articles Table 01630188829*/}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Author
                                    </th>
                                    {
                                        currentUser?.role === "admin" && (
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Reviewer
                                            </th>
                                        )
                                    }
                                    {
                                        currentUser?.role === "admin" && (
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                        )
                                    }

                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>



                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reviewerLawJournals?.map((journal) => (
                                    <tr key={journal.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 flex items-center">

                                                    {journal?.journal?.title}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    {journal?.journal?.description?.length > 50
                                                        ? journal.journal.description.slice(0, 30) + "..."
                                                        : journal.journal.description}
                                                </div>

                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <User className="h-4 w-4 text-gray-400 mr-2" />
                                                <span className="text-sm text-gray-900">
                                                    {journal?.journal?.user?.name || 'N/A'}
                                                </span>
                                            </div>
                                        </td>

                                        {currentUser?.role === "admin" && (

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">

                                                    <span className="text-sm text-gray-900">
                                                        {journal?.reviewer?.name || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                        )}
                                        {currentUser?.role === "admin" && (

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">

                                                    <span className="text-sm text-gray-900">
                                                        {journal?.status || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                        )}

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">

                                                <span className="text-sm text-gray-900">
                                                    {journal?.journal.category || 'N/A'}
                                                </span>
                                            </div>
                                        </td>


                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                                <span className="text-sm text-gray-900">
                                                    {new Date(journal.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="items-center px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handlePreviewLawJournal(journal)}
                                                className="text-green-600 hover:text-green-900"
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

            </div>
            <ReviewJournalModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                mode={modalState.mode}
                article={modalState.LawJournal}
                // onSave={handleSaveArticle}
                loadLawJournal={loadLawJournal}

            />
        </AdminLayout>
    )
}

export default JournalForReview
