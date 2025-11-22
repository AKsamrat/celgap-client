"use client";
import { Clock, MapPin, Users } from "lucide-react";
import React, { useState } from "react";

interface Conference {
  id: number;
  title: string;
  date: string;
  month: string;
  year: string;
  venue: string;
  time: string;
  description: string;
  attendees?: number;
  status: "upcoming" | "ongoing" | "completed";
  category: string;
  registrationLink?: string;
}

interface ConferencesPageProps {
  conferences?: Conference[];
}

const ConferencesPage = ({

}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const defaultConferences: Conference[] = [
    {
      id: 1,
      title:
        "Equal Justice: Pathways for Women from the Corporate Bar to the Higher Judiciary",
      date: "28th",
      month: "JUN",
      year: "2025",
      venue: "Westminster, ITC Windsor, Bengaluru",
      time: "11:00 AM - 2:00 PM",
      description:
        "A comprehensive roundtable discussion addressing the systemic barriers that hinder women's advancement in the judiciary, featuring distinguished speakers from the legal community.",
      attendees: 150,
      status: "completed",
      category: "Gender & Justice",
      registrationLink: "#",
    },
    {
      id: 2,
      title: "Constitutional Culture and Democratic Values in Modern India",
      date: "15th",
      month: "JUL",
      year: "2025",
      venue: "India International Centre, New Delhi",
      time: "10:00 AM - 5:00 PM",
      description:
        "An intensive conference exploring the evolution of constitutional culture and its impact on democratic institutions in contemporary India.",
      attendees: 200,
      status: "upcoming",
      category: "Constitutional Law",
      registrationLink: "#",
    },
    {
      id: 3,
      title:
        "Disability Rights and Legal Framework: Building Inclusive Societies",
      date: "22nd",
      month: "AUG",
      year: "2025",
      venue: "Centre for Law and Policy Research, Bengaluru",
      time: "9:30 AM - 4:30 PM",
      description:
        "A multi-stakeholder conference focusing on disability rights litigation strategies and policy implementation challenges.",
      attendees: 120,
      status: "upcoming",
      category: "Disability Rights",
      registrationLink: "#",
    },
    {
      id: 4,
      title: "Governance Reform and Judicial Accountability",
      date: "10th",
      month: "SEP",
      year: "2025",
      venue: "National Law School, Bengaluru",
      time: "2:00 PM - 6:00 PM",
      description:
        "Examining contemporary challenges in governance reform and mechanisms for ensuring judicial accountability in India.",
      attendees: 180,
      status: "upcoming",
      category: "Governance Reform",
    },
  ];



  const getStatusColor = (status: string): string => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500";
      case "ongoing":
        return "bg-green-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string): string => {
    switch (status) {
      case "upcoming":
        return "text-blue-700 bg-blue-100";
      case "ongoing":
        return "text-green-700 bg-green-100";
      case "completed":
        return "text-gray-700 bg-gray-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-900 mb-4 tracking-wider">
            CONFERENCES
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join us for thought-provoking conferences that bring together legal
            experts, policymakers, and civil society to discuss critical issues
            in law and governance.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {/* <div className="flex items-center gap-2">
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
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div> */}

          {/* <div className="flex items-center gap-2">
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
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Status"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div> */}
        </div>

        {/* Conferences Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {defaultConferences.map((conference) => (
            <div
              key={conference.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Conference Header */}
              <div className="relative">
                <div
                  className={`${getStatusColor(conference.status)} h-2`}
                ></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    {/* Date Badge */}
                    <div className="flex-shrink-0 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex flex-col items-center justify-center text-white shadow-lg">
                        <span className="text-xl font-bold">
                          {conference.date}
                        </span>
                        <span className="text-xs font-medium">
                          {conference.month}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {conference.year}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        conference.status
                      )}`}
                    >
                      {conference.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-4 leading-tight">
                    {conference.title}
                  </h3>

                  {/* Conference Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {conference.venue}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {conference.time}
                      </span>
                    </div>
                    {conference.attendees && (
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">
                          {conference.attendees} Expected Attendees
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    {conference.description}
                  </p>

                  {/* Category Tag */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {conference.category}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {conference.status === "upcoming" &&
                        conference.registrationLink && (
                          <button className="bg-blue-500 text-white px-4 py-2 text-sm font-medium hover:bg-blue-600 transition-colors duration-200 rounded-lg">
                            REGISTER
                          </button>
                        )}
                      <button className="border border-gray-400 text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 rounded-lg">
                        LEARN MORE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {defaultConferences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No conferences found matching your filters.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Want to Host a Conference?
          </h3>
          <p className="text-gray-600 mb-6">
            Partner with us to organize impactful conferences on legal and
            policy matters.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 font-medium hover:bg-blue-600 transition-colors duration-200 rounded-lg">
            CONTACT US
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConferencesPage;
