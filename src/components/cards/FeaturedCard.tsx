"use client";

import {
  Calendar,
  Clock,
  Download,
  ExternalLink,
  Eye,
  MapPin,
  Target,
  User,
  Users,
} from "lucide-react";

export interface Report {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  duration: string;
  location: string;
  participants?: number;
  category: string;
  methodology: string;
  tags: string[];
  downloadUrl?: string;
  readMoreUrl?: string;
}

interface FeaturedCardProps {
  title: string;
  report: Report;
  onViewDetails: React.Dispatch<React.SetStateAction<Report | null>>;
}

export default function FeaturedCard({
  title,
  report,
  onViewDetails,
}: FeaturedCardProps) {
  return (
    <div
      key={report.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-900"
    >
      {/* Featured Badge */}
      <div className="bg-blue-900 text-white px-6 py-2">
        <span className="text-sm font-medium flex items-center">
          <Target className="h-4 w-4 mr-2" />
          Featured {title}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {report.category}
          </span>
          <span className="text-sm text-gray-500 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {report.duration}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
          {report.title}
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{report.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{report.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{report.location}</span>
          </div>
          {report.participants && (
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span>{report.participants} participants</span>
            </div>
          )}
        </div>

        <p className="text-gray-700 mb-4 line-clamp-3">{report.description}</p>

        {/* Methodology Badge */}
        <div className="mb-4">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {report.methodology}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {report.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-purple-50 text-blue-700 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {report.tags.length > 3 && (
            <span className="text-gray-500 text-xs">
              +{report.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <button
              onClick={() => onViewDetails(report)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">View Details</span>
            </button>
            <a
              href={report.readMoreUrl}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm font-medium">Full Study</span>
            </a>
          </div>
          {report.downloadUrl && (
            <a
              href={report.downloadUrl}
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Download</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
