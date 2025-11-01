"use client";

import { logout } from "@/service/AuthService";
import {
  BookOpen,
  Calendar,
  FileText,
  FolderOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  X,
  ClipboardList,
  BarChart3,
  Users,
  FlaskConical,
  FileSearch,
  Briefcase,
  Settings,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Blog",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    name: "News",
    href: "/admin/news",
    icon: Newspaper,
  },
  {
    name: "Publications",
    href: "/admin/publications",
    icon: Calendar,
    children: [
      {
        name: "Law Journal",
        href: "/admin/publications/Law-Journal",
        icon: ClipboardList,
      },
      {
        name: " Magazine",
        href: "/admin/publications/magazine",
        icon: BarChart3,
      },
      {
        name: "Periodicals",
        href: "/admin/publications/periodicals",
        icon: Users,
      },
    ],
  },
  {
    name: "Events",
    href: "/admin/events",
    icon: BookOpen,
    children: [
      {
        name: "Conferences",
        href: "/admin/events/conferences",
        icon: FileSearch,
      },
      {
        name: "Spring School",
        href: "/admin/events/spring-school",
        icon: FlaskConical,
      },
      {
        name: "Webinars",
        href: "/admin/events/webinars",
        icon: Briefcase,
      },
      {
        name: "Workshops",
        href: "/admin/events/workshops",
        icon: Settings2,
      },
      {
        name: "Seminars",
        href: "/admin/events/seminars",
        icon: FolderOpen,
      },
    ],
  },
  {
    name: "Speaker",
    href: "/admin/speaker",
    icon: GraduationCap,
  },
  {
    name: "Resources",
    href: "/admin/resources",
    icon: FolderOpen,
  },
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-blue-900 text-white p-2 rounded-lg shadow-lg"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-blue-900 text-white">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                item.children?.some((child) => pathname === child.href);

              return (
                <div key={item.name}>
                  <button
                    onClick={() =>
                      item.children
                        ? toggleDropdown(item.name)
                        : router.push(item.href)
                    }
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                      ? "bg-blue-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex items-center">
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </div>
                    {item.children && (
                      <span
                        className={`transform transition-transform duration-200 ${openDropdown === item.name ? "rotate-90" : ""
                          }`}
                      >
                        ▶
                      </span>
                    )}
                  </button>

                  {/* Nested Children */}
                  {item.children && openDropdown === item.name && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${isChildActive
                              ? "bg-blue-100 text-blue-900 font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                              }`}
                          >
                            <ChildIcon className="mr-2 h-4 w-4" />
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
