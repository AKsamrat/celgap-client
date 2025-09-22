"use client";

import AdminLayout from "@/components/admin/layout";
import {
  BookOpen,
  Calendar,
  Download,
  Edit,
  Eye,
  Plus,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";

interface ResearchItem {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  author: string;
  date: string;
  status: "published" | "draft" | "under-review";
  type: "governance" | "law" | "publication" | "policy";
  downloads: number;
  views: number;
}

const mockResearchItems: ResearchItem[] = [
  {
    id: 1,
    title: "Digital Privacy Protection Policy Framework",
    description:
      "Comprehensive policy framework for protecting digital privacy rights and data protection standards.",
    category: "Digital Policy",
    subcategory: "Privacy Rights",
    author: "Policy Research Team",
    date: "2024-12-18",
    status: "published",
    type: "policy",
    downloads: 340,
    views: 1250,
  },
  {
    id: 2,
    title: "Constitutional Interpretation in Digital Age",
    description:
      "Analysis of how constitutional principles apply to digital rights and technology governance.",
    category: "Constitutional Law",
    subcategory: "Digital Rights",
    author: "Justice (Retd.) Meera Sharma",
    date: "2024-12-20",
    status: "published",
    type: "law",
    downloads: 280,
    views: 890,
  },
  {
    id: 3,
    title: "Environmental Governance and Climate Policy",
    description:
      "Research monograph examining environmental law and governance structures.",
    category: "Environmental Policy",
    subcategory: "Climate Change",
    author: "Prof. Meera Patel",
    date: "2024-11-25",
    status: "published",
    type: "publication",
    downloads: 210,
    views: 675,
  },
  {
    id: 4,
    title: "Digital Governance Framework for Public Services",
    description:
      "Analysis of digital transformation in government services and citizen engagement.",
    category: "Digital Governance",
    subcategory: "Public Services",
    author: "Dr. Priya Sharma",
    date: "2024-12-15",
    status: "under-review",
    type: "governance",
    downloads: 0,
    views: 145,
  },
];

export default function AdminResearch() {
  const [researchItems, setResearchItems] =
    useState<ResearchItem[]>(mockResearchItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredItems = researchItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this research item?")) {
      setResearchItems(researchItems.filter((item) => item.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "under-review":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "governance":
        return "bg-purple-100 text-purple-800";
      case "law":
        return "bg-blue-100 text-blue-800";
      case "publication":
        return "bg-green-100 text-green-800";
      case "policy":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Research Management
            </h2>
            <p className="text-gray-600 mt-2">
              Manage research papers, policies, governance studies, and legal
              publications
            </p>
          </div>
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors duration-200">
            <Plus className="h-5 w-5 mr-2" />
            New Research Item
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search research items..."
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
              <option value="under-review">Under Review</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="governance">Governance</option>
              <option value="law">Law</option>
              <option value="publication">Publication</option>
              <option value="policy">Policy</option>
            </select>
          </div>
        </div>

        {/* Research Items Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Research Item
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
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.description}
                        </div>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-xs text-gray-400">
                            {item.category}
                          </span>
                          <span className="text-xs text-gray-300">•</span>
                          <span className="text-xs text-gray-400">
                            {item.subcategory}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {item.author}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                          item.type
                        )}`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <Eye className="h-3 w-3 text-gray-400 mr-1" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="h-3 w-3 text-gray-400 mr-1" />
                          <span>{item.downloads}</span>
                        </div>
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
                          onClick={() => handleDelete(item.id)}
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
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No research items found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
