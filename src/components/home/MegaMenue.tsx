"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export interface NavChild {
  name: string;
  href: string;
}

export interface NavSub {
  name: string;
  href: string;
  subMenu?: NavChild[];
}

export interface NavItem {
  title: string;
  href?: string;
  subMenu?: NavSub[];
}

const navItems = [
  { title: "Home", href: "/" },
  {
    title: "WHO WE ARE",
    subMenu: [
      { name: "Our Story", href: "/whoWeAre/story" },
      { name: "Board Of Trustees", href: "/whoWeAre/faculty" },
    ],
  },
  {
    title: "Publications",
    subMenu: [
      {
        name: "Law Journal",
        href: "",
        subMenu: [
          { name: "About Journal", href: "/publications/law/J-About" },
          { name: "Journal", href: "/publications/law" },
        ]
      },
      // { name: "Law Journal", href: "/publications/law" },
      { name: "Magazine", href: "/publications/policy" },
      { name: "periodical", href: "/publications/periodical" },
    ],
  },

  // {
  //   title: "Resources",
  //   subMenu: [
  //     { name: "Articles", href: "/resources/articles" },
  //     { name: "Reports", href: "/resources/reports" },
  //     { name: "Case Studies", href: "/resources/caseStudies" },
  //   ],
  // },
  {
    title: "Events",
    subMenu: [
      { name: "Spring School", href: "/events/springSchool" },
      { name: "Seminar", href: "/events/seminars" },
      { name: "Conference", href: "/events/conferences" },
      { name: "Workshop", href: "/events/workshops" },
      { name: "Webinar", href: "/events/webinars" },
      { name: "Training", href: "/events/training" },
    ],
  },
  {
    title: "News & Media",
    href: "/newsAndMedia",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default function MegaMenu() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubMenu, setActiveMobileSubMenu] = useState<string | null>(
    null
  );
  const [showSearch, setShowSearch] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  // Detect scroll to make navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveMobileSubMenu(null);
  };

  const toggleMobileSubMenu = (title: string) => {
    setActiveMobileSubMenu(activeMobileSubMenu === title ? null : title);
  };

  const isParentActive = (item: {
    href?: string;
    subMenu?: { href: string }[];
  }) => {
    if (item.href && pathname === item.href) return true;
    if (item.subMenu) {
      return item.subMenu.some((sub) => pathname === sub.href);
    }
    return false;
  };

  return (
    <>
      <nav
        className={`   w-full z-50 transition-all duration-900 ease-in-out  ${isSticky ? "fixed top-0 backdrop-blur-md shadow-md bg-white text-black" : "relative"
          }`}
      >
        <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto font-light bg-white">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/logo3.png"
              alt="CELGAP"
              height={45}
              className="rounded w-36 md:w-44"
            />
          </Link>

          {/* Desktop Navigation */}

          <ul className="hidden md:flex space-x-2 ml-8 uppercase text-slate-600">
            {navItems.map((item) => (
              <li
                key={item.title}
                className="relative"
                onMouseEnter={() => item.subMenu && setActiveMain(item.title)}
                onMouseLeave={() => { setActiveMain(null); setActiveSub(null); }}
              >
                {/* Main menu link */}
                <Link
                  href={item.href || "/"}
                  className="px-3 py-2 hover:text-[#0347A7]"
                >
                  {item.title}
                </Link>

                {/* LEVEL 1 DROPDOWN */}
                {item.subMenu && (
                  <div
                    className={`absolute left-0 top-full bg-white shadow-lg rounded-md transition-all duration-300 min-w-[220px] ${activeMain === item.title ? "opacity-100 visiblex text-blue-600" : "opacity-0 invisible"
                      }`}
                  >
                    <ul className="p-3 space-y-2">
                      {item.subMenu.map((sub) => (
                        <li
                          key={sub.name}
                          className="relative"
                          onMouseEnter={() => sub.subMenu && setActiveSub(sub.name)}
                          onMouseLeave={() => sub.subMenu && setActiveSub(null)}
                        >
                          {/* Level 1 submenu link */}
                          <Link
                            href={sub.href}
                            className="block px-2 py-1 hover:bg-gray-200 transition-shadow duration-300"
                          >
                            {sub.name}
                          </Link>

                          {/* LEVEL 2 NESTED DROPDOWN */}
                          {sub.subMenu && (
                            <div
                              className={`absolute left-full top-0 bg-white shadow-lg rounded-md min-w-[200px] transition-all duration-300 ${activeSub === sub.name ? "opacity-100 visible" : "opacity-0 invisible"
                                }`}
                            >
                              <ul className="p-3 space-y-2">
                                {sub.subMenu.map((child) => (
                                  <li key={child.name}>
                                    <Link
                                      href={child.href}
                                      className="block px-2 py-1 hover:bg-gray-200"
                                    >
                                      {child.name}
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
                )}
              </li>
            ))}
          </ul>


          {/* Search + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle search"
              className="hover:text-[#0347A7]"
            >
              <Search size={22} />
            </button>

            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-8 h-8 text-[#0347A7]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search Input */}
        {showSearch && (
          <div className="fixed top-32 right-6 bg-white text-black shadow-lg rounded-lg p-3 z-[70]">
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0347A7] w-72"
            />
          </div>
        )}

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0347A7] text-white py-4">
            <ul className="flex flex-col items-center">
              {navItems.map((item) => (
                <li key={item.title} className="w-full">

                  {/* Parent item */}
                  {item.subMenu ? (
                    <button
                      onClick={() => toggleMobileSubMenu(item.title)}
                      className={`block w-full text-center py-3 font-normal ${isParentActive(item)
                        ? "bg-[#045CB0] text-[#0347A7]"
                        : "hover:text-[#0347A7]"
                        }`}
                    >
                      {item.title}
                    </button>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block w-full text-center py-3 font-normal ${isParentActive(item)
                        ? "bg-[#045CB0] text-[#0347A7]"
                        : "hover:text-[#0347A7]"
                        }`}
                    >
                      {item.title}
                    </Link>
                  )}

                  {/* Submenu */}
                  {item.subMenu && activeMobileSubMenu === item.title && (
                    <ul className="bg-white text-black py-2">
                      {item.subMenu.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-6 py-2 ${pathname === sub.href
                              ? "bg-gray-200 text-blue-600"
                              : "hover:bg-gray-200"
                              }`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

        )}
      </nav>
    </>
  );
}
