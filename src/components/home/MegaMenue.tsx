// app/components/MegaMenu.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  {
    title: "About Us",
    subMenu: [
      { name: "Mission & Vision", href: "/about/mission" },
      { name: "Faculty", href: "/about/faculty" },
      { name: "Contact", href: "/about/contact" },
    ],
  },
  {
    title: "Research",
    subMenu: [
      { name: "Law", href: "/research/law" },
      { name: "Governance", href: "/research/governance" },
      { name: "Policy", href: "/research/policy" },
      { name: "Publications", href: "/research/publications" },
    ],
  },
  {
    title: "Programs",
    subMenu: [
      { name: "Courses", href: "/programs/courses" },
      { name: "Workshops", href: "/programs/workshops" },
      { name: "Seminars", href: "/programs/seminars" },
    ],
  },
  {
    title: "Resources",
    subMenu: [
      { name: "Articles", href: "/resources/articles" },
      { name: "Reports", href: "/resources/reports" },
      { name: "Case Studies", href: "/resources/case-studies" },
    ],
  },
  {
    title: "Events",
    subMenu: [
      { name: "Conferences", href: "/events/conferences" },
      { name: "Webinars", href: "/events/webinars" },
      { name: "News", href: "/events/news" },
    ],
  },
  {
    title: "Dashboard",
    subMenu: [
      { name: "Analytics", href: "/dashboard/analytics" },
      { name: "Settings", href: "/dashboard/settings" },
      { name: "Users", href: "/dashboard/users" },
    ],
  },
];

export default function MegaMenu() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <nav className="bg-[#0347A7] text-white ">
        <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto">
          {/* 🔹 Logo + Title */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/celgap logo.png"
              alt="CELGAP"
              width={250}
              height={50}
              className="rounded"
            />
          </Link>

          {/* 🔹 Navigation */}
          <ul className="flex space-x-8 ml-10">
            {navItems.map((item) => (
              <li
                key={item.title}
                className="relative group"
                onMouseEnter={() => setActive(item.title)}
                onMouseLeave={() => setActive(null)}
              >
                <button className="hover:text-yellow-400 font-medium">
                  {item.title}
                </button>

                {active === item.title && (
                  <div className="absolute left-0 top-full bg-white text-black shadow-lg p-4 min-w-[220px]">
                    <ul className="space-y-2">
                      {item.subMenu.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            className="block hover:text-blue-700"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
