/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { SpeakerPost } from "@/app/(with dashboard Layout)/admin/speaker/page";
import { createConferenceAndSeminer, updateConferenceAndSeminer } from "@/service/ConferenceAndSeminer";
import { createSpeaker, updateSpeaker } from "@/service/Speaker";
import { Calendar, Eye, Save, User, X } from "lucide-react";
import { useState, useEffect } from "react";


export interface Speaker {
    id: number;
    name: string;
    designation: string;
    organization: string;
    bio?: string;
    photo: string;
    topic?: string;
}
interface ConferenceAndSeminarPost {
    id: number;
    title: string;
    date: string;
    venue: string;
    time: string;
    description: string;
    status: 'upcoming' | 'ongoing' | 'completed' | string;
    category: string;
    speaker?: Speaker;
    speaker_id?: string;
    created_at: Date;
    updated_at: Date;
}

interface SpeakerModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit" | "preview";
    speaker?: ConferenceAndSeminarPost;
    loadConferenceAndSeminar: () => Promise<void>;
    speakers?: SpeakerPost[];
}

export default function ConferenceModal({
    isOpen,
    onClose,
    mode,
    speaker,
    loadConferenceAndSeminar,
    speakers = [] as SpeakerPost[],

}: SpeakerModalProps) {
    const [formData, setFormData] = useState<{
        title: string;
        date: string;
        venue: string;
        time: string;
        description: string;
        status: 'upcoming' | 'ongoing' | 'completed' | string;
        category: string;
        speaker_id: string;
    }>({
        title: "",
        date: "",
        venue: "",
        time: "",
        description: "",
        status: "",
        category: "",
        speaker_id: "",
    });
    // When modal opens in edit mode, fill form with existing post data
    useEffect(() => {
        if (mode === "edit" && speaker) {
            setFormData({
                title: speaker.title,
                date: speaker.date,
                description: speaker.description,
                venue: speaker.venue,
                time: speaker.time,
                status: speaker.status,
                category: speaker.category || "",
                speaker_id: speaker.speaker_id || "",
            });
        } else if (mode === "add") {
            // Reset when adding new Speaker
            setFormData({
                title: "",
                date: "",
                venue: "",
                time: "",
                description: "",
                status: "",
                category: "",
                speaker_id: "",
            });
        }
    }, [mode, speaker]);

    //create Speaker=============
    const resetForm = () => {
        setFormData({
            title: "",
            date: "",
            venue: "",
            time: "",
            description: "",
            status: "",
            category: "",
            speaker_id: "",
        });
    };



    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("venue", formData.venue);
        data.append("time", formData.time);
        data.append("date", formData.date);
        data.append("status", formData.status);
        data.append("category", formData.category);
        data.append("speaker_id", formData.speaker_id);


        // for (let [key, value] of data.entries()) {
        //     console.log(key, value);
        // }

        let res;

        if (mode === "edit" && speaker?.id) {
            data.append("_method", "PUT");
            res = await updateConferenceAndSeminer(speaker.id, data);
            console.log("Updating ConferenceAndSeminer with ID:", data);
        } else {
            res = await createConferenceAndSeminer(data);
            console.log("Creating new ConferenceAndSeminer:", res);
        }

        console.log(res?.status)
        if (res?.status === 200 || res?.status === 201) {
            onClose();
            resetForm();
            loadConferenceAndSeminar();
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
                        {mode === "add" && "Add New COnference & Seminar Post"}
                        {mode === "edit" && "Edit COnference & Seminar Post"}
                        {mode === "preview" && "Preview COnference & Seminar Post"}
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
                        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto border">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{speaker?.title}</h2>

                            {/* Conference Info */}
                            <div className="space-y-2">
                                <p><strong>Date:</strong> {speaker?.date}</p>
                                <p><strong>Time:</strong> {speaker?.time}</p>
                                <p><strong>Venue:</strong> {speaker?.venue}</p>
                                <p><strong>Status:</strong> <span className="uppercase">{speaker?.status}</span></p>
                                <p><strong>Category:</strong> {speaker?.category || "N/A"}</p>
                                <p><strong>Description:</strong> {speaker?.description || "No Description Provided"}</p>
                            </div>

                            <hr className="my-5" />

                            {/* Speaker Details */}
                            {speaker?.speaker ? (
                                <div className="flex items-start gap-4">
                                    <img
                                        src={speaker?.speaker.photo}
                                        alt={speaker?.speaker.name}
                                        className="w-24 h-24 rounded-full object-cover border"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">{speaker?.speaker?.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            {speaker?.speaker?.designation} at {speaker?.speaker?.organization}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">No Speaker Assigned</p>
                            )}
                        </div>
                    ) : (
                        // Add/Edit Form
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                    />
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                    />
                                </div>

                                {/* Venue */}
                                <div>
                                    <label className="block text-sm font-medium">Venue</label>
                                    <input
                                        type="text"
                                        name="venue"
                                        value={formData.venue}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                    />
                                </div>

                                {/* Time */}
                                <div>
                                    <label className="block text-sm font-medium">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                    />
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                        rows={4}
                                    ></textarea>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                    >
                                        <option value="conference">Conference</option>
                                        <option value="seminer">Seminar</option>

                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Select Speaker</label>
                                    <select
                                        name="speaker_id"
                                        value={formData.speaker_id}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                    >
                                        <option value="">-- Select Speaker --</option>
                                        {speakers?.map((speaker) => (
                                            <option key={speaker.id} value={speaker.id}>
                                                {speaker?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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
