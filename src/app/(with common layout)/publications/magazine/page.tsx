"use client";

import {
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  Eye,
  Filter,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";

interface Publication {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  author: string;
  tags: string[];
  downloadUrl?: string;
  externalUrl?: string;
  pages?: number;
  journal?: string;
  volume?: string;
  issue?: string;
  views?: number;
  downloads?: number;
}

const publications: Publication[] = [
  {
    id: 1,
    title: "Digital Rights and Constitutional Framework in India",
    description:
      "A comprehensive analysis of how digital rights are being interpreted within India's constitutional framework, examining recent judicial decisions and legislative developments.",
    type: "Journal Article",
    date: "2024-12-10",
    author: "Dr. Priya Sharma, Prof. Rajesh Kumar",
    tags: ["Digital Rights", "Constitutional Law", "India"],
    downloadUrl: "#",
    externalUrl: "#",
    pages: 45,
    journal: "Indian Journal of Constitutional Law",
    volume: "15",
    issue: "3",
    views: 1250,
    downloads: 340,
  },
  {
    id: 2,
    title: "Environmental Governance and Climate Policy",
    description:
      "Research monograph examining the intersection of environmental law, governance structures, and climate policy implementation at national and state levels.",
    type: "Research Monograph",
    date: "2024-11-25",
    author: "Prof. Meera Patel",
    tags: ["Environmental Law", "Climate Policy", "Governance"],
    downloadUrl: "#",
    pages: 120,
    views: 890,
    downloads: 210,
  },
  {
    id: 3,
    title:
      "Corporate Social Responsibility: Legal Framework and Implementation",
    description:
      "Working paper analyzing the legal requirements for corporate social responsibility in India and evaluating implementation effectiveness across different sectors.",
    type: "Working Paper",
    date: "2024-11-15",
    author: "Dr. Anil Gupta, Ms. Sunita Rao",
    tags: ["Corporate Law", "CSR", "Implementation"],
    downloadUrl: "#",
    externalUrl: "#",
    pages: 28,
    views: 675,
    downloads: 145,
  },
  {
    id: 4,
    title: "Human Rights and Technology: A Global Perspective",
    description:
      "Book chapter examining the intersection of human rights law and emerging technologies, with case studies from multiple jurisdictions.",
    type: "Book Chapter",
    date: "2024-10-30",
    author: "Justice (Retd.) Vikram Singh",
    tags: ["Human Rights", "Technology", "Global Perspective"],
    externalUrl: "#",
    pages: 35,
    journal: "Technology and Law: Contemporary Issues",
    views: 1100,
    downloads: 280,
  },
  {
    id: 5,
    title: "Legal Education Reform in the Digital Age",
    description:
      "Policy brief proposing reforms to legal education curriculum to address digital literacy and technology law competencies.",
    type: "Policy Brief",
    date: "2024-10-15",
    author: "Dr. Nithya Rajshekhar",
    tags: ["Legal Education", "Digital Literacy", "Policy"],
    downloadUrl: "#",
    pages: 12,
    views: 520,
    downloads: 95,
  },
  {
    id: 6,
    title: "Access to Justice Through Technology",
    description:
      "Conference paper presented at the International Conference on Legal Technology, discussing how technology can improve access to justice.",
    type: "Conference Paper",
    date: "2024-09-20",
    author: "Prof. Kavita Sharma, Dr. Rohit Verma",
    tags: ["Access to Justice", "Technology", "Legal Innovation"],
    downloadUrl: "#",
    externalUrl: "#",
    pages: 18,
    views: 780,
    downloads: 165,
  },
];

const publicationTypes = [
  "All",
  "Journal Article",
  "Research Monograph",
  "Working Paper",
  "Book Chapter",
  "Policy Brief",
  "Conference Paper",
];

export default function PublicationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [filteredItems, setFilteredItems] = useState(publications);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterItems(term, selectedType);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterItems(searchTerm, type);
  };

  const filterItems = (search: string, type: string) => {
    let filtered = publications;

    if (type !== "All") {
      filtered = filtered.filter((item) => item.type === type);
    }

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          ) ||
          item.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      "Journal Article": "bg-blue-100 text-blue-800",
      "Research Monograph": "bg-green-100 text-green-800",
      "Working Paper": "bg-yellow-100 text-yellow-800",
      "Book Chapter": "bg-purple-100 text-purple-800",
      "Policy Brief": "bg-red-100 text-red-800",
      "Conference Paper": "bg-indigo-100 text-indigo-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-16 h-16 text-blue-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
              Magazine
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Access our comprehensive collection of research publications,
              including journal articles, working papers, policy briefs, and
              conference proceedings.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white ">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedType}
                  onChange={(e) => handleTypeFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                >
                  {publicationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-gray-600">
              Showing {filteredItems.length} of {publications.length}{" "}
              publications
            </p>
          </div>
        </div>
      </div>

      {/* Publications */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {filteredItems.map((publication) => (
              <div
                key={publication.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    {/* Type Badge */}
                    <div className="mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                          publication.type
                        )}`}
                      >
                        {publication.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {publication.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {publication.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(publication.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>{publication.author}</span>
                      </div>
                      {publication.pages && (
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          <span>{publication.pages} pages</span>
                        </div>
                      )}
                    </div>

                    {/* Journal Information */}
                    {publication.journal && (
                      <div className="text-sm text-gray-600 mb-4">
                        <strong>Published in:</strong> {publication.journal}
                        {publication.volume && publication.issue && (
                          <span>
                            , Vol. {publication.volume}, Issue{" "}
                            {publication.issue}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    {(publication.views || publication.downloads) && (
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                        {publication.views && (
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            <span>
                              {publication.views.toLocaleString()} views
                            </span>
                          </div>
                        )}
                        {publication.downloads && (
                          <div className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            <span>
                              {publication.downloads.toLocaleString()} downloads
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {publication.tags.map((tag, index) => (
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
                    {publication.downloadUrl && (
                      <button className="flex items-center justify-center bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </button>
                    )}
                    {publication.externalUrl && (
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
                No publications found
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
