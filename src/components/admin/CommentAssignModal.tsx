/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { LawItem } from "@/app/(with dashboard Layout)/admin/publications/Law-Journal/page";
import { provideCommentToLawJournal } from "@/service/LawJournal";
import { getSingleJournalReview } from "@/service/Reviewer";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Reviews {
    id: number;
    comment: string;
    reviewer: {
        id: number;
        name: string;
    };
}

interface Props {
    open: boolean;
    onClose: () => void;
    journal: LawItem;
    reviews: Reviews[];
    // onAssign: (reviewerId: number) => void;
}

export default function CommentAssignModal({
    open,
    onClose,
    journal,
    reviews,
    // onAssign,
}: Props) {
    const [selectedReviewer, setSelectedReviewer] = useState<number | null>(null);
    const [journalreview, setJournalReview] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        comment: journal?.comment || "",

    });

    // useEffect(() => {
    //     setFormData({
    //         comment: journal.comment || "",
    //     });

    // }, []);

    //create news
    const resetForm = () => {
        setFormData({
            comment: "",


        });
    };

    //load journal review
    const loadSingleJournalReviews = async () => {
        const data = await getSingleJournalReview(journal.id.toString());
        console.log("Journal review loaded:", data);
        if (data && Array.isArray(data)) {
            setJournalReview(data);

        }
    };
    useEffect(() => {

        loadSingleJournalReviews();

    }, [open]);

    const handleChange = (e: any) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("admin_comment", formData.comment);


        for (const [key, value] of data.entries()) {
            console.log(key, value);
        }


        if (!journal?.id) return;

        const res = await provideCommentToLawJournal(data, journal.id);
        // data.append("_method", "POST");

        console.log("Updating news with ID:", data);


        if (res?.status === 200 || res?.status === 201) {
            // loadLawJournal();
            onClose();
            resetForm();
            toast.success(" Comment Send to Author successfully!");
        } else {
            console.log("Error saving news:", res.message);
        }
    };


    if (!open) return null;

    console.log('Journal:', journal);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-0 relative max-h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 px-6 py-5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Provide Instruction to Author</h2>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <p className="text-sm text-gray-600 mb-4">
                        Journal: <span className="font-semibold text-blue-900">{journal?.title}</span>
                    </p>

                    {
                        journalreview && (
                            journalreview.map((review: Reviews) => (
                                <div key={review.id} className="mb-4 p-4 border-2 border-gray-100 rounded-xl bg-gradient-to-br from-white to-gray-50 hover:border-blue-200 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                            {review.reviewer?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <p className="font-bold text-gray-900">{review.reviewer?.name}</p>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed pl-11">{review.comment}</p>
                                </div>
                            ))
                        )
                    }

                    {/* Add / Update Comment */}
                    <form onSubmit={handleSubmit}>
                        <textarea
                            rows={5}
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            placeholder="Write your comment about this journal..."
                            className="w-full p-4 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all resize-none"
                        />

                        {/* Actions */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                // onClick={() => onAssign(selectedReviewer!)}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-900 rounded-lg hover:bg-indigo-800 disabled:opacity-50 transition-all shadow-lg shadow-blue-900/20 hover:shadow-xl"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
