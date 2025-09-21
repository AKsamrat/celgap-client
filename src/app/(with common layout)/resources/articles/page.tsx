"use client";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  Eye,
  Search,
  Share2,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface Article {
  id: number;
  title: string;
  description: string;
  preview: string;
  author: string;
  date: string;
  readTime: string;
  downloadUrl?: string;
  readMoreUrl: string;
  tags: string[];
  category: string;
  featured: boolean;
  imageUrl?: string;
}

interface ArticlesPageProps {
  articles?: Article[];
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({
  articles: propArticles,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [sortBy, setSortBy] = useState<string>("date");

  const defaultArticles: Article[] = [
    {
      id: 1,
      title:
        "Constitutional Rights in the Digital Age: Privacy and Data Protection",
      description:
        "An in-depth analysis of how constitutional rights apply to digital privacy and data protection in modern India.",
      preview:
        "The rapid digitization of society has created new challenges for constitutional rights, particularly regarding privacy and data protection. This comprehensive analysis examines the intersection of technology and fundamental rights, exploring how traditional constitutional principles adapt to the digital landscape. We investigate recent Supreme Court judgments, emerging legislative frameworks, and their implications for citizens' digital rights. The article also discusses the balance between security concerns and privacy protection, examining international best practices and their applicability to the Indian context.",
      author: "Dr. Priya Sharma",
      date: "March 15, 2024",
      readTime: "12 min read",
      downloadUrl: "#",
      readMoreUrl: "#",
      tags: ["Constitutional Law", "Digital Rights", "Privacy", "Technology"],
      category: "Constitutional Law",
      featured: true,
      imageUrl: "/article2.webp",
    },
    {
      id: 2,
      title: "Electoral Reforms and Democratic Accountability in India",
      description:
        "Exploring the need for electoral reforms to strengthen democratic accountability and transparency.",
      preview:
        "Democratic accountability forms the cornerstone of any robust democracy. This article examines the current state of electoral processes in India and identifies key areas requiring reform. From campaign finance transparency to the use of technology in elections, we analyze various aspects that impact democratic accountability. The piece draws on comparative studies, expert opinions, and empirical data to present a comprehensive view of electoral challenges and potential solutions.",
      author: "Vineeth Krishna",
      date: "February 28, 2024",
      readTime: "18 min read",
      downloadUrl: "#",
      readMoreUrl: "#",
      tags: ["Electoral Reforms", "Democracy", "Governance", "Accountability"],
      category: "Governance",
      featured: true,
      imageUrl: "/article2.webp",
    },
    {
      id: 3,
      title: "Judicial Accountability and Transparency Mechanisms",
      description:
        "Analysis of existing and proposed mechanisms for ensuring judicial accountability and transparency in India.",
      preview:
        "Judicial accountability is fundamental to maintaining public trust in the legal system. This article explores various mechanisms for ensuring transparency in judicial processes, examining the delicate balance between judicial independence and accountability. We analyze recent developments in judicial reforms, the role of judicial councils, and the impact of technology on court proceedings.",
      author: "Justice (Retd.) Rajesh Gupta",
      date: "February 10, 2024",
      readTime: "15 min read",
      readMoreUrl: "#",
      tags: ["Judicial Reforms", "Transparency", "Accountability", "Courts"],
      category: "Judicial System",
      featured: false,
      imageUrl: "/article2.webp",
    },
    {
      id: 4,
      title: "Gender Equality in Legal Education: Challenges and Opportunities",
      description:
        "Examining gender representation and equality issues in legal education institutions across India.",
      preview:
        "Legal education plays a crucial role in shaping the future of the legal profession. This article examines gender equality challenges within legal education institutions, analyzing enrollment patterns, faculty representation, and institutional policies. We explore how gender dynamics in legal education impact the broader legal profession and suggest reforms for creating more inclusive learning environments.",
      author: "Prof. Anjali Verma",
      date: "January 25, 2024",
      readTime: "14 min read",
      downloadUrl: "#",
      readMoreUrl: "#",
      tags: ["Gender Equality", "Legal Education", "Institutional Reform"],
      category: "Human Rights",
      featured: false,
      imageUrl: "/article2.webp",
    },
    {
      id: 5,
      title:
        "Environmental Constitutionalism: Rights of Nature in Indian Context",
      description:
        "Exploring the concept of environmental constitutionalism and rights of nature within Indian legal framework.",
      preview:
        "Environmental constitutionalism represents an emerging paradigm in environmental law. This article explores how the concept of rights of nature can be understood and implemented within the Indian constitutional framework. We examine international precedents, indigenous perspectives, and judicial pronouncements that contribute to environmental jurisprudence in India.",
      author: "Dr. Kavitha Srinivasan",
      date: "January 12, 2024",
      readTime: "16 min read",
      readMoreUrl: "#",
      tags: ["Environmental Law", "Constitutional Rights", "Nature Rights"],
      category: "Environmental Law",
      featured: false,
      imageUrl: "/article2.webp",
    },
    {
      id: 6,
      title: "Access to Justice: Technology and Legal Innovation",
      description:
        "How technology is transforming access to justice and legal service delivery in India.",
      preview:
        "Technology has the potential to revolutionize access to justice. This article examines various technological innovations being implemented in the Indian legal system, from e-filing systems to AI-powered legal research tools. We analyze the benefits and challenges of these innovations and their impact on making justice more accessible to marginalized communities.",
      author: "Adv. Suresh Kumar",
      date: "December 28, 2023",
      readTime: "13 min read",
      downloadUrl: "#",
      readMoreUrl: "#",
      tags: [
        "Access to Justice",
        "Technology",
        "Legal Innovation",
        "Digital India",
      ],
      category: "Legal Technology",
      featured: false,
      imageUrl: "/article2.webp",
    },
  ];

  const articles = propArticles || defaultArticles;

  const categories = [
    "all",
    ...Array.from(new Set(articles.map((article) => article.category))),
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      case "author":
        return a.author.localeCompare(b.author);
      default:
        return 0;
    }
  });

  const featuredArticles = sortedArticles.filter((article) => article.featured);
  const regularArticles = sortedArticles.filter((article) => !article.featured);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 bg-[url('/articles.webp')] bg-cover bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Glassmorphic Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-10">
            <div className="flex text-white items-center justify-center mb-4">
              <BookOpen className="h-12 w-12 mr-4" />
              <h1 className="text-5xl font-bold">Articles</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Explore our collection of research articles and analytical pieces
              covering contemporary legal issues, policy analysis, and
              constitutional matters.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {articles.length}
              </div>
              <div className="text-gray-600">Total Articles</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {categories.length - 1}
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {featuredArticles.length}
              </div>
              <div className="text-gray-600">Featured Articles</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600">Authors</div>
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
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Articles
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredArticles?.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                      <Image
                        src={article?.imageUrl || "/articles.webp"}
                        alt={article?.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        FEATURED
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {article?.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {article?.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article?.title}
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{article?.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article?.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {article?.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {article?.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedArticle(article)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            View Details
                          </span>
                        </button>
                      </div>
                      {article.downloadUrl && (
                        <a
                          href={article.downloadUrl}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
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

        {/* All Articles */}
        <div>
          {featuredArticles.length > 0 && (
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              All Articles
            </h2>
          )}

          {regularArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={article?.imageUrl || "/articles.webp"}
                      alt={article?.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <div className="flex items-center text-xs text-gray-600 mb-3">
                      <span>{article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{article.date}</span>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <a
                        href={article.readMoreUrl}
                        className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
                      >
                        <span className="text-sm font-medium">Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedArticle(article)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {article.downloadUrl && (
                          <a
                            href={article.downloadUrl}
                            className="text-gray-500 hover:text-blue-600 transition-colors"
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
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Article Details Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 line-clamp-2">
                    {selectedArticle.title}
                  </h2>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Article Header */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedArticle.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{selectedArticle.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedArticle.date}</span>
                    </div>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>

                {/* Article Image */}
                <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-6 overflow-hidden">
                  <Image
                    src={selectedArticle?.imageUrl || "/articles.webp"}
                    alt={selectedArticle?.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Abstract
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedArticle.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Full Preview
                    </h3>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {selectedArticle.preview}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
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
                    {selectedArticle.downloadUrl && (
                      <a
                        href={selectedArticle.downloadUrl}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span className="text-sm font-medium">Download</span>
                      </a>
                    )}
                    <a
                      href={selectedArticle.readMoreUrl}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Read Full Article
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to get notified when we publish new articles and research
            pieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors duration-200 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
