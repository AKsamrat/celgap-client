"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface Reviewer {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    journalTitle?: string;
    reviewers: Reviewer[];
    onAssign: (reviewerId: number) => void;
}

export default function AssignReviewerModal({
    open,
    onClose,
    journalTitle,
    reviewers,
    onAssign,
}: Props) {
    const [selectedReviewer, setSelectedReviewer] = useState<number | null>(null);

    if (!open) return null;

    console.log('Reviewers:', reviewers);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Assign Reviewer</h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Journal */}
                <p className="text-sm text-gray-600 mb-3">
                    Journal: <span className="font-medium">{journalTitle}</span>
                </p>

                {/* Reviewer Select */}
                <label className="block text-sm font-medium mb-1">
                    Select Reviewer
                </label>

                <select
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    value={selectedReviewer ?? ""}
                    onChange={(e) => setSelectedReviewer(Number(e.target.value))}
                >
                    <option value="">-- Select Reviewer --</option>
                    {reviewers
                        .filter((rev) => rev.role === "reviewer")
                        .map((rev) => (
                            <option key={rev.id} value={rev.id}>
                                {rev.name} ({rev.email})
                            </option>
                        ))}
                </select>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm border rounded-md"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={!selectedReviewer}
                        onClick={() => onAssign(selectedReviewer!)}
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md disabled:opacity-50"
                    >
                        Assign
                    </button>
                </div>
            </div>
        </div>
    );
}
