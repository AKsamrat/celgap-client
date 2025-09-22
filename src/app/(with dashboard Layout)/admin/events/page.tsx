"use client";

import AdminLayout from "@/components/admin/layout";
import {
  Calendar,
  Clock,
  Edit,
  Eye,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  type: "workshop" | "seminar" | "conference" | "webinar";
  organizer: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Constitutional Law Workshop",
    description:
      "Interactive workshop exploring recent constitutional developments and their practical implications.",
    date: "2025-01-28",
    time: "14:00",
    location: "New Delhi",
    capacity: 50,
    registered: 35,
    status: "upcoming",
    type: "workshop",
    organizer: "Legal Education Team",
  },
  {
    id: 2,
    title: "Digital Rights & Privacy Law Seminar",
    description:
      "Expert seminar discussing emerging challenges in digital rights and privacy legislation.",
    date: "2025-02-05",
    time: "18:00",
    location: "Online",
    capacity: 100,
    registered: 85,
    status: "upcoming",
    type: "seminar",
    organizer: "Digital Rights Committee",
  },
  {
    id: 3,
    title: "Environmental Law Conference 2024",
    description:
      "Annual conference on environmental law developments and climate litigation.",
    date: "2024-12-15",
    time: "09:00",
    location: "Mumbai",
    capacity: 200,
    registered: 180,
    status: "completed",
    type: "conference",
    organizer: "Environmental Law Society",
  },
  {
    id: 4,
    title: "Legal Writing Excellence Webinar",
    description:
      "Online webinar focused on improving legal writing skills and brief preparation.",
    date: "2025-02-20",
    time: "16:00",
    location: "Online",
    capacity: 150,
    registered: 45,
    status: "upcoming",
    type: "webinar",
    organizer: "Writing Skills Team",
  },
];

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || event.status === selectedStatus;
    const matchesType = selectedType === "all" || event.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-purple-100 text-purple-800";
      case "seminar":
        return "bg-green-100 text-green-800";
      case "conference":
        return "bg-blue-100 text-blue-800";
      case "webinar":
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
              Events Management
            </h2>
            <p className="text-gray-600 mt-2">
              Manage workshops, seminars, conferences, and webinars
            </p>
          </div>
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors duration-200">
            <Plus className="h-5 w-5 mr-2" />
            New Event
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
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
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="conference">Conference</option>
              <option value="webinar">Webinar</option>
            </select>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow-sm  overflow-hidden ">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="hover:bg-gray-100 hover:hover:shadow-2xl"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {event.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {event.description}
                        </div>
                        <div className="flex items-center mt-2 space-x-2">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                              event.type
                            )}`}
                          >
                            {event.type}
                          </span>
                          <span className="text-xs text-gray-400">
                            by {event.organizer}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm text-gray-900">
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {event.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm text-gray-900">
                            {event.registered}/{event.capacity}
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                            <div
                              className="bg-blue-900 h-1 rounded-full"
                              style={{
                                width: `${
                                  (event.registered / event.capacity) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>
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
                          onClick={() => handleDelete(event.id)}
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
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events found
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
