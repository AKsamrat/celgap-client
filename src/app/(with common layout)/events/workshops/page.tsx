"use client";
import { programs } from "@/app/assets/datas";
import ProgramCard from "@/components/cards/ProgramCard";
import ProgramModal from "@/components/cards/ProgramModal";
import { Program } from "@/types";
import { Backpack } from "lucide-react";
import { useState } from "react";


export default function WorkShopPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const filteredPrograms = programs
    .filter((p) => p.type === "Workshop")
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
              <Backpack className="h-12 w-12 mr-4" />
              <h1 className="text-5xl font-bold">Work Shop</h1>
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
