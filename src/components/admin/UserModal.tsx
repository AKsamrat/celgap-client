import { IUser } from '@/types';
import { X, User, Mail, Calendar, Shield, Edit2, Save, MapPin, School, Award } from 'lucide-react';
import { useState } from 'react';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'reviewer' | 'admin';
    created_at?: string;
    phone?: string;
    institute?: string;
    designation?: string;
    address?: string;
    avatar?: string;
}

interface UserProfileModalProps {
    user: IUser | null;
    isEditMode?: boolean;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

export default function UserProfileModal({
    user,
    isEditMode: initialEditMode = false,
    onClose,
    onSave
}: UserProfileModalProps) {
    const [isEditMode, setIsEditMode] = useState(initialEditMode);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        institute: user?.institute || '',
        designation: user?.designation || '',
        address: user?.address || '',
        role: user?.role || 'user'
    });

    if (!user) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...user,
            ...formData
        });
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-50 text-purple-900 border-purple-200';
            case 'reviewer':
                return 'bg-green-50 text-green-900 border-green-200';
            default:
                return 'bg-blue-50 text-blue-900 border-blue-200';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative max-h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {isEditMode ? 'Edit User Profile' : 'User Profile'}
                                </h2>
                                <p className="text-blue-200 text-xs mt-0.5">
                                    {isEditMode ? 'Update user information' : 'View user details'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {!isEditMode && (
                                <button
                                    onClick={() => setIsEditMode(true)}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 transition-all flex items-center gap-2 text-sm font-medium"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {/* Profile Header */}
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                            <p className="text-gray-600 mt-1">{user.email}</p>
                            <div className="mt-3">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border-2 ${getRoleColor(user.role)}`}>
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {isEditMode ? (
                        /* Edit Form */
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                                    required
                                />
                            </div>

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
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border-2 font-semibold focus:outline-none focus:ring-2 focus:border-transparent transition-all ${getRoleColor(formData.role)} ${formData.role === 'admin'
                                        ? 'hover:border-purple-300 focus:ring-purple-900'
                                        : formData.role === 'reviewer'
                                            ? 'hover:border-green-300 focus:ring-green-900'
                                            : 'hover:border-blue-300 focus:ring-blue-900'
                                        }`}
                                >
                                    <option value="user">User</option>
                                    <option value="reviewer">Reviewer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {/* institute */}
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
                                    placeholder="Enter your institute name"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all resize-none"
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
                                    placeholder="Lacturer, Professor, Student..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all resize-none"
                                />
                            </div>
                            {/* Address    */}
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
                                    placeholder="Tell us about your address..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent hover:border-gray-300 transition-all resize-none"
                                />
                            </div>
                        </form>
                    ) : (
                        /* Preview Mode */
                        <div className="space-y-5">
                            {/* Information Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Email */}
                                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Mail className="w-4 h-4 text-blue-900" />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-500 uppercase">Email</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 ml-11">{user.email}</p>
                                </div>
                                {/* Institute*/}
                                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <School className="w-4 h-4 text-blue-900" />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-500 uppercase">Institute</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 ml-11">{user.institute
                                        || 'Not provided'}</p>
                                </div>
                                {/* Designation*/}
                                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Award className="w-4 h-4 text-blue-900" />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-500 uppercase">Designation</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 ml-11">{user.designation || 'Not provided'}</p>
                                </div>

                                {/* Phone */}
                                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-semibold text-gray-500 uppercase">Phone</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 ml-11">{user.phone || 'Not provided'}</p>
                                </div>

                                {/* Role */}
                                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-purple-900" />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-500 uppercase">Role</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 ml-11 capitalize">{user.role}</p>
                                </div>

                                {/* Joined Date */}
                                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <Calendar className="w-4 h-4 text-orange-900" />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-500 uppercase">Joined</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 ml-11">
                                        {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'Unknown'}
                                    </p>
                                </div>
                                {/* Address */}
                                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <MapPin className="w-4 h-4 text-purple-900" />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-500 uppercase">Address</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 ml-11">{user.address || 'Not provided'}</p>
                                </div>
                            </div>

                            {/* Bio */}
                            {user.address && (
                                <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Address</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{user.address}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {isEditMode && (
                    <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
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
                                }}
                                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg shadow-blue-900/30 hover:shadow-xl flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}