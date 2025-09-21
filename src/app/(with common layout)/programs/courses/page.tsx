"use client";
import ProgramCard from "@/components/cards/ProgramCard";
import ProgramModal from "@/components/cards/ProgramModal";
import { Program } from "@/types";
import { Briefcase } from "lucide-react";
import { useState } from "react";

export const programs: Program[] = [
  {
    id: 1,
    type: "Course",
    title: "Advanced Legal Research ",
    description:
      "Comprehensive course covering modern legal research techniques, database navigation, and case analysis methodologies.",
    date: "2025-02-15",
    time: "10:00 AM",
    duration: "8 weeks",
    location: "Online",
    capacity: 30,
    enrolled: 18,
    price: "$299",
    image:
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 2,
    type: "Workshop",
    title: "Constitutional Law Workshop",
    description:
      "Interactive workshop exploring recent constitutional developments and their practical implications for legal practice.",
    date: "2025-01-28",
    time: "2:00 PM",
    duration: "1 day",
    location: "New Delhi",
    capacity: 50,
    enrolled: 35,
    price: "$149",
    image:
      "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 3,
    type: "Seminar",
    title: "Digital Rights & Privacy Law",
    description:
      "Expert seminar discussing emerging challenges in digital rights, data protection, and privacy legislation.",
    date: "2025-02-05",
    time: "6:00 PM",
    duration: "3 hours",
    location: "Hybrid",
    capacity: 100,
    enrolled: 100,
    price: "Free",
    image:
      "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "full",
  },
  {
    id: 4,
    type: "Course",
    title: "Human Rights Advocacy",
    description:
      "Intensive course on human rights law, advocacy strategies, and international legal frameworks.",
    date: "2025-03-01",
    time: "9:00 AM",
    duration: "12 weeks",
    location: "Mumbai",
    capacity: 25,
    enrolled: 12,
    price: "$399",
    image:
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 5,
    type: "Workshop",
    title: "Legal Writing Excellence",
    description:
      "Practical workshop focused on improving legal writing skills, brief preparation, and persuasive argumentation.",
    date: "2025-02-20",
    time: "11:00 AM",
    duration: "2 days",
    location: "Bangalore",
    capacity: 40,
    enrolled: 28,
    price: "$199",
    image:
      "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 6,
    type: "Seminar",
    title: "Environmental Law Updates",
    description:
      "Current developments in environmental law, climate litigation, and regulatory changes affecting businesses.",
    date: "2025-01-25",
    time: "4:00 PM",
    duration: "2 hours",
    location: "Online",
    capacity: 200,
    enrolled: 156,
    price: "Free",
    image:
      "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 7,
    type: "Course",
    title: "Human Rights Advocacy",
    description:
      "Intensive course on human rights law, advocacy strategies, and international legal frameworks.",
    date: "2025-03-01",
    time: "9:00 AM",
    duration: "12 weeks",
    location: "Mumbai",
    capacity: 25,
    enrolled: 12,
    price: "$399",
    image:
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 8,
    type: "Workshop",
    title: "Legal Writing Excellence",
    description:
      "Practical workshop focused on improving legal writing skills, brief preparation, and persuasive argumentation.",
    date: "2025-02-20",
    time: "11:00 AM",
    duration: "2 days",
    location: "Bangalore",
    capacity: 40,
    enrolled: 28,
    price: "$199",
    image:
      "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 9,
    type: "Seminar",
    title: "Environmental Law Updates",
    description:
      "Current developments in environmental law, climate litigation, and regulatory changes affecting businesses.",
    date: "2025-01-25",
    time: "4:00 PM",
    duration: "2 hours",
    location: "Online",
    capacity: 200,
    enrolled: 156,
    price: "Free",
    image:
      "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 10,
    type: "Workshop",
    title: "Legal Writing Excellence",
    description:
      "Practical workshop focused on improving legal writing skills, brief preparation, and persuasive argumentation.",
    date: "2025-02-20",
    time: "11:00 AM",
    duration: "2 days",
    location: "Bangalore",
    capacity: 40,
    enrolled: 28,
    price: "$199",
    image:
      "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 11,
    type: "Seminar",
    title: "Environmental Law Updates",
    description:
      "Current developments in environmental law, climate litigation, and regulatory changes affecting businesses.",
    date: "2025-01-25",
    time: "4:00 PM",
    duration: "2 hours",
    location: "Online",
    capacity: 200,
    enrolled: 156,
    price: "Free",
    image:
      "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 12,
    type: "Course",
    title: "Human Rights Advocacy",
    description:
      "Intensive course on human rights law, advocacy strategies, and international legal frameworks.",
    date: "2025-03-01",
    time: "9:00 AM",
    duration: "12 weeks",
    location: "Mumbai",
    capacity: 25,
    enrolled: 12,
    price: "$399",
    image:
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 13,
    type: "Workshop",
    title: "Legal Writing Excellence",
    description:
      "Practical workshop focused on improving legal writing skills, brief preparation, and persuasive argumentation.",
    date: "2025-02-20",
    time: "11:00 AM",
    duration: "2 days",
    location: "Bangalore",
    capacity: 40,
    enrolled: 28,
    price: "$199",
    image:
      "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
  {
    id: 14,
    type: "Seminar",
    title: "Environmental Law Updates",
    description:
      "Current developments in environmental law, climate litigation, and regulatory changes affecting businesses.",
    date: "2025-01-25",
    time: "4:00 PM",
    duration: "2 hours",
    location: "Online",
    capacity: 200,
    enrolled: 156,
    price: "Free",
    image:
      "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    status: "registration-open",
  },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const filteredPrograms = programs
    .filter((p) => p.type === "Course")
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => statusFilter === "all" || p.status === statusFilter);

  return (
    <section className="py-12  mx-auto ">
      {/* Hero Section */}
      <div className="relative py-16 bg-[url('/articles.webp')] bg-cover bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-10">
            <div className="flex text-white items-center justify-center mb-4">
              <Briefcase className="h-12 w-12 mr-4" />
              <h1 className="text-5xl font-bold">Courses</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Explore upcoming courses to enhance your legal knowledge.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-7">
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full md:w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="registration-open">Registration Open</option>
            <option value="full">Full</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onViewDetails={setSelectedProgram}
            />
          ))}
        </div>

        {selectedProgram && (
          <ProgramModal
            program={selectedProgram}
            onClose={() => setSelectedProgram(null)}
          />
        )}
      </div>
    </section>
  );
}
