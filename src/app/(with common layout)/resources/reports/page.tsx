"use client";
import AllCard from "@/components/cards/AllCard";
import FeaturedCard from "@/components/cards/FeaturedCard";
import ReportModal from "@/components/Modal/ResourceModal";
import { FileText, Search } from "lucide-react";
import React, { useState } from "react";

interface Report {
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

interface ReportsPageProps {
  reports?: Report[];
}

const ReportsPage: React.FC<ReportsPageProps> = ({ reports: propReports }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [sortBy, setSortBy] = useState<string>("date");

  const defaultReports: Report[] = [
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

  const reports = propReports || defaultReports;

  const categories = [
    "all",
    ...Array.from(new Set(reports.map((report) => report.category))),
  ];

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedReports = [...filteredReports].sort((a, b) => {
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

  const featuredReports = sortedReports.filter((report) => report.featured);
  const regularReports = sortedReports.filter((report) => !report.featured);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 bg-[url('/articles.webp')] bg-cover bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-10">
            <div className="flex text-white items-center justify-center mb-4">
              <FileText className="h-12 w-12 mr-4" />
              <h1 className="text-5xl font-bold">Reports</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Access our comprehensive research reports, policy studies, and
              detailed findings on critical legal and governance issues.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {reports.length}
              </div>
              <div className="text-gray-600">Total Reports</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {categories.length - 1}
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {featuredReports.length}
              </div>
              <div className="text-gray-600">Featured Reports</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">2000+</div>
              <div className="text-gray-600">Total Pages</div>
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
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="pages">Sort by Pages</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Reports */}
        {featuredReports.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Report
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredReports.map((report) => (
                <FeaturedCard
                  key={report.id}
                  title="Report"
                  report={report}
                  onViewDetails={(report) =>
                    setSelectedReport(report as Report)
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* All Reports */}
        <div>
          {featuredReports.length > 0 && (
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              All Reports
            </h2>
          )}

          {regularReports.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularReports.map((report) => (
                <AllCard
                  key={report.id}
                  title="Report"
                  report={report}
                  onViewDetails={() => setSelectedReport(report)}
                ></AllCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No reports found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Report Details Modal */}
        {selectedReport && (
          <ReportModal
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
          />
        )}

        {/* Newsletter Signup */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Get Research Updates
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to receive notifications when we publish new reports and
            research findings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-900 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors duration-200 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
