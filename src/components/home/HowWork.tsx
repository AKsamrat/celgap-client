import { BookOpen, Gavel, Shield, Users } from "lucide-react";
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
    title: "Legal Awareness",
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

const HowWork = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16 mt-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
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
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow   duration-300 p-6"
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
    </div>
  );
};

export default HowWork;
