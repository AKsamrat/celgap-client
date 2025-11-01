/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { createSpeaker, updateSpeaker } from "@/service/Speaker";
import { Calendar, Eye, Save, User, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SpeakerPost {
    id: number;
    name: string;
    designation: string;
    organization: string;
    bio: string;
    topic: string;
    photo: File | null;
    created_at: Date;
    updated_at: Date;
}

interface SpeakerModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit" | "preview";
    speaker?: SpeakerPost;
    loadSpeakers: () => Promise<void>;
}

export default function SpeakerModal({
    isOpen,
    onClose,
    mode,
    speaker,
    loadSpeakers,

}: SpeakerModalProps) {
    const [formData, setFormData] = useState<{
        name: string;
        designation: string;
        organization: string;
        bio: string;
        topic: string;
        photo: File | null;
    }>({
        name: "",
        designation: "",
        organization: "",
        bio: "",
        topic: "",
        photo: null,
    });
    // When modal opens in edit mode, fill form with existing post data
    useEffect(() => {
        if (mode === "edit" && speaker) {
            setFormData({
                name: speaker.name,
                designation: speaker.designation,
                organization: speaker.organization,
                topic: speaker.topic,
                photo: speaker.photo,
                bio: speaker.bio || "",
            });
        } else if (mode === "add") {
            // Reset when adding new Speaker
            setFormData({
                name: "",
                designation: "",
                organization: "",
                bio: "",
                photo: "" || null,
                topic: "",
            });
        }
    }, [mode, speaker]);

    //create Speaker=============
    const resetForm = () => {
        setFormData({
            name: "",
            designation: "",
            organization: "",
            bio: "",
            photo: null,
            topic: "",
        });
    };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("designation", formData.designation);
        data.append("organization", formData.organization);
        data.append("bio", formData.bio);
        data.append("topic", formData.topic);
        if (formData.photo) data.append("photo", formData.photo);

        // for (let [key, value] of data.entries()) {
        //     console.log(key, value);
        // }

        let res;

        if (mode === "edit" && speaker?.id) {
            data.append("_method", "PUT");
            res = await updateSpeaker(speaker.id, data);
            console.log("Updating speaker with ID:", data);
        } else {
            res = await createSpeaker(data);
            console.log("Creating new speaker:", res);
        }

        console.log(res?.status)
        if (res?.status === 200 || res?.status === 201) {
            onClose();
            resetForm();
            loadSpeakers();
        } else {
            console.log("Error saving speaker:", res.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {mode === "add" && "Add New Speaker Post"}
                        {mode === "edit" && "Edit Speaker Post"}
                        {mode === "preview" && "Preview Speaker Post"}
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
                            <div className="mb-6">
                                <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                                    {speaker?.name}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {speaker?.designation}
                            </h1>
                            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    <span>{speaker?.organization}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>
                                        {speaker?.created_at && new Date(speaker.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    {/* <Eye className="h-4 w-4 mr-2" /> */}
                                    <span>{speaker?.photo} views</span>
                                </div>
                            </div>
                            <div className="prose max-w-none">
                                <p className="text-lg text-gray-600 mb-6">{speaker?.topic}</p>
                                <div className="text-gray-800 leading-relaxed">
                                    {speaker?.topic ||
                                        "This is the full content of the blog post. In a real implementation, this would be a rich text editor with formatting options, images, and other media."}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Add/Edit Form
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Designation</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Organization</label>
                                <input
                                    type="text"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Topic</label>
                                <input
                                    type="text"
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Photo
                                </label>
                                <input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            photo: e.target.files ? e.target.files[0] : null,
                                        })
                                    }
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                                />
                                {/* {...formData.photo && (
                                        <img
                                            src={URL.createObjectURL(formData.photo)}
                                            alt="Preview"
                                            className="mt-2 w-32 h-32 object-cover rounded-lg"
                                        />
                                    )} */}
                            </div>




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
                            {mode === "add" ? "Create Post" : "Save Changes"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
