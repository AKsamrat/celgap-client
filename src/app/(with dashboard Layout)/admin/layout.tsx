"use client";
import Sidebar from "@/components/admin/sidebar";
import { User } from "@/components/admin/UserModal";
import { getCurrentUser } from "@/service/AuthService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);

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

        }
        getUser();
    }, [router]);

    return (
        <div className=" min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
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
                                        {user?.name.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
