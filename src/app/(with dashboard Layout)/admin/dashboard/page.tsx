"use client";

import AdminLayout from "@/components/admin/layout";
import { useUser } from "@/Context/UserContext";
import { div } from "framer-motion/client";
import {
  BookOpen,
  Calendar,
  FileText,
  FolderOpen,
  GraduationCap,
  Newspaper,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    name: "Total Blog Posts",
    value: "24",
    icon: FileText,
    change: "+12%",
    changeType: "increase",
  },
  {
    name: "News Articles",
    value: "18",
    icon: Newspaper,
    change: "+8%",
    changeType: "increase",
  },
  {
    name: "Upcoming Events",
    value: "6",
    icon: Calendar,
    change: "+2",
    changeType: "increase",
  },
  {
    name: "Research Papers",
    value: "42",
    icon: BookOpen,
    change: "+5%",
    changeType: "increase",
  },
  {
    name: "Active Programs",
    value: "12",
    icon: GraduationCap,
    change: "+3",
    changeType: "increase",
  },
  {
    name: "Resources",
    value: "156",
    icon: FolderOpen,
    change: "+15%",
    changeType: "increase",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "blog",
    title: 'New blog post published: "Digital Rights Framework"',
    time: "2 hours ago",
    user: "Admin User",
  },
  {
    id: 2,
    type: "event",
    title: 'Event created: "Constitutional Law Workshop"',
    time: "4 hours ago",
    user: "Editor User",
  },
  {
    id: 3,
    type: "research",
    title: 'Research paper updated: "Environmental Governance"',
    time: "6 hours ago",
    user: "Admin User",
  },
  {
    id: 4,
    type: "news",
    title: 'News article published: "Legal Education Reform"',
    time: "1 day ago",
    user: "Editor User",
  },
];

export default function AdminDashboard() {

  const { user } = useUser()
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 mt-2">
            Welcome to your admin dashboard. Heres whats happening.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className=" rounded-lg shadow-sm p-6 border border-slate-300 bg-blue-100/50 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.name}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-900" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    from last month
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-300">
          <div className="px-6 py-4 border-b border-slate-300">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="divide-y text-slate-300">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      by {activity.user}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-3 rounded-lg font-bolt transition-colors duration-200">
              Create Blog Post
            </button>
            <button className="bg-green-600/70 hover:bg-green-700 text-white text-lg font-bolt px-4 py-3 rounded-lg  transition-colors duration-200">
              Add News Article
            </button>

            {
              user?.role === "admin" && (
                <button className="bg-purple-600/70 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-bolt transition-colors duration-200">
                  Schedule Event
                </button>

              )
            }


            {
              user?.role === "admin" && (


                <button className="bg-orange-600/60 hover:bg-orange-700 text-white text-lg px-4 py-3 rounded-lg font-medium transition-colors duration-200">
                  Upload Resource
                </button>


              )
            }
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
