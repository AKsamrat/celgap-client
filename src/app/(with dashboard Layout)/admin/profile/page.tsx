"use client";

import { useUser } from '@/Context/UserContext';
import { updateUserProfile } from '@/service/User';
import {
    User,
    Mail,
    Calendar,
    Shield,
    Edit2,
    Save,
    MapPin,
    School,
    Award,
    Phone,
    X,
    Camera,
    Loader2
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserProfilePage() {
    const { user, handleUser } = useUser();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || "",
        phone: user?.phone || "",
        institute: user?.institute || "",
        designation: user?.designation || "",
        address: user?.address || "",
        role: user?.role || 'user'
    });

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();

        data.append("name", formData.name);
        data.append("email", formData.email ?? "");
        data.append("phone", formData.phone ?? "");
        data.append("institute", formData.institute ?? "");
        data.append("designation", formData.designation ?? "");
        data.append("address", formData.address ?? "");
        data.append("role", formData.role ?? "");
        setIsLoading(true);

        console.log('Submitting form data:', formData);

        try {
            // Call your API with the updated form data
            const res = await updateUserProfile(user.id, data);
            if (res.status == 200) {
                handleUser();
                toast.success('Profile updated successfully!');
                setIsEditMode(false);
            }


            // Optionally reload user data from context or refetch
            // await refreshUser();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditMode(false);
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            institute: user?.institute || '',
            designation: user?.designation || '',
            address: user?.address || '',
            role: user?.role || 'user'
        });
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-100 text-purple-900 border-purple-200';
            case 'reviewer':
                return 'bg-green-100 text-green-900 border-green-200';
            default:
                return 'bg-blue-100 text-blue-900 border-blue-200';
        }
    };

    const getRoleBadgeGradient = (role: string) => {
        switch (role) {
            case 'admin':
                return 'from-purple-500 to-purple-600';
            case 'reviewer':
                return 'from-green-500 to-green-600';
            default:
                return 'from-blue-500 to-blue-600';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 mb-8 shadow-xl">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
                        <p className="text-blue-100">Manage your personal information and settings</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Sidebar - Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8">

                            {/* Avatar Section */}
                            <div className={`relative h-32 bg-gradient-to-r ${getRoleBadgeGradient(user.role)}`}>
                                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                                    <div className="relative">
                                        <div className="w-32 h-32 bg-white rounded-full p-2 shadow-xl">
                                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                        </div>
                                        <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                                            <Camera className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="pt-20 pb-6 px-6 text-center">
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
                                <p className="text-gray-600 text-sm mb-4">{user.email}</p>

                                <div className="flex justify-center">
                                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 ${getRoleColor(user.role)}`}>
                                        <Shield className="w-4 h-4" />
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </span>
                                </div>

                                {/* Stats */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900">24</p>
                                            <p className="text-xs text-gray-500 mt-1">Posts</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900">156</p>
                                            <p className="text-xs text-gray-500 mt-1">Activities</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Edit Button */}
                                {!isEditMode && (
                                    <button
                                        onClick={() => setIsEditMode(true)}
                                        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Profile Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

                            {/* Content Header */}
                            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {isEditMode ? 'Edit Information' : 'Profile Information'}
                                    </h3>
                                    {isEditMode && (
                                        <button
                                            onClick={handleCancel}
                                            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="p-6">
                                {isEditMode ? (
                                    /* Edit Form */
                                    <form onSubmit={handleSubmit} className="space-y-6">

                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all"
                                                required
                                            />
                                        </div>

                                        {/* Email */}
                                        {/* <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all"
                                                required
                                            />
                                        </div> */}

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+880 1234-567890"
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Institute */}
                                            <div>
                                                <label htmlFor="institute" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Institute
                                                </label>
                                                <input
                                                    type="text"
                                                    id="institute"
                                                    name="institute"
                                                    value={formData.institute}
                                                    onChange={handleChange}
                                                    placeholder="Your institute name"
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all"
                                                />
                                            </div>

                                            {/* Designation */}
                                            <div>
                                                <label htmlFor="designation" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Designation
                                                </label>
                                                <input
                                                    type="text"
                                                    id="designation"
                                                    name="designation"
                                                    value={formData.designation}
                                                    onChange={handleChange}
                                                    placeholder="Lecturer, Professor, Student..."
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Address
                                            </label>
                                            <textarea
                                                id="address"
                                                name="address"
                                                rows={4}
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="Your full address..."
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all resize-none"
                                            />
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 pt-4">
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="flex-1 px-6 py-3 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="flex-1 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="w-5 h-5" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    /* View Mode */
                                    <div className="space-y-6">

                                        {/* Information Grid */}
                                        <div className="grid md:grid-cols-2 gap-5">

                                            {/* Email */}
                                            <div className="group p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border-2 border-blue-100 hover:border-blue-200 transition-all">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Mail className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Email</span>
                                                </div>
                                                <p className="text-sm font-semibold text-gray-900">{user.email}</p>
                                            </div>

                                            {/* Phone */}
                                            <div className="group p-5 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border-2 border-green-100 hover:border-green-200 transition-all">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Phone className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Phone</span>
                                                </div>
                                                <p className="text-sm font-semibold text-gray-900">{user.phone || 'Not provided'}</p>
                                            </div>

                                            {/* Institute */}
                                            <div className="group p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border-2 border-purple-100 hover:border-purple-200 transition-all">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <School className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Institute</span>
                                                </div>
                                                <p className="text-sm font-semibold text-gray-900">{user.institute || 'Not provided'}</p>
                                            </div>

                                            {/* Designation */}
                                            <div className="group p-5 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border-2 border-orange-100 hover:border-orange-200 transition-all">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Award className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Designation</span>
                                                </div>
                                                <p className="text-sm font-semibold text-gray-900">{user.designation || 'Not provided'}</p>
                                            </div>

                                            {/* Joined Date */}
                                            <div className="group p-5 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl border-2 border-pink-100 hover:border-pink-200 transition-all">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Calendar className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Joined</span>
                                                </div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }) : 'Unknown'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Address */}
                                        {user.address && (
                                            <div className="p-5 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl border-2 border-indigo-100">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                                                        <MapPin className="w-5 h-5 text-white" />
                                                    </div>
                                                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Address</h4>
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed">{user.address}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}