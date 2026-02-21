"use client";
import { useUser } from "@/Context/UserContext";
import { ChevronDown, LayoutDashboard, LogOut, Search, User } from "lucide-react";
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
        name: "CELGAP Law Journal",
        href: "",
        subMenu: [
          { name: "About ", href: "/publications/law/J-About" },
          { name: "Submission Guideline ", href: "/publications/law/sguidelines" },
          { name: "Volume", href: "/publications/law" },
          { name: "Editorial Board", href: "/publications/law/editorialBoard" },
        ]
      },
      // { name: "Law Journal", href: "/publications/law" },
      {
        name: "CELGAP Magazine", href: "",
        subMenu: [
          { name: "About ", href: "/publications/magazine/m-about" },
          { name: "Submission Guideline ", href: "/publications/magazine/mGuidelines" },
          { name: "Volume", href: "/publications/magazine" },
          { name: "Editorial Board", href: "/publications/law/editorialBoard" },
        ]

      },
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
  const { user } = useUser();


  /* ---------- STATES ---------- */
  const [isSticky, setIsSticky] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [activeMobileSubMenu, setActiveMobileSubMenu] =
    useState<string | null>(null);
  const [activeMobileChild, setActiveMobileChild] = useState<string | null>(null);

  /* ---------- AUTH MOCK ---------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveMobileSubMenu(null);
  };

  const toggleMobileSubMenu = (title: string) => {
    setActiveMobileSubMenu(activeMobileSubMenu === title ? null : title);
  };
  const toggleMobileChildMenu = (name: string) => {
    setActiveMobileChild(activeMobileChild === name ? null : name);
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



  /* ---------- STICKY NAV ---------- */
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full z-50 transition-all ${isSticky
        ? "fixed top-0 bg-white shadow-md"
        : "relative bg-white"
        }`}
    >
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        {/* LOGO */}
        <Link href="/">
          <img src="/logo3.png" className="w-36 md:w-44" alt="Logo" />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex space-x-1 uppercase text-slate-600">
          {navItems.map((item) => (
            <li
              key={item.title}
              className="relative"
              onMouseEnter={() => setActiveMain(item.title)}
              onMouseLeave={() => {
                setActiveMain(null);
                setActiveSub(null);
              }}
            >
              <Link
                href={item.href || "#"}
                className="px-2 py-2 hover:text-[#0347A7]"
              >
                {item.title}
              </Link>

              {item.subMenu && activeMain === item.title && (
                <div className="absolute left-0 top-full bg-white shadow-lg rounded-md min-w-[220px]">
                  <ul className="p-3 space-y-2">
                    {item.subMenu.map((sub) => (
                      <li
                        key={sub.name}
                        className="relative"
                        onMouseEnter={() => setActiveSub(sub.name)}
                      >
                        <Link
                          href={sub.href}
                          className="block px-2 py-1 hover:bg-gray-100"
                        >
                          {sub.name}
                        </Link>

                        {sub.subMenu && activeSub === sub.name && (
                          <div className="absolute left-full top-0 bg-white shadow-lg rounded-md min-w-[200px]">
                            <ul className="p-3 space-y-2">
                              {sub.subMenu.map((child) => (
                                <li key={child.name}>
                                  <Link
                                    href={child.href}
                                    className="block px-2 py-1 hover:bg-gray-100"
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

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* SEARCH */}
          {/* <button onClick={() => setShowSearch(!showSearch)}>
            <Search />
          </button> */}

          {/* USER MENU (DESKTOP) */}
          <div className="relative ">
            {!isLoggedIn ? (
              <Link href="/login" className="flex items-center gap-2">
                <User size={26} />
              </Link>
            ) : (
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={user?.image ? user.image : "/avatar.png"}
                  className="w-12 h-12 rounded-full "
                  alt="User"
                />
                {/* <ChevronDown size={16} /> */}
              </button>
            )}

            {userMenuOpen && isLoggedIn && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                <div className="px-4 py-3 border-b text-sm font-medium">
                  {user?.name}
                </div>

                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {/* SEARCH BOX */}
      {showSearch && (
        <div className="absolute right-6 top-full mt-2 bg-white shadow-lg p-3 rounded">
          <input
            className="border px-3 py-2 rounded w-64"
            placeholder="Search..."
          />
        </div>
      )}

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0347A7] text-white py-4">
          <ul className="flex flex-col items-center">
            {navItems.map((item) => (
              <li key={item.title} className="w-full">

                {/* ---------- PARENT ---------- */}
                {item.subMenu ? (
                  <button
                    onClick={() => toggleMobileSubMenu(item.title)}
                    className={`w-full py-3 text-center font-normal ${activeMobileSubMenu === item.title
                      ? "bg-[#045CB0] text-white"
                      : "hover:text-[#0347A7]"
                      }`}
                  >
                    {item.title}
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-3 text-center hover:text-[#0347A7]"
                  >
                    {item.title}
                  </Link>
                )}

                {/* ---------- LEVEL 1 SUBMENU ---------- */}
                {item.subMenu && activeMobileSubMenu === item.title && (
                  <ul className="bg-white text-black">

                    {item.subMenu.map((sub) => (
                      <li key={sub.name} className="bg-gray-100">

                        {/* LEVEL 1 ITEM */}
                        {sub.subMenu ? (
                          <button
                            onClick={() => toggleMobileChildMenu(sub.name)}
                            className="w-full text-left px-6 py-3 font-medium hover:bg-gray-100"
                          >
                            {sub.name}
                          </button>
                        ) : (
                          <Link
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-6 py-3 hover:bg-gray-100"
                          >
                            {sub.name}
                          </Link>
                        )}

                        {/* ---------- LEVEL 2 SUBMENU ---------- */}
                        {sub.subMenu && activeMobileChild === sub.name && (
                          <ul className="bg-gray-50">
                            {sub.subMenu.map((child) => (
                              <li key={child.name}>
                                <Link
                                  href={child.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-10 py-2 text-sm hover:bg-gray-200"
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}

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
  );
}
