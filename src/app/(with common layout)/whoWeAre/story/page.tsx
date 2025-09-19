import {
  BookOpen,
  Eye,
  Gavel,
  Heart,
  Scale,
  Shield,
  Target,
  Users,
} from "lucide-react";
import React from "react";

const OurStorySection: React.FC = () => {
  const values = [
    {
      icon: <Gavel className="h-8 w-8" />,
      title: "Constitutionalism",
      description:
        "Upholding constitutional principles and promoting constitutional governance",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Rule of Law",
      description:
        "Ensuring equal application of law and justice for all citizens",
      color: "text-green-600 bg-green-100",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Democracy",
      description:
        "Strengthening democratic institutions and participatory governance",
      color: "text-purple-600 bg-purple-100",
    },
  ];

  const workAreas = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Research & Analysis",
      description:
        "Rigorous social science research examining legal frameworks and social contexts",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Advocacy Campaigns",
      description:
        "Strategic campaigns addressing systemic injustices and discriminatory practices",
    },
    {
      icon: <Gavel className="h-6 w-6" />,
      title: "Legal Processes",
      description:
        "Utilizing legal mechanisms to effect necessary reforms and remedial measures",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative Engagement",
      description:
        "Working with academics, students, and civil society organizations",
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-wider">
            OUR STORY
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-purple-600 mx-auto"></div>
        </div>

        {/* Who We Are Section */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative bg-blue-50 px-8 py-6 border-l-8 border-blue-600">
              {" "}
              {/* Softer blue background, blue left border */}
              <h3 className="text-2xl font-bold text-blue-600 mb-2">
                WHO WE ARE
              </h3>{" "}
              {/* Darker blue text */}
            </div>
            <div className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Centre for Law Governance and Policy (CELGAP) is a{" "}
                <span className="font-semibold text-gray-800/70">
                  {" "}
                  {/* Slightly darker text for emphasis */}
                  non-partisan and non-profit organisation
                </span>{" "}
                which is dedicated to creating awareness about systemic
                injustices in the existing social, economic and political order
                as well engaging in advocacy for effective necessary reforms and
                undertaking remedial measures.
              </p>
              <p className="text-lg text-gray-800/70 leading-relaxed mb-6">
                At CELGAP, we aim to address{" "}
                <span className="font-semibold text-gray-800/70">
                  discrimination, inequality and injustice
                </span>{" "}
                by examining the legal framework and the wider social context
                and developing context-based strategies through{" "}
                <span className="font-semibold text-gray-800/70">
                  rigorous social science research and analysis
                </span>
                .
              </p>
              <p className="text-lg text-gray-800/70 leading-relaxed">
                CELGAP is working closely with{" "}
                <span className="font-semibold text-gray-800/70">
                  academics, students and CSOs
                </span>{" "}
                in furtherance of its goal of establishing social justice.
              </p>
            </div>
          </div>
        </div>

        {/* Vision and Mission */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
            <div className="relative  px-8 py-6 border-l-8 border-blue-900">
              <div className="flex items-center space-x-4">
                <Eye className="h-10 w-10 text-blue-900" />

                <h3 className="text-2xl font-bold text-blue-900">VISION</h3>
              </div>
            </div>
            <div className="p-8 h-full flex items-start">
              <p className="text-lg text-gray-700 leading-relaxed">
                Establishing a society characterised by{" "}
                <span className="font-semibold text-gray-800/70">
                  equality and justice
                </span>{" "}
                in all spheres of life, protection of{" "}
                <span className="font-semibold text-gray-800/70">
                  fundamental human rights
                </span>
                , and{" "}
                <span className="font-semibold text-gray-800/70">
                  transparency in politics and government
                </span>
                .
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
            <div className="relative px-8 py-6 border-l-8  border-red-400">
              <div className="flex items-center space-x-4">
                <Target className="h-10 w-10 text-red-400" />{" "}
                <h3 className="text-2xl font-bold text-red-400">MISSION</h3>{" "}
              </div>
            </div>
            <div className="p-8 h-full flex items-start">
              <p className="text-lg text-gray-700 leading-relaxed">
                To achieve its vision, CELGAP has undertaken the task of{" "}
                <span className="font-semibold text-gray-800/70">
                  raising awareness
                </span>{" "}
                about systemic injustices and discriminatory laws and social
                practices, conducting{" "}
                <span className="font-semibold text-gray-800/70">
                  advocacy campaigns
                </span>
                , and formulating and implementing strategy for effecting
                necessary reforms primarily through the use of{" "}
                <span className="font-semibold text-gray-800/70">
                  legal processes
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
              <Heart className="h-8 w-8 text-red-500" />
              <span>OUR VALUES</span>
            </h3>
            <p className="text-lg text-gray-600">
              CELGAP is committed to the core values that guide our work and
              mission
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-8 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${value.color} mb-6`}
                  >
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How We Work Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              HOW WE WORK
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our multi-faceted approach combines research, advocacy, and legal
              action to address systemic challenges and promote social justice
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                  {area.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {area.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Statement */}
        <div
          className="relative w-full h-80 overflow-hidden"
          style={{
            backgroundImage: 'url("/handshake.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Glassmorphic card */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-5xl mx-auto mt-10">
            <h3 className="text-3xl md:text-4xl font-extrabold  mb-6 drop-shadow-lg text-blue-800">
              Our Commitment
            </h3>
            <p className="text-xl md:text-2xl  leading-relaxed max-w-4xl mx-auto drop-shadow-lg ">
              Through our unwavering dedication to{" "}
              <span className="font-bold ">
                constitutionalism, rule of law, and democracy
              </span>
              , CELGAP continues to be a catalyst for positive change, working
              tirelessly to build a more just and equitable society for all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStorySection;
