"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/service/AuthService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Register Data:", formData);
        const res = await registerUser(formData);
        if (res.status === 201) {
            toast.success("Registration successful! Please log in.");
            router.push("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-center">
                    <img src="/logo3.png" className="w-36 md:w-44" alt="Logo" />
                </div>
                {/* Title */}
                <h1 className="text-2xl font-semibold text-center mb-2">
                    Create an Account
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Register to access your dashboard
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded focus:outline-none focus:ring-2 focus:ring-[#0347A7]"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded focus:outline-none focus:ring-2 focus:ring-[#0347A7]"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-10 py-2 bg-gray-50 rounded focus:outline-none focus:ring-2 focus:ring-[#0347A7]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-[#0347A7] text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#0347A7] hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
