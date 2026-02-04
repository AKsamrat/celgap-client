/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LawItem } from "@/app/(with dashboard Layout)/admin/publications/Law-Journal/page";
import { createLawJournal, updateLawJournal } from "@/service/LawJournal";
import { AlertCircle, Calendar, Eye, Save, User, X } from "lucide-react";
import { useEffect, useState } from "react";



interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit" | "preview";
    article?: LawItem | undefined;
    // onSave: (article: Partial<NewsArticle>) => void;
    loadLawJournal: () => void;
    speakers: LawItem[];

}

export default function LawJournalModal({
    isOpen,
    onClose,
    mode,
    article,
    loadLawJournal,
    speakers
    // onSave,
}: NewsModalProps) {
    const [formData, setFormData] = useState({
        title: article?.title || "",

        abstract: article?.abstract || "",
        keywords: article?.keywords || [],           // Array
        keywordInput: "",
        description: article?.description || "",
        status: article?.status || "draft",
        category: article?.category || "article",
        speaker_id: article?.speaker_id || "",
        downloadUrl: article?.downloadUrl || "",
        externalUrl: article?.externalUrl || "",


    });

    useEffect(() => {
        if (mode === "edit" && article) {
            setFormData({
                title: article.title || "",
                abstract: article.abstract || "",
                keywords: Array.isArray(article.keywords)
                    ? article?.keywords
                    : JSON.parse(article?.keywords ?? "[]"),           // Array
                keywordInput: "",

                description: article.description || "",
                status: article.status || "draft",
                category: article.category || "article",
                speaker_id: article.speaker_id || "",
                downloadUrl: article.downloadUrl || "",
                externalUrl: article.externalUrl || "",
            });
        } else if (mode === "add") {
            // Reset when adding new blog
            setFormData({
                title: "",
                abstract: "",
                keywords: [] as string[],
                keywordInput: "",
                description: "",
                status: "draft",
                category: "",
                speaker_id: "",
                downloadUrl: "",
                externalUrl: "",

            });
        }
    }, [mode, article]);

    //create news
    const resetForm = () => {
        setFormData({
            title: "",
            abstract: "",
            keywords: [] as string[],
            keywordInput: "",
            description: "",
            status: "draft",
            category: "",
            speaker_id: "",
            downloadUrl: "",
            externalUrl: "",

        });
    };

    // Add keyword to array
    const handleAddKeyword = () => {
        if (formData.keywordInput.trim() !== "") {
            setFormData({
                ...formData,
                keywords: [...formData.keywords, formData.keywordInput],
                keywordInput: "",
            });
        }
    };

    // Remove keyword
    const removeKeyword = (index: number) => {
        const updated = [...formData.keywords];
        updated.splice(index, 1);
        setFormData({ ...formData, keywords: updated });
    };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("abstract", formData.abstract);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("status", article?.status || "draft");
        data.append("speaker_id", String(formData.speaker_id));
        if (formData.externalUrl) {
            data.append("externalUrl", formData.externalUrl);
        }
        if (formData.downloadUrl) {
            data.append("downloadUrl", formData.downloadUrl);
        }
        data.append("keywords", JSON.stringify(formData.keywords || []));

        let res;

        if (mode === "edit" && article?.id) {
            // data.append("_method", "POST");
            res = await updateLawJournal(article.id, data);
            console.log("Updating news with ID:", article.id, data);
        } else {
            res = await createLawJournal(data);
            console.log("Creating new news:", res);
        }

        if (res?.status === 200 || res?.status === 201) {
            loadLawJournal();
            onClose();
            resetForm();
        } else {
            console.log("Error saving news:", res.message);
        }
    };

    if (!isOpen) return null;



    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                {mode === "add" && (
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                )}
                                {mode === "edit" && (
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                )}
                                {mode === "preview" && (
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {mode === "add" && "Add New Law Journal"}
                                    {mode === "edit" && "Edit Law Journal"}
                                    {mode === "preview" && "Preview Law Journal"}
                                </h2>
                                <p className="text-blue-200 text-xs mt-0.5">
                                    {mode === "add" && "Submit a new law journal article"}
                                    {mode === "edit" && "Update journal information"}
                                    {mode === "preview" && "View journal details"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
                    {mode === "preview" ? (
                        // Preview Mode
                        <div className="p-8">
                            {/* Article Header */}
                            <div className="mb-8 pb-6 border-b border-gray-200">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                    {article?.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
                                        <User className="h-4 w-4 text-blue-900" />
                                        <span className="font-medium text-blue-900">{article?.speaker?.name || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                                        <Calendar className="h-4 w-4 text-gray-600" />
                                        <span className="font-medium">
                                            {article?.created_at &&
                                                new Date(article.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                        </span>
                                    </div>
                                    {article?.category && (
                                        <span className="bg-purple-50 text-purple-900 px-3 py-1.5 rounded-lg font-semibold border border-purple-200">
                                            {article.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Abstract */}
                            {article?.abstract && (
                                <div className="mb-6 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-900">
                                    <h3 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">Abstract</h3>
                                    <p className="text-gray-700 leading-relaxed">{article.abstract}</p>
                                </div>
                            )}

                            {/* Keywords */}
                            {Array.isArray(article?.keywords) && article.keywords.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                                        Keywords
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {article.keywords.map((keyword, index) => (
                                            <span
                                                key={index}
                                                className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Description</h3>
                                <div className="prose max-w-none">
                                    <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                        {article?.description}
                                    </div>
                                </div>
                            </div>

                            {/* Links */}
                            {(article?.downloadUrl || article?.externalUrl) && (
                                <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                                    <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Resources</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {article?.downloadUrl && (
                                            <a
                                                href={article.downloadUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Download PDF
                                            </a>
                                        )}
                                        {article?.externalUrl && (
                                            <a
                                                href={article.externalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                External Link
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Admin Comments */}
                            {article?.admin_comment && article.admin_comment.length > 0 ? (
                                <div className="p-4 bg-yellow-50 rounded-xl border-l-4 border-yellow-600">
                                    <h3 className="text-sm font-bold text-yellow-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                        Admin Comments
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">{article.admin_comment}</p>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        // Add/Edit Form
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                                    placeholder="Enter journal title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Abstract */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Abstract
                                </label>
                                <textarea
                                    name="abstract"
                                    rows={3}
                                    className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all resize-none"
                                    placeholder="Brief summary of the journal"
                                    value={formData.abstract}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Keywords */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Keywords (Tags)
                                </label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        name="keywordInput"
                                        className="flex-1 border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                                        placeholder="Add a keyword"
                                        value={formData.keywordInput}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddKeyword}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl font-semibold transition-all shadow-md"
                                    >
                                        Add
                                    </button>
                                </div>

                                {formData?.keywords && formData.keywords.length > 0 && (
                                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                                        {formData.keywords.map((kw, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-900 px-3 py-1.5 rounded-full flex items-center gap-2 font-medium border border-blue-200"
                                            >
                                                {kw}
                                                <button
                                                    type="button"
                                                    onClick={() => removeKeyword(index)}
                                                    className="text-red-600 hover:text-red-800 font-bold"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    rows={5}
                                    className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all resize-none"
                                    placeholder="Detailed description of the journal"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Category & Speaker Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all font-medium"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="article">Article</option>
                                        <option value="case_comment">Case Comment</option>
                                        <option value="review_book">Review Book</option>
                                    </select>
                                </div>

                                {/* Speaker */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Speaker/Author
                                    </label>
                                    <select
                                        name="speaker_id"
                                        className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all font-medium"
                                        value={formData.speaker_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Speaker</option>
                                        {speakers?.map((speaker: any) => (
                                            <option key={speaker.id} value={speaker.id}>
                                                {speaker.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* URLs Section */}
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                <h3 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide">External Resources</h3>

                                {/* Download URL */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Download URL (PDF)
                                    </label>
                                    <input
                                        type="url"
                                        name="downloadUrl"
                                        className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                                        placeholder="https://example.com/file.pdf"
                                        value={formData.downloadUrl}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* External URL */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        External URL
                                    </label>
                                    <input
                                        type="url"
                                        name="externalUrl"
                                        className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                                        placeholder="https://example.com/journal"
                                        value={formData.externalUrl}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                {mode !== "preview" && (
                    <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all font-bold flex items-center gap-2 shadow-lg shadow-blue-900/30"
                        >
                            <Save className="h-4 w-4" />
                            {mode === "add" ? "Create Journal" : "Save Changes"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
