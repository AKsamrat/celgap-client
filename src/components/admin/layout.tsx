"use client"


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { getCurrentUser } from "@/service/AuthService";
import { User } from "@/lib/auth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    const getUser = async () => {

      const currentUser = await getCurrentUser();
      console.log("layout", currentUser)
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
      if (!["admin", "reviewer", "user"].includes(currentUser?.role || "")) {
        router.push("/login");
      }
      setIsLoading(false);
    }
    getUser();
  }, [router]);
  const path = "/admin"; // layout level (basic access)
  // if (!["admin", "reviewer", "user"].includes(user?.role || "")) {
  //   router.push("/unauthorized");
  // }

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
  //     </div>
  //   );
  // }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:ml-64">
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                <span className="uppercase">{user?.role} </span> Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.name}
                </span>
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
