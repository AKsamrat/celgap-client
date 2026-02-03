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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">
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
                <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                    {mode === "preview" ? (
                        // Preview Mode
                        <div className="p-6">

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {article?.title}
                            </h1>
                            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    <span>{article?.speaker?.name || 'N/A'}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>
                                        {article?.created_at &&
                                            new Date(article.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                            </div>
                            <div className="prose max-w-none">

                                <div className="text-gray-800 leading-relaxed">
                                    {article?.description}
                                </div>
                            </div>
                            <div className="prose max-w-none">

                                <div className="text-gray-800 leading-relaxed">
                                    {article?.admin_comment && article.admin_comment.length > 0 ? (
                                        <div className="mt-8">
                                            <h2 className="text-2xl font-semibold mb-4">Comments</h2>

                                            <div className="border-b border-gray-200 py-2">
                                                <p className="text-gray-700">{article.admin_comment}</p>
                                            </div>

                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">No comments available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Add/Edit Form
                        <form
                            onSubmit={handleSubmit}
                            className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-5"
                        >
                            <h2 className="text-2xl font-semibold mb-4">Create Law Journal</h2>

                            {/* Title */}
                            <div>
                                <label className="block font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full border p-2 rounded"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Abstract */}
                            <div>
                                <label className="block font-medium mb-1">Abstract</label>
                                <textarea
                                    name="abstract"
                                    rows={3}
                                    className="w-full border p-2 rounded"
                                    value={formData.abstract}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Keywords as Array */}
                            <div>
                                <label className="block font-medium mb-1">Keywords (Tags)</label>

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="keywordInput"
                                        className="border p-2 rounded w-full"
                                        placeholder="Add a keyword"
                                        value={formData.keywordInput}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddKeyword}
                                        className="bg-green-600 text-white px-3 rounded"
                                    >
                                        Add
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData?.keywords.map((kw, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                                        >
                                            {kw}
                                            <button
                                                type="button"
                                                onClick={() => removeKeyword(index)}
                                                className="text-red-600"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>


                            {/* Description */}
                            <div>
                                <label className="block font-medium mb-1">Description</label>
                                <textarea
                                    name="description"
                                    rows={4}
                                    className="w-full border p-2 rounded"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* category */}
                            <div>
                                <label className="block font-medium mb-1">Category</label>
                                <select
                                    name="category"
                                    className="w-full border p-2 rounded"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="article">Article</option>
                                    <option value="case_comment">Case Comment</option>
                                    <option value="review_book">Review Book</option>
                                </select>
                            </div>


                            {/* Speaker Select Input */}
                            <div>
                                <label className="block font-medium mb-1">Speaker</label>
                                <select
                                    name="speaker_id"
                                    className="w-full border p-2 rounded"
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

                            {/* Download URL */}
                            <div>
                                <label className="block font-medium mb-1">Download URL</label>
                                <input
                                    type="text"
                                    name="downloadUrl"
                                    className="w-full border p-2 rounded"
                                    value={formData.downloadUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/file.pdf"
                                />
                            </div>

                            {/* External URL */}
                            <div>
                                <label className="block font-medium mb-1">External URL</label>
                                <input
                                    type="text"
                                    name="externalUrl"
                                    className="w-full border p-2 rounded"
                                    value={formData.externalUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/journal"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </form>
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
                            {mode === "add" ? "Create Journal" : "Save Changes"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
