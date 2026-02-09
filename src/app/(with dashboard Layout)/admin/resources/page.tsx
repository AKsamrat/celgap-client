"use client";

import AdminLayout from "@/components/admin/layout";
import {
  Calendar,
  Download,
  Edit,
  Eye,
  FileText,
  Link,
  Plus,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: "document" | "link" | "video" | "template" | "guide";
  category: string;
  author: string;
  date: string;
  status: "published" | "draft" | "archived";
  downloads: number;
  views: number;
  fileSize?: string;
  format?: string;
  url?: string;
}

const mockResources: Resource[] = [
  {
    id: 1,
    title: "Legal Research Template Collection",
    description:
      "Comprehensive collection of templates for legal research documentation and case analysis.",
    type: "template",
    category: "Legal Research",
    author: "Research Team",
    date: "2024-12-15",
    status: "published",
    downloads: 450,
    views: 1200,
    fileSize: "2.5 MB",
    format: "DOCX",
  },
  {
    id: 2,
    title: "Constitutional Law Case Database",
    description:
      "Searchable database of landmark constitutional law cases with detailed analysis.",
    type: "link",
    category: "Constitutional Law",
    author: "Legal Database Team",
    date: "2024-12-10",
    status: "published",
    downloads: 0,
    views: 890,
    url: "https://example.com/constitutional-cases",
  },
  {
    id: 3,
    title: "Environmental Law Compliance Guide",
    description:
      "Step-by-step guide for environmental law compliance for businesses and organizations.",
    type: "guide",
    category: "Environmental Law",
    author: "Prof. Meera Patel",
    date: "2024-12-08",
    status: "published",
    downloads: 320,
    views: 750,
    fileSize: "1.8 MB",
    format: "PDF",
  },
  {
    id: 4,
    title: "Digital Rights Workshop Video Series",
    description:
      "Complete video series from the digital rights workshop covering privacy and data protection.",
    type: "video",
    category: "Digital Rights",
    author: "Workshop Team",
    date: "2024-12-05",
    status: "published",
    downloads: 180,
    views: 650,
    fileSize: "850 MB",
    format: "MP4",
  },
  {
    id: 5,
    title: "Corporate Governance Checklist",
    description:
      "Comprehensive checklist for corporate governance compliance and best practices.",
    type: "document",
    category: "Corporate Law",
    author: "Dr. Anil Gupta",
    date: "2024-12-01",
    status: "draft",
    downloads: 0,
    views: 45,
    fileSize: "500 KB",
    format: "PDF",
  },
];

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || resource.status === selectedStatus;
    const matchesType =
      selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      setResources(resources.filter((resource) => resource.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document":
        return "bg-blue-100 text-blue-800";
      case "link":
        return "bg-green-100 text-green-800";
      case "video":
        return "bg-red-100 text-red-800";
      case "template":
        return "bg-purple-100 text-purple-800";
      case "guide":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />;
      case "link":
        return <Link className="h-4 w-4" />;
      case "video":
        return <Eye className="h-4 w-4" />;
      case "template":
        return <FileText className="h-4 w-4" />;
      case "guide":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Resources Management
            </h2>
            <p className="text-gray-600 mt-2">
              Manage documents, templates, guides, videos, and external links
            </p>
          </div>
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors duration-200">
            <Plus className="h-5 w-5 mr-2" />
            New Resource
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="document">Document</option>
              <option value="link">Link</option>
              <option value="video">Video</option>
              <option value="template">Template</option>
              <option value="guide">Guide</option>
            </select>
          </div>
        </div>

        {/* Resources Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {getTypeIcon(resource.type)}
                          <span className="ml-2">{resource.title}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {resource.description}
                        </div>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-xs text-gray-400">
                            {resource.category}
                          </span>
                          {resource.fileSize && (
                            <>
                              <span className="text-xs text-gray-300">•</span>
                              <span className="text-xs text-gray-400">
                                {resource.fileSize}
                              </span>
                            </>
                          )}
                          {resource.format && (
                            <>
                              <span className="text-xs text-gray-300">•</span>
                              <span className="text-xs text-gray-400">
                                {resource.format}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {resource.author}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                          resource.type
                        )}`}
                      >
                        {resource.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          resource.status
                        )}`}
                      >
                        {resource.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {new Date(resource.date).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <Eye className="h-3 w-3 text-gray-400 mr-1" />
                          <span>{resource.views}</span>
                        </div>
                        {resource.downloads > 0 && (
                          <div className="flex items-center">
                            <Download className="h-3 w-3 text-gray-400 mr-1" />
                            <span>{resource.downloads}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </>
  );
}
