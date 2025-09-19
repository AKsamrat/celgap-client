"use client";
import { Award, BookOpen, Linkedin, Mail, Twitter, Users } from "lucide-react";
import React, { useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  bio: string;
  education: string[];
  expertise: string[];
  publications?: string[];
  awards?: string[];
  email?: string;
  linkedin?: string;
  twitter?: string;
  image: string;
  isActive: boolean;
  joinedYear: number;
}

interface Department {
  name: string;
  description: string;
  color: string;
}

const OurTeamPage: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showInactive, setShowInactive] = useState<boolean>(false);

  const departments: Department[] = [
    { name: "all", description: "All Team Members", color: "bg-blue-500" },
    {
      name: "Leadership",
      description: "Executive Leadership",
      color: "bg-purple-500",
    },
    {
      name: "Research",
      description: "Research Associates",
      color: "bg-green-500",
    },
    {
      name: "Litigation",
      description: "Legal & Litigation",
      color: "bg-red-500",
    },
    {
      name: "Operations",
      description: "Operations & Administration",
      color: "bg-orange-500",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Jayna Kothari",
      position: "Executive Director",
      department: "Leadership",
      bio: "Jayna Kothari is the Executive Director of CLPR. She has extensive experience in constitutional law, human rights litigation, and policy advocacy. She has appeared before various High Courts and the Supreme Court of India.",
      education: [
        "LLM, Harvard Law School",
        "LLB, National Law School of India University",
      ],
      expertise: [
        "Constitutional Law",
        "Human Rights",
        "Gender Justice",
        "Disability Rights",
      ],
      publications: ["Constitutional Law & Policy", "Gender Justice in India"],
      awards: ["Young Lawyer Award 2015", "Human Rights Advocate 2018"],
      email: "jayna@clpr.org.in",
      linkedin: "#",
      image: "/team1.jpg",
      isActive: true,
      joinedYear: 2012,
    },
    {
      id: 2,
      name: "Azizun Nahar",
      position: "Senior Research Associate & Editor",
      department: "Research",
      bio: "Azizun Nahar is a Senior Research Associate and Editor at CLPR. His research focuses on constitutional culture, electoral reforms, and governance issues.",
      education: [
        "LLM, National University of Juridical Sciences",
        "BA LLB, NALSAR University of Law",
      ],
      expertise: [
        "Constitutional Culture",
        "Electoral Reforms",
        "Governance",
        "Legal Research",
      ],
      publications: [
        "Electoral Reforms in India",
        "Constitutional Culture Studies",
      ],
      email: "vineeth@clpr.org.in",
      linkedin: "#",
      image: "/moon.jpg",
      isActive: true,
      joinedYear: 2018,
    },
    {
      id: 3,
      name: "Aparna Mehrotra",
      position: "Senior Litigation Associate",
      department: "Litigation",
      bio: "Aparna Mehrotra leads the litigation efforts at CLPR, focusing on strategic impact litigation in areas of disability rights, gender justice, and constitutional matters.",
      education: [
        "LLM, Jindal Global Law School",
        "BBA LLB, Symbiosis Law School",
      ],
      expertise: [
        "Strategic Litigation",
        "Disability Rights",
        "Constitutional Litigation",
        "Human Rights",
      ],
      publications: [
        "Impact Litigation Strategies",
        "Disability Rights in Courts",
      ],
      email: "aparna@clpr.org.in",
      image: "/team2.png",
      isActive: true,
      joinedYear: 2016,
    },
    {
      id: 4,
      name: "Nithya Rajshekhar",
      position: "Senior Research Associate",
      department: "Research",
      bio: "Nithya Rajshekhar works on gender and sexuality rights, with particular focus on reproductive rights and violence against women.",
      education: [
        "LLM, National Law School of India University",
        "BA LLB, Christ University",
      ],
      expertise: [
        "Gender Rights",
        "Reproductive Rights",
        "Violence Against Women",
        "Policy Research",
      ],
      publications: [
        "Reproductive Rights in India",
        "Gender-based Violence Laws",
      ],
      email: "nithya@clpr.org.in",
      twitter: "#",
      image: "/api/placeholder/300/400",
      isActive: true,
      joinedYear: 2019,
    },
    {
      id: 5,
      name: "Priya Chaudhary",
      position: "Research Associate",
      department: "Research",
      bio: "Priya Chaudhary focuses on disability rights, accessibility issues, and inclusive policy development.",
      education: ["LLM, Jamia Millia Islamia", "BBA LLB, Amity University"],
      expertise: [
        "Disability Rights",
        "Accessibility Law",
        "Inclusive Policy",
        "Human Rights",
      ],
      email: "priya@clpr.org.in",
      image: "/api/placeholder/300/400",
      isActive: true,
      joinedYear: 2020,
    },
    {
      id: 6,
      name: "Saumya Singh",
      position: "Research Associate",
      department: "Research",
      bio: "Saumya Singh works on transgender rights, LGBTQ+ issues, and discrimination law.",
      education: [
        "LLM, University of Delhi",
        "BA LLB, Rajiv Gandhi School of IP Law",
      ],
      expertise: [
        "Transgender Rights",
        "LGBTQ+ Law",
        "Anti-discrimination Law",
        "Constitutional Rights",
      ],
      email: "saumya@clpr.org.in",
      linkedin: "#",
      image: "/api/placeholder/300/400",
      isActive: true,
      joinedYear: 2021,
    },
    {
      id: 7,
      name: "Payal Gaikwad",
      position: "Projects Coordinator",
      department: "Operations",
      bio: "Payal Gaikwad coordinates various projects and initiatives at CLPR, ensuring smooth execution of programs and events.",
      education: ["MBA, Pune University", "BA, Mumbai University"],
      expertise: [
        "Project Management",
        "Event Coordination",
        "Program Development",
        "Operations",
      ],
      email: "payal@clpr.org.in",
      image: "/api/placeholder/300/400",
      isActive: true,
      joinedYear: 2019,
    },
    {
      id: 8,
      name: "Shankar K",
      position: "Finance Head",
      department: "Operations",
      bio: "Shankar K manages the financial operations of CLPR, ensuring compliance and efficient resource management.",
      education: [
        "M.Com, Bangalore University",
        "CA, Institute of Chartered Accountants of India",
      ],
      expertise: [
        "Financial Management",
        "Compliance",
        "Accounting",
        "Resource Planning",
      ],
      email: "shankar@clpr.org.in",
      image: "/api/placeholder/300/400",
      isActive: true,
      joinedYear: 2015,
    },
    {
      id: 9,
      name: "Dr. Sudhir Krishnaswamy",
      position: "Senior Advisor",
      department: "Leadership",
      bio: "Dr. Sudhir Krishnaswamy is a renowned constitutional law expert and senior advisor to CLPR.",
      education: [
        "PhD, Oxford University",
        "LLM, Harvard Law School",
        "BA LLB, National Law School",
      ],
      expertise: [
        "Constitutional Law",
        "Comparative Constitutionalism",
        "Legal Philosophy",
        "Academic Research",
      ],
      publications: [
        "Democracy and Constitutionalism in India",
        "Constitutional Interpretation",
      ],
      awards: ["Distinguished Scholar Award", "Constitutional Law Excellence"],
      email: "sudhir@clpr.org.in",
      linkedin: "#",
      image: "/api/placeholder/300/400",
      isActive: false,
      joinedYear: 2010,
    },
  ];

  const filteredMembers = teamMembers.filter((member) => {
    const departmentMatch =
      selectedDepartment === "all" || member.department === selectedDepartment;
    const statusMatch = showInactive || member.isActive;
    return departmentMatch && statusMatch;
  });

  const activeMembers = teamMembers.filter((member) => member.isActive);
  const inactiveMembers = teamMembers.filter((member) => !member.isActive);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 bg-[url('/banner1.jpg')] bg-cover bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Glassmorphic Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-10">
            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">
              Our Team
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              CLPRs core purpose is to ensure that the Constitution works for
              everyone through law & policy research and strategic impact
              litigation. Our diverse team of legal experts, researchers, and
              advocates work collectively to promote constitutional values and
              human rights.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {activeMembers.length}
              </div>
              <div className="text-gray-600">Active Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {departments.length - 1}
              </div>
              <div className="text-gray-600">Departments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                100+
              </div>
              <div className="text-gray-600">Research Publications</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept.name}
                onClick={() => setSelectedDepartment(dept.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedDepartment === dept.name
                    ? `${dept.color} text-white`
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {dept.description}
              </button>
            ))}
          </div>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Show Former Members</span>
          </label>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                !member.isActive ? "opacity-75" : ""
              }`}
              onClick={() => setSelectedMember(member)}
            >
              {/* Member Photo */}
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full  object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      member.name
                    )}&size=300&background=3b82f6&color=fff`;
                  }}
                />
                {!member.isActive && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs">
                      Former
                    </span>
                  </div>
                )}
                {/* Department Badge */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className={`${
                      departments.find((d) => d.name === member.department)
                        ?.color || "bg-gray-500"
                    } text-white px-2 py-1 rounded-full text-xs font-medium`}
                  >
                    {member.department}
                  </span>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {member.expertise.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.expertise.length > 2 && (
                    <span className="text-gray-500 text-xs">
                      +{member.expertise.length - 2} more
                    </span>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex space-x-3">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No team members found matching your filters.
            </p>
          </div>
        )}

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-start space-x-6">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-32 h-32 rounded-xl object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          selectedMember.name
                        )}&size=128&background=3b82f6&color=fff`;
                      }}
                    />
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedMember.name}
                      </h2>
                      <p className="text-xl text-blue-600 font-medium mb-2">
                        {selectedMember.position}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{selectedMember.department}</span>
                        </span>
                        <span>Joined: {selectedMember.joinedYear}</span>
                        {!selectedMember.isActive && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            Former Member
                          </span>
                        )}
                      </div>

                      {/* Social Links */}
                      <div className="flex space-x-3">
                        {selectedMember.email && (
                          <a
                            href={`mailto:${selectedMember.email}`}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                        )}
                        {selectedMember.linkedin && (
                          <a
                            href={selectedMember.linkedin}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        {selectedMember.twitter && (
                          <a
                            href={selectedMember.twitter}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-8">
                  {/* Bio */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      About
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedMember.bio}
                    </p>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Education</span>
                    </h3>
                    <ul className="space-y-2">
                      {selectedMember.education.map((edu, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Areas of Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Publications */}
                  {selectedMember.publications &&
                    selectedMember.publications.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Key Publications
                        </h3>
                        <ul className="space-y-2">
                          {selectedMember.publications.map((pub, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{pub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Awards */}
                  {selectedMember.awards &&
                    selectedMember.awards.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                          <Award className="h-5 w-5" />
                          <span>Awards & Recognition</span>
                        </h3>
                        <ul className="space-y-2">
                          {selectedMember.awards.map((award, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{award}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurTeamPage;
