"use client";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

interface Program {
  id: number;
  type: "Course" | "Workshop" | "Seminar";
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  capacity: number;
  enrolled: number;
  price: string;
  image: string;
  status: "upcoming" | "registration-open" | "full";
}

const programs: Program[] = [
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
];

export default function ProgramsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-wide mb-4">
            PROGRAMS & INITIATIVES
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-800 to-blue-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Highlight Courses, Workshops, Seminars. Discover upcoming
            opportunities to enhance your legal knowledge and skills.
          </p>
        </div>

        {/* Programs Marquee */}
        <Marquee pauseOnHover={true} speed={50} gradient={false}>
          {programs.map((program) => (
            <div
              key={program.id}
              className="min-w-[300px] max-w-sm mx-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Program Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
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

              {/* Program Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
