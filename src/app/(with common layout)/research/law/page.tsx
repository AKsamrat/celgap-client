"use client";
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  Eye,
  MapPin,
  Search,
  Share2,
  Target,
  User,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  preview: string;
  author: string;
  date: string;
  location: string;
  duration: string;
  participants?: number;
  downloadUrl?: string;
  readMoreUrl: string;
  tags: string[];
  category: string;
  featured: boolean;
  methodology: string;
}

interface CaseStudiesPageProps {
  caseStudies?: CaseStudy[];
}

const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  caseStudies: propCaseStudies,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(
    null
  );
  const [sortBy, setSortBy] = useState<string>("date");

  const defaultCaseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Disability Rights Implementation: Karnataka State Case Study",
      description:
        "A comprehensive case study analyzing the implementation of disability rights legislation in Karnataka state.",
      preview:
        "This case study provides an in-depth examination of disability rights implementation in Karnataka, analyzing both successes and challenges in executing the Rights of Persons with Disabilities Act, 2016. Through field research across 12 districts, interviews with 200+ stakeholders, and policy analysis, we present a comprehensive picture of ground-level implementation. The study highlights innovative practices, identifies bottlenecks in service delivery, and proposes actionable recommendations for improving accessibility and inclusion.",
      author: "Advocate Meera Krishnan",
      date: "January 20, 2024",
      location: "Karnataka, India",
      duration: "8 months",
      participants: 200,
      downloadUrl: "#",
      readMoreUrl: "#",
      tags: [
        "Disability Rights",
        "Implementation",
        "Karnataka",
        "Policy Analysis",
      ],
      category: "Human Rights",
      featured: true,
      methodology: "Mixed Methods",
    },
    {
      id: 2,
      title: "Criminal Justice Reform: Lessons from Pilot Programs",
      description:
        "Case study examining innovative criminal justice reform pilot programs and their outcomes across multiple states.",
      preview:
        "Criminal justice reform is essential for ensuring fair and effective legal processes. This case study analyzes several pilot programs implemented across different states, examining their methodologies, outcomes, and potential for scalability. From alternative dispute resolution mechanisms to rehabilitation-focused approaches, we evaluate innovative practices that are reshaping the criminal justice landscape. The study covers programs in Delhi, Maharashtra, and Tamil Nadu.",
      author: "Dr. Rajesh Kumar",
      date: "October 15, 2023",
      location: "Multi-state study",
      duration: "12 months",
      participants: 500,
      downloadUrl: "#",
      readMoreUrl: "#",
      tags: ["Criminal Justice", "Reform", "Pilot Programs", "Rehabilitation"],
      category: "Judicial System",
      featured: true,
      methodology: "Comparative Analysis",
    },
    {
      id: 3,
      title: "Legal Aid Implementation: Rural Access Study",
      description:
        "Examining the challenges and successes of legal aid implementation in rural areas of Rajasthan.",
      preview:
        "Access to legal aid is crucial for ensuring justice for all. This case study examines the implementation of legal aid programs in rural areas of Rajasthan, identifying best practices and challenges in service delivery. Through community surveys, stakeholder interviews, and service mapping, we analyze the effectiveness of different delivery models and propose strategies for improving rural access to legal services.",
      author: "Prof. Anjali Verma",
      date: "September 12, 2023",
      location: "Rajasthan, India",
      duration: "6 months",
      participants: 150,
      downloadUrl: "#",
      readMoreUrl: "#",
      tags: ["Legal Aid", "Rural Access", "Service Delivery", "Justice"],
      category: "Access to Justice",
      featured: false,
      methodology: "Field Research",
    },
    {
      id: 4,
      title: "Gender Justice Implementation: Workplace Harassment Laws",
      description:
        "Analysis of workplace harassment law implementation in IT sector companies.",
      preview:
        "The Sexual Harassment of Women at Workplace Act, 2013 marked a significant step in addressing workplace gender-based violence. This case study examines implementation practices across 50 IT companies in Bangalore, analyzing compliance levels, effectiveness of Internal Committees, and impact on workplace culture. The study identifies best practices and implementation challenges.",
      author: "Dr. Priya Nair",
      date: "August 25, 2023",
      location: "Bangalore, Karnataka",
      duration: "4 months",
      participants: 300,
      readMoreUrl: "#",
      tags: ["Gender Justice", "Workplace Laws", "IT Sector", "Compliance"],
      category: "Human Rights",
      featured: false,
      methodology: "Survey Research",
    },
    {
      id: 5,
      title: "Environmental Justice: Community Participation in EIA Process",
      description:
        "Case study of community participation in Environmental Impact Assessment processes.",
      preview:
        "Meaningful community participation in Environmental Impact Assessment (EIA) is crucial for environmental justice. This case study examines community participation processes in EIA for industrial projects in Odisha, analyzing stakeholder engagement practices, information accessibility, and decision-making transparency. The study covers five major industrial projects and their community impact.",
      author: "Environmental Justice Team",
      date: "July 30, 2023",
      location: "Odisha, India",
      duration: "10 months",
      participants: 400,
      downloadUrl: "#",
      readMoreUrl: "#",
      tags: [
        "Environmental Justice",
        "Community Participation",
        "EIA",
        "Industrial Projects",
      ],
      category: "Environmental Law",
      featured: false,
      methodology: "Participatory Research",
    },
    {
      id: 6,
      title: "Digital Governance: E-Courts Implementation Study",
      description:
        "Evaluation of e-courts implementation and its impact on access to justice.",
      preview:
        "The e-courts project aims to transform the Indian judiciary through technology. This case study evaluates the implementation of e-courts systems across different court levels in Gujarat, examining user adoption, efficiency gains, and challenges in digital transition. The study includes analysis of case management systems, video conferencing, and digital filing processes.",
      author: "Technology & Law Research Group",
      date: "June 18, 2023",
      location: "Gujarat, India",
      duration: "7 months",
      participants: 250,
      downloadUrl: "#",
      readMoreUrl: "#",
      tags: ["Digital Governance", "E-Courts", "Technology", "Judicial Reform"],
      category: "Judicial System",
      featured: false,
      methodology: "Implementation Study",
    },
  ];

  const caseStudies = propCaseStudies || defaultCaseStudies;

  const categories = [
    "all",
    ...Array.from(new Set(caseStudies.map((study) => study.category))),
  ];

  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || study.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedCaseStudies = [...filteredCaseStudies].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      case "location":
        return a.location.localeCompare(b.location);
      default:
        return 0;
    }
  });

  const featuredCaseStudies = sortedCaseStudies.filter(
    (study) => study.featured
  );
  const regularCaseStudies = sortedCaseStudies.filter(
    (study) => !study.featured
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 bg-[url('/articles.webp')] bg-cover bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-10">
            <div className="flex text-white items-center justify-center mb-4">
              <Briefcase className="h-12 w-12 mr-4" />
              <h1 className="text-5xl font-bold">Case Studies</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Explore our detailed case studies examining real-world
              implementation of laws, policies, and reforms across different
              contexts and regions.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {caseStudies.length}
              </div>
              <div className="text-gray-600">Total Case Studies</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {categories.length - 1}
              </div>
              <div className="text-gray-600">Focus Areas</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {featuredCaseStudies.length}
              </div>
              <div className="text-gray-600">Featured Studies</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">15+</div>
              <div className="text-gray-600">States Covered</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="location">Sort by Location</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Case Studies */}
        {featuredCaseStudies.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Case Studies
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredCaseStudies.map((study) => (
                <div
                  key={study.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500"
                >
                  {/* Featured Badge */}
                  <div className="bg-orange-500 text-white px-6 py-2">
                    <span className="text-sm font-medium flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      FEATURED STUDY
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        {study.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {study.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                      {study.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{study.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>{study.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{study.location}</span>
                      </div>
                      {study.participants && (
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 flex-shrink-0" />
                          <span>{study.participants} participants</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {study.description}
                    </p>

                    {/* Methodology Badge */}
                    <div className="mb-4">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {study.methodology}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {study.tags.length > 3 && (
                        <span className="text-gray-500 text-xs">
                          +{study.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedCaseStudy(study)}
                          className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            View Details
                          </span>
                        </button>
                        <a
                          href={study.readMoreUrl}
                          className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Full Study
                          </span>
                        </a>
                      </div>
                      {study.downloadUrl && (
                        <a
                          href={study.downloadUrl}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <Download className="h-4 w-4" />
                          <span className="text-sm font-medium">Download</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Case Studies */}
        <div>
          {featuredCaseStudies.length > 0 && (
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              All Case Studies
            </h2>
          )}

          {regularCaseStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularCaseStudies.map((study) => (
                <div
                  key={study.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  {/* Header with Icon */}
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-5 w-5 text-white" />
                        <span className="text-white text-sm font-medium">
                          Case Study
                        </span>
                      </div>
                      <span className="text-purple-100 text-xs">
                        {study.duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                        {study.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {study.methodology}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {study.title}
                    </h3>

                    <div className="grid grid-cols-1 gap-2 text-xs text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{study.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{study.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-4">
                      {study.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {study.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {study.tags.length > 2 && (
                        <span className="text-gray-400 text-xs">
                          +{study.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <a
                        href={study.readMoreUrl}
                        className="text-purple-600 hover:text-purple-800 transition-colors flex items-center space-x-1"
                      >
                        <span className="text-sm font-medium">Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedCaseStudy(study)}
                          className="text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {study.downloadUrl && (
                          <a
                            href={study.downloadUrl}
                            className="text-gray-500 hover:text-purple-600 transition-colors"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No case studies found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Case Study Details Modal */}
        {selectedCaseStudy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 line-clamp-2">
                    {selectedCaseStudy.title}
                  </h2>
                  <button
                    onClick={() => setSelectedCaseStudy(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Case Study Header */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedCaseStudy.category}
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{selectedCaseStudy.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedCaseStudy.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedCaseStudy.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedCaseStudy.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Case Study Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Study Overview
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedCaseStudy.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Detailed Analysis
                    </h3>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {selectedCaseStudy.preview}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Study Details
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">
                            {selectedCaseStudy.location}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">
                            {selectedCaseStudy.duration}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Methodology:</span>
                          <span className="font-medium">
                            {selectedCaseStudy.methodology}
                          </span>
                        </div>
                        {selectedCaseStudy.participants && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Participants:</span>
                            <span className="font-medium">
                              {selectedCaseStudy.participants}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Focus Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCaseStudy.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Key Findings Section */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      <span>Key Research Objectives</span>
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>
                        Analyze implementation effectiveness and identify
                        systemic challenges
                      </li>
                      <li>Document best practices and innovative approaches</li>
                      <li>
                        Assess stakeholder engagement and community impact
                      </li>
                      <li>
                        Provide actionable recommendations for policy
                        improvement
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-8">
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm">Share</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                      <Bookmark className="h-4 w-4" />
                      <span className="text-sm">Save</span>
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href={selectedCaseStudy.readMoreUrl}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm font-medium">Full Study</span>
                    </a>
                    {selectedCaseStudy.downloadUrl && (
                      <a
                        href={selectedCaseStudy.downloadUrl}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Download PDF
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Research Collaboration */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Collaborate on Research
          </h3>
          <p className="text-gray-600 mb-6">
            Interested in collaborating on case studies or sharing your
            implementation experiences? Wed love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 text-white px-8 py-3 font-medium hover:bg-purple-700 transition-colors duration-200 rounded-lg">
              Propose a Study
            </button>
            <button className="border border-purple-600 text-purple-600 px-8 py-3 font-medium hover:bg-purple-50 transition-colors duration-200 rounded-lg">
              Contact Research Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesPage;
