"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author?: string;
  category: string;
  categoryColor: string;
  description: string;
  bgColor: string;
  image?:string;
}

interface BlogSectionProps {
  posts?: BlogPost[];
  categories?: string[];
}

const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  categories: propCategories,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);

  const defaultCategories: string[] = [
    "CONSTITUTIONAL CULTURE",
    "DISCRIMINATION & INTERSECTIONALITY",
    "TRANSGENDER RIGHTS",
    "GENDER & SEXUALITY",
    "GOVERNANCE REFORM",
    "DISABILITY RIGHTS",
    "HUMAN RIGHTS",
    "LEGAL RESEARCH",
  ];

  const defaultBlogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Why Did Ambedkar Centralize the Conduct of Elections in India?",
      date: "SEPTEMBER 18, 2025",
      author: "VINEETH KRISHNA",
      category: "CONSTITUTIONAL CULTURE",
      categoryColor: "bg-red-500",
      description:
        "Recent controversies around the Election Commission of India's Special Intensive Revision (SIR) exercise have...",
      bgColor: "bg-gray-100",
    },
    {
      id: 2,
      title: "Call for Litigation Intern",
      date: "SEPTEMBER 18, 2025",
      category: "GOVERNANCE REFORM",
      categoryColor: "bg-orange-500",
      description:
        "The Centre for Law and Policy Research (CLPR) is a not-for-profit trust dedicated to making...",
      bgColor: "bg-gray-100",
    },
    {
      id: 3,
      title:
        "Event Report | Know Your Rights & Entitlements: Legal Rights of Persons with Disabilities | In Collaboration with Association of People with Disability (APD)",
      date: "SEPTEMBER 8, 2025",
      author: "PRIYA CHAUDHARY",
      category: "DISABILITY RIGHTS",
      categoryColor: "bg-blue-900",
      description:
        "The Centre for Law & Policy Research (CLPR), in collaboration with Association of People with...",
      bgColor: "bg-gray-100",
    },
    {
      id: 4,
      title:
        "Event Report | Know Your Rights & Entitlements: Legal Rights of Persons with Disabilities",
      date: "AUGUST 30, 2025",
      author: "PRIYA CHAUDHARY",
      category: "DISABILITY RIGHTS",
      categoryColor: "bg-red-500",
      description:
        "The Centre for Law & Policy Research (CLPR), in collaboration with PACTA, organised an awareness...",
      bgColor: "bg-gray-100",
    },
    {
      id: 5,
      title:
        "Event Report | Know Your Rights & Entitlements: Legal Rights of Persons with Disabilities",
      date: "AUGUST 30, 2025",
      author: "PRIYA CHAUDHARY",
      category: "DISABILITY RIGHTS",
      categoryColor: "bg-red-500",
      description:
        "The Centre for Law & Policy Research (CLPR), in collaboration with PACTA, organised an awareness...",
      bgColor: "bg-gray-100",
    },
    {
      id: 6,
      title:
        "Event Report | Know Your Rights & Entitlements: Legal Rights of Persons with Disabilities",
      date: "AUGUST 30, 2025",
      author: "PRIYA CHAUDHARY",
      category: "DISABILITY RIGHTS",
      categoryColor: "bg-red-500",
      description:
        "The Centre for Law & Policy Research (CLPR), in collaboration with PACTA, organised an awareness...",
      bgColor: "bg-gray-100",
    },
  ];

  const categories = propCategories || defaultCategories;
  const blogPosts = posts || defaultBlogPosts;

  const handleCategoryChange = (category: string): void => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredPosts: BlogPost[] =
    selectedCategories.length === 0
      ? blogPosts
      : blogPosts.filter((post) => selectedCategories.includes(post.category));

  const displayedCategories: string[] = showAllCategories
    ? categories
    : categories.slice(0, 5);

  const handleShowAllCategories = (): void => {
    setShowAllCategories(!showAllCategories);
  };

  const handleResetFilters = (): void => {
    setSelectedCategories([]);
  };

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <h2 className="text-4xl font-bold text-[#0347A7] mb-16 tracking-wider">
          BLOG
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredPosts.map((post: BlogPost) => (
                <div
                  key={post.id}
                  className={`${post.bgColor} rounded-lg overflow-hidden shadow-sm`}
                >
                  {/* Category Header */}
                  <div className={`${post.categoryColor} h-2`}></div>

                  {/* Post Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-gray-800 mb-4 leading-tight italic">
                      {post.title}
                    </h3>

                    <div className="flex flex-wrap items-center text-sm text-red-500 mb-4 gap-2">
                      <span className="font-medium">{post.date}</span>
                      {post.author && (
                        <>
                          <span className="text-gray-400">|</span>
                          <span className="font-medium">{post.author}</span>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed mb-6">
                      {post.description}
                    </p>

                    <button
                      className="border border-gray-400 text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 rounded"
                      aria-label={`Read more about ${post.title}`}
                    >
                      READ MORE
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No blog posts found for the selected categories.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-600 mb-4 tracking-wide">
                FILTER BY
              </h3>

              <div className="mb-6">
                <button
                  className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-4"
                  onClick={handleShowAllCategories}
                  aria-expanded={showAllCategories}
                  aria-controls="categories-list"
                >
                  <span>CATEGORIES</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      showAllCategories ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div id="categories-list" className="space-y-3">
                  {displayedCategories.map((category: string) => (
                    <label
                      key={category}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        aria-describedby={`category-${category
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      />
                      <span
                        className="text-sm text-gray-700"
                        id={`category-${category
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {category}
                      </span>
                    </label>
                  ))}
                </div>

                {!showAllCategories && categories.length > 5 && (
                  <button
                    onClick={() => setShowAllCategories(true)}
                    className="text-sm text-red-500 hover:text-red-600 mt-3 font-medium"
                  >
                    See {categories.length - 5} more
                  </button>
                )}

                {selectedCategories.length > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-sm text-red-500 hover:text-red-600 mt-4 font-medium block"
                  >
                    RESET
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <button
            className="bg-[#0347A7] text-white px-8 py-3 font-medium hover:bg-red-600 transition-colors duration-200 rounded-lg"
            aria-label="Load more blog posts"
          >
            LOAD MORE POSTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
