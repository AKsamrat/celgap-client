"use client";
import { Calendar, Clock, Download, Play, Users, Wifi } from "lucide-react";
import React, { useState } from "react";

interface Webinar {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  description: string;
  speaker: {
    name: string;
    title: string;
    organization: string;
  };
  attendees?: number;
  status: "upcoming" | "live" | "recorded";
  category: string;
  registrationLink?: string;
  recordingLink?: string;
  thumbnail?: string;
  platform: string;
}

interface WebinarsPageProps {
  webinars?: Webinar[];
}

const WebinarsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const defaultWebinars: Webinar[] = [
    {
      id: 1,
      title: "Understanding Digital Rights in the Age of AI",
      date: "July 20, 2025",
      time: "3:00 PM IST",
      duration: "90 minutes",
      description:
        "An in-depth discussion on how artificial intelligence is reshaping digital rights, privacy concerns, and the need for comprehensive legal frameworks to protect individual freedoms in the digital age.",
      speaker: {
        name: "Dr. Priya Sharma",
        title: "Senior Researcher",
        organization: "Digital Rights Foundation",
      },
      attendees: 250,
      status: "upcoming",
      category: "Digital Rights",
      registrationLink: "#",
      platform: "Zoom",
    },
    {
      id: 2,
      title: "Constitutional Challenges in Emergency Powers",
      date: "July 15, 2025",
      time: "2:00 PM IST",
      duration: "60 minutes",
      description:
        "Examining the constitutional implications of emergency powers and their impact on fundamental rights during crisis situations.",
      speaker: {
        name: "Justice (Retd.) Rajesh Kumar",
        title: "Former High Court Judge",
        organization: "Constitutional Law Institute",
      },
      attendees: 180,
      status: "live",
      category: "Constitutional Law",
      platform: "YouTube Live",
    },
    {
      id: 3,
      title: "Disability Rights: Legal Remedies and Implementation",
      date: "June 28, 2025",
      time: "4:00 PM IST",
      duration: "75 minutes",
      description:
        "A comprehensive overview of disability rights legislation, available legal remedies, and challenges in implementation at the grassroots level.",
      speaker: {
        name: "Advocate Meera Krishnan",
        title: "Disability Rights Lawyer",
        organization: "Centre for Disability Rights",
      },
      attendees: 320,
      status: "recorded",
      category: "Disability Rights",
      recordingLink: "#",
      platform: "Google Meet",
    },
    {
      id: 4,
      title: "Gender Justice and Workplace Harassment Laws",
      date: "August 5, 2025",
      time: "11:00 AM IST",
      duration: "120 minutes",
      description:
        "Analyzing the effectiveness of current workplace harassment laws and exploring legal pathways for ensuring gender justice in professional environments.",
      speaker: {
        name: "Prof. Anjali Verma",
        title: "Professor of Law",
        organization: "National Law University",
      },
      attendees: 200,
      status: "upcoming",
      category: "Gender & Sexuality",
      registrationLink: "#",
      platform: "Microsoft Teams",
    },
  ];



  const getStatusColor = (status: string): string => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500";
      case "live":
        return "bg-red-500";
      case "recorded":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string): string => {
    switch (status) {
      case "upcoming":
        return "text-blue-700 bg-blue-100";
      case "live":
        return "text-red-700 bg-red-100";
      case "recorded":
        return "text-green-700 bg-green-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <Wifi className="h-4 w-4" />;
      case "recorded":
        return <Play className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 ">
          <h1 className="text-5xl font-bold text-[#0347A7] mb-4 tracking-wider">
            WEBINARS
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our interactive online sessions featuring expert speakers
            discussing contemporary legal issues, policy developments, and
            practical insights from the field.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
            <div className="text-gray-600">Total Webinars</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
            <div className="text-gray-600">Total Participants</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">15</div>
            <div className="text-gray-600">Expert Speakers</div>
          </div>
        </div>

        {/* Filters */}
        {/* <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <div className="flex items-center gap-2">
            <label
              htmlFor="category-filter"
              className="text-sm font-medium text-gray-700"
            >
              Category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="status-filter"
              className="text-sm font-medium text-gray-700"
            >
              Status:
            </label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Status"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        {/* Webinars Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {defaultWebinars.map((webinar) => (
            <div
              key={webinar.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Webinar Header */}
              <div className="relative">
                <div className={`${getStatusColor(webinar.status)} h-1`}></div>

                {/* Thumbnail/Placeholder */}
                <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  {webinar.status === "recorded" ? (
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Play className="h-8 w-8 text-purple-600 ml-1" />
                    </div>
                  ) : webinar.status === "live" ? (
                    <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full">
                      <Wifi className="h-4 w-4 animate-pulse" />
                      <span className="text-sm font-medium">LIVE NOW</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Calendar className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                      <span className="text-sm text-purple-600 font-medium">
                        UPCOMING
                      </span>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusBadge(
                      webinar.status
                    )}`}
                  >
                    {getStatusIcon(webinar.status)}
                    {webinar.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Webinar Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-tight">
                  {webinar.title}
                </h3>

                {/* Webinar Details */}
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>{webinar.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span>
                      {webinar.time} • {webinar.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span>{webinar.attendees} participants</span>
                  </div>
                </div>

                {/* Speaker Info */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">
                      {webinar.speaker.name}
                    </div>
                    <div className="text-gray-600">{webinar.speaker.title}</div>
                    <div className="text-xs text-purple-600">
                      {webinar.speaker.organization}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {webinar.description}
                </p>

                {/* Category Tag and Platform */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                    {webinar.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    via {webinar.platform}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {webinar.status === "upcoming" &&
                    webinar.registrationLink && (
                      <button className="flex-1 bg-purple-500 text-white px-4 py-2 text-sm font-medium hover:bg-purple-600 transition-colors duration-200 rounded-lg">
                        REGISTER FREE
                      </button>
                    )}
                  {webinar.status === "live" && (
                    <button className="flex-1 bg-red-500 text-white px-4 py-2 text-sm font-medium hover:bg-red-600 transition-colors duration-200 rounded-lg flex items-center justify-center gap-2">
                      <Wifi className="h-4 w-4" />
                      JOIN LIVE
                    </button>
                  )}
                  {webinar.status === "recorded" && webinar.recordingLink && (
                    <>
                      <button className="flex-1 bg-green-500 text-white px-4 py-2 text-sm font-medium hover:bg-green-600 transition-colors duration-200 rounded-lg flex items-center justify-center gap-2">
                        <Play className="h-4 w-4" />
                        WATCH
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-3 py-2 text-sm hover:bg-gray-200 transition-colors duration-200 rounded-lg">
                        <Download className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {defaultWebinars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No webinars found matching your filters.
            </p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="text-center mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Never Miss a Webinar
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to get notified about upcoming webinars
            and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button className="bg-[#0347A7] text-white px-8 py-3 font-medium hover:bg-purple-600 transition-colors duration-200 rounded-lg">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarsPage;
