/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LawItem } from "@/app/(with dashboard Layout)/admin/publications/Law-Journal/page";
import { createLawJournal, updateLawJournal } from "@/service/LawJournal";
import { submitJournalComment } from "@/service/Reviewer";
import { JournalAssignment } from "@/types/Journal Reviewer";
import { AlertCircle, Calendar, Eye, Save, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";




interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit" | "preview";
    article?: JournalAssignment | undefined;
    // onSave: (article: Partial<NewsArticle>) => void;
    loadLawJournal: () => void;
    // speakers: LawItem[];

}

export default function ReviewJournalModal({
    isOpen,
    onClose,
    mode,
    article,
    loadLawJournal,
    // speakers
    // onSave,
}: NewsModalProps) {
    const [formData, setFormData] = useState({
        comment: article?.comment || "",



    });

    useEffect(() => {
        if (mode === "edit" && article) {
            setFormData({
                comment: article.comment || "",

            });
        } else if (mode === "add") {
            // Reset when adding new blog
            setFormData({
                comment: "",


            });
        }
    }, [mode, article]);

    //create news
    const resetForm = () => {
        setFormData({
            comment: "",


        });
    };



    const handleChange = (e: any) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("comment", formData.comment);


        for (const [key, value] of data.entries()) {
            console.log(key, value);
        }

        let res;
        if (!article?.id) return;

        if (mode === "preview" && article?.id) {
            res = await submitJournalComment(data, article.id);
            // data.append("_method", "POST");
            // res = await updateLawJournal(article.id, data);
            console.log("Updating news with ID:", data);
        }

        if (res?.status === 200 || res?.status === 201) {
            loadLawJournal();
            onClose();
            resetForm();
            toast.success("Journal comment saved successfully!");
        } else {
            console.log("Error saving news:", res.message);
        }
    };

    if (!isOpen) return null;

    const keywords: string[] = Array.isArray(article?.journal?.keywords)
        ? article.journal.keywords
        : article?.journal?.keywords
            ? JSON.parse(article.journal.keywords)
            : [];



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-blue-800 flex items-center">
                        {mode === "add" && "Add New Journal"}
                        {mode === "edit" && "Edit New Journal"}
                        {mode === "preview" && "Preview  Journal"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)] mt-3">
                    {mode === "preview" ? (
                        // Preview Mode
                        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">

                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                {article?.journal?.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{article?.journal?.user?.name || "N/A"}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {article?.created_at &&
                                            new Date(article.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                {article?.journal?.category && (
                                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                        {article.journal.category}
                                    </span>
                                )}
                            </div>
                            {keywords.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                        Keywords
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        {keywords.map((keyword, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                                            >
                                                #{keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Divider */}
                            <hr className="border-gray-200 mb-6" />

                            {/* Abstract */}
                            <section className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    Abstract
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {article?.journal?.abstract}
                                </p>
                            </section>

                            {/* Description */}
                            <section>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    Description
                                </h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {article?.journal?.description}
                                </p>
                            </section>
                            {/* Comment Section */}
                            <div className="mt-8 border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                    Reviewer Comment
                                </h3>

                                {/* Existing Comment (Preview) */}
                                {article?.comment ? (
                                    <div className="mb-4 p-4 bg-gray-50 border rounded-lg">
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {article.comment}
                                        </p>
                                        <p className="mt-2 text-xs text-gray-500">
                                            Last updated on{" "}
                                            {article?.updated_at &&
                                                new Date(article.updated_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 mb-4">
                                        No comment added yet.
                                    </p>
                                )}

                                {/* Add / Update Comment */}
                                <form
                                    onSubmit={handleSubmit}
                                >
                                    <textarea
                                        rows={5}
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        placeholder="Write your comment about this journal..."
                                        className="w-full p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <div className="flex justify-end mt-3">
                                        <button
                                            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Save Comment
                                        </button>
                                    </div>
                                </form>
                            </div>


                        </div>

                    ) : (""
                    )}
                </div>

                {/* Footer */}
                {mode !== "preview" && (
                    <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {mode === "add" ? "Create Article" : "Save Changes"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
