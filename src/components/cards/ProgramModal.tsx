"use client";

import { Program } from "@/types";
import { X } from "lucide-react";

interface ProgramModalProps {
  program: Program;
  onClose: () => void;
}

export default function ProgramModal({ program, onClose }: ProgramModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 line-clamp-2">
            {program.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-gray-700">{program.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>Date:</strong> {program.date}
            </div>
            <div>
              <strong>Time:</strong> {program.time}
            </div>
            <div>
              <strong>Duration:</strong> {program.duration}
            </div>
            <div>
              <strong>Location:</strong> {program.location}
            </div>
            <div>
              <strong>Capacity:</strong> {program.capacity}
            </div>
            <div>
              <strong>Enrolled:</strong> {program.enrolled}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
