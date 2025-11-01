"use client";

import AdminLayout from "@/components/admin/layout";
import {
    Calendar,
    Clock,
    DollarSign,
    Edit,
    Eye,
    MapPin,
    Plus,
    Search,
    Trash2,
    Users,
} from "lucide-react";
import { useState } from "react";

interface Program {
    id: number;
    title: string;
    description: string;
    type: "Course" | "Workshop" | "Seminar";
    date: string;
    time: string;
    duration: string;
    location: string;
    capacity: number;
    enrolled: number;
    price: string;
    status: "upcoming" | "registration-open" | "full" | "completed";
    instructor: string;
    category: string;
}

const mockPrograms: Program[] = [
    {
        id: 1,
        title: "Advanced Legal Research Methods",
        description:
            "Comprehensive course covering modern legal research techniques and database navigation.",
        type: "Course",
        date: "2025-02-15",
        time: "10:00 AM",
        duration: "8 weeks",
        location: "Online",
        capacity: 30,
        enrolled: 18,
        price: "$299",
        status: "registration-open",
        instructor: "Prof. Sarah Johnson",
        category: "Legal Research",
    },
    {
        id: 2,
        title: "Constitutional Law Workshop",
        description:
            "Interactive workshop exploring recent constitutional developments and practical implications.",
        type: "Workshop",
        date: "2025-01-28",
        time: "2:00 PM",
        duration: "1 day",
        location: "New Delhi",
        capacity: 50,
        enrolled: 35,
        price: "$149",
        status: "registration-open",
        instructor: "Justice (Retd.) Rajesh Kumar",
        category: "Constitutional Law",
    },
    {
        id: 3,
        title: "Digital Rights & Privacy Law",
        description:
            "Expert seminar discussing emerging challenges in digital rights and privacy legislation.",
        type: "Seminar",
        date: "2025-02-05",
        time: "6:00 PM",
        duration: "3 hours",
        location: "Hybrid",
        capacity: 100,
        enrolled: 100,
        price: "Free",
        status: "full",
        instructor: "Dr. Meera Patel",
        category: "Digital Law",
    },
    {
        id: 4,
        title: "Human Rights Advocacy",
        description:
            "Intensive course on human rights law and advocacy strategies.",
        type: "Course",
        date: "2024-12-10",
        time: "9:00 AM",
        duration: "12 weeks",
        location: "Mumbai",
        capacity: 25,
        enrolled: 25,
        price: "$399",
        status: "completed",
        instructor: "Prof. Vikram Singh",
        category: "Human Rights",
    },
];

export default function AdminPrograms() {
    const [programs, setPrograms] = useState<Program[]>(mockPrograms);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedType, setSelectedType] = useState("all");

    const filteredPrograms = programs.filter((program) => {
        const matchesSearch =
            program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            selectedStatus === "all" || program.status === selectedStatus;
        const matchesType = selectedType === "all" || program.type === selectedType;
        return matchesSearch && matchesStatus && matchesType;
    });

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this program?")) {
            setPrograms(programs.filter((program) => program.id !== id));
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "upcoming":
                return "bg-blue-100 text-blue-800";
            case "registration-open":
                return "bg-green-100 text-green-800";
            case "full":
                return "bg-red-100 text-red-800";
            case "completed":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Course":
                return "bg-blue-100 text-blue-800";
            case "Workshop":
                return "bg-green-100 text-green-800";
            case "Seminar":
                return "bg-purple-100 text-purple-800";
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
                            Programs Management
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Manage courses, workshops, and seminars
                        </p>
                    </div>
                    <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors duration-200">
                        <Plus className="h-5 w-5 mr-2" />
                        New Program
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search programs..."
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
                            <option value="registration-open">Registration Open</option>
                            <option value="full">Full</option>
                            <option value="completed">Completed</option>
                        </select>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        >
                            <option value="all">All Types</option>
                            <option value="Course">Course</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Seminar">Seminar</option>
                        </select>
                    </div>
                </div>

                {/* Programs Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Program
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Schedule
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Enrollment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
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
                                {filteredPrograms.map((program) => (
                                    <tr key={program.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {program.title}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    {program.description}
                                                </div>
                                                <div className="flex items-center mt-2 space-x-2">
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                                                            program.type
                                                        )}`}
                                                    >
                                                        {program.type}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {program.category}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    Instructor: {program.instructor}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <div className="flex items-center mb-1">
                                                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                                    {new Date(program.date).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center mb-1">
                                                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                                    {program.time}
                                                </div>
                                                <div className="flex items-center mb-1">
                                                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                                                    {program.location}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Duration: {program.duration}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 text-gray-400 mr-2" />
                                                <div>
                                                    <div className="text-sm text-gray-900">
                                                        {program.enrolled}/{program.capacity}
                                                    </div>
                                                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                                        <div
                                                            className="bg-blue-900 h-2 rounded-full"
                                                            style={{
                                                                width: `${(program.enrolled / program.capacity) * 100
                                                                    }%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {Math.round(
                                                            (program.enrolled / program.capacity) * 100
                                                        )}
                                                        % full
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                                                <span className="text-sm font-medium text-gray-900">
                                                    {program.price}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                    program.status
                                                )}`}
                                            >
                                                {program.status.replace("-", " ")}
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
                                                    onClick={() => handleDelete(program.id)}
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
                {filteredPrograms.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No programs found
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
