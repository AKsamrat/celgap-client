"use client";

import { Slide, Zoom } from "react-awesome-reveal";
import Marquee from "react-fast-marquee";

export default function EventsSection() {
  const events = [
    {
      id: 1,
      date: "28th",
      month: "JUN 2025",
      color: "border-red-500",
      category: "conference",
      title:
        "Equal Justice: Pathways for Women from the Corporate Bar to the Higher Judiciary | Roundtable",
      venue: "Westminster, ITC Windsor, Bengaluru",
      time: "11:00 AM - 2:00 PM",
      description:
        'On June 28th, the Centre for Law and Policy Research hosted a roundtable titled "Pathways..."',
      venueColor: "text-red-500",
      timeColor: "text-red-500",
    },
    {
      id: 2,
      date: "07th",
      month: "JUN 2025",
      color: "border-orange-500",
      category: "conference",
      title: "Know Your Rights & Entitlements Session (KYRE)",
      venue: "Patrakarthara Bhavana, Kolar",
      time: "10:00 AM - 1:45 PM",
      description:
        "On 7 June 2025, in collaboration with Jeevana Jyothi Charitable Social Service Trust, the Centre...",
      venueColor: "text-orange-500",
      timeColor: "text-orange-500",
    },
    {
      id: 3,
      date: "11th",
      month: "APR 2025",
      color: "border-blue-900",
      category: "webinars",
      title:
        "Training for CD Fellows: Disability Rights Litigation & Human Rights Lawyering Strategies",
      venue:
        "Centre for Law and Policy Research, D6, Donna Cynthia, 35, Primrose Road, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560025",
      time: "April 11: 9:30 AM - 6:30 PM & April 12: 10:00 AM - 1:30 PM",
      description:
        "The Centre for Law and Policy Research (CLPR) conducted a Training Programme for the...",
      venueColor: "text-blue-900",
      timeColor: "text-blue-900",
    },
    {
      id: 4,
      date: "22nd",
      month: "MAR 2025",
      color: "border-red-500",
      category: "conference",
      title:
        "EQUAL JUSTICE: Securing Equal Inclusion of Women in the Higher Judiciary",
      venue: "Sabha Bengaluru No.44/A, Kamaraj Rd",
      time: "March 22: 2:00 PM - 5:30 PM & March 23: 10:00 AM - 1:30 PM",
      description:
        'As part of CLPR\'s Equal Justice initiative, we hosted a National Stakeholder Consultation titled "Equal..."',
      venueColor: "text-red-500",
      timeColor: "text-red-500",
    },
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <Slide duration={1000} direction="left">

          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 tracking-wider">
            EVENTS
          </h2>
        </Slide>

        {/* Events Marquee */}
        <Marquee pauseOnHover={true} speed={50} gradient={false}>
          {events.map((event) => (
            <div
              key={event.id}
              className="min-w-[350px] max-w-sm mx-4 bg-white rounded-lg shadow-lg p-3 items-start h-[450px]"
            >
              {/* Date Circle */}
              <div
                className={`w-20 h-20 mb-4 rounded-full border-4 ${event.color} bg-white flex flex-col items-center justify-center`}
              >
                <span className="text-2xl font-bold text-gray-800">
                  {event.date}
                </span>
                <span className="text-xs font-medium text-gray-600 -mt-1">
                  {event.month}
                </span>
              </div>

              {/* Event Details */}
              <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-tight">
                {event.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-start">
                  <span
                    className={`text-sm font-medium ${event.venueColor} mr-2`}
                  >
                    VENUE
                  </span>
                  <span className="text-sm text-gray-700 flex-1">
                    {event.venue}
                  </span>
                </div>
                <div className="flex items-start">
                  <span
                    className={`text-sm font-medium ${event.timeColor} mr-2`}
                  >
                    TIME
                  </span>
                  <span className="text-sm text-gray-700 flex-1">
                    {event.time}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {event.description}
              </p>

              <button className="border border-gray-400 text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors duration-200 rounded">
                READ MORE
              </button>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
