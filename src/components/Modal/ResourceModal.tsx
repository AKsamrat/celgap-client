// components/ReportModal.tsx
import {
  Bookmark,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  MapPin,
  Share2,
  Target,
  User,
  X,
} from "lucide-react";

export interface Report {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  location: string;
  duration: string;
  methodology: string;
  participants?: number;
  description: string;
  preview: string;
  tags: string[];
  readMoreUrl: string;
  downloadUrl?: string;
}

interface ReportModalProps {
  report: Report | null;
  onClose: () => void;
}

export default function ReportModal({ report, onClose }: ReportModalProps) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 line-clamp-2">
              {report.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {report.category}
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{report.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{report.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{report.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{report.duration}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Study Overview
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {report.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Detailed Analysis
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {report.preview}
                </p>
              </div>
            </div>

            {/* Study Details and Tags */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Study Details
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{report.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{report.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Methodology:</span>
                    <span className="font-medium">{report.methodology}</span>
                  </div>
                  {report.participants && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-medium">{report.participants}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {report.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Findings */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Key Research Objectives
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  Analyze implementation effectiveness and identify systemic
                  challenges
                </li>
                <li>Document best practices and innovative approaches</li>
                <li>Assess stakeholder engagement and community impact</li>
                <li>
                  Provide actionable recommendations for policy improvement
                </li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Share2 className="h-4 w-4" />
                <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Bookmark className="h-4 w-4" />
                <span className="text-sm">Save</span>
              </button>
            </div>
            <div className="flex space-x-3">
              <a
                href={report.readMoreUrl}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm font-medium">Full Study</span>
              </a>
              {report.downloadUrl && (
                <a
                  href={report.downloadUrl}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="text-sm font-medium">Download PDF</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
