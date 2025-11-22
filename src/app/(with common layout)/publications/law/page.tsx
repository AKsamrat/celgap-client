"use client";

import {
  Calendar,
  Download,
  ExternalLink,
  Filter,
  Scale,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";

interface LawItem {
  id: number;

  title: string;
  description: string;
  abstruct?: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  keywords?: string[];
  downloadUrl?: string;
  externalUrl?: string;
  status?: string;
  caseNumber?: string;
}

const lawItems: LawItem[] = [
  {
    id: 1,
    title: "Constitutional Interpretation in Digital Age",
    description:
      "Analysis of how constitutional principles apply to digital rights, privacy, and technology governance in the modern era.",
    category: "Constitutional Law",
    date: "2024-12-20",
    author: "Justice (Retd.) Meera Sharma",
    tags: ["Constitutional Law", "Digital Rights", "Privacy"],
    downloadUrl: "#",
    externalUrl: "#",
  },
  {
    id: 2,
    title: "Environmental Law and Climate Justice",
    description:
      "Comprehensive study on environmental legislation, climate change litigation, and the role of courts in environmental protection.",
    category: "Environmental Law",
    date: "2024-12-05",
    author: "Prof. Vikram Singh",
    tags: ["Environmental Law", "Climate Change", "Litigation"],
    downloadUrl: "#",

  },
  {
    id: 3,
    title: "Corporate Criminal Liability Framework",
    description:
      "Examination of corporate criminal responsibility, compliance mechanisms, and enforcement strategies in business law.",
    category: "Corporate Law",
    date: "2024-11-18",
    author: "Dr. Anita Desai",
    tags: ["Corporate Law", "Criminal Liability", "Compliance"],
    externalUrl: "#",
  },
  {
    id: 4,
    title: "Human Rights in the Digital Era",
    description:
      "Research on the intersection of human rights law and digital technology, including data protection and online freedoms.",
    category: "Human Rights Law",
    date: "2024-11-02",
    author: "Prof. Rajesh Khanna",
    tags: ["Human Rights", "Digital Technology", "Data Protection"],
    downloadUrl: "#",
    externalUrl: "#",
  },
  {
    id: 5,
    title: "Labor Law Reforms and Worker Protection",
    description:
      "Analysis of recent labor law amendments and their impact on worker rights, employment security, and industrial relations.",
    category: "Labor Law",
    date: "2024-10-15",
    author: "Dr. Sunita Rao",
    tags: ["Labor Law", "Worker Rights", "Employment"],
    downloadUrl: "#",
  },
];

const categories = [
  "All",
  "Constitutional Law",
  "Environmental Law",
  "Corporate Law",
  "Human Rights Law",
  "Labor Law",
];

export default function LawPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(lawItems);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterItems(term, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterItems(searchTerm, category);
  };

  const filterItems = (search: string, category: string) => {
    let filtered = lawItems;

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    setFilteredItems(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Scale className="w-16 h-16 text-blue-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
              CELGAP Law Journal
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Comprehensive legal research covering constitutional law,
              environmental law, corporate law, human rights, and emerging legal
              frameworks.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white  ">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search legal research..."
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
            </div>

            {/* Results Count */}
            <p className="text-gray-600">
              Showing {filteredItems.length} of {lawItems.length} legal research
              items
            </p>
          </div>
        </div>
      </div>

      {/* Research Items */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {item.title}
                    </h3>

                    {/* Case Number (if applicable) */}
                    {item?.caseNumber && (
                      <div className="mb-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Case: {item?.caseNumber}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>{item.author}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map((tag, index) => (
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
                    {item.downloadUrl && (
                      <button className="flex items-center justify-center bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </button>
                    )}
                    {item.externalUrl && (
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
                No results found
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
