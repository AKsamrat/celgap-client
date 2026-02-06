"use client";

import AdminLayout from "@/components/admin/layout";
import { useUser } from "@/Context/UserContext";
import {
  BookOpen,
  Calendar,
  FileText,
  FolderOpen,
  GraduationCap,
  Newspaper,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Activity,
  Clock,
  Plus,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    name: "Total Blog Posts",
    value: "24",
    icon: FileText,
    change: "+12%",
    changeType: "increase",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    name: "News Articles",
    value: "18",
    icon: Newspaper,
    change: "+8%",
    changeType: "increase",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    name: "Upcoming Events",
    value: "6",
    icon: Calendar,
    change: "+2",
    changeType: "increase",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    name: "Research Papers",
    value: "42",
    icon: BookOpen,
    change: "+5%",
    changeType: "increase",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    name: "Active Programs",
    value: "12",
    icon: GraduationCap,
    change: "+3",
    changeType: "increase",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    name: "Resources",
    value: "156",
    icon: FolderOpen,
    change: "+15%",
    changeType: "increase",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "blog",
    title: 'New blog post published: "Digital Rights Framework"',
    time: "2 hours ago",
    user: "Admin User",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    type: "event",
    title: 'Event created: "Constitutional Law Workshop"',
    time: "4 hours ago",
    user: "Editor User",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    type: "research",
    title: 'Research paper updated: "Environmental Governance"',
    time: "6 hours ago",
    user: "Admin User",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    type: "news",
    title: 'News article published: "Legal Education Reform"',
    time: "1 day ago",
    user: "Editor User",
    color: "bg-orange-100 text-orange-600",
  },
];

export default function AdminDashboard() {
  const { user } = useUser();

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header with Gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600  to-blue-100 p-8 text-white shadow-xl">
          {/* Decorative circles */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-medium opacity-90">Welcome back!</span>
            </div>
            <h2 className="text-4xl font-bold mb-2">
              Dashboard Overview
            </h2>
            <p className="text-blue-100 text-lg">
              Heres whats happening with your platform today.
            </p>
          </div>
        </div>

        {/* Stats Grid with Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.changeType === 'increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                      {stat.changeType === 'increase' ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span className="text-xs font-semibold">{stat.change}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.name}
                    </p>
                    <p className="text-4xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      from last month
                    </p>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Recent Activity
                  </h3>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 p-2 rounded-lg ${activity.color} group-hover:scale-110 transition-transform duration-200`}>
                      <div className="h-2 w-2 rounded-full bg-current"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-gray-600">
                          by <span className="font-medium">{activity.user}</span>
                        </p>
                        <span className="text-xs text-gray-400">•</span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions - Takes 1 column */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Plus className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Quick Actions
              </h3>
            </div>

            <div className="space-y-3">
              <button className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" />
                Create Blog Post
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="w-full group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <Newspaper className="h-4 w-4" />
                Add News Article
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {user?.role === "admin" && (
                <>
                  <button className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule Event
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    Upload Resource
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              )}
            </div>

            {/* Info card at bottom */}
            <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Pro Tip
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Use keyboard shortcuts to speed up your workflow. Press <kbd className="px-1.5 py-0.5 bg-white rounded text-xs font-mono shadow-sm">Ctrl+K</kbd> to open quick actions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}