// components/AllCard.tsx
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Download,
  Eye,
  MapPin,
} from "lucide-react";

export interface Report {
  id: number;
  title: string;
  category: string;
  duration: string;
  methodology: string;
  location: string;
  date: string;
  description: string;
  tags: string[];
  readMoreUrl: string;
  downloadUrl?: string;
}

interface AllCardProps {
  title: string;
  report: Report;
  onViewDetails: (report: Report) => void;
}

export default function AllCard({
  report,
  onViewDetails,
  title,
}: AllCardProps) {
  return (
    <div
      key={report.id}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1"
    >
      {/* Header with Icon */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-white" />
            <span className="text-white text-sm font-medium">{title}</span>
          </div>
          <span className="text-purple-100 text-xs">{report.duration}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-purple-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
            {report.category}
          </span>
          <span className="text-xs text-gray-500">{report.methodology}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {report.title}
        </h3>

        <div className="grid grid-cols-1 gap-2 text-xs text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{report.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{report.date}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-4">
          {report.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {report.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {report.tags.length > 2 && (
            <span className="text-gray-400 text-xs">
              +{report.tags.length - 2}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <a
            href={report.readMoreUrl}
            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
          >
            <span className="text-sm font-medium">Read More</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails(report)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Eye className="h-4 w-4" />
            </button>
            {report.downloadUrl && (
              <a
                href={report.downloadUrl}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Download className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
