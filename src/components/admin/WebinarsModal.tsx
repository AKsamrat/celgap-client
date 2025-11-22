"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createWebinars, updateWebinars } from "@/service/webinar";
import { SpeakerModalProps } from "@/types";
import { Save, X } from "lucide-react";
import { useState, useEffect } from "react";


export default function WebinarsModal({
    isOpen,
    onClose,
    mode,
    webinar,
    loadWebinar,
    speakers = [],

}: SpeakerModalProps) {
    const [formData, setFormData] = useState<{
        title: string;
        date: string;
        platform: string;
        time: string;
        duration: string | number;
        description: string;
        status: 'upcoming' | 'ongoing' | 'completed' | string;
        category: string;
        attendees: string;
        speaker_id: string;
    }>({
        title: "",
        date: "",
        platform: "",
        duration: "",
        time: "",
        description: "",
        status: "",
        attendees: "",
        category: "",
        speaker_id: "",
    });
    // When modal opens in edit mode, fill form with existing post data
    useEffect(() => {
        if (mode === "edit" && webinar) {
            setFormData({
                title: webinar.title,
                date: webinar.date,
                description: webinar.description,
                platform: webinar?.platform,
                duration: webinar?.duration,
                time: webinar.time,
                attendees: webinar.attendees,
                status: webinar.status,
                category: webinar.category || "",
                speaker_id: webinar.speaker_id || "",
            });
        } else if (mode === "add") {
            // Reset when adding new Speaker
            setFormData({
                title: "",
                date: "",
                platform: "",
                duration: "",
                time: "",
                description: "",
                status: "",
                attendees: "",
                category: "",
                speaker_id: "",
            });
        }
    }, [mode, webinar]);

    //create Speaker=============

    const resetForm = () => {
        setFormData({
            title: "",
            date: "",
            platform: "",
            duration: "",
            time: "",
            description: "",
            status: "",
            attendees: "",
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
        data.append("duration", String(formData.duration));
        data.append("attendees", String(formData.attendees));
        data.append("attendees", formData.attendees);
        data.append("time", formData.time);
        data.append("date", formData.date);
        data.append("status", formData.status);
        data.append("category", formData.category);
        data.append("speaker_id", formData.speaker_id);

        let res;

        if (mode === "edit" && webinar?.id) {
            data.append("_method", "PUT");
            res = await updateWebinars(webinar.id, data);
            console.log("Updating Webinar with ID:", data);
        } else {
            res = await createWebinars(data);
            console.log("Creating new Webinar:", res);
        }

        console.log(res?.status)
        if (res?.status === 200 || res?.status === 201) {
            onClose();
            resetForm();
            loadWebinar();
        } else {
            console.log("Error saving Webinar:", res.message);
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
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{webinar?.title}</h2>

                            {/* Conference Info */}
                            <div className="space-y-2">
                                <p><strong>Date:</strong> {webinar?.date}</p>
                                <p><strong>Time:</strong> {webinar?.time}</p>
                                <p><strong>platform:</strong> {webinar?.platform}</p>
                                <p><strong>Status:</strong> <span className="uppercase">{webinar?.status}</span></p>
                                <p><strong>Category:</strong> {webinar?.category || "N/A"}</p>
                                <p><strong>Description:</strong> {webinar?.description || "No Description Provided"}</p>
                            </div>

                            <hr className="my-5" />

                            {/* Speaker Details */}
                            {speakers && speakers.length > 0 ? (
                                speakers.map((item, index) => (
                                    item ? (
                                        <div key={index} className="flex items-start gap-4">
                                            <img
                                                src={item.photo}
                                                alt={item.name}
                                                className="w-24 h-24 rounded-full object-cover border"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {item.designation} at {item.organization}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p key={index} className="text-gray-500">No Speaker Assigned</p>
                                    )
                                ))
                            ) : (
                                <p>No speakers found</p>
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

                                {/* platform */}
                                <div>
                                    <label className="block text-sm font-medium">platform</label>
                                    <input
                                        type="text"
                                        name="platform"
                                        value={formData.platform}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Duration</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="border p-2 w-full rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Attendees</label>
                                    <input
                                        type="number"
                                        name="attendees"
                                        value={formData.attendees}
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
                                        <option >Select Status</option>
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
                                        <option > Select Category</option>
                                        <option value="Spring School">Spring School</option>
                                        <option value="Workshop">Workshop</option>

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
