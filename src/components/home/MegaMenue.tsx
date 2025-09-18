"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { title: "Home", href: "/" },
  {
    title: "WHO WE ARE",
    subMenu: [
      { name: "Our Story", href: "/whoWeAre/story" },
      { name: "Faculty", href: "/whoWeAre/faculty" },
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
        className={` text-[#0347A7]  w-full transition-all z-50 ${
          isSticky ? "fixed top-0 shadow-md bg-black/70 text-white" : "relative"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto font-light">
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
          <ul className="hidden md:flex space-x-2 ml-8 uppercase">
            {navItems.map((item) => (
              <li
                key={item.title}
                className="relative group"
                onMouseEnter={() => item.subMenu && setActive(item.title)}
                onMouseLeave={() => setActive(null)}
              >
                <Link
                  href={item.href || "#"}
                  className={`px-2 py-1 font-normal transition ${
                    isParentActive(item)
                      ? "text-yellow-400 border-b-2 border-yellow-400"
                      : "hover:text-yellow-400"
                  }`}
                >
                  {item.title}
                </Link>

                {/* Only show submenu if exists */}
                {item.subMenu && (
                  <div
                    className={`absolute left-0 top-full bg-white/90 text-[#0347A7] shadow-lg min-w-[220px] z-10 rounded-md transition-all duration-300 ease-in-out transform origin-top
      ${
        active === item.title
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
                  >
                    <ul className="space-y-2 p-4">
                      {item.subMenu.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            className={`block px-2 py-1 rounded-md transition ${
                              pathname === sub.href
                                ? "text-yellow-400"
                                : "hover:text-yellow-400 hover:bg-black/10"
                            }`}
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

          {/* Search + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle search"
              className="hover:text-yellow-400"
            >
              <Search size={22} />
            </button>

            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-8 h-8 text-white"
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
                  <Link
                    href={item.href || "#"}
                    onClick={() =>
                      item.subMenu
                        ? toggleMobileSubMenu(item.title)
                        : setIsMobileMenuOpen(false)
                    }
                    className={`block w-full text-center py-3 font-normal ${
                      isParentActive(item)
                        ? "bg-[#045CB0] text-yellow-400"
                        : "hover:text-yellow-400"
                    }`}
                  >
                    {item.title}
                  </Link>

                  {item.subMenu && activeMobileSubMenu === item.title && (
                    <ul className="bg-white text-black py-2">
                      {item.subMenu.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-6 py-2 ${
                              pathname === sub.href
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
