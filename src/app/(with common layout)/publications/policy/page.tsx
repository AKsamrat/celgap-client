"use client";

import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";

interface PolicyItem {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  tags: string[];
  downloadUrl?: string;
  externalUrl?: string;
  status: "Draft" | "Under Review" | "Published" | "Implemented";
  policyNumber?: string;
  effectiveDate?: string;
  stakeholders?: string[];
}

const policyItems: PolicyItem[] = [
  {
    id: 1,
    title: "Digital Privacy Protection Policy Framework",
    description:
      "Comprehensive policy framework for protecting digital privacy rights, including data protection standards, consent mechanisms, and enforcement procedures.",
    category: "Digital Policy",
    date: "2024-12-18",
    author: "Policy Research Team",
    tags: ["Digital Privacy", "Data Protection", "Policy Framework"],
    downloadUrl: "#",
    externalUrl: "#",
    status: "Published",
    policyNumber: "DPP-2024-001",
    effectiveDate: "2025-01-01",
    stakeholders: [
      "Ministry of Electronics & IT",
      "Data Protection Authority",
      "Civil Society Organizations",
    ],
  },
  {
    id: 2,
    title: "Environmental Impact Assessment Guidelines",
    description:
      "Updated guidelines for conducting environmental impact assessments for development projects, incorporating climate change considerations.",
    category: "Environmental Policy",
    date: "2024-12-01",
    author: "Dr. Meera Patel, Environmental Law Team",
    tags: [
      "Environmental Assessment",
      "Climate Change",
      "Development Projects",
    ],
    downloadUrl: "#",
    status: "Under Review",
    policyNumber: "EIA-2024-003",
    stakeholders: [
      "Ministry of Environment",
      "State Pollution Control Boards",
      "Industry Associations",
    ],
  },
  {
    id: 3,
    title: "Corporate Governance Standards for Public Enterprises",
    description:
      "Policy recommendations for improving corporate governance standards in state-owned enterprises and public sector undertakings.",
    category: "Corporate Policy",
    date: "2024-11-20",
    author: "Prof. Anil Gupta",
    tags: ["Corporate Governance", "Public Enterprises", "Accountability"],
    downloadUrl: "#",
    externalUrl: "#",
    status: "Implemented",
    policyNumber: "CGS-2024-002",
    effectiveDate: "2024-10-01",
    stakeholders: [
      "Department of Public Enterprises",
      "PSU Boards",
      "Audit Institutions",
    ],
  },
  {
    id: 4,
    title: "Legal Aid and Access to Justice Policy",
    description:
      "Policy framework for expanding legal aid services and improving access to justice for marginalized communities and economically disadvantaged groups.",
    category: "Justice Policy",
    date: "2024-11-05",
    author: "Justice Access Research Group",
    tags: ["Legal Aid", "Access to Justice", "Marginalized Communities"],
    downloadUrl: "#",
    status: "Published",
    policyNumber: "LAJ-2024-004",
    effectiveDate: "2024-12-01",
    stakeholders: [
      "National Legal Services Authority",
      "State Legal Services",
      "Bar Councils",
    ],
  },
  {
    id: 5,
    title: "Cybersecurity Framework for Government Institutions",
    description:
      "Draft policy outlining cybersecurity standards, incident response procedures, and capacity building requirements for government institutions.",
    category: "Cybersecurity Policy",
    date: "2024-10-25",
    author: "Cybersecurity Policy Committee",
    tags: ["Cybersecurity", "Government Institutions", "Incident Response"],
    downloadUrl: "#",
    status: "Draft",
    policyNumber: "CSF-2024-005",
    stakeholders: [
      "CERT-In",
      "Ministry of Home Affairs",
      "Government IT Departments",
    ],
  },
  {
    id: 6,
    title: "Intellectual Property Rights Protection Strategy",
    description:
      "Strategic policy document for strengthening intellectual property rights protection, enforcement mechanisms, and innovation promotion.",
    category: "IP Policy",
    date: "2024-10-10",
    author: "IP Rights Research Team",
    tags: ["Intellectual Property", "Innovation", "Enforcement"],
    downloadUrl: "#",
    externalUrl: "#",
    status: "Under Review",
    policyNumber: "IPR-2024-006",
    stakeholders: [
      "Controller General of Patents",
      "Industry Bodies",
      "Research Institutions",
    ],
  },
];

const categories = [
  "All",
  "Digital Policy",
  "Environmental Policy",
  "Corporate Policy",
  "Justice Policy",
  "Cybersecurity Policy",
  "IP Policy",
];
const statuses = ["All", "Draft", "Under Review", "Published", "Implemented"];

export default function PolicyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredItems, setFilteredItems] = useState(policyItems);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterItems(term, selectedCategory, selectedStatus);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterItems(searchTerm, category, selectedStatus);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    filterItems(searchTerm, selectedCategory, status);
  };

  const filterItems = (search: string, category: string, status: string) => {
    let filtered = policyItems;

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (status !== "All") {
      filtered = filtered.filter((item) => item.status === status);
    }

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          ) ||
          item.policyNumber?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Draft: "bg-yellow-100 text-yellow-800",
      "Under Review": "bg-blue-100 text-blue-800",
      Published: "bg-green-100 text-green-800",
      Implemented: "bg-purple-100 text-purple-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Draft":
        return <FileText className="w-4 h-4" />;
      case "Under Review":
        return <AlertCircle className="w-4 h-4" />;
      case "Published":
      case "Implemented":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <FileText className="w-16 h-16 text-blue-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Policy Research
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Comprehensive policy research and analysis covering digital
              governance, environmental protection, corporate accountability,
              and justice system reforms.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search policy research..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-gray-600">
              Showing {filteredItems.length} of {policyItems.length} policy
              documents
            </p>
          </div>
        </div>
      </div>

      {/* Policy Items */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {filteredItems.map((policy) => (
              <div
                key={policy.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    {/* Category and Status Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                        {policy.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                          policy.status
                        )}`}
                      >
                        {getStatusIcon(policy.status)}
                        {policy.status}
                      </span>
                    </div>

                    {/* Policy Number */}
                    {policy.policyNumber && (
                      <div className="mb-4">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          Policy No: {policy.policyNumber}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {policy.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {policy.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(policy.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>{policy.author}</span>
                      </div>
                      {policy.effectiveDate && (
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>
                            Effective:{" "}
                            {new Date(policy.effectiveDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stakeholders */}
                    {policy.stakeholders && policy.stakeholders.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Key Stakeholders:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {policy.stakeholders.map((stakeholder, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                              {stakeholder}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {policy.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 lg:min-w-[200px]">
                    {policy.downloadUrl && (
                      <button className="flex items-center justify-center bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </button>
                    )}
                    {policy.externalUrl && (
                      <button className="flex items-center justify-center border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Online
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No policy documents found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
