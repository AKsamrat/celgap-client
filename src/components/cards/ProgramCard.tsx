"use client";

import { Program } from "@/types";
import Image from "next/image";

interface ProgramCardProps {
  program: Program;
  onViewDetails: (program: Program) => void;
}

export default function ProgramCard({
  program,
  onViewDetails,
}: ProgramCardProps) {
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
    <div className="min-w-[300px] max-w-sm mx-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          width={600} // set appropriate width
          height={400} // set appropriate height
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
              program.type
            )}`}
          >
            {program.type.toUpperCase()}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
            {program.price}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {program.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {program.description}
        </p>
        <button
          onClick={() => onViewDetails(program)}
          className="border-2 border-blue-900 px-3 py-1 rounded-lg"
        >
          Details
        </button>
      </div>
    </div>
  );
}
